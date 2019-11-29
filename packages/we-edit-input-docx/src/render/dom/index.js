import {PureComponent as Component} from "react"
import Document from "./document"
import Section from "./section"

import Paragraph from "./paragraph"
import Text from "./text"
import Run from "./run"

import Table from "./table"
import Row from "./row"
import Cell from "./cell"
import Image from "./image"
import Shape from "./shape"
import Anchor from "./anchor"
import HeaderFooter from "./header-footer"

const createUnvisibleComponent=type=>{
	return class __$1 extends Component{
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
	Image,
	Shape,
	Anchor,
	HeaderFooter,
	Styles:()=>createUnvisibleComponent("styles"),
	Style:()=>createUnvisibleComponent("style"),
}
