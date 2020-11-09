import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"


export default ({Container})=>class __$1 extends Component{
	static displayName="run"
	static propTypes={
		style: PropTypes.object.isRequired
	}

	static contextTypes={
		style: PropTypes.object
	}

	style=(direct, context)=>direct.flat(context)

	render(){
		var {style, ...props}=this.props
		style=this.style(style, this.context.style)
		return (
			<Container {...props} type={this.constructor.displayName}>
			{
				React.Children.map(this.props.children,a=>{
					if(a.type.displayName=="text"){
						return React.cloneElement(a,{...style, ...a.props})
					}else
						return a
				})
			}
			</Container>
		)
	}
}
