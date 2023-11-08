import InvalidImplementation from "../../Exceptions/InvalidImplementation";

type temp = {
    template : {
        rechte : number[],
        seite : bausteine[]
    }
}

type bausteine = {
    bausteine : baustein[]
}

type baustein = {
    pfad : string[]
}

export default class KannFormPrüfen
{

    public prüfe(_template: temp)
    {
    }
}