import {Getable} from "../base"
import Level from "./level"

export default class AbstractNum extends Getable{
	constructor(node, styles, selector){
		super(...arguments)
		this.type="abstractNum"
		this.abstractNumId=node.attribs["w:abstractNumId"]
		this.id=`_abstractNum_${this.abstractNumId}`
		
		node.children.filter(a=>a.name=="w:lvl").forEach(lvl=>{
			this[parseInt(lvl.attribs["w:ilvl"])]=new Level(lvl,styles,selector,this)
		})

		this.level=i=>this[i]
	}

	flat(){
		return new Array(9).fill(0).map((a,i)=>this.styles.Normal.applyNumbering({num:{abstractNumId:this.abstractNumId,ilvl:i}}))
	}
}