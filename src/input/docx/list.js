import Model from './any'
import Style from "./style"


export default class extends Model{
    visit(){
        super.visit()
        const {contentProps:props}=this

        props.level=this.wordModel.getLevel()
        props.numId=this.wordModel.getNumberingId()

        return 
        let visitor=new Style(this.wordModel, this.doc)
        let style=this.wordModel.getNumberingStyle()
        style.parse([visitor])
        props.listStyle=visitor.style
    }
}
