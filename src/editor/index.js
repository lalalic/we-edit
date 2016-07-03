import * as Models from "../content"
import editable from "./editable"
import Section from "./section"
import Text from "./text"

const Editors={}
;(function(){
    Object.keys(Models).forEach(key=>{
        if(key!=='default'){
            Editors[key]=editable(Models[key])
            console.log(`making ${key} editable`)
        }
    })
})();


export default Object.assign(Editors,{Section, Text})
