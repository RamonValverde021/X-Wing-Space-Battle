/*------------------------------- OBJETOS HTML -------------------------------*/
const body = document.getElementById("body");
const cenario = document.getElementById("cenario");
const xwing = document.getElementById("x-wing");
const botaoIniciar = document.getElementById("btn_Inicar");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");
// Estastiticas do jogo
const painelDados = document.getElementById("dados-jogo");
const dadosVelXWing = document.getElementById("vel_x-wing");
const dadosVelRotXWing = document.getElementById("vel_rotacao_x-wing");
const dadosVelTieFighter = document.getElementById("vel_tie-fighter");
const dadosVelConstrucaoTieFighter = document.getElementById("vel_constr_tie-fighter");
const dadosInimigosDestruidos = document.getElementById("inimigos_destruidos");

/*------------------------------- VARIAVEIS GLOBAIS -------------------------------*/
const larguraCenario = cenario.offsetWidth; // Pega a largura de todod o cenario
const alturaCenario = cenario.offsetHeight; // Pega a altura de todod o cenario 

const larguraXWing = xwing.offsetWidth; // Pega a largura do X-Wing
const alturaXWing = xwing.offsetHeight; // Pega a altura do X-Wing

const larguraTieFighter = 100;  // Pega a largura do X-Wing
const alturaTieFighter = 95.56; // Pega a altura do X-Wing
const velocidadeProjetil = 40;  // define a velocidade dos projeteis das naves

let velocidadeXWing = 10;         // define a velocidade do X-Wing 
let velocidadeTieFighter = 1;     // 1 - define a velocidade dos Tie Fighters 
let quantidadeTieFighters = 3000; // 3000 - define o tempo de intervalo em que serão criadas as naves inimigas (em milisegundos)

let velocidadeCenario = 200;       // define a velocidade do cenario
let pontosVida = 100;              // define a vida inicial do X-Wing
let pontosScore = 0;               // define a pontuação inicial
let estaAtirando = false;          // Flada para saber se o X-Wing está atirando ou não
let countNavesDestruidas = 0;      // Contador de naves destruídas
let rotacaoXWing = 0;              // Variavel para controlar a rotação do X-Wing
let velRotacaoXWing = 2;           // Variavel para controlar a velocidade de rotação do X-Wing
let giroHorario = false;
let giroAntiHorario = false;

let posicaoHorizontal = larguraCenario / 2 - (larguraXWing / 2); // Posição horizontal inicial do X-Wing
let positionVertical = alturaCenario - alturaXWing - 20;         // Posição vertical inicial do X-Wing

let direcaoHorizontal = 0; // Variavel para manipular a direção horizontal do X-Wing
let direcaoVertical = 0;   // Variavel para manipular a direção vertical do X-Wing

let iniciaMovimentacaoXWing;
let iniciaProjeteisXWing;
let iniciaMovimentacaoProjeteisXWing;
let iniciaNavesInimigas;
let iniciaMovimentacaoNavesInimigas;
let iniciaColisao;
let iniciaRotacaoXWing;

/*------------------------------- AUDIOS -------------------------------*/
function trilhaSonora() {
    const audio = new Audio('../audios/soundtrack.m4a'); // Audio X-Wing voando
    audio.volume = 0.5;
    audio.loop = true; // Configura para tocar ininterruptamente
    audio.play();
}

function somCanhoesXWing() {
    const audio = new Audio('../audios/x-wing_cannons-2.m4a'); // Audio tiro de canhoes X-Wing
    audio.volume = 0.3;    // volume de 0 a 1
    audio.currentTime = 0; // volta pro início
    audio.play();          // toca o audio
}

function somAcelerandoXWing() {
    const audio = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
    audio.volume = 0.3;
    audio.play();
    audio.addEventListener("ended", () => { // Quando o audio terminar, chama a função somVoandoXWing
        somVoandoXWing();                   // Toca o som do X-Wing voando 
    });
}

function somVoandoXWing() {
    const audio = new Audio('../audios/x-wing_flying.m4a'); // Audio X-Wing voando
    audio.volume = 0.3;
    audio.loop = true; // Configura para tocar ininterruptamente
    audio.play();
}

function somExplosaoTieFighter() {
    const audio = new Audio('../audios/tie-fighter_explosion.m4a'); // Audio de explosão
    audio.currentTime = 0; // volta pro início
    audio.volume = 0.3;
    audio.play();
}

function somVoandoTieFighter() {
    // Lista dos áudios possíveis
    const audios = [
        '../audios/tie-fighter_flying_1.m4a',
        '../audios/tie-fighter_flying_2.m4a',
        '../audios/tie-fighter_flying_3.m4a',
        '../audios/tie-fighter_flying_4.m4a',
        '../audios/tie-fighter_flying_5.m4a'
    ];
    const randomIndex = Math.floor(Math.random() * audios.length); // Sorteia índice aleatório entre 0 e 4
    const audio = new Audio(audios[randomIndex]); // Cria instância do áudio escolhido
    // Configurações
    audio.volume = 0.3; // Volume do audio
    audio.currentTime = 0; // volta pro início
    audio.play(); // Executa
}

/*------------------------------- MONITORANDO TECLAS E CONTROLE DO X-WING -------------------------------*/
// Função para verifica se as teclas de controle do X-Wing estão sendo pressionadas
const teclasControlePressionadas = (tecla) => {
    if (tecla.key === "ArrowRight") {       // se a tecla pressionada for a seta para direita
        direcaoHorizontal = 1;              // move para direita
    } else if (tecla.key === "ArrowLeft") { // se a tecla pressionada for a seta para esquerda
        direcaoHorizontal = -1;             // move para esquerda
    } else if (tecla.key === "ArrowDown") { // se a tecla pressionada for a seta para baixo
        direcaoVertical = 1;                // move para baixo
    } else if (tecla.key === "ArrowUp") {   // se a tecla pressionada for a seta para cima
        direcaoVertical = -1;               // move para cima
    } else if (tecla.key === " ") {         // se a tecla pressionada for a barra de espaço
        estaAtirando = true;                // ativa a flag de atirar
    } else if (tecla.key === "A" || tecla.key === "a") {
        giroHorario = true;
    } else if (tecla.key === "D" || tecla.key === "d") {
        giroAntiHorario = true;
    }
}

// Função para verifica se as teclas de controle do X-Wing estão soltas
const teclasControleSoltas = (tecla) => {
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") {      // se a tecla solta for a seta para direita ou esquerda
        direcaoHorizontal = 0;                                          // para o movimento horizontal
    } else if (tecla.key === "ArrowDown" || tecla.key === "ArrowUp") {  // se a tecla solta for a seta para baixo ou cima
        direcaoVertical = 0;                                            // para o movimento vertical
    } else if (tecla.key === " ") {                                     // se a tecla solta for a barra de espaço
        estaAtirando = false;                                           // desativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {
        giroHorario = false;
    } else if (tecla.key === "d" || tecla.key === "D") {
        giroAntiHorario = false;
    }
}

const teclasControleClicadas = (tecla) => {
    console.log(tecla.key);
    if (tecla.key === "p" || tecla.key === "P") {      // se a tecla solta for a seta para direita ou esquerda
        if (painelDados.style.display === "none") {
            painelDados.style.display = "flex";
        } else {
            painelDados.style.display = "none";
        }
    }
}

// Função para mover o X-Wing
function moverXWing() {
    // as variaveis direcaoHorizontal e direcaoVertical soman ou subtraem na coordenada atual do X-Wing, a velocidadeXWing define o quão rapido ele se move
    posicaoHorizontal += direcaoHorizontal * velocidadeXWing; // atuzliza as coordenadas horizontais do X-Wing
    positionVertical += direcaoVertical * velocidadeXWing;    // atuzliza as coordenadas verticais do X-Wing
    // limitando a movimentação do X-Wing para não ultrapassar o cenario na horizontal
    if (posicaoHorizontal < 0) {
        posicaoHorizontal = 0;
    } else if (posicaoHorizontal + larguraXWing > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraXWing;
    }
    // limitando a movimentação do X-Wing para não ultrapassar o cenario na vertcal
    if (positionVertical < 0) {
        positionVertical = 0;
    } else if (positionVertical + alturaXWing > alturaCenario) {
        positionVertical = alturaCenario - alturaXWing;
    }
    // Atualizando a posição do X-Wing no cenario
    xwing.style.left = posicaoHorizontal + "px";
    xwing.style.top = positionVertical + "px";
}


/*------------------------------- PROJETEIS X-WING -------------------------------*/
// Função para atirar
function atirar() {
    if (estaAtirando) {                                                         // Se a flag estaAtirando for true, cria os projéteis
        criarProjeteisXWing(posicaoHorizontal, positionVertical, rotacaoXWing); // Chama a função para criar os projéteis do X-Wing, passando a posição atual do X-Wing
        somCanhoesXWing();                                                      // Toca o som dos canhões do X-Wing
    }
}

// Função para criar os projéteis do X-Wing
const criarProjeteisXWing = (posicaoLeftTiro, posicaoTopTiro, angle_deg) => { // Recebe a posição atual do X-Wing e o ângulo de rotação para criar os tiros
    // Centro da nave
    const center_x = posicaoLeftTiro + larguraXWing / 2; // Centro X do X-Wing
    const center_y = posicaoTopTiro + alturaXWing / 2;   // Centro Y do X-Wing

    // Ângulo em radianos
    const theta = angle_deg * Math.PI / 180; // Converte graus da nave para radianos

    // Posições locais dos canos de tiro (esquerdo e direito, ligeiramente à frente)
    const muzzles = [          // Posições relativas ao centro da nave, em pixels
        { lx: -45, ly: -10 },  // Posição do cano esquerdo
        { lx: 45, ly: -10 }    // Posição do cano direito
    ];

    // Componentes de velocidade baseados no ângulo (direção: theta=0 aponta para cima)
    const speed = velocidadeProjetil;    // Velocidade do projétil
    const vx = speed * Math.sin(theta);  // Componente X da velocidade do projétil
    const vy = speed * -Math.cos(theta); // Componente Y da velocidade do projétil

    // Metade das dimensões do projétil para centralizar
    const half_w = 2.5; // Metade da largura do projétil
    const half_h = 15;  // Metade da altura do projétil

    muzzles.forEach(muzzle => { // Para cada cano de tiro
        // Posição de spawn rotacionada (matriz de rotação)
        const spawn_center_x = center_x + (muzzle.lx * Math.cos(theta) - muzzle.ly * Math.sin(theta)); // Posição X do spawn do projétil
        const spawn_center_y = center_y + (muzzle.lx * Math.sin(theta) + muzzle.ly * Math.cos(theta)); // Posição Y do spawn do projétil

        // Cria o projétil
        const tiro = document.createElement("div"); // Cria um elemento div, que vai ser o projetil
        tiro.className = "projetil_x-wing";         // Adiciona a classe do projetil para aplicar o estilo

        // Posiciona o canto superior esquerdo para que o centro fique na spawn
        tiro.style.left = (spawn_center_x - half_w) + "px"; // Centraliza horizontalmente
        tiro.style.top = (spawn_center_y - half_h) + "px";  // Centraliza verticalmente


        // Rotaciona o projétil na direção da nave
        tiro.style.transform = `rotate(${angle_deg}deg)`; // Rotaciona o projétil

        // Armazena velocidades vetoriais como atributos de dados
        tiro.setAttribute("data-vx", vx.toFixed(2)); // Velocidade X
        tiro.setAttribute("data-vy", vy.toFixed(2)); // Velocidade Y

        cenario.appendChild(tiro); // Adiciona o projetil ao cenario
    });
}

// Função para mover os projéteis do X-Wing
function moverProjeteis() {
    const projeteis = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os projéteis
    for (let i = 0; i < projeteis.length; i++) {                     // Percorre todos os projéteis
        const disparo = projeteis[i];                                // Pega o projetil atual
        if (disparo) {                                               // Verifica se o projetil existe
            // Pega posição atual do canto superior esquerdo
            let left = parseFloat(disparo.style.left);  // Converte de string para float
            let top = parseFloat(disparo.style.top);    // Converte de string para float

            // Calcula centro atual
            const half_w = 2.5;            // Metade da largura do projétil
            const half_h = 15;             // Metade da altura do projétil
            let center_x = left + half_w;  // Centro X do projétil
            let center_y = top + half_h;   // Centro Y do projétil

            // Pega velocidades vetoriais
            let vx = parseFloat(disparo.getAttribute('data-vx'));  // Velocidade X do projétil
            let vy = parseFloat(disparo.getAttribute('data-vy'));  // Velocidade Y do projétil

            // Atualiza centro
            center_x += vx; // Atualiza posição do centro do projétil na horizontal
            center_y += vy; // Atualiza posição do centro do projétil na vertical

            // Atualiza posição do canto superior esquerdo
            disparo.style.left = (center_x - half_w) + "px";  // Centraliza horizontalmente o projétil em relação ao centro da nave
            disparo.style.top = (center_y - half_h) + "px"; // Centraliza verticalmente o projétil em relação ao centro da nave

            // Remove se sair da tela (aproximação com centro)
            if (center_x < -10 || center_x > larguraCenario + 10 ||  // Limite horizontal
                center_y < -10 || center_y > alturaCenario + 10) {   // Limite vertical
                disparo.remove();                                    // Remove o projetil do cenario
            }
        }
    }
}

// Explosão do X-Wing
function explosaoXWing() {
    const posicaoXWing = xwing.getBoundingClientRect();   // Pega as coordenadas do X-Wing
    const explosao = document.createElement("div");       // Cria um elemento div, que vai ser a explosão
    explosao.className = "explosao";                      // Adiciona a classe da explosão para aplicar o estilo
    explosao.style.left = posicaoXWing.left + "px";       // Pega a posição horizontal do X-Wing
    explosao.style.top = posicaoXWing.top + "px";         // Pega a posição vertical do X-Wing
    cenario.appendChild(explosao);                        // Adiciona a explosão ao cenario
    somExplosaoTieFighter();                              // Chama o audio de explosão do X-Wing
    setTimeout(() => {                                    // Depois de 500 milissegundos
        explosao.remove();                                // Remove a explosão
    }, 500);
}


/*------------------------------- NAVES INIMIGAS -------------------------------*/
// Criando naves inimigas em lugares aleatorios
function navesInimigas() {
    const tieFighter = document.createElement("div");        // Cria um elemento div, que vai ser o Tie Fighter
    tieFighter.className = "tie_fighter";                    // Adiciona a classe do Tie Fighter para aplicar o estilo
    tieFighter.setAttribute("data-vida", 5);                 // Cria o atributo data-vida para armazenar a vida do Tie Fighter
    tieFighter.style.left = Math.floor(Math.random() * (larguraCenario - larguraTieFighter)) + "px"; // Define a posição horizontal do Tie Fighter em um lugar aleatorio dentro do cenario
    tieFighter.style.top = "0";                              // Define a posição vertical do Tie Fighter no topo do cenario
    cenario.appendChild(tieFighter);                         // Adiciona o Tie Fighter ao cenario
    somVoandoTieFighter();                                   // Toca o som do Tie Fighter voando
}

// Movimentando naves inimigas
function moverNavesInimigas() {
    const tieFighters = document.querySelectorAll(".tie_fighter");      // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    for (let i = 0; i < tieFighters.length; i++) {                      // Percorre todos os Tie Fighters
        if (tieFighters[i]) {                                           // Verifica se o Tie Fighter existe
            let posicaoTopTieFighters = tieFighters[i].offsetTop;       // Pega a posição vertical atual do Tie Fighter
            posicaoTopTieFighters += velocidadeTieFighter;              // Atualiza a posição vertical do Tie Fighter, somando a velocidade do Tie Fighter. Equação para mover para baixo
            tieFighters[i].style.top = posicaoTopTieFighters + "px";    // Atualiza a posição do Tie Fighter no cenario
            if (posicaoTopTieFighters > alturaCenario) {                // Se o Tie Fighter sair do cenario (posição maior que a altura do cenario)
                pontosVida -= 10;                                       // Diminui 10 pontos de vida
                vida.innerText = `Vida: ${pontosVida}%`;                // Atualiza a vida no menu
                tieFighters[i].parentNode.removeChild(tieFighters[i]);  // Remove o Tie Fighter do cenario
                if (pontosVida <= 0) {                                  // Se a vida chegar a 0, chama a função gameOver
                    gameOver();
                }
            }
        }
    }
}

// Colisão com as naves inimigas
function colisaoTieFighter() {
    const todasNavesInimigas = document.querySelectorAll(".tie_fighter");                     // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");                      // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    todasNavesInimigas.forEach((navesInimiga) => {                                            // Percorre todos os Tie Fighters
        todosDisparos.forEach((disparo) => {                                                  // Percorre todos os projeteis
            const colisaoNaveInimiga = navesInimiga.getBoundingClientRect();                  // Pega as coordenadas do Tie Fighter    
            const colisaoDisparo = disparo.getBoundingClientRect();                           // Pega as coordenadas do projetil
            let vidaAtuaTieFighter = parseInt(navesInimiga.getAttribute("data-vida"), 10);    // Pega a vida atual do Tie Fighter   
            if (                                                                              // Verifica se houve colisão entre o Tie Fighter e o projetil
                colisaoNaveInimiga.left < colisaoDisparo.right &&                             // Verifica se o lado esquerdo do Tie Fighter é menor que o lado direito do projetil
                colisaoNaveInimiga.right > colisaoDisparo.left &&                             // Verifica se o lado direito do Tie Fighter é maior que o lado esquerdo do projetil
                colisaoNaveInimiga.top < colisaoDisparo.bottom &&                             // Verifica se o topo do Tie Fighter é menor que a parte de baixo do projetil
                colisaoNaveInimiga.bottom > colisaoDisparo.top                                // Verifica se a parte de baixo do Tie Fighter é maior que o topo do projetil
            ) {
                vidaAtuaTieFighter--;                                                         // Diminui 1 ponto para cada projetil que acertar o Tie Fighter
                pontosScore += 10;                                                            // Adiciona 10 pontos na pontuação para cada acerto no Tie Fighter
                pontos.innerText = `Pontos: ${pontosScore}`;                                  // Atualiza a pontuação no menu
                disparo.remove();                                                             // Remove o projetil do cenario
                if (vidaAtuaTieFighter <= 0) {                                                // Se a vida do Tie Fighter chegar a 0
                    countNavesDestruidas++;                                                   // Incrementa o contador de naves destruídas
                    velocidadeTieFighter += 0.5;                                              // Aumenta a velocidade dos Tie Fighters
                    velocidadeXWing += 0.1;                                                   // Aumenta a velocidade do X-Wing
                    velRotacaoXWing += 0.1;                                                   // Aumenta a velocidade de rotação do X-Wing
                    if (velocidadeTieFighter >= 20) {                                         // Limita a velocidade máxima dos Tie Fighters
                        velocidadeTieFighter = 20;                                            // Aumenta a velocidade do X-Wing
                    }
                    if (quantidadeTieFighters > 1000) {                                           // Limita o tempo mínimo de criação dos Tie Fighters
                        quantidadeTieFighters -= 100;                                             // Diminui o tempo de criação dos Tie Fighters
                        clearInterval(iniciaNavesInimigas);                                       // Limpa o intervalo atual
                        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);  // Reinicia o intervalo com o novo tempo  
                    }
                    pontosScore += 100;                                   // Adiciona 100 pontos na pontuação para cada Tie Fighter destruído
                    pontos.innerText = `Pontos: ${pontosScore}`;          // Atualiza a pontuação no menu
                    // Construindo o efeito de explosão
                    const explosao = document.createElement("div");       // Cria um elemento div, que vai ser a explosão
                    explosao.className = "explosao";                      // Adiciona a classe da explosão para aplicar o estilo
                    explosao.style.left = colisaoNaveInimiga.left + "px"; // Pega a posição horizontal do Tie Fighter
                    explosao.style.top = colisaoNaveInimiga.top + "px";   // Pega a posição vertical do Tie Fighter
                    cenario.appendChild(explosao);                        // Adiciona a explosão ao cenario
                    somExplosaoTieFighter();                              // Chama o audio de explosão do Tie Fighter
                    navesInimiga.remove();                                // Remove o Tie Fighter do cenario
                    setTimeout(() => {                                    // Depois de 500 milissegundos
                        explosao.remove();                                // Remove a explosão
                    }, 500);
                } else {
                    navesInimiga.setAttribute("data-vida", vidaAtuaTieFighter); // Atualiza a vida do Tie Fighter
                }
            }
        })
    });
    // Atualizando as estatisticas do jogo
    dadosVelXWing.innerText = `Vel. X-Wing: ${velocidadeXWing.toFixed(2)}`;
    dadosVelRotXWing.innerText = `Vel. Rotacao X-Wing: ${velRotacaoXWing.toFixed(2)}`;
    dadosVelTieFighter.innerText = `Vel. Tie-Fighter: ${velocidadeTieFighter.toFixed(2)}`;
    dadosVelConstrucaoTieFighter.innerText = `Vel. Constr. Tie-Fighter: ${quantidadeTieFighters} ms`;
    dadosInimigosDestruidos.innerText = `Inimigos Destruidos: ${countNavesDestruidas}`;
}


/*------------------------------- FIM DE JOGO -------------------------------*/
function gameOver() {
    document.removeEventListener("keydown", teclasControlePressionadas); // Remove os eventos de controle do X-Wing de keydown
    document.removeEventListener("keyup", teclasControleSoltas);         // Remove os eventos de controle do X-Wing de keyup
    // Para todos os intervalos do jogo
    clearInterval(iniciaProjeteisXWing);
    clearInterval(iniciaMovimentacaoXWing);
    clearInterval(iniciaMovimentacaoProjeteisXWing);
    clearInterval(iniciaNavesInimigas);
    clearInterval(iniciaMovimentacaoNavesInimigas);
    clearInterval(iniciaColisao);
    explosaoXWing();                                                 // Chama a explosão do X-Wing
    cenario.removeChild(xwing);                                      // Remove o X-Wing do cenario
    const navesInimigas = document.querySelectorAll(".tie_fighter"); // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    navesInimigas.forEach((inimigos) => {                            // Percorre todos os Tie Fighters
        inimigos.remove();                                           // Remove cada um dos Tie Fighter do cenario
    });
    const disparosXWing = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis do X-Wing
    disparosXWing.forEach((disparos) => {                                // Percorre todos os projeteis do X-Wing
        disparos.remove();                                               // Remove cada um dos projeteis do X-Wing do cenario
    });
    // Mostra a mensagem de fim de jogo
    const gameover = document.createElement("h1");
    gameover.innerHTML = "Game Over<br>O Imperio Venceu";
    gameover.className = "gameover";
    cenario.appendChild(gameover);
    // Depois de 3 segundos, tocar a risada do imperador
    setTimeout(() => {
        const audio = new Audio('../audios/risada_palpatine.MP3'); // Audio X-Wing acelerando
        audio.play();
    }, 2000);
}


/*------------------------------- INCIANDO JOGO -------------------------------*/
document.getElementById("btn_Inicar").addEventListener("click", function () {
    botaoIniciar.style.display = "none";                                                // Esconde o botão iniciar após clicar nele
    cenario.style.animation = `animacaoCenario ${velocidadeCenario}s infinite linear`;  // Adiciona a animação de fundo do cenario
    //trilhaSonora();                                                                   // Toca a trilha sonora do game
    //somAcelerandoXWing();                                                             // Toca o som do X-Wing acelerando
    document.addEventListener("keydown", teclasControlePressionadas);                   // Chama a função teclasControlePressionadas quando pressiona alguma tecla no teclado
    document.addEventListener("keyup", teclasControleSoltas);                           // Chama a função teclasControleSoltas quando soltar alguma tecla no teclado
    document.addEventListener("keypress", teclasControleClicadas);                      // Chama a função teclasControleClicadas quando clicar alguma tecla no teclado
    iniciaMovimentacaoXWing = setInterval(moverXWing, 20);                              // Chama a função moverXWing a cada 50 milisegundos
    iniciaProjeteisXWing = setInterval(atirar, 150);                                    // Chama a função atirar a cada 10 milisegundos
    iniciaMovimentacaoProjeteisXWing = setInterval(moverProjeteis, 50);                 // Chama a função moverProjeteis a cada 50 milisegundos
    iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);            // Chama a construção de naves inimigas a cada X milisegundos a primeiro momento
    iniciaMovimentacaoNavesInimigas = setInterval(moverNavesInimigas, 50);              // Define um tempo relativo a velocidade do Tie Fighter em que as naves levaram para cruzar a tela antes de aparecer novas
    iniciaColisao = setInterval(colisaoTieFighter, 10);                                 // Chama a função moverNavesInimigas a cada 10 milisegundos
    iniciaRotacaoXWing = setInterval(() => {
        if (giroHorario) {
            rotacaoXWing -= velRotacaoXWing;
            xwing.style.transform = `rotate(${rotacaoXWing}deg)`;
        } else if (giroAntiHorario) {
            rotacaoXWing += velRotacaoXWing;
            xwing.style.transform = `rotate(${rotacaoXWing}deg)`;
        }
    }, 20);

});







