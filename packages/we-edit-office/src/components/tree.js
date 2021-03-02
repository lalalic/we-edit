import React, {PureComponent,Fragment} from "react"
export default class Tree extends PureComponent{
    render(){
        const {data, children:render, style, ...props}=this.props
        return (
            <dl style={{padding:5,...style}} {...props}>
                {typeof(render)=="function" ? render(data, this.constructor.Node) : render}
            </dl>
        )
    }

    static Node=class Node extends PureComponent{
        static defaultProps={
            open:true,
        }

        constructor({open}){
            super(...arguments)
            this.state={open}
        }
        
        render(){
            const {state:{open, dynamic}, props:{name,children,onClick,style,...props}}=this
            const content=typeof(children)=="function" ? dynamic : children
            const childrenNodes=content && Array.isArray(content) && content.length>0 && (
                <dl style={{marginLeft:15, marginTop:0, marginBottom:0, display: open ? "" : "none"}}>
                    {content}
                </dl>
            )

            const toggleOpen=e=>this.setState(({open},{children})=>{
                if(typeof(children)=="function" && !dynamic){
                    return {dynamic:children(this.props),open:true}
                }
                return {open:!open}
            })
    
            return (
                <Fragment>
                    {!name ? null : 
                    <dt {...props} style={{...style, userSelect:"none",cursor:"default",whiteSpace:"nowrap",cursor:"default",textOverflow: "ellipsis"}}>
                        <span
                            onClick={toggleOpen}
                            style={{display:"inline-block",width:20,textAlign:"center"}}>
                            {typeof(children)=="function"&&!dynamic ? "+" : !!childrenNodes && (open ? "-" : "+")}
                        </span>
                        <span onClick={onClick||toggleOpen} style={{fontSize:"small"}} title={name}>
                            {name}
                        </span>
                    </dt>
                    }
                    {childrenNodes}
                </Fragment>
            )
        }
    }
}