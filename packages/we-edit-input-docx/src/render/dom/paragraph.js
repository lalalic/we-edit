import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"
import {ReactQuery,connect, getUI} from "we-edit"

import memoize from "memoize-one"
import {shallowEqual} from "recompose"

export default ({Paragraph,Text,Group})=>class DocxParagraph extends Component{
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
		pilcrowMeasure: PropTypes.object,
	}

	static childContextTypes={
		style: PropTypes.object,
		tabWidth: PropTypes.func,
	}

	style=memoize((direct,context)=>{
		const defaultStyle=direct.flat4Character(context)
		const style=direct.flat(context)
		if(style.indent){
			if(style.indent.hanging){
				style.indent.firstLine=-style.indent.hanging
			}
		}

		if(style.numbering){
			let {nextValue, style:props,format}=style.numbering
			style.numbering={
				style:{...props, ...defaultStyle},
				label:nextValue(),
				format
			}
		}

		return {style,defaultStyle}
	},shallowEqual)

	childStyle=memoize((direct,context)=>{
		return Object.assign(direct.clone(),{r:{}}).inherit(context)
	},shallowEqual)

	getChildContext(){
		return {
			style:this.childStyle(this.props.style, this.context.style),
		}
	}

	render(){
		const {style:$1, ...props}=this.props
		const {style:{widow,orphan=widow, ...style}, defaultStyle}=this.style(this.props.style,this.context.style)
		const Layout=Paragraph.Line ? this.constructor.getLayout(Paragraph) : Paragraph
		return (
			<Layout
				{...style}
				{...props}
				{...{widow,orphan,defaultStyle}}
				/>
		)
	}

	static getLayout=memoize(Paragraph=>{
		const Layout=class Layout extends Paragraph{
			static contextTypes={
				...Paragraph.contextTypes,
				defaultTab: PropTypes.object,
				pilcrowMeasure: PropTypes.object,
			}

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
				tab.pos-=lineLeadingSpace
				return tab
			}

			_createEndAtom(){
				const atom=super._createEndAtom(...arguments)
				if(this.props.sectionType){
					const text=`====== Section Break (${this.props.sectionType}) ===========`
					return React.cloneElement(atom, {
						...this.context.pilcrowMeasure.defaultStyle,
						width: this.context.pilcrowMeasure.stringWidth(text),
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
				}
				render(){
					const {leader, width, id, pilcrow}=this.props
					const textComposer=this.context.getComposer(id)
					return (
						<Fragment>
							{!leader ? null : leader.repeat(Math.floor(width/textComposer.measure.stringWidth(leader)))}
							{pilcrow && this.context.editable && (()=>{
								const measure=new this.context.Measure({fonts:"Arial",size:textComposer.props.size})
								const text=String.fromCharCode(0x2192)
								const tabWidth=measure.stringWidth(text)
								const props={}
								if(width<tabWidth){
									props.x=width-tabWidth
									props.clipPath=`inset(0 0 0 ${tabWidth-width})`
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
				appendAtom(atom){
					switch(this.tab?.align){
						case "center":{
							if(this.tab.width>=(atom.props.width/2)){
								this.tab.width-=(atom.props.width/2)
								return super.appendAtom(atom)
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
								return super.appendAtom(atom)
							}else{
								//right mode, *** decimal must be above right mode
							}
						}
						case "right":{//***must below decimal mode */
							if(this.tab.width>=atom.props.width){
								this.tab.width-=atom.props.width
								return super.appendAtom(atom)
							}else{
								this.tab.width=0
								this.tab.align=null
							}
							break
						}
					}
			
					return super.appendAtom(atom)
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
										{width,children:[<Layout.Tab {...{key:0,width,leader,id:$tab.attr('data-content'),"data-nocontent":true}}/>]}
									)
								).get(0),
								{width,atom}
							)
					}
					const inlineSegments=this.inlineSegments
					this.tab=Object.defineProperties({...tab},{
						align:{
							value:tab.val,
							writable:true,
						},
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
						}
					})
	
					this.inlineSegments.push(this.tab.atom,true/*append atom without considering inline size*/)
				}

				appendLineBreak(atom){
					const $atom=new ReactQuery(atom)
					const $text=$atom.findFirst('[data-type="text"]')
					const text=String.fromCharCode(0x21A1)
					const width=this.context.parent.context.pilcrowMeasure.stringWidth(text)
					this.inlineSegments.push(
						React.cloneElement(
							$atom.replace($text, 
								React.cloneElement(
									$text.get(0),
									{width,children:[<Layout.LineBreak {...{key:0,id:$text.attr('data-content'),children:text}}/>]}
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
					const width=this.context.parent.context.pilcrowMeasure.stringWidth(text)
					this.inlineSegments.push(
						React.cloneElement(
							$atom.replace($text, 
								React.cloneElement(
									$text.get(0),
									{width,children:[<Layout.PageBreak {...{key:0,children:text}}/>]}
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
					pilcrowMeasure: PropTypes.object,
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
		return Layout
	})
}
