const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports=(base, packages)=>{
	return {
		...base,
		entry: ["./.dev.js","./packages/we-edit-office/src/index.js"],
		devtool: 'source-map',
		mode:"development",
		resolve:{
			alias: packages.reduce((alias,p)=>(alias[p]=path.resolve(__dirname, `packages/${p}/src/`),alias),{})
		},
		plugins:[
			...base.plugins,
			new HtmlWebpackPlugin({
				title:"test"
			})
		],
		devServer:{
			contentBase: [`${__dirname}/dist`,`${__dirname}/packages/we-edit-representation-pagination/src/fonts`],
			compress: true,
			port: 9091,
			host:"0.0.0.0",
			inline:true,
			hot:false
		},
		watchOptions:{
			ignored: /node_modules\/(?!docx4js)/
		}
	}
}
