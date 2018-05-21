const path=require("path")
const nodeExternals=require("webpack-node-externals")

module.exports=base=>{
    return require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit"))
        .map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`${a.substr("we-edit".length+1)||"index"}.js`,
    			path:path.resolve(__dirname, 'packages/we-edit'),
                libraryTarget:"commonjs2"
    		},
            target:"node",
            externals:[nodeExternals()]
        }))
}
