const path = require('path');

module.exports=(base)=>{
	return {
		...base,
		entry:["./test.js"],
		devtool: 'source-map',
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