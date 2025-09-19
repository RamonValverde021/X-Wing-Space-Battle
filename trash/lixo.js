// Aqui é o truque: quando a trilha principal for pausada ira tocar a trilha sonora da Estrela da Morte
audioTrilhaSonora.addEventListener("pause", () => {
    setTimeout(() => {
        trilhaSonoraEstrelaDaMorte();  // Toca a trilha sonora da Estrela da Morte
    }, 6000); // espera 6 segundos
});
