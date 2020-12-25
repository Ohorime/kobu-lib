'use strict';

import User, { UserObject } from '../src/structures/User';

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
        embeds: EmbedObject[10];
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

        public async get(id?: Snowflake): Promise<RequestResponse<ChannelObject>>;
        public async modify(options: RequestData<{
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
        public async delete(id?: Snowflake): Promise<RequestResponse<ChannelObject>>;
        public async getMessages(options: RequestData<null, {
            around: Snowflake;
            before: Snowflake;
            after: Snowflake;
            limit: number;
        }>, id?: Snowflake): Promise<RequestResponse<[MessageObject]>>;
        public async getMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse<MessageObject>>;
        public async createMessage(options: RequestData<{
            content: string;
            nonce: string | number;
            tts: boolean;
            file: any;
            embed: EmbedObject;
            payload_json: string;
            allowed_mentions: AllowedMentionsObject,
        }, null, ?'application/json' | 'multipart/form-data'>, id?: Snowflake): Promise<RequestResponse<Message>>;
        public async crosspostMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse<Message>>;
        public async createReaction(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<RequestResponse>;
        public async deleteOwnReaction(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<ReactionObject>;
        public async deleteUserReaction(messageID: Snowflake, emoji: string, userID: Snowflake, channelID?: Snowflake): Promise<ReactionObject>;
        public async getReactions(messageID: Snowflake, emoji: string, options: RequestData<null, {
            before?: Snowflake,
            after?: Snowflake,
            limit?: 25,
        }>, channelID?: Snowflake): Promise<RequestResponse<[User]>>;
        public async deleteAllReactions(messageID: Snowflake, channelID: Snowflake): Promise<RequestResponse>;
        public async deleteAllReactionsForEmoji(messageID: Snowflake, emoji: string, channelID?: Snowflake): Promise<RequestResponse>;
        public async editMessage(messageID: Snowflake, options: RequestData<null, {
            content: string,
            embed: EmbedObject,
            flags: number,
        }>): Promise<RequestResponse<MessageObject>>;
        public async deleteMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public async bulkDeleteMessages(options: RequestData<null, {
            messages: [Snowflake],
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public async editPermissions(overwriteID: Snowflake, options: RequestData<null, {
            allow: string,
            deny: string,
            type: number,
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public async getInvites(id?: Snowflake): Promise<RequestResponse<[InviteObject]>>;
        public async createInvite(options: RequestData<null, {
            max_age: number,
            max_uses: number,
            temporary: boolean,
            unique: boolean,
            target_user: string,
            target_user_type: number,
        }>, id?: Snowflake): Promise<RequestResponse<InviteObject>>;
        public async deletePermission(overwriteID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public async followNews(options: RequestData<null, {
            webhook_channel_id: Snowflake,
        }>, id?: Snowflake): Promise<RequestResponse<FollowedChannelObject>>;
        public async TriggerTypingIndicator(id?: Snowflake): Promise<RequestResponse>;
        public async getPinnedMessages(id?: Snowflake): Promise<RequestResponse<[MessageObject]>>;
        public async addPinnedMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public async deletePinnedMessage(messageID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
        public async groupDMAddRecipient(userID: Snowflake, options: RequestData<null, {
            access_token: string,
            nick: string,
        }>, channelID?: Snowflake): Promise<RequestResponse>;
        public async groupDMRemoveRecipient(userID: Snowflake, channelID?: Snowflake): Promise<RequestResponse>;
    };

    export interface EmojiObject {
        id: ?Snowflake;
        name: ?string;
        roles?: [Snowflake];
        user?: RoleObject;
        require_colons?: boolean;
        managed?: boolean;
        animated?: boolean;
        available?: boolean;
    };

    export class EmojiNode {
        constructor(client: Client, guildID: Snowflake, emojiID: Snowflake);

        public client: Client;
        public guildID: Snowflake;
        public emojiID: Snowflake;

        public async list(guildID?: Snowflake): Promise<RequestResponse<[EmojiObject]>>;
        public async get(emojiID?: Snowflake, guildID?: Snowflake): Promise<RequestResponse<EmojiNode>>;
        public async create(options: RequestData<{
            name: String,
            image: String,
            roles: [Snowflake],
        }>, guildID: Snowflake): Promise<RequestResponse<EmojiObject>>;
        public async modify(options: RequestData<{
            name: string,
            roles: ?[Snowflake],
        }>, emojiID: Snowflake, guildID: Snowflake): Promise<RequestResponse<EmojiObject>>;
        public async delete(emojiID: Snowflake, guildID: Snowflake): Promise<RequestResponse>;
    };

    export interface GuildObject {
        id: Snowflake;
        name: string;
        icon: ?string;
        icon_hash: ?string;
        splash: ?string;
        discorvery_splash: ?string;
        owner?: boolean;
        owner_id: Snowflake;
        permissions?: string;
        region: string;
        afk_channel_id: ?Snowflake;
        afk_timeout: number;
        widget_enabed: boolean;
        widget_channel_id: ?Snowflake;
        verification_level: VerificationLevel;
        default_message_notifications: DefaultMessageNotificationLevel;
        explicit_content_filter: ExplicitContentFilterLevel;
        roles: [RoleObject];
        emojis: [EmojiObject];
        features: [GuildFeature];
        mfa_level: MFALevel;
        application_id: ?Snowflake;
        system_channel_id: ?Snowflake;
        system_channel_flags: SystemChannelFlags;
        rules_chnnel_id: ?Snowflake;
        joined_at?: number;
        large?: boolean;
        unavailable?: boolean;
        member_count?: number;
        voice_states?: [VoiceStateObject];
        members?: [GuildMemberObject];
        channels?: [ChannelObject];
        presences?: [PresenceUpdateObject];
        max_presences?: ?number;
        max_members?: number;
        vanity_url_code: ?string;
        description: ?string;
        banner: ?string;
        premium_tier: PremiumTier   ;
        premium_subscription_count?: number;
        preferred_locale: string;
        public_updates_channel_id: ?Snowflake;
        max_video_channel_users: number;
        approximate_member_count: number;
        approximate_presence_count: number;
    };

    export enum DefaultMessageNotificationLevel {
        ALL_MESSAGES = 0,
        ONLY_MENTIONS = 1,
    };

    export enum ExplicitContentFilterLevel {
        DISABLED = 0,
        MEMBERS_WITHOUT_ROLES = 1,
        ALL_MEMBERS = 2,
    };

    export enum MFALevel {
        NONCE = 0,
        ELEVATED = 1,
    };

    export enum VerificationLevel {
        NONE = 0,
        LOW = 1,
        MEDIUM = 2,
        HIGH = 3,
        VERY_HIGH = 4,
    };

    export enum PremiumTier {
        NONE = 0,
        TIER_1 = 1,
        TIER_2 = 2,
        TIER_3 = 3,
    };

    export enum SystemChannelFlags {
        SUPRESS_JOIN_NOTIFICATIONS = 1 << 0,
        SUPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
    };

    export type GuildFeature = 'INVITE_SPLASH' | 'VIP_REGIONS' | 'VANITY_URL' | 'VERIFIED' | 'PARTNERED' | 'COMMUNITY' | 'COMMERCE' | 'NEWS' | 'DISCOVERABLE' | 'FEATURANLE' | 'ANIMATED_ICON' | 'BANNER' | 'WELCOME_SCREEN_ENABLED';

    export interface GuildPreviewObject {
        id: Snowflake;
        name: string;
        icon: ?string;
        splash: ?string;
        discovery_splash: ?string;
        emojis: [EmojiObject];
        features: [GuildFeature];
        approximate_member_count: number;
        approximate_presence_count: number;
        description: ?string;
    };

    export interface GuildWidgetObject {
        enabled: boolean;
        channel_id: ?Snowflake;
    };

    export interface GuildMemberObject {
        user?: UserObject;
        nick: ?string;
        roles: [Snowflake];
        joined_at: number;
        premium_since?: ?number;
        deaf: boolean;
        mute: boolean;
    };

    export interface IntegrationObject {
        id: Snowflake;
        name: string;
        type: string;
        enabled: boolean;
        role_id: Snowflake;
        enable_emoticons?: boolean;
        expire_behavoir: IntegrationExpireBehavoirs;
        expire_grace_period: number;
        user: ?UserObject;
        account: AccountObject;
        async_at: number;
        subscriber_count: number;
        revoked: boolean;
        application: ApplicationObject;
    };

    export type IntegrationExpireBehavoirs = 0 | 1;

    export interface ApplicationCommandOptionChoice {
        name: string;
        value: string | number;
    };

    export enum ApplicationCommandOptionsType {
        SUB_COMMAND = 1,
        SUB_COMMAND_GROUP = 2,
        STRING = 3,
        INTEGER = 4,
        BOOLEAN = 5,
        USER = 6,
        CHANNEL = 7,
        ROLE = 8,
    }

    export interface ApplicationCommandOption {
        type: ApplicationCommandOptionsType;
        name: string;
        description: string;
        default?: boolean;
        required: boolean;
        choices: ApplicationCommandOptionChoice[];
        options: ApplicationCommandOption[];
    };

    export interface ApplicationCommand {
        id: Snowflake;
        application_id: Snowflake;
        name: string;
        description: string;
        options: ApplicationCommandOption[];
    };

    export enum InteractionType {
        Ping = 1,
        ApplicationCommand = 2,
    };

    export interface Interaction {
        id: Snowflake;
        type: InteractionType;
        data?: ApplicationCommandInteractionData;
        guild_id: Snowflake;
        channel_id: Snowflake;
        member: GuildMemberObject;
        token: string;
        version: number;
    };

    export interface ApplicationCommandInteractionData {
        id: Snowflake;
        name: string;
        options?: ApplicationCommandInteractionDataOption[];
    };

    export interface ApplicationCommandInteractionDataOption {
        name: string;
        value?: OptionsType;
        options?: ApplicationCommandInteractionDataOption[];
    };

    export enum InteractionResponseType {
        Pong = 1,
        Acknowledge = 2,
        ChannelMessage = 3,
        ChannelMessageWithSource = 4,
        ACKWithSource = 5,
    };

    export interface InteractionResponse {
        type: InteractionResponseType;
        data?: InteractionApplicationCommandCallbackData;
    };

    export interface InteractionApplicationCommandCallbackData {
        tts?: boolean;
        content: string;
        embeds: EmbedObject[10];
        allowed_mentions: AllowedMentionsObject;
    };

    export class SplashNode {
        constructor(client: Client, applicationID: Snowflake, guildID: Snowflake, commandID: Snowflake, interaction: {
            id: Snowflake,
            token: string,
        }, messageID: Snowflake);

        public client: Client;
        public applicationID: Snowflake;
        public applicationToken: Snowflake;
        public commandID: Snowflake;
        public guildID: Snowflake;
        public interaction: {
            id: Snowflake,
            token: string,
        };
        public messageID: Snowflake;

        public async getGlobalApplicationCommands(applicationID?: Snowflake): Promise<RequestResponse<ApplicationCommand[]>>;
        public async createGlobalApplicationCommand(options: {
            name: string,
            description: string,
            options: ApplicationCommandOption[],
        }, applicationID?: Snowflake): Promise<RequestResponse<ApplicationCommand>>;
        public async editGlobalApplicationCommand(options: {
            name: string,
            description: string,
            options: ApplicationCommandOption[],
        }, applicationID?: Snowflake): Promise<RequestResponse<ApplicationCommand>>;
        public async deleteGlobalApplicationCommand(commandID?: Snowflake, applicationID?: Snowflake): Promise<RequestResponse<void>>;
        public async getGuildApplicationCommand(guildID?: Snowflake, applicationID: Snowflake): Promise<RequestResponse<ApplicationCommand>>;
        public async createGuildApplicationCommand(options: {
            name: string,
            description: string,
            options: ApplicationCommandOption[],
        }, guildID?: Snowflake, applicationID?: Snowflake): Promise<RequestResponse<ApplicationCommand>>;
        public async editGuildApplicationCommand(options: {
            name: string,
            description: string;
            options: ApplicationCommandOption[],
        }, commandID?: Snowflake, guildID?: Snowflake, applicationID?: Snowflake): Promise<RequestResponse<ApplicationCommand>>;
        public async deleteGuildApplicationCommand();
    };
};