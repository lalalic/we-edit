import React,{Fragment} from "react"
import {withContext} from "recompose"

const provider=(A,Default={})=>withContext(A.contextTypes,({context})=>({...Default,...context}))(({children})=><Fragment>{children}</Fragment>)

export default provider

xit("",()=>{})