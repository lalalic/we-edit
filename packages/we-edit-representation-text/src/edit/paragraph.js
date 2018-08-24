import React,{Component, Fragment} from "react"
import PropTypes  from "prop-types"

import {models} from  "we-edit"

import opportunities from "we-edit-representation-pagination/wordwrap/line-break"

const Super=models.Paragraph

export default class extends Super{
	static propTypes={
		...Super.propTypes,
		getChildText: PropTypes.func
	}

	static defaultProps={
		...Super.defaultProps,
		getChildText(el){
			while(typeof(el.props.children)!=="string"){
				if(!el.props.children || !(el=el.props.children[0]) || !React.isValidElement(el))
					return null
			}
			return el.props.children
		}
	}
	
	static contextTypes={
		measure: PropTypes.object,
		lineWidth: PropTypes.number.isRequired
	}

    getBreakOpportunities(children, getText){
		return opportunities(React.Children.toArray(children),getText)
    }
	
	getLines(measure, breakOpportunities, lineWidth, children, getText){
		children=React.Children.toArray(children)
		const consume1=(state, opportunity)=>{
			const {lines, space}=state
			const current=lines.pop()
			let {
                word,
                start:{itemIndex:startItemIndex, at:startAt},
                end:{itemIndex:endItemIndex, at:endAt},
				width=measure.stringWidth(word)
                }=opportunity
			if(space-width>=0){
				current.push({...opportunity})
				state.space=space-width
				lines.push(current)
			}else{
				lines.push(current)
				lines.push([])
				state.space=lineWidth
				consume1(state,{...opportunity,width})
			}
			return state
		}
		const id=i=>children[i].props.id
		const lineup1=(pieces,op)=>{
				const {
					word,
					start:{itemIndex:startItemIndex, at:startAt},
					end:{itemIndex:endItemIndex, at:endAt}
				}=op
				let current=startItemIndex
				let text=getText(children[current])
				if(startItemIndex==endItemIndex){
					pieces.push({id:id(endItemIndex),endAt:endAt,word})
				}else{
					let len=text.length-startAt
					if(word.length>len){
						pieces.push({id:id(startItemIndex),endAt:text.length-1, word:word.substring(0,len)})
						lineup1(pieces, {word:word.substring(len), start:{itemIndex:startItemIndex+1, at:0}, end:op.end})
					}else if(word.length==len){
						pieces.push({id:id(startItemIndex),endAt:text.length-1,word})
					}else if(word.length<len){
						console.assert("should not be here")
					}
				}
			return pieces
		}
		return breakOpportunities
			.reduce(consume1,{lines:[[]], space:lineWidth})
			.lines
			.map((lineOps,i)=><Line key={i} pieces={lineOps.reduce(lineup1,[])}/>)

	}
	
	render(){
		const {children, getChildText}=this.props
		const {measure, lineWidth}=this.context
		let opportunities=this.getBreakOpportunities(children, getChildText)
		let lines=this.getLines(measure, opportunities, lineWidth, children, getChildText)
		return (
			<div className="paragraph">
			{lines}
			</div>
		)
	}
}


class Line extends Component{
	render(){
		const {pieces}=this.props
		return (
			<div className="line">
			{pieces.map(({id,endAt,word}, key)=><span {...{key,"data-content":id,"data-endat":endAt}}>{word}</span>)}
			</div>
		)
	}
}