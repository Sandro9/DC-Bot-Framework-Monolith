import Exception from "./Exception";

export default class NoControllerFound extends Exception
{
    protected msg: string = "No Controller Found: ";

    public constructor(msg: string) {
        super(msg);
        this.logToFile();
        this.logToCmd();
    }
}