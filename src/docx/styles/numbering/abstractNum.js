import {Getable} from "../base"
import Level from "./level"

export default class AbstractNum extends Getable{
	constructor(node, styles, selector){
		super(...arguments)
		this.id=`_abstractNum_${node.attribs["w:abstractNumId"]}`
		
		node.children.filter(a=>a.name=="w:lvl").forEach(lvl=>{
			this[lvl.attribs["w:ilvl"]]=new Level(lvl,styles,selector,this)
		})
	}
}