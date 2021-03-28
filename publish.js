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

var sns = new AWS.SNS();

function publish(mesg) {
  var publishParams = { 
    TopicArn : config.TopicArn,
    Message: JSON.stringify(mesg)
  };

  sns.publish(publishParams, function(err, data) {
    process.stdout.write(".");
    //console.log(data);
  });
}

for (var i=0; i < 3; i++) {
  publish({tipo:`teste${i}`,template:'template_name',to:'paranafael@yahoo.com.br'});
}
