import Base from "./character"

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
		this.p=this._convert(node, "w:pPr",attribs, selector)
	}

	static Direct=class __$1 extends Paragraph{
		constructor(node,styles,selector){
			super(node, styles, selector)
			this.p=this._convert(node, null,attribs, selector)
		}
	}

	flat4Character(){
		return super.flat(...arguments)
	}

	flat(...inherits){
		let targets=[this,...inherits]
		const props=Object.values(attribs)
				.reduce((props, k)=>{
					if(targets.find(a=>(props[k]=a.get(`p.${k}`))!==undefined)){
						if(k==="num"){
							let {numId,ilvl:level=0}=props.num
							let numStyle=this.styles[`_num_${numId}`]
							props.indent={
								...props.indent,
								...numStyle.get(`${level}.p.indent`)
							}

							props.numbering={
								nextValue:()=>numStyle.level(level).nextValue(),
								style:super.flat(numStyle.get(`${level}`),...inherits),
								format:numStyle.parent[level].numFmt,
								numId,
								level,
							}

							delete props.num
						}
					}
					return props
				},{})
		return this.__clear(props,undefined)
	}
}
