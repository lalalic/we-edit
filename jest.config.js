module.exports={
	modulePathIgnorePatterns:[require.resolve("./package.json")],
	moduleNameMapper:{
		"^we-edit(.*)":`<rootDir>/packages/we-edit$1/src`,
	}
}
