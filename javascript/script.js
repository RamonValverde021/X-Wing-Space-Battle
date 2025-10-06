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
        // Exibe uma caixa de diálogo customizada
        if (confirm("Para melhor experiência, adicione este site à tela inicial.\n\nDeseja instalar o aplicativo agora?")) {
            if (deferredPrompt) {
                // Mostra o prompt oficial do navegador
                deferredPrompt.prompt();

                // Espera a resposta do usuário
                deferredPrompt.userChoice.then(choice => {
                    if (choice.outcome === 'accepted') {
                        console.log('Usuário aceitou instalar ✅');
                    } else {
                        console.log('Usuário cancelou ❌');
                    }
                    deferredPrompt = null; // limpa o evento
                });
            } else {
                alert("Instalação automática indisponível — adicione manualmente à tela inicial 🔧");
            }
        } else {
            console.log("Usuário escolheu cancelar instalação.");
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

let deferredPrompt; // variável para guardar o evento

// Detecta o evento que o navegador dispara quando o PWA pode ser instalado
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // impede o banner automático
    deferredPrompt = e; // guarda o evento para usar depois
});
