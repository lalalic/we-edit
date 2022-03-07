/**
 * It's to make type checker function with metadata to generate UI
 * Each validator has $ to extend itself
 */
import React from "react"
function asType($type,base){
    if(typeof($type)=="string")
		return `${base}(${$type})`
	if(!!$type)
		return $type
	return base
}

function $({$type,$validator,...props}={}, base){
    const {Type, isRequired}=this
    $validator=$validator||this
    const cloned=(...args)=>$validator(...args)
    cloned.isRequired=(...args)=>isRequired(...args);
    ["is","equal","normalize","normalizeAll","denormalize","canShorten","deprecision","default","$extend"].forEach(k=>{
        if(k in props){
            cloned.isRequired[k]=cloned[k]=props[k]
            delete props[k]
        }
    });
    cloned.Type=React.createElement(asType($type, Type?.type||base),{...Type?.props, ...props})
    cloned.isRequired.Type=React.cloneElement(cloned.Type,{required:true})
    cloned.$=cloned.isRequired.$=$
    return cloned
}


export default function memorize(PropTypes){
    ["string","number","bool"].forEach(k=>{
        const fn=PropTypes[k]
        fn.Type=React.createElement(k)
        fn.isRequired.Type=React.cloneElement(fn.Type,{required:true})
        fn.$=fn.isRequired.$=$
    })

    const oneOf=PropTypes.oneOf=(factory=>(values, props)=>{
        return $.call(factory(values), {...props,values},'oneOf')
    })(PropTypes.oneOf)

    const shape=PropTypes.shape=(factory=>(model, props)=>{
        return $.call(factory(model), {
            $extend(ex){
                return shape({...model,...ex}, props)
            },
            normalize(value){
                if(!value)
                    return value
                return Object.keys(value).reduce((normalized,key)=>{
                    if(model[key]?.normalize){
                        normalized[key]=model[key].normalize(value[key])
                    }
                    return normalized
                },{...value})
            },
            denormalize(value, normalized){
                Object.keys(value).forEach(key=>{
                    if(model[key]?.denormalize){
                        normalized[key]=model[key].denormalize(value[key],normalized[key])
                    }
                    return normalized
                })
                return normalized
            },
            equal(a,b){
                if(a && b){
                    a=this.normalize(a)
                    b=this.normalize(b)
                    return !!!Object.keys(model).find(k=>{
                        const {equal=(a,b)=>a===b}=model[k]
                        return !equal.call(model[k], a[k],b[k])
                    })
                }
                return false
            },
            deprecision(props,precision){
                return Object.keys(props).reduce((deprecisioned,key)=>{
                    if(props[key] && model[key]?.deprecision){
                        deprecisioned[key]=model[key].deprecision(props[key],precision)
                    }
                    return deprecisioned
                },{...props})
            },
            ...props, 
            schema:model,
        },'shape')
    })(PropTypes.shape)

    const oneOfType=PropTypes.oneOfType=(factory=>(types, {$shape, ...props}={})=>{
        if(typeof($shape)=="function"){
            props.$choice=value=>$$shape(value)?.Type.props.choice
        }

        const $$shape=value=>{
            let i=$shape||types.length-1
            if(typeof($shape)=="function"){
                i=$shape(value)
            }
            return types.find((a,k)=>i===a || i===k || a.Type?.props.choice===i)
        }


        const validator=$.call(factory(types),{
            deprecision(value,prec){
                const type=$$shape(value)
                if(type?.deprecision)
                    return type.deprecision(value,prec)
                return value
            },
            equal(a,b){
                a=this.normalize(a)
                b=this.normalize(b)
                return $$shape(a||b)?.equal?.(a,b)
            },
            normalize(value){
                const type=$$shape(value)
                if(type?.normalize){
                    return type.normalize(value)
                }
                return value
            },
            denormalize(value,normalized){
                const type=$$shape(normalized)
                if(type?.denormalize){
                    return type.denormalize(value,normalized)
                }
                return normalized
            },
            ...props,
            types
        },'oneOfType')

        validator.$shape=validator.isRequired.$shape=$$shape()
        return validator
    })(PropTypes.oneOfType)

    const arrayOf=PropTypes.arrayOf=(factory=>(type, props)=>{
        return $.call(factory(type),{
            normalize(value){
                return value.map(a=>type.normalize(a))
            },
            denormalize(value,normalized){
                return normalized.map(a=>type.denormalize(value[0],a))
            },
            deprecision(value, precision){
                return value.map(a=>type.deprecision(a, precision))
            },
            ...props,
            type
        },'arrayOf')
    })(PropTypes.arrayOf)

    const {number, string, bool }=PropTypes
    return {number, string, bool, shape, oneOf, oneOfType, arrayOf}
}


