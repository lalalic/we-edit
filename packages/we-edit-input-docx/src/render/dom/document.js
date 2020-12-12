import React, {Component,Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ContentQuery} from "we-edit"

export default ({Document})=>class __$1 extends Component{
	static displayName="document"

	static contextTypes={
		Measure: PropTypes.func,
	}

	static childContextTypes={
		styles: PropTypes.object,
		evenAndOddHeaders: PropTypes.bool,
		style: PropTypes.object,
		numbering: PropTypes.func,
		defaultTab: PropTypes.shape({
			pos:PropTypes.number.isRequired,
			leader: PropTypes.string,
			val: PropTypes.string,
		}),
		getField: PropTypes.func,
		pilcrowMeasure: PropTypes.object,
	}

	get styles(){
		return this.props.styles
	}

	constructor(){
		super(...arguments)
		this.pilcrowMeasure=new this.context.Measure(this.props.pilcrow)
	}

	getChildContext(){
		return {
			styles:this.styles,
			defaultTab:{pos:this.props.defaultTab},
			evenAndOddHeaders: !!this.props.evenAndOddHeaders,
			style: this.styles['*'],
			numbering: id=>this.numberingContext(this.props.content).numbering(id),
			getField:id=>{
				const field=this.props.content.getIn([id,"props"])
				return field.toJS()
			},
			pilcrowMeasure:this.pilcrowMeasure
		}
	}

	resetNumbering(){
		const styles=this.styles
		//reset for numbering
		Object.keys(styles)
			.forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
	}

	numberingContext=memoize(content=>{
		var list=null
		const styles=this.styles
		return {
			numbering(id){
				if(!list){
					list={}
					ContentQuery
						.fromContent(content)
						.findFirst(a=>{
							if(a.get('type')=="paragraph"){
								if(a.hasIn(["props","numId"])){
									const numId=a.getIn(["props","numId"])
									const level=a.getIn(["props","level"])
									;(list[numId]=list[numId]||[]).push([a.get("id"),level])
								}
								return false
							}
						})
				}
				const {numId,level}=content.getIn([id,"props"]).toJS()
				const i=list[numId].findIndex(a=>a[0]==id)

				const levelCount=list[numId].slice(0,i+1).reduce((db,[id,level])=>{
					db.set(level,(db.get(level)||0)+1)
					return db
				},new Map())

				return styles[`_num_${numId}`].level(level).label(levelCount)
			}
		}
	},(a,b)=>a.equals(b))

	render(){
		this.resetNumbering()
		
		if(Document.support('pageable')){
			const WordDocument=this.constructor.Document(Document)
			const {evenAndOddHeaders,pilcrow,...props}=this.props
			return <WordDocument {...props}/>
		}
		return <Document {...this.props}/>
	}

	static Document=memoize(Document=>{
		class WordDocument extends Document{
			appendComposed(page){
				if(page.computed.isContinuousLayout){
					const pages=this.computed.composed
					const last=pages[pages.length-1]
					if(last && last.continuous){
						last.appendContinuousLayout(page)
					}
					return 
				}
				super.appendComposed(page)
			}
		}

		if(!Document?.support('editable'))
			return WordDocument

		return class EditableWordDocument extends WordDocument{
			tocNeedPage(content=this.props.content){
				const toc=ContentQuery.fromContent(content,'#ToC')
				const page=toc.findFirst('fieldBegin[command=PAGEREF]')
				const num=(page.attr('display')||"").trim()
				return !num
			}

			static getDerivedStateFromProps(props,...args){
				const state=super.getDerivedStateFromProps(props,...args)
				if(Document.displayName.indexOf('editable')!=-1 
					&& !state.composeAll 
					&& state.mode=="content" 
					&& props.content.has('ToC') 
					&& WordDocument.prototype.tocNeedPage(props.content)){
					console.warn('compose all content because of toc need page')
					state.composeAll=true
				}
				return state
			}
		}
	})
}
