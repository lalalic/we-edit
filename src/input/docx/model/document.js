import React, {Component, PropTypes} from "react"

export default function(Models){
	return class Document extends Component{
		static displayName="docx-document"
		static childContextTypes={
			label: PropTypes.func
		}

		getChildContext(){
			let self=this
			return {
				label(id,level){
					return self.props.styles.listLabel(id,level)
				}
			}
		}

		render(){
			const {styles,...others}=this.props
			styles.resetNum()
			return <Models.Document {...others}/>
		}
	}
}