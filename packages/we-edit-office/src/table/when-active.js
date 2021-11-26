import React from "react"
import {dom} from "we-edit"
import WhenActive from "../components/when-active"
import Design from "./design"
import PropTypesUI from "../components/prop-types-ui"

export default ({selection, style})=>(
	<WhenActive label="Table Design">
		<Design/>
		<PropTypesUI theme="table" 
			propTypes={dom.Table.propTypes}
			props={style}
			/>
	</WhenActive>
)
