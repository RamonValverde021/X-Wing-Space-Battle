document.addEventListener("click", async () => {
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
        console.wargn("Não foi possível travar a orientação:", err);
    }
});

window.addEventListener("orientationchange", () => {
    if (window.orientation === 0 || window.orientation === 180) {
        alert("Por favor, gire o dispositivo para o modo paisagem 🔄");
    }
});
