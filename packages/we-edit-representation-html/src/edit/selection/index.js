import React,{Fragment, Component} from "react"
import PropTypes from "prop-types"

export default class SelectionShape extends Component{
	static contextTypes={
		query: PropTypes.func
	}
	rects(){
		const {start,end, getContent}=this.props
		if(start.id==end.id && start.at==end.at && getContent(start.id).type=="text")
			return []
			
		let range=document.createRange()
		const set=({id,at}, A)=>{
			if(at==-1){
				range.selectNode(document.querySelector(`[data-content="${id}"]`))
			}else{
				range[`set${A}`](document.querySelector(`[data-content="${id}"]`).firstChild,at)
			}
		}
		set(start,"Start")
		set(end, "End")
		let rects=range.getClientRects()
		let data=[]
		for(let i=0,len=rects.length;i<len;i++){
			data.push(rects[i])
		}
		return data
	}

	render(){
		const {start,end, getContent}=this.props
		if(start.id==end.id && start.at==end.at && getContent(start.id).type=="text")
			return null

		let $=this.context.query()
		return (
			<Fragment>
				<div style={{position:"fixed",top:10,left:10,background:"red"}}>
					{JSON.stringify(start)} -- {JSON.stringify(end)}
				</div>
				{
					this.rects().map(({top,left,width,height},i)=>{
						return <div key={i} className="notContent"
							style={{
								position:"absolute",
								...$.toCanvasCoordintation({left,top}),
								width,height,background:"blue",opacity:0.5
							}}/>
					})
				}
			</Fragment>
		)
	}
}