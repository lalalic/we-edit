const path=require("path")
const nodeExternals=require("webpack-node-externals")
const {ContextReplacementPlugin, DefinePlugin, IgnorePlugin} = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports=base=>{
    return require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit-") && a!="we-edit-office")
        .map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`index.js`,
    			path:path.resolve(__dirname, `packages/${a}`)
    		},
			plugins:[
				new DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('production')
				}),
				...base.plugins
			],
            externals:"react,react-dom,material-ui,prop-types,we-edit,react-redux,recompose"
				.split(",")
				.reduce((cols,a)=>{
					cols[a]="commonjs2 "+a
					return cols
				},{})
        }))
}
