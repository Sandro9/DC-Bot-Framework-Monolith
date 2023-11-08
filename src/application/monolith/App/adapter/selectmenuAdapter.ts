import adapter_interface from "../Interfaces/Adapter/adapter_interface";

export default class SelectmenuAdapter implements adapter_interface
{
    public convertieren(daten)
    {
        let result: any = {};

        daten = daten.daten[0];
        result = {
            'custom_id' : daten.customid[0],
            'disabled' : false,
            'placeholder': daten.placeholder[0],
            'max_values' : daten.maxvalues ? daten.maxvalues[0] : 1,
            'min_values' : daten.minvalues ? daten.minvalues[0] : 0,
            'options' : []
        }

        daten.options[0].option.forEach((option) => {
            result.options.push({
                'label': option.label[0],
                'value' : option.value[0],
                'description' : option.description[0]
            })
        })

        if(daten.disabled) 
        {
            result.disabled = daten.disabled[0] == 'true' ? true : false;
        }
        return result;
    }
}