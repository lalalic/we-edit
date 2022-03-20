import React, {Component,Fragment} from "react"
import {ReactQuery,connect, getUI, dom, PropTypes} from "we-edit"

import memoize from "memoize-one"

export default ({Paragraph, Group, Frame,})=>class DocxParagraph extends Component{
	static displayName="paragraph"
	static propTypes={
		style: PropTypes.object.isRequired,
		numId: PropTypes.string,
		level: PropTypes.number,
		outline: PropTypes.number,
	}

	static contextTypes={
		style: PropTypes.object,
		tabWidth: PropTypes.func,
		hintMeasure: PropTypes.object,
	}

	static childContextTypes={
		style: PropTypes.object,
		tabWidth: PropTypes.func,
	}

	style=memoize((direct,context)=>{
		const all=direct.mixin(context)
		const defaultStyle=all.flat4Character()
		const style=all.flat()
		if(style.indent){
			if(style.indent.hanging){
				style.indent.firstLine=-style.indent.hanging
			}
		}

		if(style.numbering){
			let {style:props,indent:{left,firstLine,hanging=-firstLine}, format, label, start}=style.numbering
			style.numbering={
				style:{...defaultStyle,...props},
				id: this.props.numId,
				level: this.props.level,
				indent:left,
				hanging,
				format, 
				start,
				label,
			}
		}

		return {style,defaultStyle}
	})


	childStyle=memoize((direct,context)=>{
		/**
		 * paragraph's direct pPr>rPr doesn't affect content style, it's just for editor to hint style of paragraph symbol
		 * so override r style with empty
		 */
		return Object.assign(direct.clone(),{r:{}}).mixin(context)
	})

	getChildContext(){
		return {
			style:this.childStyle(this.props.style, this.context.style),
		}
	}

	render(){
		if(Paragraph.support('pageable')){
			const {style:$1, hash,...props}=this.props
			const {style:{widow,orphan=widow, spacing,...style}, defaultStyle:{...defaultStyle}}=this.style(this.props.style,this.context.style)
			const DocxParagraph=this.constructor.Paragraph(Paragraph)
			return (
				<Frame.AutoFitManager.Context.Consumer>
					{({scale})=>{
						if(scale){
							console.debug(`paragraph font size autofit scaled from ${defaultStyle.size} to ${defaultStyle.size=Math.floor(defaultStyle.size*parseInt(scale)/100000)}`)
						}
						return <DocxParagraph
							{...style}
							{...props}
							{...{widow,orphan,defaultStyle, spacing}}
							hash={`${hash}-${scale}`}
							/>
					}}
				</Frame.AutoFitManager.Context.Consumer>
			)
		}
		return <Paragraph {...this.props}/>
	}

	static Paragraph=memoize(Paragraph=>{
		class WordParagraph extends Paragraph{
			static contextTypes={
				...super.contextTypes,
				defaultTab: PropTypes.object,
				hintMeasure: PropTypes.object,
			}

			static propTypes={
				...super.propTypes,
				tabs: PropTypes.arrayOf(PropTypes.shape({
					pos: super.UnitShape,
					align: PropTypes.oneOf(["left","right","center","decimal","bar","clear"]),
					leader: PropTypes.oneOf(["hyphen","dot","underscore","middleDot"],{labels:["-",".","_",String.fromCharCode(0xB7)].map(a=>a.repeat(5))})
				},{$type:"TabShape"}),{$type:"TabsShape"}),
			}

			static OutlineListShape=super.OutlineListShape.$extend({
				levels:PropTypes.arrayOf(super.NumberListShape.$extend({
					pStyle:PropTypes.string.$({label:"Link Level To"})
				})),
			})

			getTabAt(x){
				const {indent:{left:indentLeft=0,firstLine=0}, numbering,}=this.props
				const bFirstLine=this.lines.length==1
				const lineLeadingSpace=indentLeft+(bFirstLine&&!numbering&&firstLine||0) 
		
				x=x+lineLeadingSpace
				const {tabs=[], }=this.props
				const pos=[x,...tabs.map(a=>a.pos)].sort((a,b)=>a-b)
				const i=pos.lastIndexOf(x)
				const tab=(()=>{
					if(i!=-1 && i!=pos.length-1){
						return tabs.find(a=>a.pos==pos[i+1])
					}
					return {...this.context.defaultTab, pos:Math.ceil((x+0.1)/this.context.defaultTab.pos)*this.context.defaultTab.pos}		 
				})();
				return {...tab, pos:tab.pos-lineLeadingSpace}
			}

			createNumberingAtom(){
				const atom=super.createNumberingAtom()
				//const {defaultStyle:{size:defaultSize}, numbering:{, style:{size=defaultSize}}}=this.props
				if(atom.props.x>0){
					this.atoms.splice(0,0,
						<Group {...{tokenizeOpportunity:dom.Text.Tab,"data-numberingTab":true}}>
							<Group {...{"data-type":"text","data-content":"unknown",children:dom.Text.Tab,fontSize:0}}/>
						</Group>
					)
				}
				return atom
			}

			createParagraphEndAtom(){
				const atom=super.createParagraphEndAtom(...arguments)
				if(this.props.sectionType){
					const text=`====== Section Break (${this.props.sectionType}) ===========`
					return React.cloneElement(atom, {
						...this.context.hintMeasure.defaultStyle,
						width: this.context.hintMeasure.stringWidth(text),
						children: text
					})
				}
				return atom
			}

			static Tab=connect(state=>({pilcrow:getUI(state).pilcrow}))(class Tab extends Component{
				static displayName="tab"
				static contextTypes={
					getComposer: PropTypes.func,
					Measure: PropTypes.func,
					editable: PropTypes.any,
					hintMeasure: PropTypes.object
				}
				
				render(){
					const {leader, size, width, pilcrow}=this.props
					const measure=(leader || pilcrow) && new this.context.Measure({fonts:this.context.hintMeasure.style.fonts,size})
					return (
						<Fragment>
							{!leader ? null : leader.repeat(Math.floor(width/measure.stringWidth(leader)))}
							{pilcrow && this.context.editable && (()=>{
								const text=String.fromCharCode(0x2192)
								const tabWidth=measure.stringWidth(text)
								const props={}
								if(width<tabWidth){
									props.x=width-tabWidth
									props.clipPath=`inset(0 0 0 ${width})`
								}else if(width>tabWidth){
									props.x=(width-tabWidth)/2
								}
								return <tspan {...props} fill="deepskyblue">{text}</tspan>
							})()}
						</Fragment>
					)
				}
			})

			static Line=class Line extends Paragraph.Line{
				appendContentAtom(atom){
					switch(this.tab?.align){
						case "center":{
							if(this.tab.width>=(atom.props.width/2)){
								this.tab.width-=(atom.props.width/2)
								return super.appendContentAtom(atom)
							}else{
								this.tab.width=0
								this.tab.align=null
							}
							break
						}
						case "decimal":{
							const x=this._decimalTabAlignX(atom)
							if(x!==false){
								if(this.tab.width>=x){//upper part ok
									const fractionWidth=atom.props.width-x
									const availableWidth=this.width-this.currentX
									if(fractionWidth<=availableWidth){//lower part ok
										this.tab.width-=x
										this.inlineSegments.push(React.cloneElement(atom,{atom,x:this.tab.pos-x}),true)
										this.tab.align=null
										return 
									}else{//lower part without enough space
										if(this.tab.width+availableWidth>=atom.props.width){
											//leave space enough for atom, and continue left mode
											this.tab.width=this.tab.width+availableWidth-atom.props.width
										}else{
											//tab take space, continue left mode
										}
									}
								}else{//left mode when upper part without enough space
									//no tab space
									this.tab.width=0
								}
								//only once, continue on 
								this.tab.align=null
								return super.appendContentAtom(atom)
							}else{
								//right mode, *** decimal must be above right mode
							}
						}
						case "right":{//***must below decimal mode */
							if(this.tab.width>=atom.props.width){
								this.tab.width-=atom.props.width
								return super.appendContentAtom(atom)
							}else{
								this.tab.width=0
								this.tab.align=null
							}
							break
						}
					}
			
					return super.appendContentAtom(atom)
				}

				_decimalTabAlignX(atom){
					const text=new ReactQuery(atom).find('[data-type="text"]')
						.toArray()
						.map(({props:{children}})=>typeof(children)=="string" ? children :"")
						.join("")
					
					const match=text.match(/\d+\.\d+|\d+\.?|\.?\d+|\./)||[]
					if(!match[0]){
						return false
					}
					const i=match.index+(match[0].indexOf(".")!=-1 ? match[0].indexOf(".") : match[0].length)
					let j=0
					const {first, parents}=new ReactQuery(atom).findFirstAndParents(node=>{
						const {"data-type":type, children}=node.props
						if(type=="text"){
							if(i>=j && i<=j+children.length){
								return true
							}
							j+=children.length
						}
					});
					const x=[first.get(0),...parents].reduce((X,{props:{x=0}})=>x+X,0)
					const composer=this.context.parent.context.getComposer(first.attr('data-content'))
					return x+composer.measure.stringWidth(first.attr('children').substring(0,i-j))
				}

				/**
				 * Left-aligned - Begins text at the tab stop (This is the default tab setting).
				 * Center-aligned - Centers text on the tab stop.
				 * Right-aligned - Ends the text at tab stop.
				 * Decimal - Centers text over decimal point for a list of numbers.
				 * Bar - Runs a vertical line through a selected paragraph at the tab stop.
				 */
				appendTab(atom){
					const paragraph=this.context.parent
					const x=this.inlineSegments.currentX
					const tab=paragraph.getTabAt(x)
					const {pos,width=pos-x,leader}=tab
					const resetWidth=width=>{
						const $atom=new ReactQuery(atom)
						const $tab=$atom.findFirst('[data-type="text"]')
						return React.cloneElement(
								$atom.replace($tab, 
									React.cloneElement(
										$tab.get(0),
										{width,children:[<WordParagraph.Tab {...{
											key:0,width,leader,
											"data-nocontent":true, 
											size: parseInt($tab.attr('fontSize'))
										}}/>]}
									)
								).get(0),
								{width,atom}
							)
					}
					const inlineSegments=this.inlineSegments
					this.tab=Object.defineProperties({...tab},{
						__w:{
							value:width,
							writable:true,
						},
						atom:{
							value:resetWidth(width),
							writable:true,
						},
						width:{
							get(){
								return this.__w
							},
							set(width){
								inlineSegments.replace(this.atom,this.atom=resetWidth(this.__w=width))
							}
						},
						align:{
							get(){
								return atom.props["data-numberingTab"] ? "left" : tab.align
							},
							set(value){
								tab.align=value
							}
						}
					})
	
					this.inlineSegments.push(this.tab.atom,true/*append atom without considering inline size*/)
				}

				appendLineBreak(atom){
					const $atom=new ReactQuery(atom)
					const $text=$atom.findFirst('[data-type="text"]')
					const text=String.fromCharCode(0x21A1)
					const width=this.context.parent.context.hintMeasure.stringWidth(text)
					this.inlineSegments.push(
						React.cloneElement(
							$atom.replace($text, 
								React.cloneElement(
									$text.get(0),
									{width,children:[<WordParagraph.LineBreak {...{key:0,id:$text.attr('data-content'),children:text}}/>]}
								)
							).get(0),
							{atom,width}
						),true
					)
					return true
				}

				appendPageBreak(atom){
					const $atom=new ReactQuery(atom)
					const $text=$atom.findFirst('[data-type="text"]')
					const text="----page break----"
					const width=this.context.parent.context.hintMeasure.stringWidth(text)
					this.inlineSegments.push(
						React.cloneElement(
							$atom.replace($text, 
								React.cloneElement(
									$text.get(0),
									{width,children:[<WordParagraph.PageBreak {...{key:0,children:text}}/>]}
								)
							).get(0),
							{atom,width}
						),true
					)
				}
			}

			static LineBreak=connect(state=>({pilcrow:getUI(state).pilcrow}))(class LineBreak extends Component{
				static displayName="LineBreak"
				static contextTypes={
					editable: PropTypes.any,
					hintMeasure: PropTypes.object,
				}
				render(){
					if(this.context.editable && this.props.pilcrow){
						return <tspan fill="deepskyblue" fontFamily="arial" fontSize="11">{this.props.children}</tspan>
					}
					return null
				}
			})
			static PageBreak=connect(state=>({pilcrow:getUI(state).pilcrow}))(class PageBreak extends Component{
				static displayName="PageBreak"
				static contextTypes={
					editable: PropTypes.any,
				}
				render(){
					if(this.context.editable && this.props.pilcrow){
						return <tspan fill="deepskyblue" fontFamily="arial" fontSize="11pt">{this.props.children}</tspan>
					}
					return null
				}
			})
		}
		return WordParagraph
	})
}
