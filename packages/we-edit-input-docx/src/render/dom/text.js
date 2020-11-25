import React, {Component} from "react"
import PropTypes from "prop-types"


export default ({Text})=>class DocxText extends Component{
	static displayName="text"
	static contextTypes={
		style: PropTypes.object,
		getField: PropTypes.func,
	}

	render(){
		const {field, isInstr}=this.props
		if(field){
			const transformComposed=a=>React.cloneElement(a,{"data-field":field})
			const f=this.context.getField(field)
			if(f.showCode){//only instr should show
				if(isInstr){
					return <Text {...{...this.context.style,...this.props,transformComposed}}/>
				}
			}else{//only display value should show
				if(!isInstr){
					return <Text {...{...this.context.style,...this.props,transformComposed}}/>
				}
			}
			return null
		}
		return <Text {...{...this.context.style,...this.props}}/>
	}
}
