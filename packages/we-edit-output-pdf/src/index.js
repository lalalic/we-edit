import {Emitter, Representation} from "we-edit"
import PDFDocument from "pdfkit"

export default class PDF extends Representation.Output.Pagination{
	static displayName="PDF"
	static defaultProps={
		type:"pdf",
		name:"PDF Document",
		ext:"pdf",
		representation: "pagination"
	}

	onDocument(){
		super.onDocument()
		this.pdf=new PDFDocument({autoFirstPage:false})
		this.pdf.pipe(this.stream)
	}
	
	onPage(){
		this.pdf.addPage()
	}
	
	onText({text,x=0,y=0,fontSize,fontWeight,fontFamily,fill}){
		let {x:x0,y:y0}=this.offset
		x+=x0
		y+=y0
		this.pdf.text(text,x,y)
	}
	
	onImage({width,height,...props}){
		let {x,y}=this.offset
		let href=props["xlink:href"]
		let job=fetch(href)
			.then(res=>{
				if(!res.ok){
					throw new Error(res.statusText)
				}
				return res.arrayBuffer()
			})
			.then(buffer=>this.pdf.image(buffer,x,y-height,width,height))
		this.addAsyncJob(job)
	}
	
	onDocumentEnd(){
		this.pdf.end()
		super.onDocumentEnd()
		this.pdf=null
	}
}
