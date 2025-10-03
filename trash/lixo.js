// Controle do Jogo com Gamepad do Smartphone
const gamepadLT = document.getElementById("gamepad-lt");
const gamepadLB = document.getElementById("gamepad-lb");
const gamepadUP = document.getElementById("gamepad-up");
const gamepadLEFT = document.getElementById("gamepad-left");
const gamepadRIGHT = document.getElementById("gamepad-right");
const gamepadDOWN = document.getElementById("gamepad-down");
const gamepadBACK = document.getElementById("gamepad-back");
const gamepadSTART = document.getElementById("gamepad-start");
const gamepadRT = document.getElementById("gamepad-rt");
const gamepadRB = document.getElementById("gamepad-rb");
const gamepadY = document.getElementById("gamepad-y");
const gamepadX = document.getElementById("gamepad-x");
const gamepadB = document.getElementById("gamepad-b");
const gamepadA = document.getElementById("gamepad-a");

function setupGamepadVirtual() {
    gamepadLT.addEventListener("click", giroReversoXWing);
    gamepadLB.addEventListener("keydown", () => { giroAntiHorario = true });
    gamepadUP.addEventListener("keydown", () => { direcaoHorizontal = -1 });
    gamepadLEFT.addEventListener("keydown", () => { direcaoVertical = -1 });
    gamepadRIGHT.addEventListener("keydown", () => { direcaoHorizontal = 1 });
    gamepadDOWN.addEventListener("keydown", () => { direcaoVertical = 1 });

    gamepadBACK.addEventListener("click", () => {
        painelDados.style.display = (painelDados.style.display === "none") ? "flex" : "none";  // Alterna a visibilidade do painel de estatísticas.
    });

    gamepadSTART.addEventListener("click", () => {
        if (jogoIniciado == false) {                                         // Se o jogo não começou ainda     
            jogoIniciado = true;                                             // Atualiza flag para bloquear o Enter
            btnIniciar.className = "botao-selecionado";                      // Adiciona a classe botaobotao-selecionado
            setTimeout(() => iniciarJogo(), 800);                            // Inicia o jogo
        }
        if (okGameOver == false) {                                           // Se o jogo terminou
            btnReiniciar.className = "botao-selecionado";                    // Adiciona a classe botaobotao-selecionado
            setTimeout(() => reiniciarJogo(), 800);                          // Reinica o jogo
        }
    });

    gamepadRT.addEventListener("keydown", () => { estaAtirando = true });
    gamepadRB.addEventListener("keydown", () => { giroHorario = true });

    gamepadY.addEventListener("click", () => {
        if (habilitarAtaqueEspecial) {                                       // Se o ataque especial estiver habilitado
            habilitarAtaqueEspecial = false;                                 // Desabilita o ataque especial 
            okGameOver = false;                                              // Desativa a execução do Game Over
            btnEspecialAtaque.style.display = "none";                        // Oculta o sinal do botão de Ataque especial
            xwingEspecialAtaque();                                           // Chama a função de ataque especial do X-Wing
        }
    });

    gamepadX.addEventListener("click", () => {
        if (soltarBoost == true) {                                           // Se o Boost estiver liberado
            boostXWing();                                                    // Chama a função de Boost do X-Wing
            if (okFullPower) return;                                         // Se o Full-Power não estiver ativado
            soltarBoost = false;                                             // Atualiza a flag para desativar o Boost
            setTimeout(() => soltarBoost = true, recargaBoost);              // Reativa o boost após 5s
        }
    });

    gamepadA.addEventListener("keydown", () => { estaAtirando = true });
    //gamepadB.addEventListener("keydown", () => { });

    gamepadLB.addEventListener("keyup", () => { giroAntiHorario = false });
    gamepadUP.addEventListener("keyup", () => { direcaoHorizontal = 0 });
    gamepadLEFT.addEventListener("keyup", () => { direcaoVertical = 0 });
    gamepadRIGHT.addEventListener("keyup", () => { direcaoHorizontal = 0 });
    gamepadDOWN.addEventListener("keyup", () => { direcaoVertical = 0 });
    gamepadRT.addEventListener("keyup", () => { estaAtirando = false });
    gamepadRB.addEventListener("keyup", () => { giroHorario = false });
}








// Define uma função assíncrona para poder usar 'await' para esperar por ações.
async function lockOrientation() {
    try {                                                                                          // Inicia um bloco 'try' para capturar erros que possam ocorrer ao tentar entrar em tela cheia ou bloquear a orientação.
        // Primeiro, tentamos entrar em tela cheia. É um requisito para o bloqueio de orientação na maioria dos navegadores.
        if (document.documentElement.requestFullscreen) {                                          // Verifica se o método padrão 'requestFullscreen' existe.
            await document.documentElement.requestFullscreen();                                    // Solicita o modo de tela cheia e espera a operação ser concluída.
        } else if (document.documentElement.mozRequestFullScreen) {                                // Firefox  // Se não, verifica a versão para Firefox.
            await document.documentElement.mozRequestFullScreen();                                 // Solicita tela cheia no Firefox e espera.
        } else if (document.documentElement.webkitRequestFullscreen) {                             // Chrome, Safari & Opera  // Se não, verifica a versão para Chrome, Safari e Opera.
            await document.documentElement.webkitRequestFullscreen();                              // Solicita tela cheia nesses navegadores e espera.
        } else if (document.documentElement.msRequestFullscreen) {                                 // IE/Edge  // Se não, verifica a versão para IE/Edge.
            await document.documentElement.msRequestFullscreen();                                  // Solicita tela cheia no IE/Edge e espera.
        }
        // Depois de entrar em tela cheia com sucesso, bloqueamos a orientação.
        await screen.orientation.lock('landscape');                                                // Tenta travar a orientação da tela no modo paisagem ('landscape') e espera.
    } catch (error) {                                                                              // Se qualquer uma das solicitações ('await') falhar, o código dentro do 'catch' é executado.
        console.error("Não foi possível bloquear a orientação da tela:", error);                   // Exibe uma mensagem de erro no console do navegador.
    }
}

if (window.screen && screen.orientation && screen.orientation.lock) lockOrientation();         // Tenta bloquear a orientação para paisagem
