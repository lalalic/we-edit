import HasChild from "./hasChild"
import HasParentAndChild from "./hasParentAndChild"
import NoChild from "./noChild"

import Recomposable from "./recomposable"
import Locatable from "./locatable"
import Stoppable from "./stoppable"
import Continuable from "./continuable"
import Cacheable from "./cacheable"
import Navigatable from "./navigatable"
import Fissionable from "./fissionable"
import ComposedAllTrigger from "./composed-all-trigger"

import Layout from "./layout"

export default function composable(A,{locatable,navigatable,stoppable,continuable,recomposable,fissionable,cacheable}){
	if(locatable && !A.already("locatable")){
		A=Locatable(A)
	}

	if(recomposable && !A.already("recomposable")){
		A=Recomposable(A,recomposable)
	}
	
	if(fissionable && !A.already("fissionable")){
		A=Fissionable(A)
	}

	if(cacheable && !A.already("cacheable")){
        A=Cacheable(A)
    }

	if(navigatable && !A.already("navigatable")){
		A=Navigatable(A)
	}

    if(stoppable && !A.already("stoppable")){
        A=Stoppable(A)
    }

	if(continuable && !A.already("continuable")){
        A=Continuable(A)
    }

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
	return composable(A,{locatable:true,navigatable:true,recomposable:true,...enables})
}

const enablify=func=>(targets, excludes)=>Object.keys(targets)
	.reduce((enabled, k)=>{
		if(!enabled[k]){
			enabled[k]=func(targets[k])
		}
		return enabled
	},{...excludes});

[HasChild, HasParentAndChild, NoChild,Recomposable, Locatable,Navigatable,Stoppable,Continuable,Cacheable,Fissionable,editable]
	.forEach(a=>a.enable=enablify(a))

export {enablify, editable,
	Layout,
	HasChild, HasParentAndChild, NoChild, ComposedAllTrigger,
	Recomposable,Locatable,Stoppable,Continuable,Cacheable,Fissionable
}
