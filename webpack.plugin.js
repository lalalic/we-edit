module.exports=base=>{
    return "input-docx,input-json,variant".split(",")
		.map(a=>`we-edit-${a}`)
		.map(a=>({
            ...base,
            entry:`./packages/${a}/src/index.js`,
    		output:{
    			filename:`index.js`,
				path:`${__dirname}/packages/${a}`
			},
			devtool:"source-map",
			
            externals:"react,react-dom,material-ui,prop-types,we-edit,react-redux,recompose,stream, readable-stream"
				.split(",")
				.reduce((cols,a)=>{
					cols[a]="commonjs2 "+a
					return cols
				},{})
        }))
}
