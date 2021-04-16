import React from "react"
import {Editor} from "we-edit"
import IconPrint from "material-ui/svg-icons/action/view-module"
import IconWeb from "material-ui/svg-icons/editor/format-align-justify"
import IconText from "material-ui/svg-icons/content/text-format"

import Workspace from "../workspace"
import Ribbon,{} from "../ribbon"



export default (
    <Workspace
			accept={
				function({props:{supportPagination},name}){
					return supportPagination
				}
			}
			key="default(accept=[supportPagination])"
			channel="print"

			layout={
				<Workspace.Layout right={<Workspace.PanelContainer name="right" style={{width:300}}/>}
					/>
			}
			>

			<Workspace.Desk
				channel="print"
				icon={<IconPrint/>}
				children={<Editor representation="pagination"/>}
				/>


			<Workspace.Desk
				channel="web"
				ruler={{vertical:false}}
				icon={<IconWeb/>}
				children={<Editor representation="html"/>}
				/>

			<Workspace.Desk
				channel="plain text"
				ruler={false}
				toolBar={
					<Ribbon commands={{
						home:{
							text:false,
							paragraph:false
						},
						insert:false,layout:false,when:false,
					}}>
						
					</Ribbon>
				}
				icon={<IconText/>}
				children={<Editor representation="text"/>}
				/>
		</Workspace>
)