import React, {Children,Component, PropTypes} from "react"

export default function transform(Models){
	return class extends Component{
		static displayName="docx-paragraph"
		static namedStyle="*paragraph"
		static contextTypes={
			p: PropTypes.object,
			r: PropTypes.object,
			styles: PropTypes.object
		}

		static childContextTypes={
			r: PropTypes.object
		}

		constructor(){
			super(...arguments)
			this.componentWillReceiveProps(this.props,this.context)
		}

		getChildContext(){
			return {
				r: this.rStyle
			}
		}

		componentWillReceiveProps(direct,context){
			const styles=context.styles
			let style=styles[direct.namedStyle||this.constructor.namedStyle]
			
			let rStyle="bold,italic,vanish".split(",")
				.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=!!t
						return o
					},
					"fonts,size,color".split(",")
					.reduce((o,key,t)=>{
						if((t=style.get(`r.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
				)
				
			let pStyle="spacing,indent".split(",")
					.reduce((o,key,t)=>{
						if(direct[key]!=undefined && (t=style.get(`p.${key}`))!=undefined)
							o[key]=t
						return o
					},{})
			
			this.style={...context.p, ...pStyle, ...direct}
			this.rStyle={...context.r,...rStyle}
		}

		render(){
			return <Models.Paragraph {...this.style} children={this.props.children}/>
		}
	}
}