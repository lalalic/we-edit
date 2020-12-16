import HasChild from "./hasChild"
import HasParentAndChild from "./hasParentAndChild"
import NoChild from "./noChild"

import Recomposable from "./recomposable"
import Locatable from "./locatable"
import Stoppable from "./stoppable"
import Continuable from "./continuable"
import Templateable from "./templateable"
import ComposedAllTrigger from "./composed-all-trigger"

import Layout from "./layout"

export default function composable(A,{locatable,stoppable,continuable,recomposable}){
	if(locatable && !A.already("locatable")){
		A=Locatable(A,locatable)
	}

	if(recomposable && !A.already("recomposable")){
		A=Recomposable(A,recomposable)
	}

	if(stoppable && !A.already("stoppable")){
        A=Stoppable(A,stoppable)
    }

	if(continuable && !A.already("continuable")){
        A=Continuable(A,Continuable)
    }

	A.composables={Recomposable,Locatable,Stoppable,Continuable, Templateable}
	return A
}


/**
 *  it's a very complicated job, so we need a very simple design, one sentence described solution. options:
 *  1. remove all composed, and re-compose all
 *  	- need find a time to recompose
 *  	- logic is most simple
 *  	- performance is most bad
 *
 *  2. remove all composed from this content, and re-compose removals
 *  	- Need locate composed of this content in page
 *  	- Need find a time to recompose
 *  		> componentDidUpdate
 *  			. any state update,
 *  			. and carefully tuned shouldComponentUpdate(nextProps, nextState, nextContext)
 *  	- performance is better than #1
 *
 *  3. recompose this content, and check if new composed fits last composed space (hit ratio is low)
 *  	- Yes: just replace
 *  	- No: #1, or #2
 *  	- and then loop with all following content with the same logic
 *
 *  	3.a: recompose this content line by line ..., much logics here
 */

function editable(A, enables={}){
	return composable(A,{locatable:true,recomposable:true,...enables})
}

/**
 * make Capability with static enable(dom, excludes) to make every dom with this capability
 * @param {*} able 
 */
const enablify=able=>(dom, excludes)=>Object.keys(dom).reduce((enabled, k)=>{
	enabled[k]=enabled[k]||able(dom[k])
	return enabled
},{...excludes});

//make Capability with static enable
[HasChild, HasParentAndChild, NoChild,Recomposable, Locatable,Stoppable,Continuable,editable]
	.forEach(a=>a.enable=enablify(a))

//Locatable.enable=enablify(A=>composable(A,{locatable:true}))

export {
	enablify, editable,
	Layout,
	HasChild, HasParentAndChild, NoChild, ComposedAllTrigger,
	Recomposable,Locatable,Stoppable,Continuable, Templateable
}
