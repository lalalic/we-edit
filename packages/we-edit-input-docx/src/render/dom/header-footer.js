import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {Field} from "./field"

export default ({Template,Frame},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    constructor(){
        super(...arguments)
        this.variables=new Variables()
    }

    render(){
        const Template=this.constructor.Template
        return (
            <Template.Manager variables={this.variables}>
                <Template {...this.props}/>
            </Template.Manager>
        )
    }

    static get Template(){
        return this._getTemplate(Template)
    }

    static _getTemplate=memoize(Template=>{
        if(!Template.support?.('pageable'))
            return Template
        return class extends Template{
            static Manager=class extends super.Manager{
                onTemplated(variables,responsible){
                    if(!responsible)
                        return 
                    if(variables.I==responsible.cursor.page){
                        const cursor=this.context.getComposer(responsible.cursor.id)
                        const template=cursor?.closest(a=>a.props.id==this.template.props.id)
                        if(template){
                            console.log(`[${this.templateComposer.props.uuid}].manager: update selection style`)
                            responsible.updateSelectionStyle()
                        }
                    }
                }
            }
        }
    })
}

//only support PAGE/NUMPAGES
class Variables {
    constructor(){
        this.data=[]
        this[Symbol.iterator]=this.data[Symbol.iterator].bind(this.data)
    }
    getValues=memoize(({I,i,pgNumType})=>{
        return Array.from(this.data).reduce((values, {id,command,instr,display})=>{
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
        return !this.data.find(a=>a.display!=values[a.id])
    }

    add(variable){
        if(!['PAGE','NUMPAGES'].includes(variable.command))
            return 

        const i=this.data.findIndex(a=>a.id==variable.id)
        if(i!=-1){
            this.data.splice(i,1,variable)
        }else{
            this.data.push(variable)
        }
    }

    clear(){
        this.data.splice(0,this.length)
    }

    id({I}){
        return I
    }

    get size(){
        return this.data.length
    }

    get length(){
        return this.data.length
    }
}