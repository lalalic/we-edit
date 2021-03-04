import React, {Fragment} from "react"
import {Menu, MenuItem} from "material-ui"
import ComboBox from "../components/combo-box"
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class FontList extends React.Component{
	constructor(){
		super(...arguments)
		this.state={fonts:Array.from(document.fonts)}
		this.menu=React.createRef()
	}

	componentDidMount(){
		document.addEventListener("fontLoaded",this.fontListener=()=>{
			this.setState({fonts:Array.from(document.fonts)})
		})
	}

	componentWillUnmount(){
		document.removeEventListener("fontLoaded",this.fontListener)
	}

	render(){
		const {state:{fonts, focusing}, props:{value, changeFont, muiTheme,dispatch, ...props}}=this
		const dataSource=Array.from(new Set(fonts.map(({family})=>family))).sort()
			.reduce((menus, a)=>{
				const last=menus[menus.length-1], focusIndex=menus.length-1
				if(last && a.startsWith(last.text+" ")){
					if(last.value.props.menuItems){
						last.value.props.menuItems.push(<MenuItem primaryText={a}/>)
					}else{
						menus.splice(-1,1,{
							text:last.text, 
							value:React.cloneElement(last.value,{
								rightIcon:<ArrowDropRight />,
								onMouseEnter:e=>{
									
								},
								menuItems:[last.value,<MenuItem primaryText={a}/>],
							})
						})
					}
				}else{
					menus.push({text:a, value:<MenuItem primaryText={a} key={a} ref={a}/>})
				}
				return menus
			},[])
		return <ComboBox
			style={{width:150}}
			value={value}
			dataSource={dataSource}
			onChange={changeFont}
			inputStyle={{border:"1px solid lightgray",background:"white"}}
			underlineShow={false}
			menuProps={{
				ref:this.menu,
				style:{width:150},
				menuItemStyle:{width:150}
			}}
			{...props}
		/>
	}
}
