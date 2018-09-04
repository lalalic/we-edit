import React,{Fragment, Component} from "react"
import {models} from "we-edit"
import {composable, recomposable} from "we-edit-representation-pagination"

import {Editors} from "we-edit-representation-html"
import Document from "./document"
import Section from "./section"
import Paragraph from "./paragraph"
import Text from "./text"

const {HasParentAndChild}=composable

const wrapper=A=>recomposable(HasParentAndChild(A))

export default Object.keys(Editors)
	.reduce((TextEditors, k)=>{
		if(!TextEditors[k]){
			TextEditors[k]=wrapper(Editors[k])
		}
		return TextEditors
	},{
		Document,
		Section,
		Paragraph,
		Text
	})
