import Model from './any'

export default class extends Model{
	visit(){
		const {sum, cols}=this.wordModel.getColWidth()
		Object.assign(this.contentProps,{cols, width:sum})
	}
}
