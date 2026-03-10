import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

module.exports.listar = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify([
            {id:1, descricao: "Aprender Serveless", concluida: false},
            {id:2, descricao: "Configurar Docker", concluida: true}
        ]),
    };
};

module.exports.cadastrar = async (event) => {
  // O corpo da requisição chega como string, então precisamos do JSON.parse
  const dados = JSON.parse(event.body);
  
  console.log("Recebemos estes dados:", dados);

  return {
    statusCode: 201, // 201 significa "Created"
    body: JSON.stringify({
      mensagem: "Tarefa cadastrada com sucesso!",
      dadoRecebido: dados
    }),
  };
};