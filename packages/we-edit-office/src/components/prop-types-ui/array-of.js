import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {fromJS} from "immutable"
import base from "./base"

//arrayOf(string), arrayOf(<div/>)
/**
 * 
 * onAdd is used to identify controlled or uncontrolled
 * 
 * controlled: create new value based on activeValue, 
 *      reflective Active UI, but not reflect change
 *      take care add & change by onAdd(host)
 *      
 * uncontrolled: need initial value for adding by initNewValue(this)
 *      reflective Active UI
 *      submit active change direct to upper
 *      when add is triggered, a new initial value is added to values, then reflect to active
 */
export default class arrayOf extends base{
    static displayName="arrayOf"
    static propTypes={
        ...super.propTypes,
        onAdd: PropTypes.func,
        initNewValue: PropTypes.any,
    }

    static childContextTypes={
        ...super.childContextTypes,
        set: PropTypes.func,
    }

    constructor({value=[]}){
        super(...arguments)
        this.state=this.onStateChange({active:value.length ? 0 : -1,values:value})
    }

    componentDidUpdate(prev){
        if(prev.value!=this.props.value){
            let {active}=this.state
            const values=this.props.value||[]
            if(active==-1){
                if(values.length>0){
                    active=0
                }
            }else if(values.length<=active){
                active=values.length-1
            }
            this.setState({values, active})
        }
    }

    getChildContext(){
        return {
            ...super.getChildContext?.(),
            set: this.set.bind(this),
        }
    }

    renderDialog(){
        const {
            type:{Type},
            collectionStyle={height:150, border:"1px solid gray", padding:5}, 
            collection=React.createElement(props=><div {...props} style={{width:"100%",height:"100%"}}/>), 
            label1=a=>a,
            wrapper1=React.createElement(({value,i,selected, style, ...props})=><div {...props} style={{background:selected ? "lightblue" : "", cursor:"default",...style}}>{label1(value)}</div>), 
            actionStyle={float:"left", marginTop:5}, 
            activeStyle={}, 
            $0}=this.$props
        const {active, values, activeValue}=this.state
        const UIType=this.getUIType(Type.type)
        const activeEl=(
            <div key="active" style={activeStyle}>
                {React.createElement(UIType,{...Type.props,...$0,value:activeValue.toJS(),path:`${this.path}.${active}`})}
            </div>
        )

        const collectionEl=(
            <div key="collection" style={collectionStyle}>
                {React.cloneElement(collection,{
                    children:values.map((a,i)=>{
                        const props={value:a,i,key:i, onClick:a=>this.setState({active:i})}
                        if(i==active)
                            props.selected=true
                        return React.cloneElement(wrapper1,props)
                    })
                })}
            </div>
        )

        const actions=(
            <div key="actions" style={actionStyle}>
                    <button onClick={e=>this.onAdd()}>+</button>

                    <button onClick={e=>this.onRemove()} disable={(active>-1).toString()} >-</button>
                </div>
        )
        return <Fragment>{[actions,collectionEl,activeEl]}</Fragment>
    }

    renderTree(){
        return null
    }

    onAdd(){
        const {state:{values, active}, $props:{onAdd, initNewValue}}=this
        if(onAdd){
            return onAdd(this)
        }
        
        if(initNewValue!=undefined){//add a initial value to values when click add button
            const changed=[...values]
            changed.splice(active,0,typeof(initNewValue)=="function" ? initNewValue(this) : initNewValue)
            this.set(this.path, changed)
            this.setState({active:active+1,values:changed})
        }
    }

    onRemove(){
        const {state:{values, active}}=this
        const changed=[...values]
        changed.splice(active,1)
        this.setState({values:changed, active:active>=changed.length ? changed.length-1 : active})
        this.set(this.path, changed)
    }

    setState(state,...args){
        if(typeof(state)=='function'){
            state=(...a)=>this.onStateChange(state(...a),this)
        }else{
            state=this.onStateChange(state,this)
        }
        return super.setState(state,...args)
    }

    set(path,value){
        const {onAdd}=this.$props
        if(path!=this.path && onAdd){
            const {activeValue,active}=this.state
            const relativePath=path.replace(`${this.path}.${active}.`,'')
            this.setState({activeValue:activeValue.setIn(relativePath.split("."),value)})
            return 
        }
        super.set(...arguments)
    }

    /**to create activeValue according to state */
    onStateChange(state){
        if('values' in state || ('active' in state && this.state.active!=state.active)){
            state.activeValue=fromJS((state.values||this.state.values)[state.active])
        }
        return state
    }
}