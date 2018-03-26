const path = require('path')
const webpack = require('webpack')
const FileManager = require("filemanager-webpack-plugin")

module.exports=(base, packages, args)=>{
	let buildType=args.p ? "production" : "development"
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
					filename:`index.${buildType}.js`,
					path: path.resolve(`${__dirname}/${root}`, 'cjs'),
					library:p,
					libraryTarget:"commonjs",
				},
				externals,
				plugins:[new FileManager({
					onStart:{
						"delete":[`./${root}/cjs/*${buildType}*`],
						mkdir:[`./${root}/cjs`]
					}
				}), ...base.plugins],
				dependencies:buildDependencies
			}
			
			let umd={
				...base,
				entry,
				output:{
					filename:`index.${buildType}.js`,
					path: path.resolve(`${__dirname}/${root}`, 'umd'),
					library:p,
					libraryTarget:"umd",
				},
				externals:Object.keys(peerDependencies),
				plugins:[new FileManager({
					onStart:{
						"delete":[`./${root}/umd/*${buildType}*`],
						mkdir:[`./${root}/umd`]
					}
				}), ...base.plugins],
				dependencies:buildDependencies
			}
			
			builds.splice(builds.length,0,cjs, umd)
			return builds
		}, [])
	let office=configs.pop()
	office.plugins.push(new FileManager({
		onEnd:{
			copy:[
				{
					source:`${office.output.path}/${office.output.filename}`,
					destination: './dist'
				}
			]
		}
	}))
	office.externals=undefined
	configs.push(office)
	return configs
}
