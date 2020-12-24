import React,{Component} from  "react"
import Ruler from "./ruler"

export default class Canvas extends Component{
	constructor(){
		super(...arguments)
		this.state={}
	}

	render(){
		const {ruler={vertical:true}, style={}, children}=this.props
		const {error}=this.state
		const horizontalRulerHeight=20
		return (
			<div style={{
					overflow:"auto", flex:"1 100%",
					overflowY:"scroll",
					...style,
					display:"flex", flexDirection:"row"
				}}>
				{ruler && ruler.vertical!==false && (
					<div style={{flex:1, paddingTop:horizontalRulerHeight}}>
						<Ruler direction="vertical" {...ruler.vertical}/>
					</div>
				)}
				<div style={{flex:"1 100%", display:"flex", flexDirection:"column",width:"100%"}}>
					<div style={{flex:"1 100%",textAlign:"center"}}>
						{ruler && (
							<div style={{position:"sticky",top:0}}>
								<Ruler direction="horizontal" {...ruler.horizontal}/>
							</div>
						)}
						{error ?  error.stack : children}
					</div>
				</div>

			</div>
		)
	}

	static getDerivedStateFromError(error){
		return {error}
	}
}
