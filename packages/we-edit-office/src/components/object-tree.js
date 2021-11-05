import React, {Component} from "react"

export default class ObjectTree extends Component{
    constructor({name, open=!!!name}){
        super(...arguments)
        this.state={open}
    }
    
    render(){
        const {value:ob, style, name, isRoot=!name, order=[], filter=[]}=this.props
        if(!ob)
            return null
        const {open}=this.state
        const listStyle={listStyle:"none", paddingLeft:15}
        const folderStyle={display:"inline-block",width:15, cursor:"default"}
        const nameStyle={fontStyle:"italic",fontSize:"smaller",paddingRight:3,whiteSpace:"nowrap"}
        const valueStyle={whiteSpace:"nowrap",paddingLeft:4,fontSize:"smaller"}
        const keys=Array.isArray(ob) ? 
            new Array(ob.length).fill(0).map((n,i)=>i) : 
            Object.keys(ob).filter(a=>!filter.includes(a)).sort();
        
        [...order].reverse().forEach((a,_,array,i=keys.indexOf(a))=>{
            if(i!=-1){
                keys.splice(i,1)
                keys.unshift(a)
            }
        })

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
                    
                    return (
                        <li key={k}>
                            <div style={{display:"flex", flexDirection:"row"}}>
                                <div style={{paddingLeft:folderStyle.width, cursor:"default",...nameStyle}}>{k}:</div>
                                <div style={valueStyle}>{v}</div>
                            </div>
                        </li>
                    )
                }
            }
        }).filter(a=>!!a)

        if(isRoot){
            return (
                <ul style={{...style,...listStyle}}>
                    {lists}
                </ul>
            )
        }

        if(lists.length==0){
            return (
                <li>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{paddingLeft:folderStyle.width, cursor:"default",...nameStyle}}>{name}:</div>
                        <div style={valueStyle}><i>{Array.isArray(ob) ? "[]" : "{}"}</i></div>
                    </div>
                </li>
            )
        }

        return (
            <li>
                <div onClick={()=>this.setState({open:!open})}>
                    <span style={folderStyle}>
                        {open ? "-" : "+"}
                    </span>
                    <span style={{cursor:"default",...nameStyle}}>{name}</span>
                </div>
                {open && 
                    <div style={{paddingLeft:listStyle.paddingLeft}}>
                        <ul style={{...listStyle}}>
                            {lists}
                        </ul>
                    </div>
                }
            </li>
        )     
    }
}