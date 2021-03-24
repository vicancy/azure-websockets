const { WebPubSubServiceClient, WebPubSubCloudEventsHandler } = require('./dist/webpubsub')
const dotenv = require('dotenv');
const express = require("express");
dotenv.config();

const serviceClient = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING, 'chat');

// sample of generating client token
console.log(serviceClient.getAuthenticationToken({
  userId: "vicancy",
  claims: {
    hey: ["w"],
    role: ["webpubsub.group.join"],
  }
}));

const handler = new WebPubSubCloudEventsHandler('chat', ['*'],
  {
    //path: "/customUrl", // optional
    handleConnect: async (req, res) => {
      res.success({
        userId: "vicancy"
      });
    },
    onConnected: async connectedRequest => {
      await serviceClient.sendToAll(connectedRequest.context.connectionId + " connected", { dataType: "text" });
    },
    handleUserEvent: async (userRequest, res) => {
      console.log(`Received user request data: ${userRequest.data}`);
      if (userRequest.data === 'abort') {
        res.fail(400, "abort");
      } else if (userRequest.data === 'error') {
        res.fail(500, "error");
      } else {
        res.success("Hey " + userRequest.data, userRequest.dataType);
      }
    },
    onDisconnected: async disconnectRequest => {
      console.log(disconnectRequest.context.userId + " disconnected");
    }
  }
);

const app = express();

app.use(handler.getMiddleware())

app.listen(3000, () => console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`));