const path = require('path');
const packages=(function(){
	let ps=require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
		.sort()
	return ps
})();

module.exports=(env,args)=>{
	const base={
		entry:"./src/index.js",
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist'),
		},
		module:{
			rules:[{
				test: /.js?$/,
				use: 'source-map-loader',
				enforce:"pre",
				include: /(docx4js)/
			},{
				test: /\.js?$/,
				use: ['babel-loader'],
				exclude: /(node_modules|tools\/jasmine)/,
				include: /src/
			},{
				test: /\.js?$/,
				use: ["transform-loader/cacheable?brfs"],
				enforce:"post",
				include: /(linebreak|unicode-properties|fontkit)/
			},{
				test:/\.(css|less)$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader'
				]
			},{
				test:/dom-serializer\/index\.js$/,
				loader:"string-replace-loader",
				options:{
					search:/function\s+formatAttrs\(/,
					replace:`
					function formatAttrs(attribs, opt){
						if(!attribs)
							return 
						let out=_formatAttrs(...arguments)
						if(globalThis.xxid && attribs.xxid){
							out+='xxid="'+attribs.xxid+'"'
						}
						return out
					}
					function _formatAttrs(`
				}
			},
			{
				test:/fontkit\/index\.js$/,
				loader:"string-replace-loader",
				options:{
					search:/\/\/\s+cmap\:\s+cmap/g,
					replace:`,cmap:this.cmap, `
				}
			},
			]
		},
		resolve:{
			symlinks:false,
		},
		plugins:[],
		node:{
			fs: "empty",
			stream: true,
		},
		stats:"errors-only",
		mode:"production",
	}

	if(env){
		return require(`./webpack.${env}.js`)(base, packages, args)
	}

	return base
}
