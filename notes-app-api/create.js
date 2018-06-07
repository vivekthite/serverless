import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamo-lib";
import {success,failure} from "./libs/response-lib";



export async function main(event,context,callback){
    // request body is passed in as JSON string in event body
    const body = JSON.parse(event.body);

    //dynamodb put params
    const params = {
        TableName : process.env.tableName,
        /*
            'Item' contain attributes of the record to be created - 
                userId : user identities are federated through the cognito 
                    identity pool , we will use the identity id as the 
                    user id of the authenticated user
                
                noteId : a unique id
                content : parsed from request body
                attachment : parsed from request body
                createdAt : current unix timestamp    
        */
        Item : {
            userId : event.requestContext.identity.cognitoIdentityId,
            noteId : uuid.v1(),
            content : body.content,
            attachment : body.attachment,
            createdAt : Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put",params);
        callback(null,success(params.Item));
    } catch (error) {
        console.log(error);
        callback(null,failure({status:false}));
    }

}