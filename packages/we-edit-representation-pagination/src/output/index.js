import {Emitter} from "we-edit"
import Parser from "htmlparser2"

const RE_TRANSLATE=/translate\((.*)\s+(.*)\)/
export default class Output extends Emitter.Format.Base{
	static defaultProps={
		...Emitter.Format.Base.defaultProps,
		representation: "pagination"
	}

	output(content){
		debugger
		content.pipe(new Parser.WritableStream(this,{xmlMode:true}))
	}

	onopentag(name,attrs){
		switch(name){
			case 'svg':
				this.onreset()
				this.onDocument(attrs)
			break
			case 'g':
				if(attrs.class=="page")
					this.onPage(attrs)
				else
					this.onGroup(attrs)
			break
			case 'text':
				this._currentText=attrs
			break
			default:{
				let onContent=`on${name[0].toUpperCase()}${name.substr(1)}`
				if(this[onContent]){
					this[onContent](attrs)
				}
			}
		}
	}
	onclosetag(name){
		switch(name){
			case 'g':
				this.onGroupEnd()
			break
			case 'text':
				this.onText(this._currentText)
			break
		}
	}

	onattribute(name, value){

	}

	ontext(text){
		this._currentText.text=text
	}

	onprocessinginstruction(name, data){

	}
	oncomment(data){

	}
	oncommentend(){

	}

	oncdatastart(){

	}
	oncdataend(){

	}

	onerror(error){

	}

	onreset(){
		this._offsets=[{x:0,y:0}]
		this._currentText=null
		this._asyncJobs=[]
	}

	onend(){
		Promise.all(this._asyncJobs)
			.then(()=>{
				this.onDocumentEnd()
			})
			.catch(e=>{
				this.onDocumentEnd(e)
			})
	}

	addAsyncJob(a){
		this._asyncJobs.push(a.catch(e=>{
			console.error(e)
			return e
		}))
	}

	onDocument(){

	}

	onDocumentEnd(){

	}

	onPage(attrs){
		this.onGroup(attrs)
	}

	onImage(){

	}

	onText({text}){

	}

	onGroup({transform="translate(0 0)"}){
		let [,x=0,y=0]=transform.match(RE_TRANSLATE)
		this._offsets.push({x:parseInt(x),y:parseInt(y)})
	}

	onGroupEnd(){
		this._offsets.pop()
	}

	get offset(){
		return this._offsets.reduce((state,{x,y})=>{
			state.x+=x
			state.y+=y
			return state
		},{x:0,y:0})
	}
}
