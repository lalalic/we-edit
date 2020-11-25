import React, {Component,Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ContentQuery} from "we-edit"

export default ({Document})=>class __$1 extends Component{
	static displayName="document"

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
			numbering: id=>this.numberingContext(this.props.content).numbering(id),
			getField:id=>{
				const field=this.props.content.getIn([id,"props"])
				return field.toJS()
			}
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
		const WordDocument=this.constructor.Document(Document)
		const {evenAndOddHeaders,...props}=this.props
		this.resetNumbering()
		return <WordDocument {...props}/>
	}

	static Document=memoize(Document=>class WordDocument extends Document{
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
	})
}
