import React,{Component} from "react"
export default ({Anchor})=>class __$1 extends Component{
	static displayName="anchor"
	render(){
		const {distance, wrap, x, y,...props}=this.props
		const margin=((a,b)=>{
            return "left,right,top,bottom".split(",")
                .reduce((o,k)=>{
                    o[k]=Math.max(a[k]||0,b[k]||0)
                    return o
                },{})
        })(distance||{}, wrap && wrap.distance||{});

        switch(x.base){
        case "leftMargin":
            x.base="margin"
            x.align="left"
            break
        case "rightMargin":
            x.base="margin"
            x.align="right"
            break
        }

        switch(y.base){
        case "topMargin":
            y.base="margin"
            y.align="top"
            break
        case "bottomMargin":
            y.base="margin"
            y.align="bottom"
            break
        }
		
		return <Anchor {...props} {...{margin,wrap,x,y}}/>
	}
}