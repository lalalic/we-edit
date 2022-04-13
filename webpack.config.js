const path = require('path');
const Visualizer=require("webpack-visualizer-plugin")
const packages=(function(){
	return require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
		.sort()
})();

module.exports=(env,args)=>{
	//const outputPath=args['output-path']||path.resolve(__dirname, 'dist')
	const base={
		entry:"./src/index.js",
		output:{
			filename:"[name].js",
			//path:outputPath
		},
		module:{
			noParse:/(font-service)/,
			rules:[
			{
				test: /.js?$/,
				use: 'source-map-loader',
				enforce:"pre",
				include: /(docx4js)/
			},{
				test: /\.js?$/,
				loader:'babel-loader',
				exclude: /(node_modules|tools\/jasmine)/,
				include: /(src|\.dev)/
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
					search:/\/\/\smap\s=\s\[\]/g,
					replace:`this.extendStructure(Directory,CmapSubtable);//`
				}
			},
			{
				test: /\.(png|jpe?g|gif|ttf|otf)$/i,
				loader:"file-loader",
				options:{
					name:'[name].[ext]',
					publicPath:(url,resourcePath)=>{
						const [,ctx]=resourcePath.split("/").reverse()
						return `www/${ctx}/${url}`
					},
					outputPath:(url,resourcePath)=>{
						const [,ctx]=resourcePath.split("/").reverse()
						return `www/${ctx}/${url}`
					},
				}
			},
			]
		},
		resolve:{
			symlinks:false,
		},
		plugins:[
			
		],
		node:{
			fs: "empty",
			stream: true,
		},
		mode:"production",
	}

	if(env){
		return require(`./webpack.${env}.js`)(base, packages, args)
	}

	return base
}
