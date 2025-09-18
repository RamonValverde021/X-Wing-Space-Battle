/*------------------------------- VITORIA -------------------------------*/
function xwingEspecialAtaque() {
    // Desativa controles e intervalos
    document.removeEventListener("keydown", teclasControlePressionadas);
    document.removeEventListener("keyup", teclasControleSoltas);
    document.removeEventListener("keypress", teclasControleClicadas);
    clearInterval(iniciaProjeteisXWing);      // Interrompe a criação de projeteis do X-Wing
    clearInterval(iniciaMovimentacaoXWing);   // Interrompe a movimentação do X-Wing
    clearInterval(iniciaNavesInimigas);       // Interrompe a criação dos Tie-Fighters
    clearInterval(iniciaProjeteisTieFighter); // Interrompe a criação de projeteis dos Tie-Fighters
    clearInterval(iniciaColisaoXWing);        // Interrompe as colisões com o X-Wing

    // Define rotação para apontar para cima
    rotacaoXWing = 0; // Ajuste para -90deg se necessário
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;

    // Posições inicial e alvo
    let posX = parseFloat(xwing.style.left);
    let posY = parseFloat(xwing.style.top);
    const targetX = larguraCenario / 2 - larguraXWing / 2;
    const targetY = alturaCenario - alturaXWing;
    const speed = 5;

    // Animação para mover o X-Wing
    const intervaloMovimento = setInterval(() => {
        const dx = targetX - posX;
        const dy = targetY - posY;
        posX += dx * 0.1;
        posY += dy * 0.1;
        xwing.style.left = posX + "px";
        xwing.style.top = posY + "px";
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            clearInterval(intervaloMovimento);
            xwing.style.left = targetX + "px";
            xwing.style.top = targetY + "px";
            // Disparar projetil especial
            projetilEspecial();
        }
    }, 30);
}

function projetilEspecial() {
    const posicaoLeftTiro = parseFloat(xwing.style.left); // Pega a posição horizontal atual do Tie Fighter
    const posicaoTopTiro = parseFloat(xwing.style.top);   // Pega a posição vertical atual do Tie Fighter
    const centerX = posicaoLeftTiro + larguraXWing / 2;   // Centro X do Tie Fighter
    const centerY = posicaoTopTiro + alturaXWing / 2;     // Centro Y do Tie Fighter
    // Cria dois elementos de disparo, um de cada lado do Tie Fighter
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "torpedo_x-wing";            // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX + 35 + "px";        // Define a posição horizontal do projetil referente a posição central horizontal do Tie Fighter
    tiroEsquerdo.style.top = centerY - 150 + "px";        // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "torpedo_x-wing";
    tiroDireito.style.left = centerX - 55 + "px";
    tiroDireito.style.top = centerY - 150 + "px";
    cenario.appendChild(tiroDireito);
    somCanhoesXWingProtons();
}

function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");
    const estrelaDaMorte = document.getElementById("estrela-da-morte");
    for (let i = 0; i < tiros.length; i++) {                                   // Percorre todos os projéteis
        if (tiros[i]) {                                                        // Verifica se o projétil existe
            let posicaoTopProjetil = tiros[i].offsetTop;                       // Pega a posição vertical atual do projétil
            posicaoTopProjetil -= velocidadeProjetilXWing;                     // Atualiza a posição vertical do projétil (move para cima)
            tiros[i].style.top = posicaoTopProjetil + "px";                    // Atualiza a posição no cenário
            if (estrelaDaMorte) {                                              // Verificação se chegou na metade da Estrela da Morte
                const deathStarRect = estrelaDaMorte.getBoundingClientRect();  // Pega as coordenadas da Estrela da Morte
                const deathStarTop = deathStarRect.top;                        // Topo absoluto da Estrela da Morte
                const deathStarHeight = deathStarRect.height;                  // Altura da Estrela da Morte
                const deathStarMiddle = deathStarTop + (deathStarHeight / 2);  // Metade da Estrela da Morte (posição central vertical)
                if (posicaoTopProjetil <= deathStarMiddle) {                   // Se o topo do projétil chegou ou passou da metade da Estrela da Morte
                    tiros[i].remove();                                         // Remove o projétil (para de subir e some)
                    const intervaloMovimento = setInterval(() => {             // Delay para ativar a sequência de vitória (como no original)
                        clearInterval(intervaloMovimento);
                        xwingSaindo();                                         // Chama a função de saída/vitória
                    }, 1000);                                                  // Ajuste o delay se quiser (ex.: 500ms para mais rápido)
                    return;                                                    // Sai do loop para esse projétil (já foi processado)
                }
            }
        }
    }
}

function xwingSaindo() {
    document.removeEventListener("keydown", teclasControlePressionadas);
    document.removeEventListener("keyup", teclasControleSoltas);
    document.removeEventListener("keypress", teclasControleClicadas);
    clearInterval(iniciaProjeteisXWing);
    clearInterval(iniciaMovimentacaoXWing);
    clearInterval(iniciaNavesInimigas);
    clearInterval(iniciaProjeteisTieFighter);

    // Define rotação para apontar para cima
    rotacaoXWing = 0; // Ajuste para -90deg se necessário
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;

    // Pega posição inicial
    let posY = parseFloat(xwing.style.top);
    const speed = 50; // 10 pixels por frame
    const intervalo = setInterval(() => {
        posY -= speed;
        xwing.style.top = posY + "px";
        // Verifica se o X-Wing saiu do cenário
        if (posY <= -alturaXWing) {
            clearInterval(intervalo);
            const tempoExplosao = setInterval(() => {
                clearInterval(tempoExplosao);
                explosaoEstrelaDaMorte();
                const tempoPosExplosao = setInterval(() => {
                    clearInterval(tempoPosExplosao);
                    const vitoria = document.createElement("h1");
                    vitoria.className = "gamewin";
                    vitoria.innerHTML = "Contra todas as probabilidades, voce triunfou!<br>Gracas a voce o terror tecnologico do Imperio caiu em ruinas,<br>trazendo uma nova era de esperanca para a Galaxia";
                    // força o fade-in
                    setTimeout(() => {
                        vitoria.style.opacity = 1;
                    }, 100); // 50ms já é suficiente
                    cenario.appendChild(vitoria);
                    somVitoria(); // Adicione se tiver um áudio
                }, 5000);
            }, 3000);
        }
    }, 20);
}

function explosaoEstrelaDaMorte() {
    clearInterval(iniciaProjeteisDeathStar);
    clearInterval(iniciaMovimentacaoProjeteisDeathStar);
    clearInterval(iniciaColisaoEstrelaDaMorte);

    const disparosDeathStar = document.querySelectorAll(".projetil_death-star");
    disparosDeathStar.forEach((disparos) => {
        disparos.remove();
    });
    pontosScore += 10000;
    const deathstarElement = document.getElementById("estrela-da-morte");
    const deathstarRect = deathstarElement.getBoundingClientRect();
    audioTrilhaSonoraEstrelaDaMorte.pause();      // Interrompe a trilha sonora da Estrela da Morte
    estrelaDestruida = true; // Marca que a Estrela-da-Morte foi destruída
    const explosao = document.createElement("div");
    explosao.className = "explosao";
    explosao.style.left = deathstarRect.left + "px";
    explosao.style.top = deathstarRect.top + "px";
    explosao.style.width = "100vw";
    explosao.style.height = "100vw";
    deathstarElement.remove();
    cenario.appendChild(explosao);
    somExplosaoEstrelaDaMorte();
    const intervaloExplosao = setTimeout(() => {
        explosao.remove();
        audioVoandoXWing.pause();
        clearInterval(intervaloExplosao);
        // Criar efeito de saida
    }, 5000);
    // Opcional: Finalizar jogo ou reiniciar
}
