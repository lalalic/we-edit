import Super from "./header"

export default class Footer extends Super{
    static displayName=`${
		(function(){
			let a=Super.displayName.split("-")
			a.splice(a.length-1,1,"footer")
			return a.join("-")
		})()
		}`

    onAllChildrenComposed(){
		this.context.parent.appendComposedFooter(this, this.props.type)
	}
}
