import React, {Component} from "react"
import {Divider, FlatButton,FontIcon, Menu, MenuItem} from "material-ui"

import IconColor from "material-ui/svg-icons/image/color-lens"

export default class ColorSelector extends Component{
	render(){
		const titleStyle={fontWeight:700, marginTop:4, paddingLeft:10}
		const {onChange, children}=this.props
		return (
			<div style={{fontSize:"smaller"}}>
				<center>
					<SpecialColor color="" label="No Color" onSelect={onChange}/>
				</center>
				
				<div style={titleStyle}>Theme Colors</div>	
				<ThemeColors onSelect={onChange}/>
				
				<div style={titleStyle}>Standard Colors</div>	
				<StandardColors onSelect={onChange}/>
				
				<Menu>
					<Divider/>
					<MenuItem primaryText="More Colors..." leftIcon={<IconColor/>}/>
					{children}
				</Menu>
			</div>
		)
	}
}

const ColorBlock=({color,size=12,...props})=>(
	<span {...props}
		style={{
			cursor:"default",
			background:color,
			display:"inline-block",
			width:size,
			height:size,
			marginRight:2,
			lineHeight:"100%"
		}}>
		&nbsp;
	</span>
)

const SpecialColor=({color, label, onSelect})=>(
	<FlatButton 
		fullWidth={true}
		style={{textAlign:"left"}}
		label={label}
		onClick={e=>onSelect(color)}
		icon={
			<FontIcon>
				<ColorBlock color={color} size={16}/>
			</FontIcon>
		}/>
)

class ThemeColors extends Component{
	render(){
		const {colorThemes=[], onSelect}=this.props
		return (
			<center style={{padding:2}}>
				{[0,1,2,3,4,5].map(opacity=>
					<StandardColors key={opacity}
						onSelect={onSelect} 
						colors={colorThemes.map(theme=>this.getColor(theme,opacity))}
						/>
				)}
			</center>
		)
	}
	
	getColor(color,opacity){
		return color
	}
}
const StandardColors=({onSelect, colors="black,blue,red,yellow,chocolate,tan,pink,brown,green,orange".split(",")})=>(
	<center style={{paddingLeft:2, paddingTop:2, paddingBottom:2}}>
		{colors.map(a=><ColorBlock key={a} color={a} onClick={()=>onSelect(a)}/>)}
	</center>
)