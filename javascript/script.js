/*------------------------------- OBJETOS HTML -------------------------------*/
const body = document.getElementById("body");
const cenario = document.getElementById("cenario");
const xwing = document.getElementById("x-wing");
const botaoIniciar = document.getElementById("btn_Inicar");
const menu = document.getElementById("menu");
const vida = document.getElementById("vida");
const pontos = document.getElementById("pontos");
const btnEspecialAtaque = document.getElementById("ataque_especial");
// Estastiticas do jogo
const painelDados = document.getElementById("dados-jogo");
const dadosVelXWing = document.getElementById("vel_x-wing");
const dadosVelRotXWing = document.getElementById("vel_rotacao_x-wing");
const dadosVelTieFighter = document.getElementById("vel_tie-fighter");
const dadosAnguloTieFighter = document.getElementById("angulo_tie-fighter");
const dadosVelConstrucaoTieFighter = document.getElementById("vel_constr_tie-fighter");
const dadosInimigosDestruidos = document.getElementById("inimigos_destruidos");
const dadosVidaEstrelaDaMorte = document.getElementById("lifeDeathStar");

/*------------------------------- VARIAVEIS GLOBAIS -------------------------------*/
const larguraCenario = cenario.offsetWidth; // Pega a largura de todod o cenario
const alturaCenario = cenario.offsetHeight; // Pega a altura de todod o cenario 
const larguraXWing = xwing.offsetWidth;     // Pega a largura do X-Wing
const alturaXWing = xwing.offsetHeight;     // Pega a altura do X-Wing
const larguraTieFighter = 100;              // Pega a largura do X-Wing
const alturaTieFighter = 95.56;             // Pega a altura do X-Wing
const velocidadeMaximaXWing = 20;           // Define a velocidade máxima do X-Wing
const velMaximaRotacaoXWing = 8;            // Define a velocidade de rotação máxima do X-Wing
const velocidadeProjetilXWing = 50;         // 40 - define a velocidade dos projeteis das naves
const velocidadeMaximaTieFighter = 12;      // Define a velocidade máxima dos Tie Fighters
const quantidadeMaximaTieFighters = 1000;   // Define o tempo máximo de criação dos Tie Fighters (em milisegundos)
const velocidadeProjetilTieFighter = 50;    // 10 - define a velocidade dos projeteis das naves
const velocidadeProjetilDeathStar = 50;
const anguloMaximo = 61;                    // Define o angulo máximo de descida dos Tie Fighters (em graus), soma mais 1

let velocidadeXWing = 10;                // 10 - Define a velocidade inicial do X-Wing 
let velocidadeTieFighter = 1;            // 1 - Define a velocidade inicial dos Tie Fighters 
let quantidadeTieFighters = 3000;        // 3000 - Define o intervalo inicial em que serão criadas as naves inimigas (em milisegundos)
let anguloAtaqueTieFighter = 0;          // Recebe o angulo de ataque dos Tie Fighters (em graus)
let anguloTieFighter = 0;                // Variavel para controlar a rotação dos Tie Fighters
let velocidadeDisparosTieFighter = 500;  // Cadencia de disparo dos Tie Fighters (em milisegundos)
let velocidadeCenario = 200;             // define a velocidade do cenario
let pontosVida = 100;                    // 100 - define a vida inicial do X-Wing
let pontosScore = 0;                     // Define a pontuação inicial
let estaAtirando = false;                // Flada para saber se o X-Wing está atirando ou não
let countNavesDestruidas = 0;            // Contador de naves destruídas
let rotacaoXWing = 0;                    // 0 - Variavel para controlar a rotação do X-Wing
let velRotacaoXWing = 2;                 // 2 - Define a velocidade inicial de rotação do X-Wing
let giroHorario = false;                 // Flag para controlar a rotação do X-Wing no sentido horário
let giroAntiHorario = false;             // Flag para controlar a rotação do X-Wing no sentido anti-horário
let iniciarBossDeathStar = true;         // Flag para iniciar a fase da estrela da morte
let vidaEstrelaDaMorte = 10;            // 600 Pontos de vida da Estrela da Morte
let estrelaDestruida = false;            // Flag para verificar se a Estrela da Morte foi destruída
let habilitarAtaqueEspecial = false;
let sinalObiWan = true;
let velocidadeDisparosDeathStar = 500;
let okGameOver = true;

let posicaoHorizontal = larguraCenario / 2 - (larguraXWing / 2); // Posição horizontal inicial do X-Wing
let positionVertical = alturaCenario - alturaXWing - 20;         // Posição vertical inicial do X-Wing

let direcaoHorizontal = 0; // Variavel para manipular a direção horizontal do X-Wing
let direcaoVertical = 0;   // Variavel para manipular a direção vertical do X-Wing

let iniciaMovimentacaoXWing;
let iniciaProjeteisXWing;
let iniciaMovimentacaoProjeteisXWing;
let iniciaColisaoXWing;
let iniciaNavesInimigas;
let iniciaMovimentacaoNavesInimigas;
let iniciaProjeteisTieFighter;
let iniciaMovimentacaoProjeteisTieFighter;
let iniciaColisaoTieFighter;
let iniciaRotacaoXWing;
let iniciaColisaoEstrelaDaMorte;
let iniciaMovimentoTorpedoEspecial;

let iniciaProjeteisDeathStar;
let iniciaMovimentacaoProjeteisDeathStar;

/*------------------------------- INCIANDO JOGO -------------------------------*/
document.getElementById("btn_Inicar").addEventListener("click", function () {
    botaoIniciar.style.display = "none";                                                    // Esconde o botão iniciar após clicar nele
    menu.style.display = "flex";                                                            // Mostra o menu do jogo 
    xwing.style.bottom = "40vh";                                                            // Inicia a animação CSS
    cenario.style.animation = `animacaoCenario ${velocidadeCenario}s infinite linear`;      // Adiciona a animação de fundo do cenario
    trilhaSonora();                                                                         // Toca a trilha sonora do game
    somAcelerandoXWing();                                                                   // Toca o som do X-Wing acelerando
    // Atrasar o início do jogo por 3 segundos
    audioAcelerandoXWing.pause();                                                           // Encerra o audio da aceleração
    setTimeout(() => {
        somVoandoXWing();                                                                   // Inicia o audio de voo do X-Wing
        // Converte bottom: 40vh para positionVertical (em pixels)
        const vhToPx = window.innerHeight * 0.4;                                            // Converte 40vh para pixels
        positionVertical = alturaCenario - vhToPx - alturaXWing;                            // Calcula a posição vertical em pixels do X-Wing no final da animação
        xwing.style.top = positionVertical + "px";                                          // Atualiza a posição vertical do X-Wing
        xwing.style.bottom = "";                                                            // Remove a propriedade bottom para evitar conflitos
        // Inicia os intervalos do jogo
        document.addEventListener("keydown", teclasControlePressionadas);                   // Chama a função teclasControlePressionadas quando pressiona alguma tecla no teclado
        document.addEventListener("keyup", teclasControleSoltas);                           // Chama a função teclasControleSoltas quando soltar alguma tecla no teclado
        document.addEventListener("keypress", teclasControleClicadas);                      // Chama a função teclasControleClicadas quando clicar alguma tecla no teclado
        iniciaMovimentacaoXWing = setInterval(moverXWing, 20);                              // Chama a função moverXWing a cada 50 milisegundos
        iniciaProjeteisXWing = setInterval(atirar, 150);                                    // Chama a função atirar a cada 10 milisegundos
        iniciaMovimentacaoProjeteisXWing = setInterval(moverProjeteisXWing, 50);                 // Chama a função moverProjeteis a cada 50 milisegundos
        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);            // Chama a construção de naves inimigas a cada X milisegundos a primeiro momento
        iniciaMovimentacaoNavesInimigas = setInterval(moverNavesInimigas, 50);              // Define um tempo relativo a velocidade do Tie Fighter em que as naves levaram para cruzar a tela antes de aparecer novas
        iniciaProjeteisTieFighter = setInterval(atirarTieFighters, velocidadeDisparosTieFighter);
        iniciaMovimentacaoProjeteisTieFighter = setInterval(moverProjeteisTieFighter, 50);
        iniciaColisaoTieFighter = setInterval(colisaoTieFighter, 10);                                 // Chama a função moverNavesInimigas a cada 10 milisegundos
        iniciaColisaoXWing = setInterval(colisaoXWing, 10);
        iniciaColisaoEstrelaDaMorte = setInterval(colisaoEstrelaDaMorte, 10);
        iniciaMovimentoTorpedoEspecial = setInterval(movimentarProjetilEspecial, 20);
        iniciaRotacaoXWing = setInterval(() => {                                            // Chama a função para rotacionar o X-Wing a cada 20 milisegundos
            if (giroHorario) {                                                              // Se a flag giroHorario for true
                rotacaoXWing -= velRotacaoXWing;                                            // Decrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                       // Aplica a rotação no X-Wing
            } else if (giroAntiHorario) {                                                   // Se a flag giroAntiHorario for true
                rotacaoXWing += velRotacaoXWing;                                            // Incrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                       // Aplica a rotação no X-Wing
            }
        }, 20);

        const iniciaBoss = setInterval(() => { // Quando atingir a marca de 5000 pontos começa a fase da estrela da morte
            if (iniciarBossDeathStar) {
                if (pontosScore >= 100) {         // Verifica se a pontuação é maior ou igual a 5000
                    iniciarBossDeathStar = false; // Desativa a flag para não entrar mais nessa condição
                    clearInterval(iniciaBoss);
                    bossDeathStar();              // Chama a função para iniciar a fase da estrela da morte
                }
            }
        }, 20);

    }, 3000); // Atraso de 3 segundos
});

function resetGame() {
    location.reload();
}


/*------------------------------- FIM DE JOGO -------------------------------*/
function gameOver() {
    if (okGameOver) {
        audioVoandoXWing.loop = false;
        audioTrilhaSonora.loop = false;
        audioTrilhaSonora.pause();                                           // Pausa a trilha sonora do jogo
        audioVoandoXWing.pause();                                            // Pausa o som do X-Wing voando
        document.removeEventListener("keydown", teclasControlePressionadas); // Remove os eventos de controle do X-Wing de keydown
        document.removeEventListener("keyup", teclasControleSoltas);         // Remove os eventos de controle do X-Wing de keyup
        // Para todos os intervalos do jogo
        clearInterval(iniciaProjeteisXWing);
        clearInterval(iniciaMovimentacaoXWing);
        clearInterval(iniciaMovimentacaoProjeteisXWing);
        clearInterval(iniciaNavesInimigas);
        clearInterval(iniciaMovimentacaoNavesInimigas);
        clearInterval(iniciaColisaoTieFighter);
        clearInterval(iniciaProjeteisTieFighter);
        clearInterval(iniciaMovimentacaoProjeteisTieFighter);
        clearInterval(iniciaColisaoXWing);
        clearInterval(iniciaRotacaoXWing);
        clearInterval(iniciaMovimentoTorpedoEspecial);
        clearInterval(iniciaProjeteisDeathStar);
        clearInterval(iniciaMovimentacaoProjeteisDeathStar);
        habilitarAtaqueEspecial = false;
        btnEspecialAtaque.style.display = "none";
        explosaonNaves(xwing);                                               // Chama a explosão do X-Wing
        cenario.removeChild(xwing);                                          // Remove o X-Wing do cenario
        const navesInimigas = document.querySelectorAll(".tie_fighter");     // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
        navesInimigas.forEach((inimigos) => {                                // Percorre todos os Tie Fighters
            inimigos.remove();                                               // Remove cada um dos Tie Fighter do cenario
        });
        const disparosXWing = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis do X-Wing
        disparosXWing.forEach((disparos) => {                                // Percorre todos os projeteis do X-Wing
            disparos.remove();                                               // Remove cada um dos projeteis do X-Wing do cenario
        });
        const disparosTieFighter = document.querySelectorAll(".projetil_tie-fighter"); // Seleciona todos os elementos com a classe projetil_tie-fighter, ou seja, todos os projeteis do Tie-Fighter
        disparosTieFighter.forEach((disparos) => {                                     // Percorre todos os projeteis do Tie-Fighter
            disparos.remove();                                                         // Remove cada um dos projeteis do Tie-Fighter do cenario
        });
        const disparosDeathStar = document.querySelectorAll(".projetil_death-star");
        disparosDeathStar.forEach((disparos) => {
            disparos.remove();
        });
        // Depois de 3 segundos, tocar a risada do imperador
        const atrasoSuspense = setTimeout(() => {
            clearInterval(atrasoSuspense);
            // Mostra a mensagem de fim de jogo
            const gameover = document.createElement("h1");
            gameover.innerHTML = "Game Over<br>O Imperio Venceu";
            gameover.className = "gameover";
            cenario.appendChild(gameover);
            menu.style.display = "none";                               // Esconde o menu do jogo
            const audio = new Audio('../audios/risada_palpatine.MP3'); // Audio X-Wing acelerando
            audio.play();
            const delaySurgirBotao = setTimeout(() => {
                clearInterval(delaySurgirBotao);
                const btnReiniciar = document.createElement("button");
                btnReiniciar.id = "btnReiniciar";
                btnReiniciar.className = "botao";
                btnReiniciar.style.position = "absolute";
                btnReiniciar.style.bottom = "100px";
                btnReiniciar.innerText = "REINICIAR";
                btnReiniciar.addEventListener("click", () => {
                    resetGame();
                });
                cenario.appendChild(btnReiniciar);
            }, 2000);
        }, 3000);
    }
}
