import {whenSelectionChangeDiscardable} from "we-edit"
import {compose,shallowEqual,shouldUpdate} from "recompose"

export default compose(
	whenSelectionChangeDiscardable(({selection,target,fromContent=false,getStyle},state)=>{
        if(getStyle)
            return {style:getStyle(selection, state)}
		return {style:selection?.props(target,fromContent)}
	}),
	shouldUpdate((a,b)=>!shallowEqual(a.style,b.style))
)(({dispatch,style,children})=>typeof(children)=="function" ? children({dispatch,style}) : children)