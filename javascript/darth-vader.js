function bossDarthVader() {
    // Parar a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);                               // Interrompe a criação dos Tie-Fighters
    clearInterval(iniciaProjeteisTieFighter);                         // Interrompe a criação de projeteis dos Tie-Fighters
    barraDeVidaDarthVader.style.display = "block";                    // Mostra a barra de vida do Darth Vader
    audioTrilhaSonora.pause();                                        // Interrompe a trilha sonora principal
    pontosVida += 50;                                                 // Recarrega a vida para enfrentar o Darth Vader
    atualizarMenu();                                                  // Atualiza o Menu de status do jogo
    const intervaloSuspense = setInterval(() => {                     // Cria um atraso antes do Darth Vader Aparecer
        clearInterval(intervaloSuspense);                             // DEsativa o loop do atraso
        //trilhaSonoraDarthVader();                                   // Inicia a trilha sonora do Darth Vader
        const darthvader = document.createElement("div");             // Cria um elemento div, que vai ser o Darth Vader
        darthvader.id = "darthvader";                                 // Adiciona um id para o Darth Vader
        darthvader.className = "darth_vader";                         // Adiciona a classe do Darth Vader para aplicar o estilo
        darthvader.setAttribute("data-vida", vidaDarthVader);         // Cria o atributo data-vida para armazenar a vida do Darth Vader
        cenario.insertAdjacentElement("afterbegin", darthvader);      // Adiciona o Darth Vader no início do cenario
        // Falta introduzir o Darth Vader ao cenario vindo de cima



        iniciaProjeteisDarthVader = setInterval(criarProjeteisDarthVader, velocidadeDisparosDarthVader);  // Inicia o looping de criação de projeteis do Darth Vader
        iniciaMovimentacaoProjeteisDarthVader = setInterval(moverProjeteisDarthVader, 50);                // Inicia o looping de movimento dos projeteis do Darth Vader
    }, 10000);                                                                                            // Tempo para aguardar a estrela da Morte Aparecer
}

function colisaoDarthVader() {
    const darthVaderElement = document.getElementById("darthvader");              // Pega o objeto criado do Darth Vader
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");          // Pega todos os disparos do X-Wing
    if (darthVaderElement) {                                                      // Se objeto Darth Vader existir 
        const darthVaderRect = darthVaderElement.getBoundingClientRect();         // Pega as coordenadas do Darth Vader
        todosDisparos.forEach((disparo) => {                                      // Para cada disparo do X-Wing
            const colisaoDisparo = disparo.getBoundingClientRect();               // Pega as coordenadas do disparo
            if (
                darthVaderRect.left < colisaoDisparo.right &&                     // Verifica se o lado esquerdo do Darth Vader é menor que o lado direito do projetil
                darthVaderRect.right > colisaoDisparo.left &&                     // Verifica se o lado direito do Darth Vader é maior que o lado esquerdo do projetil
                darthVaderRect.top < colisaoDisparo.bottom &&                     // Verifica se o topo do Darth Vader é menor que a parte de baixo do projetil
                darthVaderRect.bottom > colisaoDisparo.top                        // Verifica se a parte de baixo do Darth Vader é maior que o topo do projetil
            ) {
                vidaDarthVader -= danoTiroXWing;                                  // Subtrai a vida do Darth Vader
                pontosScore += 1;                                                 // Aumenta a pontuação em 1 ponto 
                pontos.innerText = `Pontos: ${pontosScore}`;                      // Atualiza a pontuação do jogo
                disparo.remove();                                                 // Remove o projetil que acertou o Darth Vader
                atualizarMenu();                                                  // Atualiza o Menu de status do jogo
                if (vidaDarthVader <= 0) {                                        // Se a vida do Darth Vader for menor ou igual a 0
                    // Criar efeito que o Darth Vader sai girando da tela

                } else {                                                          // Se a vida do Darth Vader for maior que 0
                    darthVaderElement.setAttribute("data-vida", vidaDarthVader);  // Atualiza o parametro da vida do Darth Vader
                }
                showEstatisticas();                                               // Atualiza o painel de estasticas do jogo                          
            }
        });
    }
}

function criarProjeteisDarthVader() {

}

function moverProjeteisDarthVader() {
    const tiros = document.querySelectorAll(".projetil_darth-vader");       // Seleciona todos os elementos com a classe projetil_darth-vader, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                                // Percorre todos os projeteis
        if (tiros[i]) {                                                     // Verifica se o projetil existe



        }
    }
}