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
                pontosVida -= 3;                                                  // Diminui 5 pontos de vida
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
                    velocidadeCenario--;
                    if (velocidadeCenario <= 25) velocidadeCenario = 25;
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