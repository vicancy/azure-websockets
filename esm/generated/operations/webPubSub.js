import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
/**
 * Class representing a WebPubSub.
 */
export class WebPubSub {
    /**
     * Initialize a new instance of the class WebPubSub class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Broadcast content inside request body to all the connected client connections.
     * @param args Includes all the parameters for this operation.
     */
    sendToAll(...args) {
        let operationSpec;
        let operationArguments;
        if (args[1] === "application/octet-stream") {
            operationSpec = sendToAll$binaryOperationSpec;
            operationArguments = {
                hub: args[0],
                contentType: args[1],
                payloadMessage: args[2],
                options: args[3]
            };
        }
        else if (args[1] === "text/plain") {
            operationSpec = sendToAll$textOperationSpec;
            operationArguments = {
                hub: args[0],
                contentType: args[1],
                payloadMessage: args[2],
                options: args[3]
            };
        }
        else if (args[1] === "application/json") {
            operationSpec = sendToAll$jsonOperationSpec;
            operationArguments = {
                hub: args[0],
                contentType: args[1],
                payloadMessage: args[2],
                options: args[3]
            };
        }
        else {
            throw new TypeError(`"contentType" must be a valid value but instead was "${args[1]}".`);
        }
        return this.client.sendOperationRequest(operationArguments, operationSpec);
    }
    /**
     * Check if the connection with the given connectionId exists.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId The connection Id.
     * @param options The options parameters.
     */
    checkConnectionExistence(hub, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, connectionId, options: operationOptions }, checkConnectionExistenceOperationSpec);
    }
    /**
     * Close the client connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    closeClientConnection(hub, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, connectionId, options: operationOptions }, closeClientConnectionOperationSpec);
    }
    /**
     * Send content inside request body to the specific connection.
     * @param args Includes all the parameters for this operation.
     */
    sendToConnection(...args) {
        let operationSpec;
        let operationArguments;
        if (args[2] === "application/octet-stream") {
            operationSpec = sendToConnection$binaryOperationSpec;
            operationArguments = {
                hub: args[0],
                connectionId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "text/plain") {
            operationSpec = sendToConnection$textOperationSpec;
            operationArguments = {
                hub: args[0],
                connectionId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "application/json") {
            operationSpec = sendToConnection$jsonOperationSpec;
            operationArguments = {
                hub: args[0],
                connectionId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else {
            throw new TypeError(`"contentType" must be a valid value but instead was "${args[2]}".`);
        }
        return this.client.sendOperationRequest(operationArguments, operationSpec);
    }
    /**
     * Check if there are any client connections inside the given group
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param options The options parameters.
     */
    checkGroupExistence(hub, group, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, options: operationOptions }, checkGroupExistenceOperationSpec);
    }
    /**
     * Send content inside request body to a group of connections.
     * @param args Includes all the parameters for this operation.
     */
    sendToGroup(...args) {
        let operationSpec;
        let operationArguments;
        if (args[2] === "application/octet-stream") {
            operationSpec = sendToGroup$binaryOperationSpec;
            operationArguments = {
                hub: args[0],
                group: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "text/plain") {
            operationSpec = sendToGroup$textOperationSpec;
            operationArguments = {
                hub: args[0],
                group: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "application/json") {
            operationSpec = sendToGroup$jsonOperationSpec;
            operationArguments = {
                hub: args[0],
                group: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else {
            throw new TypeError(`"contentType" must be a valid value but instead was "${args[2]}".`);
        }
        return this.client.sendOperationRequest(operationArguments, operationSpec);
    }
    /**
     * Add a connection to the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param connectionId Target connection Id
     * @param options The options parameters.
     */
    addConnectionToGroup(hub, group, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, connectionId, options: operationOptions }, addConnectionToGroupOperationSpec);
    }
    /**
     * Remove a connection from the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    removeConnectionFromGroup(hub, group, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, connectionId, options: operationOptions }, removeConnectionFromGroupOperationSpec);
    }
    /**
     * Check if there are any client connections connected for the given user.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    checkUserExistence(hub, userId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, userId, options: operationOptions }, checkUserExistenceOperationSpec);
    }
    /**
     * Send content inside request body to the specific user.
     * @param args Includes all the parameters for this operation.
     */
    sendToUser(...args) {
        let operationSpec;
        let operationArguments;
        if (args[2] === "application/octet-stream") {
            operationSpec = sendToUser$binaryOperationSpec;
            operationArguments = {
                hub: args[0],
                userId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "text/plain") {
            operationSpec = sendToUser$textOperationSpec;
            operationArguments = {
                hub: args[0],
                userId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else if (args[2] === "application/json") {
            operationSpec = sendToUser$jsonOperationSpec;
            operationArguments = {
                hub: args[0],
                userId: args[1],
                contentType: args[2],
                payloadMessage: args[3],
                options: args[4]
            };
        }
        else {
            throw new TypeError(`"contentType" must be a valid value but instead was "${args[2]}".`);
        }
        return this.client.sendOperationRequest(operationArguments, operationSpec);
    }
    /**
     * Check whether a user exists in the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    checkUserExistenceInGroup(hub, group, userId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, userId, options: operationOptions }, checkUserExistenceInGroupOperationSpec);
    }
    /**
     * Add a user to the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    addUserToGroup(hub, group, userId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, userId, options: operationOptions }, addUserToGroupOperationSpec);
    }
    /**
     * Remove a user from the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    removeUserFromGroup(hub, group, userId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, group, userId, options: operationOptions }, removeUserFromGroupOperationSpec);
    }
    /**
     * Remove a user from all groups.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    removeUserFromAllGroups(hub, userId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, userId, options: operationOptions }, removeUserFromAllGroupsOperationSpec);
    }
    /**
     * Grant permission to the connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    grantPermission(hub, permission, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, permission, connectionId, options: operationOptions }, grantPermissionOperationSpec);
    }
    /**
     * Revoke permission for the connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    revokePermission(hub, permission, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, permission, connectionId, options: operationOptions }, revokePermissionOperationSpec);
    }
    /**
     * Check if a connection have permission to the specific action.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    checkPermission(hub, permission, connectionId, options) {
        const operationOptions = coreHttp.operationOptionsToRequestOptionsBase(options || {});
        return this.client.sendOperationRequest({ hub, permission, connectionId, options: operationOptions }, checkPermissionOperationSpec);
    }
}
// Operation Specifications
const serializer = new coreHttp.Serializer({}, /* isXml */ false);
const sendToAll$binaryOperationSpec = {
    path: "/api/hubs/{hub}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub],
    headerParameters: [Parameters.contentType],
    mediaType: "binary",
    serializer
};
const sendToAll$textOperationSpec = {
    path: "/api/hubs/{hub}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage1,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub],
    headerParameters: [Parameters.contentType1],
    mediaType: "text",
    serializer
};
const sendToAll$jsonOperationSpec = {
    path: "/api/hubs/{hub}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage2,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub],
    headerParameters: [Parameters.contentType2],
    mediaType: "json",
    serializer
};
const checkConnectionExistenceOperationSpec = {
    path: "/api/hubs/{hub}/connections/{connectionId}",
    httpMethod: "HEAD",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
    serializer
};
const closeClientConnectionOperationSpec = {
    path: "/api/hubs/{hub}/connections/{connectionId}",
    httpMethod: "DELETE",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion, Parameters.reason],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
    serializer
};
const sendToConnection$binaryOperationSpec = {
    path: "/api/hubs/{hub}/connections/{connectionId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
    headerParameters: [Parameters.contentType],
    mediaType: "binary",
    serializer
};
const sendToConnection$textOperationSpec = {
    path: "/api/hubs/{hub}/connections/{connectionId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage1,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
    headerParameters: [Parameters.contentType1],
    mediaType: "text",
    serializer
};
const sendToConnection$jsonOperationSpec = {
    path: "/api/hubs/{hub}/connections/{connectionId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage2,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.connectionId],
    headerParameters: [Parameters.contentType2],
    mediaType: "json",
    serializer
};
const checkGroupExistenceOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}",
    httpMethod: "HEAD",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
    serializer
};
const sendToGroup$binaryOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
    headerParameters: [Parameters.contentType],
    mediaType: "binary",
    serializer
};
const sendToGroup$textOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage1,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
    headerParameters: [Parameters.contentType1],
    mediaType: "text",
    serializer
};
const sendToGroup$jsonOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage2,
    queryParameters: [Parameters.apiVersion, Parameters.excluded],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.group],
    headerParameters: [Parameters.contentType2],
    mediaType: "json",
    serializer
};
const addConnectionToGroupOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}/connections/{connectionId}",
    httpMethod: "PUT",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.connectionId,
        Parameters.group
    ],
    serializer
};
const removeConnectionFromGroupOperationSpec = {
    path: "/api/hubs/{hub}/groups/{group}/connections/{connectionId}",
    httpMethod: "DELETE",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.connectionId,
        Parameters.group
    ],
    serializer
};
const checkUserExistenceOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}",
    httpMethod: "HEAD",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
    serializer
};
const sendToUser$binaryOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
    headerParameters: [Parameters.contentType],
    mediaType: "binary",
    serializer
};
const sendToUser$textOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage1,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
    headerParameters: [Parameters.contentType1],
    mediaType: "text",
    serializer
};
const sendToUser$jsonOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/:send",
    httpMethod: "POST",
    responses: { 202: {}, default: {} },
    requestBody: Parameters.payloadMessage2,
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
    headerParameters: [Parameters.contentType2],
    mediaType: "json",
    serializer
};
const checkUserExistenceInGroupOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
    httpMethod: "HEAD",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.group,
        Parameters.userId
    ],
    serializer
};
const addUserToGroupOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
    httpMethod: "PUT",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.group,
        Parameters.userId
    ],
    serializer
};
const removeUserFromGroupOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/groups/{group}",
    httpMethod: "DELETE",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.group,
        Parameters.userId
    ],
    serializer
};
const removeUserFromAllGroupsOperationSpec = {
    path: "/api/hubs/{hub}/users/{userId}/groups",
    httpMethod: "DELETE",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion],
    urlParameters: [Parameters.$host, Parameters.hub, Parameters.userId],
    serializer
};
const grantPermissionOperationSpec = {
    path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
    httpMethod: "PUT",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion, Parameters.targetName],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.connectionId,
        Parameters.permission
    ],
    serializer
};
const revokePermissionOperationSpec = {
    path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
    httpMethod: "DELETE",
    responses: { 200: {}, default: {} },
    queryParameters: [Parameters.apiVersion, Parameters.targetName],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.connectionId,
        Parameters.permission1
    ],
    serializer
};
const checkPermissionOperationSpec = {
    path: "/api/hubs/{hub}/permissions/{permission}/connections/{connectionId}",
    httpMethod: "HEAD",
    responses: { 200: {}, 404: {}, default: {} },
    queryParameters: [Parameters.apiVersion, Parameters.targetName],
    urlParameters: [
        Parameters.$host,
        Parameters.hub,
        Parameters.connectionId,
        Parameters.permission2
    ],
    serializer
};
//# sourceMappingURL=webPubSub.js.map