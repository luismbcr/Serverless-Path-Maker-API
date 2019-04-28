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
  }
}
```