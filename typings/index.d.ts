'use strict';

import { UserObject } from '../src/structures/User';

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
        compress: false;
        large_threshold: 50;
        shard: [number | 0, number | 1];
    };

    export type Snowflake = string;

    export interface RequestData {
        data: object;
        headers: object;
        params: object;
        bearer: string;
    };

    export interface ResponseData<S, T, G, H> {
        data?: S,
        params?: T,
        headers?: G;
        bearer?: H;
    };

    export interface RequestResponse<S> {
        status: ?number;
        data: ?S;
        error: ?Boolean;
        response: AxiosResponse;
    }

    export class Client extends WebSocket {
        constructor(options: DefaultOptions);
        public instance: {
            get: (...d: RequestData) => Promise<RequestResponse<any> | AxiosError>;
            post: (...d: RequestData) => Promise<RequestResponse<any> | AxiosError>;
            patch: (...d: RequestData) => Promise<RequestResponse<any> | AxiosError>;
            put: (...d: RequestData) => Promise<RequestResponse<any> | AxiosError>;
            delete: (...d: RequestData) => Promise<RequestResponse<any> | AxiosError>;
        };

        public request(method: string, url: string, data: RequestData): Promise<RequestResponse<any>>;
    };

    export class WebSocket extends EventEmitter {
        constructor(options: DefaultOptions);
        
        private token: string;
        
        public options: DefaultOptions;
        public ws: WebSocketClient;
        public heartbeat: number;
        public sequence: number;
        public ack: boolean;
        public session_id: string;
        public ping: number;
        public lastSend: number;
        public shardID: number | 0;
        public shardCount: number | 1;

        public connect(token: string): void;
        public getEndpoint(): Promise<?String>;
    };

    export type AuditLogEvents = 1 | 10 | 11 | 12 | 13 | 14 | 15 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 30 | 31 | 32 | 40 | 41 | 42 | 50 |51 | 52 | 60 | 61 | 62 | 72 | 73 | 74 | 75 | 80 | 81 | 82;

    export interface AuditLogEntryObject {
        target_id: string;
        changes: ?object[];
        user_id: Snowflake;
        id: Snowflake;
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
        constructor(client: Client, guildID: Snowflake);
        public client: Client;
        public guildID: Snowflake;

        public async getAuditLog(id: string, options: ResponseData<{
            user_id: Snowflake,
            action_type: number,
            before: Snowflake,
            limit: number,
        }>): Promise<RequestResponse<AuditLogObject>>;
    };

    export interface ChannelObject {
        id: Snowflake;
        type: ChannelTypes;
        guild_id?: ?Snowflake;
        position?: number;
        permission_overwrites?: [OverwriteObject];
        name?: string;
        topic?: ?string;
        nsfw?: boolean;
        last_message_id?: ?Snowflake;
        bitrate?: number;
        user_limit?: number;
        rate_limit_per_user: number;
        recipients?: [UserObject];
        icon?: ?string;
        owner_id?: Snowflake;
        application_id?: Snowflake;
        parent_id?: ?Snowflake;
        last_pin_timestamp?: ?number;
    };

    export enum ChannelTypes {
        GUILD_TEXT = 0,
        DM = 1,
        GUILD_VOICE = 2,
        GROUP_DM = 3,
        GUILD_CATEGORY = 4,
        GUILD_NEWS = 5,
        GUILD_STORE = 6,
    };

    export interface MessageObject {
        id: Snowflake;
        channel_id: Snowflake;
        guild_id?: Snowflake;
        author: UserObject;
        member?: MemberObject;
        content: string;
        timestamp: number;
        edited_timestamp: number;
        tts: boolean;
        mention_everyone: boolean;
        mention_roles: [RoleObject];
        mention_channels: [ChannelMentionObject];
        attachments: [AttachmentObject];
        embeds: [EmbedObject];
        reactions?: [ReactionObject];
        nonce?: number | string;
        pinned: boolean;
        webhook_id?: Snowflake;
        type: MessageTypes;
        activity?: MessageActivityObject;
        application?: MessageApplicationObject;
        message_reference?: MEssageReferenceObject,
        flags?: MessageFlags;
    };

    export enum MessageTypes {
        DEFAULT = 0,
        RECIPIENT_ADD = 1,
        RECIPIENT_REMOVE = 2,
        CALL = 3,
        CHANNEL_NAME_CHANGE = 4,
        CHANNEL_ICON_CHANGE = 5,
        CHANNEL_PINNED_MESSAGE = 6,
        GUILD_MEMBER_JOIN = 7,
        USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
        USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
        CHANNEL_FOLLOW_ADD = 12,
        GUILD_DISCOVERY_DISQUALIFIED = 14,
        GUILD_DISCOVERY_REQUALIFIED = 15,
    };

    export interface MessageActivityObject {
        type: MessageActivityTypes;
        party_id?: string;
    };

    export interface MessageApplicationObject {
        id: Snowflake;
        cover_image?: string;
        description: string;
        icon: ?string;
        name: string;
    };

    export interface MessageReferenceObject {
        message_id?: Snowflake;
        channel_id: Snowflake;
        guild_id?: Snowflake;
    };

    export enum MessageActivityTypes {
        JOIN = 0,
        SPECTATE = 1,
        LISTEN = 3,
        JOIN_REQUEST = 4,
    };

    export enum MessageFlags {
        CROSSPOSTED = 1 << 0,
        IS_CROSSPOST = 1 << 1,
        SUPPRESS_EMBEDS = 1 << 2,
        SOURCE_MESSAGE_DELETED = 1 << 3,
        URGENT = 1 << 4,
    };

    export interface FollowedChannelObject {
        channel_id: Snowflake;
        webhook_id: Snowflake;
    };

    export interface ReactionObject {
        count: number;
        me: boolean;
        emoji: EmojiObject;
    };

    export interface OverwriteObject {
        id: Snowflake;
        type: number;
        allow: string;
        deny: string;
    };

    export interface EmbedObject {
        title?: EmbedTypes;
        type?: string;
        description?: string;
        url?: string;
        timestamp?: number;
        color?: number;
        footer?: EmbedFooterObject;
        image?: EmbedImageObject;
        thumbnail?: EmbedThumbnailObject;
        video?: EmbedVideoObject;
        provider?: EmbedProviderObject;
        author?: EmbedAuthorObject;
        fields: [EmbedFieldObject];
    };

    export type EmbedTypes = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

    export interface EmbedThumbnailObject {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };

    export interface EmbedVideoObject {
        url?: string;
        height?: number;
        width?: number;
    };

    export interface EmbedImageObject {
        url?: string;
        proxy_url?: string;
        height?: number;
        widht?: number;
    };

    export interface EmbedProviderObject {
        name?: string;
        url?: string;
    };

    export interface EmbedAuthorObject {
        name?: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };

    export interface EmbedFooterObject {
        text: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };

    export interface EmbedFieldObject {
        name: string;
        value: string;
        inline?: boolean;
    };

    export interface AttachmentObject {
        id: Snowflake;
        filename: string;
        size: number;
        url: string;
        height: ?number;
        width: ?number;
    };

    export interface ChannelMentionObject {
        id: Snowflake;
        guild_id: Snowflake;
        type: number;
        name: string;
    };

    export type AllowedMentionTypes = 'roles' | 'users' | 'everyone';

    export interface AllowedMentionsObject {
        parse: [AllowedMentionTypes];
        roles: [Snowflake];
        users: [Snowflake];
    };

    export class ChannelNode {
        constructor(client: Client, channelID: Snowflake);

        public client: Client;
        public channelID: Snowflake;

        public get(id?: Snowflake): Promise<RequestResponse<ChannelObject>>;
        public modify(options: RequestData<{
            name: string;
            type: number;
            position: ?number;
            topic: ?string;
            nsfw: ?boolean;
            rate_limit_per_user: ?number;
            bitrate: ?number;
            user_limit: ?number;
            permission_overwrites: ?[OverwriteObject];
            parent_id: ?Snowflake;
        }>, id?: Snowflake): Promise<RequestResponse<ChannelObject>>;
        public delete(id?: Snowflake): Promise<RequestResponse<ChannelObject>>;
        public getMessages(options: RequestData<null, {
            around: Snowflake;
            before: Snowflake;
            after: Snowflake;
            limit: number;
        }>, id?: Snowflake): Promise<RequestResponse<[MessageObject]>>;
        public getMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse<MessageObject>>;
        public createMessage(options: RequestData<{
            content: string;
            nonce: string | number;
            tts: boolean;
            file: any;
            embed: EmbedObject;
            payload_json: string;
            allowed_mentions: AllowedMentionsObject,
        }, null, ?'application/json' | 'multipart/form-data'>, id?: Snowflake): Promise<RequestResponse<Message>>;
        public crosspostMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse<Message>>;
        public createReaction(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<RequestResponse>;
        public deleteOwnReaction(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<ReactionObject>;
        public deleteUserReaction(messageID: Snowflake, emoji: string, userID: Snowflake, channelID?: Snowflake): Promise<ReactionObject>;
        public getReactions(messageID: Snowflake, emoji: string, options: RequestData<null, {
            before?: Snowflake,
            after?: Snowflake,
            limit?: 25,
        }>, channelID?: Snowflake): Promise<RequestResponse<[User]>>;
        public deleteAllReactions(messageID: Snowflake, channelID: Snowflake): Promise<RequestResponse>;
        public deleteAllReactionsForEmoji(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<RequestResponse>;
        public editMessage(messageID: Snowflake, options: RequestData<null, {
            content: string,
            embed: EmbedObject,
            flags: number,
        }>): Promise<RequestResponse<MessageObject>>;
        public deleteMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public bulkDeleteMessages(options: RequestData<null, {
            messages: [Snowflake],
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public editPermissions(overwriteID: Snowflake, options: RequestData<null, {
            allow: string,
            deny: string,
            type: number,
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public getInvites(id?: Snowflake): Promise<RequestResponse<[InviteObject]>>;
        public createInvite(options: RequestData<null, {
            max_age: number,
            max_uses: number,
            temporary: boolean,
            unique: boolean,
            target_user: string,
            target_user_type: number,
        }>, id?: Snowflake): Promise<RequestResponse<InviteObject>>;
        public deletePermission(overwriteID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public followNews(options: RequestData<null, {
            webhook_channel_id: Snowflake,
        }>, id?: Snowflake): Promise<RequestResponse<FollowedChannelObject>>;
        public TriggerTypingIndicator(id?: Snowflake): Promise<RequestResponse>;
        public getPinnedMessages(id?: Snowflake): Promise<RequestResponse<[MessageObject]>>;
        public addPinnedMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public deletePinnedMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public groupDMAddRecipient(userID: Snowflake, options: RequestData<null, {
            access_token: string,
            nick: string,
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public groupDMRemoveRecipient(userID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        
    };
};