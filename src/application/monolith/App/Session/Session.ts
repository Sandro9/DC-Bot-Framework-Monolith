interface sessionDefaults<T> {
    "guildID" : string,
    "channelID" : string,
    "userID" ?: string,
    "replyObj" ?: any,
    "data" : T,
    "roles" ?: string[]
}


type responseTypes = 'CHANNEL' | 'DM' | 'REPLY' | 'EDIT';

export default class Session<T = any>
{
    private guildID: string;
    private userID: string;
    private channelID: string;
    private replyObj : any;
    private roles: string[];
    private data: T;

    private sessionData = {};

    public constructor(defaults: sessionDefaults<T>){
        this.guildID = defaults.guildID;
        this.userID = defaults.userID;
        this.channelID = defaults.channelID;
        this.replyObj = defaults.replyObj ?? null;
        this.data = defaults.data;
        this.roles = defaults.roles ?? [];
    }


    public get_data(): T {
        return this.data;
    }

    public get_roles(): string[] {
        return this.roles;
    }

    public get_guildID(): string
    {
        return this.guildID;
    }

    public get_channelID(): string
    {
        return this.channelID;
    }

    public get_userID(): string 
    {
        return this.userID;
    }

    public get_replyObj(): any
    {
        return this.replyObj; 
    }

    public set_param(key: string, value)
    {
        this.sessionData[key] = value;
    }

    public get_param(key: string): any
    {
        return this.sessionData[key]; 
    }

}