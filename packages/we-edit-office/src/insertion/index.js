import React, {Component,Fragment} from "react"

import {ToolbarGroup,ToolbarSeparator as ToolbarSeparator0,} from "material-ui"
import SizeIconButton from "../components/size-icon-button"

import IconLink from "material-ui/svg-icons/editor/insert-emoticon"
import IconReference from "material-ui/svg-icons/editor/insert-emoticon"
import IconBookmark from "material-ui/svg-icons/editor/insert-emoticon"
import IconVideo from "material-ui/svg-icons/editor/insert-emoticon"
import IconComment from "material-ui/svg-icons/editor/insert-emoticon"

import IconHeader from "material-ui/svg-icons/editor/insert-emoticon"
import IconFooter from "material-ui/svg-icons/editor/insert-emoticon"
import IconPageNO from "material-ui/svg-icons/editor/insert-emoticon"

const ToolbarSeparator=props=><ToolbarSeparator0 style={{marginRight:2, marginLeft:2}} {...props}/>

export default class extends Component{
	render(){
		return (	
			<ToolbarGroup>
				<SizeIconButton>
					<IconLink/>
				</SizeIconButton>
				
				<SizeIconButton>
					<IconReference/>
				</SizeIconButton>
				
				<SizeIconButton>
					<IconBookmark/>
				</SizeIconButton>
				
				<ToolbarSeparator/>
				
				<SizeIconButton>
					<IconVideo/>
				</SizeIconButton>
				
				<SizeIconButton>
					<IconComment/>
				</SizeIconButton>
				
				<ToolbarSeparator/>
				
				<SizeIconButton>
					<IconHeader/>
				</SizeIconButton>
				
				<SizeIconButton>
					<IconFooter/>
				</SizeIconButton>
				
				<SizeIconButton>
					<IconPageNO/>
				</SizeIconButton>
			</ToolbarGroup>
		)
	}	
}