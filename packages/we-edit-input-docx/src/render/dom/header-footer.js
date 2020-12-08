import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {Field} from "./field"

export default ({Template},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    static contextTypes={
        headerFooterWidth: PropTypes.number,
    }

    constructor(){
        super(...arguments)
        this.variables=new Variables()
    }

    render(){
        return <Template {...this.props} width={this.context.headerFooterWidth} variables={this.variables}/>
    }
}

//only support PAGE/NUMPAGES
class Variables extends Array{
    getValues=memoize(({I,i,pgNumType})=>{
        return Array.from(this).reduce((values, {id,command,instr})=>{
            const field=Field.create(instr)
            switch(command){
                case 'PAGE':{
                    values[id]=field.execute({selection:{
                        props:type=>type=="page" ? {topFrame:{props:{i,I}}} : {pgNumType}
                    }})
                    break
                }
                case 'NUMPAGES':{
                    values[id]=field.execute({})
                    break
                }
            }
            return values
        },{})
    })

    equals(variables){
        const values=this.getValues(variables)
        return !this.find(a=>a.display!=values[a.id])
    }

    add(variable){
        if(!['PAGE','NUMPAGES'].includes(variable.command))
            return 

        const i=this.findIndex(a=>a.id==variable.id)
        if(i!=-1){
            this.splice(i,1,variable)
        }else{
            this.push(variable)
        }
    }

    get size(){
        return this.length
    }
}