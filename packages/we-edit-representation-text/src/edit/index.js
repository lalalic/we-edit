import React,{Fragment, Component} from "react"
import {Editors} from "we-edit-representation-pagination"
import {HasParentAndChild, NoChild} from "we-edit-representation-pagination/composable"

import Document from "./document"
import Paragraph from "./paragraph"
import Text from "./text"

export default Object.keys(Editors)
	.reduce((TextEditors,k)=>{
		if(!TextEditors[k]){
			if(Editors[k].NoChild){
				TextEditors[k]=class extends NoChild(Component){
					render(){
						this.context.parent.on1ChildComposed(this)
						return null
					}
				}
			}else{
				TextEditors[k]=HasParentAndChild(Component)
			}
		}
		return TextEditors
	},{Document,Paragraph,Text})
