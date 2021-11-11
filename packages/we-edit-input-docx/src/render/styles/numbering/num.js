import {Getable} from "../base"
import Level from "./level"
import NUMFMT from "./number-format"

export default class Num extends Getable{
	constructor(node, styles, selector){
		super(...arguments)
		this.id=`_num_${node.attribs["w:numId"]}`

		let levels=new Set()

		node.children.forEach(a=>{
			switch(a.name){
				case "w:abstractNumId":
					this.basedOn=`_abstractNum_${a.attribs["w:val"]}`
				break
				case "w:lvlOverride":{
					let level=a.attribs["w:ilvl"]
					let startOverride=a.children.find(b=>b.name=='w:startOverride')
					let lvl=a.children.find(b=>b.name=="w:lvl")||{name:"w:lvl",attribs:{"w:ilvl":level},children:[]}

					if(startOverride)
						lvl.children.push({name:"w:start",attribs:{"w:val":startOverride.attribs["w:val"]}})

					this[level]=new NumLevel(lvl,styles,selector,this)
					break
				}
			}
		})

		this.level=level=>{
			levels.add(level)
			if(!this[level])
				this[level]=new NumLevel({attribs:{"w:ilvl":level},children:[]},styles,selector, this)

			return this[level]
		}

		this.reset=()=>{
			for(let i of levels){
				this[i].reset()
			}
		}
	}
}
class NumLevel extends Level{
	current=0

	constructor(node, styles, selector,parent){
		super(...arguments)
		this.num=parent
	}

	nextValue(){
		if(this.lvlPicBulletId)
			throw new Error("pic bullet not supported yet!")

		const {start,numFmt,lvlText}="start,numFmt,lvlText".split(",")
			.reduce((p,k)=>{
				p[k]=this[k]||this.num.parent.get(`${this.level}.${k}`)
				return p
			},{})


		return lvlText.replace(/%(\d+)/g, (a,level)=>{
			level=parseInt(level)-1
			if(level==this.level){
				return (NUMFMT[numFmt]||NUMFMT['decimal'])(start+this.current++)
			}else
				return this.num.level(level).currentValue()
		})
	}

	currentValue(i=this.current-1){
		const {start,numFmt,lvlText}="start,numFmt,lvlText".split(",")
			.reduce((p,k)=>{
				p[k]=this[k]||this.num.parent.get(`${this.level}.${k}`)
				return p
			},{})
		return (NUMFMT[numFmt]||NUMFMT['decimal'])(start+Math.max(0,i))
	}

	reset(){
		this.current=0
		this.content=[]
	}
}
