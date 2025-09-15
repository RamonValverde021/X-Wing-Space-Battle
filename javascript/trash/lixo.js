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