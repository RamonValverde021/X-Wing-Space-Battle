/*------------------------------- MONITORANDO TECLAS E CONTROLE -------------------------------*/
// Função para verifica se as teclas de controle do X-Wing estão sendo pressionadas
const teclasControlePressionadas = (tecla) => {
    if (tecla.key === "ArrowRight") {                                    // Se a tecla pressionada for a seta para direita
        direcaoHorizontal = 1;                                           // Move o X-Wing para direita
    } else if (tecla.key === "ArrowLeft") {                              // Se a tecla pressionada for a seta para esquerda
        direcaoHorizontal = -1;                                          // Move o X-Wing para esquerda
    } else if (tecla.key === "ArrowDown") {                              // Se a tecla pressionada for a seta para baixo
        direcaoVertical = 1;                                             // Move o X-Wing para baixo
    } else if (tecla.key === "ArrowUp") {                                // Se a tecla pressionada for a seta para cima
        direcaoVertical = -1;                                            // Move o X-Wing para cima
    } else if (tecla.key === " ") {                                      // Se a tecla pressionada for a barra de espaço
        estaAtirando = true;                                             // ativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {                 // Se a tecla apertada for "a" ou "A"
        giroHorario = true;                                              // Gira o X-Wing no sentido horario 
    } else if (tecla.key === "d" || tecla.key === "D") {                 // Se a tecla apertada for "d" ou "D"
        giroAntiHorario = true;                                          // Gira o X-Wing no sentido antihorario
    }
}

// Função para verifica se as teclas de controle do X-Wing estão soltas
const teclasControleSoltas = (tecla) => {
    if (tecla.key === "ArrowRight" || tecla.key === "ArrowLeft") {       // Se a tecla solta for a seta para direita ou esquerda
        direcaoHorizontal = 0;                                           // Interrompe o movimento horizontal do X-Wing
    } else if (tecla.key === "ArrowDown" || tecla.key === "ArrowUp") {   // Se a tecla solta for a seta para baixo ou cima
        direcaoVertical = 0;                                             // Interrompe o movimento vertical do X-Wing
    } else if (tecla.key === " ") {                                      // Se a tecla solta for a barra de espaço
        estaAtirando = false;                                            // Desativa a flag de atirar
    } else if (tecla.key === "a" || tecla.key === "A") {                 // Se a tecla solta for "a" ou "A"
        giroHorario = false;                                             // Interrompe o giro no sentido horario do X-Wing
    } else if (tecla.key === "d" || tecla.key === "D") {                 // Se a tecla solta for "d" ou "D"
        giroAntiHorario = false;                                         // Interrompe o giro no sentido antihorario do X-Wing
    }
}

// Função para verifica se as teclas de controle estão clicadas
const teclasControleClicadas = (tecla) => {
    //console.log(tecla.key);                                            // Exibe no console a tecla pressionada
    if (tecla.key === "w" || tecla.key === "W") {                        // Se a tecla apertada for "w" ou "W"
        if (soltarBoost == true) {                                       // Se o Boost estiver liberado
            boostXWing();                                                // Chama a função de Boost do X-Wing
            if (okFullPower) return;                                     // Se o Full-Power não estiver ativado
            soltarBoost = false;                                         // Atualiza a flag para desativar o Boost
            setTimeout(() => soltarBoost = true, recargaBoost);          // Reativa o boost após 5s
        }
    } else if (tecla.key === "s" || tecla.key === "S") {                 // Se a tecla apertada for "s" ou "S"
        giroReversoXWing();                                              // Chama a função de giro reverso do X-Wing
    } else if (tecla.key === "p" || tecla.key === "P") {                 // Se a tecla apertada for "p" ou "P"
        if (painelDados.style.display === "none") {                      // Se o painel de estatística do jogo estiver oculto
            painelDados.style.display = "flex";                          // Mostra o painel de estatística do jogo
        } else {                                                         // Se o painel de estatística do jogo estiver visivel
            painelDados.style.display = "none";                          // Oculta o painel de estatística do jogo
        }
    } else if (tecla.key === "f" || tecla.key === "F") {                 // Se a tecla apertada for o "Enter"
        if (habilitarAtaqueEspecial) {                                   // Se o ataque especial estiver habilitado
            habilitarAtaqueEspecial = false;                             // Desabilita o ataque especial 
            okGameOver = false;                                          // Desativa a execução do Game Over
            btnEspecialAtaque.style.display = "none";                    // Oculta o sinal do botão de Ataque especial
            xwingEspecialAtaque();                                       // Chama a função de ataque especial do X-Wing
        }
    }
}

// Função que controla o jogo com um controle de X-Box
window.addEventListener("gamepadconnected", (e) => {
    console.log("Controle conectado:", e.gamepad);                       // Exibe no console que o controle foi conectado com sucesso.

    // Guarda o estado dos botões do frame anterior para detectar cliques (ações de um toque)
    let prevButtons = [];                                                // Array para armazenar o estado dos botões do quadro anterior.

    // loop para ler as entradas do controle a cada frame
    function update() {                                                  // Inicia o loop de atualização que lê as entradas do controle a cada quadro.
        const gp = navigator.getGamepads()[e.gamepad.index];             // Pega o estado atual do gamepad conectado.
        if (!gp) {                                                       // Verifica se o gamepad foi desconectado.
            // Se o controle for desconectado, para a nave
            direcaoHorizontal = 0;                                       // Para o movimento horizontal da nave.
            direcaoVertical = 0;                                         // Para o movimento vertical da nave.
            estaAtirando = false;                                        // Para o tiro da nave.
            giroHorario = false;                                         // Para a rotação horária.
            giroAntiHorario = false;                                     // Para a rotação anti-horária.
            requestAnimationFrame(update);                               // Continua o loop de atualização no próximo quadro.
            return;                                                      // Sai da função neste quadro, pois não há controle para ler.
        }

        // --- LÓGICA PARA AÇÕES CONTÍNUAS (MANTER PRESSIONADO) ---
        // 1. Movimentação (Analógico esquerdo tem prioridade sobre o D-Pad)
        const deadzone = 0.2;                                            // Define uma "zona morta" para ignorar movimentos leves do analógico.
        const EixoX = gp.axes[0];                                        // Pega o valor do eixo horizontal (X) do analógico esquerdo.
        const EixoY = gp.axes[1];                                        // Pega o valor do eixo vertical (Y) do analógico esquerdo.

        // Movimento Horizontal: O valor do analógico (-1 a 1) permite velocidade variável.
        if (Math.abs(EixoX) > deadzone) {                                // Verifica se o movimento no eixo X é maior que a zona morta.
            direcaoHorizontal = EixoX;                                   // Define a direção horizontal com base no valor do analógico.
        } else if (gp.buttons[15].pressed) {                             // Se o analógico não estiver sendo usado, verifica o D-Pad para a direita.
            direcaoHorizontal = 1;                                       // Define a direção horizontal para a direita.
        } else if (gp.buttons[14].pressed) {                             // Verifica o D-Pad para a esquerda.
            direcaoHorizontal = -1;                                      // Define a direção horizontal para a esquerda.
        } else {                                                         // Se nenhum botão de movimento horizontal estiver pressionado.
            direcaoHorizontal = 0;                                       // Para o movimento horizontal (simula o 'keyup').
        }

        // Movimento Vertical
        if (Math.abs(EixoY) > deadzone) {                                // Verifica se o movimento no eixo Y é maior que a zona morta.
            direcaoVertical = EixoY;                                     // Define a direção vertical com base no valor do analógico.
        } else if (gp.buttons[13].pressed) {                             // Se o analógico não estiver sendo usado, verifica o D-Pad para baixo.
            direcaoVertical = 1;                                         // Define a direção vertical para baixo.
        } else if (gp.buttons[12].pressed) {                             // Verifica o D-Pad para cima.
            direcaoVertical = -1;                                        // Define a direção vertical para cima.
        } else {                                                         // Se nenhum botão de movimento vertical estiver pressionado.
            direcaoVertical = 0;                                         // Para o movimento vertical (simula o 'keyup').
        }

        // 2. Ações de manter pressionado (atirar, girar)
        estaAtirando = gp.buttons[0].pressed || gp.buttons[7].pressed;   // Define se está atirando se o botão A ou o gatilho direito (RT) estiverem pressionados.
        giroHorario = gp.buttons[4].pressed;                             // Define a rotação horária se o botão esquerdo (LB) estiver pressionado.
        giroAntiHorario = gp.buttons[5].pressed;                         // Define a rotação anti-horária se o botão direito (RB) estiver pressionado.

        // --- LÓGICA PARA AÇÕES DE CLIQUE (UM TOQUE, como 'keypress') ---
        gp.buttons.forEach((button, index) => {                                                            // Itera sobre todos os botões para verificar cliques únicos.
            const foiClicado = button.pressed && (!prevButtons[index] || !prevButtons[index].pressed);     // Verifica se o botão foi pressionado neste quadro, mas não no anterior.
            if (foiClicado) {                                                                              // Se o botão foi "clicado" (pressionado uma vez).
                //console.log(index);                                                                      // Exibe no console o botão pressionado
                // Boost X-Wing
                if (index === 2 && soltarBoost == true) {                                                  // Se o botão X (índice 2) foi clicado.
                    boostXWing();                                                                          // Chama a função de Boost do X-Wing
                    if (okFullPower) return;                                                               // Se o Full-Power não estiver ativado
                    soltarBoost = false;                                                                   // Atualiza a flag para desativar o Boost
                    setTimeout(() => soltarBoost = true, recargaBoost);                                            // Reativa o boost após 5s
                }
                // Ataque especial (Botão Y) - corresponde à tecla 'F'
                if (index === 3 && habilitarAtaqueEspecial) {                                              // Se o botão Y (índice 3) foi clicado e o ataque especial está habilitado.
                    habilitarAtaqueEspecial = false;                                                       // Desabilita o ataque especial 
                    okGameOver = false;                                                                    // Desativa a execução do Game Over
                    btnEspecialAtaque.style.display = "none";                                              // Oculta o sinal do botão de Ataque especial
                    xwingEspecialAtaque();                                                                 // Chama a função de ataque especial do X-Wing
                }
                // Painel de estatísticas (Botão View/Select) - corresponde à tecla 'P'
                if (index === 8) {                                                                         // Se o botão View/Select (índice 8) foi clicado.
                    painelDados.style.display = (painelDados.style.display === "none") ? "flex" : "none";  // Alterna a visibilidade do painel de estatísticas.
                }
                // Iniciar Jogo (Botão Start) - corresponde à tecla 'ENTER'
                if (index === 9) {                                                                         // Se o botão Star (índice 9) foi clicado.
                    if (jogoIniciado == false) {                                                           // Se o jogo não começou ainda     
                        jogoIniciado = true;                                                               // Atualiza flag para bloquear o Enter
                        btnIniciar.className = "botao-selecionado";                                        // Adiciona a classe botaobotao-selecionado
                        setTimeout(() => iniciarJogo(), 800);                                              // Inicia o jogo
                    }
                    if (okGameOver == false) {                                                             // Se o jogo terminou
                        btnReiniciar.className = "botao-selecionado";                                      // Adiciona a classe botaobotao-selecionado
                        setTimeout(() => reiniciarJogo(), 800);                                            // Reinica o jogo
                    }
                }
                // Giro reverso X-Wing
                if (index === 6) {                                                                         // Se o botão Star (índice 9) foi clicado.
                    giroReversoXWing();                                                                    // Chama a função de giro reverso do X-Wing
                }
            }
        });
        // Salva o estado atual dos botões para comparar no próximo frame
        prevButtons = gp.buttons.map(b => ({ pressed: b.pressed, value: b.value }));                       // Salva o estado atual de todos os botões para a próxima verificação.
        requestAnimationFrame(update);                                                                     // Agenda a próxima execução da função 'update' para o próximo quadro de animação.
    }
    update();                                                                                              // Inicia a primeira chamada da função 'update' para começar o loop.
});

window.addEventListener("gamepaddisconnected", (e) => {                                                    // Adiciona um ouvinte de evento para quando um controle é desconectado.
    console.log("Controle desconectado:", e.gamepad);                                                      // Exibe no console que o controle foi desconectado.
});

/*
Dica: Mapeamento do Controle Xbox
Eixos (Axes):
0: Analógico Esquerdo (Horizontal: -1 para esquerda, 1 para direita)
1: Analógico Esquerdo (Vertical: -1 para cima, 1 para baixo)
2: Analógico Direito (Horizontal)
3: Analógico Direito (Vertical)
Botões (Buttons):
0: A
1: B
2: X
3: Y
4: LB (Left Bumper)
5: RB (Right Bumper)
6: LT (Left Trigger)
7: RT (Right Trigger)
8: View (Select)
9: Menu (Start)
12: D-Pad Cima
13: D-Pad Baixo
14: D-Pad Esquerda
15: D-Pad Direita
direcaoHorizontal = gp.axes[0]; para mover a nave!
*/

// Controle do Jogo com Gamepad do Smartphone
const gamepadUP = document.getElementById("gamepad-up");
const gamepadUP_LEFT = document.getElementById("gamepad-up-left");
const gamepadUP_RIGHT = document.getElementById("gamepad-up-right");
const gamepadLEFT = document.getElementById("gamepad-left");
const gamepadRIGHT = document.getElementById("gamepad-right");
const gamepadDOWN = document.getElementById("gamepad-down");
const gamepadDOWN_LEFT = document.getElementById("gamepad-down-left");
const gamepadDOWN_RIGHT = document.getElementById("gamepad-down-right");
const gamepadLT = document.getElementById("gamepad-lt");
const gamepadLB = document.getElementById("gamepad-lb");
const gamepadRB = document.getElementById("gamepad-rb");
const gamepadX = document.getElementById("gamepad-x");
const gamepadA = document.getElementById("gamepad-a");

function setupGamepadVirtual() {
    // Função auxiliar para adicionar eventos de toque
    const addTouchListeners = (element, actionStart, actionEnd) => {                                                // Define uma função reutilizável para adicionar listeners de toque (pressionar e soltar).
        element.addEventListener("touchstart", (e) => { e.preventDefault(); actionStart(); }, { passive: false });  // Adiciona um listener para quando o dedo toca o botão, executando a ação inicial.
        element.addEventListener("touchend", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });      // Adiciona um listener para quando o dedo é removido do botão, executando a ação final.
        element.addEventListener("touchcancel", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });   // Adiciona um listener para o caso de o toque ser cancelado (ex: dedo desliza para fora), executando a ação final.
    };

    // --- Ações de clique único (touchstart é suficiente) ---
    gamepadLT.addEventListener("touchstart", (e) => { e.preventDefault(); giroReversoXWing(); });                   // Configura o botão LT para executar a manobra de giro reverso com um toque.
    gamepadX.addEventListener("touchstart", (e) => {                                                                // Configura o botão X para a função de boost.
        e.preventDefault();                                                                                         // Previne o comportamento padrão do navegador ao tocar na tela.
        if (soltarBoost) {                                                                                          // Verifica se o boost está disponível para uso.
            boostXWing();                                                                                           // Chama a função que executa a mecânica de boost.
            if (okFullPower) return;                                                                                // Se o modo "Full Power" estiver ativo, não inicia a recarga.
            soltarBoost = false;                                                                                    // Desativa a possibilidade de usar o boost imediatamente.
            setTimeout(() => soltarBoost = true, recargaBoost);                                                     // Agenda a reativação do boost após o tempo de recarga.
        }
    });

    // --- Ações de manter pressionado ---
    // Movimento
    addTouchListeners(gamepadUP, () => direcaoVertical = -1, () => direcaoVertical = 0);                           // Configura o botão para cima para mover a nave para cima enquanto pressionado.
    addTouchListeners(gamepadDOWN, () => direcaoVertical = 1, () => direcaoVertical = 0);                          // Configura o botão para baixo para mover a nave para baixo enquanto pressionado.
    addTouchListeners(gamepadLEFT, () => direcaoHorizontal = -1, () => direcaoHorizontal = 0);                     // Configura o botão para esquerda para mover a nave para a esquerda enquanto pressionado.
    addTouchListeners(gamepadRIGHT, () => direcaoHorizontal = 1, () => direcaoHorizontal = 0);                     // Configura o botão para direita para mover a nave para a direita enquanto pressionado.

    addTouchListeners(gamepadUP_LEFT, () => {
        direcaoVertical = -1;
        direcaoHorizontal = -1;
    }, () => {
        direcaoVertical = 0;
        direcaoHorizontal = 0;
    });

      addTouchListeners(gamepadUP_RIGHT, () => {
        direcaoVertical = -1;
        direcaoHorizontal = 1;
    }, () => {
        direcaoVertical = 0;
        direcaoHorizontal = 0;
    });

    addTouchListeners(gamepadDOWN_LEFT, () => {
        direcaoVertical = 1;
        direcaoHorizontal = -1;
    }, () => {
        direcaoVertical = 0;
        direcaoHorizontal = 0;
    });

    addTouchListeners(gamepadDOWN_RIGHT, () => {
        direcaoVertical = 1;
        direcaoHorizontal = 1;
    }, () => {
        direcaoVertical = 0;
        direcaoHorizontal = 0;
    });

    // Rotação
    addTouchListeners(gamepadLB, () => giroHorario = true, () => giroHorario = false);                             // Configura o botão LB para girar a nave no sentido horário enquanto pressionado.
    addTouchListeners(gamepadRB, () => giroAntiHorario = true, () => giroAntiHorario = false);                     // Configura o botão RB para girar a nave no sentido anti-horário enquanto pressionado.

    // Tiro
    addTouchListeners(gamepadA, () => estaAtirando = true, () => estaAtirando = false);                            // Configura o botão A para atirar continuamente enquanto pressionado.

    // Exibe o gamepad na tela
    //document.getElementById("gamepad-overlay").style.display = "flex";                                           // Torna o overlay do gamepad visível na tela.
}