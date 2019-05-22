import Content from "./content"
var clipboard
export default class extends Content{
	move(dest){
		const cloned=this.clone(true)
		this.insert(cloned, dest)
        return this
	}

	cut(e){
		e.preventDefault()
		clipboard=this.clone()
		this.remove()
		e.preventDefault()
        return this
	}

	copy(e){
		e.preventDefault()
		clipboard=this.clone()
        return this
	}

	paste(e){
		const data=clipboard||e.clipboardData.getData("text")
		if(data){
			e.preventDefault()
			this.insert({data})
		}
		return  this
	}
}
