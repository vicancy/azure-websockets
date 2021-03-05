## Usage:

```js


import { WebPubSubServiceRestClient } from 'azure-websockets/webpubsub'

var rest = new WebPubSubServiceRestClient("conn", "hub");
await rest.sendToAll("message");

```