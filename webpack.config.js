const path = require('path');
const webpack = require("webpack");
const packages=(function(){
	let ps=require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
		.sort()
	ps.splice(ps.indexOf("we-edit-office"),1)
	ps.push("we-edit-office")
	return ps
})();

module.exports=env=>{
	const base={
		entry:"./src/index.js",
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist')
		},
		module:{
			rules:[{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre",
				include:/(docx4js|docx-template)/
			},{
				test: /\.js?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},{
				test: /\.js?$/,
				use: ["transform-loader/cacheable?brfs"],
				enforce:"post",
				include: /(linebreak)/
			},{
				test:/\.less?$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader'
				]
			}]
		},
		plugins:[],
		node:{
			fs: "empty"
		}
	}

	if(env){
		return require(`./webpack.${env}.js`)(base, packages)
	}

	return base
}
