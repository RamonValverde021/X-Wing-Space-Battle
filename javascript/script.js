/*------------------------------- OBJETOS HTML -------------------------------*/
const body = document.getElementById("body");                                            // Seleciona o elemento <body> da página.
const cenario = document.getElementById("cenario");                                      // Seleciona a div principal do jogo, o cenário.
const xwing = document.getElementById("x-wing");                                         // Seleciona a div da nave do jogador (X-Wing).
const botaoIniciar = document.getElementById("btn_Inicar");                              // Seleciona o botão "Iniciar Jogo".
const menu = document.getElementById("menu");                                            // Seleciona a div que contém o menu de status (vida, pontos).
const vida = document.getElementById("vida");                                            // Seleciona o span que mostra a vida do jogador.
const pontos = document.getElementById("pontos");                                        // Seleciona o span que mostra a pontuação.
const btnEspecialAtaque = document.getElementById("ataque_especial");                    // Seleciona o elemento que indica o ataque especial (letra 'F').
// Estastiticas do jogo
const painelDados = document.getElementById("dados-jogo");                               // Seleciona o painel que exibe as estatísticas de debug.
const dadosVelXWing = document.getElementById("vel_x-wing");                             // Seleciona o span para a velocidade da X-Wing.
const dadosVelRotXWing = document.getElementById("vel_rotacao_x-wing");                  // Seleciona o span para a velocidade de rotação.
const dadosVelTieFighter = document.getElementById("vel_tie-fighter");                   // Seleciona o span para a velocidade dos TIE Fighters.
const dadosAnguloTieFighter = document.getElementById("angulo_tie-fighter");             // Seleciona o span para o ângulo de ataque dos TIEs.
const dadosVelConstrucaoTieFighter = document.getElementById("vel_constr_tie-fighter");  // Seleciona o span para a velocidade de criação dos TIEs.
const dadosInimigosDestruidos = document.getElementById("inimigos_destruidos");          // Seleciona o span para o contador de inimigos destruídos.
const dadosVidaEstrelaDaMorte = document.getElementById("lifeDeathStar");                // Seleciona o span para a vida da Estrela da Morte.
const dadosTempoParado = document.getElementById("tempoParado");
/*------------------------------- VARIAVEIS GLOBAIS -------------------------------*/
const larguraCenario = cenario.offsetWidth;                      // Pega a largura de todod o cenario
const alturaCenario = cenario.offsetHeight;                      // Pega a altura de todod o cenario 
const larguraXWing = xwing.offsetWidth;                          // Pega a largura do X-Wing
const alturaXWing = xwing.offsetHeight;                          // Pega a altura do X-Wing
const larguraTieFighter = 100;                                   // Pega a largura do Tie-Fighter
const alturaTieFighter = 95.56;                                  // Pega a altura do Tie-Fighter
const velocidadeMaximaXWing = 15;                                // Define a velocidade máxima do X-Wing
const velMaximaRotacaoXWing = 5;                                 // 8 - Define a velocidade de rotação máxima do X-Wing
const velocidadeProjetilXWing = 50;                              // 40 - Define a velocidade dos projeteis do X-Wing
const velocidadeMaximaTieFighter = 12;                           // 12 - Define a velocidade máxima dos Tie Fighters
const quantidadeMaximaTieFighters = 700;                         // 1000 - Define o tempo máximo de criação dos Tie Fighters (em milisegundos)
const velocidadeProjetilTieFighter = 50;                         // 10 - Define a velocidade dos projeteis dos Tie Fighters
const velocidadeProjetilDeathStar = 50;                          // 10 - Define a velocidade dos projeteis da Estrela da Morte
const velocidadeProjetilPunicao = 50;                            // 10 - Define a velocidade dos projeteis de punição
const anguloMaximo = 61;                                         // Define o angulo máximo de descida dos Tie Fighters (em graus), soma mais 1
const velocidadeMaximaCenario = 15;                              // Define a velocidade máxima do cenario
const tempoDePunicao = 15;                                       // Tempo maximo que o X-Wing pode ficar parado sem levar tiro de punição
const velocidadeItemEspecial = 3;                                // Define a velocidade de decida dos itens especiais

let velocidadeXWing = 5;                                        // 10 - Define a velocidade inicial do X-Wing 
let danoTiroXWing = 1;                                           // Define o dano dos tiros do X-Wing
let velocidadeTieFighter = 1;                                    // 1 - Define a velocidade inicial dos Tie Fighters 
let quantidadeTieFighters = 3000;                                // 3000 - Define o intervalo inicial em que serão criadas as naves inimigas (em milisegundos)
let anguloAtaqueTieFighter = 0;                                  // Recebe o angulo de ataque dos Tie Fighters (em graus)
let anguloTieFighter = 0;                                        // Variavel para controlar a rotação dos Tie Fighters
let velocidadeDisparosTieFighter = 500;                          // Cadencia de disparo dos Tie Fighters (em milisegundos)
let velocidadeCenario = 200;                                     // Define a velocidade incial do cenario
let pontosVida = 100;                                            // Define a vida inicial do X-Wing
let pontosScore = 0;                                             // Define a pontuação inicial
let estaAtirando = false;                                        // Flada para saber se o X-Wing está atirando ou não
let countNavesDestruidas = 0;                                    // Contador de naves destruídas
let rotacaoXWing = 0;                                            // Variavel para controlar a rotação do X-Wing
let velRotacaoXWing = 2;                                         // 2 - Define a velocidade inicial de rotação do X-Wing
let giroHorario = false;                                         // Flag para controlar a rotação do X-Wing no sentido horário
let giroAntiHorario = false;                                     // Flag para controlar a rotação do X-Wing no sentido anti-horário
let iniciarBossDeathStar = true;                                 // Flag para iniciar a fase da estrela da morte
let vidaEstrelaDaMorte = 600;                                    // 600 Pontos de vida iniciais da Estrela da Morte
let estrelaDestruida = false;                                    // Flag para verificar se a Estrela da Morte foi destruída
let habilitarAtaqueEspecial = false;                             // Flag para habilitar o ataque especial
let sinalObiWan = true;                                          // Flag para interromper a execução em loop da mensagem do Obi-Wan
let velocidadeDisparosDeathStar = 500;                           // Cadencia de disparo da Estrela da Morte (em milisegundos)
let okGameOver = true;                                           // Flag para iniciar a execução do Game Over após liberar o ataque especial
let posicaoHorizontal = larguraCenario / 2 - (larguraXWing / 2); // Posição horizontal inicial do X-Wing
let positionVertical = alturaCenario - alturaXWing - 20;         // Posição vertical inicial do X-Wing
let direcaoHorizontal = 0;                                       // Variavel para manipular a direção horizontal do X-Wing
let direcaoVertical = 0;                                         // Variavel para manipular a direção vertical do X-Wing
let tempoParado = 0;                                             // Tempo que a nave está parada (ms)
let timestampInicioParado = 0;                                   // Timestamp de quando a nave parou para uma contagem precisa
let backgroundPositionY = 0;                                     // Posição Y do background do cenário para a animação JS
let estaSendoPunido = false;                                     // Flag para evitar múltiplos projéteis
let countInimigosDestruidos = 0;                                 // Contador de inimigos destruídos
let okPoderResistencia = false;
let okPowerUp = false;

// Variaveis para os intervalos do jogo
let iniciaBossTimeout;
let iniciaMovimentacaoCenario;
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
let iniciaMovimentacaoEstrelaDaMorte;
let iniciaProjeteisDeathStar;
let iniciaMovimentacaoProjeteisDeathStar;
let iniciaProjeteisPunicao;
let iniciaMovimentacaoProjeteisPunicao;
let iniciaCriarItensEspeciais;
let iniciaMovimentacaoItensEspeciais;

/*------------------------------- INCIANDO JOGO -------------------------------*/
document.getElementById("btn_Inicar").addEventListener("click", iniciarJogo);                      // Inicia o jogo clicando no botão
let jogoIniciado = false;                                                                          // Flag para identificar a inicialização do jogo
document.addEventListener("keydown", function (event) {                                            // Função para iniciar o jogo com apertar do Enter
    if (jogoIniciado == false) {                                                                   // Se o jogo não começou ainda     
        if (event.key === "Enter") {                                                               // Se a tecla apertada for o Enter
            iniciarJogo();                                                                         // Inicia o jogo
        }
    }
});

function iniciarJogo() {
    console.log("Iniciando Jogo");
    jogoIniciado = true;                                                                           // Atualiza flag para bloquear o Enter
    somAcelerandoXWing();                                                                          // Inicia o som do X-Wing acelerando    
    botaoIniciar.style.display = "none";                                                           // Esconde o botão iniciar após clicar nele
    menu.style.display = "flex";                                                                   // Mostra o menu do jogo 
    xwing.style.bottom = "40vh";                                                                   // Inicia a posição do X-Wing abaixo da tela para a animação CSS de entrada do X-Wing
    trilhaSonora();                                                                                // Toca a trilha sonora do game
    iniciaMovimentacaoCenario = setInterval(moverCenario, 20);                                     // Atualiza a posição do cenario a cada 20ms
    const iniciaGame = setTimeout(() => {                                                          // Constroi um intervalo de 3s para finalizar a chegada do X-Wing
        clearInterval(iniciaGame);                                                                 // Finaliza o intervalo para não ficar repetindo em loop
        // Converte bottom: 40vh para positionVertical (em pixels)
        const vhToPx = window.innerHeight * 0.4;                                                   // Converte 40vh para pixels
        positionVertical = alturaCenario - vhToPx - alturaXWing;                                   // Calcula a posição vertical em pixels do X-Wing no final da animação
        xwing.style.top = positionVertical + "px";                                                 // Atualiza a posição vertical do X-Wing
        xwing.style.bottom = "";                                                                   // Remove a propriedade bottom para evitar conflitos
        // Inicia os intervalos do jogo
        document.addEventListener("keydown", teclasControlePressionadas);                          // Inica em loop a função que lê quando pressiona alguma tecla no teclado
        document.addEventListener("keyup", teclasControleSoltas);                                  // Inica em loop a função que lê quando soltar alguma tecla no teclado
        document.addEventListener("keypress", teclasControleClicadas);                             // Inica em loop a função que lê quando clicar alguma tecla no teclado
        iniciaMovimentacaoXWing = setInterval(moverXWing, 20);                                     // Inica em loop a função de movimentação do X-Wing, repetição do loop a cada 20ms
        iniciaProjeteisXWing = setInterval(atirar, 150);                                           // Inica em loop a função para atirar com o X-Wing
        iniciaMovimentacaoProjeteisXWing = setInterval(moverProjeteisXWing, 50);                   // Inica em loop a função de movimentação dos projeteis do X-Wing
        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);                   // Inica em loop a construção de naves inimigas
        iniciaMovimentacaoNavesInimigas = setInterval(moverNavesInimigas, 50);                     // Inica em loop a função para movimentação os Tie-Fighters
        iniciaProjeteisTieFighter = setInterval(criarProjeteisTieFighter, velocidadeDisparosTieFighter);  // Inica em loop a função de criação de disparos dos Tie-Fighters
        iniciaMovimentacaoProjeteisTieFighter = setInterval(moverProjeteisTieFighter, 50);         // Inica em loop a função de movimentação dos projeteis dos Tie-Fighters
        iniciaColisaoTieFighter = setInterval(colisaoTieFighter, 10);                              // Inica em loop a função de detecção de colisão dos Tie-Fighters
        iniciaColisaoXWing = setInterval(colisaoXWing, 10);                                        // Inica em loop a função de detecção de colisão do X-Wing 
        iniciaColisaoEstrelaDaMorte = setInterval(colisaoEstrelaDaMorte, 10);                      // Inica em loop a função de detecção de colisão da Estrela da Morte
        iniciaMovimentoTorpedoEspecial = setInterval(movimentarProjetilEspecial, 20);              // Inica em loop a função de movimentação da Estrela da Morte
        iniciaMovimentacaoProjeteisPunicao = setInterval(moverProjeteisPunicao, 20);               // Inica em loop a função de movimentação dos tiros de punição
        iniciaProjeteisPunicao = setInterval(criarProjeteisPunicao, 20);                           // Inica em loop a função de criação de disparos de punição
        iniciaCriarItensEspeciais = setInterval(criarItensEspeciais, 5000);                        // Inica em loop a função de criação de itens especiais
        iniciaMovimentacaoItensEspeciais = setInterval(moverItensEspeciais, 20);                   // Inica em loop a função de movimentação dos itens especiais
        iniciaRotacaoXWing = setInterval(() => {                                                   // Inica em loop a função para rotacionar o X-Wing
            if (giroHorario) {                                                                     // Se a flag giroHorario for verdadeira
                rotacaoXWing -= velRotacaoXWing;                                                   // Decrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                              // Aplica a rotação no X-Wing
            } else if (giroAntiHorario) {                                                          // Se a flag giroAntiHorario for verdadeira
                rotacaoXWing += velRotacaoXWing;                                                   // Incrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                              // Aplica a rotação no X-Wing
            }
        }, 20);                                                                                    // Repetição do loop a cada 20ms
        
        // Agenda o início do boss para daqui a 5 minutos (300.000 ms)
        const tempoParaBoss = 5 * 60 * 1000;
        iniciaBossTimeout = setTimeout(() => {
            // Verifica se o jogo ainda está rodando e se o boss não foi iniciado
            if (iniciarBossDeathStar) {
                iniciarBossDeathStar = false; // Desativa a flag para não iniciar novamente
                bossDeathStar(); // Chama a função para iniciar a fase da estrela da morte
            }
        }, tempoParaBoss);
    }, 3000); // Atraso de 3 segundos
}


/*------------------------------- FIM DE JOGO -------------------------------*/
function gameOver() {
    if (okGameOver) {                                                                   // Se o Game Over estiver habilitado
        audioTrilhaSonora.pause();                                                      // Pausa a trilha sonora do jogo
        audioVoandoXWing.pause();                                                       // Pausa o som do X-Wing voando
        audioTrilhaSonoraEstrelaDaMorte.pause();                                        // Pausa a trilha sonora da Estrela da Morte   
        document.removeEventListener("keydown", teclasControlePressionadas);            // Remove os eventos de controle do X-Wing de keydown
        document.removeEventListener("keyup", teclasControleSoltas);                    // Remove os eventos de controle do X-Wing de keyup
        // Para todos os intervalos do jogo
        clearTimeout(iniciaBossTimeout);
        clearInterval(iniciaProjeteisXWing);
        clearInterval(iniciaMovimentacaoCenario);
        clearInterval(iniciaMovimentacaoXWing);
        clearInterval(iniciaMovimentacaoProjeteisXWing);
        clearInterval(iniciaNavesInimigas);
        clearInterval(iniciaMovimentacaoNavesInimigas);
        clearInterval(iniciaColisaoTieFighter);
        clearInterval(iniciaColisaoEstrelaDaMorte);
        clearInterval(iniciaProjeteisTieFighter);
        clearInterval(iniciaMovimentacaoProjeteisTieFighter);
        clearInterval(iniciaColisaoXWing);
        clearInterval(iniciaRotacaoXWing);
        clearInterval(iniciaMovimentoTorpedoEspecial);
        clearInterval(iniciaMovimentacaoEstrelaDaMorte);
        clearInterval(iniciaProjeteisDeathStar);
        clearInterval(iniciaMovimentacaoProjeteisDeathStar);
        clearInterval(iniciaProjeteisPunicao);
        clearInterval(iniciaMovimentacaoProjeteisPunicao);
        clearInterval(iniciaCriarItensEspeciais);
        clearInterval(iniciaMovimentacaoItensEspeciais);
        habilitarAtaqueEspecial = false;                                                // Desabilita o ataque especial caso apareça o F na tela
        btnEspecialAtaque.style.display = "none";                                       // Esconde o botão de ataque especial
        explosaoNaves(xwing);                                                           // Chama a explosão do X-Wing
        cenario.removeChild(xwing);                                                     // Remove o X-Wing do cenario
        const todasNavesInimigas = document.querySelectorAll(".tie_fighter");           // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
        todasNavesInimigas.forEach((nave) => {                                          // Percorre todos os Tie Fighters
            nave.remove();                                                              // Remove cada um dos Tie Fighter do cenario
        });
        const disparosXWing = document.querySelectorAll(".projetil_x-wing");            // Seleciona todos os disparos do X-Wing
        disparosXWing.forEach((disparos) => disparos.remove());                         // Percorre todos os projeteis do X-Wing e remove cada um deles
        const disparosTieFighter = document.querySelectorAll(".projetil_tie-fighter");  // Seleciona todos os disparos dos Tie-Fighters
        disparosTieFighter.forEach((disparos) => disparos.remove());                    // Percorre todos os projeteis dos Tie-Fighters e remove cada um deles
        const disparosDeathStar = document.querySelectorAll(".projetil_death-star");    // Seleciona todos os disparos da Estrela da Morte
        disparosDeathStar.forEach((disparos) => disparos.remove());                     // Percorre todos os projeteis da Estrela da Morte e remove cada um deles
        const disparosPunicao = document.querySelectorAll(".projetil_punicao");         // Seleciona todos os disparos de Punição
        disparosPunicao.forEach(disparos => disparos.remove());                         // Percorre todos os projeteis de Punição e remove cada um deles
        // Depois de 5 segundos, tocar a risada do imperador
        const atrasoSuspense = setTimeout(() => {                                       // Constroi um intervalo de 5s para finalizar os audios do jogo
            clearInterval(atrasoSuspense);                                              // Finaliza o intervalo para não ficar repetindo em loop
            // Mostra a mensagem de fim de jogo
            const gameover = document.createElement("h1");                              // Constroi um objeto <h1>
            gameover.innerHTML = "Game &nbsp; Over<br>O &nbsp; Imperio &nbsp; Venceu";     // Adiciona um texto ao objeto criado
            gameover.className = "gameover";                                            // Defice uma classe ao objeto para adicionar formatação
            cenario.appendChild(gameover);                                              // Adiciona o objeto criado ao cenario
            menu.style.display = "none";                                                // Esconde o menu do jogo
            const audio = new Audio('../audios/risada_palpatine.MP3');                  // Pega o audio da risada do Imperador Palpatine
            audio.play();                                                               // Toca o audio
            const delaySurgirBotao = setTimeout(() => {                                 // Constroi um intervalo de 5s para finalizar a risada do Imperador Palpatine
                clearInterval(delaySurgirBotao);                                        // Finaliza o intervalo para não ficar repetindo em loop 
                const btnReiniciar = document.createElement("button");                  // Constroi um objeto <button>
                btnReiniciar.id = "btnReiniciar";                                       // Define um id paro o botão
                btnReiniciar.className = "botao";                                       // Defice uma classe ao objeto para adicionar formatação
                btnReiniciar.style.position = "absolute";                               // Define a posição do objeto
                btnReiniciar.style.bottom = "100px";                                    // Define a coordenada vertical do objeto
                btnReiniciar.innerText = "REINICIAR";                                   // Adiciona um texto ao objeto criado
                btnReiniciar.addEventListener("click", reiniciarJogo);                  // Adiciona um evento de clique ao obejto para chamar a função de reiniciar o jogo
                cenario.appendChild(btnReiniciar);                                      // Adiciona o objeto criado ao cenario                                                                      // Flag para identificar a inicialização do jogo
                document.addEventListener("keydown", function (event) {                 // Função para reiniciar o jogo com apertar do Enter
                    if (event.key === "Enter") reiniciarJogo();                         // Se apertou o Enter reinica o jogo
                });
            }, 5000);                                                                   // Atraso de 5 segundos da risada do Imperador
        }, 5000);                                                                       // Atraso de 5 segundos dos audios do jogo
        okGameOver = false;                                                             // Desabilita o Game Over
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    location.reload();
}