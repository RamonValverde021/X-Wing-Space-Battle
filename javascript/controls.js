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

// F na tela clicavel
const sinalAtaqueEspecial = document.getElementById("ataque_especial");
sinalAtaqueEspecial.addEventListener("click", () => {
    if (habilitarAtaqueEspecial) {                                   // Se o ataque especial estiver habilitado
        habilitarAtaqueEspecial = false;                             // Desabilita o ataque especial 
        okGameOver = false;                                          // Desativa a execução do Game Over
        btnEspecialAtaque.style.display = "none";                    // Oculta o sinal do botão de Ataque especial
        xwingEspecialAtaque();                                       // Chama a função de ataque especial do X-Wing
    }
});

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


// --- Lógica do Joystick Virtual --- 
// Seção dedicada à funcionalidade do joystick na tela.
function setupGamepadVirtual() {
    const stick = document.getElementById('joystick-stick');                                               // Obtém o elemento HTML que representa a alavanca (stick) do joystick.
    const base = stick.parentElement;                                                                      // Obtém o elemento pai do stick, que é a base do joystick.
    const container = base.parentElement;                                                                  // Obtém o elemento pai da base, que é a área total sensível ao toque do joystick.

    let isDragging = false;                                                                                // Define uma flag (booleano) para controlar se o usuário está arrastando o stick.
    let touchId = null;                                                                                    // Armazena o ID do toque que está controlando o joystick para ignorar outros toques.

    // Botões Virtuais 
    const gamepadLT = document.getElementById("gamepad-lt");                                               // Obtém o botão virtual LT (Giro Reverso). // Obtém o botão virtual LT (Giro Reverso).
    const gamepadLB = document.getElementById("gamepad-lb");                                               // Obtém o botão virtual LB (Girar Horário). // Obtém o botão virtual LB (Girar Horário).
    const gamepadRB = document.getElementById("gamepad-rb");                                               // Obtém o botão virtual RB (Girar Anti-horário).
    const gamepadX = document.getElementById("gamepad-x");                                                 // Obtém o botão virtual X (Boost).
    const gamepadA = document.getElementById("gamepad-a");                                                 // Obtém o botão virtual A (Atirar).
    const gamepadA2 = document.getElementById("gamepad-a-2");                                              // Obtém o botão virtual A-2 (Atirar).

    // Função auxiliar reutilizável para adicionar eventos de toque (pressionar e soltar).
    const addTouchListeners = (element, actionStart, actionEnd) => {                                                // A função recebe o elemento e as ações de início e fim.
        element.addEventListener("touchstart", (e) => { e.preventDefault(); actionStart(); }, { passive: false });  // Adiciona um listener para quando o dedo toca o botão, executando a ação inicial.
        element.addEventListener("touchend", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });      // Adiciona um listener para quando o dedo é removido do botão, executando a ação final.
        element.addEventListener("touchcancel", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });   // Adiciona um listener para o caso de o toque ser cancelado (ex: dedo desliza para fora), executando a ação final.
    };

    // Função para atualizar a posição do stick e a direção da nave
    function moveStick(event) {                                                                            // A função recebe o evento de movimento (mouse ou toque).
        if (!isDragging) return;                                                                           // Se o usuário não estiver arrastando, a função é interrompida.

        let touch;                                                                                         // Declara uma variável para armazenar o evento de toque correto.
        if (event.touches) {                                                                               // Verifica se o evento é de toque (contém a propriedade 'touches').
            // Itera sobre os toques para encontrar o que iniciou o arrasto.
            for (let i = 0; i < event.touches.length; i++) {                                               // Percorre a lista de toques ativos na tela.
                if (event.touches[i].identifier === touchId) {                                             // Compara o ID de cada toque com o ID armazenado que iniciou o arrasto.
                    touch = event.touches[i];                                                              // Se encontrar, atribui o toque correto à variável 'touch'.
                    break;                                                                                 // Interrompe o loop, pois o toque já foi encontrado.
                }
            }
            if (!touch) return;                                                                            // Se o toque original não for encontrado na lista, ignora o movimento.
        } else {                                                                                           // Se não for um evento de toque, assume-se que é um evento de mouse.
            touch = event;                                                                                 // Atribui o próprio evento (de mouse) à variável 'touch'.
        }
        const containerRect = container.getBoundingClientRect();                                           // Obtém as dimensões e a posição da área do joystick.

        let x = touch.clientX - (containerRect.left + containerRect.width / 2);                            // Calcula a posição X do toque em relação ao centro do joystick.
        let y = touch.clientY - (containerRect.top + containerRect.height / 2);                            // Calcula a posição Y do toque em relação ao centro do joystick.

        const maxDistance = base.offsetWidth / 2;                                                          // Define a distância máxima que o stick pode se mover a partir do centro (metade da largura da base).
        const distance = Math.sqrt(x * x + y * y);                                                         // Calcula a distância real do toque em relação ao centro usando o Teorema de Pitágoras.

        if (distance > maxDistance) {                                                                      // Se a distância for maior que o limite permitido.
            x = (x / distance) * maxDistance;                                                              // Limita a posição X para ficar na borda do círculo da base.
            y = (y / distance) * maxDistance;                                                              // Limita a posição Y para ficar na borda do círculo da base.
        }

        stick.style.transform = `translate(${x}px, ${y}px)`;                                               // Aplica a transformação CSS para mover visualmente o stick.

        // Atribui os valores normalizados do joystick às variáveis de direção da nave, converte a posição do stick em valores de direção para o jogo.
        // O eixo X do joystick (para direita é positivo) corresponde ao direcaoHorizontal = 1 (para direita é 1, e para esquerda é -1)
        // Normaliza o valor de X para um intervalo entre -1 (esquerda) e 1 (direita).
        if ((x / maxDistance) <= -0.98) {
            direcaoHorizontal = -1;
        } else if ((x / maxDistance) >= 0.98) {
            direcaoHorizontal = 1;
        } else {
            direcaoHorizontal = x / maxDistance;
        }
        // O eixo Y do joystick (para baixo é positivo) corresponde ao direcaoVertical = 1 (para baixo é 1, e para cima é -1)
        // Normaliza o valor de Y para um intervalo entre -1 (cima) e 1 (baixo).
        if ((y / maxDistance) <= -0.98) {
            direcaoVertical = -1;
        } else if ((y / maxDistance) >= 0.98) {
            direcaoVertical = 1;
        } else {
            direcaoVertical = y / maxDistance;
        }
        //console.log(`direcaoHorizontal: ${direcaoHorizontal}, direcaoVertical: ${direcaoVertical}`);
    }

    // Eventos de início do arrasto do joystick, configura os eventos que disparam o início do movimento do stick.
    container.addEventListener('mousedown', (e) => {                                                     // Adiciona um listener para o clique do mouse na área do joystick.
        isDragging = true;                                                                               // Ativa a flag de arrasto.
        moveStick(e);                                                                                    // Chama moveStick imediatamente para posicionar o stick onde o mouse clicou.
    });
    container.addEventListener('touchstart', (e) => {                                                    // Adiciona um listener para o toque na área do joystick.
        e.preventDefault();                                                                              // Previne o comportamento padrão do navegador (como zoom ou rolagem).
        isDragging = true;                                                                               // Ativa a flag de arrasto.
        touchId = e.changedTouches[0].identifier;                                                        // Armazena o ID único do dedo que tocou a tela.
        moveStick(e);                                                                                    // Chama moveStick imediatamente para posicionar o stick onde o dedo tocou.
    }, { passive: false });

    // Configura os eventos que disparam o fim do movimento do stick.
    const resetStick = () => {                                                                           // Define uma função reutilizável para resetar o estado do joystick.
        isDragging = false;                                                                              // Desativa a flag de arrasto.
        touchId = null;                                                                                  // Limpa o ID do toque armazenado.
        stick.style.transform = `translate(0, 0)`;                                                       // Reseta a posição visual do stick para o centro.
        direcaoHorizontal = 0;                                                                           // Zera o movimento horizontal da nave.
        direcaoVertical = 0;                                                                             // Zera o movimento vertical da nave.
    };

    window.addEventListener('mouseup', resetStick);                                                      // Adiciona um listener global para quando o botão do mouse é solto, resetando o stick.
    window.addEventListener('touchend', (e) => {                                                         // Adiciona um listener global para quando um dedo é levantado da tela.
        // Verifica se o dedo que foi levantado é o mesmo que estava controlando o joystick.
        for (let i = 0; i < e.changedTouches.length; i++) {                                              // Percorre a lista de toques que foram finalizados.
            if (e.changedTouches[i].identifier === touchId) {                                            // Se o ID de um dos toques finalizados for o mesmo que controlava o joystick.
                resetStick();                                                                            // Chama a função para resetar o joystick.
                break;                                                                                   // Interrompe o loop.
            }
        }
    });
    window.addEventListener('touchcancel', resetStick);                                                  // Adiciona um listener para o caso de o toque ser cancelado, também resetando o stick.

    // Configura os eventos que atualizam a posição do stick durante o arrasto.
    window.addEventListener('mousemove', moveStick);                                                     // Adiciona um listener global que chama moveStick sempre que o mouse se move.
    window.addEventListener('touchmove', moveStick, { passive: false });                                 // Adiciona um listener global que chama moveStick sempre que um dedo se move na tela.

    // Seção para configurar as ações dos botões virtuais.

    // Ações de clique único // Configura botões que executam uma ação uma única vez por toque.
    if (gamepadLT) gamepadLT.addEventListener("touchstart", (e) => { e.preventDefault(); giroReversoXWing(); });  // Se o botão LT existir, configura-o para chamar a função de giro reverso ao ser tocado.
    if (gamepadX) gamepadX.addEventListener("touchstart", (e) => {                                                // Se o botão X existir, configura sua ação de toque.
        e.preventDefault();                                                                                       // Previne o comportamento padrão do navegador (como zoom).
        if (soltarBoost) {                                                                                        // Verifica se o boost está disponível.
            boostXWing();                                                                                         // Ativa a função de boost.
            if (okFullPower) return;                                                                              // Se o Full-Power estiver ativo, não entra em cooldown.
            soltarBoost = false;                                                                                  // Desativa a possibilidade de usar o boost novamente.
            setTimeout(() => soltarBoost = true, recargaBoost);                                                   // Agenda a reativação do boost após o tempo de recarga.
        }
    });

    // Ações de manter pressionado (usando a função auxiliar addTouchListeners, configura botões que precisam ser mantidos pressionados.
    // Configura os botões de rotação.
    if (gamepadLB) {                                                                                              // Se o botão LB existir.
        addTouchListeners(gamepadLB, () => giroHorario = true, () => giroHorario = false);                        // Configura para girar no sentido horário enquanto pressionado.
    }
    if (gamepadRB) {                                                                                              // Se o botão RB existir.
        addTouchListeners(gamepadRB, () => giroAntiHorario = true, () => giroAntiHorario = false);                // Configura para girar no sentido anti-horário enquanto pressionado.
    }
    // Configura os botões de tiro.
    if (gamepadA) {                                                                                               // Se o botão A existir.
        addTouchListeners(gamepadA, () => estaAtirando = true, () => estaAtirando = false);                       // Configura para atirar enquanto pressionado.
    }
    if (gamepadA2) {                                                                                              // Se o botão A existir.
        addTouchListeners(gamepadA2, () => estaAtirando = true, () => estaAtirando = false);                      // Configura para atirar enquanto pressionado.
    }
}