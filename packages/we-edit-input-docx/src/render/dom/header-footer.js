import React,{Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery, ContentQuery} from "we-edit"
import memoize from "memoize-one"
import {Field, Context} from "./field"

const NUMPAGES_FIELDS='field[command="NUMPAGES"],fieldBegin[command="NUMPAGES"]'
const PAGE_FIELDS='field[command="PAGE"],fieldBegin[command="PAGE"]'
export default ({Frame,Template},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    static contextTypes={
        activeDocStore: PropTypes.object,
        headerFooterWidth: PropTypes.number,
        editable: PropTypes.any,
    }

    constructor(){
        super(...arguments)
        this.variables=new Variables()
    }

    render(){
        return <Template {...this.props} width={this.context.headerFooterWidth} variables={this.variables}/>

        const {hash}=this.props
        const hasPage=this.hasPageField(hash), hasNumpages=this.hasNumpagesField(hash)
        let TypedFrame=Frame
        if(hasPage||hasNumpages){
            if(this.context.editable){
                if(hasPage){
                    TypedFrame=this.constructor.ReFramePage    
                }
            }else{
                TypedFrame=this.constructor.ReFrame
            }
        }
        return <TypedFrame {...this.props} {...{
            width:this.context.headerFooterWidth,
            hasPage,hasNumpages,
            getPageValue:this.getPageValue.bind(this)
        }} />
    }

    hasPageField=memoize((hash)=>{
        const $=new ContentQuery(this.context.activeDocStore.getState(),'#'+this.props.id)
        return $.find(PAGE_FIELDS).toArray().join(",")
    })

    hasNumpagesField=memoize((hash)=>{
        const $=new ContentQuery(this.context.activeDocStore.getState(),'#'+this.props.id)
        return $.find(NUMPAGES_FIELDS).toArray().join(",")
    })



    getPageValue(id,{i, I, pgNumType}){
        const {props:{instr}}=new ContentQuery(this.context.activeDocStore.getState(),'#'+id).toJS()
        const field=Field.create(instr)
        return field.execute({selection:{
            props:type=>type=="page" ? {topFrame:{props:{i,I}}} : {pgNumType}
        }})
    }

    /**no relayout for page number,  */
    static ReFramePage=class extends Frame{
        createComposed2Parent(...args){
            const composed=super.createComposed2Parent(...args)
            const {hasPage, pageFields=hasPage.split(","), getPageValue}=this.props
            const $composed=new ReactQuery(<div>{composed}</div>)
            const pageText=pageFields.map(id=>{
                const $field=$composed.findFirst(`[data-content="${id}"]`)
                if($field.attr('data-type')=="field"){//simple field
                    return $field.findFirst('text').get(0)
                }else{//fieldBegin
                    const possible=$composed.find(`[data-content="${id}"],[data-type=text]`).toArray()
                    const i=possible.indexOf($field.get(0))
                    return possible.slice(i+1).find(a=>a.props['data-type']=='text')
                }
            })
            return React.cloneElement(composed,{
                replacePageNum:(page)=>{
                    //return composed
                    return pageText.reduce(($,a,i)=>$.replace(a, React.cloneElement(a,{children:getPageValue(pageFields[i],page)})),$composed)
                        .attr('children')
                }
            })
        }
    }

    //evolve
    static ReFrame=class extends Frame{
        createComposed2Parent(...args){
            const composed=super.createComposed2Parent(...args)
            return (
                <this.constructor.ReLayout {...composed.props} composed={composed}>
                    <Frame {...this.props} />
                </this.constructor.ReLayout>
            )
        }

        static ReLayout=class extends Component{
            static contextTypes={
                activeDocStore: PropTypes.object
            }
            
            static childContextTypes={
                parent: PropTypes.object,
                shouldContinueCompose: PropTypes.func,
            }

            constructor(...args){
                super(...args)
                this.state={}
            }
    
            getChildContext(){
                return {
                    parent:{
                        appendComposed:recomposed=>{
                            this.setState({recomposed})
                        }
                    },
                    shouldContinueCompose:()=>true,
                }
            }

            render(){
                const {state:{recomposed}, props:{children,x,y}}=this
                if(recomposed){
                    return React.cloneElement(recomposed,{x,y})
                }
                return React.cloneElement(children, {children: this.getEvolvedContent(children.props.children)})
            }

            getFieldValue({props:{instr,command}}){
                const field=Field.create(instr)
                if(command=="PAGE"){
                    const {i, I, pgNumType}=this.props
                    return field.execute({selection:{
                        props:type=>type=="page" ? {topFrame:{props:{i,I}}} : {pgNumType}
                    }})
                }else if(command=="NUMPAGES"){
                    return field.execute(new Context(this.context.activeDocStore.getState()))
                }
            }

            getEvolvedContent(content){
                let $=new ReactQuery(<div>{content}</div>)
                $=$.find('field[command="PAGE"],field[command="NUMPAGES"]')
                    .toArray()
                    .reduce(($,a)=>{
                        const $a=new ReactQuery(a)
                        const text=$a.find('text')
                        return $.replace($a, $a.replace(text, React.cloneElement(text.get(0),{children:this.getFieldValue(a)})))
                    },$)
                $=$.find('fieldBegin[command="PAGE"],fieldBegin[command="NUMPAGES"]')
                    .toArray()
                    .reduce(($,a)=>{
                        let began=false
                        const text=$.findFirst(b=>{
                            if(b==a){
                                began=true
                            }
                            if(began){
                                if(b?.props.id==`end${a.props.id}`){
                                    return false
                                }
                                if(b?.type.displayName=='text'){
                                    return true
                                }
                            }
                        })
                        
                        return $.replace(text,React.cloneElement(text.get(0),{children:this.getFieldValue(a)}))
                    },$)
                return $.get(0).props.children
            }
        }
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