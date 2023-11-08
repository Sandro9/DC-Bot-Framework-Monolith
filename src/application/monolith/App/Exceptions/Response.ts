import Exception from "./Exception";

export default class Response extends Exception 
{
    protected msg: string = "Whoops! There was an error, maybe some ID missconfiguration? In : ";

    public constructor(msg: string) {
        super(msg, "response_error.log.txt");
        this.logToFile();
    }

}