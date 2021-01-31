import React from "react"
import {MenuItem} from "material-ui"
import ComboBox from "../components/combo-box"

export default class FontList extends React.Component{
	constructor(){
		super(...arguments)
		this.state={fonts:Array.from(document.fonts)}
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
		const {state:{fonts}, props:{value, changeFont, muiTheme,dispatch, ...props}}=this
		const dataSource=fonts.map(({family})=>family)
		return <ComboBox
			style={{width:150}}
			value={value}
			dataSource={dataSource}
			onChange={changeFont}
			inputStyle={{border:"1px solid lightgray"}}
			underlineShow={false}
			{...props}
		/>
	}
}
