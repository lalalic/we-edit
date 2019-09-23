export default function extendible(Type, Category, ProxiedProp){
    var supports=new Map()
	
	Type.install=function(New, props){
		let defaultProps=New.defaultProps
		if(props){
			defaultProps={...defaultProps,...props}
		}
		
        const type=defaultProps.type
        if(New.support && !New.support()){
            console.log(`${Category}[${type}] discarded because of not supported environment`)
            return
        }
		
		New.defaultProps=defaultProps

        supports.set(type,New)
        console.debug(`${Category}[${type}] installed`)
    }

    Type.uninstall=function(New){
        const type=New.defaultProps ? New.defaultProps.type : New.type
        if(supports.has(type)){
            supports.delete(type)
            console.debug(`${Category}[${type}] uninstalled`)
        }
    }

    Type.get=function(type, notFoundMessage=false){
		let Typed=supports.get(type)
		if(notFoundMessage && !Typed){
			console.error(`${Category}[${type}] not supported`)
		}
		return Typed
    }
	
    Object.defineProperty(Type, "supports", {
		configurable:true,
		get(){
			return new Map(supports)
		}
	})	
	
	if(ProxiedProp){
		const proxy=new Proxy(supports, {
			get(o, prop){
				const type=prop[0].toLowerCase()+prop.substr(1)
				if(o.has(type)){
					return o.get(type)[ProxiedProp]
				}
				
				throw new Error()
			},
			set(){
				throw new Error()
			}
		})
		Object.defineProperty(Type, ProxiedProp, {
			configurable:true,
			value: proxy
		})
	}

    return Type
}
