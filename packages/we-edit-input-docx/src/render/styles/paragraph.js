import Base from "./character"
import {fromJS} from "immutable"

const attribs={
	"w:spacing":"spacing",
	"w:ind":"indent",
	"w:jc":"align",
	"w:outlineLvl":"heading",
	"w:widowControl":"widow",
	"w:keepNext":"keepWithNext",
	"w:keepLines":"keepLines",
	"w:tabs":"tabs",
	"w:numPr":"num",
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
		const targets=[this,...inherits].filter(a=>!!a)
		const props=Object.values(attribs).reduce((props, k)=>{
			const target=targets.find(a=>(props[k]=a.get(`p.${k}`))!==undefined)
			if(target && k==="num"){
				this.applyNumbering(props, target)
			}
			return props
		},{})
		return this.__clear(props,undefined)
	}

	applyNumbering(props, style) {
		const { numId, ilvl: level = 0 } = props.num
		const numStyle = this.styles[`_num_${numId}`]
		const indent=numStyle.get(`${level}.p.indent`)
		props.indent={
			...props.indent,
			...indent,
			...style.p?.indent
		}

		props.numbering = {
			nextValue: () => numStyle.level(level).nextValue(),
			style: numStyle.get(`${level}.r`),
			format: numStyle.parent[level].numFmt,
			numId,
			level,
			indent,
			label: numStyle.parent[level].lvlText,
			start: numStyle.parent[level].start,
		}

		delete props.num
	}

	hashCode(){
		return fromJS(this.flat()||{}).hashCode()
	}
}
