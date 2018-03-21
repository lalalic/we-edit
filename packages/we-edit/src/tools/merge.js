export default function merge(keys,...sources){
	return keys.reduce((props,key)=>{
			props[key]=sources.reduce((value,source)=>{
				if(typeof(value)!=="undefined")
					return value
				return source[key]
			},undefined)
			return props
		},{})
}