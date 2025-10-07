window.onload = function () {

    if (isMobile()) {
        console.log("Dispositivo móvel detectado 📱");
    } else {
        console.log("Desktop detectado 💻");
    }

    if (isMobile()) {
        if (isPWA()) {
            console.log("App PWA em execução 📲");
            const dicaElement = document.getElementById("dica_modo");
            if (dicaElement) dicaElement.style.display = "none";
        } else {
            console.log("Navegador móvel detectado 🌐");
            const dicaElement = document.getElementById("dica_modo");
            if (dicaElement) dicaElement.style.display = "block";
        }
        // Tanto no PWA quanto no navegador móvel, uma interação do usuário é necessária
        // para garantir o modo imersivo. O botão "Iniciar Jogo" já chama `ativarModoImersivo`.
        // Este listener adicional serve como um "backup" para qualquer toque na tela.
        window.addEventListener('click', ativarModoImersivo, { once: true });
        window.addEventListener('touchstart', ativarModoImersivo, { once: true });
    } else {
        console.log("Executando em desktop 💻");
    }

    console.log('Modo de exibição atual:', window.matchMedia('(display-mode: standalone)').matches
        ? 'standalone'
        : 'browser');
}

function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone;
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
        document.documentElement.requestFullscreen().then(() => {                                                       // Solicita que o documento entre em modo de tela cheia.
            // Assim que a tela cheia for ativada com sucesso, esconde a dica.
            const dicaElement = document.getElementById("dica_modo");                                                   // Obtém o elemento da dica.
            if (dicaElement) dicaElement.style.display = "none";                                                        // Esconde a dica.
            if (screen.orientation && screen.orientation.lock) {                                                        // Após entrar em tela cheia, verifica se a API de orientação de tela e o método de trava são suportados.
                screen.orientation.lock('landscape').catch(err => console.error("Falha ao travar a orientação:", err)); // Tenta travar a orientação da tela para paisagem e captura qualquer erro.
            }
        }).catch(err => console.error("Falha ao entrar em tela cheia:", err));                                          // Captura e exibe no console qualquer erro que ocorra ao tentar entrar em tela cheia.
    }
}
