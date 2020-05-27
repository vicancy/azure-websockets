const jwt = require('jsonwebtoken');
const axios = require('axios');

function parseConnectionString(conn) {
    const em = /Endpoint=(.*?);/g.exec(conn);
    if (!em) return null;
    const endpoint = em[1];
    const km = /AccessKey=(.*?);/g.exec(conn);
    if (!km) return null;
    const key = km[1];
    if (!endpoint || !key) return null;
    const pm = /Port=(.*?);/g.exec(conn);
    const port = pm == null ? '' : pm[1];
    var url = new URL(endpoint);
    url.port = port;
    const host = url.toString();
    url.port = '';
    const audience = url.toString();
    return {
        host: host,
        audience: audience,
        key: key,
        wshost: host.replace('https://', 'wss://').replace('http://', 'ws://')
    };
}

function EventHandler(headers) {
    let query = {};
    for (let p of new URLSearchParams(headers['x-asrs-client-query']).entries()) {
        query[p[0]] = p[1];
    }

    this.connectionId = headers['x-asrs-connection-id'];
    this.userId = headers['x-asrs-user-id'];
    this.query = query;
    this.eventName = headers['x-asrs-event'];
    this.isConnectEvent = this.eventName == 'connect';
    this.isDisconnectEvent = this.eventName == 'disconnect';
    this.isMessageEvent = this.eventName == 'message';
}

function AzureWebSocketManager(connString, hubName, context) {
    connString = connString || process.env["AzureSignalRConnectionString"];
    var parsed = parseConnectionString(connString);
    if (!parsed) throw 'Invalid ConnectionString';
    hubName = hubName || process.env["HubName"];
    context = context || console;
    var host =  parsed.host;
    var key = parsed.key;
    var ws = parsed.wshost;
    var audience = parsed.audience;
    var subPath = hubName ? `hubs/${hubName}/` : '';;
    var clientPath = `ws/client/${subPath}`;
    var servicePath = `ws/api/v1/${subPath}`;
    var getToken = function (path, user) {
        var payload = {
            audience: audience + path,
            expiresIn: '1h',
            algorithm: 'HS256',
        };
        if (user) payload.subject = user;
        return jwt.sign({}, key, payload);
    };
    var invokeApi = async function (subpath, method, content) {
        var path = servicePath + subpath;
        var url = host + path;
        var token = getToken(path);
        try {
            var response;
            if (method === 'post' || method === 'put' || method === 'patch'){
                response = await axios[method](url, content, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': 'Bearer ' + token
                    }
                });
            } else {
                response = await axios[method](url, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': 'Bearer ' + token
                    }
                });
            }
            var log = `invoked ${method}:${url}: ${response.status}`;
            context.log(log);
            return {
                status: response.status,
                body: {
                    type: 'log',
                    code: response.status,
                    text: log
                }
            };
        } catch (err) {
            var log = `error invoking ${method}:${url}: ${err.response.status}`;
            context.log(`error invoking ${method}:${url}: ${err.response.status}`);
            return {
                status: err.response.status,
                body: {
                    type: 'error',
                    code: err.response.status,
                    text: log
                }
            };
        }
    };

    this.host = host;
    this.getEndpoint = function (user) {
        var token = getToken(clientPath, user);
        return `${ws}${clientPath}?access_token=${token}`;
    };
    this.broadcast = function (content) {
        return invokeApi('', 'post', content)
    };
    this.sendToConnection = function (connectionId, content) {
        return invokeApi(`connections/${connectionId}`, 'post', content)
    };
    this.addToGroup = function (group, user) {
        return invokeApi(`groups/${encodeURIComponent(group)}/users/${encodeURIComponent(user)}`, 'put')
    };
    this.removeFromGroup = function (group, user) {
        return invokeApi(`groups/${encodeURIComponent(group)}/users/${encodeURIComponent(user)}`, 'delete');
    };
    this.sendToGroup = function (group, content) {
        return invokeApi(`groups/${encodeURIComponent(group)}`, 'post', content);
    };
    this.sendToUser = function (user, content) {
        return invokeApi(`users/${encodeURIComponent(user)}`, 'post', content);
    };
    this.userExists = async function (user){
        var response = await invokeApi(`users/${encodeURIComponent(user)}`, 'head');
        if (response.status === 404){
            return false;
        } else if (response.status === 200){
            return true;
        } else {
            throw $`Unexpected status code ${response.status}`
        }
    };
    this.groupExists = async function (group){
        var response = await invokeApi(`groups/${encodeURIComponent(group)}`, 'head');
        if (response.status === 404){
            return false;
        } else if (response.status === 200){
            return true;
        } else {
            throw $`Unexpected status code ${response.status}`
        }
    }
}

AzureWebSocketManager.prototype.event = function (header) {
    return new EventHandler(header);
}

function AzureWebSocket() { }
AzureWebSocket.prototype.client = function (connString, hubName, context) {
    return new AzureWebSocketManager(connString, hubName, context);
}

AzureWebSocket.prototype.default = function (context) {
    var connString = process.env["AzureSignalRConnectionString"];
    var hubName = process.env["HubName"];
    return new AzureWebSocketManager(connString, hubName, context);
}

var ws = new AzureWebSocket();
module.exports = ws;
