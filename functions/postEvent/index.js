const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const db = new AWS.DynamoDB.DocumentClient();
const { sendResponse } = require('../../responses/index');

exports.handler = async (event, context) => {
  const eventData = JSON.parse(event.body);
  
  // Generera ett unikt ID med uuid
  const uniqueId = uuidv4();
  
  try {
    await db.put({
      TableName: 'events-db',
      Item: {
        id: uniqueId,
        ...eventData
      }
    }).promise();

    return sendResponse(200, { success: true, event: { id: uniqueId, ...eventData } });

  } catch (error) {
    console.log(error);
    return sendResponse(500, { error: 'Could not save event' });
  }
};
