import React, {Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"

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
		const Layout=Paragraph.Line ? DocxParagraph.getLayout(Paragraph) : Paragraph
		console.log(Layout)
		return (
			<Layout
				{...style}
				{...props}
				{...{widow,orphan,defaultStyle}}
				/>
		)
	}

	static getLayout=memoize(Paragraph=>class Layout extends Paragraph{
		static contextTypes={
			...Paragraph.contextTypes,
			defaultTab: PropTypes.object,
		}

		getTabAt(x){
			const {tabs=[]}=this.props
			const pos=[x,...tabs.map(a=>a.pos)].sort((a,b)=>a-b)
			const i=pos.lastIndexOf(x)
			if(i!=-1 && i!=pos.length-1){
				return tabs.find(a=>a.pos==pos[i+1])
			}
			return {...this.context.defaultTab, pos:Math.ceil((x+0.1)/this.context.defaultTab.pos)*this.context.defaultTab.pos}
		}

		static Line=class Line extends Paragraph.Line{
			appendAtom(atom){
				/**
				 * Left-aligned - Begins text at the tab stop (This is the default tab setting).
				 * Center-aligned - Centers text on the tab stop.
				 * Right-aligned - Ends the text at tab stop.
				 * Decimal - Centers text over decimal point for a list of numbers.
				 * Bar - Runs a vertical line through a selected paragraph at the tab stop.
				 */
				if(atom.props.tokenizeOpportunity===Text.Tab){
					const paragraph=this.context.parent
					const x=this.inlineSegments.currentX
					const {val:align="left", ...tab}=paragraph.getTabAt(x)
					const supported=this[`append${align[0].toUpperCase()}${align.substring(1)}Tab`]
					if(supported){
						supported.call(this, atom, tab)
					}
					return
				}
		
				return super.appendAtom(atom)
			}

			/**
			 * next atom starts at tab.pos, so width of tab can be calculated when appending
			 * @param {*} atom 
			 * @param {*} param1 
			 */
			appendLeftTab(atom, {pos, leader,width=pos-this.inlineSegments.currentX}){
				const paragraph=this.context.parent
				const tabWidth=atom.props.width

				let $atom=new ReactQuery(atom)
				let tab=$atom.findFirst('[data-type="text"]')
				if(leader){//leader
					const textComposer=paragraph.context.getComposer(tab.attr('data-content'))
					const count=Math.floor(width/textComposer.measure.stringWidth(leader))
					const leadersWidth=textComposer.measure.stringWidth(leader.repeat(count))
					const ComposedText=tab.get(0).type
					const leadersGroup=(
						<Group {...{"data-nocontent":true}}>
							<ComposedText {...textComposer.defaultStyle} x={width-leadersWidth}>{leader.repeat(count)}</ComposedText>
						</Group>
					)
					atom=React.cloneElement(atom,{children:[atom.props.children, leadersGroup]})
					$atom=new ReactQuery(atom)
					tab=$atom.findFirst('[data-type="text"]')
				}
				
					
				if(paragraph.context.editable){//direction arrow
					if(width<tabWidth){
						$atom=$atom.replace(tab.get(0),React.cloneElement(tab.get(0),{x:width-tabWidth,clipPath:`inset(0 0 0 ${tabWidth-width})`}))
					}else if(width>tabWidth){
						$atom=$atom.replace(tab.get(0),React.cloneElement(tab.get(0),{x:(width-tabWidth)/2}))
					}
				}

				this.inlineSegments.push(React.cloneElement($atom.get(0),{width,atom}),true/*append atom without considering inline size*/)
			}

			/**
			 * next atom ends exactly at tab.pos
			 * tab width has to be re-calculated when appending atom until last atom of line, or next tab
			 * a right-ward layout flag needed to quickly instruct later appending 
			 * @param {*} atom 
			 * @param {*} param1 
			 */
			appendRightTab(atom, {pos, leader,width=pos-this.inlineSegments.currentX}){

			}

			appendCenterTab(atom, {pos, leader,width=pos-this.inlineSegments.currentX}){

			}

			appendDecimalTab(atom,{pos, leader,width=pos-this.inlineSegments.currentX}){

			}

			appendBarTab(atom, {pos, leader,width=pos-this.inlineSegments.currentX}){

			}
		}
	})
}
