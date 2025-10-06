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
        alert("Para melhor experiência, adicione este site à tela inicial!");
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




