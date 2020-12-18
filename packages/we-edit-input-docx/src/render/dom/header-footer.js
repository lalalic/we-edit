import React,{Component} from "react"
import memoize from "memoize-one"
import {Field} from "./field"

export default ({Template},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    render(){
        return <Template {...this.props} 
                    variables={this.createVariables()} 
                    whenUpdateSelectionStyle={(variables,responsible)=>variables.I==responsible.cursor.page}
                    />
    }

    createVariables=memoize(()=>{
        return new (this.constructor.Variables(Template))()
    })

    //only support PAGE/NUMPAGES
    static Variables=Template=>{
        if(!Template.Variables)
            return class{}
        return class extends Template.Variables{
            id=({I})=>I

            add(variable){
                if(!['PAGE','NUMPAGES'].includes(variable.command))
                    return 
        
                super.add(variable)
            }
        
            getValues=memoize(({I,i,pgNumType})=>{
                return Array.from(this.data).reduce((values, {id,command,instr})=>{
                    values[id]=command=="NUMPAGES" ? 'unknown' :  
                        Field.create(instr).execute({selection:{
                            props:type=>type=="page" ? {topFrame:{props:{i,I}}} : {pgNumType}
                        }})
                    return values
                },{})
            })
        }
    }
}