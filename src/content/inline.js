import React from "react"
import Any from "./any"

export default class Inline extends Any{
    static displayName="inline"
	render(){
		return <span>{this.getContent()}</span>
	}
}
