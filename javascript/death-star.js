/*------------------------------- ESTRELA DA MORTE -------------------------------*/
function surgimentoEstrelaDaMorte() {
    const estrela = document.getElementById("estacao_surge");         // Procura pelo elemento da estação que surge.
    if (!estrela) {                                                   // Se o elemento da estação ainda não existir na tela.
        const deathstar = document.createElement("div");              // Cria um novo elemento <div> para representar a Estrela da Morte.
        deathstar.id = "estacao_surge";                               // Define o ID do novo elemento.
        deathstar.className = "deathstar-rise";                       // Aplica a classe CSS para estilizar a animação de surgimento.
        cenario.appendChild(deathstar);                               // Adiciona o elemento da Estrela da Morte ao cenário do jogo.
        // Posição inicial
        let tamanhoEstrela = 0;                                       // Inicializa a variável que controla o tamanho (largura e altura) da Estrela da Morte.
        let subidaEstrela = 0;                                        // Inicializa a variável que controla a posição vertical (subida) da Estrela da Morte.
        const iniciaMovimentacaoEstrelaDaMorte = setInterval(() => {  // Inicia um intervalo para animar o movimento e crescimento da Estrela da Morte.
            let incremento = 1;                                       // Define a velocidade inicial de crescimento.
            if (tamanhoEstrela > 100) incremento = 2;                 // Aumenta a velocidade de crescimento quando o tamanho passa de 100px.
            if (tamanhoEstrela > 300) incremento = 3;                 // Aumenta a velocidade de crescimento quando o tamanho passa de 300px.
            if (tamanhoEstrela > 500) incremento = 4;                 // Aumenta a velocidade de crescimento quando o tamanho passa de 500px.
            if (tamanhoEstrela > 700) incremento = 5;                 // Aumenta a velocidade de crescimento quando o tamanho passa de 700px.
            tamanhoEstrela += incremento;                             // Adiciona o valor do incremento ao tamanho atual da Estrela da Morte
            subidaEstrela += Math.max(1, Math.floor(incremento / 2)); // Aumenta a posição de subida, fazendo-a mover-se para cima.
            deathstar.style.height = tamanhoEstrela + "px";           // Atualiza a altura do elemento da Estrela da Morte.
            deathstar.style.width = tamanhoEstrela + "px";            // Atualiza a largura do elemento da Estrela da Morte.
            deathstar.style.bottom = subidaEstrela + "px";            // Atualiza a posição vertical a partir da base da tela.
            if (tamanhoEstrela >= larguraCenario) {                   // Se o tamanho da estrela atingir a largura do cenário.
                deathstar.style.height = larguraCenario + "px";       // Fixa a altura no tamanho máximo da largura do cenário.
                deathstar.style.width = larguraCenario + "px";        // Fixa a largura no tamanho máximo da largura do cenário.
                if (subidaEstrela >= alturaCenario) {                 // Se a estrela já tiver subido completamente para fora da tela.
                    console.log("fim subida: " + subidaEstrela);      // Exibe uma mensagem no console indicando o fim da animação.
                    clearInterval(iniciaMovimentacaoEstrelaDaMorte);  // Para o intervalo de animação do movimento.
                    clearInterval(iniciaSurgimentoEstrelaDaMorte);    // Para o intervalo que iniciou esta função.
                    deathstar.remove();                               // Remove o elemento da Estrela da Morte do cenário.
                }
            }
        }, 250);
    }
}

function bossDeathStar() {
    // Parar a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);                               // Interrompe a criação dos Tie-Fighters
    clearInterval(iniciaProjeteisTieFighter);                         // Interrompe a criação de projeteis dos Tie-Fighters
    audioTrilhaSonora.pause();                                        // Interrompe a trilha sonora principal
    pontosVida = 100;                                                 // Recarrega avida para enfrentar a estrela da morte 
    atualizarMenu();                                                  // Atualiza o Menu de status do jogo
    const intervaloSuspense = setInterval(() => {                     // Cria um atraso antes da Estrela da Morte Aparecer
        clearInterval(intervaloSuspense);                             // DEsativa o loop do atraso
        velocidadeCenario = 200;
        trilhaSonoraEstrelaDaMorte();                                 // Inicia a trilha sonora da Estrela da Morte
        const deathstar = document.createElement("div");              // Cria um elemento div, que vai ser a Estrela da Morte
        deathstar.id = "estrela-da-morte";                            // Adiciona um id a Estrela da Morte
        deathstar.className = "deathstar";                            // Adiciona a classe da Estrela da Morte para aplicar o estilo
        deathstar.setAttribute("data-vida", vidaEstrelaDaMorte);      // Cria o atributo data-vida para armazenar a vida da Estrela da Morte
        cenario.insertAdjacentElement("afterbegin", deathstar);       // Adiciona a Estrela da Morte no início do cenario
        let posY = 100;                                               // Posição inicial 
        deathstar.style.bottom = posY + "%";                          // Define a posição vertical inicial da Estrela da Morte
        iniciaMovimentacaoEstrelaDaMorte = setInterval(() => {        // Cria um intervalo para mover a Estrela da Morte
            if (estrelaDestruida == false) {                          // Se a Estrela da Morte não foi destruída
                posY -= 0.1;                                          // 0.1 Decrementa a velocidade (quanto maior o valor, mais rápido desce)
                deathstar.style.bottom = posY + "%";                  // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
                if (posY <= -20) {                                    // Se a metade da Estrela da Morte avançar o fundo da tela
                    audioTrilhaSonoraEstrelaDaMorte.pause();          // Interrompe a trilha sonora da Estrela da Morte
                    deathstar.style.bottom = "-20%";                  // Fixa a Estrela Da Morte onde ela parou
                    clearInterval(iniciaMovimentacaoEstrelaDaMorte);  // para quando sair da tela
                    gameOver();                                       // Chama a função de Game Over
                }
            }
        }, 20);                                                                                        // tempo em ms → quanto menor, mais suave
        iniciaProjeteisDeathStar = setInterval(criarProjeteisDeathStar, velocidadeDisparosDeathStar);  // Inicia o looping de criação de projeteis da Estrela da Morte
        iniciaMovimentacaoProjeteisDeathStar = setInterval(moverProjeteisDeathStar, 50);               // Inicia o looping de movimento dos projeteis da Estrela da Morte
    }, 10000);                                                                                         // Tempo para aguardar a estrela da Morte Aparecer
}

function colisaoEstrelaDaMorte() {
    const deathstarElement = document.getElementById("estrela-da-morte");  // Pega o objeto criado da Estrela da Morte
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");   // Pega todos os disparos do X-Wing
    if (deathstarElement) {                                                // Se objeto Estrela da Morte existir 
        const deathstarRect = deathstarElement.getBoundingClientRect();    // Pega as coordenadas da Estrela da Morte
        todosDisparos.forEach((disparo) => {                               // Para cada disparo do X-Wing
            const colisaoDisparo = disparo.getBoundingClientRect();        // Pega as coordenadas do disparo
            if (
                deathstarRect.left < colisaoDisparo.right &&               // Verifica se o lado esquerdo da Estrela da Morte é menor que o lado direito do projetil
                deathstarRect.right > colisaoDisparo.left &&               // Verifica se o lado direito da Estrela da Morte é maior que o lado esquerdo do projetil
                deathstarRect.top < colisaoDisparo.bottom &&               // Verifica se o topo da Estrela da Morte é menor que a parte de baixo do projetil
                deathstarRect.bottom > colisaoDisparo.top                  // Verifica se a parte de baixo da Estrela da Morte é maior que o topo do projetil
            ) {
                vidaEstrelaDaMorte -= danoTiroXWing * 4;                   // Subtrai menos 4x pontos
                pontosScore += 10;                                         // Aumenta a pontuação em 10 pontos 
                pontos.innerText = `Pontos: ${pontosScore}`;               // Atualiza a pontuação do jogo
                disparo.remove();                                          // Remove o projetil que acertou a Estrela da Morte
                if (vidaEstrelaDaMorte <= 0) {                             // Se a vida da Estrela da Morte for menor ou igual a 0
                    if (sinalObiWan) {                                     // Se o sinal do Obi-Wan estiver habilitado
                        sinalObiWan = false;                               // Desabilita o sinal do Obi-Wan para não ficar repetindo infinitamente
                        somSinalObiWan();                                  // Chama o sinal da voz do Obi-Wan
                        const terminarMensagem = setInterval(() => {       // Cria um intervalo para esperar finalizar o audio do Obi-Wan
                            if (pontosVida > 0) {                          // Se ainda tiver vida 
                                clearInterval(terminarMensagem);           // Deleta o intervalo
                                habilitarAtaqueEspecial = true;            // Habilita o ataque especial
                                btnEspecialAtaque.style.display = "block"; // Exibe na tela o sinal da tecla F
                            }
                        }, 2000);                                          // Tempo para esperar finalizar o audio do Obi-Wan
                    }
                } else {                                                             // Se a vida da Estrela da Morte for maior que 0
                    deathstarElement.setAttribute("data-vida", vidaEstrelaDaMorte);  // Atualiza o parametro da vida da Estrela da Morte
                }
                showEstatisticas();                                                  // Atualiza o painel de estasticas do jogo                          
            }
        });
    }
}

function criarProjeteisDeathStar() {
    const disparo = document.createElement("div");                         // Cria um elemento div, que vai ser o projetil
    const posicaoHorizontal = Math.floor(Math.random() * larguraCenario);  // Cria uma posição aleatória na horizontal 
    disparo.className = "projetil_death-star";                             // Adiciona a classe do projetil para aplicar o estilo
    disparo.style.left = posicaoHorizontal + "px";                         // Define a posição horizontal de origem do projetil
    disparo.style.top = "0px";                                             // Define a posição vertical de origem do projetil
    cenario.appendChild(disparo);                                          // Adiciona o projetil ao cenario
}

function moverProjeteisDeathStar() {
    const tiros = document.querySelectorAll(".projetil_death-star");  // Seleciona todos os elementos com a classe projetil_death-star, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                          // Percorre todos os projeteis
        if (tiros[i]) {                                               // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;              // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilDeathStar;        // Atualiza a posição vertical do projetil, somando de acordo com a velocidade do projetil. Equação para mover para baixo
            tiros[i].style.top = posicaoTopProjetil + "px";           // Atualiza a posição vertical do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {                 // Se o projetil sair do cenario 
                tiros[i].remove();                                    // Remove o projetil do cenario          
            }
        }
    }
}