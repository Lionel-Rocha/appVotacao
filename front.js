window.addEventListener("load", function (event) {
    fetch("http://localhost:3000/api/index", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
        .then(response => handler(response));
});

function handler(response){
    let corpo = document.getElementById("votacoes");
    let card, descricao,  total, grafico;

    for (let i = 0; i < response.length; i++){
        card = document.createElement('div');
        const dadosFragmentados = response[i].split(',');
        grafico = document.createElement('canvas');


        const ctx = grafico.getContext('2d');
        const graficoBarras = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Votos'],
                datasets: [
                    {
                        label: 'Votos a Favor',
                        data: [dadosFragmentados[3]],
                        backgroundColor: 'rgba(0,255,4, 0.2)',
                        borderColor: 'rgb(0,255,4)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Votos Contra',
                        data: [dadosFragmentados[4]],
                        backgroundColor: 'rgba(255,0,59, 0.2)',
                        borderColor: 'rgb(255,0,59)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: 'true',
                indexAxis:'y',
                scales: {
                    x: {
                        stacked: true,
                        beginAtZero: true,
                        display: false,
                    },
                    y: {
                        stacked: true,
                        display: false,
                    },
                }
            }
        });


        descricao = document.createElement('p');
        total = document.createElement('p');


        card.className = "card";

        descricao.textContent = "Votação " + dadosFragmentados[1];
        total.textContent = dadosFragmentados[2] + " votos no total";


        card.appendChild(descricao);
        card.appendChild(grafico);
        card.appendChild(total);

        card.onclick = function() {
            localStorage.setItem("id", dadosFragmentados[0])
            window.location.href = "votacaoEspecifica.html";
        };

        corpo.appendChild(card);
    }
}