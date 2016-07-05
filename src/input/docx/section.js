import Model from "./any"
import Style from "./style"

export default class extends Model{
	visit(){
		let style=this.wordModel.getDirectStyle()
		let visitor=new Style(this.wordModel, this.doc)
		style.parse([visitor])
		Object.assign(this.contentProps,visitor.style.section)
	}
}
