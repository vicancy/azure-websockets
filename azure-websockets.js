import { sign } from 'jsonwebtoken';
import axios from 'axios';

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

class GroupClient {
    constructor(manager, groupName) {
        this._manager = manager;
        this._groupName = groupName;
    }
}

function UserClient(manager, userName) {

}

class EventHandler {
    constructor(manager, headers) {
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
}

class AzureWebSocketManager {
    constructor(connString, hubName, context) {
        var parsed = parseConnectionString(connString);
        if (!parsed)
            throw 'Invalid ConnectionString';
        this._hubName = hubName || '_default';
        this._context = context || console;
        this.Host = parsed.host;
        this._key = parsed.key;
        this._ws = parsed.wshost;
        this._audience = parsed.audience;
        this._getToken = function (path) {
            return 'Bearer ' + sign({}, this._key, {
                audience: this._audience + path,
                expiresIn: '1h',
                algorithm: 'HS256'
            });
        };
        this._invoke = async function (path, method, content) {
            var url = this.Host + path;
            var token = this._getToken(path);
            try {
                await axios[method](url, content, {
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': token
                    }
                });
                this._context.log(`invoked ${method}:${url}`);
            }
            catch (err) {
                this._context.err(`error invoking ${method}:${url}: ${err}`);
            }
        };
    }
    group(groupName) {
        return new GroupClient(this, groupName);
    }
    user(userName) {
        return new UserClient(this, userName);
    }
    broadcast(content) {
        return this._invoke('ws/api/v1', 'post', content);
    }
    event(header) {
        return new EventHandler(this, header);
    }
}

class AzureWebSocket {
    constructor() { }
    client(connString, hubName, context) {
        return new AzureWebSocketManager(connString, hubName, context);
    }
}

var ws = new AzureWebSocket();
export default ws;
