import Exception from "./Exception";

export default class InvalidImplementation extends Exception implements Exception
{
    protected msg: string = "Invalide Implementierung";
}