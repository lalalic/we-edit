import React from "react"
import {Toolbar,ToolbarSeparator,Tab} from "material-ui"
import Design from "./design"
import Layout from "./layout"
export default ({style,selection})=>(
	[
		<Tab label="Table Design">
			<Design/>
		</Tab>
		,
		<Tab label="Layout">
			<Layout/>
		</Tab>
	]
)
