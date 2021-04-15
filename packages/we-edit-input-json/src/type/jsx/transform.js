import * as babel from '@babel/core'
import props from "@babel/plugin-proposal-class-properties"
import jsx from "@babel/plugin-transform-react-jsx"

export function transform(src,options={}){
    const {code}=babel.transform(src,{
        ...options,
        ast:false,
        babelrc:false,
        sourceType:"module",
        sourceMaps:"inline",
        plugins:[
            jsx,
            props,
        ]
    })
    const i=code.lastIndexOf("//#")
    const k=code.indexOf('=', i)
    return {code:code.substring(0,i),map:code.substring(k+1)}
}