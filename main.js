const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const Web3 = require('web3');
const path = require('path');
const ethers = require('ethers');
const abi_json = require(path.join(__dirname,'abi.json'));

const abi = abi_json.abi;
const contratoEndereco = "0x4Ff046E1C8C949fE71CD44807cF0372F2d08a7D6";

const provider = new ethers.JsonRpcProvider("https://rpc.sepolia.org/");
let contrato;

async function pegaContrato(){
    const network = await provider.getNetwork();
    console.log(`Connected to network: ${network.name}`);

    return new ethers.Contract(contratoEndereco, abi, provider);
}
async function todasAsVotacoes() {


   contrato = await pegaContrato();


    let resultado = parseInt(await contrato.proximoId());


    let todasAsVotacoes = [];
    for (let i = 0; i < resultado; i++){
        todasAsVotacoes.push(await contrato.votacoes(i))
    }

    return todasAsVotacoes;
}

async function votar(id, voto){
    contrato = await pegaContrato();
    try{
        let resultado = await contrato.votar(id,voto);
        return true;
    } catch (e) {
        return e;
    }

}

async function votacaoEspecifica(id){
    contrato = await pegaContrato();
    console.log(await contrato.votacoes(id));


    let resultado = await contrato.votacoes(id)
    return resultado;
}


app.get('/api/index', async (req, res) => {
    try {
        const resultados = await todasAsVotacoes(); // Supondo que obterResultados() retorna uma array de BigInts

        // Converter valores BigInt para string
        const resultadosString = resultados.map(value => value.toString());

        // Enviar dados como resposta
        res.header('Access-Control-Allow-Origin', '*');
        res.json(resultadosString);
    } catch (error) {
        console.error('Erro na rota /api/dados:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

app.get('/api/votacaoespecifica/:id', async (req, res) => {
    const idVotacao = req.params.id;
    let votacao = await votacaoEspecifica(idVotacao);
    votacao = votacao.map(value => value.toString());
    res.json(votacao);
});


app.post('/votar', async (req, res) => {
    const { id, voto } = req.body;

    try {
        const resultado = await votar(id, voto);
        res.json({ success: true, resultado });
    } catch (e) {
        res.status(500).json({ success: false, erro: e.toString() });
    }
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});