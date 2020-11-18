import React,{Component} from "react"

import PropTypes from "prop-types"
import {Representation, dom} from "we-edit"

const {Document}=dom
export default class Previewer extends Component{
    render(){
        const {children}=this.props
        return (
            <Representation type="pagination" domain="viewer">
                <WeDocument>
                    <Document id="root">
                        {children}
                    </Document>
                </WeDocument>
            </Representation>
        )
    }
}

class WeDocument extends Component{
    static contextTypes={
        ModelTypes: PropTypes.object
    }

    render(){
        return <div>hello composer</div>
        const document=this.modelize(this.props.children)
        return document
    }

    modelize(node){
        if(!node)
            return node
        const {ModelTypes}=this.context
        
        const {props:{children}, type:{displayName}}=node
        const type=displayName ? `${displayName.charAt(0).toUpperCase()}${displayName.substr(1)}` : displayName

        const transformedChildren=(()=>{
            if(React.isValidElement(children)){
                return this.modelize(children)
            }else if(Array.isArray(children)){
                return children.map(a=>this.modelize(a))
            }else{
                return children
            }
        })();

        return  React.createElement(ModelTypes[type], {children:transformedChildren}, node.props)
    }
}