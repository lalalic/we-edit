import html from "we-edit-representation-html"
import pagination from "we-edit-representation-pagination"
import text from "we-edit-representation-text"

import iDocx from "we-edit-input-docx"
import iJson from "we-edit-input-json"
import ioFile from "we-edit-loader-stream-file"
import ioBrowser from "we-edit-loader-stream-browser"
import SVG from "we-edit-output-svg"
import PDF from "we-edit-output-pdf"

import Variant from "we-edit-variant"


iDocx.install({
	template:"/templates/normal.docx"
})
iJson.install()
ioFile.install()
ioBrowser.install()
SVG.install()
PDF.install()

Variant.install()


import React,{PureComponent} from "react"
import PropTypes from "prop-types"
import {Editor, DocumentTree} from  "we-edit"
import {Office,Workspace, Ribbon} from "we-edit-office"
import {Tabs, Tab} from "material-ui"

function testOffice(){
	const KEY="test"
	
	const myWorksapce=(
		<Workspace
			debug={true}
			accept="*"
			key={KEY}
			toolBar={<Ribbon.Ribbon commands={{layout:false}}/>}
			reducer={(state={assemble:false, data:null},{type,payload})=>{
				return state
			}}
			>
			<Workspace.Desk
				layout={
					<Workspace.Layout 
						right={
							<div style={{width:200}}>
								<Tabs>
									<Tab label="Document">
										<DocumentTree filter="$*"/>
									</Tab>
									<Tab label="Assemble">
										<center>
											<input type="file" accept=".json" onChange={({target})=>{
												let file=target.files[0]
												if(!file)
													return 
												let reader=new FileReader()
												reader.onload=e=>{
													assembleData(eval(`(a=>a)(${e.target.result})`))
												}
												reader.readAsText(file)
												target.value=""
											}}/>
										</center>
									</Tab>
								</Tabs>
							</div>
						}
						/>
				}
				children={<Editor representation="pagination"/>}
				/>
		</Workspace>
	)
	
	Office.install(myWorksapce)
}


testOffice()