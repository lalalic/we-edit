import React, {PureComponent} from "react"
import {Emitter, Stream} from "we-edit"
const {Format}=Emitter

export default class extends PureComponent{
	render(){
		const {doc}=this.props
		return (
			<doc.Store readonly={true} release={false}>
				<Emitter>
					<Stream type="browser" target="_blank">
						<Format type="pdf"/>
					</Stream>
				</Emitter>
			</doc.Store>
		)
	}
	
	componentDidMount(){
		this.props.onPrint()
	}
}