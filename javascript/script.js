/**
 * Tenta colocar o jogo em tela cheia e travar a orientação para paisagem.
 * Ideal para ser chamado por uma interação do usuário em dispositivos móveis.
 * ESTA FUNÇÃO AGORA É APENAS UM 'PROXY' PARA A PÁGINA PRINCIPAL.
 */
function ativarModoImersivo() {
    // Envia uma mensagem para a página pai (index.html) para que ELA peça o modo imersivo.
    window.parent.postMessage('INICIAR_JOGO_IMERSIVO', '*');

    // Esconde a dica localmente
    const dicaElement = document.getElementById("dica_modo");
    if (dicaElement) dicaElement.style.display = "none";
}
