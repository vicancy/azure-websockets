const {WebPubSubServiceEndpoint, WebPubSubServiceRestClient} = require('./webpubsub');

async function main() {
    var se = new WebPubSubServiceEndpoint("conn");
    var clientResponse = se.signClient('hub1');
    console.log(clientResponse);
    var rest = new WebPubSubServiceRestClient("conn", "hub");
    await rest.sendToAll("message");
}

main();