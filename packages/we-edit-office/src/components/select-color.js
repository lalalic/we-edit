import React, {Component} from "react"
import {FlatButton} from "material-ui"

import IconColor from "material-ui/svg-icons/image/color-lens"

export default class extends Component{
	render(){
		const titleStyle={fontWeight:700, marginTop:4}
		const {onChange}=this.props
		return (
			<div onClick={onChange} style={{width:150, fontSize:"smaller"}}>
				<AutoColor/>
				
				<div style={titleStyle}>Theme Colors</div>	
				<ThemeColors/>
				
				<div style={titleStyle}>Theme Colors</div>	
				<StandardColors/>
				
				<div style={{marginTop:4}}>
					<FlatButton 
						style={{textAlign:"left"}}
						label="More Colors..."
						icon={<IconColor/>}/>
				</div>
			</div>
		)
	}
}

const ColorBlock=({color,size=12})=>(
	<span style={{background:color,display:"inline-block",width:size,height:size,marginRight:2}}>
		&nbsp;
	</span>
)

const AutoColor=({color="currentColor"})=>(
	<div style={{padding:2}}>
		<ColorBlock color={color} size={16}/>
		<span style={{lineHeight:"16px"}}>Automatic</span>
	</div>
)

class ThemeColors extends Component{
	render(){
		const {colorThemes=[]}=this.props
		return (
			<div style={{padding:2}}>
				{[0,1,2,3,4,5].map(opacity=>
					<StandardColors colors={colorThemes.map(theme=>this.getColor(theme,opacity))}/>
				)}
			</div>
		)
	}
	
	getColor(color,opacity){
		return color
	}
}
const StandardColors=({colors="black,blue,red,yellow,chocolate,tan,pink,brown,green,orange".split(",")})=>(
	<div style={{paddingLeft:2, paddingTop:2, paddingBottom:2}}>
		{colors.map(a=><ColorBlock color={a}/>)}
	</div>
)