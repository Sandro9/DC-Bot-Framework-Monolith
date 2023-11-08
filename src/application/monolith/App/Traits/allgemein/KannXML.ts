export default class KannXML
{
    private parser = require('xml2js').parseString;
    private builder  = require('xml2js').buildObject;

    public parse(inhalt, callback: CallableFunction = (() => {}))
    {
        return this.parser(inhalt,callback);
    }

    public xml(obj: JSON)
    {
        return this.builder(obj);   
    }


}