import chalk from 'chalk';
import Logger from "./Logger";

type aviablePresetKeys = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

type config = {
    selectedPreset ?: aviablePresetKeys
}

type preset = {
    color : string,
    bgColor : string
}

type presets = {
    [d : string] : preset
}

export default class CmdLogger implements Logger 
{
    private presets: presets = {
        "SUCCESS" : {
            "color" : "white",
            "bgColor" : "bgGreenBright"
        },
        "ERROR" : {
            "color" : "white",
            "bgColor" : "bgRedBright"
        },
        "WARNING" : {
            "color" : "black",
            "bgColor" : "bgYellowBright"
        },
        "INFO" : {
            "color" : "black",
            "bgColor" : "bgWhiteBright"
        }
    }
    private selectedPreset;

    public constructor(config: config = {})
    {
        this.selectedPreset = config.selectedPreset ?? 'SUCCESS';
    }

    log(msg: string)
    {
        const def = this.presets[this.selectedPreset];
        console.log(chalk[def.bgColor][def.color](msg));
    }

}