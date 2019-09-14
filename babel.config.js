module.exports={
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react",
    ],
    "plugins": [
      ["@babel/plugin-transform-spread",{loose:true}],
      "@babel/plugin-proposal-object-rest-spread",
		  "@babel/plugin-proposal-class-properties",
    ]
} 