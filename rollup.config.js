const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

export default {
  input: "packages/we-edit/src/index.js",
  output:{
	file: "packages/we-edit/cjs/index.production.js",  
	format: "cjs",
  },
  plugins: [
    resolve(),
    
    babel({
		babelrc:false,
		presets: [
			["env", {modules:false}],
			"react",
		],
		plugins:[
			"babel-plugin-external-helpers",
			"babel-plugin-add-module-exports",
			"babel-plugin-transform-object-rest-spread",
			"babel-plugin-transform-class-properties",
		]
	}),
	
	commonjs({
		include: 'node_modules/**',
		namedExports:{
			'node_modules/react/index.js': [
				'Component', 'PureComponent', 
				'Children', 'createElement'
			],
			'node_modules/prop-types/index.js':['default']
		}
	}),
  ]
}