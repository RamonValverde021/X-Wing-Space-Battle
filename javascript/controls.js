/*------------------------------- MONITORANDO TECLAS E CONTROLE -------------------------------*/
// Função para verifica se as teclas de controle do X-Wing estão sendo pressionadas
const teclasControlePressionadas = (tecla) => {
    if (tecla.key === "ArrowRight") {       // se a tecla pressionada for a seta para direita
        direcaoHorizontal = 1;              // move para direita
    } else if (tecla.key === "ArrowLeft") { // se a tecla pressionada for a seta para esquerda
        direcaoHorizontal = -1;             // move para esquerda
    } else if (tecla.key === "ArrowDown") { // se a tecla pressionada for a seta para baixo
        direcaoVertical = 1;                // move para baixo
    } else if (tecla.key === "ArrowUp") {   // se a tecla pressionada for a seta para cima
        direcaoVertical = -1;               // move para cima
    } else if (tecla.key === " ") {         // se a tecla pressionada for a barra de espaço
        estaAtirando = true;                // ativa a flag de atirar
    } else if (tecla.key === "A" || tecla.key === "a") { 
        giroHorario = true;
    } else if (tecla.key === "D" || tecla.key === "d") {
        giroAntiHorario = true;
    }
}

// Função para verifica se as teclas de controle do X-Wing estão soltas
const teclasControleSoltas = (tecla) => {
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") {      // se a tecla solta for a seta para direita ou esquerda
        direcaoHorizontal = 0;                                          // para o movimento horizontal
    } else if (tecla.key === "ArrowDown" || tecla.key === "ArrowUp") {  // se a tecla solta for a seta para baixo ou cima
        direcaoVertical = 0;                                            // para o movimento vertical
    } else if (tecla.key === " ") {                                     // se a tecla solta for a barra de espaço
        estaAtirando = false;                                           // desativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {
        giroHorario = false;
    } else if (tecla.key === "d" || tecla.key === "D") {
        giroAntiHorario = false;
    }
}

const teclasControleClicadas = (tecla) => {
    console.log(tecla.key);
    if (tecla.key === "p" || tecla.key === "P") {      // Se a tecla apertada for "p" ou "P"
        if (painelDados.style.display === "none") {
            painelDados.style.display = "flex";
        } else {
            painelDados.style.display = "none";
        }
    } else if (tecla.key === "f" || tecla.key === "F") {  // Se a tecla apertada for o "Enter"
        okGameOver = false;                               // Desativa a execução do Game Over
        if (habilitarAtaqueEspecial) {
            habilitarAtaqueEspecial = false;
            btnEspecialAtaque.style.display = "none"; 
            xwingEspecialAtaque();
        }
    }
}