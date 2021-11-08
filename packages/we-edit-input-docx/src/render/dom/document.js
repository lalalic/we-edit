import React, {Component,Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ContentQuery,dom} from "we-edit"

export default ({Document})=>class __$1 extends Component{
	static displayName="document"

	static contextTypes={
		Measure: PropTypes.func,
	}

	static childContextTypes={
		styles: PropTypes.object,
		evenAndOddHeaders: PropTypes.bool,
		style: PropTypes.object,
		defaultTab: PropTypes.shape({
			pos:PropTypes.number.isRequired,
			leader: PropTypes.string,
			val: PropTypes.string,
		}),
		getField: PropTypes.func,
	}

	get styles(){
		return this.props.styles
	}

	getChildContext(){
		return {
			styles:this.styles,
			defaultTab:{pos:this.props.defaultTab},
			evenAndOddHeaders: !!this.props.evenAndOddHeaders,
			style: this.styles['*'],
			getField:id=>{
				const field=this.props.content.getIn([id,"props"])
				return field.toJS()
			}
		}
	}

	getNumbering=memoize(content=>{
		var list=null
		const styles=this.styles
		return id=>{
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
	},(a,b)=>a.equals(b))

	render(){
		const numbering={
			get:id=>this.getNumbering(this.props.content)(id),
			reset:(styles=this.styles)=>Object.keys(styles).forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
		}

		if(Document.support('pageable')){
			const WordDocument=this.constructor.Document(Document)
			const {evenAndOddHeaders,...props}=this.props
			return <WordDocument numbering={numbering} {...props}/>
		}
		return <Document numbering={numbering} {...this.props}/>
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
