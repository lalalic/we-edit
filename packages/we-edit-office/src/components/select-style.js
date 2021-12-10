import PropTypes from "prop-types"
import {whenSelectionChangeDiscardable} from "we-edit"
import {compose,getContext,shouldUpdate,withContext} from "recompose"
import {fromJS} from "immutable"

export default compose(
	whenSelectionChangeDiscardable(({selection,target,fromContent=false,
		getStyle=()=>selection?.props(target,fromContent)},state)=>{
        return {style:getStyle(selection, state )}
	}),
	getContext({setting: PropTypes.func}),
	withContext({disabled:PropTypes.bool},({style})=>({disabled:!style})),
	shouldUpdate((a,b)=>!fromJS(a||{}).equals(fromJS(b||{})))
)(({dispatch,style,children,setting})=>typeof(children)=="function" ? children({dispatch,style,setting}) : children)