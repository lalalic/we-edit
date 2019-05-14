const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports=(base, packages)=>{
	return {
		...base,
		entry:
		//"./packages/we-edit-representation-pagination/.dev.js",
		["./.dev.js","./packages/we-edit-office/src/index.js"],
		module:{
			rules:[{
					test: /\.dev\.js?$/,
					use: ['babel-loader'],
				},
				...base.module.rules
			]
		},
		devtool: 'source-map',
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
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port: 9091,
			host:"0.0.0.0",
			//disableHostCheck:true,
			inline:true,
			hot:false,
			before(app){
				app.get("/font-service.js", (req,res)=>{
					res.set({ 'Content-Type': 'application/javascript; charset=utf-8' });
                	res.send(require("fs").readFileSync(path.join(__dirname, 'packages/we-edit-representation-pagination/src/fonts/font-service.js')));
				})
			},
		}
	}
}
