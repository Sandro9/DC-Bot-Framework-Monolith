import model1 from "./model1";
import model2 from "./model2";





async function run(){

    //await ModelRegister.create().registriere_models_in_verzeichnis(__dirname);
/*
    const kittySchema = new mongoose.Schema({
        name: String
      });

    const Kitten = mongoose.model('Kitten', kittySchema);
    const merlin = new Kitten({"name" : "Merlin."});
    await merlin.save();
    console.log("Saved.")
    */
    const modlTyp1: model1 = await model1.erstellen({"name" : "irgendwas", "profession" : "test"});
    const modlTyp2: model1 = await model1.erstellen({"name" : "irgendwas", "profession" : "test1"});

    console.log(model1.laden_indice('name', 'irgendwas'));
    console.log(model1.laden_unique_indice('profession', 'test'))
    process.exit();
    const modlTyp2_1: model2 = await model2.erstellen({"name" : "irgendwer"});
    const modlTyp2_2: model2 = await model2.erstellen({"name" : "irgendwer"});
    const modlTyp2_3: model2 = await model2.erstellen({"name" : "irgendwer"});
    const modlTyp2_4: model2 = await model2.erstellen({"name" : "irgendwer"});

    modlTyp1.has_one(modlTyp2_1, true);
    modlTyp1.has_one_many(modlTyp2_2,true);
    modlTyp1.has_one_many(modlTyp2_3,true);
    modlTyp1.has_one_many(modlTyp2_4,true);

    const modelTyp2_ref: model2 = await modlTyp1.gib_one(model2.BEREICH);
    console.log(await model2.laden("635cf07193dd69d1090e0726"));
    process.exit();

    if(modelTyp2_ref.gib_datensatz_id() == modlTyp2_1.gib_datensatz_id()) {
        console.log("test was successfull in gib_one ")
    } else {
        console.log("error occured in gib_one test");
    }


    const modelTypen_2_ref = modlTyp1.gib_many(model2.BEREICH);
    const expectedIDs = [
        modlTyp2_2.gib_datensatz_id(),
        modlTyp2_3.gib_datensatz_id(),
        modlTyp2_4.gib_datensatz_id()
    ]
    
    Object.keys(modelTypen_2_ref).forEach((modelID,index) => {
        const model: model2 = modelTypen_2_ref[modelID];
        if(expectedIDs[index] == model.gib_datensatz_id()) {
            console.log("test was successfull in gib_many")
        } else {
            console.log("error occured in gib_many");
        }
    });
}

run()