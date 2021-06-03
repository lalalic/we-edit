import React, { Children } from "react"
import {Menu} from "material-ui"

export default ({openOnHover, children, ...props})=>{
    if(!openOnHover)
        return <Menu {...props}>{children}</Menu>
    let current=0
    const menu=React.createRef()
    return (
        <Menu ref={menu}>
            {Children.map(children, (a,i)=>{
                if(a?.type?.muiName=="MenuItem" && a.props.menuItems){
                    return React.cloneElement(a, {
                        onMouseEnter(e){
                            current=i
                            e.currentTarget.click()
                        },
                        onMouseOutCapture(){
                            console.log('onMouseOutCapture')
                            console.log(menu.current.refs.focusedMenuItem?.state)
                            if(current==i){
                                menu.current.refs.focusedMenuItem?.setState({open:false,anchorEl:null})
                            }
                        }
                    })
                }else{
                    return a
                }
            })}
        </Menu>)
}