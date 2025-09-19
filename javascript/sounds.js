/*------------------------------- EFEITOS SONOROS -------------------------------*/
const audioTrilhaSonora = new Audio('../audios/soundtrack.MP3'); // Audio X-Wing voando
function trilhaSonora() {
    audioTrilhaSonora.volume = 0.5;
    audioTrilhaSonora.loop = true; // Configura para tocar ininterruptamente
    audioTrilhaSonora.play();
}

const audioTrilhaSonoraEstrelaDaMorte = new Audio('../audios/deathstar_suite.MP3'); // Audio tiro de canhoes X-Wing
function trilhaSonoraEstrelaDaMorte() {
    audioTrilhaSonoraEstrelaDaMorte.volume = 1;
    audioTrilhaSonoraEstrelaDaMorte.play();
}

function somCanhoesXWing() {
    const audio = new Audio('../audios/x-wing_cannons-2.m4a'); // Audio tiro de canhoes X-Wing
    audio.volume = 0.3;    // volume de 0 a 1
    audio.currentTime = 0; // volta pro início
    audio.play();          // toca o audio
}

function somCanhoesXWingProtons() {
    const audio = new Audio('../audios/x-wing_cannons_protons.mp3'); // Audio tiro de canhoes X-Wing
    audio.volume = 1;    // volume de 0 a 1
    audio.currentTime = 0; // volta pro início
    audio.play();          // toca o audio
}

const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
function somAcelerandoXWing() {
    const audioAcelerandoXWing = new Audio('../audios/x-wing_accelerate.m4a'); // Audio X-Wing acelerando
    audioAcelerandoXWing.volume = 0.3;
    audioAcelerandoXWing.play();
}

const audioVoandoXWing = new Audio('../audios/x-wing_flying.m4a'); // Audio X-Wing voando
function somVoandoXWing() {
    audioVoandoXWing.volume = 0.3;
    audioVoandoXWing.loop = true; // Configura para tocar ininterruptamente
    audioVoandoXWing.play();
}

function somExplosaoNaves() {
    const audio = new Audio('../audios/tie-fighter_explosion.m4a'); // Audio de explosão
    audio.currentTime = 0; // volta pro início
    audio.volume = 0.3;
    audio.play();
}

function somExplosaoEstrelaDaMorte() {
    const audio = new Audio('../audios/explosion_deathstar.mp3'); // Audio de explosão
    //audio.volume = 1;
    audio.play();
}

function somVoandoTieFighter() {
    // Lista dos áudios possíveis
    const audios = [
        '../audios/tie-fighter_flying_1.m4a',
        '../audios/tie-fighter_flying_2.m4a',
        '../audios/tie-fighter_flying_3.m4a',
        '../audios/tie-fighter_flying_4.m4a',
        '../audios/tie-fighter_flying_5.m4a'
    ];
    const randomIndex = Math.floor(Math.random() * audios.length); // Sorteia índice aleatório entre 0 e 4
    const audio = new Audio(audios[randomIndex]); // Cria instância do áudio escolhido
    // Configurações
    audio.volume = 0.3; // Volume do audio
    audio.currentTime = 0; // volta pro início
    audio.play(); // Executa
}

function somCanhoesTieFighter() {
    const audio = new Audio('../audios/tie-fighter_cannon.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 0.2;     // volume de 0 a 1
    audio.currentTime = 0;  // volta pro início
    audio.play();           // toca o audio
}

function somSinalObiWan() {
    const audio = new Audio('../audios/use_a_forca_luke.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 1;     // volume de 0 a 1
    audio.play();         // toca o audio
}

function somVitoria() {
    const audio = new Audio('../audios/victory_theme.mp3'); // Audio tiro de canhoes Tie-Fighter
    audio.volume = 1;     // volume de 0 a 1
    audio.play();         // toca o audio
}