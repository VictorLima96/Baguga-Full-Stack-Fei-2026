/* ============================================================
   Jogo do Kniggles
   ------------------------------------------------------------
   Como funciona o sprite:
   - A imagem e lida com new Image() para termos as dimensoes reais.
   - A grade de quadros (colunas x linhas) e detectada sozinha
     olhando as faixas de pixels transparentes da imagem.
   - Se a folha tiver varios quadros, o jogo anima quadra a quadra
     usando background-position (igual o classico spritesheet).
   - Se a folha tiver só um quadro (como a arte original), o jogo
     usa uma animacao procedural (respirar / andar / pular) por
     transform, que sempre da vida ao personagem.
   ============================================================ */

(() => {
    'use strict';

    /* ---------------------------------------------------------
       Configuracao
       --------------------------------------------------------- */
    const CFG = {
        // Folha de sprites do personagem.
        // Pode ser qualquer imagem: a grade de quadros e detectada sozinha.
        folhaSprite: 'kniggles.png',

        // Altura (em px) do personagem dentro da arena
        alturaPersonagem: 120,

        arena: { largura: 960, altura: 540 },
        chaoAltura: 44,

        // Se quiser fixar a grade na mao, preencha: { colunas: 4, linhas: 1 }
        grade: null,

        fisica: {
            gravidade: 2350,
            forcaPulo: 920,
            velMaxQueda: 1500,
            aceleracao: 2900,
            atrito: 3300,
            velMaxCorrida: 350,
        },

        // As plataformas mais baixas ficam acima da cabeca do personagem,
        // assim da para andar por baixo delas sem ficar travado.
        plataformas: [
            { x: 170, y: 330, w: 180, h: 20 },
            { x: 420, y: 250, w: 170, h: 20 },
            { x: 690, y: 330, w: 180, h: 20 },
            { x: 300, y: 170, w: 150, h: 20 },
            { x: 560, y: 165, w: 150, h: 20 },
        ],

        totalBligs: 8,
    };

    /* ---------------------------------------------------------
       Elementos da pagina
       --------------------------------------------------------- */
    const el = {
        arena: document.getElementById('arena'),
        palco: document.getElementById('palco'),
        pessoa: document.getElementById('kniggles'),
        arte: document.getElementById('kniggles-arte'),
        bligs: document.getElementById('bligs'),
        pontos: document.getElementById('pontos'),
        inicio: document.getElementById('inicio'),
        fim: document.getElementById('fim'),
    };

    /* ---------------------------------------------------------
       Estado do jogo
       --------------------------------------------------------- */
    const teclas = new Set();

    const estado = {
        x: 30,           // posicao horizontal (borda esquerda)
        y: 0,            // posicao vertical dos pes
        vx: 0,
        vy: 0,
        noChao: false,
        olhando: 1,      // 1 = virado para a direita, -1 = para a esquerda
        tempo: 0,
        quadro: 0,
        impacto: 0,      // intensidade do "amortecao" da aterrissagem
        pontos: 0,
        largura: 100,
        altura: 100,
    };

    let folha = null;              // HTMLImageElement da folha de sprites
    let grade = { colunas: 1, linhas: 1, larguraQuadro: 0, alturaQuadro: 0 };
    let escalaSprite = 1;
    let bligs = [];
    let ultimoTempo = 0;

    /* =========================================================
       Deteccao da grade de quadros
       ========================================================= */

    // conta grupos de faixas consecutivas ocupadas (1, 0, 0, 1, 1 -> 2 grupos)
    function contarGrupos(mascara) {
        let grupos = 0;
        let dentro = false;
        for (let i = 0; i < mascara.length; i++) {
            if (mascara[i] && !dentro) {
                grupos++;
                dentro = true;
            } else if (!mascara[i]) {
                dentro = false;
            }
        }
        return grupos;
    }

    function detectarGrade(img) {
        if (CFG.grade) {
            return { colunas: CFG.grade.colunas, linhas: CFG.grade.linhas };
        }

        const largura = img.naturalWidth;
        const altura = img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width = largura;
        canvas.height = altura;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        let dados;
        try {
            dados = ctx.getImageData(0, 0, largura, altura).data;
        } catch (erro) {
            // sem acesso aos pixels: assume um quadro so
            return { colunas: 1, linhas: 1 };
        }

        const colunas = new Uint8Array(largura);
        const linhas = new Uint8Array(altura);

        for (let y = 0; y < altura; y++) {
            for (let x = 0; x < largura; x++) {
                const alpha = dados[(y * largura + x) * 4 + 3];
                if (alpha > 8) {
                    colunas[x] = 1;
                    linhas[y] = 1;
                }
            }
        }

        return {
            colunas: Math.max(1, contarGrupos(colunas)),
            linhas: Math.max(1, contarGrupos(linhas)),
        };
    }

    /* =========================================================
       Montagem do sprite
       ========================================================= */

    function aplicarGrade() {
        grade.colunas = Math.max(1, grade.colunas);
        grade.linhas = Math.max(1, grade.linhas);
        grade.larguraQuadro = folha.naturalWidth / grade.colunas;
        grade.alturaQuadro = folha.naturalHeight / grade.linhas;

        escalaSprite = CFG.alturaPersonagem / grade.alturaQuadro;

        const larguraVisivel = grade.larguraQuadro * escalaSprite;
        const alturaVisivel = grade.alturaQuadro * escalaSprite;

        el.arte.style.width = larguraVisivel + 'px';
        el.arte.style.height = alturaVisivel + 'px';
        el.arte.style.backgroundImage = 'url("' + CFG.folhaSprite + '")';
        el.arte.style.backgroundSize =
            folha.naturalWidth * escalaSprite + 'px ' + folha.naturalHeight * escalaSprite + 'px';

        // pixel art (quadros pequenos) fica melhor sem interpolacao
        el.arte.style.imageRendering = grade.larguraQuadro <= 64 ? 'pixelated' : 'auto';

        el.pessoa.style.width = larguraVisivel + 'px';
        el.pessoa.style.height = alturaVisivel + 'px';

        estado.largura = larguraVisivel;
        estado.altura = alturaVisivel;
    }

    function desenharQuadro() {
        const coluna = estado.quadro % grade.colunas;
        const linha = Math.floor(estado.quadro / grade.colunas) % grade.linhas;

        el.arte.style.backgroundPosition =
            (-coluna * grade.larguraQuadro * escalaSprite) + 'px ' +
            (-linha * grade.alturaQuadro * escalaSprite) + 'px';
    }

    /* =========================================================
       Montagem da arena
       ========================================================= */

    function montarArena() {
        // chao
        const chao = document.createElement('div');
        chao.id = 'chao';
        chao.className = 'plataforma';
        el.arena.appendChild(chao);

        // plataformas
        CFG.plataformas.forEach((p) => {
            const div = document.createElement('div');
            div.className = 'plataforma';
            div.style.left = p.x + 'px';
            div.style.top = p.y + 'px';
            div.style.width = p.w + 'px';
            div.style.height = p.h + 'px';
            el.arena.appendChild(div);
        });
    }

    /* =========================================================
       Bligs (itens para coletar)
       ========================================================= */

    function lugaresParaBlig() {
        const lugares = [];
        CFG.plataformas.forEach((p) => {
            lugares.push({ x: p.x + p.w / 2, y: p.y - 22 });
        });
        // espacos livres no chao
        lugares.push({ x: 250, y: CFG.arena.altura - CFG.chaoAltura - 22 });
        lugares.push({ x: 520, y: CFG.arena.altura - CFG.chaoAltura - 22 });
        lugares.push({ x: 800, y: CFG.arena.altura - CFG.chaoAltura - 22 });
        return lugares;
    }

    function criarBligs() {
        el.bligs.innerHTML = '';
        bligs = [];

        const lugares = lugaresParaBlig();
        const usados = [];

        for (let i = 0; i < CFG.totalBligs; i++) {
            let indice = 0;
            do {
                indice = Math.floor(Math.random() * lugares.length);
            } while (usados.indexOf(indice) !== -1 && usados.length < lugares.length);
            usados.push(indice);

            const lugar = lugares[indice];
            const b = {
                x: lugar.x + (Math.random() * 28 - 14),
                y: lugar.y,
                r: 16,
                coletado: false,
                el: null,
            };

            const div = document.createElement('div');
            div.className = 'bling';
            div.style.left = b.x + 'px';
            div.style.top = b.y + 'px';
            div.style.animationDelay = (Math.random() * 1.1).toFixed(2) + 's';

            el.bligs.appendChild(div);
            b.el = div;
            bligs.push(b);
        }
    }

    function checarBligs() {
        const esquerda = estado.x;
        const direita = estado.x + estado.largura;
        const topo = estado.y - estado.altura;
        const base = estado.y;

        for (const b of bligs) {
            if (b.coletado) continue;

            if (esquerda < b.x + b.r && direita > b.x - b.r &&
                topo < b.y + b.r && base > b.y - b.r) {
                b.coletado = true;
                b.el.remove();
                estado.pontos++;
                el.pontos.textContent = estado.pontos;

                if (estado.pontos >= CFG.totalBligs) {
                    el.fim.classList.remove('escondido');
                } else {
                    reposicionarBlig(b);
                }
            }
        }
    }

    function reposicionarBlig(b) {
        const lugares = lugaresParaBlig();
        const lugar = lugares[Math.floor(Math.random() * lugares.length)];
        b.x = lugar.x + (Math.random() * 28 - 14);
        b.y = lugar.y;
        b.el.style.left = b.x + 'px';
        b.el.style.top = b.y + 'px';
    }

    /* =========================================================
       Fisica
       ========================================================= */

    // devolve a superficie mais alta que esta logo abaixo dos pes
    function superficieAbaixo(peAntes) {
        let alvo = CFG.arena.altura - CFG.chaoAltura;

        for (const p of CFG.plataformas) {
            if (peAntes <= p.y &&
                estado.x + estado.largura > p.x &&
                estado.x < p.x + p.w) {
                if (p.y < alvo) alvo = p.y;
            }
        }
        return alvo;
    }

    // impede o personagem de atravessar a lateral das plataformas
    function resolverLateral(xAnterior) {
        const topo = estado.y - estado.altura;

        for (const p of CFG.plataformas) {
            if (topo < p.y + p.h && estado.y > p.y + 2) {
                if (xAnterior + estado.largura <= p.x && estado.x + estado.largura > p.x) {
                    estado.x = p.x - estado.largura;
                    estado.vx = 0;
                } else if (xAnterior >= p.x + p.w && estado.x < p.x + p.w) {
                    estado.x = p.x + p.w;
                    estado.vx = 0;
                }
            }
        }
    }

    function atualizar(dt) {
        estado.tempo += dt;

        const f = CFG.fisica;

        const esquerda = teclas.has('ArrowLeft') || teclas.has('KeyA');
        const direita = teclas.has('ArrowRight') || teclas.has('KeyD');
        const pulo = teclas.has('ArrowUp') || teclas.has('KeyW') || teclas.has('Space');
        const cair = teclas.has('ArrowDown') || teclas.has('KeyS');

        const direcao = (direita ? 1 : 0) - (esquerda ? 1 : 0);

        // corrida
        if (direcao !== 0) {
            estado.vx += direcao * f.aceleracao * dt;
            estado.vx = Math.max(-f.velMaxCorrida, Math.min(f.velMaxCorrida, estado.vx));
            estado.olhando = direcao;
        } else if (estado.vx > 0) {
            estado.vx = Math.max(0, estado.vx - f.atrito * dt);
        } else if (estado.vx < 0) {
            estado.vx = Math.min(0, estado.vx + f.atrito * dt);
        }

        // pulo
        if (pulo && estado.noChao) {
            estado.vy = -f.forcaPulo;
            estado.noChao = false;
        }

        // horizontal
        const xAnterior = estado.x;
        estado.x += estado.vx * dt;
        estado.x = Math.max(0, Math.min(CFG.arena.largura - estado.largura, estado.x));
        resolverLateral(xAnterior);

        // vertical
        estado.vy += f.gravidade * dt;
        if (cair && estado.vy > 0) estado.vy += f.gravidade * 0.9 * dt;
        estado.vy = Math.min(estado.vy, f.velMaxQueda);

        const peAntes = estado.y;
        estado.y += estado.vy * dt;

        const superficie = superficieAbaixo(peAntes);
        if (estado.vy >= 0 && estado.y >= superficie) {
            if (!estado.noChao) estado.impacto = 1;
            estado.y = superficie;
            estado.vy = 0;
            estado.noChao = true;
        } else {
            estado.noChao = false;
        }

        // aplica a posicao na tela
        el.pessoa.style.left = estado.x + 'px';
        el.pessoa.style.top = (estado.y - estado.altura) + 'px';

        checarBligs();
    }

    /* =========================================================
       Animacao
       ========================================================= */

    function atualizarAnimacao(dt) {
        const andando = estado.noChao && Math.abs(estado.vx) > 15;
        const velocidadeRel = Math.min(1, Math.abs(estado.vx) / CFG.fisica.velMaxCorrida);

        // quadro da folha de sprites
        if (grade.colunas > 1) {
            if (andando) {
                const cadencia = 5 + velocidadeRel * 9;
                estado.quadro = Math.floor(estado.tempo * cadencia) % grade.colunas;
            } else {
                estado.quadro = 0;
            }
        }

        const t = estado.tempo;
        let escalaX = 1;
        let escalaY = 1;
        let sobe = 0;
        let giro = 0;

        if (!estado.noChao) {
            // no ar: estica (subindo) ou achata (descendo)
            const subindo = estado.vy < 0;
            escalaY = subindo ? 1.11 : 1.04;
            escalaX = 1 - (escalaY - 1);
        } else if (andando) {
            // corrida: sobe e desce a cada passada
            const passo = Math.sin(t * (9 + velocidadeRel * 7));
            sobe = -Math.abs(passo) * 7;
            escalaY = 1 + Math.abs(passo) * 0.035;
            escalaX = 1 - Math.abs(passo) * 0.03;
            giro = passo * 3.5;
        } else {
            // parado: respirando
            const respiro = Math.sin(t * 2.6);
            sobe = respiro * 2.5;
            escalaY = 1 + respiro * 0.018;
            escalaX = 1 - respiro * 0.014;
        }

        // amortecao da aterrissagem
        if (estado.impacto > 0) {
            escalaY -= 0.16 * estado.impacto;
            escalaX += 0.14 * estado.impacto;
            sobe += 5 * estado.impacto;
            estado.impacto = Math.max(0, estado.impacto - dt * 5);
        }

        el.arte.style.transform =
            'scaleX(' + (estado.olhando * escalaX) + ') ' +
            'translateY(' + sobe + 'px) ' +
            'rotate(' + giro + 'deg) ' +
            'scaleY(' + escalaY + ')';

        desenharQuadro();
    }

    /* =========================================================
       Loop principal
       ========================================================= */

    function laco(agora) {
        const dt = Math.min(0.05, (agora - ultimoTempo) / 1000) || 0;
        ultimoTempo = agora;

        atualizar(dt);
        atualizarAnimacao(dt);

        requestAnimationFrame(laco);
    }

    /* =========================================================
       Tela / reinicio
       ========================================================= */

    function ajustarTela() {
        const escala = Math.min(1, (window.innerWidth - 24) / CFG.arena.largura);
        el.arena.style.transform = 'scale(' + escala + ')';
        el.palco.style.width = CFG.arena.largura * escala + 'px';
        el.palco.style.height = CFG.arena.altura * escala + 'px';
    }

    function reiniciar() {
        estado.x = 30;
        estado.y = CFG.arena.altura - CFG.chaoAltura;
        estado.vx = 0;
        estado.vy = 0;
        estado.noChao = true;
        estado.olhando = 1;
        estado.pontos = 0;
        estado.impacto = 0;

        el.pontos.textContent = '0';
        el.fim.classList.add('escondido');
        el.inicio.classList.remove('escondido');

        criarBligs();

        el.pessoa.style.left = estado.x + 'px';
        el.pessoa.style.top = (estado.y - estado.altura) + 'px';
    }

    function esconderInicio() {
        if (!el.inicio.classList.contains('escondido')) {
            el.inicio.classList.add('escondido');
        }
    }

    /* =========================================================
       Teclado
       ========================================================= */

    const teclasBloqueadas = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'];

    window.addEventListener('keydown', (evento) => {
        if (teclasBloqueadas.indexOf(evento.code) !== -1) evento.preventDefault();

        teclas.add(evento.code);
        esconderInicio();

        if (evento.code === 'KeyR') reiniciar();
    });

    window.addEventListener('keyup', (evento) => {
        teclas.delete(evento.code);
    });

    window.addEventListener('blur', () => teclas.clear());
    window.addEventListener('resize', ajustarTela);

    /* =========================================================
       Inicializacao
       ========================================================= */

    function iniciar() {
        montarArena();

        folha = new Image();
        folha.src = CFG.folhaSprite;

        folha.onload = () => {
            const detectada = detectarGrade(folha);
            grade = {
                colunas: detectada.colunas,
                linhas: detectada.linhas,
                larguraQuadro: 0,
                alturaQuadro: 0,
            };

            aplicarGrade();

            estado.y = CFG.arena.altura - CFG.chaoAltura;
            estado.noChao = true;

            el.pessoa.style.left = estado.x + 'px';
            el.pessoa.style.top = (estado.y - estado.altura) + 'px';

            desenharQuadro();
            criarBligs();
            ajustarTela();

            ultimoTempo = performance.now();
            requestAnimationFrame(laco);
        };

        folha.onerror = () => {
            el.inicio.textContent = 'Nao foi possivel carregar ' + CFG.folhaSprite;
        };
    }

    iniciar();
})();
