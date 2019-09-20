import {shallowEqual} from "recompose"

function my(){
    return shallowEqual(...arguments)
}

my.equals=(a,b)=>'equals' in a && 'equals' in b && a.equals(b)

export default my