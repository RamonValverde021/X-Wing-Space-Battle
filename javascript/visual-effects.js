/*------------------------------- EFEITOS VISUAIS -------------------------------*/
// Inica a contagem de tempo da Gameplay
function contagemTempoGameplay() {
    tempoTotalSegundos++;                                                       // Incrementa o contador de segundos a cada chamada (que ocorre a cada segundo)
    const minutos = Math.floor(tempoTotalSegundos / 60);                        // Calcula os minutos dividindo o total de segundos por 60 e arredondando para baixo.
    const segundos = tempoTotalSegundos % 60;                                   // Calcula os segundos restantes usando o operador de módulo (resto da divisão).
    // Formata os minutos e segundos para que sempre tenham dois dígitos, 
    // adicionando um '0' à esquerda se necessário.
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundos).padStart(2, '0');
    tempoJogo.innerText = `Tempo: ${minutosFormatados}:${segundosFormatados}`;  // Atualiza o texto do elemento no HTML com o tempo formatado.
}


// Inicia a movimentação do cenário via JavaScript
    function moverCenario() {
        // A variável 'velocidadeCenario' funciona de forma inversa: quanto menor o seu valor, maior será o 'incremento', resultando em um movimento mais rápido do cenário.
        // O número 100 é um fator de escala para que a velocidade pareça adequada ao jogo.
        const incremento = 100 / velocidadeCenario;                      // Calcula o quanto o fundo deve se mover neste quadro da animação. 
        backgroundPositionY += incremento;                               // Acumula o valor do incremento na posição Y total do fundo.
        cenario.style.backgroundPositionY = `${backgroundPositionY}px`;  // Aplica a nova posição vertical (backgroundPositionY) ao estilo CSS do elemento 'cenario'.
    }

// Efeito de nave explodindo
function explosaoNaves(nave) {
    const posicaoNave = nave.getBoundingClientRect();       // Pega as coordenadas da nave
    const explosao = document.createElement("div");         // Cria um elemento div, que vai ser a explosão
    explosao.className = "explosao";                        // Adiciona a classe da explosão para aplicar o estilo
    explosao.style.left = posicaoNave.left + "px";          // Pega a posição horizontal da nave
    explosao.style.top = posicaoNave.top + "px";            // Pega a posição vertical da nave
    cenario.appendChild(explosao);                          // Adiciona a explosão ao cenario
    somExplosaoNaves();                                     // Chama o audio de explosão da nave
    setTimeout(() => {                                      // Depois de 500 milissegundos
        explosao.remove();                                  // Remove a explosão
    }, 500);
}

// Efeito Toasty
let ultimaVez = 0;                                          // guarda quando o toast foi exibido
const intervalo = 10000;                                    // intervalo mínimo (10 segundos)
function mostrarToasty() {                                  // função para mostrar o toast
    const agora = Date.now();                               // tempo atual em ms
    if (agora - ultimaVez < intervalo) {                    // se foi exibido recentemente
        // ainda dentro do intervalo, não mostra
        return;                                             // sai da função
    }
    ultimaVez = agora;                                      // atualiza o último tempo
    const toast = document.getElementById("stormtropper");  // Pega o objeto que será o toast
    toast.classList.add("show");                            // Adiciona a classe show para exibir o toast
    const audio = new Audio('../audios/toasty_sound.mp3');  // Audio do Toasty
    audio.volume = 1;                                       // Define o volume do audio
    audio.play();                                           // Toca o audio
    setTimeout(() => {                                      // Depois de 1 segundo
        toast.classList.remove("show");                     // Remove a classe show para esconder o toast
    }, 1000);                                               // visível por 1s
}

// Atualizar o menu do jogo
function atualizarMenu() {
    vida.innerText = `Vida: ${pontosVida}%`;                // Atualiza a vida no menu
    pontos.innerText = `Pontos: ${pontosScore}`;            // Atualiza a pontuação no menu
}

// Atualizando as estatisticas do jogo
function showEstatisticas() {
    dadosVelXWing.innerText = `Vel. X-Wing: ${velocidadeXWing.toFixed(2)}`;                               // Atualiza no painel a velocidade do X-Wing no menu
    dadosVelRotXWing.innerText = `Vel. Rotacao X-Wing: ${velRotacaoXWing.toFixed(2)}`;                    // Atualiza no painel a velocidade de rotação do X-Wing no menu
    dadosVelTieFighter.innerText = `Vel. Tie-Fighter: ${velocidadeTieFighter.toFixed(2)}`;                // Atualiza no painel a velocidade do Tie-Fighter no menu
    dadosAnguloTieFighter.innerText = `Angulo Tie-Fighter: ${anguloAtaqueTieFighter}°`;                   // Atualiza no painel o ângulo de ataque dos Tie-Fighter no menu
    dadosVelConstrucaoTieFighter.innerText = `Vel. Constr. Tie-Fighter: ${quantidadeTieFighters} ms`;     // Atualiza no painel a velocidade de construção dos Tie-Fighter no menu
    dadosInimigosDestruidos.innerText = `Inimigos Destruidos: ${countNavesDestruidas}`;                   // Atualiza no painel a quantidade de inimigos destruídos no menu
    dadosVidaEstrelaDaMorte.innerText = `Estrela da Morte: ${vidaEstrelaDaMorte}`;                        // Atualiza no painel a vida da Estrela da Morte no menu
    dadosTempoParado.innerText = `Tempo Parado: ${tempoParado / 1000} s`;                                 // Atualiza no painel o tempo em que o X-Wing está parado
}