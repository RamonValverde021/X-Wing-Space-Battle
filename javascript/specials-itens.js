function criarItensEspeciais() {
    let sorteio = Math.floor(Math.random() * 6);                                     // Sorteia um valor entre 0 a 6
    if (sorteio == 0 || sorteio == 1 || sorteio == 2) {                              // Se o valor for 0, 1 ou 2
        const vida = document.createElement("div");                                  // Cria um elemento div, que vai ser o objeto da vida extra
        const posicaoHorizontalVida = Math.floor(Math.random() * larguraCenario);    // Cria uma posição aleatória na horizontal 
        vida.className = "extra-life";                                               // Adiciona a classe do objeto para aplicar o estilo
        vida.style.left = posicaoHorizontalVida + "px";                              // Define a posição horizontal de origem do objeto
        vida.style.top = "0px";                                                      // Define a posição vertical de origem do objeto
        cenario.appendChild(vida);                                                   // Adiciona o objeto ao cenario
    } else if (sorteio == 3) {                                                       // Se o valor for 3
        const resistencia = document.createElement("div");                           // Cria um elemento div, que vai ser o objeto do poder de resistencia
        const posicaiResistencia = Math.floor(Math.random() * larguraCenario);       // Cria uma posição aleatória na horizontal 
        resistencia.className = "resistence-power";                                  // Adiciona a classe do objeto para aplicar o estilo
        resistencia.style.left = posicaiResistencia + "px";                          // Define a posição horizontal de origem do objeto
        resistencia.style.top = "0px";                                               // Define a posição vertical de origem do objeto
        cenario.appendChild(resistencia);                                            // Adiciona o objeto ao cenario
    } else if (sorteio == 4 || sorteio == 5) {                                       // Se o valor for 4 ou 5
        const powerUp = document.createElement("div");                               // Cria um elemento div, que vai ser o objeto do Power Up
        const posicaoPowerUp = Math.floor(Math.random() * larguraCenario);           // Cria uma posição aleatória na horizontal 
        powerUp.className = "power-up";                                              // Adiciona a classe do objeto para aplicar o estilo
        powerUp.style.left = posicaoPowerUp + "px";                                  // Define a posição horizontal de origem do objeto
        powerUp.style.top = "0px";                                                   // Define a posição vertical de origem do objeto
        cenario.appendChild(powerUp);                                                // Adiciona o objeto ao cenario
    } else {
        return;
    }
}

// Item Full-Power
let intervaloFullPower = 10000;                                                  // 10000 - Libera a criação do item de Full-Power a cada 10000 pontos
let contagemAnterior = 0;                                                        // Variavel de atuaização de contagem
function criarItemFullPower() {
    let contagemAtual = pontosScore;                                             // Pega a pontuação atual do jogador.
    if (contagemAtual - contagemAnterior >= intervaloFullPower) {                // Verifica se o jogador ganhou pontos suficientes desde a última vez que o item foi criado.
        contagemAnterior = contagemAtual;                                        // Atualiza a contagem para a próxima verificação.
        const fullPower = document.createElement("div");                         // Cria um novo elemento <div> para o item.
        const posicaiItem = Math.floor(Math.random() * larguraCenario);          // Sorteia uma posição horizontal aleatória para o item aparecer.
        fullPower.className = "full-power";                                      // Define a classe CSS para estilizar o item.
        fullPower.style.left = posicaiItem + "px";                               // Define a posição horizontal do item.
        fullPower.style.top = "0px";                                             // Define a posição inicial no topo da tela.
        cenario.appendChild(fullPower);                                          // Adiciona o item ao cenário do jogo.
    }
}

function moverItensEspeciais() {
    const vidaExtra = document.querySelectorAll(".extra-life");                  // Seleciona todos os objetos da vida extra
    for (let i = 0; i < vidaExtra.length; i++) {                                 // Percorre todos os objetos da vida extra
        if (vidaExtra[i]) {                                                      // Verifica se o objeto existe
            let posicaoItem = vidaExtra[i].offsetTop;                            // Pega a posição vertical atual do objeto
            posicaoItem += velocidadeItemEspecial;                               // Atualiza a posição vertical do objeto, somando de acordo com a velocidade do objeto. Equação para mover para baixo
            vidaExtra[i].style.top = posicaoItem + "px";                         // Atualiza a posição vertical do objeto no cenario
            if (posicaoItem > alturaCenario) {                                   // Se o objeto sair do cenario 
                vidaExtra[i].remove();                                           // Remove o objeto do cenario          
            }
        }
    }

    const poderResistencia = document.querySelectorAll(".resistence-power");     // Seleciona todos os objetos do poder de resistencia
    for (let i = 0; i < poderResistencia.length; i++) {                          // Percorre todos os objetos do poder de resistencia
        if (poderResistencia[i]) {                                               // Verifica se o objeto existe
            let posicaoItem = poderResistencia[i].offsetTop;                     // Pega a posição vertical atual do objeto
            posicaoItem += velocidadeItemEspecial;                               // Atualiza a posição vertical do objeto, somando de acordo com a velocidade do objeto. Equação para mover para baixo
            poderResistencia[i].style.top = posicaoItem + "px";                  // Atualiza a posição vertical do objeto no cenario
            if (posicaoItem > alturaCenario) {                                   // Se o objeto sair do cenario 
                poderResistencia[i].remove();                                    // Remove o objeto do cenario          
            }
        }
    }

    const powerUp = document.querySelectorAll(".power-up");                      // Seleciona todos os objetos de Power-Up
    for (let i = 0; i < powerUp.length; i++) {                                   // Percorre todos os objetos do Power-Up
        if (powerUp[i]) {                                                        // Verifica se o objeto existe
            let posicaoItem = powerUp[i].offsetTop;                              // Pega a posição vertical atual do objeto
            posicaoItem += velocidadeItemEspecial;                               // Atualiza a posição vertical do objeto, somando de acordo com a velocidade do objeto. Equação para mover para baixo
            powerUp[i].style.top = posicaoItem + "px";                           // Atualiza a posição vertical do objeto no cenario
            if (posicaoItem > alturaCenario) {                                   // Se o objeto sair do cenario 
                powerUp[i].remove();                                             // Remove o objeto do cenario          
            }
        }
    }

    const fullPower = document.querySelectorAll(".full-power");                  // Seleciona todos os objetos de Full-Power
    for (let i = 0; i < fullPower.length; i++) {                                 // Percorre todos os objetos do Full-Power
        if (fullPower[i]) {                                                      // Verifica se o objeto existe
            let posicaoItem = fullPower[i].offsetTop;                            // Pega a posição vertical atual do objeto
            posicaoItem += velocidadeItemEspecial;                               // Atualiza a posição vertical do objeto, somando de acordo com a velocidade do objeto. Equação para mover para baixo
            fullPower[i].style.top = posicaoItem + "px";                         // Atualiza a posição vertical do objeto no cenario
            if (posicaoItem > alturaCenario) {                                   // Se o objeto sair do cenario 
                fullPower[i].remove();                                           // Remove o objeto do cenario          
            }
        }
    }
}