import React from "react"
import {render, AggregateContext} from "we-edit"
import Balanceable from "./balanceable"
import layout from ".."

/**
 * Autofitable is to autofit content of block by changing font size, paragraph space
 */
export default class Autofitable extends Balanceable{
    defineProperties() {
		super.defineProperties()
		Object.defineProperties(this,{
			autofitable:{
				get(){
                    const {shouldAutofitDown, shouldAutofitUp, autofitDown, autofitUp}=this
					return shouldAutofitDown && shouldAutofitUp && autofitDown && autofitUp
				}
			}
		})
    }
    
    
    onAllChildrenComposed(){
        if(this.autofitable && !this.balanceable){
            this.__autofit()
        }
        super.onAllChildrenComposed()
    }

    balance(){
        super.balance()
        if(this.autofitable){
            this.__autofit()
        }
    }

    __autofit(){
        const {layout, ...autofit}= this.shouldAutofitDown() ? this.autofitDown() : (this.shouldAutofitUp() && this.autofitUp() ||{})
        if(layout){
            this.computed={...this.computed, ...layout.computed, autofit}
        }
    }

	
	/**
	 * to layout children with changed context
	 * @param {*} context 
	 */
	__layoutAutofitContent(context){
		const composers=new Map()
	    const mount=a=>{
            composers.set(a.props.id,a)
        }
		const unmount=a=>{
            if(composers.get(a.props.id)==a){
                composers.delete(a.props.id)
            }
        }
        const getComposer=id=>composers.get(id)

        const {width}=this.getSpace()
        const content=(
            <AggregateContext target={this} value={{
                    mount,unmount,getComposer,
                    parent:{
                        appendComposed(){

                        }
					},
					shouldContinueCompose(){
						return true
					},
                    ...context,
                    editable:false,
                }}>
                <Balanceable space={{width}} id="___target">{this.props.children}</Balanceable>
            </AggregateContext>
        )
        return render(content).find(a=>a.props.id=="___target").instance
	}
}