const path = require('path');
const webpack = require("webpack");

module.exports=env=>{
	const base={
		entry:"./src/index.js",
		output:{
			filename:"index.js",
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
		node:{
			fs: "empty"
		}
	}
	
	if(env){
		return require(`./webpack.${env}.js`)(base)
	}
	
	return base
}