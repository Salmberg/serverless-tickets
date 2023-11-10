const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require('../../responses/index');



exports.handler = async (event, context) => {

  const {Items} = await db.scan({
        TableName: 'events-db',
    }).promise();

    return sendResponse(200, {succes: true, events: Items});


}