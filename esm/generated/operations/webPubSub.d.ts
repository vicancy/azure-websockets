import * as coreHttp from "@azure/core-http";
import { WebPubSubServiceClient } from "../webPubSubServiceClient";
import { WebPubSubSendToAll$binaryOptionalParams, WebPubSubSendToAll$textOptionalParams, WebPubSubSendToAll$jsonOptionalParams, WebPubSubCloseClientConnectionOptionalParams, WebPubSubSendToGroup$binaryOptionalParams, WebPubSubSendToGroup$textOptionalParams, WebPubSubSendToGroup$jsonOptionalParams, Enum0, WebPubSubGrantPermissionOptionalParams, Enum1, WebPubSubRevokePermissionOptionalParams, Enum2, WebPubSubCheckPermissionOptionalParams } from "../models";
/**
 * Class representing a WebPubSub.
 */
export declare class WebPubSub {
    private readonly client;
    /**
     * Initialize a new instance of the class WebPubSub class.
     * @param client Reference to the service client
     */
    constructor(client: WebPubSubServiceClient);
    /**
     * Broadcast content inside request body to all the connected client connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToAll(hub: string, contentType: "application/octet-stream", payloadMessage: coreHttp.HttpRequestBody, options?: WebPubSubSendToAll$binaryOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Broadcast content inside request body to all the connected client connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToAll(hub: string, contentType: "text/plain", payloadMessage: string, options?: WebPubSubSendToAll$textOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Broadcast content inside request body to all the connected client connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param contentType Body Parameter content-type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToAll(hub: string, contentType: "application/json", payloadMessage: coreHttp.HttpRequestBody, options?: WebPubSubSendToAll$jsonOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Check if the connection with the given connectionId exists.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId The connection Id.
     * @param options The options parameters.
     */
    checkConnectionExistence(hub: string, connectionId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Close the client connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    closeClientConnection(hub: string, connectionId: string, options?: WebPubSubCloseClientConnectionOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId The connection Id.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToConnection(hub: string, connectionId: string, contentType: "application/octet-stream", payloadMessage: coreHttp.HttpRequestBody, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId The connection Id.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToConnection(hub: string, connectionId: string, contentType: "text/plain", payloadMessage: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param connectionId The connection Id.
     * @param contentType Body Parameter content-type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToConnection(hub: string, connectionId: string, contentType: "application/json", payloadMessage: coreHttp.HttpRequestBody, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Check if there are any client connections inside the given group
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param options The options parameters.
     */
    checkGroupExistence(hub: string, group: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to a group of connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToGroup(hub: string, group: string, contentType: "application/octet-stream", payloadMessage: coreHttp.HttpRequestBody, options?: WebPubSubSendToGroup$binaryOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to a group of connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToGroup(hub: string, group: string, contentType: "text/plain", payloadMessage: string, options?: WebPubSubSendToGroup$textOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to a group of connections.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param contentType Body Parameter content-type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToGroup(hub: string, group: string, contentType: "application/json", payloadMessage: coreHttp.HttpRequestBody, options?: WebPubSubSendToGroup$jsonOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Add a connection to the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param connectionId Target connection Id
     * @param options The options parameters.
     */
    addConnectionToGroup(hub: string, group: string, connectionId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Remove a connection from the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    removeConnectionFromGroup(hub: string, group: string, connectionId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Check if there are any client connections connected for the given user.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    checkUserExistence(hub: string, userId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific user.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId The user Id.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToUser(hub: string, userId: string, contentType: "application/octet-stream", payloadMessage: coreHttp.HttpRequestBody, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific user.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId The user Id.
     * @param contentType Upload file type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToUser(hub: string, userId: string, contentType: "text/plain", payloadMessage: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Send content inside request body to the specific user.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId The user Id.
     * @param contentType Body Parameter content-type
     * @param payloadMessage The payload body.
     * @param options The options parameters.
     */
    sendToUser(hub: string, userId: string, contentType: "application/json", payloadMessage: coreHttp.HttpRequestBody, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Check whether a user exists in the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    checkUserExistenceInGroup(hub: string, group: string, userId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Add a user to the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    addUserToGroup(hub: string, group: string, userId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Remove a user from the target group.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param group Target group name, which length should be greater than 0 and less than 1025.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    removeUserFromGroup(hub: string, group: string, userId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Remove a user from all groups.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param userId Target user Id.
     * @param options The options parameters.
     */
    removeUserFromAllGroups(hub: string, userId: string, options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
    /**
     * Grant permission to the connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    grantPermission(hub: string, permission: Enum0, connectionId: string, options?: WebPubSubGrantPermissionOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Revoke permission for the connection.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    revokePermission(hub: string, permission: Enum1, connectionId: string, options?: WebPubSubRevokePermissionOptionalParams): Promise<coreHttp.RestResponse>;
    /**
     * Check if a connection have permission to the specific action.
     * @param hub Target hub name, which should start with alphabetic characters and only contain
     *            alpha-numeric characters or underscore.
     * @param permission The permission: current supported actions are joinLeaveGroup and sendToGroup.
     * @param connectionId Target connection Id.
     * @param options The options parameters.
     */
    checkPermission(hub: string, permission: Enum2, connectionId: string, options?: WebPubSubCheckPermissionOptionalParams): Promise<coreHttp.RestResponse>;
}
//# sourceMappingURL=webPubSub.d.ts.map