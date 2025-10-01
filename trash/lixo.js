function surgimentoEstrelaDaMorte() {
    const estrela = document.getElementById("estacao_surge");
    if (!estrela) {
        const deathstar = document.createElement("div");
        deathstar.id = "estacao_surge";
        deathstar.className = "deathstar-rise";
        cenario.appendChild(deathstar);
        // Posição inicial 
        let tamanhoEstrela = 0;
        let subidaEstrela = 0;
        const iniciaMovimentacaoEstrelaDaMorte = setInterval(() => {       // Cria um intervalo para mover a Estrela da Morte
            tamanhoEstrela += 1;                                           // 0.1 Decrementa a velocidade (quanto maior o valor, mais rápido desce)
            deathstar.style.height = tamanhoEstrela + "px";                // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
            deathstar.style.width = tamanhoEstrela + "px";                 // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
            if (tamanhoEstrela >= (larguraCenario / 3)) {
                if (okTamanho) {
                    const estrela = deathstar.getBoundingClientRect();     // Pega as coordenadas do X-Wing    
                    let coordenada = parseInt(estrela.bottom);
                    subidaEstrela = coordenada - deathstar.offsetHeight;
                    okTamanho = false;
                }
                subidaEstrela++;
                deathstar.style.bottom = subidaEstrela + "px";
            }
            if (tamanhoEstrela >= larguraCenario) {                        // Se a metade da Estrela da Morte avançar o fundo da tela
                deathstar.style.height = larguraCenario + "px";            // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
                deathstar.style.width = larguraCenario + "px";             // Fixa a Estrela Da Morte onde ela parou
                if (subidaEstrela >= alturaCenario) {
                    console.log("fim subida: " + subidaEstrela);
                    clearInterval(iniciaMovimentacaoEstrelaDaMorte);       // para quando sair da tela
                    clearInterval(iniciaSurgimentoEstrelaDaMorte);
                    deathstar.remove();
                }
            }
        }, 100);
    }
}


function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");                // Seleciona todos os projeteis do X-Wing
    const estrelaDaMorte = document.getElementById("estrela-da-morte");        // Seleciona a Estrela da Morte
    for (let i = 0; i < tiros.length; i++) {                                   // Percorre todos os projéteis
        if (tiros[i]) {                                                        // Verifica se o projétil existe
            let posicaoTopProjetil = tiros[i].offsetTop;                       // Pega a posição vertical atual do projétil
            posicaoTopProjetil -= velocidadeProjetilXWing;                     // Atualiza a posição vertical do projétil (move para cima)
            tiros[i].style.top = posicaoTopProjetil + "px";                    // Atualiza a posição no cenário
            if (estrelaDaMorte) {                                              // Verifica se a Estrela da Morte ainda existe
                const deathStarRect = estrelaDaMorte.getBoundingClientRect();  // Pega as coordenadas da Estrela da Morte
                const deathStarTop = deathStarRect.top;                        // Topo absoluto da Estrela da Morte
                const deathStarHeight = deathStarRect.height;                  // Altura da Estrela da Morte
                const deathStarMiddle = deathStarTop + (deathStarHeight / 2);  // Calcula a metade da altura da Estrela da Morte
                if (posicaoTopProjetil <= deathStarMiddle) {                   // Verifica se o projétil atingiu a metade da Estrela da Morte
                    tiros[i].remove();                                         // Remove o projétil (para de subir e some)
                    const intervaloMovimento = setInterval(() => {             // Delay para ativar a sequência de vitória (como no original)
                        clearInterval(intervaloMovimento);                     // Limpa o intervalo para evitar múltiplas chamadas
                        xwingSaindo();                                         // Chama a função que faz o X-Wing sair voando
                    }, 1000);                                                  // 1 segundo de delay
                    return;                                                    // Sai do loop para esse projétil (já foi processado)
                }
            }
        }
    }
}




function colisaoEstrelaDaMorte() {
    const deathstarElement = document.getElementById("estrela-da-morte");  // Pega o objeto criado da Estrela da Morte
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");   // Pega todos os disparos do X-Wing
    if (deathstarElement) {                                                // Se objeto Estrela da Morte existir 
        const deathstarRect = deathstarElement.getBoundingClientRect();    // Pega as coordenadas da Estrela da Morte
        todosDisparos.forEach((disparo) => {                               // Para cada disparo do X-Wing
            const colisaoDisparo = disparo.getBoundingClientRect();        // Pega as coordenadas do disparo
            if (
                deathstarRect.left < colisaoDisparo.right &&               // Verifica se o lado esquerdo da Estrela da Morte é menor que o lado direito do projetil
                deathstarRect.right > colisaoDisparo.left &&               // Verifica se o lado direito da Estrela da Morte é maior que o lado esquerdo do projetil
                deathstarRect.top < colisaoDisparo.bottom &&               // Verifica se o topo da Estrela da Morte é menor que a parte de baixo do projetil
                deathstarRect.bottom > colisaoDisparo.top                  // Verifica se a parte de baixo da Estrela da Morte é maior que o topo do projetil
            ) {
                vidaAtualEstrelaDaMorte -= danoTiroXWing;                  // Subtrai a vida da Estrela da Morte
                pontosScore += 12;                                         // Aumenta a pontuação em 12 pontos 
                pontos.innerText = `Pontos: ${pontosScore}`;               // Atualiza a pontuação do jogo
                atualizarMenu();                                           // Atualiza o Menu de status do jogo
                disparo.remove();                                          // Remove o projetil que acertou a Estrela da Morte
                if (vidaAtualEstrelaDaMorte <= 0) {                        // Se a vida da Estrela da Morte for menor ou igual a 0
                    if (sinalObiWan) {                                     // Se o sinal do Obi-Wan estiver habilitado
                        sinalObiWan = false;                               // Desabilita o sinal do Obi-Wan para não ficar repetindo infinitamente
                        somSinalObiWan();                                  // Chama o sinal da voz do Obi-Wan
                        const terminarMensagem = setInterval(() => {       // Cria um intervalo para esperar finalizar o audio do Obi-Wan
                            if (pontosVida > 0) {                          // Se ainda tiver vida 
                                clearInterval(terminarMensagem);           // Deleta o intervalo
                                habilitarAtaqueEspecial = true;            // Habilita o ataque especial
                                btnEspecialAtaque.style.display = "block"; // Exibe na tela o sinal da tecla F
                            }
                        }, 2000);                                          // Tempo para esperar finalizar o audio do Obi-Wan
                    }
                } else {                                                             // Se a vida da Estrela da Morte for maior que 0
                    deathstarElement.setAttribute("data-vida", vidaAtualEstrelaDaMorte);  // Atualiza o parametro da vida da Estrela da Morte
                }
                showEstatisticas();                                                  // Atualiza o painel de estasticas do jogo                          
            }
        });
    }
}



// Script para ler entradas do controle de X-Box
window.addEventListener("gamepadconnected", (e) => {
    // Guarda o estado dos botões do frame anterior para detectar cliques (ações de um toque)
    let prevButtons = [];
    // loop para ler as entradas do controle a cada frame
    function update() {                                               // Inicia o loop de atualização que lê as entradas do controle a cada quadro.
        const gp = navigator.getGamepads()[e.gamepad.index];          // Pega o estado atual do gamepad conectado.
        if (!gp) {                                                    // Verifica se o gamepad foi desconectado.
            // Se o controle for desconectado, para a nave
            requestAnimationFrame(update);                            // Continua o loop de atualização no próximo quadro.
            return;                                                   // Sai da função neste quadro, pois não há controle para ler.
        }
        gp.buttons.forEach((button, index) => {                                                            // Itera sobre todos os botões para verificar cliques únicos.
            const foiClicado = button.pressed && (!prevButtons[index] || !prevButtons[index].pressed);     // Verifica se o botão foi pressionado neste quadro, mas não no anterior.
            if (foiClicado) {
                if (index === 9 || index === 0) {        // Botão Start ou A
                    const botoes = document.getElementById("botoes_Index");
                    const btnIniciar = document.getElementById("playIntro");
                    const btnControles = document.getElementById("btnManualControles");
                    const video = document.getElementById("introVideo");
                    if (btnIniciar.className === "botaoIndexSelecionado") {
                        botoes.style.display = "none";   // esconde botão
                        video.style.display = "block";   // mostra vídeo
                        video.play();                    // começa vídeo
                    } else if (btnControles.className === "botaoIndexSelecionado") {
                        window.location.href = './html/manualControles.html';
                    }
                } else if (index === 14) {              // Botão Seta Esquerda
                    document.getElementById("playIntro").className = "botaoIndexSelecionado";
                    document.getElementById("btnManualControles").className = "botaoIndex";
                } else if (index === 15) {             // Botão Seta Direita
                    document.getElementById("playIntro").className = "botaoIndex";
                    document.getElementById("btnManualControles").className = "botaoIndexSelecionado";
                }
            }
        });
        // Salva o estado atual dos botões para comparar no próximo frame
        prevButtons = gp.buttons.map(b => ({ pressed: b.pressed, value: b.value }));  // Salva o estado atual de todos os botões para a próxima verificação.
        requestAnimationFrame(update);                                                // Agenda a próxima execução da função 'update' para o próximo quadro de animação.
    }
    update();
});

window.addEventListener("gamepaddisconnected", (e) => {   // Adiciona um ouvinte de evento para quando um controle é desconectado.
    console.log("Controle desconectado:", e.gamepad);     // Exibe no console que o controle foi desconectado.
});








// Script para ler entradas do controle de X-Box
const allButtons = [document.getElementById("playIntro"), document.getElementById("btnManualControles")];   // Armazena os elementos dos botões em um array para fácil acesso.
let selectedButtonIndex = 0;                                                                                // Cria uma variável para rastrear o índice do botão atualmente selecionado (0 para Iniciar, 1 para Controles).
function updateSelectedButtonUI() {                                                                         // Define uma função para atualizar a aparência dos botões com base no que está selecionado.
    allButtons.forEach((button, index) => {                                                                 // Itera sobre cada botão no array 'allButtons'.
        if (index === selectedButtonIndex) {                                                                // Verifica se o botão atual é o que está selecionado.
            button.className = "botaoIndexSelecionado";                                                     // Se for, aplica a classe CSS para o estilo de "selecionado".
        } else {                                                                                            // Caso contrário (se não for o botão selecionado).
            button.className = "botaoIndex";                                                                // Aplica a classe CSS padrão.
        }
    });
}
// Define o estado inicial da interface
updateSelectedButtonUI();                                                                                   // Chama a função uma vez para garantir que o primeiro botão apareça como selecionado ao carregar a página.
window.addEventListener("gamepadconnected", (e) => {                                                        // Adiciona um ouvinte de evento que é acionado quando um controle é conectado.
    console.log("Controle conectado:", e.gamepad);                                                          // Exibe uma mensagem no console informando que o controle foi conectado.
    let prevButtons = [];                                                                                   // Inicializa um array para guardar o estado dos botões do quadro anterior, para detectar cliques únicos.
    let animationFrameId;                                                                                   // Declara uma variável para armazenar o ID do loop de animação, permitindo que ele seja cancelado se necessário.
    function update() {                                                                                     // Define a função de loop principal que será executada a cada quadro de animação.
        const gp = navigator.getGamepads()[e.gamepad.index];                                                // Obtém o estado atual do controle conectado.
        if (!gp) {                                                                                          // Verifica se o controle foi desconectado.
            animationFrameId = requestAnimationFrame(update);                                               // Se desconectado, continua o loop para o próximo quadro (para detectar reconexão).
            return;                                                                                         // Sai da função neste quadro, pois não há dados do controle para processar.
        }
        gp.buttons.forEach((button, index) => {                                                             // Itera sobre todos os botões do controle.
            const foiClicado = button.pressed && (!prevButtons[index] || !prevButtons[index].pressed);      // Verifica se o botão foi pressionado neste quadro, mas não no anterior (detecta um clique).
            if (foiClicado) {                                                                               // Se um clique foi detectado.
                // Botão A (índice 0) ou Start (índice 9) para confirmar a seleção
                if (index === 0 || index === 9) {                                                           // Verifica se o botão pressionado foi o 'A' ou 'Start'.
                    if (selectedButtonIndex === 0) {                                                        // Se o botão "Iniciar Game" estiver selecionado.
                        botoes.style.display = "none";                                                      // Esconde o painel de botões.
                        video.style.display = "block";                                                      // Mostra o elemento de vídeo.
                        video.play();                                                                       // Inicia a reprodução do vídeo.
                    } else if (selectedButtonIndex === 1) {                                                 // Se o botão "Controles" estiver selecionado.
                        window.location.href = './html/manualControles.html';                               // Redireciona o navegador para a página de controles.
                    }
                }
                // D-Pad Esquerda (índice 14)
                else if (index === 14) {                                                                    // Se a seta para a esquerda do D-Pad foi pressionada.
                    selectedButtonIndex = Math.max(0, selectedButtonIndex - 1);                             // Move a seleção para a esquerda, garantindo que não seja menor que 0.
                    updateSelectedButtonUI();                                                               // Atualiza a aparência dos botões para refletir a nova seleção.
                }
                // D-Pad Direita (índice 15)
                else if (index === 15) {                                                                    // Se a seta para a direita do D-Pad foi pressionada.
                    selectedButtonIndex = Math.min(allButtons.length - 1, selectedButtonIndex + 1);         // Move a seleção para a direita, garantindo que não ultrapasse o número de botões.
                    updateSelectedButtonUI();                                                               // Atualiza a aparência dos botões.
                }
            }
        });
        prevButtons = gp.buttons.map(b => ({ pressed: b.pressed, value: b.value }));                        // Salva o estado atual dos botões para ser usado na verificação do próximo quadro.
        animationFrameId = requestAnimationFrame(update);                                                   // Agenda a próxima execução da função 'update' para o próximo quadro de animação.
    }
    animationFrameId = requestAnimationFrame(update);                                                       // Inicia o loop de atualização.
});
window.addEventListener("gamepaddisconnected", (e) => {                                                     // Adiciona um ouvinte de evento que é acionado quando um controle é desconectado.
    console.log("Controle desconectado:", e.gamepad);                                                       // Exibe uma mensagem no console informando que o controle foi desconectado.
    // Opcional: Aqui posso cancelar o loop de animação usando `cancelAnimationFrame(animationFrameId)`.
});



// Função para criar os projeteis do Tie Fighter
const construirProjeteisTieFighter = (tieFighter) => {
    const posicaoLeftTiro = parseFloat(tieFighter.style.left);                             // Pega a posição horizontal atual do Tie Fighter
    const posicaoTopTiro = parseFloat(tieFighter.style.top);                               // Pega a posição vertical atual do Tie Fighter
    const centerX = posicaoLeftTiro + larguraTieFighter / 2;                               // Centro X do Tie Fighter
    const centerY = posicaoTopTiro + alturaTieFighter / 2;                                 // Centro Y do Tie Fighter
    // Cria dois elementos de disparo, um de cada lado do Tie Fighter
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");                                    // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "projetil_tie-fighter";                                       // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX - 22 + "px";                                          // Define a posição horizontal do projetil esquerdo referente a posição central horizontal do Tie Fighter
    tiroEsquerdo.style.top = centerY - 40 + "px";                                           // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroEsquerdo);                                                     // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");                                     // Cria um elemento div, que vai ser o projetil
    tiroDireito.className = "projetil_tie-fighter";                                        // Adiciona a classe do projetil para aplicar o estilo
    tiroDireito.style.left = centerX - 12 + "px";                                          // Define a posição horizontal do projetil direito referente a posição central horizontal do Tie Fighter
    tiroDireito.style.top = centerY - 40 + "px";                                            // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroDireito);                                                      // Adiciona o projetil ao cenario
}




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
    // Função auxiliar para adicionar eventos de toque
    const addTouchListeners = (element, actionStart, actionEnd) => {
        element.addEventListener("touchstart", (e) => { e.preventDefault(); actionStart(); }, { passive: false });
        element.addEventListener("touchend", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });
        element.addEventListener("touchcancel", (e) => { e.preventDefault(); actionEnd(); }, { passive: false });
    };

    // --- Ações de clique único (touchstart é suficiente) ---
    gamepadLT.addEventListener("touchstart", (e) => { e.preventDefault(); giroReversoXWing(); });
    gamepadX.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (soltarBoost) {
            boostXWing();
            if (okFullPower) return;
            soltarBoost = false;
            setTimeout(() => soltarBoost = true, recargaBoost);
        }
    });
    gamepadY.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (habilitarAtaqueEspecial) {
            habilitarAtaqueEspecial = false;
            okGameOver = false;
            btnEspecialAtaque.style.display = "none";
            xwingEspecialAtaque();
        }
    });
    gamepadBACK.addEventListener("touchstart", (e) => {
        e.preventDefault();
        painelDados.style.display = (painelDados.style.display === "none") ? "flex" : "none";
    });
    gamepadSTART.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const btnReiniciar = document.getElementById("btnReiniciar");
        if (!jogoIniciado) {
            btnIniciar.className = "botao-selecionado";
            setTimeout(() => iniciarJogo(), 300);
        } else if (btnReiniciar) {
            btnReiniciar.className = "botao-selecionado";
            setTimeout(() => reiniciarJogo(), 300);
        }
    });

    // --- Ações de manter pressionado ---
    // Movimento
    addTouchListeners(gamepadUP, () => direcaoVertical = -1, () => direcaoVertical = 0);
    addTouchListeners(gamepadDOWN, () => direcaoVertical = 1, () => direcaoVertical = 0);
    addTouchListeners(gamepadLEFT, () => direcaoHorizontal = -1, () => direcaoHorizontal = 0);
    addTouchListeners(gamepadRIGHT, () => direcaoHorizontal = 1, () => direcaoHorizontal = 0);

    // Rotação
    addTouchListeners(gamepadLB, () => giroHorario = true, () => giroHorario = false); // LB - Horário
    addTouchListeners(gamepadRB, () => giroAntiHorario = true, () => giroAntiHorario = false); // RB - Anti-horário

    // Tiro
    addTouchListeners(gamepadA, () => estaAtirando = true, () => estaAtirando = false);
    addTouchListeners(gamepadRT, () => estaAtirando = true, () => estaAtirando = false);

    // Exibe o gamepad na tela
    document.getElementById("gamepad-overlay").style.display = "flex";
}










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