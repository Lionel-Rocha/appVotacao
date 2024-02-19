window.addEventListener("load", function (event) {
    let id = localStorage.getItem("id");
    fetch("http://localhost:3000/api/votacaoespecifica/"+ id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json())
        .then(response => handler(response));
});



function handler(response){
    let card, descricao,  total, grafico, criadoEm, prazo;
    card = document.createElement('div');
    card.className = "cardGrande";

    grafico = extracted(grafico, response);

    let dataCriacao = new Date(response[7]* 1000);

    descricao = document.createElement('p');
    total = document.createElement('p');
    prazo = document.createElement('p');
    criadoEm = document.createElement('p');

    descricao.textContent = "Votação: " + response[1];
    total.textContent = "Total de votos: " +response[2];
    prazo.textContent = "Prazo: " + response[5];
    criadoEm.textContent = "Data de criação: " +dataCriacao.toString();

    const local = document.getElementById("votacaoEspecifica");

    card.appendChild(grafico);
    card.appendChild(descricao);
    card.appendChild(total);
    card.appendChild(prazo);
    card.appendChild(criadoEm);

    local.appendChild(card);
}

function extracted(grafico,response) {
    grafico = document.createElement('canvas');


    const ctx = grafico.getContext('2d');
    const graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Votos'],
            datasets: [
                {
                    label: 'Votos a Favor',
                    data: [response[3]],
                    backgroundColor: 'rgba(0,255,4, 0.2)',
                    borderColor: 'rgb(0,255,4)',
                    borderWidth: 1,
                },
                {
                    label: 'Votos Contra',
                    data: [response[4]],
                    backgroundColor: 'rgba(255,0,59, 0.2)',
                    borderColor: 'rgb(255,0,59)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: 'true',
            indexAxis: 'y',
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
    return grafico;
}