import docx4js from "docx4js"
import Base from "../base"

import Model from "./any"

export default class Docx extends Base{
	static support(file){
		return true
	}
	
	load(data){
		return docx4js.load(data).then(docx=>{
			let currentParent=null
			return docx.parse(docx4js.createVisitorFactory((srcModel, targetParent)=>{
				if(targetParent)
					return currentParent=currentParent.appendChild(srcModel, targetParent)
				else
					return currentParent=new Model(srcModel)
			}))
		})
	}
} 