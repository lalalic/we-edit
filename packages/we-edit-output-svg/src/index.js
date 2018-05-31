import PropTypes from "prop-types"
import {Emitter, Representation} from "we-edit"

export default class SVG extends Representation.Pagination{
	static displayName="SVG"
	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		representation: PropTypes.string.isRequired,
		
		pgGap: PropTypes.number,
		pgColor: PropTypes.string,
	}

	static defaultProps={
		type:"svg",
		name:"SVG Document",
		ext:"svg",
		representation: "pagination",
		
		pgGap:24,
		pgColor:"white"
	}
	
	constructor(){
		super(...arguments)
		const {pgGap, pages}=this.props
		let {width,height}=pages.reduce((max,{size:{width,height}})=>{
			max.width=Math.max(width,max.width)
			max.height+=height+pgGap
			return max
		},{width:0,height:0})
		
		this.width=width+2*pgGap
		this.height=height+pgGap
	}
	
	onreset(){
		super.onreset(...arguments)
		this.y=0
		this.depth=-1
		this.defs=new Set()
	}
	
	spread(attrs){
		return Object.keys(attrs).map(k=>`${k}="${attrs[k]}"`).join(" ")
	}
	
	onDocument(){
		this.props.stream.write(`<svg 
	style="background:lightgray"
	width="${this.width}" height="${this.height}"
	xmlns="http://www.w3.org/2000/svg" 
	xmlns:xlink="http://www.w3.org/1999/xlink">
		`)
	}

	onDocumentEnd(e){
		this.props.stream.end('</svg>')
	}

	onPage({width,height}){
		width=parseInt(width)
		height=parseInt(height)
		this.y+=this.props.pgGap
		const {stream, pgGap, pgColor}=this.props
		stream.write(`<g transform="translate(${(this.width-width)/2} ${this.y})">`)
		if(pgColor)
			stream.write(`<rect width="${width}" height="${height}" fill="${pgColor}"/>`)
		
		this.y+=height
	}

	onImage(attrs){
		let href=attrs["xlink:href"]
		delete attrs["xlink:href"]
		let id=btoa(href)
		
		this.props.stream.write(`<use xlink:href="#${id}"/>`)
		
		if(!this.defs.has(href)){
			this.defs.add(href)
			let job=fetch(href)
				.then(res=>{
					if(!res.ok){
						throw new Error(res.statusText)
					}
					return res.arrayBuffer()
				})
				.then(buffer=>{
					const {stream}=this.props
					
					const toString=view=>view.reduce((b,a,i)=>{
							b[i]=String.fromCharCode(a)
							return b
						},new Array(view.byteLength)).join("")
				
					stream.write(`<defs>`)
					stream.write(`<image id="${id}" ${this.spread(attrs)} `)
					stream.write('xlink:href="data:image/*;base64,')
					stream.write(btoa(toString(new Uint8Array(buffer))))
					stream.write('"')
					stream.write('/>')
					stream.write(`</defs>`)
				})

			this.addAsyncJob(job)
		}
	}

	onText({text, ...attrs}){
		this.props.stream.write(`<text ${this.spread(attrs)}>${text}</text>`)
	}
	
	onGroup(attrs){
		super.onGroup(...arguments)
		this.props.stream.write(`<g ${this.spread(attrs)}>`)
	}
	
	onGroupEnd(){
		super.onGroupEnd()
		this.props.stream.write("</g>")
	}
	
	onopentag(){
		super.onopentag(...arguments)
		this.props.stream.write("\r\n")
		this.depth++
		this.props.stream.write(new Array(this.depth).fill("\t").join(""))		
	}
	
	onclosetag(){
		super.onclosetag(...arguments)
		this.props.stream.write("\r\n")
		this.props.stream.write(new Array(this.depth).fill("\t").join(""))
		this.depth--
				
	}
}

Emitter.support(SVG)
