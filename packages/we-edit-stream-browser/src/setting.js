import React, {Component} from "react"
import PropTypes from "prop-types"
import {TextField} from "material-ui"

export default class extends Component{
	state={
		windowFeatures:"menubar=no,location=no,resizable=yes,scrollbars=yes,status=no",
		...this.props
	}
	
	render(){
		const {name, target, windowFeatures}=this.state
		return (
			<center>
				<div>
					<TextField
						value={name}
						floatingLabelText="file name"
						onChange={(e,name)=>this.setState({name})}/>
				</div>
				<div>
					<TextField value={target} 
						floatingLabelText="target:_blank|_self|_parent|_top|frame name"
						onChange={(e,target)=>{
							if(target){
								this.setState({target,name:""})
							}else{
								this.setState({target,name:this.props.name})
							}
						}}/>
				</div>
				<div>
					<TextField value={windowFeatures} 
						floatingLabelText="window features"
						onChange={(e,windowFeatures)=>{
							this.setState({windowFeatures})
						}}/>
				</div>
			</center>
		)
	}
}