import docx4js from "docx4js"
import Base from "../base"
import Model from "./any"

export default class Docx extends Base{
	static support(file){
		return true
	}

	load(data){
		return docx4js.load(data).then(docx=>{
			return docx.parse(docx4js.createVisitorFactory((srcModel, targetParent)=>{
				if(targetParent)
					return targetParent.appendChild(srcModel)
				else
					return new Model(srcModel)
			}))
		})
	}
}

import Image from "./image"
import Text from "./text"

export let Models={
	Image
	,Text
}
