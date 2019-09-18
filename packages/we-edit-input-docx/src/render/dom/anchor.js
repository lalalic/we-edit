import React,{Component} from "react"
export default ({Anchor})=>class __$1 extends Component{
	static displayName="anchor"
	render(){
		const {distance, wrap, ...props}=this.props
		const margin=((a,b)=>{
            return "left,right,top,bottom".split(",")
                .reduce((o,k)=>{
                    o[k]=Math.max(a[k]||0,b[k]||0)
                    return o
                },{})
        })(distance||{}, wrap && wrap.distance||{});
		
		return <Anchor {...props} margin={margin} wrap={wrap}/>
	}
}