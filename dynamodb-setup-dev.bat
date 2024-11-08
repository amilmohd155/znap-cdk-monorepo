
@echo off

REM Check if the Docker container exists
docker ps -a --filter "name=znap-url-dynamodb" --format "{{.Names}}" | findstr "znap-url-dynamodb" >nul
IF ERRORLEVEL 1 (
    REM If the container does not exist, create and run it
    echo "Container does not exist. Creating and running the DynamoDB Local container..."
    docker run ^
    --name znap-url-dynamodb ^
    -p 8000:8000 amazon/dynamodb-local ^
    -jar DynamoDBLocal.jar ^
    -inMemory ^
    -sharedDb
) ELSE (
    REM If the container exists, start it
    echo "Container exists. Starting the DynamoDB Local container..."
    docker start znap-url-dynamodb
)

REM Check if the container is running before proceeding
docker ps --filter "name=znap-url-dynamodb" --format "{{.Names}}" | findstr "znap-url-dynamodb" >nul
IF ERRORLEVEL 1 (
    echo "Failed to start the DynamoDB Local container."
    exit /b 1
) ELSE (
    echo "DynamoDB Local container is running. Proceeding with the next steps..."
   
    REM Create DynamoDB table -- local
    aws dynamodb create-table ^
    --table-name znap-url-dynamodb ^
    --attribute-definitions ^
        AttributeName=PK,AttributeType=S ^
        AttributeName=SK,AttributeType=S ^
    --key-schema ^
        AttributeName=PK,KeyType=HASH ^
        AttributeName=SK,KeyType=RANGE ^
    --provisioned-throughput ^
        ReadCapacityUnits=5,WriteCapacityUnits=5 ^
    --endpoint-url http://localhost:8000

    REM Update table and add GST1PK and GST1SK
    aws dynamodb update-table ^
    --table-name znap-url-dynamodb ^
    --attribute-definitions ^
        AttributeName=GSI1PK,AttributeType=S ^
        AttributeName=GSI1SK,AttributeType=S ^
    --global-secondary-index-updates "[{\"Create\": {\"IndexName\": \"GSI1\",\"KeySchema\": [{\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},{\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}],\"Projection\": {\"ProjectionType\":\"ALL\"},\"ProvisionedThroughput\": {\"ReadCapacityUnits\": 5,\"WriteCapacityUnits\": 5}}}]" ^
    --endpoint-url http://localhost:8000

    REM Set TTL
    aws dynamodb update-time-to-live ^
    --table-name znap-url-dynamodb ^
    --time-to-live-specification Enabled=true,AttributeName=expires ^
    --endpoint-url http://localhost:8000
)