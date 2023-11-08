import Exception from "./Exception";

export default class NoEventFound extends Exception implements Exception
{
    protected msg: string = "No Exception Found !";
}