const importAll = require =>{
    return require.keys().reduce((acc, next) => {
        acc.push(require(next).default)
        return acc;
    }, []);
}

export default importAll(require.context("./", false, /\.(png)$/))