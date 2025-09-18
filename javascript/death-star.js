/*------------------------------- ESTRELA-DA-MORTE -------------------------------*/
function bossDeathStar() {
    // Para a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);
    clearInterval(iniciaProjeteisTieFighter);
    audioTrilhaSonora.pause();                // Interrompe a trilha sonora principal
    pontosVida = 1000;                         // Recarrega avida para enfrentar a estrela da morte
    velocidadeCenario = 100;
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
                posY -= 0.1;                                      // 0.1 velocidade (quanto maior, mais rápido desce)
                deathstar.style.bottom = posY + "%";              // Atualiza a posição vertical da Estrela-da-Morte
                if (posY <= -20) {                                 // Se a Estrela-da-Morte chegar ao meio da tela
                    audioTrilhaSonoraEstrelaDaMorte.pause();      // Interrompe a trilha sonora da Estrela da Morte
                    deathstar.style.bottom = "-20vw";               // Fixa no topo do cenário
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
                    if (sinalObiWan) {
                        sinalObiWan = false;
                        somSinalObiWan();
                        const terminarMensagem = setInterval(() => {
                            clearInterval(terminarMensagem);
                            habilitarAtaqueEspecial = true;
                            btnEspecialAtaque.style.display = "block";
                        }, 2000);
                    }
                } else {
                    deathstarElement.setAttribute("data-vida", vidaEstrelaDaMorte);
                }
                showEstatisticas();
            }
        });
    }
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