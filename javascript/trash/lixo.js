

// Função para criar os projeteis do X-Wing
const criarProjeteisXWing = (posicaoLeftTiro, posicaoTopTiro) => { // Recebe a posição atual do X-Wing para criar os tiros
    // Cria dois elementos de disparo, um de cada lado do X-Wing
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "projetil_x-wing";           // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = posicaoLeftTiro + 2 + "px"; // Define a posição horizontal do projetil referente a posição do X-Wing
    tiroEsquerdo.style.top = posicaoTopTiro + 50 + "px";  // Define a posição vertical do projetil referente a posição do X-Wing
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "projetil_x-wing";
    tiroDireito.style.left = posicaoLeftTiro + (larguraXWing - 8) + "px"; // 10 é a largura do tiro
    tiroDireito.style.top = posicaoTopTiro + 50 + "px";
    cenario.appendChild(tiroDireito);
}

// Função para mover os projeteis do X-Wing
function moverProjeteis() {
    const tiros = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetil;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil < -10) {                      // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}
