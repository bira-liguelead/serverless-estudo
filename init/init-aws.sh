#!/bin/bash
echo "########### Criando tabela DynamoDB no LocalStack ###########"

awslocal dynamodb create-table \
    --table-name Tarefas \
    --attribute-definitions AttributeName=id,AttributeType=N \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1

echo "########### Tabela Tarefas criada com sucesso ###########"