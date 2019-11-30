import React, {Fragment} from "react"
import PropTypes from "prop-types"
import memoize from "memoize-one"

import {HasChild, Locatable,} from "../composable"
import {dom,ACTION} from "we-edit"
import Template from "./template"
import {Canvas} from "../composed"

const {Document:Base}=dom
const Super=Locatable.Locatorize(HasChild(Base))

export default class Document extends Super{
    static propTypes={
        ...Super.prototype,
        canvas: PropTypes.node,
    }
    static defaultProps={
        ...Super.defaultProps,
        canvas:<Canvas/>,
    }

    static contextTypes={
        ...Super.contextTypes,
        Measure: PropTypes.func,
    }

    static childContextTypes={
        ...Super.childContextTypes,
        Measure: PropTypes.func,
        getComposedTemplate:PropTypes.func,
        prevLayout: PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.computed.templates=[]
    }

    get pages(){
        return this.computed.composed
    }

    getChildContext(){
        const self=this
        return {
            ...super.getChildContext(),
            Measure: this.getMeasure(),
            getComposedTemplate(id){
                return self.computed.templates.find(a=>a.props.id===id)||{props:{children:null}}
            },
            prevLayout(ref){
                const pages=self.computed.composed
                const i=pages.indexOf(ref)
                return pages[i-1]
            }
        }
    }

    getMeasure=memoize(()=>{
        const {precision=1}=this.props
        if(precision==1)
            return this.context.Measure

        return class __$1 extends this.context.Measure{
            lineHeight(...args){
                const {height,descent}=super.lineHeight(...args)
                return {
                    height:height*precision,
                    descent:descent*precision
                }
            }

            stringWidth(...args){
                return precision*super.stringWidth(...args)
            }
        }
    })

    render(){
		const {canvas}=this.props
        return (
			<Fragment>
                {super.render()}
                {canvas && React.cloneElement(canvas, {document:this})}
			</Fragment>
		)
    }

	appendComposed(page){
        if(Template.isTemplate(page)){
            this.computed.templates.push(page)
        }else if(this.computed.composed.indexOf(page)==-1){
            this.computed.composed.push(page)
        }
	}

    componentDidMount(){
        this.dispatch(ACTION.Statistics({pages:this.computed.composed.length}))
	}
}

