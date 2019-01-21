import React,{Fragment,PureComponent} from "react"

import {connect,ACTION,ReactQuery} from "we-edit"
import editable from "./editable"
import {Cacheable} from "../composable"
import Base from "../table"


export default Cacheable(class extends editable(Base){
	appendLastComposed(){
		return false
	}
})
