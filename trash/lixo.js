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


function movimentarProjetilEspecial() {
    const tiros = document.querySelectorAll(".torpedo_x-wing");                // Seleciona todos os projeteis do X-Wing
    const estrelaDaMorte = document.getElementById("estrela-da-morte");        // Seleciona a Estrela da Morte
    for (let i = 0; i < tiros.length; i++) {                                   // Percorre todos os projéteis
        if (tiros[i]) {                                                        // Verifica se o projétil existe
            let posicaoTopProjetil = tiros[i].offsetTop;                       // Pega a posição vertical atual do projétil
            posicaoTopProjetil -= velocidadeProjetilXWing;                     // Atualiza a posição vertical do projétil (move para cima)
            tiros[i].style.top = posicaoTopProjetil + "px";                    // Atualiza a posição no cenário
            if (estrelaDaMorte) {                                              // Verifica se a Estrela da Morte ainda existe
                const deathStarRect = estrelaDaMorte.getBoundingClientRect();  // Pega as coordenadas da Estrela da Morte
                const deathStarTop = deathStarRect.top;                        // Topo absoluto da Estrela da Morte
                const deathStarHeight = deathStarRect.height;                  // Altura da Estrela da Morte
                const deathStarMiddle = deathStarTop + (deathStarHeight / 2);  // Calcula a metade da altura da Estrela da Morte
                if (posicaoTopProjetil <= deathStarMiddle) {                   // Verifica se o projétil atingiu a metade da Estrela da Morte
                    tiros[i].remove();                                         // Remove o projétil (para de subir e some)
                    const intervaloMovimento = setInterval(() => {             // Delay para ativar a sequência de vitória (como no original)
                        clearInterval(intervaloMovimento);                     // Limpa o intervalo para evitar múltiplas chamadas
                        xwingSaindo();                                         // Chama a função que faz o X-Wing sair voando
                    }, 1000);                                                  // 1 segundo de delay
                    return;                                                    // Sai do loop para esse projétil (já foi processado)
                }
            }
        }
    }
}