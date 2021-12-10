import Component from "./component"


export default class Image extends Component{
	static displayName="image"
	static propTypes={
		width: this.UnitShape.isRequired,
		height: this.UnitShape.isRequired,
		src: this.BlobShape,
		outline: this.LineShape,
		fill: this.FillShape,
	}

	static defaultProps={
		width:1,
		height:1
	}
}
