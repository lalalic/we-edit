var path = require('path');
var webpack = require("webpack");

module.exports={
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
			test: /.js?$/,
			use: ['babel-loader'],
			exclude: /node_modules/,
		}]
	},
	node:{
		fs: "empty"
	},
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9091
	}
}