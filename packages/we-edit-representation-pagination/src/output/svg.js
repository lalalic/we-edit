import PropTypes from "prop-types"
import Base from "./index"
export default class SVG extends Base{
	static displayName="SVG"
	static propTypes={
		...Base.propTypes,
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

	onreset(){
		super.onreset(...arguments)
		this.y=0
		this.depth=-1
		this.defs=new Set()
	}

	spread(attrs){
		return Object.keys(attrs).map(k=>`${k}="${attrs[k]}"`).join(" ")
	}

	onDocument({viewBox}){
		const {pgGap}=this.props
		const [,,width,height]=viewBox.trim().split(/\s+/g)
		this.width=pgGap+parseInt(width)+pgGap
		this.height=parseInt(height)

		this.stream.write(`<svg
	style="background:lightgray"
	width="${this.width}" height="${this.height}"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink">
		`)
		this.stream.write(`<g transform="translate(${pgGap},0)">`)
	}

	onDocumentEnd(e){
		this.stream.end('</g></svg>')
	}

	onPage({width,height}){
		width=parseInt(width)
		height=parseInt(height)
		this.y+=this.props.pgGap
		const { pgGap, pgColor}=this.props
		this.stream.write(`<g transform="translate(${(this.width-width)/2} ${this.y})">`)
		if(pgColor)
			this.stream.write(`<rect width="${width}" height="${height}" fill="${pgColor}"/>`)

		this.y+=height
	}

	onImage(attrs){
		let href=attrs["xlink:href"]
		delete attrs["xlink:href"]
		let id=btoa(href)

		this.stream.write(`<use xlink:href="#${id}"/>`)

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
					const stream=this.stream

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
		this.stream.write(`<text ${this.spread(attrs)}>${text}</text>`)
	}

	onGroup(attrs){
		super.onGroup(...arguments)
		this.stream.write(`<g ${this.spread(attrs)}>`)
	}

	onGroupEnd(){
		super.onGroupEnd()
		this.stream.write("</g>")
	}

	onopentag(){
		super.onopentag(...arguments)
		this.stream.write("\r\n")
		this.depth++
		this.stream.write(new Array(this.depth).fill("\t").join(""))
	}

	onclosetag(){
		super.onclosetag(...arguments)
		this.stream.write("\r\n")
		this.stream.write(new Array(this.depth).fill("\t").join(""))
		this.depth--
	}
}
