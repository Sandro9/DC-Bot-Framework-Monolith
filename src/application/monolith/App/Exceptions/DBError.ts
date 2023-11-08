import Exception from "./Exception";

export default class DBError extends Exception implements Exception
{
    protected msg: string = "There's an error in your database: ";
    public constructor(msg: string) {
        super(msg, 'db_error.log.txt');
        this.logToFile();
        this.logToCmd();
    }
}