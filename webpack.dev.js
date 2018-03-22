const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")

const alias=",channel-html,channel-pagination,channel-text,type-docx,type-json,office"
	.split(",")
	.reduce((alias,k)=>{
		let p=`we-edit${k.length ? `-${k}` : ''}`
		alias[p]=path.resolve(__dirname, `packages/${p}/src/`)
		return alias
	},{})

module.exports=(base)=>{
	return {
		...base,
		entry:["./packages/we-edit-office/src/index.js"],
		devtool: 'source-map',
		resolve:{alias},
		plugins:[
			...base.plugins,
			new HtmlWebpackPlugin()
		],
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port: 9091,
			host:"0.0.0.0",
			//disableHostCheck:true,
			inline:true,
			hot:false,
		}
	}
}
