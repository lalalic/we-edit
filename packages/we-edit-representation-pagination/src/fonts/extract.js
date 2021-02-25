import FontKit from "fontkit"
import r from 'restructure'

export default function serialize(font){
    //from font collection file
    return new Promise((resolve)=>{
        const buffer=font.stream.buffer
        const {tag, numTables,searchRange,entrySelector,rangeShift,tables}=font.directory
        const stream=new r.EncodeStream(), data=[]
        stream.on('readable',(a,b,c,chunk)=>{
            while(null!=(chunk=stream.read())){
                data.push(chunk)
            }
        })
        stream.on('end',()=>{
            resolve(data)
        })

        const _preEncode=FontKit.Directory.preEncode
        const _offsetEncode=FontKit.Directory.fields.tables.type.fields.offset.encode
        try{
            FontKit.Directory.preEncode=null
            /**
             * to make table offset a multiple of 4 
             */
            FontKit.Directory.fields.tables.type.fields.offset.encode=function(stream, val, ctx){
                if((ctx.parent.pointerOffset % 4)!=0){
                    //it's global pointer, so use parent context
                    const len=4 - (ctx.parent.pointerOffset % 4)
                    //insert data before current pointer to make offset meet multiple 4
                    ctx.parent.pointers.push({
                        type:new r.Buffer(),
                        val:new Uint8Array(len).fill(0),
                        parent:ctx,
                    })
                    ctx.parent.pointerOffset+=len
                    //ctx.pointerSize useless, so don't sync it
                }
                return _offsetEncode.call(this,...arguments)
            }
            
            FontKit.Directory.encode(stream,{
                tag, numTables,searchRange,entrySelector,rangeShift,
                tables:Object.values(tables).map(({tag,checkSum,length,offset})=>({
                    tag,checkSum,length,
                    offset: new r.VoidPointer(new r.Buffer(), buffer.slice(offset,offset+length))
                }))
            })
            stream.end()
        }finally{
            FontKit.Directory.preEncode=_preEncode
            FontKit.Directory.fields.tables.type.fields.offset.encode=_offsetEncode
        }
    })
}