import React, {Component, PropTypes} from "react"
import Group from "../composed/group"
import shallowCompare from 'react-addons-shallow-compare'

var uuid=0
export class HasChild extends Component{
    state={content:React.Children.toArray(this.props.children), style:{fontFamily:"arial"}}
	children=[]
    composed=[]
    _id=uuid++

    static childContextTypes={
		parent: PropTypes.object,
        style: PropTypes.object
    }

    getChildContext(){
        return {
			parent: this,
            style: this.state.style
        }
    }

	render(){
		const {children, ...others}=this.props
		const {content}=this.state
        return <Group {...this.props}>{content}</Group>
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
		this._startComposeAt=Date.now()
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
        console.info(`composed a ${child.displayName} ${child.displayName=='text' ? `:${child.state.text||child.props.children}` : ''}`)
        this.children.push(child)
		if(this.state.content.length==this.children.length){
			this.onAllChildrenComposed()
		}
    }

	onAllChildrenComposed(){
		console.log(`${this.displayName}(${this._id}) composed within ${Date.now()-this._startComposeAt}ms`)
	}
}

export default class HasParentAndChild extends HasChild{
    displayName="content"
    static contextTypes={
        parent: PropTypes.object
    }
    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    nextAvailableSpace(){
        return this.context.parent.nextAvailableSpace(...arguments)
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
		Object.assign(this.state,{content:this.props.children})
        Object.freeze(this.children)//no children
	}

    render(){
		return null
	}

    compose(){
        let composed=this.createComposedPiece()

        const {parent}=this.context
        this.composed.push(composed)
        parent.appendComposed(composed)
        parent.on1ChildComposed(this)
    }

    /***
     * after figure out props, you'd better call this to create Element
     */
    createComposedPiece(props){
        return null
    }
}
