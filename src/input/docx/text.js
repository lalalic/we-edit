import Model from "./any"
import React from "react"

export default class extends Model{
    visit(){
        this.children=this.wordModel.getText()
		super.visit()
    }

    createReactElement(namespace){
        return React.createElement(
			namespace[this.type],
			this.contentProps,
			this.children)
    }
	
	toTag(){
		return `<Text>${this.children}</Text>`
	}
}
