pragma solidity ^0.8.24;

contract Votacao{
    uint256 public proximoId = 0;

    struct Votacao_ {
        uint256 id;
        string descricao;
        uint256 votosTotais;
        uint256 votosFavor;
        uint256 votosContra;
        uint256 prazo;
        bool completa;
        address[] votantes;
        uint256 timestampInicio;
    }

    Votacao_[] public votacoes;

     function criarVotacao(string memory descricao_, uint256 prazo_) public {
        votacoes.push(Votacao_({
            id: proximoId,
            descricao: descricao_,
            votosTotais: 0,
            votosFavor: 0,
            votosContra: 0,
            prazo: prazo_,
            completa: false,
            votantes: new address[](0),
            timestampInicio: block.timestamp
        }));

        proximoId++;
    }

    function recuperaQuantidadeVotos(uint256 id) public view returns (uint256[2] memory) {
        uint256 favor = votacoes[id].votosFavor;
        uint256 contra = votacoes[id].votosContra;

        return [favor, contra];
    }

    function votar(uint256 id, bool voto) public{
        Votacao_ storage votacao = votacoes[id];
        require(id < proximoId);
        
        uint256 prazoEmSegundos = votacao.prazo * 1 days;
        if (block.timestamp > votacao.timestampInicio + prazoEmSegundos){
            votacao.completa = true;
        }


        if (votacao.completa == false){
            if (voto == true){
            votacao.votosFavor++;
        } else {
            votacao.votosContra++;
        }

        votacao.votosTotais++;

        }


    }


}