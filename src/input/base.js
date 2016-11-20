import React, {Component, PropTypes} from "react"

import {uuid} from "../tools/uuid"

export default class{
	static support(){
		return false
	}

	load(){
		return Promise.resolve({})
	}

	createElement(type, props, children){
		let id=uuid()
		return React.createElement(type, {...props, id, key:id}, children)
	}
}
