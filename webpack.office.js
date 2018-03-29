const path = require('path')
const webpack = require('webpack')
const FileManager = require("filemanager-webpack-plugin")

module.exports=(base, packages, args)=>{
	const p="we-edit-office"
	let root=`node_modules/${p}`
	let entry=`./${root}/index.js`	
	return {
		...base,
		entry,
		output:{
			filename:`index.all.js`,
			path: path.resolve(`${__dirname}/${root}`),
			library:p,
			libraryTarget:"window",
			pathinfo:true,
		},
		plugins:[
			new FileManager({
				onEnd:{
					copy:[
						{
							source:`${path.resolve(`${__dirname}/${root}`)}/index.all.js`,
							destination: './dist'
						}
					]
				}
			}),
			...base.plugins
		],
		externals:[],
		
	}
}




