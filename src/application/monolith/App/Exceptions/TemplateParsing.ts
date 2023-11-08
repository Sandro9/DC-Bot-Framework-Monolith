import Exception from "./Exception";

export default class TemplateParsing extends Exception implements Exception
{
    protected msg: string = "Fehler im Template: ";
}