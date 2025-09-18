/*------------------------------- EFEITOS VISUAIS -------------------------------*/
// Efeito de nave explodindo
function explosaonNaves(nave) {
    const posicaoNave = nave.getBoundingClientRect();   // Pega as coordenadas da nave
    const explosao = document.createElement("div");     // Cria um elemento div, que vai ser a explosão
    explosao.className = "explosao";                    // Adiciona a classe da explosão para aplicar o estilo
    explosao.style.left = posicaoNave.left + "px";      // Pega a posição horizontal da nave
    explosao.style.top = posicaoNave.top + "px";        // Pega a posição vertical da nave
    cenario.appendChild(explosao);                      // Adiciona a explosão ao cenario
    somExplosaoNaves();                            // Chama o audio de explosão da nave
    setTimeout(() => {                                  // Depois de 500 milissegundos
        explosao.remove();                              // Remove a explosão
    }, 500);
}

// Efeito Toasty
let ultimaVez = 0;       // guarda quando o toast foi exibido
const intervalo = 10000; // intervalo mínimo (10 segundos)
function mostrarToasty() {
    const agora = Date.now(); // tempo atual em ms
    if (agora - ultimaVez < intervalo) { // se foi exibido recentemente 
        // ainda dentro do intervalo, não mostra
        return;
    }
    ultimaVez = agora;                                      // atualiza o último tempo
    const toast = document.getElementById("stormtropper");  // Pega o objeto que será o toast
    toast.classList.add("show");                            // Adiciona a classe show para exibir o toast
    const audio = new Audio('../audios/toasty_sound.mp3');  // Audio do Toasty
    audio.volume = 0.6;                                     // Define o volume do audio
    audio.play();                                           // Toca o audio
    setTimeout(() => {                                      // Depois de 1 segundo
        toast.classList.remove("show");                     // Remove a classe show para esconder o toast
    }, 1000);                                               // visível por 1s
}

// Atualizar o menu do jogo
function atualizarMenu() {
    vida.innerText = `Vida: ${pontosVida}%`;     // Atualiza a vida no menu
    pontos.innerText = `Pontos: ${pontosScore}`; // Atualiza a pontuação no menu
}

// Atualizando as estatisticas do jogo
function showEstatisticas() {
    dadosVelXWing.innerText = `Vel. X-Wing: ${velocidadeXWing.toFixed(2)}`;
    dadosVelRotXWing.innerText = `Vel. Rotacao X-Wing: ${velRotacaoXWing.toFixed(2)}`;
    dadosVelTieFighter.innerText = `Vel. Tie-Fighter: ${velocidadeTieFighter.toFixed(2)}`;
    dadosAnguloTieFighter.innerText = `Angulo Tie-Fighter: ${anguloAtaqueTieFighter}°`;
    dadosVelConstrucaoTieFighter.innerText = `Vel. Constr. Tie-Fighter: ${quantidadeTieFighters} ms`;
    dadosInimigosDestruidos.innerText = `Inimigos Destruidos: ${countNavesDestruidas}`;
    dadosVidaEstrelaDaMorte.innerText = `Estrela da Morte: ${vidaEstrelaDaMorte}`;
}