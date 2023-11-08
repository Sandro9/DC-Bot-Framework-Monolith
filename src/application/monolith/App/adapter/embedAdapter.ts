import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class EmbedAdapter implements adapter_interface
{
    public convertieren(daten)
    {
        let result: any = {};
        daten = daten.daten[0];

        result.color = parseInt(daten.color[0]) ?? 0x0099ff;
        result.title = daten.title[0] ?? '';

        if(daten.url)
        {
            result.url = daten.url[0];
        }

        if(daten.author)
        {
            result.author = {}
            result.author.name = daten.author[0].name[0];
            
            if(daten.author[0].iconurl)
            {
                result.author.icon_url = daten.author[0].iconurl[0];
            }

            if(daten.author[0].url)
            {
                result.author.url = daten.author[0].url[0];
            }
        }

        if(daten.description)
        {
            result.description = daten.description[0];
        }

        if(daten.fields)
        {
            result.fields = [];
            daten.fields[0].field.forEach((field) => {
                let customField: any = {};
                customField.name = field.name[0];
                customField.value = field.value[0];
                
                if(field.inline)
                {
                    customField.inline = field.inline[0];
                }
                result.fields.push(customField);
            })
        }

        if(daten.imageurl)
        {
            result.image = {
                url : daten.imageurl[0]
            }
        }
 
        if(daten.timestamp)
        {
            result.timestamp = daten.timestamp;
        }

        if(daten.footer)
        {
            result.footer = {
                text : daten.footer[0].text[0]
            }

            if(daten.footer[0].iconurl)
            {
                result.footer.icon_url = daten.footer[0].iconurl[0];
            }
        }

        return result;
    }
}