import React,{Component} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"
import {Field} from "./field"
import Context from "./field/context"

export default ({Template,Frame},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    static contextTypes={
        activeDocStore: PropTypes.object,
    }
    constructor(){
        super(...arguments)
        this.variables=new Variables(this.context.activeDocStore)
    }

    render(){
        if(Template.support('pageable')){
            const DocxTemplate=this.constructor.Template(Template)
            return (
                <DocxTemplate.Manager variables={this.variables}>
                    <DocxTemplate {...this.props}/>
                </DocxTemplate.Manager>
            )
        }
        return <Template {...this.props}/>
    }

    static Template=memoize(Template=>{
        return class extends Template{
            static Async=class extends super.Async{
                onComposed(composed, variables){
                    if(this.unmounted)
                        return
                    this.setState({composed})
                    const {getComposer, responsible}=this.context
                    if(variables.I==responsible.cursor.page){
                        const cursor=getComposer(responsible.cursor.id)
                        const template=cursor?.closest(a=>a.props.id==this.content.props.id)
                        if(template){
                            console.log(`[${this.props.uuid}].async: update selection style`)
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
    constructor(activeDocStore){
        this.data=[]
        this.getNumPages=memoize(()=>parseInt(Field.create("NUMPAGES").execute(new Context(activeDocStore.getState()))))
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
                    values[id]="unknown"//this.getNumPages()
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