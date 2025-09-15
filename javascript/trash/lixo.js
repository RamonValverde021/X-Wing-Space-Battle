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
function moverProjeteisXWing() {
    const tiros = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetilXWing;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil < -10) {                      // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}

function apresentarXWing() {
    let pos = -500; // posição inicial
    const limite = 200; // até onde vai subir
    const animacao = setInterval(() => {
        pos += 5; // velocidade
        xwing.style.bottom = pos + "px";

        if (pos >= limite) {
            clearInterval(animacao); // para quando atingir o limite
        }
    }, 16); // ~60fps
}


document.addEventListener("DOMContentLoaded", () => {
    // Inicializa a nave fora da tela
    xwing.style.left = posicaoHorizontal + "px";
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;
});



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
                pontosVida -= 100;                                       // Diminui 10 pontos de vida
                vida.innerText = `Vida: ${pontosVida}%`;                // Atualiza a vida no menu
                tieFighters[i].parentNode.removeChild(tieFighters[i]);  // Remove o Tie Fighter do cenario
                if (pontosVida <= 0) {                                  // Se a vida chegar a 0, chama a função gameOver
                    gameOver();
                }
            }
        }
    }
}




// Função para atirar
function atirarTieFighters() {
    const tieFighters = document.querySelectorAll(".tie_fighter");
    if (tieFighters.length === 0) {
        return; // Se não houver Tie Fighters, sai da função
    } else if (tieFighters.length <= 3) {
        const aleatorio = Math.floor(Math.random() * tieFighters.length);
        const tieEscolhido = tieFighters[aleatorio];
        criarProjeteisTieFighter(tieEscolhido);
        //somCanhoesTieFighter(); // Toca o som dos canhões do X-Wing
    } else if (tieFighters.length > 3 && tieFighters.length <= 6) {
        for(let i = 0; i < 2; i++) {
            const aleatorio = Math.floor(Math.random() * tieFighters.length);
            const tieEscolhido = tieFighters[aleatorio];
            criarProjeteisTieFighter(tieEscolhido);
            //somCanhoesTieFighter();
        }
    } else if (tieFighters.length > 6) {
        for(let i = 0; i < 3; i++) {
            const aleatorio = Math.floor(Math.random() * tieFighters.length);
            const tieEscolhido = tieFighters[aleatorio];
            criarProjeteisTieFighter(tieEscolhido);
            //somCanhoesTieFighter();
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
                        pontosVida += 10;                // Ganha mais 10 pontos de vida
                        countInimigosDestruidos = 0;     // Zera a contagem
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
                showEstatisticas(); // Atualiza as estatísticas do jogo
            }
        })
    });
}

const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
function somAcelerandoXWing() {
    const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
    audioAcelerandoXWing.volume = 0.3;
    audioAcelerandoXWing.play();
    /*
    audio.addEventListener("ended", () => { // Quando o audio terminar, chama a função somVoandoXWing
        somVoandoXWing();                   // Toca o som do X-Wing voando 
    });
    */
}