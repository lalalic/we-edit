const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")

module.exports=(base, packages)=>{
	return {
		...base,
		entry:["./packages/we-edit-office/src/index.js"],
		devtool: 'source-map',
		resolve:{
			alias: packages.reduce((alias,p)=>(alias[p]=path.resolve(__dirname, `packages/${p}/src/`),alias),{})
		},
		plugins:[
			...base.plugins,
			new HtmlWebpackPlugin({
				title:"WEOffice"
			})
		],
		target:"electron-renderer",
	}
}
