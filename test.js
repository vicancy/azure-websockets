const { WebPubSubServiceEndpoint, WebPubSubServiceRestClient, WebPubSubServer } = require('./webpubsub');

async function clientNegotiateSample() {
    var se = new WebPubSubServiceEndpoint("conn");
    var clientResponse = se.clientNegotiate('hub1');
    console.log(clientResponse);
}

async function restClientSample() {
    var rest = new WebPubSubServiceRestClient("conn", "hub");
    await rest.sendToAll("message");
    await rest.sendToUser("vicancy");
}

async function serverListenSample() {
    var wpsserver = new WebPubSubServer("conn", 'chat',
        {
            // eventHandlerUrl: "/customUrl", // optional
            onConnect: async connectRequest => {
                // success with client joining group1
                // await wpsserver.broadcast(connectRequest.context.connectionId);
                console.log(connectRequest.context);
                return {
                    userId: "vicancy"
                }; // or connectRequest.fail(); to 401 the request
            },
            onConnected: async connectedRequest => {
                await wpsserver.sendToAll(connectedRequest.context.connectionId + " connected");
            },
            onUserEvent: async userRequest => {
                return {
                    body: "Hey " + userRequest.data,
                };
            },
            onDisconnected: async disconnectRequest => {
                console.log(disconnectRequest.context.userId + " disconnected");
            }
        });

    const port = 3000;

    const server = http.createServer(async (request, response) => {
        if (await wpsserver.handleNodeRequest(request, response)) {
            console.log(`Processed ${request.url}`);
        }
        else {
            console.log(`${request.url} for others to process`);
            response.statusCode = 404;
            response.end();
        }
    });

    server.listen(port, () => console.log(`Azure WebPubSub Upstream ready at http://localhost:${port}${wpsserver.eventHandlerUrl}`));

}

serverListenSample();