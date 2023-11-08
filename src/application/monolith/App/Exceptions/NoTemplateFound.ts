import Exception from "./Exception";

export default class NoTemplateFound extends Exception
{
    protected msg: string = "No Template Found: ";

    public constructor(msg: string) {
        super(msg);
        this.logToFile();
        this.logToCmd();
    }
}