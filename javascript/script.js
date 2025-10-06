async function lockOrientationToLandscape() {
  try {
    // Verifica se o dispositivo suporta a orientação paisagem
    const isLandscapeSupported = screen.orientation.type.startsWith("landscape");

    if (!isLandscapeSupported) {
      // Tenta travar a orientação em paisagem
      await screen.orientation.lock("landscape"); // Pode ser 'landscape-primary' ou 'landscape-secondary'
      console.log("Orientação bloqueada em paisagem!");
    } else {
      console.log("A orientação já está em paisagem ou suporta paisagem.");
    }
  } catch (error) {
    console.error("Erro ao tentar bloquear a orientação:", error);
    // O erro pode ocorrer se o usuário não conceder permissão
  }
}

// Chame a função para solicitar o bloqueio ao abrir o navegador ou carregar a página
lockOrientationToLandscape();


