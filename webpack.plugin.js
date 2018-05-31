const path=require("path")
const nodeExternals=require("webpack-node-externals")

module.exports=base=>{
    return require("fs")
		.readdirSync("./packages")
		.filter(a=>a.startsWith("we-edit-") && a!="we-edit-office")
        .map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`index.js`,
    			path:path.resolve(__dirname, `packages/${a}`),
    		},
            externals:"react,react-dom,material-ui,prop-types,we-edit,react-redux,recompose"
				.split(",")
				.reduce((cols,a)=>{
					cols[a]="commonjs "+a
					return cols
				},{})
        }))
}

