import PropTypes from "prop-types"
import Component from "./component"
import Page from "./page"

/**
 * section 
 * > is a flow container
 * 	> must have paragraph
 * 		> should always have paragraph
 * > is layout creator
 * 
 */
export default class __$1 extends Component{
	static displayName="section"
	
	static propTypes={
        createLayout: PropTypes.func,
		layout:PropTypes.shape({
			...Page.propTypes,
			header: this.UnitShape,
			footer: this.UnitShape,
		}),
		header: PropTypes.node,
		footer: PropTypes.node,
	}

	static defaultProps={
		layout: Page.defaultProps
	}
	
	get isFlow(){
		return true
	}

	static normalizePropShape({layout, ...props}){
		if(layout){
			props.layout=Page.normalizePropShape(layout)
			delete props.layout.__unnormalized
		}
		return super.normalizePropShape(props)
    }
}
