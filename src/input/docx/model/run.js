import React, {Component, PropTypes} from "react"

export default function(Models){
	return class extends Component{
		static displayName="run"
		static propTypes={
			fonts: PropTypes.string.isRequired,
			size: PropTypes.number.isRequired,
			color: PropTypes.string,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
			vanish: PropTypes.bool
		}
		
		static contextTypes={
			r: PropTypes.object
		}
		
		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props,this.context)
		}

		componentWillReceiveProps({children,id,...others},context){
			this.style={...context.r,...others}
		}

		render(){
			return (
				<div>
				{
					React.Children.map(this.props.children,a=>{
						if(a.type.displayName.endsWith("-text"))
							return React.cloneElement(a,this.style)
						else
							return a
					})
				}
				</div>
			)
		}
	}
}