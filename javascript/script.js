/*------------------------------- OBJETOS HTML -------------------------------*/
const body = document.getElementById("body");
const cenario = document.getElementById("cenario");
const xwing = document.getElementById("x-wing");
const botaoIniciar = document.getElementById("btn_Inicar");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");


/*------------------------------- VARIAVEIS GLOBAIS -------------------------------*/
const larguraCenario = cenario.offsetWidth; // Pega a largura de todod o cenario
const alturaCenario = cenario.offsetHeight; // Pega a altura de todod o cenario 

const larguraXWing = xwing.offsetWidth; // Pega a largura do X-Wing
const alturaXWing = xwing.offsetHeight; // Pega a altura do X-Wing

const larguraTieFighter = 100;  // Pega a largura do X-Wing
const alturaTieFighter = 95.56; // Pega a altura do X-Wing
const velocidadeProjetil = 50;  // define a velocidade dos projeteis das naves

let velocidadeXWing = 20;      // define a velocidade do X-Wing 
let velocidadeTieFighter = 5;  // define a velocidade dos Tie Fighters 
let velocidadeCenario = 200;   // define a velocidade do cenario
let pontosVida = 100;          // define a vida inicial do X-Wing
let pontosScore = 0;           // define a pontuação inicial
let estaAtirando = false;      // Flada para saber se o X-Wing está atirando ou não

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
    if (estaAtirando) { // Se a flag estaAtirando for true, cria os projetis
        criarProjeteisXWing(posicaoHorizontal, positionVertical); // Chama a função criarProjeteisXWing passando a posição atual do X-Wing
        somCanhoesXWing();
    }
}

// Função para criar os projeteis do X-Wing
const criarProjeteisXWing = (posicaoLeftTiro, posicaoTopTiro) => { // Recebe a posição atual do X-Wing para criar os tiros
    // Cria dois elementos de disparo, um de cada lado do X-Wing
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "projetil_x-wing";           // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = posicaoLeftTiro + 2 + "px"; // Define a posição horizontal do projetil referente a posição do X-Wing
    tiroEsquerdo.style.top = posicaoTopTiro + 50 + "px";  // Define a posição vertical do projetil referente a posição do X-Wing
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "projetil_x-wing";
    tiroDireito.style.left = posicaoLeftTiro + (larguraXWing - 8) + "px"; // 10 é a largura do tiro
    tiroDireito.style.top = posicaoTopTiro + 50 + "px";
    cenario.appendChild(tiroDireito);
}

// Função para mover os projeteis do X-Wing
function moverProjeteis() {
    const tiros = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetil;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil < -10) {                      // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}

// Explosão do X-Wing
function explosaoXWing() {
    const posicaoXWing = xwing.getBoundingClientRect();    // Pega as coordenadas do X-Wing
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
    tieFighter.setAttribute("data-vida", 6);
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
                vidaAtuaTieFighter -= 2;                                                      // Diminui 2 pontos de vida do Tie Fighter
                disparo.remove();                                                             // Remove o projetil do cenario
                if (vidaAtuaTieFighter <= 0) {                                                // Se a vida do Tie Fighter chegar a 0
                    pontosScore += 100;                                                       // Adiciona 100 pontos na pontuação
                    pontos.innerText = `Pontos: ${pontosScore}`;                              // Atualiza a pontuação no menu
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
    trilhaSonora();                                                                     // Toca a trilha sonora do game
    somAcelerandoXWing();                                                               // Toca o som do X-Wing acelerando
    document.addEventListener("keydown", teclasControlePressionadas);                   // Chama a função teclasControlePressionadas quando pressiona alguma tecla no teclado
    document.addEventListener("keyup", teclasControleSoltas);                           // Chama a função teclasControleSoltas quando soltar alguma tecla no teclado
    iniciaMovimentacaoXWing = setInterval(moverXWing, 50);                              // Chama a função moverXWing a cada 50 milisegundos
    iniciaProjeteisXWing = setInterval(atirar, 150);                                    // Chama a função atirar a cada 10 milisegundos
    iniciaMovimentacaoProjeteisXWing = setInterval(moverProjeteis, 50);                 // Chama a função moverProjeteis a cada 50 milisegundos
    iniciaNavesInimigas = setInterval(navesInimigas, 2000);                             // Chama a função navesInimigas a cada 2000 milisegundos (2 segundos)
    iniciaMovimentacaoNavesInimigas = setInterval(moverNavesInimigas, 50);              // Chama a função moverNavesInimigas a cada 50 milisegundos
    iniciaColisao = setInterval(colisaoTieFighter, 10);                                 // Chama a função moverNavesInimigas a cada 10 milisegundos
});