window.onload = function () {
    if (isPWA()) {
        console.log("Rodando como PWA ✅");
    } else {
        console.log("Rodando no navegador 🌐");
    }

    if (isMobile()) {
        console.log("Dispositivo móvel detectado 📱");
    } else {
        console.log("Desktop detectado 💻");
    }

    if (isMobile() && !isPWA()) {
        console.log("Navegador móvel detectado 🌐");
        // Aqui você pode pedir para o usuário instalar o PWA
        //alert("Para melhor experiência, adicione este site à tela inicial!");
        // Tenta bloquear a orientação para paisagem
        if (confirm("Para melhor experiência, adicione este site à tela inicial!")) {
            if (window.screen && screen.orientation && screen.orientation.lock) lockOrientation();         // Tenta bloquear a orientação para paisagem
        }

    } else if (isMobile() && isPWA()) {
        console.log("App PWA em execução 📲");
        // Aqui você pode travar orientação ou iniciar fullscreen
    } else {
        console.log("Executando em desktop 💻");
    }

    console.log('Modo de exibição atual:', window.matchMedia('(display-mode: standalone)').matches
        ? 'standalone'
        : 'browser');
}

function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


// Define uma função assíncrona para poder usar 'await' para esperar por ações.
async function lockOrientation() {
    try {                                                                                          // Inicia um bloco 'try' para capturar erros que possam ocorrer ao tentar entrar em tela cheia ou bloquear a orientação.
        // Primeiro, tentamos entrar em tela cheia. É um requisito para o bloqueio de orientação na maioria dos navegadores.
        if (document.documentElement.requestFullscreen) {                                          // Verifica se o método padrão 'requestFullscreen' existe.
            await document.documentElement.requestFullscreen();                                    // Solicita o modo de tela cheia e espera a operação ser concluída.
        } else if (document.documentElement.mozRequestFullScreen) {                                // Firefox  // Se não, verifica a versão para Firefox.
            await document.documentElement.mozRequestFullScreen();                                 // Solicita tela cheia no Firefox e espera.
        } else if (document.documentElement.webkitRequestFullscreen) {                             // Chrome, Safari & Opera  // Se não, verifica a versão para Chrome, Safari e Opera.
            await document.documentElement.webkitRequestFullscreen();                              // Solicita tela cheia nesses navegadores e espera.
        } else if (document.documentElement.msRequestFullscreen) {                                 // IE/Edge  // Se não, verifica a versão para IE/Edge.
            await document.documentElement.msRequestFullscreen();                                  // Solicita tela cheia no IE/Edge e espera.
        }
        // Depois de entrar em tela cheia com sucesso, bloqueamos a orientação.
        await screen.orientation.lock('landscape');                                                // Tenta travar a orientação da tela no modo paisagem ('landscape') e espera.
    } catch (error) {                                                                              // Se qualquer uma das solicitações ('await') falhar, o código dentro do 'catch' é executado.
        console.error("Não foi possível bloquear a orientação da tela:", error);                   // Exibe uma mensagem de erro no console do navegador.
    }
}