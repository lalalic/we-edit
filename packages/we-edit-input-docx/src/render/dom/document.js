import React, {Component,Children} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ContentQuery,dom} from "we-edit"

export default ({Document})=>class __$1 extends Component{
	static displayName="document"

	static contextTypes={
		Measure: PropTypes.func,
		representation: PropTypes.string, 
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

	render(){
		const numbering={
			get:({id,level=0})=>this.styles[`_num_${id}`].level(level).nextValue(),
			reset:(styles=this.styles)=>Object.keys(styles).forEach((k,t)=>(t=styles[k])&& t.reset && t.reset())
		}

		switch(this.context.representation){
			case "pagination":
				const PaginationDocument=this.constructor.PaginationDocument(Document)
				const {evenAndOddHeaders,...props}=this.props
				return <PaginationDocument numbering={numbering} {...props}/>
			default:
				return <Document numbering={numbering} {...this.props}/>
		}
		
	}

	static PaginationDocument=memoize(Document=>{
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
