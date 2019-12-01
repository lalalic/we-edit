import React,{Component} from "react"

export default class ResponsibleAPI extends Component{
    static displayName="responsible-composed-document-default-canvas"
    static propTypes={
        document: PropTypes.object,
    }
    static contextTypes={
        onContextMenu: PropTypes.func,
    }
    static composedY=document=>{
        const {computed:{composed:pages}, props:{pageGap}}=document
        return pages.reduce((w,page)=>w+page.composedHeight+pageGap,0)
    }
    static getDerivedStateFromProps({document:{dispatch,props:{editable,scale,content,canvasId}}}){
        return {editable,scale,content,canvasId,dispatch}
    }

    static Positioning=function(){}

    constructor(){
        super(...arguments)
        this.state={}
        this.getComposer=this.getComposer.bind(this)
        this.getContent=this.getContent.bind(this)
        this.positioning=new this.constructor.Positioning(this)

        this.onMove=this.onMove.bind(this)
        this.onResize=this.onResize.bind(this)
        this.onRotate=this.onRotate.bind(this)
        this.eventHandlers="onClick,onDoubleClick,onContextMenu,onMouseDown,onMouseMove,onMouseUp".split(",")
            .reduce((handlers,key)=>{
                if(key in this){
                    handlers[key]=this[key]=this[key].bind(this)
                }else{
                    console.warn(`responsible canvas doesn't implemented ${key} event`)
                }
                return handlers
            },{})
    }

    /**the following API must be provided to Positioning */
    get scale(){
        return this.state.scale
    }

    get pages(){
        return this.props.document.pages
    }

    get pageGap(){
        return this.state.pageGap
    }

    get dispatch(){
        return this.state.dispatch
    }

    get canvas(){
        
    }

	getComposer(id){
		return this.props.document.getComposer(id)
	}

	getContent(id){
        return ContentQuery.fromContent(this.state.content,  id ? `#${id}`  : undefined)
    }
}