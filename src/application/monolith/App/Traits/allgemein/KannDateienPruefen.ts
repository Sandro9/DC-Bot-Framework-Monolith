import fs from "fs";

export default class KannDateienPruefen
{
    public pruefe_pfad_existenz(pfad: string): boolean
    {
        if(fs.existsSync(pfad))
        {
            return true;
        }
        return false;
    }
}
  