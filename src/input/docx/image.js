import Model from "./any"

export default class extends Model{
    visit(){
        let blob=this.wordModel.getImage();
        this.props.src=URL.createObjectURL(new Blob(blob),{type:"image/*"})
        this.props.width=200
        this.props.height=200
    }
}
