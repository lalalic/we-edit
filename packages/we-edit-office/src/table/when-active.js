import React from "react"
import PropTypes from "prop-types"
import {dom,ACTION} from "we-edit"
import Design from "./design"
import PropTypesUI from "../components/prop-types-ui"
import SelectStyle from "../components/select-style"
import ContextMenu from "../components/context-menu"
import {MenuItem} from "../components/menu"


export default Object.assign(({},{setting})=>(
	<ContextMenu.Support menus={[
			<MenuItem primaryText="Insert"/>,
		]}>
			{/*
		
		<Design/>
		<SelectStyle type="table">
			{({style,dispatch})=>
				<PropTypesUI theme="Table" 
					propTypes={dom.Table.propTypes}
					props={style}
					onChange={table=>dispatch(ACTION.Entity.UPDATE({table}))}
					/>
			}
		</SelectStyle>
		<SelectStyle type="row">
			{({style,dispatch})=>
				<PropTypesUI theme="Row" 
					propTypes={dom.Row.propTypes}
					props={style}
					onChange={row=>dispatch(ACTION.Entity.UPDATE({row}))}
					/>
			}
		</SelectStyle>
		*/}
		<SelectStyle type="cell">
			{({style,dispatch})=>
				<PropTypesUI theme="Cell" 
					propTypes={dom.Cell.propTypes}
					props={style}
					onChange={cell=>dispatch(ACTION.Entity.UPDATE({cell}))}
					/>
			}
		</SelectStyle>
		
	</ContextMenu.Support>
),{
	contextTypes:{
		setting: PropTypes.func,
	}
})
