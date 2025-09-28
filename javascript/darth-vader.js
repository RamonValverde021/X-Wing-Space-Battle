/*------------------------------- DARTH VADER -------------------------------*/
let darthVaderDerrotado = false;                                                                          // Define uma flag (booleano) para verificar se Darth Vader foi derrotado. Inicializa como falso.
let anguloDarthVader = 0;                                                                                 // Define uma variável para armazenar o ângulo de rotação da nave de Darth Vader. Inicializa em 0.

// Variáveis para o movimento lateral (strafe) de Darth Vader
let darthVaderStrafeDirection = 1;                                                                        // Controla a direção do movimento lateral: 1 para direita, -1 para esquerda.
let darthVaderStrafeTimer = 0;                                                                            // Um contador para cronometrar a mudança de direção.
const darthVaderStrafeInterval = 300;                                                                     // A cada quantos "ticks" do jogo a direção do strafe deve mudar (aprox. 5 segundos).

// Função que inicializa a batalha contra o chefe Darth Vader.
function bossDarthVader() {
    clearInterval(iniciaNavesInimigas);                                                                   // Para o intervalo que cria naves inimigas (Tie Fighters) normais.
    clearInterval(iniciaProjeteisTieFighter);                                                             // Para o intervalo que cria projéteis dos Tie Fighters.
    darthVaderDerrotado = false;                                                                          // Garante que a flag de derrota seja resetada para falso no início da batalha.
    barraDeVidaDarthVader.style.display = "block";                                                        // Torna a barra de vida de Darth Vader visível na tela.
    audioTrilhaSonora.pause();                                                                            // Pausa a trilha sonora principal do jogo.
    pontosVida += 50;                                                                                     // Adiciona 50 pontos à vida do jogador como bônus para a batalha.
    if (pontosVida >= 100) pontosVida = 100;                                                               // Garante que a vida não ultrapasse 100.
    atualizarMenu();                                                                                      // Chama a função para atualizar a exibição da vida e outros status no menu.
    const intervaloSuspense = setInterval(() => {                                                         // Cria um temporizador para um atraso dramático antes da aparição do chefe.
        clearInterval(intervaloSuspense);                                                                 // Limpa o próprio temporizador para que ele execute apenas uma vez.
        trilhaSonoraDarthVader();                                                                         // Inicia trilha sonora do Darth Vader.
        const darthvader = document.createElement("div");                                                 // Cria um novo elemento <div> no HTML para representar a nave de Darth Vader.
        darthvader.id = "darthvader";                                                                     // Define o ID do elemento como "darthvader" para fácil acesso.
        darthvader.className = "darth_vader";                                                             // Aplica a classe CSS "darth_vader" para estilizar a nave.
        darthvader.setAttribute("data-vida", vidaDarthVader);                                             // Define um atributo 'data-vida' no elemento para armazenar seus pontos de vida.
        // Posição inicial (fora da tela, no topo)
        darthvader.style.left = (larguraCenario / 2 - 50) + "px";                                         // Define a posição horizontal inicial no centro da tela.
        darthvader.style.top = "-100px";                                                                  // Define a posição vertical inicial acima da área visível da tela.
        cenario.appendChild(darthvader);                                                                  // Adiciona o elemento da nave de Darth Vader ao cenário do jogo.
        // Animação de entrada
        let posY = -100;                                                                                  // Variável para controlar a posição vertical durante a animação de entrada.
        const targetY = 100;                                                                              // Posição vertical alvo que a nave deve alcançar.
        const entradaInterval = setInterval(() => {                                                       // Inicia um intervalo para animar a entrada da nave.
            posY += 5;                                                                                    // Move a nave para baixo em 5 pixels a cada quadro da animação.
            darthvader.style.top = posY + "px";                                                           // Atualiza a posição vertical do elemento no CSS.
            if (posY >= targetY) {                                                                        // Verifica se a nave alcançou a posição alvo.
                clearInterval(entradaInterval);                                                           // Para a animação de entrada.
                // Inicia a lógica de movimento e ataque após a entrada
                iniciaMovimentacaoDarthVader = setInterval(moverDarthVader, 1);                           // Inicia o intervalo para o movimento de perseguição da nave.
            }
        }, 20);                                                                                           // O intervalo de animação é executado a cada 20 milissegundos.
        // Inicia os disparos
        iniciaProjeteisDarthVader = setInterval(criarProjeteisDarthVader, velocidadeDisparosDarthVader);  // Inicia o intervalo para criar projéteis.
        iniciaMovimentacaoProjeteisDarthVader = setInterval(moverProjeteisDarthVader, 20);                // Inicia o intervalo para mover os projéteis.
    }, 2000);                                                                                             // O atraso antes da aparição do chefe é de 2000 milissegundos (2 segundos).
}

// Função que verifica a colisão dos tiros do jogador com Darth Vader.
function colisaoDarthVader() {
    const darthVaderElement = document.getElementById("darthvader");                                      // Obtém o elemento da nave de Darth Vader pelo seu ID.
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");                                  // Seleciona todos os elementos de projéteis do jogador.
    if (darthVaderElement) {                                                                              // Verifica se o elemento de Darth Vader existe no cenário.
        const darthVaderRect = darthVaderElement.getBoundingClientRect();                                 // Obtém as coordenadas e dimensões da nave de Darth Vader.
        todosDisparos.forEach((disparo) => {                                                              // Itera sobre cada projétil do jogador.
            const colisaoDisparo = disparo.getBoundingClientRect();                                       // Obtém as coordenadas e dimensões do projétil atual.
            if (                                                                                          // Inicia a verificação de sobreposição dos retângulos (colisão).
                darthVaderRect.left < colisaoDisparo.right &&                                             // Verifica se a borda esquerda de Vader está à esquerda da borda direita do tiro.
                darthVaderRect.right > colisaoDisparo.left &&                                             // Verifica se a borda direita de Vader está à direita da borda esquerda do tiro.
                darthVaderRect.top < colisaoDisparo.bottom &&                                             // Verifica se o topo de Vader está acima da base do tiro.
                darthVaderRect.bottom > colisaoDisparo.top                                                // Verifica se a base de Vader está abaixo do topo do tiro.
            ) {                                                                                           // Se todas as condições forem verdadeiras, houve uma colisão.
                vidaDarthVader -= danoTiroXWing;                                                          // Subtrai a vida de Darth Vader com base no dano do tiro do jogador.
                pontosScore += 1;                                                                         // Adiciona 10 pontos à pontuação do jogador.
                disparo.remove();                                                                         // Remove o projétil que colidiu.
                atualizarMenu();                                                                          // Chama a função para atualizar a barra de vida de Darth Vader e a pontuação.
                if (vidaDarthVader <= 0) {                                                                // Verifica se a vida de Darth Vader chegou a zero ou menos.
                    if (!darthVaderDerrotado) derrotarDarthVader(darthVaderElement);                      // Se ainda não foi marcado como derrotado, chama a função de derrota.
                    darthVaderDerrotado = true;                                                           // Define a flag de derrota como verdadeira para evitar múltiplas chamadas.
                } else {                                                                                  // Se Darth Vader ainda tem vida.
                    darthVaderElement.setAttribute("data-vida", vidaDarthVader);                          // Atualiza o atributo 'data-vida' com o novo valor.
                }
                showEstatisticas();                                                                       // Atualiza o painel de estatísticas do jogo.
            }
        });
    }
}

// Função que controla o movimento e rotação de Darth Vader.
function moverDarthVader() {
    const darthVaderElement = document.getElementById("darthvader");                                      // Obtém o elemento da nave de Darth Vader.
    if (!darthVaderElement || darthVaderDerrotado) return;                                                // Se a nave não existe ou já foi derrotada, interrompe a função.

    // Posições
    const vaderLeft = parseFloat(darthVaderElement.style.left);                                           // Obtém a posição horizontal (esquerda) da nave.
    const vaderTop = parseFloat(darthVaderElement.style.top);                                             // Obtém a posição vertical (topo) da nave.
    const vaderWidth = darthVaderElement.offsetWidth;                                                     // Obtém a largura da nave.
    const vaderHeight = darthVaderElement.offsetHeight;                                                   // Obtém a altura da nave.

    const vaderCenterX = vaderLeft + vaderWidth / 2;                                                      // Calcula a coordenada X do centro da nave de Vader.
    const vaderCenterY = vaderTop + vaderHeight / 2;                                                      // Calcula a coordenada Y do centro da nave de Vader.
    const xwingCenterX = posicaoHorizontal + larguraXWing / 2;                                            // Calcula a coordenada X do centro da nave do jogador (X-Wing).
    const xwingCenterY = positionVertical + alturaXWing / 2;                                              // Calcula a coordenada Y do centro da nave do jogador.

    // Vetor em direção ao X-Wing
    const dx = xwingCenterX - vaderCenterX;                                                               // Calcula a diferença horizontal entre o jogador e Vader.
    const dy = xwingCenterY - vaderCenterY;                                                               // Calcula a diferença vertical entre o jogador e Vader.

    // 1. Rotação para apontar para o X-Wing
    // O ângulo de `atan2` é calculado a partir do eixo X positivo (direita). Como a imagem da nave aponta para cima (eixo Y negativo),
    // subtraímos 90 graus para alinhar a frente da nave com o vetor de direção para o X-Wing.
    anguloDarthVader = Math.atan2(dy, dx) * (180 / Math.PI) - 90;                                         // Calcula o ângulo para apontar para o jogador e ajusta a rotação.
    darthVaderElement.style.transform = `rotate(${anguloDarthVader}deg)`;                                 // Aplica a rotação calculada ao estilo CSS da nave.

    // 2. Movimento de perseguição
    const distancia = Math.sqrt(dx * dx + dy * dy);                                                       // Calcula a distância euclidiana entre Vader e o jogador.
    // Definimos uma "zona de conforto" para evitar a oscilação (jitter).
    // A nave tentará ficar a uma distância entre `maxDistance` e `minDistance`.
    const maxDistance = 300;                                                                              // Define a distância máxima que a nave tentará manter antes de se aproximar.
    const minDistance = 280;                                                                              // Define a distância mínima que a nave tentará manter antes de se afastar.
    const velocidadeVader = 1;                                                                            // Define a velocidade de movimento para frente/trás de Vader.
    const velocidadeStrafe = 0.8;                                                                         // Define a velocidade do movimento lateral.

    let moveX = 0;                                                                                        // Inicializa a variável de movimento horizontal.
    let moveY = 0;                                                                                        // Inicializa a variável de movimento vertical.

    // Lógica de movimento para frente e para trás
    if (distancia > maxDistance) {                                                                        // Se a distância for maior que a zona de conforto máxima.
        // Se estiver muito longe, move-se para perto do jogador.
        moveX = (dx / distancia) * velocidadeVader;                                                       // Calcula o componente de movimento X para se aproximar.
        moveY = (dy / distancia) * velocidadeVader;                                                       // Calcula o componente de movimento Y para se aproximar.
    } else if (distancia < minDistance) {                                                                 // Se a distância for menor que a zona de conforto mínima.
        // Se estiver muito perto, afasta-se para manter a distância.
        moveX = -(dx / distancia) * velocidadeVader;                                                      // Calcula o componente de movimento X para se afastar (direção oposta).
        moveY = -(dy / distancia) * velocidadeVader;                                                      // Calcula o componente de movimento Y para se afastar.
    }

    // 3. Movimento Lateral (Strafe)
    darthVaderStrafeTimer++; // Incrementa o contador a cada chamada da função.
    if (darthVaderStrafeTimer > darthVaderStrafeInterval) { // Verifica se é hora de mudar de direção.
        darthVaderStrafeDirection *= -1; // Inverte a direção (de 1 para -1, ou de -1 para 1).
        darthVaderStrafeTimer = 0; // Reseta o contador.
    }
    // Calcula o vetor perpendicular ao vetor (dx, dy) para o movimento lateral.
    // O vetor perpendicular a (a, b) é (-b, a).
    moveX += (-dy / distancia) * velocidadeStrafe * darthVaderStrafeDirection;
    moveY += (dx / distancia) * velocidadeStrafe * darthVaderStrafeDirection;

    // Se a distância estiver entre minDistance e maxDistance, moveX e moveY permanecem 0, 
    // e a nave para de se mover para frente e para trás.
    let newLeft = vaderLeft + moveX;                                                                      // Calcula a nova posição horizontal.
    let newTop = vaderTop + moveY;                                                                        // Calcula a nova posição vertical.

    // Limites do cenário
    if (newLeft < 0) newLeft = 0;                                                                         // Impede que a nave saia pela borda esquerda do cenário.
    if (newLeft + vaderWidth > larguraCenario) newLeft = larguraCenario - vaderWidth;                     // Impede que a nave saia pela borda direita.
    if (newTop < 0) newTop = 0;                                                                           // Impede que a nave saia pela borda superior.
    if (newTop + vaderHeight > alturaCenario) newTop = alturaCenario - vaderHeight;                       // Impede que a nave saia pela borda inferior.
    darthVaderElement.style.left = newLeft + "px";                                                        // Aplica a nova posição horizontal ao estilo da nave.
    darthVaderElement.style.top = newTop + "px";                                                          // Aplica a nova posição vertical ao estilo da nave.
}

// Função que cria os projéteis disparados por Darth Vader.
function criarProjeteisDarthVader() {
    const darthVaderElement = document.getElementById("darthvader");                                      // Obtém o elemento da nave de Darth Vader.
    if (!darthVaderElement || darthVaderDerrotado) return;                                                // Se a nave não existe ou foi derrotada, interrompe a função.

    const vaderRect = darthVaderElement.getBoundingClientRect();                                          // Obtém as coordenadas e dimensões da nave.
    const center_x = vaderRect.left + vaderRect.width / 2;                                                // Calcula a coordenada X do centro da nave.
    const center_y = vaderRect.top + vaderRect.height / 2;                                                // Calcula a coordenada Y do centro da nave.

    // Ângulo em radianos
    // A variável `anguloDarthVader` já está ajustada em -90 graus para a rotação visual.
    // Para o cálculo do vetor de velocidade (onde 0 graus é para a direita), precisamos do ângulo original de `atan2`.
    // Portanto, adicionamos 90 graus de volta para obter o ângulo correto para a matemática do projétil.
    const theta = (anguloDarthVader + 90) * Math.PI / 180;                                                // Converte o ângulo de volta para o padrão matemático e para radianos.
    // Velocidade e componentes
    const speed = 50;                                                                                     // Define a velocidade dos projéteis.
    const vx = speed * Math.cos(theta);                                                                   // Calcula o componente de velocidade horizontal (X).
    const vy = speed * Math.sin(theta);                                                                   // Calcula o componente de velocidade vertical (Y).

    // Posições locais dos canhões (esquerdo e direito) em relação ao centro da nave.
    const muzzles = [
        { lx: -20, ly: -15 },                                                                             // Posição do canhão esquerdo (20px para a esquerda, 15px para a frente).
        { lx: 20, ly: -15 }                                                                               // Posição do canhão direito (20px para a direita, 15px para a frente).
    ];

    // Metade das dimensões do projétil para centralizar na criação.
    const half_w = 3;                                                                                     // Metade da largura do projétil (6px / 2).
    const half_h = 25;                                                                                    // Metade da altura do projétil (50px / 2).

    muzzles.forEach(muzzle => {                                                                           // Itera sobre cada canhão para criar um projétil.
        // Calcula a posição de spawn do projétil, aplicando a rotação da nave.
        // Usa uma matriz de rotação para encontrar a posição correta do canhão no mundo do jogo.
        const spawn_center_x = center_x + (muzzle.lx * Math.cos(theta - Math.PI / 2) - muzzle.ly * Math.sin(theta - Math.PI / 2));
        const spawn_center_y = center_y + (muzzle.lx * Math.sin(theta - Math.PI / 2) + muzzle.ly * Math.cos(theta - Math.PI / 2));

        // Cria o elemento do projétil.
        const tiro = document.createElement("div");                                                       // Cria um novo elemento <div> para o projétil.
        tiro.className = "projetil_darth-vader";                                                          // Aplica a classe CSS para estilização.

        // Posiciona o canto superior esquerdo do projétil para que seu centro fique na posição de spawn calculada.
        tiro.style.left = (spawn_center_x - half_w) + "px";                                               // Centraliza horizontalmente.
        tiro.style.top = (spawn_center_y - half_h) + "px";                                                // Centraliza verticalmente.

        // Aplica a mesma rotação da nave ao projétil para que ele saia alinhado.
        tiro.style.transform = `rotate(${anguloDarthVader}deg)`;

        // Armazena os vetores de velocidade no projétil para a função de movimento.
        tiro.setAttribute("data-vx", vx.toFixed(2));
        tiro.setAttribute("data-vy", vy.toFixed(2));

        cenario.appendChild(tiro);                                                                        // Adiciona o projétil ao cenário.
    });
    somCanhoesTieFighter();                                                                               // Toca o som de disparo (reutilizado).
}

// Função que move os projéteis de Darth Vader.
function moverProjeteisDarthVader() {
    const tiros = document.querySelectorAll(".projetil_darth-vader");                                     // Seleciona todos os projéteis de Darth Vader no cenário.
    for (let i = 0; i < tiros.length; i++) {                                                              // Itera sobre cada projétil encontrado.
        const disparo = tiros[i];                                                                         // Armazena o projétil atual em uma variável.
        if (disparo) {                                                                                    // Verifica se o projétil realmente existe.
            let left = parseFloat(disparo.style.left);                                                    // Obtém a posição horizontal atual do projétil.
            let top = parseFloat(disparo.style.top);                                                      // Obtém a posição vertical atual do projétil.

            let vx = parseFloat(disparo.getAttribute('data-vx'));                                         // Obtém a velocidade horizontal armazenada no atributo de dados.
            let vy = parseFloat(disparo.getAttribute('data-vy'));                                         // Obtém a velocidade vertical armazenada no atributo de dados.

            disparo.style.left = (left + vx) + "px";                                                      // Atualiza a posição horizontal do projétil.
            disparo.style.top = (top + vy) + "px";                                                        // Atualiza a posição vertical do projétil.

            // Remove se sair da tela
            if (left < -10 || left > larguraCenario + 10 || top < -10 || top > alturaCenario + 10) {      // Verifica se o projétil saiu dos limites do cenário.
                disparo.remove();                                                                         // Remove o projétil do HTML.
            }
        }
    }
}

// Função que executa a animação de derrota de Darth Vader.
function derrotarDarthVader(darthVaderElement) {
    clearInterval(iniciaMovimentacaoDarthVader);                                                          // Para o intervalo de movimento da nave.
    clearInterval(iniciaProjeteisDarthVader);                                                             // Para o intervalo de criação de projéteis.

    let rotacao = 0;                                                                                      // Inicializa uma variável para controlar a rotação durante a animação de derrota.
    const derrotaInterval = setInterval(() => {                                                           // Inicia um intervalo para a animação de derrota.
        const vaderRect = darthVaderElement.getBoundingClientRect();                                      // Obtém as coordenadas e dimensões atuais da nave.
        let newLeft = vaderRect.left + rotacaoXWing;                                                      // Define o movimento diagonal para a direita.
        let newTop = vaderRect.top - 5;                                                                  // Define o movimento diagonal para cima.
        rotacao += 30;                                                                                    // Incrementa o ângulo de rotação para um giro rápido.

        darthVaderElement.style.left = newLeft + "px";                                                    // Aplica a nova posição horizontal.
        darthVaderElement.style.top = newTop + "px";                                                      // Aplica a nova posição vertical.
        darthVaderElement.style.transform = `rotate(${rotacao}deg)`;                                      // Aplica a rotação.

        // Remove quando sair da tela
        if (newTop < -vaderRect.height || newLeft > larguraCenario) {                                     // Verifica se a nave saiu completamente da área visível.
            clearInterval(derrotaInterval);                                                               // Para a animação de derrota.
            darthVaderElement.remove();                                                                   // Remove o elemento da nave do HTML.
            iniciandoBossEstrelaDaMorte();
        }
    }, 50);                                                                                               // O intervalo da animação é executado a cada 20 milissegundos.
}

function iniciandoBossEstrelaDaMorte() {
    iniciaBossEstrelaDaMorteTimeout = setTimeout(() => {
        if (iniciarBossDeathStar) {                                                                       // Verifica se o jogo ainda está rodando e se o boss não foi iniciado
            iniciarBossDeathStar = false;                                                                 // Desativa a flag para não iniciar novamente
            bossDeathStar();                                                                              // Chama a função para iniciar a fase da estrela da morte
        }
    }, 10 * 1000);                                                                                        // Agenda o início do boss para daqui a 10 segundos
}