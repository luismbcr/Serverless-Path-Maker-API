# Serverless Azure API
This is an API serverless project using azure to handle paths and topics.

# Set up
First you need to create local.settings.json
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "DBURL": "mongodbpath",
    "JWK":"https://yourauth0link.auth0.com/.well-known/jwks.json"
  }
}
```
Then you need to run your function with visual studio code and azure account