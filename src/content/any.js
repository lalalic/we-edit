import React, {Component, PropTypes} from "react"
import Group from "../compose/group"

export class HasChild extends Component{
    static childContextTypes={
        parent: PropTypes.object.isRequired
    }

   _finished=0;

    getChildContext(){
        return {
            parent:this
        }
    }

    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    next(){

    }

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    append(line){

    }

    finished(){
        this._finished++
		return React.Children.count(this.props.children)==this._finished
    }
}

export default class Content extends HasChild{
   state={composed:[]}

    componentWillMount(){
        this.compose()
    }

    componentWillReceiveProps(nextProps){
        return nextProps.children!=this.props.children
    }

    render(){
        return <Group {...this.props}/>
    }

    compose(){

    }

    static contextTypes={
        parent: PropTypes.object
    }

    /**
     * children should call before composing line,
     * return next line rect {*width, [height]}
     */
    next(){
        super.next()
        const {parent}=this.context
        return parent.next()
    }

    /**
     * children should call after a line composed out
     * a chance to add to self's composed
     */
    append(line){
        super.append(line)
        return this.context.append(line)
    }
	
	finished(){
		if(super.finished()){
			this.context.parent.finished()
			return true
		}
		return false
	}
}
