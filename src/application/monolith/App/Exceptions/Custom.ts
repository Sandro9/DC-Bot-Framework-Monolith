import Exception from "./Exception";

export default class Custom extends Exception implements Exception
{
    protected msg: string = "";
    public constructor(msg: string) {
        super(msg);
        this.logToCmd();
    }
}