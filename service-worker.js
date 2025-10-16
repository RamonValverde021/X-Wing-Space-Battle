// IMPORTANTE: Mude a versão (v2, v3, etc.) a cada nova atualização!
const CACHE_NAME = "x-wing-space-battle-v2"; // Define o nome e a versão do cache para fácil gerenciamento e atualização.
const arquivosParaCache = [ // Lista de todos os arquivos (assets) que devem ser armazenados em cache para funcionamento offline.
  // Arquivos Principais
  "./",
  "./index.html",
  "./html/intro.html",
  "./html/game.html",
  "./html/manualControles.html",
  "./html/feedback.html",
  "./html/obrigado.html", 
  "./manifest.json",      // Certifique-se que este arquivo está na raiz do projeto
  "./service-worker.js",  // Certifique-se que este arquivo está na raiz do projeto

  // CSS
  "./css/styles.css",
  "./css/smartphone-size.css",
  "./css/gamepad-smartphone.css",
  "./css/manualControles.css",
  "./css/feedback.css",

  // JavaScript
  "./javascript/script.js",
  "./javascript/game.js",
  "./javascript/x-wing.js",
  "./javascript/tie-fighter.js",
  "./javascript/death-star.js",
  "./javascript/darth-vader.js",
  "./javascript/visual-effects.js",
  "./javascript/sounds-effects.js",
  "./javascript/controls.js",
  "./javascript/victory.js",
  "./javascript/specials-itens.js",

  // Fontes
  "./font/ARCADECLASSIC.TTF",

  // Imagens e Vídeos
  "./images/Intro_X-Wing_Space_Battle.png",
  "./images/Intro_X-Wing_Space_Battle.mp4",
  "./images/icon-192.png",
  "./images/icon-512.png",
  "./images/stormtropper.png",
  "./images/space/space_1.gif",
  "./images/x-wing/x-wing_1.png",
  "./images/x-wing/x-wing_1-2.png",
  "./images/tie_fighter/tie_fighter_1.png",
  "./images/tie_fighter/vader_fighter.png",
  "./images/explosion/explosion_1.gif",
  "./images/background_2.png",
  "./images/deathstar/deathstar-1.png",
  "./images/special/special-1.png",
  "./images/special/special-2.png",
  "./images/special/special-3.png",
  "./images/special/special-4.png",
  "./images/meia_volta.png",
  "./images/giro_antihorario.png",
  "./images/giro_horario.png",

  // Áudios
  "./audios/forca_sempre_com_vc.mp3",
  "./audios/soundtrack-2.mp3",
  "./audios/deathstar_suite-2.mp3",
  "./audios/x-wing_cannons-2.mp3",
  "./audios/x-wing_cannons_protons.mp3",
  "./audios/x-wing_accelerate.mp3",
  "./audios/x-wing_flying.mp3",
  "./audios/tie-fighter_explosion.mp3",
  "./audios/explosion_deathstar.mp3",
  "./audios/tie-fighter_flying_1.mp3",
  "./audios/tie-fighter_flying_2.mp3",
  "./audios/tie-fighter_flying_3.mp3",
  "./audios/tie-fighter_flying_4.mp3",
  "./audios/tie-fighter_flying_5.mp3",
  "./audios/tie-fighter_cannon.mp3",
  "./audios/tiro_punicao.mp3",
  "./audios/use_a_forca_luke.mp3",
  "./audios/victory_theme.mp3",
  "./audios/toasty_sound.mp3",
  "./audios/risada_palpatine.mp3",
  "./audios/darth-vader-voando.mp3",
  "./audios/darth-vader-audio-1.mp3",
  "./audios/darth-vader-audio-2.mp3",
  "./audios/darth-vader-audio-3.mp3",
  "./audios/darth-vader-audio-4.mp3",
  "./audios/darth-vader-audio-5.mp3",
  "./audios/darth-vader-audio-6.mp3",
  "./audios/shot_death_star-1.mp3",
  "./audios/shot_death_star-2.mp3",
  "./audios/shot_death_star-3.mp3",
  "./audios/shot_death_star-4.mp3",
  "./audios/special-item-1.mp3",
  "./audios/special-item-2.mp3",
  "./audios/special-item-3.mp3",
  "./audios/star-wars-full-power.mp3",
  "./audios/R2D2.mp3"
];

self.addEventListener("install", (event) => {                                          // Adiciona um ouvinte para o evento 'install', que é disparado quando o SW é instalado pela primeira vez.
  console.log("SW: Evento de instalação iniciado.");                                   // Log para depuração, informa que a instalação começou.
  event.waitUntil(                                                                     // Garante que o SW não prossiga para a fase de ativação até que o código dentro dele seja concluído.
    (async () => {                                                                     // Usa uma função assíncrona para poder usar 'await'.
      const cache = await caches.open(CACHE_NAME);                                     // Abre o cache com o nome definido. Se não existir, ele é criado.
      console.log("SW: Cache aberto. Iniciando cache de arquivos.");                   // Log para depuração.

      const totalFiles = arquivosParaCache.length;                                     // Obtém o número total de arquivos a serem cacheados.
      let cachedFiles = 0;                                                             // Inicializa um contador para os arquivos já cacheados.

      for (const file of arquivosParaCache) {                                          // Itera sobre cada arquivo na lista 'arquivosParaCache'.
        try { // Tenta executar o código de cacheamento.
          await cache.add(file);                                                       // Adiciona o arquivo atual ao cache. O SW faz a requisição e armazena a resposta.
          cachedFiles++;                                                               // Incrementa o contador de arquivos cacheados com sucesso.
          // Envia o progresso para a página
          const clients = await self.clients.matchAll({ includeUncontrolled: true });  // Obtém uma lista de todos os clientes (abas) controlados por este SW.
          clients.forEach(client => {                                                  // Itera sobre cada cliente.
            client.postMessage({ type: 'CACHE_PROGRESS', payload: { total: totalFiles, current: cachedFiles } }); // Envia uma mensagem para o cliente com o progresso do cache.
          });
        } catch (err) {                                                                // Se ocorrer um erro ao tentar cachear um arquivo.
          console.error(`SW: Falha ao cachear o arquivo: ${file}`, err);               // Exibe uma mensagem de erro detalhada no console.
        }
      }

      console.log("SW: Todos os arquivos foram processados.");                         // Log para informar que o processo de cacheamento terminou.
    })()
  );
});

self.addEventListener("activate", (event) => {                                         // Adiciona um ouvinte para o evento 'activate', que é disparado após a instalação de um novo SW.
  console.log("SW: Evento de ativação iniciado.");                                     // Log para depuração.
  event.waitUntil(                                                                     // Garante que o SW espere a limpeza do cache antigo antes de se tornar totalmente ativo.
    (async () => {                                                                     // Usa uma função assíncrona para poder usar 'await'.
      const cacheNames = await caches.keys();                                          // Pega uma lista com os nomes de todos os caches existentes.
      await Promise.all(                                                               // Espera que todas as promessas de exclusão de cache sejam resolvidas.
        cacheNames
          .filter((name) => {                                                          // Filtra a lista de nomes de cache.
            // Retorna 'true' para os caches que NÃO são o cache atual, marcando-os para exclusão.
            return name !== CACHE_NAME;
          })
          .map((name) => {                                                             // Para cada nome de cache antigo...
            // Deleta o cache antigo.
            console.log(`SW: Deletando cache antigo: ${name}`);                        // Log para informar qual cache está sendo deletado.
            return caches.delete(name);
          })
      );
    })()
  );
});

self.addEventListener("fetch", (event) => {                                            // Adiciona um ouvinte para o evento 'fetch', que intercepta todas as requisições de rede da página.
  event.respondWith(                                                                   // Diz ao navegador que vamos fornecer nossa própria resposta para a requisição.
    caches.match(event.request).then((response) => {                                   // Tenta encontrar uma resposta correspondente à requisição no cache.
      return response || fetch(event.request);                                         // Se uma resposta for encontrada no cache (response), a retorna. Senão, faz a requisição à rede (fetch).
    })
  );
});