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
    if (document.documentElement.requestFullscreen) {                                                                   // Verifica se o navegador suporta a API de tela cheia.
        document.documentElement.requestFullscreen().then(() => {                                                       // Solicita que o documento entre em modo de tela cheia e aguarda a promessa ser resolvida.
            if (screen.orientation && screen.orientation.lock) {                                                        // Após entrar em tela cheia, verifica se a API de orientação de tela e o método de trava são suportados.
                screen.orientation.lock('landscape').catch(err => console.error("Falha ao travar a orientação:", err)); // Tenta travar a orientação da tela para paisagem e captura qualquer erro.
            }   
        }).catch(err => console.error("Falha ao entrar em tela cheia:", err));                                          // Captura e exibe no console qualquer erro que ocorra ao tentar entrar em tela cheia.
    } 
}
