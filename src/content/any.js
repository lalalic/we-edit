import React, {Component, PropTypes} from "react"
import Group from "../compose/group"

export class HasChild extends Component{
    static childContextTypes={
        parent: PropTypes.object.isRequired
    }

    state={finished:{count:0}}

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
        let {finished}=this.state
        finished.count++
    }
}

export default class Content extends HasChild{
    constructor(){
        super(...arguments)
        this.state=Object.assign({composed:[]},this.state)
    }

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
        const {parent}=this.context
        return parent.append(line)
    }

    finished(){
        super.finished()

        const {children}=this.props
        const {finished}=this.state

        if(React.Children.count(children)==finished.count){
            const {parent}=this.context
            parent.finished()
        }

    }
}
