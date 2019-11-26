//export default 
class ProxyArray extends Array{
    constructor(){
        super()
    }
}


export default class ColumnChildren{
    constructor(frame,startIndex=frame.computed.composed.length){
		this.frame=frame
        this.startIndex=startIndex
    }
    
    static create(){
        return new Proxy(new ColumnChildren(...arguments),{
            get(obj, prop){
                switch(prop){
                case Symbol.isConcatSpreadable:
                    return true 
                case "target":
                    return obj
                default:
                    if(prop in obj)
                        return obj[prop]
                    const items=obj.items
                    if(prop in items){
                        const f=items[prop]
                        if(typeof(f)=="function"){
                            return f.bind(items)
                        }
                        return f
                    }
                    return ()=>obj.unsupport(`not supported ColumnChildren[${prop}]`)
                }
            }
        })
    }

	get endIndex(){
		const {composed}=this.frame.computed
		const columns=this.frame.columns
		const i=columns.findIndex(a=>a.children.target==this)
		const nextColumn=columns[i+1]
		return nextColumn ? nextColumn.startIndex : composed.length
    }
    
    get items(){
        return this.frame.computed.composed.slice(this.startIndex,this.endIndex)
    }

    get length(){
        return this.endIndex-this.startIndex
    }

    unsupport(msg){
        console.error(msg)
    }

    push(){
		this.frame.computed.composed.splice(this.endIndex,0,...arguments)
    }
    
    splice(i,j,...as){
        if(i<0){
            return  this.frame.computed.composed.splice(this.endIndex+i,j,...as)
        }else{
            return this.frame.computed.composed.splice(this.startIndex+i,j,...as)
        }
    }

 /*   
	reduce(){
		return this.items.reduce(...arguments)
	}
	
	map(){
		return this.items.map(...arguments)
	}

	forEach(){
		return this.items.forEach(...arguments)
    }
    
    includes(){
        return this.items.includes(...arguments)
    }

    indexOf(){
        return this.items.indexOf(...arguments)
    }

    slice(){
        return this.items.slice(...arguments)
    }
    */
}