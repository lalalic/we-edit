import Character from "./character"
import {fromJS} from "immutable"
import {clean} from "we-edit"

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
export default class Paragraph extends Character{
	constructor(node,styles,selector){
		super(node, styles, selector)
		this.type="paragraph"
		this.p=this._convert(node, "w:pPr",attribs, selector)
	}

	static Direct=class __$1 extends Paragraph{
		constructor(node,styles,selector){
			super(node, styles, selector)
			this.p=this._convert(node, null,attribs, selector)
			if(!this.basedOn){
				this.basedOn=`*${this.type}`
			}
		}

		getLink(){
			return this.styles[this.basedOn]?.getLink()
		}

		applyNumbering(props){
			const numbering=super.applyNumbering(props)
			if(numbering && this.p.indent){
				props.indent={
					...props.indent,
					...this.p.indent,
				}
			}
			return numbering
		}
	}

	flat4Character(){
		return super.flat()
	}

	flat(){
		const props=Object.values(attribs).reduce((props, k)=>{
			props[k]=this.get(`p.${k}`)
			if(k==="num" && props.num){
				this.applyNumbering(props)
			}
			return props
		},{})
		return clean(props)
	}

	applyNumbering(props) {
		const { numId, abstractNumId, ilvl: level = 0 } = props.num
		const numStyle = this.styles[`_num_${numId}`]||this.styles[`_abstractNum_${abstractNumId}`]
		if(!numStyle){
			delete props.num
			return 
		}
		const indent=numStyle.get(`${level}.p.indent`)
		props.indent={
			...props.indent,
			...indent
		}

		props.numbering = {
			nextValue: () => numStyle.level(level).nextValue(),
			style: numStyle.get(`${level}.r`),
			format: numStyle.get(`${level}.numFmt`),
			id:numId,
			level,
			indent,
			label: numStyle.get(`${level}.label`),
			start: numStyle.get(`${level}.start`),
		}

		delete props.num
		return props.numbering
	}

	hashCode(){
		return fromJS(this.flat()||{}).hashCode()
	}
}
