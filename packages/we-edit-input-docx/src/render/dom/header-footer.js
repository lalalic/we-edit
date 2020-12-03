import React,{Component} from "react"
import PropTypes from "prop-types"
import {ReactQuery} from "we-edit"
import {Field, Context} from "./field"

export default ({Frame},displayName="headerFooter")=>class HeaderFooter extends Component{
    static displayName=displayName
    
    static contextTypes={
        headerFooterWidth: PropTypes.number,
        editable: PropTypes.any,
    }

    render(){
        const HFFrame=this.constructor.ReFrame
        return <HFFrame {...this.props} width={this.context.headerFooterWidth}/>
    }

    //evolve
    static ReFrame=class extends Frame{
        createComposed2Parent(...args){
            const composed=super.createComposed2Parent(...args)
            if(this.needReLayout){
                return (
                    <this.constructor.ReLayout {...composed.props} composed={composed}>
                        <Frame {...this.props} />
                    </this.constructor.ReLayout>
                )
            }
            return composed
        }

        get needReLayout(){
            return new ReactQuery(<div>{this.props.children}</div>)
                .find('field[command="PAGE"],field[command="NUMPAGES"],fieldBegin[command="NUMPAGES"],fieldBegin[command="NUMPAGES"]')
                .length>0
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