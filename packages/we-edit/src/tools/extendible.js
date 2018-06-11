export default function extendible(Type, Category, ProxiedProp){
    const supports={}

    Type.install=function(New){
        const type=New.defaultProps.type
        if(New.support && !New.support()){
            console.log(`${Category}[${type}] discarded because of not supported environment`)
            return
        }

        if(!supports[type]){
            supports[type]=New
            console.log(`${Category}[${type}] installed`)
        }
    }

    Type.uninstall=function(New){
        const type=New.defaultProps.type
        if(supports[type]){
            delete supports[type]
            console.log(`${Category}[${type}] uninstalled`)
        }
    }

    Type.get=function(type){
		return supports[type]
    }
	
    Object.defineProperty(Type, "supports", {
		configurable:true,
		get(){
			return Object.freeze({...supports})
		}
	})	
	
	if(ProxiedProp){
		let proxy=new Proxy(supports, {
			get(o, prop){
				let name=prop[0].toLowerCase()+prop.substr(1)
				if(o[name]){
					return o[name][ProxiedProp]
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
