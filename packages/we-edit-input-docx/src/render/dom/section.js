import React, {Component,Children,Fragment} from "react"

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
export default ({Section,Group, Container})=>class __$1 extends Component{
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
		evenAndOddHeaders: PropTypes.bool,
		representation: PropTypes.string,
	}

	static createElement(section,content, createNode){
		let {props:{headers=[],footers=[]}}=section
		headers=headers.map(a=>createNode(a))
		footers=footers.map(a=>createNode(a))
		return React.cloneElement(section,{headers,footers,})
	} 

	constructor(){
		super(...arguments)
		this.section=React.createRef()
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
	}, shallowEqual)

	getHeaderFooterLayout({I,i, },context){
		const {context:{evenAndOddHeaders},props:{titlePg=true,id,pgNumType}}=this
		const inheritHeaderFooter=type=>{
			const document=context.getComposer("root")
			const sections=Children.toArray(document.props.children)
				.filter(a=>a.type.displayName=="section")
				.map(a=>a.props.id)
			return sections.slice(0,sections.indexOf(id)+1)
				.reduceRight((found,id)=>found||context.getComposer(headerFooterID(id))?.getComposedTemplate(type),null)
		}
		const get=type=>{
			const prioritized=[titlePg&&(I==0 ? "first" :false),evenAndOddHeaders&&(i%2==0 ? "even" : "odd"),'default'].filter(a=>!!a)
			const template=prioritized.reduceRight((found,a)=>found || inheritHeaderFooter(`${type}.${a}`),null)
			if(template){
				return template.createComposed2Parent({I,i,pgNumType})
			}
		}

		return {header: get("header"), footer:get("footer")}
	}

	factoryOfCreateLayout=memoize((width,height,margin,cols,type)=>{
		return (props,context)=>{
			const WordSection=this.constructor.Section(Section)
			const Page=WordSection.Layout
			const continuous=type=="continuous"
			const balance=!!context.getComposer("root").props.children.filter(a=>!!a).find((a,i,sections,last=sections[i-1])=>{
				return last?.props.id==props.id && a.props.type=="continuous"
			})

			if(continuous && props.i==0){
				const pages=context.getComposer("root").computed.composed
				const prev=pages[pages.length-1]
				if(prev && prev.continuous){
					const layout=prev._makeContinuousLayout({...props,margin,width,height,balance,I:undefined,cols,},context)
					if(layout){
						return layout
					}
				}
			}

			var {header,footer}=this.getHeaderFooterLayout(props,context)
			
			var y0=margin.top
			if(header){
				header=React.cloneElement(header,{x:margin.left,y:margin.header, className:"header"})
				y0=Math.max(y0, margin.header+header.props.height)
			}

			var y1=height-margin.bottom
			if(footer){
				y1=height-Math.max(margin.bottom, margin.footer+footer.props.height)
				let y=height-margin.footer-footer.props.height
				footer=React.cloneElement(footer,{x:margin.left,y, className:"footer"})
				y1=Math.min(y, y1)
			}

			return new Page({
				continuous,
				balance,
				header,footer,
				width,height,margin,
				cols:cols.map(a=>({...a, y:y0, maxHeight:y1-y0})),
				...props
			},context)
		}
	},shallowEqual)

	render(){
		switch(this.context.represenation){
			case "pagination":
				const PaginationSection=this.constructor.PaginationSection(Section)
				const {HeaderFooterContainer}=WordSection
				const {pgSz:{width,height, orientation},  pgMar, cols, type, headers, footers, ...props}=this.props
				const {left=0,right=0, hfWidth=width-left-right}=pgMar||{}
				const columns=this.getCols(width,pgMar,cols)
				props.layout=(({header,footer,...margin})=>{
					return {margin, header,footer, width, height, cols:columns, orientation}
				})(pgMar)
				props.createLayout=this.factoryOfCreateLayout(width,height,pgMar,columns,type)
				return(
					<Fragment>
						<HeaderFooterContainer id={headerFooterID(this.props.id)}> 
							{headers.map(a=>React.cloneElement(a,{width:hfWidth,hash:a.props.hash+hfWidth}))}
							{footers.map(a=>React.cloneElement(a,{width:hfWidth,hash:a.props.hash+hfWidth}))}
						</HeaderFooterContainer>
						<PaginationSection {...{...props,headers,footers}}/>
					</Fragment>
				)
			default:
				return <Section {...this.props}/>
		}
	}

	static PaginationSection=memoize(Section=>{
		const {composables:{Templateable}}=Section
		return class WordSection extends Section{
			headerFooterChanged(nextProps){
				const {headers=[],footers=[]}=nextProps
				const {headers:_headers=[], footers:_footers=[]}=this.props
				if(headers.length!=_headers.length || footers.length!=_footers.length){
					return true
				}
				if(headers.find((a,i)=>_headers[i]?.props.hash!=a?.props.hash) ||
					footers.find((a,i)=>_footers[i]?.props.hash!=a?.props.hash)){
					return true
				}
				return false
			}

			cancelUnusableLastComposed(nextProps){
				this._headerFooterChanged=this.headerFooterChanged(nextProps)
				const last=this.computed.lastComposed[this.computed.lastComposed.length-1]
				if(last){
					//continuous layout should always be re-appended
					last.continuousLayouts=[]
				}
				super.cancelUnusableLastComposed(nextProps)
			}

			_appendLastComposedUntilSpaceChanged(lastComposed){
				if(this._headerFooterChanged){
					const equals=(cols,cols2)=>cols.length==cols.length && !cols.find((a,i)=>!shallowEqual(a,cols2[i]))
					return lastComposed.findIndex((page,i)=>{
						const newPage=this.createLayout()
						if(equals(page.props.cols, newPage.props.cols)){
							const cloned=page.clone({header:newPage.props.header, footer:newPage.props.footer})
							this.computed.composed.splice(i,1,cloned)
							this.context.parent.appendComposed(this.createComposed2Parent(cloned))
						}else{
							return true
						}
					})
				}
				return super._appendLastComposedUntilSpaceChanged(lastComposed)
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
						},
					})
				}

				get hasMultipleSectionContent(){
					return this.continuousLayouts.length>0
				}

				createComposed2Parent(){
					const {header,footer}=this.props
					const content=super.createComposed2Parent()
					const props={...content.props}
					if(this.hasMultipleSectionContent){
						// each section wrap itself content already, so page frame is not for specific section
						Object.keys(props).filter(k=>k.startsWith("data-")).forEach(k=>props[k]=undefined)
					}
					const {hfAreas,contentAreas}=(()=>{
						const {width,height}=this.props
						const {y:headerY, maxHeight, footerY=maxHeight+headerY}=this.props.cols[0]
						return {
							hfAreas:[
								<rect {...{x:0,y:0,width,height:headerY,key:"header",fill:"transparent"}} />,
								<rect {...{x:0,y:footerY, width,height:height-footerY,key:"footer",fill:"transparent"}}/>
							],
							contentAreas:[
								<rect {...{x:0,y:headerY,width,height:footerY-headerY,key:"content",fill:"transparent"}}/>
							]
						}
					})();
					
					return React.cloneElement(content,props,
						<Group.Layers inactiveStyle={{opacity:0.4}}>
							{[
								<Group.Layer key="headerfooter" z={1} areas={hfAreas}>
									{header}
									{footer}
								</Group.Layer>,
								<Group.Layer key="content" z={2} areas={contentAreas}>
									{content.props.children}
								</Group.Layer>
							]}
						</Group.Layers>
					)
				}

				positionLines(...args) {
					if(!this.hasMultipleSectionContent)
						return super.positionLines(...args)

					// each section wrap itself content to compromise positioning

					var thisSectionLines=Object.assign(
						this._makeContinuousLayout(this.props,this.context, false),
						{computed:{
							...this.computed,
							columns:this.columns.map(a=>({...a,y:undefined})),
						}}
					).createComposed2Parent()
					
					thisSectionLines=React.cloneElement(thisSectionLines,{key:"content",y:this.cols[0].y})
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
							{[thisSectionLines,...layoutsContent]}
						</Group>
					)
				}

				_makeContinuousLayout({margin,width,height,cols,...props},context, checkSpace=true){
					var {cols:[{maxHeight}], composedHeight}=this
					if(checkSpace && (maxHeight-=composedHeight)<=1)
						return 
					const {left=0,right=0}=margin
					const layout=new Section.Layout({
						...props,
						I:undefined,
						cols:cols.map(a=>({...a,maxHeight,y:undefined})),
						width:width-left-right,
						height:undefined,
						_layout:{width,height,cols,margin},//for layoutOf
					},{...context,frame:this})
					layout.computed.isContinuousLayout=true
					return layout
				}

				appendContinuousLayout(layout){
					this.continuousLayouts.push(layout)
				}

				layoutOf({id}){
					const section=this.context.getComposer(id).closest("section")
					if(section?.props.id==this.props.id)
						return super.layoutOf()
					return this.props
				}

				columnIndexOf(lineIndex,positioning){
					return super.columnIndexOf(lineIndex)
				}
			}

			static HeaderFooterContainer=Templateable(Container)
		}
	})
}

const headerFooterID=id=>`${id}_headerfooters`