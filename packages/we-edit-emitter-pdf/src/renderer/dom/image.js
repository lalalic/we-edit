import Group from "./group"
import { Name } from "./primitives"
export default class Image extends Group{
    static createManager(xref){
        return new Manager(xref)
    }
    postChildCommand(){
        const {xlinkHref, width,height}=this.props
        const image=this.page.image({src:xlinkHref, ...this.props})
        this.addContent(`${width} 0 0 -${height} 0 ${height} cm /${image.id} Do`)
    }
}

class Manager{
    constructor(xref){
        this.xref=xref
        this.items=Object.create(null)
        let id=0
        this.createId=()=>`P${++id}`
    }

    get(props){
        return this.items[props.src]
    }

    create({width,height,src}){
        const id=this.createId()
        const ref=this.xref.getNewRef(new Promise(resolve=>{
            fetch(src)
            .then(res=>res.arrayBuffer())
            .then(buffer=>{
                resolve({
                    dict:this.xref.getNewDict({
                        Type: Name.get("XObject"),
                        Subtype : Name.get("Image"),
                        Width:width,
                        Height:height,
                        ColorSpace : Name.get("DeviceRGB"),
                        BitsPerComponent : 8,
                        Interpolate : true,
                        Filter: Name.get("DCTDecode")
                    }),
                    getBytes(){
                        return Buffer.from(buffer)
                    },
                    id,ref,
                })
            })
        }))
        return this.items[src]=Object.assign(ref.obj,{id,ref})
    }
}

