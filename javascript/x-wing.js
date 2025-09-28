/*------------------------------- X-WING -------------------------------*/
// Função para mover o X-Wing
function moverXWing() {
    // as variaveis direcaoHorizontal e direcaoVertical soman ou subtraem na coordenada atual do X-Wing, a velocidadeXWing define o quão rapido ele se move
    posicaoHorizontal += direcaoHorizontal * velocidadeXWing;                  // atuzliza as coordenadas horizontais do X-Wing
    positionVertical += direcaoVertical * velocidadeXWing;                     // atuzliza as coordenadas verticais do X-Wing
    // limitando a movimentação do X-Wing para não ultrapassar o cenario na horizontal
    if (giroHorario) {                                                         // Se a flag giroHorario for true, rotaciona o X-Wing no sentido horário
        rotacaoXWing -= velRotacaoXWing;                                       // Decrementa a rotação do X-Wing
    } else if (giroAntiHorario) {                                              // Se a flag giroAntiHorario for true, rotaciona o X-Wing no sentido anti-horário
        rotacaoXWing += velRotacaoXWing;                                       // Incrementa a rotação do X-Wing
    }
    if (posicaoHorizontal < 0) {                                               // Se a posição horizontal for menor que 0
        posicaoHorizontal = 0;                                                 // Fixa a posição horizontal em 0
    } else if (posicaoHorizontal + larguraXWing > larguraCenario) {            // Se a posição horizontal for maior que a largura do cenario
        posicaoHorizontal = larguraCenario - larguraXWing;                     // Fixa a posição horizontal em 0
    }
    // limitando a movimentação do X-Wing para não ultrapassar o cenario na vertcal
    if (positionVertical < 0) {                                                // Se a posição vertical for menor que 0
        positionVertical = 0;                                                  // Fixa a posição vertical em 0
    } else if (positionVertical + alturaXWing > alturaCenario) {               // Se a posição vertical for maior que a altura do cenario
        positionVertical = alturaCenario - alturaXWing;                        // Fixa a posição vertical em 0
    }
    // Atualizando a posição do X-Wing no cenario
    xwing.style.left = posicaoHorizontal + "px";                               // Atualiza a posição horizontal do X-Wing no cenario
    xwing.style.top = positionVertical + "px";                                 // Atualiza a posição vertical do X-Wing no cenario
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                      // Atualiza a rotação do X-Wing no cenario
}

// Função para criar os projéteis do X-Wing
const criarProjeteisXWing = (posicaoLeftTiro, posicaoTopTiro, angle_deg) => {  // Recebe a posição atual do X-Wing e o ângulo de rotação para criar os tiros
    // Centro da nave
    const center_x = posicaoLeftTiro + larguraXWing / 2;                       // Centro X do X-Wing
    const center_y = posicaoTopTiro + alturaXWing / 2;                         // Centro Y do X-Wing

    // Ângulo em radianos
    const theta = angle_deg * Math.PI / 180;                                   // Converte graus da nave para radianos

    // Posições locais dos canos de tiro (esquerdo e direito, ligeiramente à frente)
    const muzzles = [                                                          // Posições relativas ao centro da nave, em pixels
        { lx: -32, ly: -5 },                                                   // Posição do cano esquerdo
        { lx: 32, ly: -5 }                                                     // Posição do cano direito
    ];

    // Componentes de velocidade baseados no ângulo (direção: theta=0 aponta para cima)
    const speed = velocidadeProjetilXWing;                                     // Velocidade do projétil
    const vx = speed * Math.sin(theta);                                        // Componente X da velocidade do projétil
    const vy = speed * -Math.cos(theta);                                       // Componente Y da velocidade do projétil

    // Metade das dimensões do projétil para centralizar
    const half_w = 2;                                                          // Metade da largura do projétil
    const half_h = 25;                                                         // Metade da altura do projétil

    muzzles.forEach(muzzle => { // Para cada cano de tiro
        // Posição de spawn rotacionada (matriz de rotação)
        const spawn_center_x = center_x + (muzzle.lx * Math.cos(theta) - muzzle.ly * Math.sin(theta)); // Posição X do spawn do projétil
        const spawn_center_y = center_y + (muzzle.lx * Math.sin(theta) + muzzle.ly * Math.cos(theta)); // Posição Y do spawn do projétil

        // Cria o projétil
        const tiro = document.createElement("div");                            // Cria um elemento div, que vai ser o projetil
        tiro.className = "projetil_x-wing";                                    // Adiciona a classe do projetil para aplicar o estilo

        // Se o power-up estiver ativo 
        if (okPowerUp) {                                                       // Se o power-up estiver ativo
            tiro.style.backgroundColor = "orange";                             // Muda a cor do projétil para Laranja
        } else if (okFullPower) {                                              // Se o Full-Power estiver ativo
            tiro.style.backgroundColor = "cyan";                               // Muda a cor do projétil para Ciano
        } else {                                                               // Se nenhum poder especial estiver ativo
            tiro.style.backgroundColor = "red";                                // Muda a cor do projétil para o normal, vermelho
        }

        // Posiciona o canto superior esquerdo para que o centro fique na spawn
        tiro.style.left = (spawn_center_x - half_w) + "px";                    // Centraliza horizontalmente
        tiro.style.top = (spawn_center_y - half_h) + "px";                     // Centraliza verticalmente


        // Rotaciona o projétil na direção da nave
        tiro.style.transform = `rotate(${angle_deg}deg)`;                      // Rotaciona o projétil

        // Armazena velocidades vetoriais como atributos de dados
        tiro.setAttribute("data-vx", vx.toFixed(2));                           // Velocidade X
        tiro.setAttribute("data-vy", vy.toFixed(2));                           // Velocidade Y

        cenario.appendChild(tiro);                                             // Adiciona o projetil ao cenario
    });
}

// Função para atirar
function atirar() {
    if (estaAtirando) {                                                                  // Se a flag estaAtirando for true, cria os projéteis
        criarProjeteisXWing(posicaoHorizontal, positionVertical, rotacaoXWing);          // Chama a função para criar os projéteis do X-Wing, passando a posição atual do X-Wing
        somCanhoesXWing();                                                               // Toca o som dos canhões do X-Wing
    }
}

// Função para mover os projéteis do X-Wing
function moverProjeteisXWing() {
    const projeteis = document.querySelectorAll(".projetil_x-wing");                     // Seleciona todos os projéteis
    for (let i = 0; i < projeteis.length; i++) {                                         // Percorre todos os projéteis
        const disparo = projeteis[i];                                                    // Pega o projetil atual
        if (disparo) {                                                                   // Verifica se o projetil existe
            // Pega posição atual do canto superior esquerdo
            let left = parseFloat(disparo.style.left);                                   // Converte de string para float
            let top = parseFloat(disparo.style.top);                                     // Converte de string para float

            // Calcula centro atual
            const half_w = 2;                                                            // Metade da largura do projétil
            const half_h = 25;                                                           // Metade da altura do projétil
            let center_x = left + half_w;                                                // Centro X do projétil
            let center_y = top + half_h;                                                 // Centro Y do projétil

            // Pega velocidades vetoriais
            let vx = parseFloat(disparo.getAttribute('data-vx'));                        // Velocidade X do projétil
            let vy = parseFloat(disparo.getAttribute('data-vy'));                        // Velocidade Y do projétil

            // Atualiza centro
            center_x += vx;                                                              // Atualiza posição do centro do projétil na horizontal
            center_y += vy;                                                              // Atualiza posição do centro do projétil na vertical

            // Atualiza posição do canto superior esquerdo
            disparo.style.left = (center_x - half_w) + "px";                             // Centraliza horizontalmente o projétil em relação ao centro da nave
            disparo.style.top = (center_y - half_h) + "px";                              // Centraliza verticalmente o projétil em relação ao centro da nave

            // Remove se sair da tela (aproximação com centro)
            if (center_x < -10 || center_x > larguraCenario + 10 ||                      // Limite horizontal
                center_y < -10 || center_y > alturaCenario + 10) {                       // Limite vertical
                disparo.remove();                                                        // Remove o projetil do cenario
            }
        }
    }
}

// Função para implementar as colisões no X-Wing
function colisaoXWing() {
    // Colisão com os Tie-Fighter
    const todosTieFighter = document.querySelectorAll(".tie_fighter");                   // Pega todos os Tie-Fighter
    todosTieFighter.forEach((nave) => {                                                  // Percorre todos os Tie-Fighter
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoTieFighter = nave.getBoundingClientRect();                          // Pega as coordenadas do Tie-Fighter
        // Define uma "folga" para a colisão, tornando-a menos sensível.
        // Um valor maior exige que as naves se sobreponham mais para que a colisão seja registrada.
        const folgaColisao = 50;                                                         // Folga em pixels
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o Tie-Fighter
            colisaoXWing.left + folgaColisao < colisaoTieFighter.right &&                // Verifica se o lado esquerdo do X-Wing (com folga) é menor que o lado direito do Tie-Fighter
            colisaoXWing.right - folgaColisao > colisaoTieFighter.left &&                // Verifica se o lado direito do X-Wing (com folga) é maior que o lado esquerdo do Tie-Fighter
            colisaoXWing.top + folgaColisao < colisaoTieFighter.bottom &&                // Verifica se o topo do X-Wing (com folga) é menor que a parte de baixo do Tie-Fighter
            colisaoXWing.bottom - folgaColisao > colisaoTieFighter.top                   // Verifica se a parte de baixo do X-Wing (com folga) é maior que o topo do Tie-Fighter
        ) {
            explosaoNaves(nave);                                                         // Chama a função de explosão
            nave.remove();                                                               // Remove o Tie-Fighter que colidiu com o X-Wing
            if (!okResistencePower) {                                                   // Se o poder da resistencia estiver habilitado
                pontosVida -= 50;                                                        // Diminui 50 pontos para cada Tie-Fighter que colidir com o X-Wing
                if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                 // Se os pontos de vida cair para 20 pontos ou menos, chama o Toasty
                if (pontosVida > 0) {                                                    // Se ainda tiver pontos de vida
                    atualizarMenu();                                                     // Atualiza a vida no menu
                } else {                                                                 // Se a vida chegar a 0 ou menos
                    pontosVida = 0;                                                      // Fixa pontos de vida em 0
                    atualizarMenu();                                                     // Atualiza a vida no menu
                    gameOver();                                                          // Chama a função de Game Over
                }
            }
        }
    });

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
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (!okResistencePower) {                                                   // Se o poder da resistencia estiver habilitado
                pontosVida -= 5;                                                         // Diminui 5 pontos para cada projetil que acertar o X-Wing
                if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                 // Se o pontos de vida cair para 20 pontos ou menos
                if (pontosVida > 0) {                                                    // Se ainda tiver pontos de vida
                    atualizarMenu();                                                     // Atualiza a vida no menu
                } else {                                                                 // Se a vida chegar a 0 ou menos
                    pontosVida = 0;                                                      // Fixa pontos de vida em 0
                    atualizarMenu();                                                     // Atualiza a vida no menu
                    gameOver();                                                          // Chama a função de Game Over
                }
            }
        }
    });

    // Colisão com projeteis do Darth Vader
    const todosDisparosDarthVader = document.querySelectorAll(".projetil_darth-vader");  // Pega todos os disparos do Darth Vader
    todosDisparosDarthVader.forEach((disparo) => {                                       // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                          // Pega as coordenadas do projetil
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                                  // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                                  // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                                  // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                     // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (!okResistencePower) {                                                   // Se o poder da resistencia estiver habilitado
                pontosVida -= 2;                                                         // Diminui 5 pontos para cada projetil que acertar o X-Wing
                if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                 // Se o pontos de vida cair para 20 pontos ou menos
                if (pontosVida > 0) {                                                    // Se ainda tiver pontos de vida
                    atualizarMenu();                                                     // Atualiza a vida no menu
                } else {                                                                 // Se a vida chegar a 0 ou menos
                    pontosVida = 0;                                                      // Fixa pontos de vida em 0
                    atualizarMenu();                                                     // Atualiza a vida no menu
                    gameOver();                                                          // Chama a função de Game Over
                }
            }
        }
    });

    // Colisão com projeteis da Estrela da Morte
    const todosDisparosDeathStar = document.querySelectorAll(".projetil_death-star");    // Pega todos os disparos da Estrela da Morte
    todosDisparosDeathStar.forEach((disparo) => {                                        // Percorre todos os projeteis
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoDisparo = disparo.getBoundingClientRect();                          // Pega as coordenadas do projetil
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o projetil
            colisaoXWing.left < colisaoDisparo.right &&                                  // Verifica se o lado esquerdo do X-Wing é menor que o lado direito do projetil
            colisaoXWing.right > colisaoDisparo.left &&                                  // Verifica se o lado direito do X-Wing é maior que o lado esquerdo do projetil
            colisaoXWing.top < colisaoDisparo.bottom &&                                  // Verifica se o topo do X-Wing é menor que a parte de baixo do projetil
            colisaoXWing.bottom > colisaoDisparo.top                                     // Verifica se a parte de baixo do X-Wing é maior que o topo do projetil
        ) {
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (!okResistencePower) {                                                   // Se o poder da resistencia estiver habilitado
                pontosVida -= 15;                                                        // Diminui 15 pontos para cada projetil que acertar o X-Wing
                if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                 // Se o pontos de vida cair para 20 pontos ou menos
                if (pontosVida > 0) {                                                    // Se ainda tiver pontos de vida
                    atualizarMenu();                                                     // Atualiza a vida no menu
                } else {                                                                 // Se a vida chegar a 0 ou menos
                    pontosVida = 0;                                                      // Fixa pontos de vida em 0
                    atualizarMenu();                                                     // Atualiza a vida no menu
                    gameOver();                                                          // Chama a função de Game Over
                }
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
            disparo.remove();                                                            // Remove o projetil que acertou o X-Wing
            if (!okResistencePower) {                                                   // Se o poder da resistencia estiver habilitado
                pontosVida -= 60;                                                        // Diminui 60 pontos para cada projetil que acertar o X-Wing
                if (pontosVida <= 20 && pontosVida > 0) mostrarToasty();                 // Se o pontos de vida cair para 20 pontos ou menos
                if (pontosVida > 0) {                                                    // Se ainda tiver pontos de vida
                    atualizarMenu();                                                     // Atualiza a vida no menu
                } else {                                                                 // Se a vida chegar a 0 ou menos
                    pontosVida = 0;                                                      // Fixa pontos de vida em 0
                    atualizarMenu();                                                     // Atualiza a vida no menu
                    gameOver();                                                          // Chama a função de Game Over
                }
            }
        }
    });

    // Colisão com a Vida Extra
    const vidaExtra = document.querySelectorAll(".extra-life");                          // Seleciona todos os objetos da vida extra
    vidaExtra.forEach((item) => {                                                        // Percorre todos os objetos da vida extra
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoItem = item.getBoundingClientRect();                                // Pega as coordenadas do item
        const folgaColisao = 25;                                                         // Folga em pixels
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o item
            colisaoXWing.left + folgaColisao < colisaoItem.right &&                      // Verifica se o lado esquerdo do X-Wing (com folga) é menor que o lado direito do item
            colisaoXWing.right - folgaColisao > colisaoItem.left &&                      // Verifica se o lado direito do X-Wing (com folga) é maior que o lado esquerdo do item
            colisaoXWing.top + folgaColisao < colisaoItem.bottom &&                      // Verifica se o topo do X-Wing (com folga) é menor que a parte de baixo do item
            colisaoXWing.bottom - folgaColisao > colisaoItem.top                         // Verifica se a parte de baixo do X-Wing (com folga) é maior que o topo do item
        ) {
            somItensEspeciais(1);                                                        // Toca o som do item especial de Vida Extra
            pontosScore += 100;                                                          // Adiciona 100 pontos na pontuação para cada acerto no Tie Fighter
            atualizarMenu();                                                             // Atualiza a pontuação no menu
            item.remove();                                                               // Remove o item que colidiu com o X-Wing
            if (pontosVida < 100) pontosVida += 30;                                      // Se os pontos de vida for menor que 100, ganha 20 pontos de vida
            if (pontosVida >= 100) pontosVida = 100;                                     // Se os pontos de vida ultrapassar 100 pontos, mantem em 100 pontos de vida
            atualizarMenu();                                                             // Atualiza a vida no menu
        }
    });

    // Colisão com o Poder da Resistencia 
    const poderResistencia = document.querySelectorAll(".resistence-power");             // Seleciona todos os objetos do poder de resistencia
    poderResistencia.forEach((item) => {                                                 // Percorre todos os objetos do poder de resistencia
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoItem = item.getBoundingClientRect();                                // Pega as coordenadas do item
        const folgaColisao = 25;                                                         // Folga em pixels
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o item
            colisaoXWing.left + folgaColisao < colisaoItem.right &&                      // Verifica se o lado esquerdo do X-Wing (com folga) é menor que o lado direito do item
            colisaoXWing.right - folgaColisao > colisaoItem.left &&                      // Verifica se o lado direito do X-Wing (com folga) é maior que o lado esquerdo do item
            colisaoXWing.top + folgaColisao < colisaoItem.bottom &&                      // Verifica se o topo do X-Wing (com folga) é menor que a parte de baixo do item
            colisaoXWing.bottom - folgaColisao > colisaoItem.top                         // Verifica se a parte de baixo do X-Wing (com folga) é maior que o topo do item
        ) {
            somItensEspeciais(2);                                                        // Toca o som do item especial de Poder da Resistencia
            pontosScore += 100;                                                          // Adiciona 100 pontos na pontuação para cada acerto no Tie Fighter
            atualizarMenu();                                                             // Atualiza a pontuação no menu
            item.remove();                                                               // Remove o item que colidiu com o X-Wing
            if (okResistencePower) return;                                              // Se o poder já estiver ativo, apenas remove o item e não reinicia o efeito.
            okResistencePower = true;                                                   // Habilita a flag do Poder da Resistencia
            // Efeito de piscar para a transição
            let blinkTimes = 8;                                                          // Número de vezes que vai piscar (4 vezes cada estilo)
            const blinkInterval = setInterval(() => {
                // Alterna a classe para criar o efeito de piscar
                xwing.className = (xwing.className === "x-wing_standard") ? "x-wing_resistence-power" : "x-wing_standard";
                blinkTimes--;                                                            // Decrementa o contador de piscadas
                if (blinkTimes <= 0) {                                                   // Se o contador chegar a 0
                    clearInterval(blinkInterval);                                        // Para de piscar
                    xwing.className = "x-wing_resistence-power";                         // Garante que a classe final seja a do poder
                }
            }, 150);                                                                     // Intervalo do pisca-pisca (a cada 150ms)
            const duracaoPoder = setTimeout(() => {                                      // Define o tempo total do poder e o retorno ao normal
                clearInterval(duracaoPoder);                                             // Finaliza o intervalo para não ficar repetindo em loop
                okResistencePower = false;                                              // Desabilita a flag do Poder da Resistencia
                xwing.className = "x-wing_standard";                                     // Volta para a classe original do X-Wing
            }, 10000);                                                                   // 10 segundos de duração total do poder
        }
    });

    // Colisão com o Power-Up
    const powerUp = document.querySelectorAll(".power-up");                              // Seleciona todos os objetos de Power-Up
    powerUp.forEach((item) => {                                                          // Percorre todos os objetos de Power-Up
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoItem = item.getBoundingClientRect();                                // Pega as coordenadas do item
        const folgaColisao = 25;                                                         // Folga em pixels
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o item
            colisaoXWing.left + folgaColisao < colisaoItem.right &&                      // Verifica se o lado esquerdo do X-Wing (com folga) é menor que o lado direito do item
            colisaoXWing.right - folgaColisao > colisaoItem.left &&                      // Verifica se o lado direito do X-Wing (com folga) é maior que o lado esquerdo do item
            colisaoXWing.top + folgaColisao < colisaoItem.bottom &&                      // Verifica se o topo do X-Wing (com folga) é menor que a parte de baixo do item
            colisaoXWing.bottom - folgaColisao > colisaoItem.top                         // Verifica se a parte de baixo do X-Wing (com folga) é maior que o topo do item
        ) {
            somItensEspeciais(4);                                                        // Toca o som do item especial de Power-Up
            pontosScore += 100;                                                          // Adiciona 100 pontos na pontuação para cada acerto no Tie Fighter
            atualizarMenu();                                                             // Atualiza a pontuação no menu
            item.remove();                                                               // Remove o item que colidiu com o X-Wing
            if (okPowerUp) return;                                                       // Se o poder já estiver ativo, apenas remove o item e não reinicia o efeito.
            okPowerUp = true;                                                            // Habilita a flag do Power-Up
            danoTiroXWing = 5;                                                           // Aumenta o dano dos tiros do X-Wing
            clearInterval(iniciaProjeteisXWing);                                         // Finaliza o loop de atirar no modo Normal
            iniciaProjeteisXWing = setInterval(atirar, 80);                              // Inica em loop a função para atirar com o X-Wing no modo Power-Up

            const duracaoPoder = setTimeout(() => {                                      // Define o tempo total do poder e o retorno ao normal
                clearInterval(duracaoPoder);                                             // Finaliza o intervalo para não ficar repetindo em loop
                okPowerUp = false;                                                       // Desabilita a flag do Poder da Resistencia
                danoTiroXWing = 2;                                                       // Volta para o dano normal
                clearInterval(iniciaProjeteisXWing);                                     // Finaliza o loop de atirar com Power-Up
                iniciaProjeteisXWing = setInterval(atirar, 150);                         // Inica em loop a função para atirar com o X-Wing no modo normal
            }, 10000);                                                                   // 10 segundos de duração total do poder
        }
    });

    // Colisão com o Full-Power
    const fullPower = document.querySelectorAll(".full-power");                          // Seleciona todos os objetos de Power-Up
    fullPower.forEach((item) => {                                                        // Percorre todos os objetos de Power-Up
        const colisaoXWing = xwing.getBoundingClientRect();                              // Pega as coordenadas do X-Wing    
        const colisaoItem = item.getBoundingClientRect();                                // Pega as coordenadas do item
        const folgaColisao = 25;                                                         // Folga em pixels
        if (                                                                             // Verifica se houve colisão entre o X-Wing e o item
            colisaoXWing.left + folgaColisao < colisaoItem.right &&                      // Verifica se o lado esquerdo do X-Wing (com folga) é menor que o lado direito do item
            colisaoXWing.right - folgaColisao > colisaoItem.left &&                      // Verifica se o lado direito do X-Wing (com folga) é maior que o lado esquerdo do item
            colisaoXWing.top + folgaColisao < colisaoItem.bottom &&                      // Verifica se o topo do X-Wing (com folga) é menor que a parte de baixo do item
            colisaoXWing.bottom - folgaColisao > colisaoItem.top                         // Verifica se a parte de baixo do X-Wing (com folga) é maior que o topo do item
        ) {
            if (audioTrilhaSonora.played) {
                audioTrilhaSonora.volume = 0;                                            // Muta a trilha sonora principal
            }
            if (audioTrilhaSonoraDarthVader.played) {
                audioTrilhaSonoraDarthVader.volume = 0;                                  // Muta a trilha sonora do Darth Vader
            }
            if (audioTrilhaSonoraEstrelaDaMorte.played) {
                audioTrilhaSonoraEstrelaDaMorte.volume = 0;                              // Muta a trilha sonora da Estrela da Morte
            }
            somItensEspeciais(5);                                                        // Toca o som do item especial do Power-Up
            pontosScore += 100;                                                          // Adiciona 100 pontos na pontuação para cada acerto no Tie Fighter
            atualizarMenu();                                                             // Atualiza a pontuação no menu
            item.remove();                                                               // Remove o item que colidiu com o X-Wing
            if (okFullPower) return;                                                     // Se o poder já estiver ativo, apenas remove o item e não reinicia o efeito.
            okFullPower = true;                                                          // Habilita a flag do Power-Up
            okResistencePower = true;                                                    // Habilita a flag do Poder da Resistencia
            somItensEspeciais(3);                                                        // Toca a trilha sonoroa do Full-Power
            pontosVida = 100;                                                            // Recarrega a vida ao máximo
            atualizarMenu();                                                             // Atualiza a vida no menu
            // Efeito de piscar para a transição
            let blinkTimes = 8;                                                          // Número de vezes que vai piscar (4 vezes cada estilo)
            const blinkInterval = setInterval(() => {
                // Alterna a classe para criar o efeito de piscar
                xwing.className = (xwing.className === "x-wing_standard") ? "x-wing_resistence-power" : "x-wing_standard";
                blinkTimes--;                                                            // Decrementa o contador de piscadas
                if (blinkTimes <= 0) {                                                   // Se o contador chegar a 0
                    clearInterval(blinkInterval);                                        // Para de piscar
                    xwing.className = "x-wing_resistence-power";                         // Garante que a classe final seja a do poder
                }
            }, 150);
            danoTiroXWing = 5;                                                           // Aumenta o dano dos tiros do X-Wing
            clearInterval(iniciaProjeteisXWing);                                         // Finaliza o loop de atirar no modo Normal
            iniciaProjeteisXWing = setInterval(atirar, 80);                              // Inica em loop a função para atirar com o X-Wing no modo Power-Up
            const duracaoPoder = setTimeout(() => {                                      // Define o tempo total do poder e o retorno ao normal
                clearInterval(duracaoPoder);                                             // Finaliza o intervalo para não ficar repetindo em loop
                okResistencePower = false;                                               // Desabilita a flag do Poder da Resistencia
                okFullPower = false;                                                     // Desabilita a flag do Poder da Resistencia
                danoTiroXWing = 3;                                                       // Volta para o dano normal
                clearInterval(iniciaProjeteisXWing);                                     // Finaliza o loop de atirar com Power-Up
                iniciaProjeteisXWing = setInterval(atirar, 150);                         // Inica em loop a função para atirar com o X-Wing no modo normal
                xwing.className = "x-wing_standard";                                     // Volta para a classe original do X-Wing
                if (audioTrilhaSonora.played) {
                    audioTrilhaSonora.volume = 0.7;                                      // Reativa o volume da trilha sonora principal normalmente
                }
                if (audioTrilhaSonoraDarthVader.played) {
                    audioTrilhaSonoraDarthVader.volume = 0.7;                            // Reativa o volume da trilha sonora do Darth Vader
                }
                if (audioTrilhaSonoraEstrelaDaMorte.played) {
                    audioTrilhaSonoraEstrelaDaMorte.volume = 0.7;                        // Reativa o volume da trilha sonora da Estrela da Morte normalmente
                }
            }, 17000);                                                                   // 17 segundos de duração total do poder, o mesmo tempo do audio
        }
    });
    showEstatisticas();                                                                  // Atualiza as estatísticas do jogo
}

// Cria um projetil de punição por ficar parado no jogo
function criarProjeteisPunicao() {
    if (direcaoHorizontal === 0 && direcaoVertical === 0 && !estaSendoPunido) {          // Verifica se a nave está parada e não houver uma punição em andamento
        if (timestampInicioParado === 0) timestampInicioParado = Date.now();             // Se a nave acabou de parar, registra o timestamp inicial
        tempoParado = Date.now() - timestampInicioParado;                                // Calcula o tempo total que a nave está parada, de forma precisa
        if (tempoParado >= (tempoDePunicao * 1000)) {                                    // Se o tempo parado exceder o limite 
            // Calcula a posição do disparo para mirar no centro da nave
            const larguraProjetilPunicao = 15;                                           // Largura definida no CSS para .projetil_punicao
            const coordenadaHorizontalXWing = parseFloat(xwing.style.left);              // Pega a coordenada horizontal do X-Wing
            let coordenaDisparo = coordenadaHorizontalXWing + (larguraXWing / 2) - (larguraProjetilPunicao / 2); // Calcula a coordenada horizontal do disparo
            const disparo = document.createElement("div");                               // Cria um objeto <div> que será o disparo de punição
            disparo.className = "projetil_punicao";                                      // Adiciona a classe do projetil para aplicar o estilo
            disparo.style.left = coordenaDisparo + "px";                                 // Define a posição horizontal do disparo
            disparo.style.top = "0px";                                                   // Define a posição vertical do disparo
            cenario.appendChild(disparo);                                                // Adiciona o disparo ao cenario
            estaSendoPunido = true;                                                      // Ativa a flag para evitar múltiplos disparos
            timestampInicioParado = 0;                                                   // Reseta o timestamp para uma nova contagem
            tempoParado = 0;                                                             // Reseta o contador de tempo parado para a UI
            somTiroPunicao();                                                            // Toca o som do tiro de punição
        }
    } else {
        // Se a nave se mover, reseta os contadores
        timestampInicioParado = 0;
        tempoParado = 0;
    }
}

// Movimenta o projetil de punição 
function moverProjeteisPunicao() {
    const tiros = document.querySelectorAll(".projetil_punicao");                        // Seleciona todos os elementos com a classe projetil_punicao, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                                             // Percorre todos os projeteis
        if (tiros[i]) {                                                                  // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;                                 // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilPunicao;                             // Atualiza a posição vertical do projetil, somando de acordo com a velocidade do projetil. Equação para mover para baixo
            tiros[i].style.top = posicaoTopProjetil + "px";                              // Atualiza a posição vertical do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {                                    // Se o projetil sair do cenario 
                tiros[i].remove();                                                       // Remove o projetil do cenario          
            }
        }
    }
    estaSendoPunido = false;                                                             // Libera para próximo ataque
}