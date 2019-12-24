import React, {Component,Children} from "react"

import PropTypes from "prop-types"
import memoize from "memoize-one"
import {shallowEqual} from "recompose"

/**
 * Word Continuous section is special as balanceable section, 
 * and is able to be appended to last continuous section, which breaks the law of:
 * each page frame only includes content from single section
 * 
 * there are two ways to resolve:
 * 1. Page[continuous section frame, ...], which is a frame manager, each frame is a multiple cols
 * ** each section hold its own frame as section layout
 * **** cache works good on section level, but 
 * ** inner frame balance itself
 * ** document must be customized to accept section layout
 * 
 * 2. page[continuous section cols, ...], which is a multiple cols frame
 * ** 
 * 
 */
export default ({Section,Group})=>class __$1 extends Component{
	static displayName="section"
	static propTypes={
		cols: PropTypes.shape({
			num: PropTypes.number.isRequired,
			space: PropTypes.number,
			data: PropTypes.arrayOf(PropTypes.shape({
				width: PropTypes.number,
				space: PropTypes.number
			}))
		}),
		titlePg:PropTypes.bool
	}

	static defaultProps={
		cols:{
			num:1
		}
	}

	static contextTypes={
		evenAndOddHeaders: PropTypes.bool
	}

	static childContextTypes={
		headerFooterWidth: PropTypes.number
	}

	getChildContext(){
		const {pgSz:{width},  pgMar:{left=0,right=0}={}}=this.props
		return {
			headerFooterWidth:width-left-right
		}
	}

	getCols=memoize((width,{left=0,right=0},{num=1, space=0, data})=>{
		const availableWidth=width-left-right
		return (data ? data : new Array(num)
			.fill({width:(availableWidth-(num-1)*space)/num,space}))
			.reduce((state,{width,space})=>{
				state.cols.push({x:state.x, width})
				state.x+=(space+width)
				return state
			},{x:left,cols:[]}).cols
	}, (a,b)=>a===b||shallowEqual(a,b))

	getHeaderFooter({I,i},context){
		const {context:{evenAndOddHeaders},props:{titlePg=true,id}}=this
		const inheritHeaderFooter=type=>{
			const document=context.getComposer("root")
			const sections=Children.toArray(document.props.children)
				.filter(a=>a.type.displayName=="section")
				.map(a=>a.props.id)
			return sections.slice(0,sections.indexOf(id)+1)
				.reduceRight((found,id)=>found||context.getComposer(id).named(type),null)
		}
		const get=type=>[titlePg&&(I==0 ? "first" :false),evenAndOddHeaders&&(i%2==0 ? "even" : "odd"),'default']
			.filter(a=>!!a)
			.reduceRight((found,a)=>found || inheritHeaderFooter(`${type}.${a}`),null)

		return {header: get("header"), footer:get("footer")}
	}

	getCreate=memoize((width,height,margin,cols,type)=>{
		return (props,context)=>{
			const WordSection=this.constructor.Section(Section)
			const Page=WordSection.Layout
			const continuous=type=="continuous"
			if(continuous && props.i==0){
				const pages=context.getComposer("root").computed.composed
				const prev=pages[pages.length-1]
				if(prev && prev.continuous){
					const layout=prev._makeContinuousLayout({...props,margin,width,I:undefined,cols,},context)
					if(layout){
						return layout
					}
				}
			}

			var {header,footer}=this.getHeaderFooter(props,context)
			
			var y0=margin.top
			if(header){
				header=React.cloneElement(header,{x:margin.left,y:margin.header, className:"header"})
				y0=Math.max(y0, margin.header+header.props.height)
			}

			var y1=height-margin.bottom
			if(footer){
				let y=height-margin.footer-footer.props.height
				this.footer=React.cloneElement(footer,{x:margin.left,y, className:"footer"})
				y1=Math.min(y, y1)
			}

			return new Page({
				continuous,
				balance:continuous,
				header,footer,
				width,height,margin,
				cols:cols.map(a=>({...a, y:y0, maxHeight:y1-y0})),
				...props
			},context)
		}
	},(a,b)=>a===b||shallowEqual(a,b))

	render(){
		const WordSection=this.constructor.Section(Section)
		const {pgSz:{width,height},  pgMar, cols, type,...props}=this.props
		const create=this.getCreate(width,height,pgMar,this.getCols(width,pgMar,cols),type)

		return(<WordSection createLayout={create} {...props}/>)
	}

	static Section=memoize(Section=>class WordSection extends Section{
		cancelUnusableLastComposed(...args){
			const last=this.computed.lastComposed[this.computed.lastComposed.length-1]
			if(last){
				last.continuousLayouts=[]
			}
			return super.cancelUnusableLastComposed(...args)
		}


		/**
		 * composed+continuousLayouts
		 * createComposed2Parent must be customized for react-poisitioning for frame tree
		 */
		static Layout=class Page extends Section.Layout{
			defineProperties(){
				super.defineProperties()
				this.computed.continuousLayouts=[]
				Object.defineProperties(this,{
					continuousLayouts:{
						get(){
							return this.computed.continuousLayouts
						},
						set(v){
							this.computed.continuousLayouts=v
						}
					},
					continuous:{
						get(){
							return this.props.continuous
						}
					},
					composedHeight:{
						get(){
							const height=frame=>Math.max(...frame.columns.map(a=>a.contentHeight))
							return this.computed.continuousLayouts.reduce((H,a)=>H+height(a),height(this))
						}
					}
				})
			}

			get hasMultipleSectionContent(){
				return this.continuousLayouts.length>0
			}

			createComposed2Parent(){
				const {header,footer}=this
				const headerFooter=(header || footer) && (<Group z={-1}>{header}{footer}</Group>)
				const content=super.createComposed2Parent()
				const props={...content.props}
				if(this.hasMultipleSectionContent){
					// each section wrap itself content already, so page frame is not for specific section
					Object.keys(props).filter(k=>k.startsWith("data-")).forEach(k=>props[k]=undefined)
				}
				
				return React.cloneElement(content,props,...[...content.props.children,headerFooter].filter(a=>a))
			}

			positionLines(...args) {
				if(!this.hasMultipleSectionContent)
					return super.positionLines(...args)

				// each section wrap itself content to compromise positioning
				const thisSectionLines=Object.assign(
					this._makeContinuousLayout(this.props,this.context)
						.clone({cols:this.cols.map(a=>({...a,y:undefined}))}),
						{computed:this.computed}
				).createComposed2Parent()
				
				var y=Math.max(...this.columns.map(a=>a.blockOffset))
				var height=Math.max(...this.columns.map(({contentHeight,height=contentHeight})=>height))
				const layoutsContent=this.continuousLayouts.map((frame,i)=>{
					const frameContent=React.cloneElement(frame.createComposed2Parent(),{y,key:i})
					y+=frameContent.props.height
					height+=frameContent.props.height
					return frameContent
				})
				return (
					<Group height={height}>
						{thisSectionLines}
						{layoutsContent}
					</Group>
				)
			}

			_makeContinuousLayout({margin:{left=0,right=0},width,cols,...props},context){
				var {cols:[{y=0, maxHeight}], composedHeight}=this
				y+=composedHeight, maxHeight-=composedHeight
				if(maxHeight<=1)
					return 

				return Object.assign(new Section.Layout({
					...props,
					cols:cols.map(a=>({...a,maxHeight,y:undefined})),
					balance:true,
					width:width-left-right,
					height:undefined,
				},{...context,frame:this}),{isContinuousLayout:true})
			}

			appendContinuousLayout(layout){
				this.continuousLayouts.push(layout)
			}
		}
	})
}