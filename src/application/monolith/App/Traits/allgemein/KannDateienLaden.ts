import fs from 'fs';

type fileData = {
    path : string,
    fileName : string,
    fileNameFull : string
}

export default class KannDateienLaden
{
    public gib_dateinamen_aus_verzeichnis(dir: string, callback : CallableFunction = () => {})
    {
        const data: string[] = fs.readdirSync(dir);

        const regex = /^([a-z]*)\.d\.ts/gmi;
        for(const i in data){
            const file = data[i];
            if(regex.exec(file) == null)
            {
                const fileData: fileData = {
                    fileNameFull : file,
                    fileName : file.replace('.js', ''),
                    path : dir
                };

                callback(fileData);
            }
        };
    }

    /**
     * Scans recursively the given directory and calls the given files
     * @param dir 
     * @param callback 
     * @param filter 
     * @returns 
     */
    public gib_dateinamen_aus_verzeichnis_rekursiv(dir: string, filter: string = "", callback = ((data: fileData) => {}), filteredData: fileData[] = [])
    {
        var data: string[] = fs.readdirSync(dir);
        if(!data) return;

        for(const i in data){
            const file = data[i];
            if(file.includes(".")) 
            {
                //regular file
                if(file.endsWith(filter)){
                        filteredData.push({
                            fileName : file.replace('.js', ''),
                            fileNameFull : file,
                            path : dir
                        })
                        callback({
                            fileName : file.replace('.js', ''),
                            fileNameFull : file,
                            path : dir
                        })

                }
            } else {
                //directory
                this.gib_dateinamen_aus_verzeichnis_rekursiv(dir+"/"+file,filter, callback, filteredData);
            }
        }
        return filteredData;

    }

    public gib_klassen_aus_verzeichnis(dir : string, callback : CallableFunction = () => {})
    {
        let klassen = [];
        this.gib_dateinamen_aus_verzeichnis(dir, ((file : fileData) => {
            if(file.fileNameFull.endsWith('.js')) {
                const klasse = this.gib_klasse_aus_datei(file.path, file.fileNameFull);
                callback(klasse);
                klassen.push(klasse);
            }
        }));
        return klassen;
    }

    public gib_klasse_aus_datei(filePath,fileName)
    {
        return require(filePath+fileName);
    }

    public gib_dateiname(dir, fileName)
    {
        return {
            fileNameFull : fileName,
            fileName : fileName.replace('.js', ''),
            path : dir
        };
    }

    public gib_datei(filePath,fileName, jsonEncode = false)
    {
        var daten = fs.readFileSync(filePath+fileName,{encoding:'utf8', flag:'r'});
        if(jsonEncode) {
            daten = JSON.parse(daten);
        }
        
        return  daten;
    }


}