import { Interaction, GuildMember, GuildMemberRoleManager, Message } from "discord.js";


type ExtendedInteraction = Interaction & {
    commandName : string,
    customId : string
    member : ExtendedMember,
    reply : CallableFunction,
    message : Message
}

//@ts-ignore
interface ExtendedMember extends GuildMember {
    roles : any,
    _roles: any[]
}

interface ExtendedRoles extends GuildMemberRoleManager {
    "add" : any
}

export default ExtendedInteraction