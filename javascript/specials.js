function criarItensEspeciais() {
    const pausaDeInicio = setTimeout(() => {                                             // Cria uma pausa para não criar itens especiais com a abertura do jogo
        clearInterval(pausaDeInicio);                                                    // Finaliza o intervalo para não ficar repetindo em loop
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
    }, 1 * 60 * 1000);  // Calculo para esperar em minutos
}

function moverItensEspeciais() {
    const vidaExtra = document.querySelectorAll(".extra-life");                  // Seleciona todos os objetos da vida extra
    const poderResistencia = document.querySelectorAll(".resistence-power");     // Seleciona todos os objetos do poder de resistencia
    const powerUp = document.querySelectorAll(".power-up");                      // Seleciona todos os objetos de Power-Up

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
}