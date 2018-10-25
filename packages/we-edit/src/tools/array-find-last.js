if(!Array.prototype.findLast){
    Array.prototype.findLast=function(f){
		let len=this.length
        return Array.from(this).reverse().find(function(a,i,...others){
			return f(a,len-i-1,...others)
		})
    }
}
