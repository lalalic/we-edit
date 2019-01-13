import {PureComponent as Component} from "react"
import Document from "./document"
import Section from "./section"

import Paragraph from "./paragraph"
import Text from "./text"
import Run from "./run"

import Table from "./table"
import Row from "./row"
import Cell from "./cell"

const createUnvisibleComponent=type=>{
	return class extends Component{
		static displayName=`${type}`
		render(){
			return null
		}
	}
}

export default {
	Document,
	Section,
	Paragraph,
	Text,
	Run,
	Cell,
	Row,
	Table,
	Styles:()=>createUnvisibleComponent("styles"),
	Style:()=>createUnvisibleComponent("style"),
}
