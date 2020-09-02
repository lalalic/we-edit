
/**
 * it's to make sequential render, check hasChildren.render
 * It's a KEY for whole composable 
 * ****every customized render should use this component as last one***
 */
export default Object.assign(({host})=>(host.onAllChildrenComposed()||null),{displayName:"__ComposedAllTrigger"})
