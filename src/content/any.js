import React, {Component, PropTypes} from "react"
import Group from "../composed/group"

export class HasChild extends Component{
    computed={children:[], composed:[], contentStyle:this.props.contentStyle}

    static childContextTypes={
		parent: PropTypes.object
    }

    getChildContext(){
        return {
			parent: this
        }
    }

	render(){
        return <div style={{display:"none"}}>{this.getContent()}</div>
    }

    /**
     * compose on client or server
     */
    componentWillMount(){
        this.compose()
    }

    /**
     * usually NoChild content should be composed according to nextAvailableSpace,
     * and then append to itself.composed[] and parent.appendComposed
     */
	compose(){
		if(this.isEmpty())
			this.context.parent.on1ChildComposed(this)
    }

	getContentCount(){
		return React.Children.count(this.props.children)
	}

	getContent(){
		return this.props.children
	}

	isEmpty(){
		return this.getContentCount()==0
	}

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    appendComposed(line){

    }

    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    nextAvailableSpace(required={width:0, height:0}){

    }

	/**
	 *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
	 *  return
	 *  	true: parent's all children composed
	 */
    on1ChildComposed(child){
		this.computed.children.push(child)
		if(this.isAllChildrenComposed()){
			this.onAllChildrenComposed()
		}
    }

    isAllChildrenComposed(){
        return this.getContentCount()==this.computed.children.length
    }

	onAllChildrenComposed(){

	}

	createComposed2Parent(props){

	}
}

export default class HasParentAndChild extends HasChild{
    displayName="*"
    static contextTypes={
        parent: PropTypes.object
    }
    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    nextAvailableSpace(){
        return this.availableSpace=this.context.parent.nextAvailableSpace(...arguments)
    }

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    appendComposed(){
        return this.context.parent.appendComposed(...arguments)
    }

	onAllChildrenComposed(){
		this.context.parent.on1ChildComposed(this)
		super.onAllChildrenComposed()
	}
}

export class NoChild extends HasParentAndChild{
    constructor(){
		super(...arguments)
        Object.freeze(this.computed.children)//no children
	}

    render(){
		return null
	}

    compose(){
        let composed=this.createComposed2Parent()

        const {parent}=this.context
        this.computed.composed.push(composed)
        parent.appendComposed(composed)
        parent.on1ChildComposed(this)
    }
}

const TOGGLES='b,i,vanish'.split(',')

export function isToggleStyle(stylePath){
	let [inline,key]=stylePath.split('.')
	if(inline!='inline')
		return false
	return TOGGLES.indexOf(key)!=-1
}

export function styleInheritable(Content){
	return class StyleContainer extends Content{
		static childContextTypes=Object.assign({
				containerStyle: PropTypes.object
			},Content.childContextTypes)

		getChildContext(){
            const {contentStyle}=this.computed
            const {containerStyle}=this.context

            return Object.assign(super.getChildContext(),{
					containerStyle:{
                        get(path){
                            let v=contentStyle.get(path)
                            if(v==undefined)
                                return containerStyle.get(path)
                            else if(isToggleStyle(path) && v==-1){
                                let toggles=containerStyle.get(path)
                                if(typeof(toggles)=='number'){
                                    if(toggles<0)
                                        v=toggles-1
                                    else
                                        v=toggles
                                }
                            }
                            return v
                        }
                    }
				})
		}

		static contextTypes=Object.assign({
			createStyle: PropTypes.func,
            containerStyle: PropTypes.object
		},Content.contextTypes)

        style(key){
            const {contentStyle}=this.computed
            const {containerStyle}=this.context
            let value=contentStyle.get(key)
            if(value==undefined)
                value=containerStyle.get(key)
            return value
        }
	}
}
