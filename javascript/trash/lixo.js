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
function moverProjeteisXWing() {
    const tiros = document.querySelectorAll(".projetil_x-wing"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetilXWing;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil < -10) {                      // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}

function apresentarXWing() {
    let pos = -500; // posição inicial
    const limite = 200; // até onde vai subir
    const animacao = setInterval(() => {
        pos += 5; // velocidade
        xwing.style.bottom = pos + "px";

        if (pos >= limite) {
            clearInterval(animacao); // para quando atingir o limite
        }
    }, 16); // ~60fps
}


document.addEventListener("DOMContentLoaded", () => {
    // Inicializa a nave fora da tela
    xwing.style.left = posicaoHorizontal + "px";
    xwing.style.transform = `rotate(${rotacaoXWing}deg)`;
});



/*------------------------------- NAVES INIMIGAS -------------------------------*/
// Criando naves inimigas em lugares aleatorios
function navesInimigas() {
    const tieFighter = document.createElement("div");        // Cria um elemento div, que vai ser o Tie Fighter
    tieFighter.className = "tie_fighter";                    // Adiciona a classe do Tie Fighter para aplicar o estilo
    tieFighter.setAttribute("data-vida", 5);                 // Cria o atributo data-vida para armazenar a vida do Tie Fighter
    tieFighter.style.left = Math.floor(Math.random() * (larguraCenario - larguraTieFighter)) + "px"; // Define a posição horizontal do Tie Fighter em um lugar aleatorio dentro do cenario
    tieFighter.style.top = "0";                              // Define a posição vertical do Tie Fighter no topo do cenario
    cenario.appendChild(tieFighter);                         // Adiciona o Tie Fighter ao cenario
    somVoandoTieFighter();                                   // Toca o som do Tie Fighter voando
}

// Movimentando naves inimigas
function moverNavesInimigas() {
    const tieFighters = document.querySelectorAll(".tie_fighter");      // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    for (let i = 0; i < tieFighters.length; i++) {                      // Percorre todos os Tie Fighters
        if (tieFighters[i]) {                                           // Verifica se o Tie Fighter existe
            let posicaoTopTieFighters = tieFighters[i].offsetTop;       // Pega a posição vertical atual do Tie Fighter
            posicaoTopTieFighters += velocidadeTieFighter;              // Atualiza a posição vertical do Tie Fighter, somando a velocidade do Tie Fighter. Equação para mover para baixo
            tieFighters[i].style.top = posicaoTopTieFighters + "px";    // Atualiza a posição do Tie Fighter no cenario
            if (posicaoTopTieFighters > alturaCenario) {                // Se o Tie Fighter sair do cenario (posição maior que a altura do cenario)
                pontosVida -= 100;                                       // Diminui 10 pontos de vida
                vida.innerText = `Vida: ${pontosVida}%`;                // Atualiza a vida no menu
                tieFighters[i].parentNode.removeChild(tieFighters[i]);  // Remove o Tie Fighter do cenario
                if (pontosVida <= 0) {                                  // Se a vida chegar a 0, chama a função gameOver
                    gameOver();
                }
            }
        }
    }
}




// Função para atirar
function atirarTieFighters() {
    const tieFighters = document.querySelectorAll(".tie_fighter");
    if (tieFighters.length === 0) {
        return; // Se não houver Tie Fighters, sai da função
    } else if (tieFighters.length <= 3) {
        const aleatorio = Math.floor(Math.random() * tieFighters.length);
        const tieEscolhido = tieFighters[aleatorio];
        criarProjeteisTieFighter(tieEscolhido);
        //somCanhoesTieFighter(); // Toca o som dos canhões do X-Wing
    } else if (tieFighters.length > 3 && tieFighters.length <= 6) {
        for(let i = 0; i < 2; i++) {
            const aleatorio = Math.floor(Math.random() * tieFighters.length);
            const tieEscolhido = tieFighters[aleatorio];
            criarProjeteisTieFighter(tieEscolhido);
            //somCanhoesTieFighter();
        }
    } else if (tieFighters.length > 6) {
        for(let i = 0; i < 3; i++) {
            const aleatorio = Math.floor(Math.random() * tieFighters.length);
            const tieEscolhido = tieFighters[aleatorio];
            criarProjeteisTieFighter(tieEscolhido);
            //somCanhoesTieFighter();
        }
    }
}



// Colisão com as naves inimigas
function colisaoTieFighter() {
    const todasNavesInimigas = document.querySelectorAll(".tie_fighter");                     // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    const todosDisparos = document.querySelectorAll(".projetil_x-wing");                      // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    todasNavesInimigas.forEach((navesInimiga) => {                                            // Percorre todos os Tie Fighters
        todosDisparos.forEach((disparo) => {                                                  // Percorre todos os projeteis
            const colisaoNaveInimiga = navesInimiga.getBoundingClientRect();                  // Pega as coordenadas do Tie Fighter    
            const colisaoDisparo = disparo.getBoundingClientRect();                           // Pega as coordenadas do projetil
            let vidaAtuaTieFighter = parseInt(navesInimiga.getAttribute("data-vida"), 10);    // Pega a vida atual do Tie Fighter   
            if (                                                                              // Verifica se houve colisão entre o Tie Fighter e o projetil
                colisaoNaveInimiga.left < colisaoDisparo.right &&                             // Verifica se o lado esquerdo do Tie Fighter é menor que o lado direito do projetil
                colisaoNaveInimiga.right > colisaoDisparo.left &&                             // Verifica se o lado direito do Tie Fighter é maior que o lado esquerdo do projetil
                colisaoNaveInimiga.top < colisaoDisparo.bottom &&                             // Verifica se o topo do Tie Fighter é menor que a parte de baixo do projetil
                colisaoNaveInimiga.bottom > colisaoDisparo.top                                // Verifica se a parte de baixo do Tie Fighter é maior que o topo do projetil
            ) {
                vidaAtuaTieFighter--;                                                         // Diminui 1 ponto para cada projetil que acertar o Tie Fighter
                pontosScore += 10;                                                            // Adiciona 10 pontos na pontuação para cada acerto no Tie Fighter
                pontos.innerText = `Pontos: ${pontosScore}`;                                  // Atualiza a pontuação no menu
                disparo.remove();                                                             // Remove o projetil do cenario
                if (vidaAtuaTieFighter <= 0) {                                                // Se a vida do Tie Fighter chegar a 0
                    countNavesDestruidas++;                                                   // Incrementa o contador de naves destruídas
                    velocidadeTieFighter += 0.5;                                              // Aumenta a velocidade dos Tie Fighters
                    velocidadeXWing += 0.1;                                                   // Aumenta a velocidade do X-Wing
                    velRotacaoXWing += 0.1;                                                   // Aumenta a velocidade de rotação do X-Wing
                    if (velocidadeXWing >= velocidadeMaximaXWing) {                           // Verifica se a velocidade do X-Wing ultrapassou os limites
                        velocidadeXWing = velocidadeMaximaXWing;                              // Limita a velocidade máxima do X-Wing
                    }
                    if (velRotacaoXWing >= velMaximaRotacaoXWing) {                           // Verifica se a velocidade de rotação do X-Wing ultrapassou os limites
                        velRotacaoXWing = velMaximaRotacaoXWing;                              // Limita a velocidade máxima de rotação do X-Wing
                    }
                    if (velocidadeTieFighter >= velocidadeMaximaTieFighter) {                 // Verifica se a velocidade do Tie Fighter ultrapassou os limites
                        velocidadeTieFighter = velocidadeMaximaTieFighter;                    // Limita a velocidade máxima dos Tie Fighters
                    }
                    if (quantidadeTieFighters > quantidadeMaximaTieFighters) {                    // Limita o tempo mínimo de criação dos Tie Fighters
                        quantidadeTieFighters -= 100;                                             // Diminui o tempo de criação dos Tie Fighters
                        clearInterval(iniciaNavesInimigas);                                       // Limpa o intervalo atual
                        iniciaNavesInimigas = setInterval(navesInimigas, quantidadeTieFighters);  // Reinicia o intervalo com o novo tempo  
                    }
                    if (anguloTieFighter < anguloMaximo) {                                        // Limita o ângulo máximo de ataque dos Tie Fighters
                        anguloTieFighter += 5;                                                    // Aumenta o ângulo máximo em 5 graus
                    }
                    countInimigosDestruidos++;           // Variavel contadora para monitorar inimigos derrotados para aumentar pontos de vida
                    if (countInimigosDestruidos >= 5) {  // Se derrotar 5 inimigos
                        pontosVida += 10;                // Ganha mais 10 pontos de vida
                        countInimigosDestruidos = 0;     // Zera a contagem
                    }
                    pontosScore += 100;                                   // Adiciona 100 pontos na pontuação para cada Tie Fighter destruído
                    pontos.innerText = `Pontos: ${pontosScore}`;          // Atualiza a pontuação no menu
                    // Construindo o efeito de explosão
                    const explosao = document.createElement("div");       // Cria um elemento div, que vai ser a explosão
                    explosao.className = "explosao";                      // Adiciona a classe da explosão para aplicar o estilo
                    explosao.style.left = colisaoNaveInimiga.left + "px"; // Pega a posição horizontal do Tie Fighter
                    explosao.style.top = colisaoNaveInimiga.top + "px";   // Pega a posição vertical do Tie Fighter
                    cenario.appendChild(explosao);                        // Adiciona a explosão ao cenario
                    somExplosaoNaves();                              // Chama o audio de explosão do Tie Fighter
                    navesInimiga.remove();                                // Remove o Tie Fighter do cenario
                    setTimeout(() => {                                    // Depois de 500 milissegundos
                        explosao.remove();                                // Remove a explosão
                    }, 500);
                } else {
                    navesInimiga.setAttribute("data-vida", vidaAtuaTieFighter); // Atualiza a vida do Tie Fighter
                }
                showEstatisticas(); // Atualiza as estatísticas do jogo
            }
        })
    });
}

const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
function somAcelerandoXWing() {
    const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
    audioAcelerandoXWing.volume = 0.3;
    audioAcelerandoXWing.play();
    /*
    audio.addEventListener("ended", () => { // Quando o audio terminar, chama a função somVoandoXWing
        somVoandoXWing();                   // Toca o som do X-Wing voando 
    });
    */
}
















function bossDeathStar() {
    // Para a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);       // Finaliza criação de naves inimigas
    clearInterval(iniciaProjeteisTieFighter); // Finaliza disparos dos Tie Fighters

    // Cria a div da Estrela da Morte
    const deathstar = document.createElement("div");
    deathstar.id = "estrela-da-morte";
    deathstar.className = "deathstar";
    deathstar.setAttribute("data-vida", vidaEstrelaDaMorte); // Vida inicial
    cenario.appendChild(deathstar);

    // Posição inicial (acima do cenário)
    let currentBottom = 100; // Começa fora da tela
    deathstar.style.bottom = currentBottom + "%";

    // Velocidade de descida (ex.: 100 pixels por segundo)
    const speed = 20;
    let lastTime = null;

    // Função de animação
    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = (timestamp - lastTime) / 1000; // Tempo em segundos
        lastTime = timestamp;

        // Move a Estrela da Morte para baixo
        currentBottom -= speed * deltaTime;
        deathstar.style.bottom = currentBottom + "%";

        // Para a animação ao atingir o fundo do cenário
        if (currentBottom <= -5) {
            deathstar.style.bottom = "-5%"; // Fixa no topo do cenário
            return; // Para a animação
        }

        requestAnimationFrame(animate);
    }

    // Inicia a animação
    requestAnimationFrame(animate);

    // Opcional: Toca um som para a entrada da Estrela da Morte
    // somEstrelaDaMorte(); // Adicione se tiver um áudio
}



function bossDeathStar() {
    // Para a criação de Tie Fighters e seus disparos
    clearInterval(iniciaNavesInimigas);       // Finaliza criação de naves inimigas
    clearInterval(iniciaProjeteisTieFighter); // Finaliza disparos dos Tie Fighters
    audioTrilhaSonora.pause();                // Interrompe a trilha sonora principal
    setInterval(() => {                                           // Cria um atraso antes da Estrela da Morte Aparecer
        const deathstar = document.createElement("div");          // Cria um elemento div, que vai ser a Estrela-da-Morte
        deathstar.id = "estrela-da-morte";                        // Adiciona um id a Estrela-da-Morte
        deathstar.className = "deathstar";                        // Adiciona a classe da Estrela-da-Morte para aplicar o estilo
        deathstar.setAttribute("data-vida", vidaEstrelaDaMorte);  // Cria o atributo data-vida para armazenar a vida da Estrela-da-Morte
        cenario.insertAdjacentElement("afterbegin", deathstar);   // Adiciona a Estrela-da-Morte no início do cenario
        let posY = 100;                                           // posição inicial (fora da tela, em px)
        deathstar.style.bottom = posY + "%";                      // Define a posição vertical inicial da Estrela-da-Morte
        const intervalo = setInterval(() => {                     // Cria um intervalo para mover a Estrela-da-Morte
            if (estrelaDestruida == false) {                      // Se a Estrela-da-Morte não foi destruída
                posY -= 0.1;                                      // velocidade (quanto maior, mais rápido desce)
                deathstar.style.bottom = posY + "%";              // Atualiza a posição vertical da Estrela-da-Morte
                if (posY <= -5) {                                 // Se a Estrela-da-Morte chegar ao meio da tela
                    audioTrilhaSonoraEstrelaDaMorte.pause();      // Interrompe a trilha sonora da Estrela da Morte
                    deathstar.style.bottom = "-5%";               // Fixa no topo do cenário
                    clearInterval(intervalo);                     // para quando sair da tela
                    gameOver();                                   // Chama a função gameOver
                }
            }
        }, 20); // tempo em ms → quanto menor, mais suave
    }, 1000);   // 8000 Tempo para aguardar a estrela da Morte Aparecer
}



function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil -= velocidadeProjetilXWing;  // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (tiros[i].style.top > 2000) {            // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario
                xwingSaindo();  
            }
        }
    }
}












// Função para criar os projeteis do Tie Fighter
const criarProjeteisTieFighter = (tieFighter) => {
    const posicaoLeftTiro = parseFloat(tieFighter.style.left); // Pega a posição horizontal atual do Tie Fighter
    const posicaoTopTiro = parseFloat(tieFighter.style.top);   // Pega a posição vertical atual do Tie Fighter
    const centerX = posicaoLeftTiro + larguraTieFighter / 2;   // Centro X do Tie Fighter
    const centerY = posicaoTopTiro + alturaTieFighter / 2;     // Centro Y do Tie Fighter
    // Cria dois elementos de disparo, um de cada lado do Tie Fighter
    // projetil do lado esquerdo
    const tiroEsquerdo = document.createElement("div");   // Cria um elemento div, que vai ser o projetil
    tiroEsquerdo.className = "projetil_tie-fighter";      // Adiciona a classe do projetil para aplicar o estilo
    tiroEsquerdo.style.left = centerX + 5 + "px";         // Define a posição horizontal do projetil referente a posição central horizontal do Tie Fighter
    tiroEsquerdo.style.top = centerY + 0 + "px";         // Define a posição vertical do projetil referente a posição central vertical do Tie Fighter
    cenario.appendChild(tiroEsquerdo);                    // Adiciona o projetil ao cenario
    // projetil do lado direito
    const tiroDireito = document.createElement("div");
    tiroDireito.className = "projetil_tie-fighter";
    tiroDireito.style.left = centerX - 10 + "px";
    tiroDireito.style.top = centerY + 0 + "px";
    cenario.appendChild(tiroDireito);
}

// Função para atirar
function atirarTieFighters() {
    const tieFighters = document.querySelectorAll(".tie_fighter"); // Seleciona todos os elementos com a classe tie_fighter, ou seja, todos os Tie Fighters
    const quantidadeInimigos = tieFighters.length;                 // Pega a quantidade de Tie Fighters
    if (quantidadeInimigos === 0) return;                          // Se não houver Tie Fighters, sai da função

    // Decide quantos TIEs vão atirar
    let disparos = 1;                                                           // Por padrão, 1 TIE atira
    if (quantidadeInimigos > 3 && quantidadeInimigos <= 6) disparos = 2;        // Se houver entre 4 e 6 TIEs, 2 atiram
    else if (quantidadeInimigos > 6 && quantidadeInimigos <= 9) disparos = 3;   // Se houver entre 7 e 9 TIEs, 3 atiram
    else if (quantidadeInimigos > 9 && quantidadeInimigos <= 12) disparos = 4;  // Se houver entre 10 e 12 TIEs, 4 atiram
    else if (quantidadeInimigos > 12 && quantidadeInimigos <= 15) disparos = 5; // Se houver entre 13 e 15 TIEs, 5 atiram

    // Sorteia e faz disparos
    for (let i = 0; i < disparos; i++) {                                  // Para cada disparo
        const aleatorio = Math.floor(Math.random() * quantidadeInimigos);   // Sorteia um índice aleatório entre 0 e quantidadeInimigos-1
        const tieEscolhido = tieFighters[aleatorio];                        // Seleciona o Tie Fighter sorteado
        if (!tieEscolhido) continue;                                        // Se o Tie Fighter não existir (pode ter sido destruído), pula para o próximo
        criarProjeteisTieFighter(tieEscolhido);                             // Chama a função para criar os projeteis do Tie Fighter sorteado
        somCanhoesTieFighter();                                             // Toca o som dos canhões do Tie Fighter
    }
}


// Função para mover os projeteis do Fighter
function moverProjeteisTieFighter() {
    const tiros = document.querySelectorAll(".projetil_tie-fighter"); // Seleciona todos os elementos com a classe projetil_x-wing, ou seja, todos os projeteis
    for (let i = 0; i < tiros.length; i++) {                     // Percorre todos os projeteis
        if (tiros[i]) {                                          // Verifica se o projetil existe
            let posicaoTopProjetil = tiros[i].offsetTop;         // Pega a posição vertical atual do projetil
            posicaoTopProjetil += velocidadeProjetilTieFighter;            // Atualiza a posição vertical do projetil, subtraindo a velocidade do projetil. Equação para mover para cima
            tiros[i].style.top = posicaoTopProjetil + "px";      // Atualiza a posição do projetil no cenario
            if (posicaoTopProjetil > alturaCenario) {            // Se o projetil sair do cenario (posição menor que -10)
                tiros[i].remove();                               // Remove o projetil do cenario          
            }
        }
    }
}