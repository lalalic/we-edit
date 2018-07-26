import React, {Component} from "react"
import {FlatButton,FontIcon} from "material-ui"

import IconColor from "material-ui/svg-icons/image/color-lens"

export default class extends Component{
	render(){
		const titleStyle={fontWeight:700, marginTop:4}
		const {onChange}=this.props
		return (
			<div style={{width:150, fontSize:"smaller"}}>
				<SpecialColor color="currentColor" label="Automatic" onSelect={onChange}/>
				
				<div style={titleStyle}>Theme Colors</div>	
				<ThemeColors onSelect={onChange}/>
				
				<div style={titleStyle}>Standard Colors</div>	
				<StandardColors onSelect={onChange}/>
				
				<SpecialColor color="" label="No Color" onSelect={onChange}/>
				
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
			<div style={{padding:2}}>
				{[0,1,2,3,4,5].map(opacity=>
					<StandardColors key={opacity}
						onSelect={onSelect} 
						colors={colorThemes.map(theme=>this.getColor(theme,opacity))}
						/>
				)}
			</div>
		)
	}
	
	getColor(color,opacity){
		return color
	}
}
const StandardColors=({onSelect, colors="black,blue,red,yellow,chocolate,tan,pink,brown,green,orange".split(",")})=>(
	<div style={{paddingLeft:2, paddingTop:2, paddingBottom:2}}>
		{colors.map(a=><ColorBlock key={a} color={a} onClick={()=>onSelect(a)}/>)}
	</div>
)