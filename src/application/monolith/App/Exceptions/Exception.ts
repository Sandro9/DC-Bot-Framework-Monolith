import cmd_logger from "../Log/cmd_logger";
import file_logger from "../Log/file_logger";

export default abstract class Exception
{
    protected msgExtension: string;
    protected msg: string;
    

    private file_logger;
    private cmd_logger = new cmd_logger({
        "selectedPreset" : "ERROR"
    });


    public constructor(msgExtension = null, errorLogName = null)
    {
        if(msgExtension)
        {
            this.msgExtension = msgExtension;
        }
        this.file_logger = new file_logger({
            "logName" : errorLogName
        });
    }

    public getMsg(){
        return this.msg + this.msgExtension;
    }

    public logToFile(){
        this.file_logger.log(this.getMsg());
    }

    public logToCmd(){
        this.cmd_logger.log(this.getMsg())
    }
}