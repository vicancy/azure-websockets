import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { WebPubSubServiceClientContext } from "./webPubSubServiceClientContext";
import * as coreHttp from "@azure/core-http";
declare class WebPubSubServiceClient extends WebPubSubServiceClientContext {
    healthApi: operations.HealthApi;
    webPubSubApi: operations.WebPubSub;
    /**
     * Initializes a new instance of the WebPubSubServiceClient class.
     * @param credentials Credentials needed for the client to connect to Azure.
     * @param [options] The parameter options
     */
    constructor(credentials: coreHttp.ServiceClientCredentials, host: string, options?: Models.WebPubSubServiceClientOptionalParams);
}
export { WebPubSubServiceClient, WebPubSubServiceClientContext, Models as WebPubSubServiceModels, Mappers as WebPubSubServiceMappers };
export * from "./operations";
//# sourceMappingURL=webPubSubServiceClient.d.ts.map