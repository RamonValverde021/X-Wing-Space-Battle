/**
 * Envia uma mensagem para a página pai (index.html) solicitando o modo imersivo.
 * Esta função é chamada a partir de intro.html quando o usuário inicia o jogo.
 */
function ativarModoImersivo() {
    // Envia a mensagem para a página pai (index.html). O '*' significa que qualquer origem pode receber.
    window.parent.postMessage('INICIAR_MODO_IMERSIVO', '*');

    // Esconde a dica de modo imersivo, se ela existir.
    const dicaElement = document.getElementById("dica_modo");
    if (dicaElement) dicaElement.style.display = "none";
}
