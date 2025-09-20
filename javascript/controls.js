/*------------------------------- MONITORANDO TECLAS E CONTROLE -------------------------------*/
// Função para verifica se as teclas de controle do X-Wing estão sendo pressionadas
const teclasControlePressionadas = (tecla) => {
    if (tecla.key === "ArrowRight") {                     // Se a tecla pressionada for a seta para direita
        direcaoHorizontal = 1;                            // Move o X-Wing para direita
    } else if (tecla.key === "ArrowLeft") {               // Se a tecla pressionada for a seta para esquerda
        direcaoHorizontal = -1;                           // Move o X-Wing para esquerda
    } else if (tecla.key === "ArrowDown") {               // Se a tecla pressionada for a seta para baixo
        direcaoVertical = 1;                              // Move o X-Wing para baixo
    } else if (tecla.key === "ArrowUp") {                 // Se a tecla pressionada for a seta para cima
        direcaoVertical = -1;                             // Move o X-Wing para cima
    } else if (tecla.key === " ") {                       // Se a tecla pressionada for a barra de espaço
        estaAtirando = true;                              // ativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {  // Se a tecla apertada for "a" ou "A"
        giroHorario = true;                               // Gira o X-Wing no sentido horario 
    } else if (tecla.key === "d" || tecla.key === "D") {  // Se a tecla apertada for "d" ou "D"
        giroAntiHorario = true;                           // Gira o X-Wing no sentido antihorario
    }
}

// Função para verifica se as teclas de controle do X-Wing estão soltas
const teclasControleSoltas = (tecla) => {
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") {      // Se a tecla solta for a seta para direita ou esquerda
        direcaoHorizontal = 0;                                          // Interrompe o movimento horizontal do X-Wing
    } else if (tecla.key === "ArrowDown" || tecla.key === "ArrowUp") {  // Se a tecla solta for a seta para baixo ou cima
        direcaoVertical = 0;                                            // Interrompe o movimento vertical do X-Wing
    } else if (tecla.key === " ") {                                     // Se a tecla solta for a barra de espaço
        estaAtirando = false;                                           // Desativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {                // Se a tecla solta for "a" ou "A"
        giroHorario = false;                                            // Interrompe o giro no sentido horario do X-Wing
    } else if (tecla.key === "d" || tecla.key === "D") {                // Se a tecla solta for "d" ou "D"
        giroAntiHorario = false;                                        // Interrompe o giro no sentido antihorario do X-Wing
    }
}

// Função para verifica se as teclas de controle estão clicadas
const teclasControleClicadas = (tecla) => {
    if (tecla.key === "p" || tecla.key === "P") {         // Se a tecla apertada for "p" ou "P"
        if (painelDados.style.display === "none") {       // Se o painel de estatística do jogo estiver oculto
            painelDados.style.display = "flex";           // Mostra o painel de estatística do jogo
        } else {                                          // Se o painel de estatística do jogo estiver visivel
            painelDados.style.display = "none";           // Oculta o painel de estatística do jogo
        }
    } else if (tecla.key === "f" || tecla.key === "F") {  // Se a tecla apertada for o "Enter"
        okGameOver = false;                               // Desativa a execução do Game Over
        if (habilitarAtaqueEspecial) {                    // Se o ataque especial estiver habilitado
            habilitarAtaqueEspecial = false;              // Desabilita o ataque especial 
            btnEspecialAtaque.style.display = "none";     // Oculta o sinal do botão de Ataque especial
            xwingEspecialAtaque();                        // Chama a função de ataque especial do X-Wing
        }
    }
}