export default function mixin(renderChanged){
	this._renderChanged=renderChanged

	this.xml=this.file.officeDocument.content.xml.bind(this.file.officeDocument.content)
}
