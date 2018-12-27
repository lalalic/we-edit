import Base from "./character"

const attribs={
	"w:spacing":"spacing",
	"w:ind":"indent",
	"w:numPr":"num",
	"w:jc":"align",
	"w:outlineLvl":"heading",
	"w:widowControl":"widow",
	"w:keepNext":"keepWithNext",
	"w:keepLines":"keepLines"
}
export default class Paragraph extends Base{
	constructor(node,styles,selector){
		super(...arguments)
		this.p=this._convert(node, "w:pPr",attribs, selector)
	}

	static Direct=class extends Paragraph{
		constructor(node,styles,selector){
			super(...arguments)
			this.p=this._convert(node, null,attribs, selector)
		}
	}

	flat4Character(){
		return super.flat(...arguments)
	}

	flat(...inherits){
		let targets=[this,...inherits]
		return Object.values(attribs)
				.reduce((props, k)=>{
					if(targets.find(a=>(props[k]=a.get(`p.${k}`))!==undefined)){
						if(k==="num"){
							let {numId,ilvl:level}=props.num
							let numStyle=this.styles[`_num_${numId}`]
							props.indent={
								...props.indent,
								...numStyle.get(`${level}.p.indent`)
							}

							props.numbering={
								label:numStyle.level(level).invoke(`next`),
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
	}
}
