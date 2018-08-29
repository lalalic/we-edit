import PropTypes from "prop-types"
import {Editors} from "we-edit-representation-pagination"

export default class extends Editors.Document{
	get viewport(){
		return this.state.viewport
	}
}