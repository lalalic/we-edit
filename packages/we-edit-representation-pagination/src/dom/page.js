import React from "react"
import PropTypes from "prop-types"
import Frame from "./frame"
import memoize from "memoize-one"

const factory=MyFrame=>class extends MyFrame{
	static factory=factory
	static childContextTypes={
		...MyFrame.childContextTypes,
		isAnchored:PropTypes.func,
        exclusive: PropTypes.func,
	}
	
	getChildContext(){
        const me=this
        function isAnchored(){
            return me.isAnchored(...arguments)
        }
        function exclusive(){
            return me.exclusive(...arguments)
        }
        return Object.assign(super.getChildContext(),{
            isAnchored,
            exclusive,
        })
    }
	
	defineProperties(){
		super.defineProperties()
		Object.defineProperties(this,{
			composedHeight:{
				enumerable:false,
				configurable:false,
				get(){
					return Math.max(...this.columns.map(column=>column.y+(column.height-column.availableHeight)))
				}
			},
		})
	}

	createComposed2Parent=memoize(()=>{
		const render=()=>{
			const {props:{i:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})
		}
		
		return Object.assign(this.clone(),{
			render(){
				return render()
			}
		})
	})
}

export default factory(Frame)
