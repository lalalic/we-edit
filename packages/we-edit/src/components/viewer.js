import Editor from "./editor"

export class Viewer extends Editor{
	static displayName="viewer"
	static defaultProps={
		...Editor.defaultProps,
		editable:{
			cursor:false
		},
	}
}

export default Viewer