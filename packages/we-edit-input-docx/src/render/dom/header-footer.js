import React,{Component} from "react"
import memoize from "memoize-one"
import {Field} from "./field"

export default ({Template},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    constructor(){
        super(...arguments)
        this.variables=new Variables()
    }

    render(){
        return <Template {...this.props} variables={this.variables}/>
    }
}

//only support PAGE/NUMPAGES
class Variables extends Array{
    getValues=memoize(({I,i,pgNumType})=>{
        return Array.from(this).reduce((values, {id,command,instr,display})=>{
            const field=Field.create(instr)
            switch(command){
                case 'PAGE':{
                    values[id]=field.execute({selection:{
                        props:type=>type=="page" ? {topFrame:{props:{i,I}}} : {pgNumType}
                    }})
                    break
                }
                case 'NUMPAGES':{
                    values[id]='unknown'
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

    id({I}){
        return I
    }

    get size(){
        return this.length
    }
}