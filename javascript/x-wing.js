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
    const vx = speed * Math.sin(theta);       // Componente X da velocidade do projétil
    const vy = speed * -Math.cos(theta);      // Componente Y da velocidade do projétil

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

// Função para implementar as colisões no X-Wing
function colisaoXWing() {
    // Colisão com projeteis do Tie-Fighter
    const todosDisparosTieFighter = document.querySelectorAll(".projetil_tie-fighter");  // Pega todos os disparos do Tie Fighter
    todosDisparosTieFighter.forEach((disparo) => {                                       // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                          // Pega as coordenadas do projetil
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                                  // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                                  // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                                  // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                     // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            pontosVida -= 3;                                                             // Diminui 3 pontos para cada projetil que acertar o X-Wing
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                     // Se o pontos de vida cair para 20 pontos ou menos
            if (pontosVida > 0) {                                                        // Se ainda tiver pontos de vida
                atualizarMenu();                                                         // Atualiza a vida no menu
            } else {                                                                     // Se a vida chegar a 0 ou menos
                pontosVida = 0;                                                          // Fixa pontos de vida em 0
                atualizarMenu();                                                         // Atualiza a vida no menu
                okGameOver = true;                                                       // Libera a execução do Game Over
                gameOver();                                                              // Chama a função de Game Over
            }
        }
    });

    // Colisão com projeteis da Estrela da Morte
    const todosDisparosDeathStar = document.querySelectorAll(".projetil_death-star");  // Pega todos os disparos da Estrela da Morte
    todosDisparosDeathStar.forEach((disparo) => {                                      // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                            // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                        // Pega as coordenadas do projetil
        if (                                                                           // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                                // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                                // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                                // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                   // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            pontosVida -= 15;                                                          // Diminui 15 pontos para cada projetil que acertar o X-Wing
            disparo.remove();                                                          // Remove o projetil que acertou o X-Wing
            if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                   // Se o pontos de vida cair para 20 pontos ou menos
            if (pontosVida > 0) {                                                      // Se ainda tiver pontos de vida
                atualizarMenu();                                                       // Atualiza a vida no menu
            } else {                                                                   // Se a vida chegar a 0 ou menos
                pontosVida = 0;                                                        // Fixa pontos de vida em 0
                atualizarMenu();                                                       // Atualiza a vida no menu
                okGameOver = true;                                                     // Libera a execução do Game Over
                gameOver();                                                            // Chama a função de Game Over
            }
        }
    });

    // Colisão com projeteis de Punição
    const todosDisparosPunicao = document.querySelectorAll(".projetil_punicao");         // Pega todos os disparos de punição
    todosDisparosPunicao.forEach((disparo) => {                                          // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                          // Pega as coordenadas do projetil
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                                  // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                                  // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                                  // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                     // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            pontosVida -= 50;                                                            // Diminui 50 pontos para cada projetil que acertar o X-Wing
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                     // Se o pontos de vida cair para 20 pontos ou menos
            if (pontosVida > 0) {                                                        // Se ainda tiver pontos de vida
                atualizarMenu();                                                         // Atualiza a vida no menu
            } else {                                                                     // Se a vida chegar a 0 ou menos
                pontosVida = 0;                                                          // Fixa pontos de vida em 0
                atualizarMenu();                                                         // Atualiza a vida no menu
                okGameOver = true;                                                       // Libera a execução do Game Over
                gameOver();                                                              // Chama a função de Game Over
            }
        }
    });

    showEstatisticas(); // Atualiza as estatísticas do jogo
}

// Cria um projetil de punição por ficar parado no jogo
function criarProjetilPunicao() {
    const disparo = document.createElement("div");                       // Cria um elemento div, que vai ser o projetil   
    const coordenadaHorizontalXWing = parseFloat(xwing.style.left);      // Pega a posição horizontal atual do X-Wing 
    let coordenaDisparo = coordenadaHorizontalXWing + (larguraXWing / 2) - 7;  // Constroi a coordenada horizontal do projetil mirando no meio da nave
    disparo.className = "projetil_punicao";                              // Adiciona a classe do projetil para aplicar o estilo
    disparo.style.left = coordenaDisparo + "px";                         // Define a posição horizontal de origem do projetil
    disparo.style.top = "0px";                                           // Define a posição vertical de origem do projetil
    cenario.appendChild(disparo);                                        // Adiciona o projetil ao cenario
}

// Movimenta o projetil de punição 
function moverProjeteisPunicao() {
    const tiros = document.querySelectorAll(".projetil_punicao");  // Seleciona todos os elementos com a classe projetil_punicao, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                       // Percorre todos os projeteis
        if (tiros[i]) {                                            // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;           // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilPunicao;       // Atualiza a posição vertical do projetil, somando de acordo com a velocidade do projetil. Equação para mover para baixo
            tiros[i].style.top = posicaoTopProjetil + "px";        // Atualiza a posição vertical do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {              // Se o projetil sair do cenario 
                tiros[i].remove();                                 // Remove o projetil do cenario          
            }
        }
    }
    estaSendoPunido = false; // Libera para próximo ataque
}
