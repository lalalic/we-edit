import Measure from "./base"
import FontManager from "../fonts"
import {default as isNode} from "is-node"

export default class FontMeasure extends Measure{
	getFont(){
		return FontManager.get(this.fontFamily, this.style)
	}

    lineHeight(){
		this.font=this.getFont()
        return {
			height : this.font.lineHeight(this.size)*96/72,
			descent: this.font.lineDescent(this.size)*96/72
		}
    }

    stringWidth(input){
		return this.font.stringWidth(input,this.size)*96/72
    }

	static requireFonts(service,fonts=[]){
		const done=()=>{
			let unloaded=fonts.filter(a=>!FontManager.get(a))
			if(unloaded.length>0)
				return Promise.reject(new Error("font["+unloaded.join(",")+"] can't be loaded!"))
		}

		if(fonts.reduce((loaded,k)=>loaded && !!FontManager.get(k),true)){
			return Promise.resolve(done())
		}

		if(isNode && typeof(service)=="string" && require("fs").existsSync(service)){
			return FontManager
				.fromPath(service)
				.finally(done)
		}

		switch(typeof(service)){
		case "string"://url
			return FontManager.fromRemote(service)
				.finally(done)
		case "function":
			return Promise
				.all(fonts.map(a=>FontManager.load(service,a)))
				.finally(done)
		break
		default:
			return Promise.resolve(done())
		break
		}
	}
}
