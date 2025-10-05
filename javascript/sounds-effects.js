/*------------------------------- EFEITOS SONOROS -------------------------------*/
const audioTrilhaSonora = new Audio('../audios/soundtrack-2.mp3');  // Audio da trilha sonora principal do jogo
function trilhaSonora() {
    audioTrilhaSonora.volume = 0.2;
    audioTrilhaSonora.loop = true; // Configura para tocar ininterruptamente
    audioTrilhaSonora.play();
}

const audioTrilhaSonoraDarthVader = new Audio('../audios/deathstar_suite-2.mp3');  // Audio da trilha sonora do boss Estrela da Morte
function trilhaSonoraDarthVader() {
    audioTrilhaSonoraDarthVader.volume = 0.1;
    audioTrilhaSonoraDarthVader.play();
}

const audioTrilhaSonoraEstrelaDaMorte = new Audio('../audios/deathstar_suite-2.mp3');  // Audio da trilha sonora do boss Estrela da Morte
function trilhaSonoraEstrelaDaMorte() {
    audioTrilhaSonoraEstrelaDaMorte.volume = 0.1;
    audioTrilhaSonoraEstrelaDaMorte.play();
}

function somCanhoesXWing() {
    const audio = new Audio('../audios/x-wing_cannons-2.mp3');  // Audio do tiro de canhões comuns do X-Wing
    audio.volume = 0.1;     // volume de 0 a 1
    audio.currentTime = 0;  // volta pro início
    audio.play();           // toca o audio
}

function somCanhoesXWingProtons() {
    const audio = new Audio('../audios/x-wing_cannons_protons.mp3');  // Audio do tiro de canhões de protons do X-Wing
    audio.volume = 0.5;       // volume de 0 a 1
    audio.currentTime = 0;  // volta pro início
    audio.play();           // toca o audio
}

const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.mp3');  // Audio do X-Wing acelerando
function somAcelerandoXWing() {
    audioAcelerandoXWing.volume = 0.2;
    audioAcelerandoXWing.play();
}

audioAcelerandoXWing.addEventListener("ended", () => {  // Quando o audio de aceleração do X-Wing terminar
    somVoandoXWing();                                   // Inicia o audio de voo do X-Wing 
});

const audioVoandoXWing = new Audio('../audios/x-wing_flying.mp3');  // Audio do X-Wing voando
function somVoandoXWing() {
    audioVoandoXWing.volume = 0.1;
    audioVoandoXWing.loop = true;  // Configura para tocar ininterruptamente
    audioVoandoXWing.play();
}

function somExplosaoNaves() {
    const audio = new Audio('../audios/tie-fighter_explosion.mp3');  // Audio de explosão das naves
    audio.currentTime = 0; // volta pro início
    audio.volume = 0.1;
    audio.play();
}

function somExplosaoEstrelaDaMorte() {
    const audio = new Audio('../audios/explosion_deathstar.mp3');   // Audio de explosão da Estrela Da Morte
    audio.volume = 0.5;
    audio.play();
}

function somVoandoTieFighter() {
    const audios = [                                                // Lista dos áudios de voo dos Tie-Fighters
        '../audios/tie-fighter_flying_1.mp3',
        '../audios/tie-fighter_flying_2.mp3',
        '../audios/tie-fighter_flying_3.mp3',
        '../audios/tie-fighter_flying_4.mp3',
        '../audios/tie-fighter_flying_5.mp3'
    ];
    const randomIndex = Math.floor(Math.random() * audios.length);  // Sorteia índice aleatório entre 0 e 4
    const audio = new Audio(audios[randomIndex]);                   // Cria instância do áudio escolhido
    audio.volume = 0.1;                                             // Volume do audio em 30%
    audio.currentTime = 0;                                          // Volta pro início do audio
    audio.play();                                                   // Toca o audio
}

function somCanhoesTieFighter() {
    const audio = new Audio('../audios/tie-fighter_cannon.mp3');    // Audio do tiro de canhões do Tie-Fighter
    audio.volume = 0.1;                                             // Volume do audio em 20%
    audio.currentTime = 0;                                          // Volta pro início do audio
    audio.play();                                                   // Toca o audio
}

function somTiroPunicao() {
    const audio = new Audio('../audios/tiro_punicao.mp3');
    audio.volume = 0.3;
    audio.currentTime = 0;
    audio.play();
}

function somCanhoesEstrelaDaMorte() {
    const audios = [
        '../audios/shot_death_star-1.mp3',
        '../audios/shot_death_star-2.mp3',
        '../audios/shot_death_star-3.mp3',
        '../audios/shot_death_star-4.mp3'
    ];
    const randomIndex = Math.floor(Math.random() * audios.length);
    const audio = new Audio(audios[randomIndex]);
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play()
}

function somSinalObiWan() {
    const audio = new Audio('../audios/use_a_forca_luke.mp3');      // Audio da mensagem de voz do Obi-Wan
    audio.volume = 0.8;                                               // Volume do audio em 100%
    audio.play();                                                   // Toca o audio
}

function somVitoria() {
    const audio = new Audio('../audios/victory_theme.mp3');         // Trilha sonora de vitoria do jogo
    audio.volume = 0.6;                                               // Volume do audio em 100%
    audio.play();                                                   // Toca o audio
}

function somItensEspeciais(item) {
    if (item == 1) {
        const audio = new Audio('../audios/special-item-1.mp3');
        audio.volume = 0.2;
        audio.play();
    } else if (item == 2) {
        const audio = new Audio('../audios/special-item-2.mp3');
        audio.volume = 0.2;
        audio.play();
    } else if (item == 3) {
        const audio = new Audio('../audios/star-wars-full-power.mp3');
        audio.volume = 0.2;
        audio.play();
    } else if (item == 4) {
        const audio = new Audio('../audios/R2D2.mp3');
        audio.volume = 0.2;
        audio.play();
    } else if (item == 5) {
        const audio = new Audio('../audios/special-item-3.mp3');
        audio.volume = 0.2;
        audio.play();
    }
}


const audioVoandoDarthVader = new Audio('../audios/darth-vader-voando.mp3');  // Audio do X-Wing voando
function somVoandoDarthVader() {
    audioVoandoDarthVader.volume = 0.1;
    audioVoandoDarthVader.loop = true;  // Configura para tocar ininterruptamente
    audioVoandoDarthVader.play();
}

let ultimoIndiceDarthVader = -1; // Guarda o índice da última fala para evitar repetição.

function somDarthVader() {
    const audios = [
        '../audios/darth-vader-audio-1.mp3',
        '../audios/darth-vader-audio-2.mp3',
        '../audios/darth-vader-audio-3.mp3',
        '../audios/darth-vader-audio-4.mp3',
        '../audios/darth-vader-audio-5.mp3',
        '../audios/darth-vader-audio-6.mp3'
    ];
    let novoIndice;
    // Sorteia um novo índice até que seja diferente do último.
    do {
        novoIndice = Math.floor(Math.random() * audios.length);
    } while (audios.length > 1 && novoIndice === ultimoIndiceDarthVader);

    ultimoIndiceDarthVader = novoIndice; // Atualiza o último índice.
    const audio = new Audio(audios[novoIndice]);
    audio.volume = 1;
    audio.currentTime = 0;
    audio.play()
}
