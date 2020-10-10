'use strict';

declare module 'kobu-lib' {
    import { AxiosResponse, AxiosError } from 'axios';
    import { EventEmitter } from 'events';
    import WebSocketClient from 'ws';

    //#region Class
    
    export interface DefaultOptions {
        ws: {
            baseURL: string,
        };
        http: {
            baseURL: string,
        };
        intents: number;
    };

    export interface RequestData {
        data: object;
        headers: object;
        params: object;
        bearer: string;
    };

    export class Client extends WebSocket {
        constructor(options: DefaultOptions);
        public instance: {
            get: (d: RequestData) => Promise<AxiosResponse | AxiosError>;
            post: (d: RequestData) => Promise<AxiosResponse | AxiosError>;
            patch: (d: RequestData) => Promise<AxiosResponse | AxiosError>;
            put: (d: RequestData) => Promise<AxiosResponse | AxiosError>;
            delete: (d: RequestData) => Promise<AxiosResponse | AxiosError>;
        };

        public request(method: string, url: string, RequestData): Promise<AxiosResponse | AxiosError>;
    };

    export class WebSocket extends EventEmitter {
        constructor(options: DefaultOptions);
        public options: DefaultOptions;
        public token: string;
        public ws: WebSocketClient;
        public heartbeat: number;
        public sequence: number;
        public ack: boolean;
        public session_id: string;
        public ping: number;
        public lastSend: number;

        public connect(token: string): void;
    };

    export type AuditLogEvents = 1 | 10 | 11 | 12 | 13 | 14 | 15 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 30 | 31 | 32 | 40 | 41 | 42 | 50 |51 | 52 | 60 | 61 | 62 | 72 | 73 | 74 | 75 | 80 | 81 | 82;

    export interface AuditLogEntryObject {
        target_id: string;
        changes: ?object[];
        user_id: string;
        id: string;
        action_type: AuditLogEvents;
        reason: string;
    };

    export interface AuditLogObject {
        webhooks: WebhookObject[];
        users: UserObject[];
        audit_log_entries: AuditLogEntryObject[];
        integrations: IntegrationObject[];
    };

    export class AuditLogNode {
        constructor(client: Client, guildID: string);
        public client: Client;
        public guildID: string;

        public async getAuditLog(id: string, options: {
            data: {
                user_id: string,
                action_type: number,
                before: string,
            },
            headers: ?object;
            bearer: ?string;
        }): AxiosResponse | AxiosError;
    };
};