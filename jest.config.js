module.exports={
	modulePathIgnorePatterns:[require.resolve("./package.json"), "src/", "responsible/"],
	
	/**NOTE: don't change the map, otherwise debug/test doesn't work */
	moduleNameMapper:{
		"^we-edit(.*)/__tests__(.*)":`<rootDir>/packages/we-edit$1/__tests__$2`,
		"^we-edit(.*)/(.*)":`<rootDir>/packages/we-edit$1/src/$2`,
		"^we-edit(.*)":`<rootDir>/packages/we-edit$1/src`,
	},
}