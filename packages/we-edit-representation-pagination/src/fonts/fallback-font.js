import FontKit from "fontkit"
export default function createFallbackFont(font){
    return Promise.resolve(font)
    return new Promise((resolve,reject)=>{
        const subset=font.createSubset()
        let Directory, tables;
        subset.extendStructure=(a,b)=>{
            Directory=a
            tables=b
        }
   
        Object.defineProperties(subset,{
            cmap:{
                get(){
                    return undefined
                    const subTable={
                        version: 13,
                        reserved:0,
                        length:0,//?
                        language: 0,
                        nGroups:1,
                        groups: [{
                            startCharCode:0x1,
                            endCharCode:0x2,
                            glyphID:0,
                        }]
                    }
                    subTable.length=tables.cmap.fields.tables.type.fields.table.type.size(subTable)
                    return {
                        version: 0,
                        numSubtables:3,
                        tables: [
                            {
                                //unicode
                                platformID: 0,
                                encodingID: 0,
                                table: subTable,
                            },
                            {
                                //mac
                                platformID: 1,
                                encodingID: 0,
                                table: subTable,
                            },
                            {
                                //windows
                                platformID: 3,
                                encodingID: 1,
                                table: subTable,
                            }
                        ]
                    }
                }
            },
            name:{
                get(){
                    return undefined
                    const name={en:"fallback"}
                    tables.name.records={
                        fontFamily:name,
                        fullName:name,
                        postscriptName:name,
                    }
                    tables.name.preEncode()
                    const {version,records,stringOffset,count}=tables.name
                    return {version,records,stringOffset,count}
                }
            }
        })

        const stream=subset.encodeStream(), data=[]
        stream.on('data',trunk=>{
            data.push(trunk)
        })
        stream.on('end',()=>{
            resolve(new Blob([data]).arrayBuffer())
        })
    })
    .then(data=>{
        const font=FontKit.create(Buffer.from(data))
        return font
    })
}