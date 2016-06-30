import React, {Component, PropTypes} from "react"
import Group from "../compose/group"
import shallowCompare from 'react-addons-shallow-compare'

var uuid=0
export class HasChild extends Component{
    static childContextTypes={
        parent: PropTypes.object.isRequired
    }

    state={}
	children=[]
    composed=[]
	_id=uuid++

    getChildContext(){
        return {
            parent:this
        }
    }

	render(){
        return <Group {...this.props}/>
    }

    componentWillMount(){
        this.compose()
    }

	compose(){
		this._startComposeAt=Date.now()
    }

    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    nextAvailableSpace(required={width:0, height:0}){

    }

	/**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    appendComposed(line){

    }

	/**
	 *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
	 *  return
	 *  	true: parent's all children composed
	 */
    on1ChildComposed(child){
		console.info(`composed a ${child.displayName} ${child.displayName=='inline' ? `:${child.state.text||child.props.children}` : ''}`)
		this.children.push(child)
		if(React.Children.count(this.props.children)==this.children.length){
			this.onAllChildrenComposed()
		}
    }
	
	onAllChildrenComposed(){
		console.log(`${this.displayName}(${this._id}) composed within ${Date.now()-this._startComposeAt}ms`)
	}
}

export default class HasParent extends HasChild{
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

	/**
	 *  it's a very complicated job, so we need a very simple design, one sentence described solution. options:
	 *  1. remove all composed, and re-compose all
	 *  	- need find a time to recompose
	 *  	- logic is most simple
	 *  	- performance is most bad
	 *
	 *  2. remove all composed from this content, and re-compose removals
	 *  	- Need locate composed of this content in page
	 *  	- Need find a time to recompose
	 *  		> componentDidUpdate
	 *  			. any state update,
	 *  			. and carefully tuned shouldComponentUpdate(nextProps, nextState, nextContext)
	 *  	- performance is better than #1
	 *
	 *  3. recompose this content, and check if new composed fits last composed space (hit ratio is low)
	 *  	- Yes: just replace
	 *  	- No: #1, or #2
	 *  	- and then loop with all following content with the same logic
	 *
	 *  	3.a: recompose this content line by line ..., much logics here
	 */
	reCompose(){
		this.composed[0] && this._reComposeFrom(this.composed[0])//#2 solution
	}

	/**
	 *  if with content
	 *  	> simply ask parent to recompose
	 *  if without content
	 *  	> just remove all and offspring to be ready to re-compose
	 *  	> somewhere sometime it will be triggered to re-compose
	 */
	_reComposeFrom(content){
        console.info(`remove all from ${this.displayName} ${content ? "" : "not"} including child, and parent`)
		if(content)
			this.context.parent._reComposeFrom(this)
		else{
			this.composed.splice(0)
			this.children.forEach(a=>a._reComposeFrom())
			this.children.splice(0)
		}
	}
    /**
     * only no composed should be re-compose
     */
    shouldComponentUpdate(nextProps, nextState, nextContext){
        console.info(`shouldComponentUpdate on ${this.displayName}, with ${this.composed.length==0}`)
        if(this.composed.length==0){
            this.compose()
            return true
        }
        return false
    }
	
	onAllChildrenComposed(){
		this.context.parent.on1ChildComposed(this)
		super.onAllChildrenComposed()
	}
}
