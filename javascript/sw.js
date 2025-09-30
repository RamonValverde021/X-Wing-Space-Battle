const CACHE_NAME = "x-wing-battle-space-v1";
const arquivosParaCache = [
  // Arquivos Principais
  "../",
  "../index.html",
  "../html/game.html",
  "../html/manualControles.html",
  "../manifest.json",

  // CSS
  "../css/styles.css",
  "../css/phone.css",
  "../css/manualControles.css",

  // JavaScript
  "../javascript/script.js",
  "../javascript/x-wing.js",
  "../javascript/tie-fighter.js",
  "../javascript/death-star.js",
  "../javascript/darth-vader.js",
  "../javascript/visual-effects.js",
  "../javascript/sounds-effects.js",
  "../javascript/controls.js",
  "../javascript/victory.js",
  "../javascript/specials-itens.js",

  // Fontes
  "../font/ARCADECLASSIC.TTF",

  // Imagens e Vídeos
  "../images/Intro_X-Wing_Space_Battle.png",
  "../images/Intro_X-Wing_Space_Battle.mp4",
  "../images/background_2.png",
  "../images/icon-192.png",
  "../images/icon-512.png",
  "../images/stormtropper.png",
  "../images/space/space_1.gif",
  "../images/x-wing/x-wing_1.png",
  "../images/x-wing/x-wing_1-2.png",
  "../images/tie_fighter/tie_fighter_1.png",
  "../images/tie_fighter/vader_fighter.png",
  "../images/explosion/explosion_1.gif",
  "../images/deathstar/deathstar-1.png",
  "../images/special/special-1.png",
  "../images/special/special-2.png",
  "../images/special/special-3.png",
  "../images/special/special-4.png",

  // Áudios
  "../audios/forca_sempre_com_vc.mp3",
  "../audios/soundtrack.MP3",
  "../audios/deathstar_suite-2.MP3",
  "../audios/x-wing_cannons-2.m4a",
  "../audios/x-wing_cannons_protons.mp3",
  "../audios/x-wing_accelerate.m4a",
  "../audios/x-wing_flying.m4a",
  "../audios/tie-fighter_explosion.m4a",
  "../audios/explosion_deathstar.mp3",
  "../audios/tie-fighter_flying_1.m4a",
  "../audios/tie-fighter_flying_2.m4a",
  "../audios/tie-fighter_flying_3.m4a",
  "../audios/tie-fighter_flying_4.m4a",
  "../audios/tie-fighter_flying_5.m4a",
  "../audios/tie-fighter_cannon.mp3",
  "../audios/tiro_punicao.mp3",
  "../audios/use_a_forca_luke.mp3",
  "../audios/victory_theme.mp3",
  "../audios/toasty_sound.mp3",
  "../audios/risada_palpatine.MP3",
  "../audios/darth-vader-voando.mp3",
  "../audios/darth-vader-audio-1.mp3",
  "../audios/darth-vader-audio-2.mp3",
  "../audios/darth-vader-audio-3.mp3",
  "../audios/darth-vader-audio-4.mp3",
  "../audios/darth-vader-audio-5.mp3",
  "../audios/darth-vader-audio-6.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(arquivosParaCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});