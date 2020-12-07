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
import Inline from "./draw-inline"
import Hyperlink from "./hyperlink"
import {SimpleField as Field, FieldBegin, FieldEnd, InstrText} from "./field"
import {BookmarkBegin, BookmarkEnd} from "./bookmark"
import ToC from "./toc"

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
	Inline,
	Hyperlink,
	Field,FieldBegin,FieldEnd,InstrText,
	BookmarkBegin, BookmarkEnd,
	ToC,
	Header:(...args)=>HeaderFooter(...args, "header"),
	Footer:(...args)=>HeaderFooter(...args, "footer"),
	Styles:()=>createUnvisibleComponent("styles"),
	Style:()=>createUnvisibleComponent("style"),
}
