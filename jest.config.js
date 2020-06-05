module.exports={
	modulePathIgnorePatterns:[require.resolve("./package.json"), "src/", "responsible/"],
	moduleNameMapper:{
		"^we-edit/__tests__(.*)":`<rootDir>/packages/we-edit/__tests__$1`,
		"^we-edit(.*)":`<rootDir>/packages/we-edit$1/src`,
	}
}
