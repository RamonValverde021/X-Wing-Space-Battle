function surgimentoEstrelaDaMorte() {
    const estrela = document.getElementById("estacao_surge");
    if (!estrela) {
        const deathstar = document.createElement("div");
        deathstar.id = "estacao_surge";
        deathstar.className = "deathstar-rise";
        cenario.appendChild(deathstar);
        // Posição inicial 
        let tamanhoEstrela = 0;
        let subidaEstrela = 0;
        const iniciaMovimentacaoEstrelaDaMorte = setInterval(() => {       // Cria um intervalo para mover a Estrela da Morte
            tamanhoEstrela += 1;                                           // 0.1 Decrementa a velocidade (quanto maior o valor, mais rápido desce)
            deathstar.style.height = tamanhoEstrela + "px";                // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
            deathstar.style.width = tamanhoEstrela + "px";                 // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
            if (tamanhoEstrela >= (larguraCenario / 3)) {
                if (okTamanho) {
                    const estrela = deathstar.getBoundingClientRect();     // Pega as coordenadas do X-Wing    
                    let coordenada = parseInt(estrela.bottom);
                    subidaEstrela = coordenada - deathstar.offsetHeight;  
                    okTamanho = false;
                }
                subidaEstrela++;
                deathstar.style.bottom = subidaEstrela + "px";
            }
            if (tamanhoEstrela >= larguraCenario) {                        // Se a metade da Estrela da Morte avançar o fundo da tela
                deathstar.style.height = larguraCenario + "px";            // Atualiza a posição vertical da Estrela da Morte, movendo para baixo
                deathstar.style.width = larguraCenario + "px";             // Fixa a Estrela Da Morte onde ela parou
                if (subidaEstrela >= alturaCenario) {
                    console.log("fim subida: " + subidaEstrela);
                    clearInterval(iniciaMovimentacaoEstrelaDaMorte);       // para quando sair da tela
                    clearInterval(iniciaSurgimentoEstrelaDaMorte);
                    deathstar.remove();
                }
            }
        }, 100);
    }
}