import React from "react"
import PropTypes from "prop-types"
import {dom} from "we-edit"

import Frame from "./frame"
import memoize from "memoize-one"

const factory=MyFrame=>class extends MyFrame{
	static displayName=MyFrame.displayName.replace("-frame","-"+dom.Page.displayName)

	static factory=factory

	static propTypes=dom.Page.propTypes||{}
	static defaultProps=dom.Page.defaultProps||{}

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
			const {props:{I:key,width,height,margin}}=this
			return React.cloneElement(super.createComposed2Parent(),{key,width,height,margin})
		}

		return new Proxy(this,{
			get(target, key){
				if(key=="render")
					return render
				return target[key]
			}
		})
	})
}

export default factory(Frame)
