import Frame from "./frame"

export default class extends Frame{
	defineProperties(){
		this.section=this.context.parent
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:false,
				configurable:false,
				get(){
					if(this==this.section.current){//last
						if(!this.section.isAllChildrenComposed()){
							return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
						}
					}
					return this.props.height
				}
			},
		})
	}

	render(){
		const {props:{i:key,width,height,margin}}=this
		return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})
	}
}
