
import {v1 as uuidv1}  from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
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

    dynamoDb.put(params, (error, data) => {
        const headers = {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        };
        var response = {};
        if (error) {
            response = {
                statusCode: 500,
                headers: headers
//                body: JSON.stringify({status: false})
            };
        } else {
            response = {
                statusCode : 200,
                headers: headers
//                body : JSON.stringify(params.Item)
            };
        }

        callback(null, response);
        return;

    });

}
