import React from "react"
import {render, AggregateContext} from "we-edit"
import Balanceable from "./balanceable"

/**
 * Autofitable is to autofit content of block by changing font size, paragraph space
 */
export default class Autofitable extends Balanceable{
    defineProperties() {
		super.defineProperties()
		Object.defineProperties(this,{
			autofitable:{
				get(){
                    return !!this.props.autofit && this.autofit
				}
			}
		})
    }
    
    
    onAllChildrenComposed(){
        if(this.autofitable && !this.balanceable){
            this.autofit()
        }
        super.onAllChildrenComposed()
    }

    balance(){
        super.balance()
        if(this.autofitable){
            this.autofit()
        }
    }
	
	/**
	 * to layout children with changed context
	 * @param {*} context 
	 */
	layoutOnly(context,content){
		const composers=new Map()
	    const mount=a=>{
            composers.set(a.props.id,a)
        }

        const getComposer=id=>composers.get(id);

        const rendered=render(
            <AggregateContext target={this} value={{
                    mount,getComposer,
                    parent:{
                        appendComposed(){

                        }
					},
					shouldContinueCompose(){
						return true
					},
                    editable:false,
                    ...context,
                }}>
                {React.cloneElement(content||<Balanceable space={{width:this.getSpace().width}} id="___target">{this.props.children}</Balanceable>,{__me:true,key:Date.now()})}
            </AggregateContext>
        )
        const target=rendered.find(a=>a.props.__me===true).instance
        return target
	}
}