const path = require('path')
const webpack = require('webpack')
const FileManager = require("filemanager-webpack-plugin")

module.exports=(base, packages, args)=>{
	return packages.reduce((builds, p)=>{
			let root=`packages/${p}`
			let entry=`./${root}/src/index.js`
			let {dependencies={}, peerDependencies={}}=require(`./${root}/package.json`)
			let externals=Object.keys(dependencies).concat(Object.keys(peerDependencies))
			
			let umd={
				...base,
				entry,
				output:{
					filename:`index.browser.js`,
					path: path.resolve(`${__dirname}/${root}`),
					library:p,
					libraryTarget:"window",
					pathinfo:true,
				},
				externals:Object.keys(peerDependencies).reduce((exs,k)=>{
					switch(k){
						case "react":
							exs.react="React"
						break
						default:
							exs[k]=k
					}
					return exs
				},{}),
				plugins:[
					new FileManager({
						onStart:{
							"delete":[`./${root}/index.browser.js`],
						}
					}), 
					...base.plugins
				]
			}
			
			builds.splice(builds.length,0, umd)
			return builds
		}, [])
}
