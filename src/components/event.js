import React,{createFactory, Component} from "react"
import PropTypes from "prop-types"

export const onlyWhen=(test,stateHandler)=>BaseComponent=>{
    stateHandler=stateHandler||(a=>({[test]:a}));
    const factory=createFactory(BaseComponent)

    return class UpdateOnlyWhen extends Component{
        static displayName=`OnlyWhen(${test})`
        static contextTypes={
            events:PropTypes.object
        }

        constructor(){
            super(...arguments)
            this.state={inited:false}
            if(this.context.events){
                this.context.events.on(test,a=>{
                    this.setState({
                            inited:true,
                            ...stateHandler(a,this.props),
                        },
                        ()=>this.forceUpdate()
                    )
                })
            }
        }

        render(){
            if(!this.state.inited)
                return null
            const {inited, ...state}=this.state
            return factory({...this.props,...state})
        }

        shouldComponentUpdate(){
            return false
        }
    }
}

export const when=(test,stateHandler)=>BaseComponent=>{
    stateHandler=stateHandler||(a=>({[test]:a}));

    const factory=createFactory(BaseComponent)

    return class UpdateWhen extends Component{
        static displayName=`When(${test})`
        static contextTypes={
            events:PropTypes.object
        }

        constructor(){
            super(...arguments)
            this.state={}
            if(this.context.events){
                this.context.events.on(test,a=>this.setState(stateHandler(a,this.props)))
            }
        }

        render(){
            return factory({...this.props,...this.state})
        }
    }
}
