const path = require('path')
const webpack = require('webpack')
const FileManager = require("filemanager-webpack-plugin")
class CleanMessage{
	apply(compiler){
		compiler.plugin("done",function({startTime, endTime, compilation:{
				options:{entry}, 
				outputOptions:{filename,path:root}
			}}){
			//root=root.split(/[\\\/]/g).slice(-1).join("/")
			//console.log(`	${root}/${filename}\r\n`)
		})
	}
}

module.exports=(base, packages, args)=>{
	let configs=packages.reduce((builds, p)=>{
			let root=`packages/${p}`
			let entry=`./${root}/src/index.js`
			let {dependencies={}, peerDependencies={}}=require(`./${root}/package.json`)
			let externals=Object.keys(dependencies).concat(Object.keys(peerDependencies))
			let buildDependencies=externals.filter(a=>packages.includes(a))
			let cjs={
				...base,
				entry,
				name:p,
				output:{
					filename:`index.js`,
					path: path.resolve(`${__dirname}/${root}`),
					library:p,
					libraryTarget:"commonjs2",
				},
				externals,
				plugins:[
					new CleanMessage(),
					new FileManager({
						onStart:{
							"delete":[`./${root}/index.js`],
						}
					}), 
					...base.plugins
				],
				dependencies:buildDependencies
			}
			
			let umd={
				...base,
				entry,
				output:{
					filename:`index.browser.js`,
					path: path.resolve(`${__dirname}/${root}`),
					library:p,
					libraryTarget:"window",
				},
				externals:Object.keys(peerDependencies),
				plugins:[
					new CleanMessage(),
					new FileManager({
						onStart:{
							"delete":[`./${root}/index.browser.js`],
						}
					}), 
					...base.plugins
				],
				dependencies:buildDependencies
			}
			
			builds.splice(builds.length,0,cjs, umd)
			return builds
		}, [])
	return configs
}
