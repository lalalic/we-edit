import React, {Component, PropTypes} from "react"

export default function(Models){
	return class extends Component{
		static displayName="run"
		static namedStyle="*character"
		static propTypes={
			fonts: PropTypes.string,
			size: PropTypes.number,
			color: PropTypes.string,
			bold: PropTypes.bool,
			italic: PropTypes.bool,
			vanish: PropTypes.bool,
			namedStyle: PropTypes.string
		}
		
		static contextTypes={
			r: PropTypes.object,
			styles: PropTypes.object
		}
		
		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props,this.context)
		}

		componentWillReceiveProps({children,id,namedStyle,...direct},context){
			const styles=context.styles
			let style=styles[namedStyle||this.constructor.namedStyle]
			
			let rStyle="bold,italic,vanish".split(",")
				.reduce((o,key,t)=>{
						if(direct[key]==undefined && (t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if(direct[key]==undefined && (t=style.get(`r.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
				)
			
			
			this.style={...context.r,...rStyle,...direct,namedStyle}
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