const AWS = require('aws-sdk');

AWS.config.update({region:'us-east-1'});

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile : "self"});

const dynamoDb = new AWS.DynamoDB();

dynamoDb.listTables((err,data) => {
    if(err){
        console.log(err);
    }

    console.log(data.TableNames);
});