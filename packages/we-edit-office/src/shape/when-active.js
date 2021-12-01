import React,{Fragment} from "react"
import {ACTION, dom} from "we-edit"
import {compose, setDisplayName} from "recompose"
import {MenuItem, SvgIcon, ToolbarSeparator} from "material-ui"

import Create from "./create"
import SelectStyle from "../components/select-style"
import PropTypesUI from "../components/prop-types-ui"
import {Shape} from "../layout"

export default compose(
	setDisplayName("Shape Ribbon")
)(({children})=>{
	return (
		<Fragment>
			<Create/>
			<ToolbarSeparator/>
			<PropTypesUI.oneOf label="edit shape" icon={<IconGeometry/>}
				values={[["Change Shape"],["Edit Points"]]}
				DropDown={({value:a})=><MenuItem primaryText={a[0]} onClick={a[1]}/>}
				onClick={false}
				/>	
			<ToolbarSeparator/>
			<Shape theme={{Shape:{Ribbon:{geometry:{},fill:{},outline:{}}}}}>

			</Shape>
			
			<SelectStyle type="frame">
				{({style,dispatch})=>(
					<Fragment>
						<PropTypesUI propTypes={dom.Frame.propTypes} props={style} theme="Frame"  onChange={frame=>dispatch(ACTION.Entity.UPDATE({frame}))}/>
						<ToolbarSeparator/>
					</Fragment>
				)}
			</SelectStyle>
			
			{children}
		</Fragment>
	)
})
const IconGeometry=props=>(
	<SvgIcon {...props}>
		<path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2z"/>
	</SvgIcon>
)