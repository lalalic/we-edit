export default function extendible(Type, Category){
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

    Type.supports=function(){
        return Object.freeze({...supports})
    }

    Type.get=function(type){
		console.log("getting "+type)
        return supports[type]
    }

    return Type
}
