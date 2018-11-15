import HasChild from "./hasChild"
import HasParentAndChild from "./hasParentAndChild"
import NoChild from "./noChild"

import Recomposable from "./recomposable"
import Locatable from "./locatable"
import Stoppable from "./stoppable"
import Continuable from "./continuable"
import Cacheable from "./cacheable"
import Navigatable from "./navigatable"

const enablify=func=>(targets, excludes)=>Object.keys(targets)
	.reduce((enabled, k)=>{
		if(!enabled[k]){
			enabled[k]=func(targets[k])
		}
		return enabled
	},{...excludes});


[HasChild, HasParentAndChild, NoChild,Recomposable, Locatable,Navigatable,Stoppable,Continuable,Cacheable]
	.forEach(a=>a.enable=enablify(a))

export {enablify, HasChild, HasParentAndChild, NoChild, Recomposable,Locatable,Stoppable,Continuable,Cacheable}

export default function composable(A,{navigatable,stoppable,continuable}){
    if(navigatable){
		A=Navigatable(A)
	}
    if(stoppable){
        A=Stoppable(A)
    }
    if(continuable){
        A=Continuable(A)
    }

    return A
}
