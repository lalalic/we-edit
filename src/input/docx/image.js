import Model from "./any"

export default class extends Model{
    visit(){
        this.contentProps.src=`data:image/jpg;base64,${new Buffer(this.wordModel.getImage()).toString('base64')}`
		super.visit()
    }
}
