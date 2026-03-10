import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const endpoint = process.env.DYNAMODB_ENDPOINT;

const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: endpoint ? endpoint : undefined,
});

const docClient = DynamoDBDocumentClient.from(client);

interface Tarefa {
    id: number;
    descricao: string;
    concluida: boolean;
}

export const listar = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { Items } = await docClient.send(new ScanCommand({ TableName: "Tarefas" }));

    return {
        statusCode: 200,
        body: JSON.stringify(Items),
    };
};

export const cadastrar = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const dados = JSON.parse(event.body!) as Tarefa;
    
    await docClient.send(new PutCommand({
        TableName: "Tarefas",
        Item: dados
    }));

    return {
        statusCode: 201,
        body: JSON.stringify({ mensagem: "Tarefa salva no DynamoDB!", dadoRecebido: dados }),
  };
};

