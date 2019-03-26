import {Parser, DomHandler} from "htmlparser2"
import JSONDocument from "../json"

export default class extends JSONDocument{
    static support(file){
		if(!file)//for installer
			return true

		const {data, name, ext, type}=file
		if(ext && ext=="xml")
			return true

		if(name && name.endsWith(".xml"))
			return true

		if(type && type=="document")
			return true
		return false
	}

	static defaultProps={
		type:"xml",
		ext:"xml",
		name:"We-Edit XML document",
		mimeType:"application/xml"
	}

    parse({data, ...props}){
        const opt={xmlMode:true,decodeEntities: false}
        const handler=new ContentDomHandler(opt)
        new Parser(handler,opt).end(data)
        const dom=handler.dom
        return super.parse({data:dom,...props})
    }


}

class ContentDomHandler extends DomHandler{
	_addDomElement(el){
		if(el.type=="text"){
			if(el.name!=="text"){
                return;
            }
            el.children=el.data
		}
        el.props=e.attribs
        return super._addDomElement(el)
	}

    onDocumentElement(el){

    }

    onSectionElement(el){

    }

    onParagraphElement(el){

    }
}
