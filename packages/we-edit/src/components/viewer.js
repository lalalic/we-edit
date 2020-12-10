import Editor from "./editor"

export class Viewer extends Editor{
	static displayName="viewer"
	static defaultProps={
		...super.defaultProps,
		editable:{
			cursor:false
		},
	}
}

export default Viewer