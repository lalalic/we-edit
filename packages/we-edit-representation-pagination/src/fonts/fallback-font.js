import FontKit from "fontkit"
export default function createFallbackFont(font){
    return Promise.resolve(font)
    return new Promise((resolve,reject)=>{
        const subset=font.createSubset()
        const cmapTable = {
            version: 13, //format0
            language: 0,
            nGroups:1,
            //length:
            groups: [{
                startCharCode:1,
                endCharCode:0xFFFFFFFF,
                glyphID:0,
            }]
        }
        subset.cmap={
            version: 0,
            numSubtables: 3,
            tables: [
                {
                    //unicode
                    platformID: 0,
                    encodeingID: 0,
                    table: cmapTable,
                },
                {
                    //mac
                    platformID: 1,
                    encodeingID: 0,
                    table: cmapTable,
                },
                {
                    //windows
                    platformID: 3,
                    encodeingID: 1,
                    table: cmapTable,
                },
            ],
        }
        const name="fallback"
        subset.name={
            version:0,
            count:3,
            stringOffset:0,
            records:[
                {
                    platformID: 0,
                    encodingID: 4,
                    languageID: 0,
                    nameID:     1,
                    string: name,
                    length:  name.length,
                },
                {
                    platformID: 0,
                    encodingID: 4,
                    languageID: 0,
                    nameID:     4,
                    string: name,
                    length:  name.length,
                },
                {
                    platformID: 0,
                    encodingID: 4,
                    languageID: 0,
                    nameID:     6,
                    string: name,
                    length:  name.length,
                },
            ]
        }

        const stream=subset.encodeStream(), data=[]
        stream.on('data',trunk=>{
            data.push(trunk)
        })
        stream.on('end',()=>{
            resolve(new Blob([data]).arrayBuffer())
        })
    })
    .then(data=>{
        const name="Fallback", names=["familyName","postscriptName","fullName"]
        const font=FontKit.create(Buffer.from(data))
        return new Proxy(font,{
            get(font,key){
                if(names.includes(key))
                    return name
                return Reflect.get(...arguments)
            }
        })
    })
}