import React, {Component} from "react"
import PropTypes from "prop-types"

export default class ObjectTree extends Component{
    static propTypes={
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.any,
        order: PropTypes.arrayOf(PropTypes.string),
        filter: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
        style: PropTypes.object
    }
    static childContextTypes={
        uiContext: PropTypes.string
    }

    constructor({name, open=!!!name}){
        super(...arguments)
        this.state={open}
    }

    getChildContext(){
        return {
            uiContext:"Tree"
        }
    }
    
    render(){
        const {value:ob, style, name, isRoot=typeof(name)=='undefined', order=[], filter=[]}=this.props
        if(!ob)
            return null
        const {open}=this.state
        const listStyle={listStyle:"none", paddingLeft:15}
        const folderStyle={display:"inline-block",width:15, cursor:"default"}
        const nameStyle={fontStyle:"italic",fontSize:"smaller",paddingRight:3,whiteSpace:"nowrap"}
        const valueStyle={whiteSpace:"nowrap",paddingLeft:4,fontSize:"smaller"}

        if(React.isValidElement(ob)){
            if(ob.props.isPrimitive){
                return this.renderToPrimitive(name, folderStyle, nameStyle, valueStyle, ob)
            }
            return this.renderToObject(open, nameStyle, folderStyle, name, listStyle, ob)
        }

        const keys = this.getKeys(ob, filter, order)

        const lists=keys.map(k=>{
            let v=ob[k]
            if(typeof(v)=="undefined")
                return null
            
            switch(typeof(v)){
                case 'function':
                    return null
                case "object":
                    return (<ObjectTree value={v} name={k} key={k} order={order} filter={filter}/>)
                default:{
                    try{
                        v=v+""
                    }catch(e){
                        return null
                    }
                    
                    return this.renderToPrimitive(k, folderStyle, nameStyle, valueStyle, v)
                }
            }
        }).filter(a=>!!a)

        if(isRoot){
            return this.renderToRoot(style, listStyle, lists)
        }

        if(lists.length==0){
            return this.renderToEmptyObject(nameStyle, folderStyle, name, valueStyle, ob)
        }

        return this.renderToObject(open, nameStyle, folderStyle, name, listStyle, lists)
    }

    renderToRoot(style, listStyle, lists) {
        return (
            <ul style={{ ...style, ...listStyle }} className="object-tree">
                {lists}
            </ul>
        )
    }

    getKeys(ob, filter, order) {
        const keys = Array.isArray(ob) ? new Array(ob.length).fill(0).map((n, i) => i) :
            Object.keys(ob).filter(a => !filter.includes(a) && !filter.find(f => (typeof (f) == "function") && f(a))).sort();

        [...order].reverse().forEach((a, _, array, i = keys.indexOf(a)) => {
            if (i != -1) {
                keys.splice(i, 1)
                keys.unshift(a)
            }
        })
        return keys
    }

    renderToPrimitive(k, folderStyle, nameStyle, valueStyle, v) {
        return (
            <li key={k}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ paddingLeft: folderStyle.width, cursor: "default", ...nameStyle }}>{k}:</div>
                    <div style={valueStyle}>{v}</div>
                </div>
            </li>
        )
    }

    renderToObject(open, nameStyle, folderStyle, name, listStyle, content) {
        return (
            <li>
                <div onClick={() => this.setState({ open: !open })} style={{ cursor: "default", ...nameStyle }}>
                    <span style={folderStyle}>
                        {open ? "-" : "+"}
                    </span>
                    <span>{name}</span>
                </div>
                {open &&
                    <div style={{ paddingLeft: listStyle.paddingLeft }}>
                        <ul style={{ ...listStyle }}>
                            {content}
                        </ul>
                    </div>}
            </li>
        )
    }

    renderToEmptyObject(nameStyle, folderStyle, name, valueStyle, ob) {
        return (
            <li>
                <div style={{ display: "flex", flexDirection: "row", ...nameStyle }}>
                    <div style={{ paddingLeft: folderStyle.width, cursor: "default" }}>{name}:</div>
                    <div style={valueStyle}><i>{Array.isArray(ob) ? "[]" : "{}"}</i></div>
                </div>
            </li>
        )
    }
}

class Node extends Component{

}
