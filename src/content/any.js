import React, {Component, PropTypes} from "react"
import Group from "../compose/group"
import shallowCompare from 'react-addons-shallow-compare'

export class HasChild extends Component{
    static childContextTypes={
        parent: PropTypes.object.isRequired
    }
	
	children=[]
    composed=[]

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
	 *  child calls context.parent.finished() to notify parent finished composed itself
	 *  return
	 *  	true: parent's children all composed, usually to notify parent's parent
	 */
    finished(child){
		this.children.push(child)
		return React.Children.count(this.props.children)==this.children.length
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
	
	shouldComponentUpdate(nextProps, nextState, nextContext){
		return this.children.length==0 || shallowCompare(this, nextProps, nextState)
	}
	
	/**
	 *  somewhere already decide to update this content, so we need re-compose this content
	 */
    componentDidUpdate(prevProps, prevState){
		this.reCompose()
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
		this._reComposeFrom(this.composed[0])//#2 solution
	}
	
	_reComposeFrom(reference){//#2
		this._removeAllFrom(...arguments)
		this.composed.splice(0)
		this.children.splice(0)
		this.compose()
	}
	
	_removeAllFrom(reference){
		if(!reference){
			this.composed.splice(0)
			this.children.splice(0)
			return
		}
			
		this.context.parent._removeAllFrom(...arguments)
	}

	finished(child){
		if(super.finished(child)){
			this.context.parent.finished(this)
			return true
		}
		return false
	}
}
