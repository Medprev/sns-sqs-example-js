var AWS = require('aws-sdk'); 
var util = require('util');
var config = require('./config.json');
var env = require('dotenv')

env.config()

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

if (accessKeyId && secretAccessKey) {
  AWS.config.update({
    credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
    region,
  });
}

var sqs = new AWS.SQS();

var receiveMessageParams = {
  QueueUrl: config.QueueUrl,
  MaxNumberOfMessages: 10
};

function getMessages() {
  sqs.receiveMessage(receiveMessageParams, receiveMessageCallback);
}

function receiveMessageCallback(err, data) {
  //console.log(data);

  if (data && data.Messages && data.Messages.length > 0) {

    for (var i=0; i < data.Messages.length; i++) {
      process.stdout.write(".");
      console.log("do something with the message here...");
      const body = JSON.parse(data.Messages[i].Body)
      const message = JSON.parse(body.Message)
      console.log(message);
      //
      // Delete the message when we've successfully processed it
      var deleteMessageParams = {
        QueueUrl: config.QueueUrl,
        ReceiptHandle: data.Messages[i].ReceiptHandle
      };

      sqs.deleteMessage(deleteMessageParams, deleteMessageCallback);
    }

    getMessages();

  } else {
    process.stdout.write("-");
    setTimeout(getMessages, 100);
  }
}

function deleteMessageCallback(err, data) {
  //console.log("deleted message");
  //console.log(data);
}

setTimeout(getMessages, 100);


