import PropTypes from "prop-types"


export function editify(Model){
	return class extends Model{
		static displayName=`editable-${Model.displayName}`

		static propTypes={
			...Model.propTypes,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
	}
}
