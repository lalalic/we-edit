import {PropTypes} from "react"

export function editable(Model){
	return class extends Model{
		static displayName=`editable-${Model.displayName}`
		
		static propTypes={
			...(Model.propTypes||{}),
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
		
	}
}