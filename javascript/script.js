document.addEventListener('DOMContentLoaded', minhaAcaoAssincrona);

async function minhaAcaoAssincrona() {
    try {
        // Entra em tela cheia
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        }

        // Tenta travar orientação
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock("landscape");
            console.log("Tela travada em modo paisagem ✅");
        }

        // Remove o listener depois da primeira tentativa
        document.removeEventListener("click", arguments.callee);
    } catch (err) {
        console.warn("Não foi possível travar a orientação:", err);
    }
}

