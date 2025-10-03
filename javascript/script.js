/*------------------------------- OBJETOS HTML -------------------------------*/
const body = document.getElementById("body");                                            // Seleciona o elemento <body> da página.
const cenario = document.getElementById("cenario");                                      // Seleciona a div principal do jogo, o cenário.
const xwing = document.getElementById("x-wing");                                         // Seleciona a div da nave do jogador (X-Wing).
const botaoIniciar = document.getElementById("btn_Inicar");                              // Seleciona o botão "Iniciar Jogo".
const menu = document.getElementById("menu");                                            // Seleciona a div que contém o menu de status (vida, pontos).
const vida = document.getElementById("vida");                                            // Seleciona o span que mostra a vida do jogador.
const tempoJogo = document.getElementById("tempo_gameplay");                             // Seleciona o span que mostra o tempo de jogo.
const pontos = document.getElementById("pontos");                                        // Seleciona o span que mostra a pontuação.
const btnEspecialAtaque = document.getElementById("ataque_especial");                    // Seleciona o elemento que indica o ataque especial (letra 'F').
const barraDeVidaEstrelaDaMorte = document.getElementById("life_deathstar");             // Pega o elemento da barra de vida da Estrela da Morte
const barraDeVidaDarthVader = document.getElementById("life_darth-vader");               // Pega o elemento da barra de vida do Darth Vader
const painelDados = document.getElementById("dados-jogo");                               // Seleciona o painel que exibe as estatísticas de debug.
const btnIniciar = document.getElementById("btn_Inicar");

/*------------------------------- VARIAVEIS GLOBAIS -------------------------------*/
// Variaveis constantes do jogo
const alturaTela = window.innerHeight;                                                   // altura visível da tela
const larguraTela = window.innerWidth;                                                   // largura visível da tela
const larguraCenario = cenario.style.width = larguraTela;                                // Pega a largura de todod o cenario
const alturaCenario = cenario.style.height = alturaTela;                                 // Pega a altura de todod o cenario 
const larguraXWing = xwing.offsetWidth;                                                  // Pega a largura do X-Wing
const alturaXWing = xwing.offsetHeight;                                                  // Pega a altura do X-Wing
const velMaximaRotacaoXWing = 6;                                                         // 8 - Define a velocidade de rotação máxima do X-Wing
const quantidadeMaximaTieFighters = 700;                                                 // 1000 - Define o tempo máximo de criação dos Tie Fighters (em milisegundos)
const anguloMaximo = 61;                                                                 // Define o angulo máximo de descida dos Tie Fighters (em graus), soma mais 1
const velocidadeMaximaCenario = 100;                                                     // Define a velocidade máxima do cenario
const tempoDePunicao = 8;                                                                // Tempo maximo que o X-Wing pode ficar parado sem levar tiro de punição em segundos
const vidaDarthVader = 660;                                                              // 660 Pontos de vida iniciais do Darth Vader
const vidaEstrelaDaMorte = 1500;                                                         // 1200 Pontos de vida iniciais da Estrela da Morte
const recargaBoost = 2000;                                                               // Tempo de recarga do Boost

// Variaveis Globais
let velocidadeMaximaXWing = 15;                                                          // Define a velocidade máxima do X-Wing
let velocidadeProjetilXWing = 50;                                                        // Define a velocidade dos projeteis do X-Wing
let velocidadeMaximaTieFighter = 12;                                                     // 12 - Define a velocidade máxima dos Tie Fighters
let velocidadeProjetilTieFighter = 50;                                                   // Define a velocidade dos projeteis dos Tie Fighters
let velocidadeProjetilDarthVader = 65;                                                   // 65 -Define a velocidade dos projeteis do Darth Vader
let velocidadeProjetilDeathStar = 50;                                                    // Define a velocidade dos projeteis da Estrela da Morte
let velocidadeProjetilPunicao = 50;                                                      // Define a velocidade dos projeteis de punição
let velocidadeItemEspecial = 3;                                                          // Define a velocidade de decida dos itens especiais
let velocidadeXWing = 5;                                                                 // 5 - Define a velocidade inicial do X-Wing 
let velRotacaoXWing = 2;                                                                 // 2 - Define a velocidade inicial de rotação do X-Wing
let alturaProjetilNaves;                                                                 // Altura dos projéteis, obtida do CSS.
let larguraProjetilNaves;                                                                // Largura dos projéteis, obtida do CSS.
let larguraTieFighter = 0;                                                               // Define a largura do Tie-Fighter
let alturaTieFighter = 0;                                                                // Define a altura do Tie-Fighter
let danoTiroXWing = 3;                                                                   // Define o dano dos tiros do X-Wing
let velocidadeTieFighter = 1;                                                            // 1 - Define a velocidade inicial dos Tie Fighters 
let quantidadeTieFighters = 3000;                                                        // 3000 - Define o intervalo inicial em que serão criadas as naves inimigas (em milisegundos)
let anguloAtaqueTieFighter = 0;                                                          // Recebe o angulo de ataque dos Tie Fighters (em graus)
let anguloTieFighter = 0;                                                                // Variavel para controlar a rotação dos Tie Fighters
let velocidadeDisparosTieFighter = 500;                                                  // Cadencia de disparo dos Tie Fighters (em milisegundos)
let velocidadeCenario = 200;                                                             // Define a velocidade incial do cenario
let pontosVida = 100;                                                                    // Define a vida inicial do X-Wing
let pontosScore = 0;                                                                     // Define a pontuação inicial
let tempoTotalSegundos = 0;                                                              // Armazena o tempo total de jogo em segundos
let estaAtirando = false;                                                                // Flada para saber se o X-Wing está atirando ou não
let countNavesDestruidas = 0;                                                            // Contador de naves destruídas
let rotacaoXWing = 0;                                                                    // Variavel para controlar a rotação do X-Wing
let giroHorario = false;                                                                 // Flag para controlar a rotação do X-Wing no sentido horário
let giroAntiHorario = false;                                                             // Flag para controlar a rotação do X-Wing no sentido anti-horário
let iniciarDarthVader = true;                                                            // Flag para iniciar a fase do Darth Vader
let iniciarBossDeathStar = true;                                                         // Flag para iniciar a fase da estrela da morte
let vidaAtualDarthVader = vidaDarthVader;                                                // Define a contagem da vida inicial do Darth Vader
let vidaAtualEstrelaDaMorte = vidaEstrelaDaMorte;                                        // Define a contagem da vida inicial da Estrela da Morte
let estrelaDestruida = false;                                                            // Flag para verificar se a Estrela da Morte foi destruída
let habilitarAtaqueEspecial = false;                                                     // Flag para habilitar o ataque especial
let sinalObiWan = true;                                                                  // Flag para interromper a execução em loop da mensagem do Obi-Wan
let velocidadeDisparosDarthVader = 660;                                                  // 660 Cadencia de disparo do Darth Vader (em milisegundos)
let velocidadeDisparosDeathStar = 500;                                                   // Cadencia de disparo da Estrela da Morte (em milisegundos)
let okGameOver = true;                                                                   // Flag para iniciar a execução do Game Over após liberar o ataque especial
let posicaoHorizontal = larguraCenario / 2 - (larguraXWing / 2);                         // Posição horizontal inicial do X-Wing
let positionVertical = alturaCenario - alturaXWing - 20;                                 // Posição vertical inicial do X-Wing
let direcaoHorizontal = 0;                                                               // Variavel para manipular a direção horizontal do X-Wing
let direcaoVertical = 0;                                                                 // Variavel para manipular a direção vertical do X-Wing
let tempoParado = 0;                                                                     // Tempo que a nave está parada (ms)
let folgaColisao = 40;                                                                   // Folga para adentrar nos Tie Fighters para criar a colisão
let timestampInicioParado = 0;                                                           // Timestamp de quando a nave parou para uma contagem precisa
let backgroundPositionY = 0;                                                             // Posição Y do background do cenário para a animação JS
let estaSendoPunido = false;                                                             // Flag para evitar múltiplos projéteis
let countInimigosDestruidos = 0;                                                         // Contador de inimigos destruídos
let okBatalhaDarthVader = false;                                                         // Flag para indicar a batalha do Darth Vader
let okResistencePower = false;                                                           // Flag para indicar que o pode de Resistencia está ativo
let okPowerUp = false;                                                                   // Flag para indicar que o power-up está ativo
let okFullPower = false;                                                                 // Flag para indicar que o Full-Power está ativo
let soltarBoost = true;                                                                  // Flag para quando pode soltar o Boost
let isBoosting = false;                                                                  // Flag para indicar que o boost está em andamento
let boostDistance = 500;                                                                 // Define a distância total que a nave percorrerá durante o boost, em pixels.
let boostDuration = 250;                                                                 // Define a duração total do boost, em milissegundos.
let isDoingManeuver = false;                                                             // Flag para indicar que uma manobra (como o giro 180) está em andamento

// Variaveis para os intervalos do jogo
let iniciaBossEstrelaDaMorteTimeout;
let iniciaItensEspeciaisTimeout;
let iniciaSurgimentoEstrelaDaMorteTimeout;
let iniciaContagemTempoGameplay;
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
let iniciaColisaoDarthVader;
let iniciaColisaoEstrelaDaMorte;
let iniciaMovimentoTorpedoEspecial;
let iniciaMovimentacaoEstrelaDaMorte;
let iniciaProjeteisDarthVader;
let iniciaMovimentacaoProjeteisDarthVader;
let iniciaFalasDarthVader;
let iniciaProjeteisDeathStar;
let iniciaMovimentacaoProjeteisDeathStar;
let iniciaProjeteisPunicao;
let iniciaMovimentacaoProjeteisPunicao;
let iniciaCriarItensEspeciais;
let iniciaCriarItemFullPower;
let iniciaMovimentacaoItensEspeciais;
let iniciaSurgimentoEstrelaDaMorte;

/*------------------------------- INCIANDO JOGO -------------------------------*/
// Seu código JavaScript aqui será executado quando a página estiver totalmente carregada
window.onload = function () {
    ajustarAlturaCenario(); // Garante que a altura do cenário seja ajustada na carga inicial.
    responsividade(); // chama a função quando a página carrega
};

// Executa também se a tela for redimensionada
window.addEventListener("resize", () => {
    ajustarAlturaCenario();
    responsividade();
});

// Função para corrigir a altura do cenário em dispositivos móveis
function ajustarAlturaCenario() {
    cenario.style.height = `${alturaTela}px`;
}

function responsividade() {
    if (alturaTela <= 435) {
        velocidadeMaximaXWing = 7;
        velocidadeProjetilXWing = 25;
        velocidadeMaximaTieFighter = 6;
        velocidadeProjetilTieFighter = 25;
        velocidadeProjetilDarthVader = 32;
        velocidadeProjetilDeathStar = 25;
        velocidadeProjetilPunicao = 25;
        velocidadeItemEspecial = 1;
        velocidadeXWing = 3;
        folgaColisao = 15;
        boostDistance = 250;
        boostDuration = 250;
    }
}

btnIniciar.addEventListener("click", iniciarJogo);                                                 // Inicia o jogo clicando no botão
let jogoIniciado = false;                                                                          // Flag para identificar a inicialização do jogo
document.addEventListener("keydown", function (event) {                                            // Função para iniciar o jogo com apertar do Enter
    if (jogoIniciado == false) {                                                                   // Se o jogo não começou ainda     
        if (event.key === "Enter") {                                                               // Se a tecla apertada for o Enter
            btnIniciar.className = "botao-selecionado";                                            // Adiciona a classe botaobotao-selecionado
            setTimeout(() => iniciarJogo(), 800);                                                  // Inicia o jogo
        }
    }
});
/*
// Define uma função assíncrona para poder usar 'await' para esperar por ações.
async function lockOrientation() {
    try {                                                                                          // Inicia um bloco 'try' para capturar erros que possam ocorrer ao tentar entrar em tela cheia ou bloquear a orientação.
        // Primeiro, tentamos entrar em tela cheia. É um requisito para o bloqueio de orientação na maioria dos navegadores.
        if (document.documentElement.requestFullscreen) {                                          // Verifica se o método padrão 'requestFullscreen' existe.
            await document.documentElement.requestFullscreen();                                    // Solicita o modo de tela cheia e espera a operação ser concluída.
        } else if (document.documentElement.mozRequestFullScreen) {                                // Firefox  // Se não, verifica a versão para Firefox.
            await document.documentElement.mozRequestFullScreen();                                 // Solicita tela cheia no Firefox e espera.
        } else if (document.documentElement.webkitRequestFullscreen) {                             // Chrome, Safari & Opera  // Se não, verifica a versão para Chrome, Safari e Opera.
            await document.documentElement.webkitRequestFullscreen();                              // Solicita tela cheia nesses navegadores e espera.
        } else if (document.documentElement.msRequestFullscreen) {                                 // IE/Edge  // Se não, verifica a versão para IE/Edge.
            await document.documentElement.msRequestFullscreen();                                  // Solicita tela cheia no IE/Edge e espera.
        }
        // Depois de entrar em tela cheia com sucesso, bloqueamos a orientação.
        await screen.orientation.lock('landscape');                                                // Tenta travar a orientação da tela no modo paisagem ('landscape') e espera.
    } catch (error) {                                                                              // Se qualquer uma das solicitações ('await') falhar, o código dentro do 'catch' é executado.
        console.error("Não foi possível bloquear a orientação da tela:", error);                   // Exibe uma mensagem de erro no console do navegador.
    }
}
*/
function iniciarJogo() {
    console.log("Iniciando Jogo");
    jogoIniciado = true;                                                                           // Atualiza flag para bloquear o Enter
    somAcelerandoXWing();                                                                          // Inicia o som do X-Wing acelerando    
    botaoIniciar.style.display = "none";                                                           // Esconde o botão iniciar após clicar nele
    menu.style.display = "flex";                                                                   // Mostra o menu do jogo 
    xwing.style.bottom = "40vh";                                                                   // Inicia a posição do X-Wing abaixo da tela para a animação CSS de entrada do X-Wing
    trilhaSonora();                                                                                // Toca a trilha sonora do game
    setupGamepadVirtual();                                                                         // Configura os controles do gamepad virtual na tela
    iniciaMovimentacaoCenario = setInterval(moverCenario, 20);                                     // Atualiza a posição do cenario a cada 20ms
    //if (window.screen && screen.orientation && screen.orientation.lock) lockOrientation();         // Tenta bloquear a orientação para paisagem

    // Obtém as dimensões dos projéteis diretamente das variáveis CSS (:root)
    const rootStyles = getComputedStyle(document.documentElement);
    // O método getPropertyValue retorna o valor como string (ex: " 4px ").
    // Usamos trim() para remover espaços e parseInt() para extrair o número.
    larguraProjetilNaves = parseInt(rootStyles.getPropertyValue('--projetil-width').trim());
    alturaProjetilNaves = parseInt(rootStyles.getPropertyValue('--projetil-height').trim());
    alturaTieFighter = parseInt(rootStyles.getPropertyValue('--tie-fighter-height').trim());
    larguraTieFighter = parseInt(rootStyles.getPropertyValue('--tie-fighter-width').trim());

    setTimeout(() => {                                                                             // Constroi um intervalo de 3s para finalizar a chegada do X-Wing
        // Converte bottom: 40vh para positionVertical (em pixels)
        const vhToPx = window.innerHeight * 0.4;                                                   // Converte 40vh para pixels
        positionVertical = alturaCenario - vhToPx - alturaXWing;                                   // Calcula a posição vertical em pixels do X-Wing no final da animação
        xwing.style.top = positionVertical + "px";                                                 // Atualiza a posição vertical do X-Wing
        xwing.style.bottom = "";                                                                   // Remove a propriedade bottom para evitar conflitos
        // Inicia os intervalos do jogo
        document.addEventListener("keydown", teclasControlePressionadas);                          // Inica em loop a função que lê quando pressiona alguma tecla no teclado
        document.addEventListener("keyup", teclasControleSoltas);                                  // Inica em loop a função que lê quando soltar alguma tecla no teclado
        document.addEventListener("keypress", teclasControleClicadas);                             // Inica em loop a função que lê quando clicar alguma tecla no teclado
        iniciaContagemTempoGameplay = setInterval(contagemTempoGameplay, 1000);                    // Inica em loop a função de contagem do tempo de jogo                    
        iniciaMovimentacaoXWing = setInterval(moverXWing, 20);                                     // Inica em loop a função de movimentação do X-Wing, repetição do loop a cada 20ms
        iniciaProjeteisXWing = setInterval(atirar, 150);                                           // Inica em loop a função para atirar com o X-Wing
        iniciaMovimentacaoProjeteisXWing = setInterval(moverProjeteisXWing, 50);                   // Inica em loop a função de movimentação dos projeteis do X-Wing
        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);                   // Inica em loop a construção de naves inimigas
        iniciaMovimentacaoNavesInimigas = setInterval(moverNavesInimigas, 50);                     // Inica em loop a função para movimentação os Tie-Fighters
        iniciaProjeteisTieFighter = setInterval(criarProjeteisTieFighter, velocidadeDisparosTieFighter);  // Inica em loop a função de criação de disparos dos Tie-Fighters
        iniciaMovimentacaoProjeteisTieFighter = setInterval(moverProjeteisTieFighter, 50);         // Inica em loop a função de movimentação dos projeteis dos Tie-Fighters
        iniciaColisaoTieFighter = setInterval(colisaoTieFighter, 10);                              // Inica em loop a função de detecção de colisão dos Tie-Fighters
        iniciaColisaoXWing = setInterval(colisaoXWing, 10);                                        // Inica em loop a função de detecção de colisão do X-Wing 
        iniciaColisaoDarthVader = setInterval(colisaoDarthVader, 10);                              // Inica em loop a função de detecção de colisão do Darth Vader
        iniciaColisaoEstrelaDaMorte = setInterval(colisaoEstrelaDaMorte, 10);                      // Inica em loop a função de detecção de colisão da Estrela da Morte
        iniciaMovimentoTorpedoEspecial = setInterval(movimentarProjetilEspecial, 20);              // Inica em loop a função de movimentação da Estrela da Morte
        iniciaMovimentacaoProjeteisPunicao = setInterval(moverProjeteisPunicao, 20);               // Inica em loop a função de movimentação dos tiros de punição
        iniciaProjeteisPunicao = setInterval(criarProjeteisPunicao, 20);                           // Inica em loop a função de criação de disparos de punição

        iniciaRotacaoXWing = setInterval(() => {                                                   // Inica em loop a função para rotacionar o X-Wing
            if (giroHorario) {                                                                     // Se a flag giroHorario for verdadeira
                rotacaoXWing -= velRotacaoXWing;                                                   // Decrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                              // Aplica a rotação no X-Wing
            } else if (giroAntiHorario) {                                                          // Se a flag giroAntiHorario for verdadeira
                rotacaoXWing += velRotacaoXWing;                                                   // Incrementa a rotação do X-Wing
                xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                              // Aplica a rotação no X-Wing
            }
        }, 100);                                                                                   // Repetição do loop a cada 20ms

        iniciaItensEspeciaisTimeout = setTimeout(() => {
            iniciaCriarItensEspeciais = setInterval(criarItensEspeciais, 15000);                   // 15000 - Inica em loop a função de criação de itens especiais, cria itens a cada 15 segundos
            iniciaCriarItemFullPower = setInterval(criarItemFullPower, 20);                        // Inica em loop a função de criação de itens full power
            iniciaMovimentacaoItensEspeciais = setInterval(moverItensEspeciais, 20);               // Inica em loop a função de movimentação dos itens especiais
        }, 1 * 60 * 1000);                                                                         // 1 - Agenda o início do intens especiais para daqui a 1 minuto (60.000 ms)

        iniciaSurgimentoEstrelaDaMorteTimeout = setTimeout(() => {
            iniciaSurgimentoEstrelaDaMorte = setInterval(surgimentoEstrelaDaMorte, 20);
        }, 2.8 * 60 * 1000);                                                                       // Agenda o início do boss para daqui a 2.8 minutos (2 minutos a menos que o incio da esttrela da morte)

        iniciaBossDarthVaderTimeout = setTimeout(() => {
            if (iniciarDarthVader) {                                                               // Verifica se o jogo ainda está rodando e se o boss não foi iniciado
                iniciarDarthVader = false;                                                         // Desativa a flag para não iniciar novamente
                bossDarthVader();                                                                  // Chama a função para iniciar a fase da estrela da morte
            }
        }, 5 * 60 * 1000); // 5 minutos

    }, 3000); // Atraso de 3 segundos
}


/*------------------------------- FIM DE JOGO -------------------------------*/
function gameOver() {
    if (okGameOver) {                                                                              // Se o Game Over estiver habilitado
        if (audioTrilhaSonora.played) audioTrilhaSonora.pause();                                   // Pausa a trilha sonora do jogo
        if (audioVoandoXWing.played) audioVoandoXWing.pause();                                     // Pausa o som do X-Wing voando
        if (audioTrilhaSonoraDarthVader.played) audioTrilhaSonoraDarthVader.pause();               // Pausa a trilha sonora do Darth Vader
        if (audioTrilhaSonoraEstrelaDaMorte.played) audioTrilhaSonoraEstrelaDaMorte.pause();       // Pausa a trilha sonora da Estrela da Morte   
        document.removeEventListener("keydown", teclasControlePressionadas);                       // Remove os eventos de controle do X-Wing de keydown
        document.removeEventListener("keyup", teclasControleSoltas);                               // Remove os eventos de controle do X-Wing de keyup
        // Para todos os intervalos do jogo
        clearTimeout(iniciaBossEstrelaDaMorteTimeout);
        clearTimeout(iniciaItensEspeciaisTimeout);
        clearTimeout(iniciaBossDarthVaderTimeout);
        clearTimeout(iniciaSurgimentoEstrelaDaMorteTimeout);
        clearInterval(iniciaContagemTempoGameplay);
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
        clearInterval(iniciaSurgimentoEstrelaDaMorte);
        clearInterval(iniciaProjeteisDeathStar);
        clearInterval(iniciaMovimentacaoProjeteisDeathStar);
        clearInterval(iniciaProjeteisPunicao);
        clearInterval(iniciaMovimentacaoProjeteisPunicao);
        clearInterval(iniciaCriarItensEspeciais);
        clearInterval(iniciaCriarItemFullPower);
        clearInterval(iniciaProjeteisDarthVader);
        clearInterval(iniciaFalasDarthVader);
        if (okBatalhaDarthVader) clearInterval(iniciaMovimentacaoDarthVader);

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
        setTimeout(() => {                                                              // Constroi um intervalo de 5s para finalizar os audios do jogo
            // Mostra a mensagem de fim de jogo
            const gameover = document.createElement("h1");                              // Constroi um objeto <h1>
            gameover.innerHTML = "Game &nbsp; Over<br>O &nbsp; Imperio &nbsp; Venceu";  // Adiciona um texto ao objeto criado
            gameover.className = "gameover";                                            // Defice uma classe ao objeto para adicionar formatação
            cenario.appendChild(gameover);                                              // Adiciona o objeto criado ao cenario
            menu.style.display = "none";                                                // Esconde o menu do jogo
            const audio = new Audio('../audios/risada_palpatine.mp3');                  // Pega o audio da risada do Imperador Palpatine
            audio.volume = 0.8;
            audio.play();                                                               // Toca o audio
            setTimeout(() => {                                                          // Constroi um intervalo de 5s para finalizar a risada do Imperador Palpatine
                const btnReiniciar = document.createElement("button");                  // Constroi um objeto <button>
                btnReiniciar.id = "btnReiniciar";                                       // Define um id paro o botão
                btnReiniciar.className = "botao";                                       // Defice uma classe ao objeto para adicionar formatação
                btnReiniciar.style.position = "absolute";                               // Define a posição do objeto
                btnReiniciar.style.bottom = "100px";                                    // Define a coordenada vertical do objeto
                btnReiniciar.innerText = "REINICIAR";                                   // Adiciona um texto ao objeto criado
                btnReiniciar.addEventListener("click", reiniciarJogo);                  // Adiciona um evento de clique ao obejto para chamar a função de reiniciar o jogo
                cenario.appendChild(btnReiniciar);                                      // Adiciona o objeto criado ao cenario                                                                      // Flag para identificar a inicialização do jogo
                document.addEventListener("keydown", function (event) {                 // Função para reiniciar o jogo com apertar do Enter
                    if (event.key === "Enter") {                                        // Se apertou o Enter
                        btnReiniciar.className = "botao-selecionado";                   // Adiciona a classe botaobotao-selecionado
                        setTimeout(() => reiniciarJogo(), 800);                         // Reinica o jogo
                    }
                });
                setTimeout(() => reiniciarJogo(), 10000);                               // Agenda a reinicialização do jogo para daqui a 10s caso o usuario não aperte nada
            }, 5000);                                                                   // Atraso de 5 segundos da risada do Imperador
        }, 5000);                                                                       // Atraso de 5 segundos dos audios do jogo
        okGameOver = false;                                                             // Desabilita o Game Over
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    location.reload();
}
