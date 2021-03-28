# SNS/SQS Example

This is an example of how to use AWS SNS and SQS to publish messages to a topic(SNS) and consume them from a queue(SQS) using NodeJS and the aws-sdk.

## Prep
Log into your AWS console and create a new user in IAM. Make sure you save the users credientials. 
Attach the User Policies for Amazon SQS Full Access and Amazon SNS Full Access.  

set Credentials on .env file

Add the access key and secret access key for the IAM user you just created.
```
AWS_ACCESS_KEY_ID=<YOUR_ACCESS_KEY_ID>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_ACCESS_KEY>
AWS_REGION=us-east-1
```

## Install Packages

````
npm install
````

## Create Topic and Queue

````
snssqs node create.js 
````

## Run

### Publish
````
snssqs node publish.js 
````

### Consume
````
snssqs node consume.js 
````

