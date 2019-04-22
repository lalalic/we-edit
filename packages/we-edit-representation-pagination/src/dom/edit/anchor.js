import React from "react"
import {ReactQuery} from "we-edit"
import {Cacheable} from "../../composable"
import editable from "./editable"
import Base from "../anchor"

export default Cacheable(class extends editable(Base){
	
})
