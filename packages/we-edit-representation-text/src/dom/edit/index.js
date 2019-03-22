import React,{Fragment, Component} from "react"
import {dom} from "we-edit"
import {composable, editable} from "we-edit-representation-pagination"

import {Editors} from "we-edit-representation-html"
import Document from "./document"
import Paragraph from "./paragraph"
import Text from "./text"

const {HasParentAndChild}=composable

const wrapper=A=>editable(HasParentAndChild(A))

export default Object.keys(Editors)
	.reduce((TextEditors, k)=>{
		if(!TextEditors[k]){
			TextEditors[k]=wrapper(Editors[k])
		}
		return TextEditors
	},{
		Document,
		Section:Editors.Section,
		Paragraph,
		Text
	})
