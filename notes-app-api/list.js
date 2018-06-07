import * as dynamoDbLib from "./libs/dynamo-lib";
import {success,failure} from "./libs/response-lib";

export async function main(event,context,callback) {
    //define query params
    const params = {
        TableName : process.env.tableName,
        KeyConditionExpression : "userId = :userId",
        ExpressionAttributeValues : {
            ":userId" : event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoDbLib.call("query",params);       
            callback(null,success(result.Items));
       
        
    } catch (error) {
        console.log(error);
        callback(null,failure({status:false}));
    }
}