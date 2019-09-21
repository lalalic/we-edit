import React from "react"
import {compose,setDisplayName} from "recompose"

import {FontManager} from "we-edit-representation-pagination"
import ComboBox from "../components/combo-box"

const FontList=compose(
	setDisplayName("FontList"),
)(({fonts=FontManager.names, value, changeFont:set, muiTheme,dispatch, ...props})=>(
	<ComboBox
		style={{width:150}}
		value={value}
		dataSource={Array.from(new Set([...fonts,"Arial","Times New Roman", "Verdana","Calibri"])).sort()}
		onChange={set}
		inputStyle={{border:"1px solid lightgray"}}
		underlineShow={false}
		{...props}
		/>
))

export default FontList
