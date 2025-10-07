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
        // Adiciona um listener para o primeiro toque na tela para entrar em modo imersivo.
        //alert("Para melhor experiência, adicione este site à tela inicial!");
        window.addEventListener('touchstart', () => {
            const leituraToque = setInterval(() => {
                clearInterval(leituraToque);
                ativarModoImersivo();
            }, 10);
        }), { once: true };
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

/**
 * Tenta colocar o jogo em tela cheia e travar a orientação para paisagem.
 * Ideal para ser chamado por uma interação do usuário em dispositivos móveis.
 */
function ativarModoImersivo() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(err => console.error("Falha ao travar a orientação:", err));
            }
        }).catch(err => console.error("Falha ao entrar em tela cheia:", err));
    }
}
