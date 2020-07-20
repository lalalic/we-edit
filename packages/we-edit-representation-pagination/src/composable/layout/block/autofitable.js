import Balanceable from "./balanceable"

export default class Autofitable extends Balanceable{
    defineProperties() {
		super.defineProperties()
		Object.defineProperties(this,{
			autofitable:{
				get(){
                    const {shouldAutofitDown, shouldAutofitUp, autofitDown, autofitUp}=this
					return shouldAutofitDown && shouldAutofitUp && autofitDown && autofitUp
				}
			}
		})
    }
    
    onAllChildrenComposed(){
        super.onAllChildrenComposed()
        if(this.autofitable){
            if(this.balanceable){
                //after balance
            }else{
                if(this.shouldAutofitDown()){
                    this.autofitDown()
                }else if(this.shouldAutofitUp()){
                    this.autofitUp()
                }
            }
        }else{
            super.onAllChildrenComposed()
        }
    }


    __replaceComposedWithAutofitLayouted(layout){
        this.state.computed=layout.state.computed
    }

    balance(){
        super.balance()
        if(this.autofitable){
            if(this.shouldAutfitDown()){
                this.autofitDown()
            }else if(this.shouldAutofitUp()){
                this.autofitUp()
            }
        }
    }

	/**
	 * to layout children with changed context
	 * @param {*} context 
	 */
	__layoutAutofitContent(context){
		const composers=new Map()
	    const mount=a=>{
            if(!a.props.___nomount){
                composers.set(a.props.id,a)
            }
        }
		const unmount=a=>{
            if(composers.get(a.props.id)==a){
                composers.delete(a.props.id)
            }
        }
        const getComposer=id=>composers.get(id)

        const {width}=this.getSpace()
        const content=(
            <AggregateContext target={this} value={{
                    mount,unmount,getComposer,
                    parent:{
                        appendComposed(){

                        }
					},
					shouldContinueCompose(){
						return true
					},
					...context
                }}>
                <Balanceable space={{width}} id="___target">{this.props.children}</Balanceable>
            </AggregateContext>
        )
        return render(content).find(a=>a.props.id=="___target").instance
	}
}