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
let vidaEstrelaDaMorte = 600;            // 600 Pontos de vida da Estrela da Morte
let estrelaDestruida = false;            // Flag para verificar se a Estrela da Morte foi destruída
let habilitarAtaqueEspecial = false;
let sinalObiWan = true;
let velocidadeDisparosDeathStar = 500;

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
            // Quando atingir a marca de 5000 pontos começa a fase da estrela da morte
            if (iniciarBossDeathStar) {
                if (pontosScore >= 5000) {         // Verifica se a pontuação é maior ou igual a 5000
                    iniciarBossDeathStar = false; // Desativa a flag para não entrar mais nessa condição
                    bossDeathStar();              // Chama a função para iniciar a fase da estrela da morte
                }
            }
        }, 20);
    }, 3000); // Atraso de 3 segundos
});

function resetGame() {
    location.reload();
}


/*------------------------------- MONITORANDO TECLAS E CONTROLE -------------------------------*/
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
    } if (tecla.key === "f" || tecla.key === "F") {
        if (habilitarAtaqueEspecial) {
            habilitarAtaqueEspecial = false;
            btnEspecialAtaque.style.display = "none";
            xwingEspecialAtaque();
        }
    }
}


/*------------------------------- X-WING -------------------------------*/
// Função para mover o X-Wing
function moverXWing() {
    // as variaveis direcaoHorizontal e direcaoVertical soman ou subtraem na coordenada atual do X-Wing, a velocidadeXWing define o quão rapido ele se move
    posicaoHorizontal += direcaoHorizontal * velocidadeXWing; // atuzliza as coordenadas horizontais do X-Wing
    positionVertical += direcaoVertical * velocidadeXWing;    // atuzliza as coordenadas verticais do X-Wing
    // limitando a movimentação do X-Wing para não ultrapassar o cenario na horizontal
    if (giroHorario) {
        rotacaoXWing -= velRotacaoXWing;
    } else if (giroAntiHorario) {
        rotacaoXWing += velRotacaoXWing;
    }
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
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;
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
    const speed = velocidadeProjetilXWing;    // Velocidade do projétil
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

// Função para atirar
function atirar() {
    if (estaAtirando) {                                                         // Se a flag estaAtirando for true, cria os projéteis
        criarProjeteisXWing(posicaoHorizontal, positionVertical, rotacaoXWing); // Chama a função para criar os projéteis do X-Wing, passando a posição atual do X-Wing
        somCanhoesXWing();                                                      // Toca o som dos canhões do X-Wing
    }
}

// Função para mover os projéteis do X-Wing
function moverProjeteisXWing() {
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

// Colisão com projeteis do Tie-Fighter
function colisaoXWing() {
    const todosDisparosTieFighter = document.querySelectorAll(".projetil_tie-fighter");
    todosDisparosTieFighter.forEach((disparo) => {                                                  // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                               // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                           // Pega as coordenadas do projetil
        if (                                                                              // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                             // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                             // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                             // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            pontosVida -= 5;                                                         // Diminui 1 ponto para cada projetil que acertar o X-Wing
            atualizarMenu();
            disparo.remove();
            if (pontosVida <= 20) mostrarToasty();
            if (pontosVida <= 0) gameOver();                                  // Se a vida chegar a 0, chama a função gameOver
        }
    });

    const todosDisparosDeathStar = document.querySelectorAll(".projetil_death-star");
    todosDisparosDeathStar.forEach((disparo2) => {                                                  // Percorre todos os projeteis
        const colisaoXWing2 = xwing.getBoundingClientRect();                               // Pega as coordenadas do X-Wing    
        const colisaoDisparo2 = disparo2.getBoundingClientRect();                           // Pega as coordenadas do projetil
        if (                                                                              // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing2.left < colisaoDisparo2.right &&                             // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing2.right > colisaoDisparo2.left &&                             // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing2.top < colisaoDisparo2.bottom &&                             // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing2.bottom > colisaoDisparo2.top                                // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            pontosVida -= 20;                                                         // Diminui 1 ponto para cada projetil que acertar o X-Wing
            atualizarMenu();
            disparo2.remove();
            if (pontosVida <= 20) mostrarToasty();
            if (pontosVida <= 0) gameOver();                                  // Se a vida chegar a 0, chama a função gameOver
        }
    });

    showEstatisticas(); // Atualiza as estatísticas do jogo
}

/*------------------------------- TIE-FIGHTERS -------------------------------*/
// Construindo naves inimigas em lugares aleatorios
function navesInimigas() {
    const tieFighter = document.createElement("div");  // Cria um elemento div, que vai ser o Tie Fighter
    tieFighter.className = "tie_fighter";              // Adiciona a classe do Tie Fighter para aplicar o estilo
    tieFighter.setAttribute("data-vida", 3);           // Cria o atributo data-vida para armazenar a vida do Tie Fighter

    // Posição inicial (aleatória na horizontal, topo da tela)
    const posicaoLeft = Math.floor(Math.random() * (larguraCenario - larguraTieFighter));  // Cria uma posição aleatória na horizontal dentro do cenario para o Tie Fighter
    tieFighter.style.left = posicaoLeft + "px";                                            // Define a posição horizontal do Tie Fighter
    tieFighter.style.top = "0";                                                            // Define a posição vertical do Tie Fighter no topo do cenario

    // Definir trajetória diagonal
    const angleDeg = Math.floor(Math.random() * anguloTieFighter);  // Gera um ângulo aleatório entre 0 e 60 graus
    const angleRad = angleDeg * Math.PI / 180;                      // Converte o ângulo gerado aleatoriamente para radianos
    const speed = velocidadeTieFighter;                             // Velocidade do Tie Fighter
    const direction = Math.random() < 0.5 ? 1 : -1;                 // 50% para direita, 50% para esquerda
    const vx = direction * speed * Math.sin(angleRad);              // Velocidade horizontal (direita ou esquerda)
    const vy = speed * Math.cos(angleRad);                          // Velocidade vertical (sempre para baixo)
    anguloAtaqueTieFighter = angleDeg;                              // Atualiza o ângulo de ataque global para exibição

    // Armazenar velocidades
    tieFighter.setAttribute("data-vx", vx.toFixed(2));  // Define um atributo data-vx para armazenar a velocidade horizontal
    tieFighter.setAttribute("data-vy", vy.toFixed(2));  // Define um atributo data-vy para armazenar a velocidade vertical

    // Adiciona o Tie Fighter ao cenario
    cenario.appendChild(tieFighter);      // Adiciona o Tie Fighter ao cenario
    //criarProjeteisTieFighter(tieFighter); // Faz o Tie Fighter atirar uma vez assim que for criado
    somCanhoesTieFighter();               // Toca o som dos canhões do Tie Fighter
    somVoandoTieFighter();                // Toca o som do Tie Fighter voando
}

// Movimentando naves inimigas
function moverNavesInimigas() {
    const tieFighters = document.querySelectorAll(".tie_fighter");  // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    for (let i = 0; i < tieFighters.length; i++) {                  // Percorre todos os Tie Fighters
        if (tieFighters[i]) {                                       // Verifica se o Tie Fighter existe
            // Pega posição atual
            let left = parseFloat(tieFighters[i].style.left);  // Converte de string para float a posição horizontal atual do Tie Fighter
            let top = parseFloat(tieFighters[i].style.top);    // Converte de string para float a posição vertical atual do Tie Fighter

            // Calcula centro da nave
            const halfWidth = larguraTieFighter / 2;  // Metade da largura do Tie Fighter
            const halfHeight = alturaTieFighter / 2;  // Metade da altura do Tie Fighter
            let centerX = left + halfWidth;           // Centro X da nave
            let centerY = top + halfHeight;           // Centro Y da nave

            // Pega velocidades vetoriais
            let vx = parseFloat(tieFighters[i].getAttribute("data-vx"));  // Converte de string para float a velocidade horizontal do Tie Fighter
            let vy = parseFloat(tieFighters[i].getAttribute("data-vy"));  // Converte de string para float a velocidade vertical do Tie Fighter

            // Atualiza posição do centro
            centerX += vx;  // Atualiza a posição X do centro do Tie Fighter
            centerY += vy;  // Atualiza a posição Y do centro do Tie Fighter

            // Atualiza posição do canto superior esquerdo
            tieFighters[i].style.left = (centerX - halfWidth) + "px";  // Atualiza a posição horizontal do Tie Fighter
            tieFighters[i].style.top = (centerY - halfHeight) + "px";  // Atualiza a posição vertical do Tie Fighter

            // Remove se sair do cenário
            if (centerX < -halfWidth || centerX > larguraCenario + halfWidth ||
                centerY < -halfHeight || centerY > alturaCenario + halfHeight) {  // Se o centro do Tie Fighter sair do cenario
                pontosVida -= 5;                                                  // Diminui 5 pontos de vida
                atualizarMenu();                                                    // Atualiza a vida no menu
                tieFighters[i].parentNode.removeChild(tieFighters[i]);            // Remove o Tie Fighter do cenario
                if (pontosVida <= 20) mostrarToasty();                            // Se a vida estiver abaixo de 20%, mostra o toasty
                if (pontosVida <= 0) gameOver();                                  // Se a vida chegar a 0, chama a função gameOver
            }
        }
    }
}

let countInimigosDestruidos = 0; // Contador de inimigos destruídos

// Colisão com as naves inimigas
function colisaoTieFighter() {
    const todasNavesInimigas = document.querySelectorAll(".tie_fighter");                     // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");                      // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    todasNavesInimigas.forEach((naveInimiga) => {                                            // Percorre todos os Tie Fighters
        todosDisparos.forEach((disparo) => {                                                  // Percorre todos os projeteis
            const colisaoNaveInimiga = naveInimiga.getBoundingClientRect();                  // Pega as coordenadas do Tie Fighter    
            const colisaoDisparo = disparo.getBoundingClientRect();                           // Pega as coordenadas do projetil
            let vidaAtuaTieFighter = parseInt(naveInimiga.getAttribute("data-vida"), 10);    // Pega a vida atual do Tie Fighter   
            if (                                                                              // Verifica se houve colisão entre o Tie Fighter e o projetil
                colisaoNaveInimiga.left < colisaoDisparo.right &&                             // Verifica se o lado esquerdo do Tie Fighter é menor que o lado direito do projetil
                colisaoNaveInimiga.right > colisaoDisparo.left &&                             // Verifica se o lado direito do Tie Fighter é maior que o lado esquerdo do projetil
                colisaoNaveInimiga.top < colisaoDisparo.bottom &&                             // Verifica se o topo do Tie Fighter é menor que a parte de baixo do projetil
                colisaoNaveInimiga.bottom > colisaoDisparo.top                                // Verifica se a parte de baixo do Tie Fighter é maior que o topo do projetil
            ) {
                vidaAtuaTieFighter--;                                                         // Diminui 1 ponto para cada projetil que acertar o Tie Fighter
                pontosScore += 10;                                                            // Adiciona 10 pontos na pontuação para cada acerto no Tie Fighter
                atualizarMenu();                                                                // Atualiza a pontuação no menu
                disparo.remove();                                                             // Remove o projetil do cenario
                if (vidaAtuaTieFighter <= 0) {                                                // Se a vida do Tie Fighter chegar a 0
                    countNavesDestruidas++;                                                   // Incrementa o contador de naves destruídas
                    velocidadeTieFighter += 0.5;                                              // Aumenta a velocidade dos Tie Fighters
                    velocidadeXWing += 0.1;                                                   // Aumenta a velocidade do X-Wing
                    velRotacaoXWing += 0.1;                                                   // Aumenta a velocidade de rotação do X-Wing
                    if (velocidadeXWing >= velocidadeMaximaXWing) {                           // Verifica se a velocidade do X-Wing ultrapassou os limites
                        velocidadeXWing = velocidadeMaximaXWing;                              // Limita a velocidade máxima do X-Wing
                    }
                    if (velRotacaoXWing >= velMaximaRotacaoXWing) {                           // Verifica se a velocidade de rotação do X-Wing ultrapassou os limites
                        velRotacaoXWing = velMaximaRotacaoXWing;                              // Limita a velocidade máxima de rotação do X-Wing
                    }
                    if (velocidadeTieFighter >= velocidadeMaximaTieFighter) {                 // Verifica se a velocidade do Tie Fighter ultrapassou os limites
                        velocidadeTieFighter = velocidadeMaximaTieFighter;                    // Limita a velocidade máxima dos Tie Fighters
                    }
                    if (quantidadeTieFighters > quantidadeMaximaTieFighters) {                    // Limita o tempo mínimo de criação dos Tie Fighters
                        quantidadeTieFighters -= 100;                                             // Diminui o tempo de criação dos Tie Fighters
                        clearInterval(iniciaNavesInimigas);                                       // Limpa o intervalo atual
                        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);  // Reinicia o intervalo com o novo tempo  
                    }
                    if (anguloTieFighter < anguloMaximo) {                                        // Limita o ângulo máximo de ataque dos Tie Fighters
                        anguloTieFighter += 5;                                                    // Aumenta o ângulo máximo em 5 graus
                    }
                    countInimigosDestruidos++;           // Variavel contadora para monitorar inimigos derrotados para aumentar pontos de vida
                    if (countInimigosDestruidos >= 5) {  // Se derrotar 5 inimigos
                        if (pontosVida < 100) {
                            pontosVida += 10;
                        } else if (pontosVida >= 100) {
                            pontosVida = 100;
                        }
                        // Ganha mais 10 pontos de vida
                        countInimigosDestruidos = 0;     // Zera a contagem
                    }
                    pontosScore += 100;                  // Adiciona 100 pontos na pontuação para cada Tie Fighter destruído
                    atualizarMenu();                       // Atualiza a pontuação no menu
                    // Construindo o efeito de explosão
                    explosaonNaves(naveInimiga);
                    somExplosaoNaves();                              // Chama o audio de explosão do Tie Fighter
                    naveInimiga.remove();                                // Remove o Tie Fighter do cenario
                } else {
                    naveInimiga.setAttribute("data-vida", vidaAtuaTieFighter); // Atualiza a vida do Tie Fighter
                }
                showEstatisticas(); // Atualiza as estatísticas do jogo
            }
        })
    });
}

// Função para criar os projeteis do Tie Fighter
const criarProjeteisTieFighter = (tieFighter) => {
    const posicaoLeftTiro = parseFloat(tieFighter.style.left); // Pega a posição horizontal atual do Tie Fighter
    const posicaoTopTiro = parseFloat(tieFighter.style.top);   // Pega a posição vertical atual do Tie Fighter
    const centerX = posicaoLeftTiro + larguraTieFighter / 2;   // Centro X do Tie Fighter
    const centerY = posicaoTopTiro + alturaTieFighter / 2;     // Centro Y do Tie Fighter
    // Cria dois elementos de disparo, um de cada lado do Tie Fighter
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "projetil_tie-fighter";      // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX + 5 + "px";         // Define a posição horizontal do projetil referente a posição central horizontal do Tie Fighter
    tiroEsquerdo.style.top = centerY + 0 + "px";         // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "projetil_tie-fighter";
    tiroDireito.style.left = centerX - 10 + "px";
    tiroDireito.style.top = centerY + 0 + "px";
    cenario.appendChild(tiroDireito);
}

// Função para atirar
function atirarTieFighters() {
    const tieFighters = document.querySelectorAll(".tie_fighter"); // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    const quantidadeInimigos = tieFighters.length;                 // Pega a quantidade de Tie Fighters
    if (quantidadeInimigos === 0) return;                          // Se não houver Tie Fighters, sai da função

    // Decide quantos TIEs vão atirar
    let disparos = 1;                                                           // Por padrão, 1 TIE atira
    if (quantidadeInimigos > 3 && quantidadeInimigos <= 6) disparos = 2;        // Se houver entre 4 e 6 TIEs, 2 atiram
    else if (quantidadeInimigos > 6 && quantidadeInimigos <= 9) disparos = 3;   // Se houver entre 7 e 9 TIEs, 3 atiram
    else if (quantidadeInimigos > 9 && quantidadeInimigos <= 12) disparos = 4;  // Se houver entre 10 e 12 TIEs, 4 atiram
    else if (quantidadeInimigos > 12 && quantidadeInimigos <= 15) disparos = 5; // Se houver entre 13 e 15 TIEs, 5 atiram

    // Sorteia e faz disparos
    for (let i = 0; i < disparos; i++) {                                  // Para cada disparo
        const aleatorio = Math.floor(Math.random() * quantidadeInimigos);   // Sorteia um índice aleatório entre 0 e quantidadeInimigos-1
        const tieEscolhido = tieFighters[aleatorio];                        // Seleciona o Tie Fighter sorteado
        if (!tieEscolhido) continue;                                        // Se o Tie Fighter não existir (pode ter sido destruído), pula para o próximo
        criarProjeteisTieFighter(tieEscolhido);                             // Chama a função para criar os projeteis do Tie Fighter sorteado
        somCanhoesTieFighter();                                             // Toca o som dos canhões do Tie Fighter
    }
}


// Função para mover os projeteis do Fighter
function moverProjeteisTieFighter() {
    const tiros = document.querySelectorAll(".projetil_tie-fighter"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilTieFighter;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {            // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}


/*------------------------------- EFEITOS VISUAIS -------------------------------*/
// Efeito de nave explodindo
function explosaonNaves(nave) {
    const posicaoNave = nave.getBoundingClientRect();   // Pega as coordenadas da nave
    const explosao = document.createElement("div");     // Cria um elemento div, que vai ser a explosão
    explosao.className = "explosao";                    // Adiciona a classe da explosão para aplicar o estilo
    explosao.style.left = posicaoNave.left + "px";      // Pega a posição horizontal da nave
    explosao.style.top = posicaoNave.top + "px";        // Pega a posição vertical da nave
    cenario.appendChild(explosao);                      // Adiciona a explosão ao cenario
    somExplosaoNaves();                            // Chama o audio de explosão da nave
    setTimeout(() => {                                  // Depois de 500 milissegundos
        explosao.remove();                              // Remove a explosão
    }, 500);
}

// Efeito Toasty
let ultimaVez = 0;       // guarda quando o toast foi exibido
const intervalo = 10000; // intervalo mínimo (10 segundos)
function mostrarToasty() {
    const agora = Date.now(); // tempo atual em ms
    if (agora - ultimaVez < intervalo) { // se foi exibido recentemente 
        // ainda dentro do intervalo, não mostra
        return;
    }
    ultimaVez = agora;                                      // atualiza o último tempo
    const toast = document.getElementById("stormtropper");  // Pega o objeto que será o toast
    toast.classList.add("show");                            // Adiciona a classe show para exibir o toast
    const audio = new Audio('../audios/toasty_sound.mp3');  // Audio do Toasty
    audio.volume = 0.6;                                     // Define o volume do audio
    audio.play();                                           // Toca o audio
    setTimeout(() => {                                      // Depois de 1 segundo
        toast.classList.remove("show");                     // Remove a classe show para esconder o toast
    }, 1000);                                               // visível por 1s
}

// Atualizar o menu do jogo
function atualizarMenu() {
    vida.innerText = `Vida: ${pontosVida}%`;     // Atualiza a vida no menu
    pontos.innerText = `Pontos: ${pontosScore}`; // Atualiza a pontuação no menu
}

// Atualizando as estatisticas do jogo
function showEstatisticas() {
    dadosVelXWing.innerText = `Vel. X-Wing: ${velocidadeXWing.toFixed(2)}`;
    dadosVelRotXWing.innerText = `Vel. Rotacao X-Wing: ${velRotacaoXWing.toFixed(2)}`;
    dadosVelTieFighter.innerText = `Vel. Tie-Fighter: ${velocidadeTieFighter.toFixed(2)}`;
    dadosAnguloTieFighter.innerText = `Angulo Tie-Fighter: ${anguloAtaqueTieFighter}°`;
    dadosVelConstrucaoTieFighter.innerText = `Vel. Constr. Tie-Fighter: ${quantidadeTieFighters} ms`;
    dadosInimigosDestruidos.innerText = `Inimigos Destruidos: ${countNavesDestruidas}`;
    dadosVidaEstrelaDaMorte.innerText = `Estrela da Morte: ${vidaEstrelaDaMorte}`;
}

/*------------------------------- EFEITOS SONOROS -------------------------------*/
const audioTrilhaSonora = new Audio('../audios/soundtrack.MP3'); // Audio X-Wing voando
function trilhaSonora() {
    audioTrilhaSonora.volume = 0.5;
    audioTrilhaSonora.loop = true; // Configura para tocar ininterruptamente
    audioTrilhaSonora.play();
}

// Aqui é o truque: quando a trilha principal for pausada ira tocar a trilha sonora da Estrela da Morte
audioTrilhaSonora.addEventListener("pause", () => {
    setTimeout(() => {
        trilhaSonoraEstrelaDaMorte();
    }, 6000); // espera 5 segundos
});

const audioTrilhaSonoraEstrelaDaMorte = new Audio('../audios/deathstar_suite.MP3'); // Audio tiro de canhoes X-Wing
function trilhaSonoraEstrelaDaMorte() {
    audioTrilhaSonoraEstrelaDaMorte.volume = 1;
    audioTrilhaSonoraEstrelaDaMorte.play();
}

function somCanhoesXWing() {
    const audio = new Audio('../audios/x-wing_cannons-2.m4a'); // Audio tiro de canhoes X-Wing
    audio.volume = 0.3;    // volume de 0 a 1
    audio.currentTime = 0; // volta pro início
    audio.play();          // toca o audio
}

function somCanhoesXWingProtons() {
    const audio = new Audio('../audios/x-wing_cannons_protons.mp3'); // Audio tiro de canhoes X-Wing
    audio.volume = 1;    // volume de 0 a 1
    audio.currentTime = 0; // volta pro início
    audio.play();          // toca o audio
}

const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
function somAcelerandoXWing() {
    const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
    audioAcelerandoXWing.volume = 0.3;
    audioAcelerandoXWing.play();
}

const audioVoandoXWing = new Audio('../audios/x-wing_flying.m4a'); // Audio X-Wing voando
function somVoandoXWing() {
    audioVoandoXWing.volume = 0.3;
    audioVoandoXWing.loop = true; // Configura para tocar ininterruptamente
    audioVoandoXWing.play();
}

function somExplosaoNaves() {
    const audio = new Audio('../audios/tie-fighter_explosion.m4a'); // Audio de explosão
    audio.currentTime = 0; // volta pro início
    audio.volume = 0.3;
    audio.play();
}

function somExplosaoEstrelaDaMorte() {
    const audio = new Audio('../audios/explosion_deathstar.mp3'); // Audio de explosão
    //audio.volume = 1;
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

function somCanhoesTieFighter() {
    const audio = new Audio('../audios/tie-fighter_cannon.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 0.2;     // volume de 0 a 1
    audio.currentTime = 0;  // volta pro início
    audio.play();           // toca o audio
}

function somSinalObiWan() {
    const audio = new Audio('../audios/use_a_forca_luke.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 1;     // volume de 0 a 1
    audio.play();         // toca o audio
}

function somVitoria() {
    const audio = new Audio('../audios/victory_theme.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 1;     // volume de 0 a 1
    audio.play();         // toca o audio
}

/*------------------------------- ESTRELA-DA-MORTE -------------------------------*/
function bossDeathStar() {
    // Para a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);       
    clearInterval(iniciaProjeteisTieFighter); 
    audioTrilhaSonora.pause();                // Interrompe a trilha sonora principal
    pontosVida = 100;                         // Recarrega avida para enfrentar a estrela da morte
    atualizarMenu();
    const intervaloSuspense = setInterval(() => {                 // Cria um atraso antes da Estrela da Morte Aparecer
        clearInterval(intervaloSuspense);
        const deathstar = document.createElement("div");          // Cria um elemento div, que vai ser a Estrela-da-Morte
        deathstar.id = "estrela-da-morte";                        // Adiciona um id a Estrela-da-Morte
        deathstar.className = "deathstar";                        // Adiciona a classe da Estrela-da-Morte para aplicar o estilo
        deathstar.setAttribute("data-vida", vidaEstrelaDaMorte);  // Cria o atributo data-vida para armazenar a vida da Estrela-da-Morte
        cenario.insertAdjacentElement("afterbegin", deathstar);   // Adiciona a Estrela-da-Morte no início do cenario
        let posY = 100;                                           // posição inicial (fora da tela, em px)
        deathstar.style.bottom = posY + "%";                      // Define a posição vertical inicial da Estrela-da-Morte
        const intervalo = setInterval(() => {                     // Cria um intervalo para mover a Estrela-da-Morte
            if (estrelaDestruida == false) {                      // Se a Estrela-da-Morte não foi destruída
                if (estrelaDestruida == false) posY -= 0.1;                                      // velocidade (quanto maior, mais rápido desce)
                deathstar.style.bottom = posY + "%";              // Atualiza a posição vertical da Estrela-da-Morte
                if (posY <= -10) {                                 // Se a Estrela-da-Morte chegar ao meio da tela
                    audioTrilhaSonoraEstrelaDaMorte.pause();      // Interrompe a trilha sonora da Estrela da Morte
                    deathstar.style.bottom = "-10%";               // Fixa no topo do cenário
                    clearInterval(intervalo);                     // para quando sair da tela
                    gameOver();            // Chama a função gameOver
                }
            }
        }, 20); // tempo em ms → quanto menor, mais suave

        iniciaProjeteisDeathStar = setInterval(criarProjeteisDeathStar, velocidadeDisparosDeathStar);
        iniciaMovimentacaoProjeteisDeathStar = setInterval(moverProjeteisDeathStar, 50);

    }, 8000);   // 8000 Tempo para aguardar a estrela da Morte Aparecer
}

function colisaoEstrelaDaMorte() {
    const deathstarElement = document.getElementById("estrela-da-morte");
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");
    if (deathstarElement) {
        const deathstarRect = deathstarElement.getBoundingClientRect();
        todosDisparos.forEach((disparo) => {
            const colisaoDisparo = disparo.getBoundingClientRect();
            if (
                deathstarRect.left < colisaoDisparo.right &&
                deathstarRect.right > colisaoDisparo.left &&
                deathstarRect.top < colisaoDisparo.bottom &&
                deathstarRect.bottom > colisaoDisparo.top
            ) {
                vidaEstrelaDaMorte -= 4;
                pontosScore += 10;
                pontos.innerText = `Pontos: ${pontosScore}`;
                disparo.remove();
                if (vidaEstrelaDaMorte <= 0) {
                    habilitarAtaqueEspecial = true;
                    btnEspecialAtaque.style.display = "block";
                    if (sinalObiWan) {
                        sinalObiWan = false;
                        somSinalObiWan();
                    }
                } else {
                    deathstarElement.setAttribute("data-vida", vidaEstrelaDaMorte);
                }
                showEstatisticas();
            }
        });
    }
}

function explosaoEstrelaDaMorte() {
    clearInterval(iniciaProjeteisDeathStar);
    clearInterval(iniciaMovimentacaoProjeteisDeathStar);
    clearInterval(iniciaColisaoEstrelaDaMorte);

    const disparosDeathStar = document.querySelectorAll(".projetil_death-star");
    disparosDeathStar.forEach((disparos) => {
        disparos.remove();
    });

    const deathstarElement = document.getElementById("estrela-da-morte");
    const deathstarRect = deathstarElement.getBoundingClientRect();
    audioTrilhaSonoraEstrelaDaMorte.pause();      // Interrompe a trilha sonora da Estrela da Morte
    estrelaDestruida = true; // Marca que a Estrela-da-Morte foi destruída
    const explosao = document.createElement("div");
    explosao.className = "explosao";
    explosao.style.left = deathstarRect.left + "px";
    explosao.style.top = deathstarRect.top + "px";
    explosao.style.width = "100vw";
    explosao.style.height = "100vw";
    deathstarElement.remove();
    cenario.appendChild(explosao);
    somExplosaoEstrelaDaMorte();
    const intervaloExplosao = setTimeout(() => {
        explosao.remove();
        audioVoandoXWing.pause();
        clearInterval(intervaloExplosao);
        // Criar efeito de saida
    }, 5000);
    // Opcional: Finalizar jogo ou reiniciar
}

function criarProjeteisDeathStar() {
    const disparo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    const posicaoHorizontal = Math.floor(Math.random() * larguraCenario);  // Cria uma posição aleatória na horizontal 
    disparo.className = "projetil_death-star";      // Adiciona a classe do projetil para aplicar o estilo
    disparo.style.left = posicaoHorizontal + "px";         // Define a posição horizontal do projetil referente a posição central horizontal do Tie Fighter
    disparo.style.top = "0px";         // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(disparo);                    // Adiciona o projetil ao cenario
}

function moverProjeteisDeathStar() {
    const tiros = document.querySelectorAll(".projetil_death-star"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilDeathStar;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {            // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}


/*------------------------------- VITORIA -------------------------------*/

function xwingEspecialAtaque() {
    // Desativa controles e intervalos
    document.removeEventListener("keydown", teclasControlePressionadas);
    document.removeEventListener("keyup", teclasControleSoltas);
    document.removeEventListener("keypress", teclasControleClicadas);
    clearInterval(iniciaProjeteisXWing);
    clearInterval(iniciaMovimentacaoXWing);
    clearInterval(iniciaNavesInimigas);
    clearInterval(iniciaProjeteisTieFighter);

    // Define rotação para apontar para cima
    rotacaoXWing = 0; // Ajuste para -90deg se necessário
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;

    // Posições inicial e alvo
    let posX = parseFloat(xwing.style.left);
    let posY = parseFloat(xwing.style.top);
    const targetX = larguraCenario / 2 - larguraXWing / 2;
    const targetY = alturaCenario - alturaXWing;
    const speed = 5;

    // Animação para mover o X-Wing
    const intervaloMovimento = setInterval(() => {
        const dx = targetX - posX;
        const dy = targetY - posY;
        posX += dx * 0.1;
        posY += dy * 0.1;
        xwing.style.left = posX + "px";
        xwing.style.top = posY + "px";
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            clearInterval(intervaloMovimento);
            xwing.style.left = targetX + "px";
            xwing.style.top = targetY + "px";
            // Disparar projetil especial
            projetilEspecial();
        }
    }, 30);
}

function projetilEspecial() {
    const posicaoLeftTiro = parseFloat(xwing.style.left); // Pega a posição horizontal atual do Tie Fighter
    const posicaoTopTiro = parseFloat(xwing.style.top);   // Pega a posição vertical atual do Tie Fighter
    const centerX = posicaoLeftTiro + larguraXWing / 2;   // Centro X do Tie Fighter
    const centerY = posicaoTopTiro + alturaXWing / 2;     // Centro Y do Tie Fighter
    // Cria dois elementos de disparo, um de cada lado do Tie Fighter
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "torpedo_x-wing";      // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX + 35 + "px";         // Define a posição horizontal do projetil referente a posição central horizontal do Tie Fighter
    tiroEsquerdo.style.top = centerY - 150 + "px";         // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "torpedo_x-wing";
    tiroDireito.style.left = centerX - 55 + "px";
    tiroDireito.style.top = centerY - 150 + "px";
    cenario.appendChild(tiroDireito);
    somCanhoesXWingProtons();
}

function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetilXWing;  // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil < 0) {            // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario
                const intervaloMovimento = setInterval(() => { // Cria um atraso para esperar o torpedo atingir o alvo 
                    clearInterval(intervaloMovimento);
                    xwingSaindo();
                }, 1000);
            }
        }
    }
}

function xwingSaindo() {
    document.removeEventListener("keydown", teclasControlePressionadas);
    document.removeEventListener("keyup", teclasControleSoltas);
    document.removeEventListener("keypress", teclasControleClicadas);
    clearInterval(iniciaProjeteisXWing);
    clearInterval(iniciaMovimentacaoXWing);
    clearInterval(iniciaNavesInimigas);
    clearInterval(iniciaProjeteisTieFighter);

    // Define rotação para apontar para cima
    rotacaoXWing = 0; // Ajuste para -90deg se necessário
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;

    // Pega posição inicial
    let posY = parseFloat(xwing.style.top);
    const speed = 50; // 10 pixels por frame
    const intervalo = setInterval(() => {
        posY -= speed;
        xwing.style.top = posY + "px";
        // Verifica se o X-Wing saiu do cenário
        if (posY <= -alturaXWing) {
            clearInterval(intervalo);
            const tempoExplosao = setInterval(() => {
                clearInterval(tempoExplosao);
                explosaoEstrelaDaMorte();
                const tempoPosExplosao = setInterval(() => {
                    clearInterval(tempoPosExplosao);
                    console.log("Vitoria");
                    const vitoria = document.createElement("h1");
                    vitoria.className = "gamewin";
                    vitoria.innerHTML = "Contra todas as probabilidades, voce triunfou!<br>Gracas a voce o terror tecnologico do Imperio caiu em ruinas,<br>trazendo uma nova era de esperanca para a Galaxia";
                    // força o fade-in
                    setTimeout(() => {
                        vitoria.style.opacity = 1;
                    }, 100); // 50ms já é suficiente
                    cenario.appendChild(vitoria);
                    somVitoria(); // Adicione se tiver um áudio
                }, 5000);
            }, 3000);
        }
    }, 20);
}


/*------------------------------- FIM DE JOGO -------------------------------*/
function gameOver() {
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