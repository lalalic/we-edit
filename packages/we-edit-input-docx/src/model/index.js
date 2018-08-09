import {PureComponent as Component} from "react"
import Document from "./document"
import Section from "./section"

import Paragraph from "./paragraph"
import Text from "./text"
import Run from "./run"

import Table from "./table"
import Row from "./row"
import Cell from "./cell"

import Wrapper from "./wrapper"
import Anchor from "./anchor"

const createUnvisibleComponent=type=>{
	return class extends Component{
		static displayName=`${type}`
		render(){
			return null
		}
	}
}

export default {
	Document, Section, 
	Paragraph,
	Text,
	Run,
	Cell,
	Row,
	Table,
	Wrapper,
	Anchor,
	Styles:()=>createUnvisibleComponent("styles"),
	Style:()=>createUnvisibleComponent("style"),
}
