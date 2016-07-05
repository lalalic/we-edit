import Model from "./any"

export default class extends Model{
    visit(){
        let blob=this.wordModel.getImage();
        this.contentProps.src=URL.createObjectURL(new Blob(blob),{type:"image/*"})
        this.contentProps.width=200
        this.contentProps.height=200
		super.visit()
    }
}
