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
        //alert("Para melhor experiência, adicione este site à tela inicial!");
    } else if (isMobile() && isPWA()) {
        console.log("App PWA em execução 📲");
        // Aqui você pode travar orientação ou iniciar fullscreen
    } else {
        console.log("Executando em desktop 💻");
    }

    if (isFullscreen()) {
        const dicaElement = document.getElementById("dica_modo");   // Obtém o elemento da dica.
        if (dicaElement) dicaElement.style.display = "none";        // Oculta a dica.
    } else {
        const dicaElement = document.getElementById("dica_modo");   // Obtém o elemento da dica.
        if (dicaElement) dicaElement.style.display = "block";       // Mostra a dica.
        // Uma interação do usuário é necessária para entrar em tela cheia.
        window.addEventListener('touchstart', () => {
            const leituraToque = setInterval(() => {
                clearInterval(leituraToque);
                ativarModoImersivo();
            }, 10);
        }), { once: true };

        window.addEventListener('click', () => {
            const leituraToque = setInterval(() => {
                clearInterval(leituraToque);
                ativarModoImersivo();
            }, 10);
        })
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

/* Verifica se está em modo de tela cheia */
function isFullscreen() {
    const parentDoc = window.parent.document;
    const fullscreenElement = parentDoc.fullscreenElement ||
        parentDoc.webkitFullscreenElement ||
        parentDoc.mozFullScreenElement ||
        parentDoc.msFullscreenElement;

    if (fullscreenElement) {
        console.log("O jogo está em modo fullscreen!");
        return true;
    } else {
        console.log("O jogo NÃO está em fullscreen.");
        return false;
    }
}


/**
 * Tenta colocar o jogo em tela cheia e travar a orientação para paisagem.
 * Ideal para ser chamado por uma interação do usuário em dispositivos móveis.
 */
function ativarModoImersivo() {
    // Acessa o elemento raiz da página principal (fora do iframe)
    const parentElement = window.parent.document.documentElement;

    if (parentElement.requestFullscreen) {
        parentElement.requestFullscreen().then(() => {
            // Uma vez em tela cheia, podemos esconder a dica que está dentro do iframe
            const dicaElement = document.getElementById("dica_modo");
            if (dicaElement) dicaElement.style.display = "none";

            // A lógica de travar a orientação continua a mesma
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(err => console.error("Falha ao travar a orientação:", err));
            }
        }).catch(err => console.error("Falha ao entrar em tela cheia:", err));
    }
}
