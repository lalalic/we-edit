import PropTypes from "prop-types"
import memoize from "memoize-one"
import {ReactQuery} from "we-edit"


export default (A)=>class __$1 extends A{
	static defaultProps={
		...A.defaultProps,
		create(...args){
			return new this.Fission(...args)
		}
	}
	static contextTypes={
		...A.contextTypes,
		ModelTypes: PropTypes.object,
	}
	static childContextTypes={
        ...A.childContextTypes,
        isAnchored:PropTypes.func,
        exclusive: PropTypes.func,
    }

    static displayName=`fissionable-${A.displayName}`

	static fissureLike(){
		throw new Error("Fission should be implemented in static fissureLike()")
	}

	constructor(){
		super(...arguments)
		this.computed.named={}
	}

	get Fission(){
		return memoize((Base)=>this.constructor.fissureLike(Base))(this.context.ModelTypes.Frame)
	}

    getChildContext(){
        const me=this
        function isAnchored(){
            return me.current.isAnchored(...arguments)
        }
        function exclusive(){
            return me.current.exclusive(...arguments)
        }
        return Object.assign(super.getChildContext(),{
            isAnchored,
            exclusive,
        })
    }

	named(name){
		return this.computed.named[name]
	}

    get current(){
        if(this.computed.composed.length==0)
            this.create()
		return this.computed.composed[this.computed.composed.length-1]
	}

    create(props={},context={},requiredSpace){
        const a=this.props.create.bind(this)(
            {...props,id:this.props.id, i:this.computed.composed.length, named:this.named.bind(this)},
            {...context,parent:this,getComposer:id=>this.context.getComposer(id)}
        )
        this.computed.composed.push(a)
        return a
    }

    nextAvailableSpace(required){
        let space=this.current.nextAvailableSpace(...arguments)
        if(!space){
            this.create(undefined,undefined,required)
            return this.nextAvailableSpace(...arguments)
        }
        return space
    }

    appendComposed({props:{named,height}}){
        if(named){
            this.computed.named[named]=arguments[0]
            return
        }else{
            const appended=this.current.appendComposed(...arguments)
            if(appended===false){
                this.create(undefined, undefined,{height})
                return 1//recompose current line in case different availableSpace
            }else if(Number.isInteger(appended)){
                return appended
            }
        }
    }

	getRangeRects(p0,p1,pageXY){
		const getComposer=id=>this.getComposer && this.getComposer(id) || this.context.getComposer && this.context.getComposer(id)
		const pages=this.getPages()

		const composer0=getComposer(p0.id)
		p0=composer0.position(p0.id,p0.at)
		p1=getComposer(p1.id).position(p1.id,p1.at)//no context
		if(!p0 || !p1){
			return []
		}
		if(p0.id==p1.id && p0.page==p1.page && !composer0.splittable){
			const [start,end]=[p0,p1].sort((a,b)=>a.at-b.at);
			const {x,y}=pageXY(pages.find(a=>a.props.I==start.page))
			return [{left:x+start.x,top:y+start.y,right:x+end.x,bottom:y+end.y}]
		}

		p0.page=pages.find(a=>a.props.I==p0.page)
		p1.page=pages.find(a=>a.props.I==p1.page)

        p0.fissionIndex=this.computed.composed.findIndex(a=>(p0.line=a.lineIndexOf(p0))!=-1)
        p1.fissionIndex=this.computed.composed.findLastIndex(a=>(p1.line=a.lineIndexOf(p1))!=-1)

        const fissionFrameXY=page=>{
            const {x,y}=pageXY(page)
            const {first,parents}=new ReactQuery(page.render()).findFirstAndParents(`[data-content="${this.props.id}"]`)
            return [...parents,first.get(0)].reduce((p,{props:{x=0,y=0}})=>(p.x+=x,p.y+=y,p),{x,y})
        }

        const rects=[]
        const lineRectsInPage=(page,fissionIndex,start=0,end)=>{
            const {x,y}=fissionFrameXY(page)
            const fission=this.computed.composed[fissionIndex]
            if(fission){
                fission.lines.slice(start,end).forEach((a,i)=>{
                    const {left,top,width,height}=fission.lineRect(start+i)
                    rects.push({left:left+x,top:top+y,right:left+width+x,bottom:top+height+y})
                })
            }
        }

        const [start,end]=(()=>{
            if(p0.page.props.I>p1.page.props.I){
                return [p1,p0]
            }else if(p0.page.props.I==p1.page.props.I){
                if(p0.line>p1.line){
                    return [p1,p0]
                }
            }
            return [p0,p1]
        })();

        if(start.page==end.page){
            lineRectsInPage(start.page, start.fissionIndex, start.line, end.line+1)
        }else{
            lineRectsInPage(start.page, start.fissionIndex, start.line)
            if(start.fissionIndex!=end.fissionIndex){
                pages.slice(start.page.props.I+1, end.page.props.I).forEach((page,i)=>lineRectsInPage(page,i+start.fissionIndex+1))
                lineRectsInPage(end.page,end.fissionIndex, 0,end.line+1)
            }
        }

        if(rects.length){
            Object.assign(rects[0],{left:pageXY(start.page).x+start.x})

            Object.assign(rects[rects.length-1], {right:pageXY(end.page).x+end.x})
        }
        return rects
    }
}
