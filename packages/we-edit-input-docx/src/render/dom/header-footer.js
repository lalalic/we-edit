import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {Field} from "./field"

export default ({Template},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    static contextTypes={
        representation: PropTypes.string,
    }
    render(){
        if(this.context.representation=="pagination"){
            return (
            <Template.Manager 
                variables={this.createVariables()}
                shouldUpdateSelectionStyle={({props:{variables},context:{responsible}})=>variables.I==responsible.cursor.page}
                >
                <Template {...this.props}/>
            </Template.Manager>
            )
        }
        return <Template {...this.props}/>
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