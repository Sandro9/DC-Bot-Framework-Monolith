import { SlashCommandBuilder,SlashCommandBooleanOption, SlashCommandIntegerOption,SlashCommandRoleOption,SlashCommandStringOption,SlashCommandNumberOption,SlashCommandMentionableOption,SlashCommandChannelOption,SlashCommandAttachmentOption, PermissionFlagsBits } from "discord.js";

export default class KannSlashCommands 
{
    public create(daten)
    {
        daten = daten.daten[0];

        var builder = new SlashCommandBuilder()
            .setName(daten.name[0])
            .setDescription(daten.description[0])
            .setDMPermission(daten.rechte?.[0]?.dm[0] === 'true' ? true : false);

        if(daten.rechte?.[0].options){
            var permissionBit = null;
            daten.rechte[0].options[0]?.recht?.forEach((rechtName) => {
                if(permissionBit == null) {
                    permissionBit = PermissionFlagsBits[rechtName];
                } else {
                    permissionBit = PermissionFlagsBits[rechtName] | permissionBit;
                }
            });
            builder.setDefaultMemberPermissions(permissionBit);
        }
        
        if(daten.options){
            daten.options[0].option.forEach((selectedOption) => {
                if(selectedOption.typ[0] == "String")
                {
                    builder.addStringOption((subOption: SlashCommandStringOption) =>  this.setCommandOption(subOption, selectedOption));
                } else if(selectedOption.typ[0] == "Role") {
                    builder.addRoleOption((subOption:SlashCommandRoleOption) => this.setCommandOption(subOption, selectedOption));
                } else if (selectedOption.typ[0] == "Boolean") {
                    builder.addBooleanOption((subOption: SlashCommandBooleanOption) => this.setCommandOption(subOption,selectedOption))
                } else if (selectedOption.typ[0] == "Channel") {
                    builder.addChannelOption((subOption: SlashCommandChannelOption) => this.setCommandOption(subOption,selectedOption))
                } else if (selectedOption.typ[0] == "Number") {
                    builder.addNumberOption((subOption: SlashCommandNumberOption) => this.setCommandOption(subOption,selectedOption))
                } else if (selectedOption.typ[0] == "Integer") {
                    builder.addIntegerOption((subOption: SlashCommandIntegerOption) => this.setCommandOption(subOption,selectedOption))
                } else if (selectedOption.typ[0] == "Mentionable") {
                    builder.addMentionableOption((subOption: SlashCommandMentionableOption) => this.setCommandOption(subOption,selectedOption))
                } else if (selectedOption.typ[0] == "Attachment") {
                    builder.addMentionableOption((subOption: SlashCommandMentionableOption) => this.setCommandOption(subOption,selectedOption))
                }
            })
        }
        return builder;
    }

    private setCommandOption(subOption: any, selectedOption)
    {
        
        subOption.setName(selectedOption.name[0])
        .setDescription(selectedOption.description[0])

        if(selectedOption.required) {
            subOption.setRequired(selectedOption.required[0] == 'true' ? true : false)
        }

        if(!selectedOption.choices) return subOption;
        
        selectedOption.choices[0].choice.forEach((choice) => {
            subOption.addChoices({
                "name" : choice.name[0], "value" : choice.value[0]
            })
        });
        return subOption;
    }
}