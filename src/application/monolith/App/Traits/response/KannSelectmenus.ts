import { SelectMenuBuilder } from "@discordjs/builders";


export default class KannSelectmenus
{
    public create(options: any)
    {
        return new SelectMenuBuilder(options);
    }
}