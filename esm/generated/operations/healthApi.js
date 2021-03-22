import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
/**
 * Class representing a HealthApi.
 */
export class HealthApi {
    /**
     * Initialize a new instance of the class HealthApi class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Get service health status.
     * @param options The options parameters.
     */
    getHealthStatus(options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ options: operationOptions }, getHealthStatusOperationSpec);
    }
}
// Operation Specifications
const serializer = new coreHttp.Serializer({}, /* isXml */ false);
const getHealthStatusOperationSpec = {
    path: "/api/health",
    httpMethod: "HEAD",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host],
    serializer
};
//# sourceMappingURL=healthApi.js.map