/*------------------------------- VITORIA -------------------------------*/
// Função que inicializara o ataque especial
function xwingEspecialAtaque() {
    // Desativa controles e intervalos
    document.removeEventListener("keydown", teclasControlePressionadas);  // Remove os eventos de controle do X-Wing de keydown
    document.removeEventListener("keyup", teclasControleSoltas);          // Remove os eventos de controle do X-Wing de keyup
    document.removeEventListener("keypress", teclasControleClicadas);     // Remove os eventos de controle do X-Wing de keypress
    clearInterval(iniciaGamepadVirtual);                                  // Interrompe os controles do gamepad virtual
    clearInterval(iniciaProjeteisXWing);                                  // Interrompe a criação de projeteis do X-Wing
    clearInterval(iniciaMovimentacaoXWing);                               // Interrompe a movimentação do X-Wing
    clearInterval(iniciaNavesInimigas);                                   // Interrompe a criação dos Tie-Fighters
    clearInterval(iniciaProjeteisTieFighter);                             // Interrompe a criação de projeteis dos Tie-Fighters
    clearInterval(iniciaColisaoXWing);                                    // Interrompe as colisões com o X-Wing
    clearInterval(iniciaProjeteisPunicao);                                // Interrompe a criação de disparos de punição
    clearInterval(iniciaCriarItensEspeciais);                             // Interrompe a criação de itens especiais
    clearInterval(iniciaCriarItemFullPower);                              // Interrompe a criação de itens full power

    // Define rotação para apontar para cima
    rotacaoXWing = 0;                                                     // Define a variável de rotação do X-Wing para 0
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;                 // Ajusta o ângulo do X-Wing para o ângulo inical (0)

    // Posições inicial e alvo
    let posX = parseFloat(xwing.style.left);                              // Pega a posição horizontal atual do X-Wing
    let posY = parseFloat(xwing.style.top);                               // Pega a posição vertical atual do X-Wing
    const targetX = larguraCenario / 2 - larguraXWing / 2;                // Calcula a posição horizontal alvo
    const targetY = alturaCenario - alturaXWing;                          // Calcula a posição vertical alvo

    // Animação para mover o X-Wing
    const intervaloMovimento = setInterval(() => {                        // Looping para a animação do X-Wing ir até no meio do fundo da tela
        const dx = targetX - posX;                                        // Calcula a diferença horizontal para o alvo
        const dy = targetY - posY;                                        // Calcula a diferença vertical para o alvo
        posX += dx * 0.1;                                                 // Ajusta a posição horizontal com uma fração da diferença
        posY += dy * 0.1;                                                 // Ajusta a posição vertical com uma fração da diferença
        xwing.style.left = posX + "px";                                   // Atualiza a posição horizontal do X-Wing
        xwing.style.top = posY + "px";                                    // Atualiza a posição vertical do X-Wing
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {                       // Verifica se chegou perto o suficiente do alvo
            clearInterval(intervaloMovimento);                            // Para a animação
            xwing.style.left = targetX + "px";                            // Garante a posição exata do X-Wing no alvo
            xwing.style.top = targetY + "px";                             // Garante a posição exata do X-Wing no alvo
            // Disparar projetil especial
            projetilEspecial();                                           // Chama a função que cria o projetil especial
        }
    }, 30);
}

function projetilEspecial() {
    const posicaoLeftTiro = parseFloat(xwing.style.left);                 // Pega a posição horizontal atual do X-Wing
    const posicaoTopTiro = parseFloat(xwing.style.top);                   // Pega a posição vertical atual do X-Wing
    const centerX = posicaoLeftTiro + larguraXWing / 2;                   // Centro X do X-Wing
    const centerY = posicaoTopTiro + alturaXWing / 2;                     // Centro Y do X-Wing
    // Cria dois elementos de disparo, um de cada lado do X-Wing
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");                   // Cria um elemento div, que vai ser o projetil especial
    tiroEsquerdo.className = "torpedo_x-wing";                            // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX + 30 + "px";                        // Define a posição horizontal esquerda do projetil referente a posição central horizontal do X-Wing
    tiroEsquerdo.style.top = centerY - 110 + "px";                        // Define a posição vertical do projetil referente a posição central vertical do X-Wing
    cenario.appendChild(tiroEsquerdo);                                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");                    // Cria um elemento div, que vai ser o projetil especial
    tiroDireito.className = "torpedo_x-wing";                             // Adiciona a classe do projetil para aplicar o estilo
    tiroDireito.style.left = centerX - 35 + "px";                         // Define a posição horizontal direita do projetil referente a posição central horizontal do X-Wing
    tiroDireito.style.top = centerY - 110 + "px";                         // Define a posição vertical do projetil referente a posição central vertical do X-Wing
    cenario.appendChild(tiroDireito);                                     // Adiciona o projetil ao cenario
    somCanhoesXWingProtons();                                             // Chama o som do disparo de canhões de protons do X-Wing
}

function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");            // Seleciona todos os projeteis do X-Wing
    for (let i = 0; i < tiros.length; i++) {                               // Percorre todos os projéteis
        if (tiros[i]) {                                                    // Verifica se o projétil existe
            let posicaoTopProjetil = tiros[i].offsetTop;                   // Pega a posição vertical atual do projétil
            posicaoTopProjetil -= velocidadeProjetilXWing;                 // Atualiza a posição vertical do projétil (move para cima)
            tiros[i].style.top = posicaoTopProjetil + "px";                // Atualiza a posição no cenário
            if (posicaoTopProjetil <= 50) {                                // Verifica se o projétil atingiu um pouco abixo do topo do cenário
                tiros[i].remove();                                         // Remove o projétil (para de subir e some)
                setTimeout(() => {             // Delay para ativar a sequência de vitória (como no original)
                    xwingSaindo();                                         // Chama a função que faz o X-Wing sair voando
                }, 1000);                                                  // 1 segundo de delay
                return;                                                    // Sai do loop para esse projétil (já foi processado)
            }

        }
    }
}

// Função que faz o X-Wing sair voando rapido do cenario
function xwingSaindo() {
    audioVoandoXWing.pause();                                                  // Pausa o audio do X-Wing Voando

    // Pega posição inicial
    let posY = parseFloat(xwing.style.top);                                    // Pega a posição vertical atual do X-Wing
    const speed = 50;                                                          // Define a velocidade de subida do X-Wing

    // Animação para mover o X-Wing para cima rapidamente
    const intervalo = setInterval(() => {
        posY -= speed;                                                         // Atualiza a posição vertical do X-Wing (move para cima rapidamente)
        xwing.style.top = posY + "px";                                         // Atualiza a posição no cenário
        // Verifica se o X-Wing saiu do cenário
        if (posY <= -alturaXWing) {                                            // Se o X-Wing saiu do topo do cenário
            clearInterval(intervalo);                                          // Para a animação
            setTimeout(() => {                                                 // Delay para dar tempo do X-Wing sair da tela e começar a explosao da Estrela da Morte
                explosaoEstrelaDaMorte();                                      // Chama a função que faz a explosão da Estrela da Morte
                setTimeout(() => {                                             // Delay para mostrar a mensagem de vitória
                    clearInterval(iniciaContagemTempoGameplay);                // Interrompe a contagem do tempo de jogo
                    const vitoria = document.createElement("h1");              // Cria um elemento h1
                    vitoria.className = "gamewin";                             // Adiciona a classe para aplicar o estilo
                    // Adiciona o texto da vitória
                    vitoria.innerHTML = `Contra &nbsp; todas &nbsp; as &nbsp; probabilidades, &nbsp; 
                    voce &nbsp; triunfou!<br>Gracas &nbsp; a &nbsp; voce &nbsp; o &nbsp; terror &nbsp; 
                    tecnologico &nbsp; do &nbsp; Imperio &nbsp; caiu &nbsp; em &nbsp; ruinas, &nbsp; 
                    trazendo &nbsp; uma &nbsp; nova &nbsp; era &nbsp; de &nbsp; esperanca &nbsp; 
                    para &nbsp; a &nbsp; Galaxia.`;
                    // força o fade-in
                    setTimeout(() => {
                        vitoria.style.opacity = 1;                             // Aplica o estilo de opacidade para fazer o fade-in
                    }, 100);                                                   // 100ms já é suficiente
                    cenario.appendChild(vitoria);                              // Adiciona a mensagem ao cenário
                    somVitoria();                                              // Toca o som da vitória
                    setTimeout(() => reiniciarJogo(), (2 * 60 * 1000) + 5000); // Agenda a reinicialização do jogo para daqui a 02:05
                }, 5000);                                                      // Mostra a mensagem após 5 segundos
            }, 3000);                                                          // Ativa a explosão após 3 segundos
        }
    }, 20);                                                                    // Delay de 20 milissegundos a cada frame
}

// Função que faz a explosão da Estrela da Morte
function explosaoEstrelaDaMorte() {
    clearInterval(iniciaProjeteisDeathStar);                                   // Interrompe a criação de projeteis da Estrela da Morte
    clearInterval(iniciaMovimentacaoProjeteisDeathStar);                       // Interrompe a movimentação dos projeteis da Estrela da Morte
    clearInterval(iniciaColisaoEstrelaDaMorte);                                // Interrompe as colisões com a Estrela da Morte
    clearInterval(iniciaCriarItensEspeciais);                                  // Interrompe a criação de itens especiais
    clearInterval(iniciaCriarItemFullPower);                                   // Interrompe a criação de itens full power
    const disparosDeathStar = document.querySelectorAll(".projetil_death-star");  // Seleciona todos os projeteis da Estrela da Morte
    disparosDeathStar.forEach((disparos) => disparos.remove());                // Remove todos os projeteis da Estrela da Morte
    pontosScore += 10000;                                                      // Adiciona 10000 pontos ao score
    atualizarMenu();                                                           // Atualiza o menu do jogo
    audioTrilhaSonoraDarthVader.pause();                                       // Interrompe a trilha sonora do Darth Vader
    audioTrilhaSonoraEstrelaDaMorte.pause();                                   // Interrompe a trilha sonora da Estrela da Morte
    estrelaDestruida = true;                                                   // Marca que a Estrela-da-Morte foi destruída
    const deathstarElement = document.getElementById("estrela-da-morte");      // Seleciona a Estrela da Morte
    const deathstarRect = deathstarElement.getBoundingClientRect();            // Pega as coordenadas da Estrela da Morte
    const explosao = document.createElement("div");                            // Cria um elemento div, que vai ser a explosão da Estrela da Morte
    explosao.className = "explosao";                                           // Adiciona a classe da explosão para aplicar o estilo
    explosao.style.left = deathstarRect.left + "px";                           // Define a posição horizontal da explosão referente a posição da Estrela da Morte
    explosao.style.top = deathstarRect.top + "px";                             // Define a posição vertical da explosão referente a posição da Estrela da Morte
    explosao.style.width = deathstarRect.width + "px";                         // Define a largura da explosão com o mesmo tamanho da Estrela da Morte.
    explosao.style.height = deathstarRect.height + "px";                       // Define a altura da explosão com o mesmo tamanho da Estrela da Morte.
    deathstarElement.remove();                                                 // Remove a Estrela da Morte do cenário
    cenario.appendChild(explosao);                                             // Adiciona a explosão ao cenário
    somExplosaoEstrelaDaMorte();                                               // Chama o som da explosão da Estrela da Morte
    setTimeout(() => {                                                         // Delay para remover a explosão após o efeito
        explosao.remove();                                                     // Remove a explosão do cenário
    }, 5000);                                                                  // Remove a explosão após 5 segundos
}