import React, {Component} from "react"
import PropTypes from "prop-types"

class LocatableDocument extends Component{
    static childContextTypes={
        mount: PropTypes.func,
        unmount: PropTypes.func,
    }

    constructor(){
        super(...arguments)
        this.viewer=new DB()
    }

    getChildContext(){
        return {
            mount(){

            }
        }
    }

}


class Locatable extends Component{
    static contextTypes={
        mount: PropTypes.func,
        unmount:PropTypes.func,
        offset: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    }

    getRect(){
        const {["data-content"]:id,width,height}=this.props
        const {offset, mount}=this.context
        if(typeof(id)==undefined)
            return



    }
}


class DB{

}
