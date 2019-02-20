import docx4js from "docx4js"
import Fetchable from "fetchable"
export default class Document extends docx4js{
	static get URL(){
		if(!this.__cachedData){
			this.__cachedData=new Fetchable("docx-memory")
		}
		return this.__cachedData
	}

	createObjectURL(data,type){
		return Document.URL.createObjectURL(...arguments)
	}

	revokeObjectURL(url){
		return Document.URL.revokeObjectURL(...arguments)
	}

	getDataPartAsUrl(name,type="*/*"){
		let part=this.parts[name]
		let crc32=part._data.crc32
		if(!this._shouldReleased.has(crc32)){
			this._shouldReleased.set(crc32,this.createObjectURL(this.getDataPart(name),type))
		}
		return this._shouldReleased.get(crc32)
	}

	release(){
		for(let [, url] of this._shouldReleased){
			this.revokeObjectURL(url)
		}
	}
}
