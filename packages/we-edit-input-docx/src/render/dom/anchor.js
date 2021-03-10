import React,{Component} from "react"
export default ({Anchor})=>class __$1 extends Component{
	static displayName="anchor"
	render(){
		const {distance:_, wrap:{distance=_, path}, x, y,...props}=this.props

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
		
		return <Anchor {...props} {...{x,y,wrap:{mode:this.mode,side:this.side,distance,path}}}/>
	}

    get mode(){
        const {wrap:{mode}}=this.props
        return MODE[mode]||"no"
    }

    get side(){
        const {wrap:{side}}=this.props
        return SIDE[side]||"both"
    }
}

const MODE={
    Square:"square",
    Tight:"tight",
    Through:"tight",
    TopAndBottom:"clear",
    Clear:"clear",
}

const SIDE={
    bothSides:"both",
}