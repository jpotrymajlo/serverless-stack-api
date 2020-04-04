
import {v1 as uuidv1}  from "uuid";
//import AWS from "aws-sdk";
import * as dynamoDbLib from "./libs/dynamodb-lib.js";
import {success, failure} from "./libs/response-lib.js";


export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuidv1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };
    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    }
    catch (e){
        console.log(e);
        return failure({status: false});
    }
}
