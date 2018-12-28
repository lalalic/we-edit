import React, {Children,Component} from "react"
import PropTypes from "prop-types"


import composable, {HasParentAndChild,} from "./composable"
import {models, ReactQuery} from "we-edit"
const {Paragraph:Base}=models

import opportunities from "./wordwrap/line-break"
import {Text as ComposedText,  Group} from "./composed"
import Frame from "./frame"

const Super=HasParentAndChild(Base)
export default class extends Super{
	static contextTypes={
		...Super.contextTypes,
		Measure: PropTypes.func,
	}
    static childContextTypes={
        ...Super.childContextTypes,
        getMyBreakOpportunities: PropTypes.func,
		getLastText: PropTypes.func
    }

	constructor(){
		super(...arguments)
		this.computed.lastText=""
		this.computed.words=0
		this.computed.atoms=[]
		this.computed.needMerge=false
	}

    getChildContext(){
        let self=this
        return {
            ...super.getChildContext(),
			getMyBreakOpportunities(text,f){
				const {lastText}=self.computed
				if(!text){
					if(text===null)
						self.computed.lastText=""
					return []
				}

				const current=opportunities(self.computed.lastText=`${lastText}${text}`)
				if(!lastText){
					self.computed.words+=current.length
					return current
				}

				const last=opportunities(lastText)
				const i=last.length-1

				let possible=current.slice(i)
				if((possible[0]=possible[0].substring(last.pop().length))==""){
					possible.splice(0,1)
				}else{
					self.computed.needMerge=true
				}
				self.computed.words+=(possible.length-1)
				return possible
            }
        }
    }

	get currentLine(){
		const {composed}=this.computed
		if(composed.length==0){
			this.createLine()
		}
		return composed[composed.length-1]
	}

    createLine(required){
		const {width,...space}=this.context.parent.nextAvailableSpace(required)
		const composableWidth=(w=>{
	        const {indent:{left=0,right=0,firstLine=0}}=this.props
	        w-=(left+right)
	        if(this.computed.composed.length==0)
	            w-=firstLine

	        return w
	    })(width);

        let line=new Line({...space, width:composableWidth},{parent:this})
		if(this.props.numbering && this.computed.composed.length==0){
			let {numbering:{label}, indent:{firstLine}}=this.props
			let {defaultStyle}=new this.context.Measure(label.props)
			let hanging=-firstLine
			line.children.push(
				<Group
					descent={defaultStyle.descent}
					width={hanging}
					height={0}>
					<ComposedText {...defaultStyle}
						width={hanging}
						contentWidth={hanging}
						children={[label.props.children]}/>
				</Group>
			)
		}
		this.computed.composed.push(line)
		return line
    }

    appendComposed(content){
		if(this.computed.needMerge){
			let last=this.computed.atoms.pop()
			let height=Math.max(last.props.height, content.props.height)
			let descent=Math.max(last.props.descent, content.props.descent)
			let width=last.props.width+content.props.width
			this.computed.atoms.push(
				<Group {...{width,height,descent}}>
					{last}
					{React.cloneElement(content,{x:last.props.width})}
				</Group>
			)
			this.computed.needMerge=false
			return
		}
		this.computed.atoms.push(content)
    }

    onAllChildrenComposed(){//need append last non-full-width line to parent
		this.commit()
		super.onAllChildrenComposed()
    }

	rollbackLines(n){
		this.computed.composed.splice(-n)
	}

	/**
	* line.appendComposed can rollback to a specified atom
	* parent.appendComposed can rollback lines
	**/
	commit(start=0, end=Number.MAX_SAFE_INTEGER){
		const {context:{parent}, computed:{atoms}}=this

		const rollbackToLineWithFirstAtomIndex=at=>{
			const {composed:lines,atoms}=this.computed
			const i=lines.findIndex(a=>atoms.indexOf(a.first)==at)
			this.rollbackLines(lines.length-i)
		}

		const appendComposedLine=bLast=>parent.appendComposed(this.createComposed2Parent(this.currentLine.commit(),bLast))

		const atomIndexOfLastNthLine=i=>atoms.indexOf(this.computed.composed[this.computed.composed.length-i].first)

		const len=this.computed.atoms.length
		const DEAD=5
		var nested=0

		const commitFrom=(start=0)=>{
			var last=0, times=0
			var next, rollbackLines
			for(let i=start,content;i<len;){
				if(i>end)
					return
				if(i==last){
					times++
					if(times>DEAD){
						throw Error(`it may be dead loop on ${i}th atoms`)
					}
				}else{
					last=i
					times=0
				}
				next=this.currentLine.appendComposed(atoms[i],i)

				if(next===false){//current line is full, atoms[i] not assembled
					if(!Number.isInteger(rollbackLines=appendComposedLine(false))){
						this.createLine()
						continue
					}else{
						if(rollbackLines==Frame.IMMEDIATE_STOP)
							return Frame.IMMEDIATE_STOP
						next=atomIndexOfLastNthLine(rollbackLines)
					}
				}

				if(Number.isInteger(next)){
					rollbackToLineWithFirstAtomIndex(next)
					this.createLine()
					i=next
					continue
				}

				i++
			}

			if(++nested>DEAD){
				console.error(`it may be dead loop on since commit nested ${nested}, ignore and continue`)
				return
			}

			if(!this.currentLine.isEmpty()){
				rollbackLines=appendComposedLine(true)
				if(Number.isInteger(rollbackLines)){
					if(rollbackLines==Frame.IMMEDIATE_STOP)
						return Frame.IMMEDIATE_STOP
					next=atomIndexOfLastNthLine(rollbackLines)
					rollbackToLineWithFirstAtomIndex(next)
					this.createLine()
					commitFrom(next)
				}
			}
		}

		return commitFrom(start)
	}

	recommit(lastLines=this.computed.composed){
		const {atoms, composed}=this.computed
		lastLines=composed.slice(-lastLines.length)

		this.rollbackLines(lastLines.length)

		const start=atoms.findIndex(a=>a==lastLines[0].first)
		const end=atoms.slice(start+1).findIndex(a=>a==lastLines[lastLines.length-1].last)+start+1
		this.createLine()
		return this.commit(start, end)
	}

	lineHeight(height){
		var {spacing:{lineHeight="100%",top=0, bottom=0},}=this.props
       	lineHeight=typeof(lineHeight)=='string' ? Math.ceil(height*parseInt(lineHeight)/100.0): lineHeight
	   	if(this.computed.composed.length==1){//first line
            lineHeight+=top
        }
		return lineHeight
	}

	createComposed2Parent(line,last){
		const {height, width, children, anchor,...others}=line
        let {
			spacing:{lineHeight="100%",top=0, bottom=0},
			indent:{left=0,right=0,firstLine=0},
			align,
			orphan,widow,keepWithNext,keepLines,//all recompose whole paragraph to simplify
			}=this.props

       lineHeight=typeof(lineHeight)=='string' ? height*parseInt(lineHeight)/100.0: lineHeight
	   let contentY=(lineHeight-height)/2
	   let contentX=left

        if(this.computed.composed.length==1){//first line
            lineHeight+=top
            contentY+=top
            contentX+=firstLine
        }

        if(last){//the last line
            lineHeight+=bottom
			if(align=="justify" || align=="both"){//not justify the last line
				align=undefined
			}
        }

		const pagination={orphan,widow,keepWithNext,keepLines, i:this.computed.composed.length,last}

        return (
            <Group height={lineHeight} width={width} className="line" pagination={pagination} anchor={anchor}>
                <Group x={contentX} y={contentY} width={width} height={height}>
					<Story {...{children,align}}/>
                </Group>
            </Group>
        )
    }
}

class Line extends Component{
	constructor({width,maxWidth,height,wrappees=[],frame}){
		super(...arguments)
		this.maxWidth=maxWidth
		this.content=[]
		this.wrappees=wrappees
		this.frame=frame
		Object.defineProperties(this,{
			height:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content.reduce((h,{props:{height}})=>Math.max(h,height),0)
				}
			},
			children:{
				enumerable:true,
				configurable:true,
				get(){
					return this.content
				}
			},
			availableHeight:{
				enumerable:false,
				configurable:false,
				get(){
					return height
				}
			},
			availableWidth:{
				enumerable:false,
				configurable:false,
				get(){
					return width-this.currentX
				}
			},
			currentX:{
				enumerable:false,
				configurable:false,
				get(){
					return this.content.reduce((x,{props:{width,x:x0}})=>x0!=undefined ? x0+width : x+width,0)
				}
			},
			width:{
				enumerable:true,
				configurable:false,
				get(){
					return width
				}
			},
			first:{
				enumerable:false,
				configurable:false,
				get(){
					const first=this.content.find(a=>a.props.x===undefined)
					if(first && first.props.atom)
						return first.props.atom
					return first
				}
			},
			last:{
				enumerable:false,
				configurable:false,
				get(){
					const last=this.content.findLast(a=>a.props.x===undefined)
					if(last && last.props.atom)
						return last.props.atom
					return last
				}
			},
			paragraph:{
				enumerable:false,
				configurable:false,
				get(){
					return this.context.parent
				}
			}
		})
	}

	isEmpty(){
		return this.children.length==0
	}

	hasEqualSpace({width,maxWidth,wrappees=[]}){
		return this.props.width==width &&
			this.props.maxWidth==maxWidth &&
			this.wrappees.length==wrappees.length &&
			!!!this.wrappees.find((a,i)=>{
				let b=wrappees[i]
				return Math.abs(a.x-b.x)>1 && Math.abs(a.width-b.width)>1
			})
	}

	appendComposed(atom,at){
		const {width,minWidth=parseInt(width),anchor}=atom.props
		if(anchor){
			this.content.push(React.cloneElement(
				new ReactQuery(atom).findFirst('[data-type="anchor"]').get(0),
				{children:null,width:0,height:0, atom}
			))
			if(!this.frame.isAnchorComposed(anchor.props.id)){
				this.anchor=atom
				return false
			}
		}else{
			const containable=()=>minWidth==0 || this.availableWidth>=minWidth || this.availableWidth==this.maxWidth
			if(containable()){
				this.wrappees=this.wrappees.map((a,i)=>{
					if((this.currentX+minWidth)>a.x){
						this.content.push(<Group {...a} height={0}/>)
						this.wrappees[i]=null
					}else{
						return a
					}
				}).filter(a=>!!a)

				if(containable()){
					let height=this.lineHeight()
					this.content.push(atom)
					let newHeight=this.lineHeight()
					if(height!=newHeight){
						const newBlocks=this.frame.exclusive(newHeight)
						if(this.shouldRecompose(newBlocks)){
							const flowCount=this.content.reduce((count,a)=>a.props.x==undefined ? count+1 : count,0)
							at=at-flowCount
							this.content=[]
							return at
						}
					}
					return
				}else{
					return false
				}
			}else{

				return false
			}
		}
	}

	lineHeight(){
		return this.paragraph.lineHeight(this.height)
	}

	shouldRecompose(newBlocks){
		const applied=this.content.filter(a=>a.props.x!==undefined)
		const notShould=applied.reduce((notShould,{props:{x,width}},i)=>{
			if(notShould){
				let a=newBlocks[i]
				return!!a && parseInt(Math.abs(a.x-x))==0 && a.width==width
			}
			return false
		}, true)
		if(notShould){
			let notApplied=newBlocks.slice(applied.length)
			if(notApplied.slice(0,1).reduce((should,a)=>a.x<this.currentX,false)){
				this.wrappees=newBlocks
				return true
			}else{
				this.wrappees=notApplied
			}
			return false
		}else{
			this.wrappees=newBlocks
			return true
		}
	}

	commit(){
		this.wrappees.forEach(a=>this.content.push(<Group {...a} height={0}/>))
		this.wrappees=[]
		return this
	}
}

class Story extends Component{
	static displayName="story"
	render(){
		const {children, align="left"}=this.props
		const height=children.reduce((h,{props:{height}})=>Math.max(h,height),0)
		const descent=children.reduce((h,a,i)=>{
			const {props:{descent}}=a
			if(descent==undefined){
				children[i]=React.cloneElement(a,{y:-a.props.height})
			}
			return Math.max(h,descent||0)
		},0)
		const baseline=height-descent
		return (
			<Group y={baseline}>
				{this[align]()}
			</Group>
		)
	}

	left(){
		return this.props.children.reduce((state,piece,key)=>{
			const {width}=piece.props
			if(piece.props.x!=undefined){
				state.pieces.push(React.cloneElement(piece,{key}))
				state.x=piece.props.x+width
			}else{
				const piecePath=path(piece)
				if(!piecePath.bText){
					state.mergeTrunk(key)
					state.pieces.push(React.cloneElement(piece,{x:state.x,key}))
					state.x+=width
				}else{
					if(piecePath.join(",")==state.trunkPath){
						state.trunk.push(piece)
					}else {
						state.mergeTrunk(key)
						state.trunk.push(piece)
						state.trunkPath=piecePath.join(",")
					}
				}
			}
			return state
		},{
			pieces:[],x:0,trunk:[],trunkPath:null,
			mergeTrunk(key=-1){
				if(this.trunk.length==1){
						const piece=this.trunk[0]
						this.pieces.push(React.cloneElement(piece,{x:this.x,key}))
						this.x+=piece.props.width
				}else if(this.trunk.length>1){
					const extract=a=>path(a,b=>b).pop()
					const texts=this.trunk.map(extract)
					const props=texts.reduce((props,a)=>{
							props.width+=a.props.width
							props.children+=a.props.children
							return props
						},{
							width:0,
							children:"",
							"data-endat":texts[texts.length-1].props["data-endat"],
							className:undefined,minWidth:undefined
						})
					const parents=path(this.trunk[0],a=>a,a=>true).slice(0,-1)
					const merged=parents.reduceRight((child,a)=>React.cloneElement(a,{width:props.width},child),React.cloneElement(texts[0],props))
					this.pieces.push(React.cloneElement(merged,{x:this.x,key}))
					this.x+=props.width
				}
				this.trunk=[]
				this.trunkPath=null
				return this
			}
		}).mergeTrunk().pieces
	}

	group(right=false){
		return this.props.children
			.reduce((groups,a)=>{
				if(a.props.x!=undefined){
					if(right){
						groups.push({located:a,words:[]})
					}else{
						groups[groups.length-1].located=a
						groups.push({words:[]})
					}
				}else{
					groups[groups.length-1].words.push(a)
				}
				return groups
			},[{words:[]}])
			.map(group=>{
				let i=group.words.length-
						Array.from(group.words)
							.reverse()
							.findIndex(a=>!isWhitespace(a))

				group.endingWhitespaces=group.words.slice(i)
				group.words=group.words.slice(0,i)
				return group
			})
	}

	right(){
		return this.group(true)
			.reduceRight((state, {located,words,endingWhitespaces})=>{
				const i=state.righted.length
				endingWhitespaces.reduce((x,whitespace)=>{
					state.righted.push(React.cloneElement(whitespace,{x}))
					return x+whitespace.props.width
				},state.x)

				words.reduceRight((x,word)=>{
					x=x-word.props.width
					state.righted.splice(i,0,React.cloneElement(word,{x}))
					return x
				},state.x)

				if(located){
					state.righted.splice(i,0,located)
					state.x=located.props.x
				}
				return state
			},{x:this.props.width,righted:[]}).righted
	}

	center(){
		const contentWidth=pieces=>pieces.reduce((w,a)=>w+a.props.width,0)
		return this
			.group()
			.reduce((state, {words, endingWhitespaces,located})=>{
				const width=(located ? located.props.x : this.props.width)-state.x
				const wordsWidth=contentWidth(words)
				state.centerized.push(
					<Group x={state.x+(width-wordsWidth)/2} key={state.centerized.length}>
						{
							words.concat(endingWhitespaces).reduce((status,word,key)=>{
								status.pieces.push(React.cloneElement(word,{x:status.x,key}))
								status.x+=word.props.width
								return status
							},{x:0,pieces:[]}).pieces
						}
					</Group>
				)

				if(located){
					state.centerized.push(React.cloneElement(located,{key:state.centerized.length}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0, centerized:[]}).centerized
	}

	justify(){
		return this
			.group()
			.reduce((state,{words,endingWhitespaces,located})=>{
				let len=state.justified.length
				const width=(located ? located.props.x : this.props.width)-state.x
				const {whitespaces,contentWidth}=words.reduce((status,a,i)=>{
					if(isWhitespace(a)){
						status.whitespaces.push(i)
					}else{
						status.contentWidth+=a.props.width
					}
					return status
				},{contentWidth:0,whitespaces:[]})
				const whitespaceWidth=whitespaces.length>0 ? (width-contentWidth)/whitespaces.length : 0
				words.concat(endingWhitespaces).reduce((x,word,i)=>{
					state.justified.push(React.cloneElement(word,{x,key:len++}))
					return x+(whitespaces.includes(i) ? whitespaceWidth : word.props.width)
				},state.x)

				if(located){
					state.justified.push(React.cloneElement(located,{key:len++}))
					state.x=located.props.x+located.props.width
				}
				return state
			},{x:0,justified:[]}).justified
	}

	both(){
		return this.justify()
	}
}


function isWhitespace(a,/*$=new Query(a)*/){
	//return $.prop("minWidth")==0 && $.findFirst(".whitespace")

	if(a.props.minWidth==0){
		while(a && a.props.className!="whitespace"){
			try{
				a=React.Children.only(a.props.children)
			}catch(e){
				return false
			}
		}
		return !!a
	}
	return false
}

function path(a,info=a=>a.props["data-content"],test=a=>!!a.props["data-content"],ids=[]){
	if(React.isValidElement(a)){
		if(test(a)){
			ids.push(info(a))
			ids.bText=a.props["data-type"]=="text"
		}
		if(React.isValidElement(a.props.children)){
			path(React.Children.only(a.props.children),info,test,ids)
		}
	}
	return ids
}
