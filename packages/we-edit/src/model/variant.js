import React, {Component} from  "react"

export default "exp,if,for,script,sub".split(",")
	.reduce((s,k)=>{
		let name=`$${k}`
		s[name]=class extends Component{
			static displayName=name
			render(){
				return null
			}
		}
		return s
	},{})