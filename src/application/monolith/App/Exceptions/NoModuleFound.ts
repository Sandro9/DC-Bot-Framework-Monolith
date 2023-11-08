import Exception from "./Exception";

export default class NoModuleFound extends Exception implements Exception
{
    protected msg: string = "No Module Found !";

    public constructor(msg: string) {
        super(msg ,"no_module_found_error.log.txt");
        this.logToFile();
        this.logToCmd();
    }
}