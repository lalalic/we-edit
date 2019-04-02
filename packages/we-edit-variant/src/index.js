import React from "react"
import {Representation} from "we-edit"

import Provider from "./variant-provider"

import * as variants from "./dom"

export function withVariant(Components={}){
	let Variants=Object.keys(variants).reduce((transformed,k)=>{
			transformed[k]=variants[k](Components)
			return transformed
		},{})
	return {...Components,...Variants}
}


export const VariantRepresentation=({variants, transformer=a=>a, ...props})=>(
	<Provider value={variants}>
		<Representation {...props} transformer={a=> a && withVariant(transformer(a))}/>
	</Provider>
)

export {Provider}

export default {
	install(){
		Representation.defaultProps.transformer=withVariant
	},
	uninstall(){
		Representation.defaultProps.transformer=undefined
	},
	Provider,
	VariantRepresentation,
	withVariant
}
