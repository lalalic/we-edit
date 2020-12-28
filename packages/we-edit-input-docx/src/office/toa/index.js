import React,{Component,Fragment} from "react"

import {ACTION, whenSelectionChangeDiscardable, ContentQuery} from "we-edit"
import {Ribbon, Dialog, ContextMenu} from "we-edit-office"

import {compose,setDisplayName,withState, withProps, } from "recompose"

import {ToolbarGroup, FlatButton,MenuItem,Divider} from "material-ui"
import TAIcon from "material-ui/svg-icons/action/bookmark"
import TOAIcon from "material-ui/svg-icons/maps/local-library"



export default compose(
    setDisplayName("TOA"),
    whenSelectionChangeDiscardable(({selection}, state)=>{
        const text=()=>selection?.isRange ? "hello" : "" 
        return {
            selected:text, 
            getAllTa(){
                const tas=[]
                for (let [k,a] of state.get('content')){
                    if(a.getIn(['props','command'])=="TA"){
                        tas.push(a.toJS())
                    }
                }
                return tas
            }
        }
    }),
    withProps(({dispatch,selected})=>({
        build(e,instr='TOA \\o "1-3" \\h \\z \\u'){
            dispatch(ACTION.Entity.CREATE({type:"ToA",instr}))
        },
        mark(mark){
            
        },
    })),
    withState('open','setOpen', false),
)(({toa, mark, build, open, setOpen, selected, getAllTa})=>(
    <ToolbarGroup>
        <Ribbon.CheckIconButton title="Mark Citation" onClick={e=>setOpen(true)}>
            <TAIcon/>
        </Ribbon.CheckIconButton>
        <Ribbon.CheckIconButton title="Table of Authorities" onClick={build}>
            <TOAIcon/>
        </Ribbon.CheckIconButton>
        {open && <BuildTA close={()=>setOpen(false)} apply={mark} selected={selected()} tas={getAllTa()}/>}
    </ToolbarGroup>
))

const DialogTitleStyle={textAlign:"center",padding:5,background:"darkgray",lineHeight:"unset",fontSize:12}
class BuildTA extends Component{
    constructor({tas,selected}){
        super(...arguments)
        this.state={all:tas}
    }
    render(){
        const {close, mark, selected}=this.props
        const {c=1,l=selected,s=selected, i, all=[], current=all[i]||{c,l,s}}=this.state
        return (
            <Dialog title="Mark Citation" modal={true} open={true} titleStyle={DialogTitleStyle}
            actions={[
                <FlatButton
                    label="Cancel"
                    onClick={close}
                />,
            ]}>
                <div>
                    <div>selected text:</div>
                    <textarea style={{display:"block"}} multiple="on" value={selected}/>
                </div>
                <div>
                    <div>
                        <span>Category</span>
                        <select selectedIndex={c} 
                            onChange={e=>this.setState({c:e.target.selectedIndex})}>
                            <option>Cases</option>
                            <option>Statutes</option>
                            <option>Other Authorities</option>
                            <option>Rules</option>
                        </select>
                    </div>
                    <div><button>Categories...</button></div>
                </div>
                <div>
                    <div>short citation</div>
                    <input value={current.s} style={{display:"block"}}/>
                    <select selectIndex={i} style={{display:"block"}}>
                        {all.map((a,i)=><option key={i}>{a.s}</option>)}
                    </select>
                    <div>long citation</div>
                    <textarea value={current.l} style={{display:"block"}}/>
                </div>

                <div>
                    <button>Next Citation</button>
                    <button>Mark All</button>
                    <button onClick={e=>mark(this.state)}>Mark</button>
                </div>
            </Dialog>
        )
    }
}