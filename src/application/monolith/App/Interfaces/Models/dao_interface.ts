export default interface dao_interface 
{
    getById(bereich: string, ID: string);
    update(obj: any);
    save_new(obj);
    indices_anlegen(obj);
    unique_indices_anlegen(obj);
}