import Base from "./character"
import {fromJS} from "immutable"

const attribs={
	"w:spacing":"spacing",
	"w:ind":"indent",
	"w:numPr":"num",
	"w:jc":"align",
	"w:outlineLvl":"heading",
	"w:widowControl":"widow",
	"w:keepNext":"keepWithNext",
	"w:keepLines":"keepLines",
	"w:tabs":"tabs",
}
export default class Paragraph extends Base{
	constructor(node,styles,selector){
		super(node, styles, selector)
		this.type="paragraph"
		this.p=this._convert(node, "w:pPr",attribs, selector)
	}

	static Direct=class __$1 extends Paragraph{
		constructor(node,styles,selector){
			super(node, styles, selector)
			this.p=this._convert(node, null,attribs, selector)
		}

		getLink(){
			return this.styles[this.basedOn]?.getLink()
		}
	}

	flat4Character(){
		return super.flat(...arguments)
	}

	flat(...inherits){
		const targets=[this,...inherits]
		const props=Object.values(attribs)
				.reduce((props, k)=>{
					if(targets.find(a=>(props[k]=a.get(`p.${k}`))!==undefined)){
						if(k==="num"){
							const {numId,ilvl:level=0}=props.num
							const numStyle=this.styles[`_num_${numId}`]
							const indent=numStyle.get(`${level}.p.indent`)
							props.indent={
								...props.indent,
								...indent,
							}

							props.numbering={
								nextValue:()=>numStyle.level(level).nextValue(),
								style:numStyle.get(`${level}.r`),
								format:numStyle.parent[level].numFmt,
								numId,
								level,
								indent,
							}

							delete props.num
						}
					}
					return props
				},{})
		return this.__clear(props,undefined)
	}

	hashCode(){
		return fromJS(this.flat()).hashCode()
	}
}
