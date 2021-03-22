import {Name} from "./primitives"
import DictElement from "./dict-element"
import memoize from "memoize-one"
export default class Page extends DictElement{
    static Type="Page"
    constructor(writer){
        super({
            Resources:writer.xref.getNewDict({
                Font:writer.xref.getNewDict(),
                ExtGState:writer.xref.getNewDict(),
                XObject: writer.xref.getNewDict(),
                ColorSpace: writer.xref.getNewDict(),
                ProcSet,
            }),
            MediaBox:[0,0,0,0],
            Contents:null,
        })
        this.writer=writer
        this.contents=[]
    }

    get xref(){
        return this.writer.xref
    }

    get fontManager(){
        return this.writer.fontManager
    }

    get imageManager(){
        return this.writer.imageManager
    }

    addContent(){
        this.contents.push(...arguments)
    }

    appendChild(child){
        super.appendChild(...arguments)
    }

    font(family){
        let font=this.fontManager.get(family)
        if(!font){
            font=this.fontManager.create(family)  
        }

        if(!this._map.Resources.Font[font.id]){
            this._map.Resources.Font.set(font.id,font.ref)
        }
        
        return font
    }

    image(props){
        let image=this.imageManager.get(props)
        if(!image){
            image=this.imageManager.create(props)  
        }

        if(!this._map.Resources.XObject[image.id]){
            this._map.Resources.XObject.set(image.id,image.ref)
        }
        
        return image
    }

    emitContent(){
        const {width,height}=this.props
        this._map.MediaBox[2]=width
        this._map.MediaBox[3]=height
        this.contents=[`q 1 0 0 -1 0 ${height} cm`]
        this.children.map(a=>a.toCommand(this))
        const stream=this.writer.deflate(this.contents.join("\n"))
        const ref=this.writer.xref.getNewRef(stream)
        this.set("Contents", ref)
        ref.emit(this.writer)
        this.contents=[]
        this.children=[]
    }
}

const ProcSet="PDF,Text,ImageB,ImageC,ImageI".split(",").map(a=>Name.get(a))