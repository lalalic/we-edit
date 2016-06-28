import React, {Component, PropTypes} from "react"
import Group from "../compose/group"

export class HasChild extends Component{
    static childContextTypes={
        parent: PropTypes.object.isRequired
    }

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
		this._finished=0
        this.composed=[]
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
	
	
	
    componentDidUpdate(prevProps, prevState){
		this.reCompose()
	}

	reCompose(){
		
	}

	replaceAvailableSpace(reference,required={width:0, height:0}){

    }
	
	/**
	 * 
	 */
	replaceComposed(next, prev){
		
	}

	/**
	 *  child calls context.parent.finished() to notify parent finished composed itself
	 *  return
	 *  	true: parent's children all composed, usually to notify parent's parent
	 */
    finished(){
        this._finished++
		return React.Children.count(this.props.children)==this._finished
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
	
	replaceComposed(){
		return this.context.parent.replaceComposed(...arguments)
	}

	finished(){
		if(super.finished()){
			this.context.parent.finished()
			return true
		}
		return false
	}
}
