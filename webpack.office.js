const path = require('path')
const webpack = require('webpack')
const FileManager = require("filemanager-webpack-plugin")

class PrintChunksPlugin{
	apply(compiler) {
		compiler.plugin('compilation', function(compilation, params) {
			compilation.plugin('after-optimize-chunk-assets', function(chunks) {
				chunks.map(function(c) {
					console.log(c.name)
					console.log(
						c.modules.map((m)=>m.request)
							.filter(a=>!!a)
							.map(a=>a.split(/we-edit[\\\/]/g).pop().split(/[\\\/]/g).join("/"))
							.filter(a=>-1!=a.indexOf("we-edit"))
					)
				})
			});
		});
	}
}

module.exports=(base, packages, args)=>{
	const p="we-edit-office"
	let root=`node_modules/${p}`
	let entry=`./${root}/index.js`	
	let a={
		...base,
		entry,
		resolve:{
			...base.resolve,
			symlinks:false,
		},
		output:{
			filename:`index.all.js`,
			path: path.resolve(`${__dirname}/${root}`),
			library:p,
			libraryTarget:"window",
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
			new PrintChunksPlugin(),
			...base.plugins
		],
		externals:[],
		
	}
	return a
}




