import React, {Component, PropTypes} from "react"
import Group from "../composed/group"

export class HasChild extends Component{
    state={content:React.Children.toArray(this.props.children), style:this.props.style}
	children=[]
    composed=[]

    static childContextTypes={
		parent: PropTypes.object
    }

    getChildContext(){
        return {
			parent: this
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
		if(this.state.content.length==0)
			this.context.parent.on1ChildComposed(this)
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
        this.children.push(child)
		if(this.state.content.length==this.children.length){
			this.onAllChildrenComposed()
		}
    }

	onAllChildrenComposed(){

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

export function togglable(Content){
	return class StyleContainer extends Content{
		static childContextTypes=Object.assign({
				containerStyle: PropTypes.object
			},Content.childContextTypes)

		getChildContext(){
            const {contentStyle}=this.props
            const {containerStyle}=this.context

            return Object.assign({
					containerStyle:{
                        get(path){
                            let v=contentStyle.get(path)
                            if(v==undefined)
                                return containerStyle.get(path)
                            return v
                        }
                    }
				}, super.getChildContext())
		}

		static contextTypes=Object.assign({
				createStyle: PropTypes.func,
                containerStyle: PropTypes.object
			},Content.contextTypes)
	}
}
