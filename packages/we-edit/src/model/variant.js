import React, {Component,Fragment} from  "react"

export default "exp,if,for,script,sub".split(",")
	.reduce((s,k)=>{
		let name=`$${k}`
		s[name]=class extends Component{
			static displayName=name
			render(){
				return (
					<Fragment>
						{this.props.children}
					</Fragment>
				)
			}
		}
		return s
	},{})
