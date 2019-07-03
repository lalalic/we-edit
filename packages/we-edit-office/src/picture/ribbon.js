import React from "react"
import {Toolbar,ToolbarGroup,Tab} from "material-ui"

import Size from "./size"
import Border from "./border"
import Position from "./position"
import Effect from "./effect"

export default ({children})=>(
	<Tab label="Picture Format">
		<Toolbar>
			<ToolbarGroup>
				<Effect/>
				<Border/>
				<Position/>
				<Size/>	
				{children}
			</ToolbarGroup>
		</Toolbar>
	</Tab>
)