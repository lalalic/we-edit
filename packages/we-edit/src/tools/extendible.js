export default function extendible(Type, Category, ProxiedProp){
    var supports={}
	
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

        supports[type]=New
        console.debug(`${Category}[${type}] installed`)
    }

    Type.uninstall=function(New){
        const type=New.defaultProps ? New.defaultProps.type : New.type
        if(supports[type]){
            delete supports[type]
            console.debug(`${Category}[${type}] uninstalled`)
        }
    }

    Type.get=function(type, notFoundMessage=false){
		let Typed=supports[type]
		if(notFoundMessage && !Typed){
			console.error(`${Category}[${type}] not supported`)
		}
		return Typed
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
