import {createState} from "../src/state"
import immutable,{Map} from "immutable"
import Reducer from "../src/input/reducer"
import Input from "../src/input"
import {selection} from "../src/state/reducer"

describe("reducer",()=>{
    class StateDocument extends Input.Editable{
        static uuid=1
        constructor(content,_content){
            super()
            this.content=content.toJS()
            this._content=_content
        }

        makeId(node){
            if(node){
                node.id=node.id||`0${StateDocument.uuid++}`
            }else{
                return `0${StateDocument.uuid++}`
            }
        }

        renderNode({id}){
            const node=this.getNode(id)
			this._content.set(id,immutable.fromJS(node))
            if(Array.isArray(node.children)){
                node.children.forEach(a=>this.renderNode({id:a}))
            }
			return node
        }

        renderChanged(){
            return this.renderNode(...arguments)
        }

        getNode(id){
            return this.content[id]
        }

        cloneNode({id}){
            const {id:_,...cloned}=this.getNode(id)
            this.makeId(cloned)
			this.content[cloned.id]=cloned
            if(Array.isArray(cloned.children)){
                cloned.children.map(a=>this.cloneNode({id:a}))
            }
            return cloned
        }

		createNode(node,position){
            this.makeId(node)
            if(position){
                const {id,at=0}=position
                const reference=this.getNode(id)
    			const parent=this.getNode(reference.parent)
                if(at==0){
        			this.insertNodeBefore(node,reference,parent)
                }else if(at==1){
                    this.insertNodeAfter(node,reference,parent)
                }
            }else{
                this.attach(node)
            }

            return {id:node.id,at:0}
		}

		construct(from,to){
			var  constructed
			const up=id=>{
				var {id:_,children,parent,...cloned}=this.getNode(id)
				cloned.children=cloned.type=="text" ? "" : []
				this.makeId(cloned)
				this.content[cloned.id]=cloned
				if(id!=to){
					const parentNode=up(parent)
					cloned.parent=parentNode.id
					parentNode.children.push(cloned.id)
				}else{
					constructed=cloned
				}
				return cloned
			}
			up(from)
			return constructed
		}

        updateNode({id},{children,parent,type,...props}){
            const node=this.getNode(id)
            const updated={...node,props:{...node.props,...props}}
            if(children!==undefined)
                updated.children=children
            if(parent!=undefined)
                updated.parent=parent
            if(type!=undefined)
                updated.type=type
            this.content[id]=updated
            this.renderChanged({id})
			return this.content[id]
        }

        splitNode({id},at, firstKeepId=true){
            const node=this.getNode(id)
            if(node.type=="text"){
                const text=node.children
                const cloned=this.cloneNode(node)
                if(firstKeepId){
                    this.updateNode(node,{children:text.substring(0,at)})
                    cloned.children=text.substring(at)
                    this.insertNodeAfter(cloned,node,{id:node.parent})
                    return [{id:node.id,at},{id:cloned.id,at:0}]
                }else{
                    this.updateNode(node,{children:text.substring(at)})
                    cloned.children=text.substring(0,at)
                    this.insertNodeBefore(cloned,node,{id:node.parent})
                    return [{id:cloned.id,at},{id:node.id,at:0},]
                }
            }else{
                return [{id,at},{id,at}]
            }
        }

        removeNode({id}, deep=true){
            const node=this.getNode(id)
            const remove=id=>{
                const {children=[]}=this.getNode(id)
                if(Array.isArray(children)){
                    children.forEach(remove)
                }
                delete this.content[id]
            }
			if(!deep){
				delete this.content[id]
			}else{
				remove(id)
			}

            const parent=this.getNode(node.parent)
			if(parent){
				parent.children=parent.children.filter(a=>a!=id)
				this.renderChanged(parent)
			}
        }

        /*append when referenceNode is falsy */
        insertNodeBefore(newNode,referenceNode,parentNode){
            parentNode=this.getNode(parentNode.id)
            const i=referenceNode ? parentNode.children.indexOf(referenceNode.id) : parentNode.children.length
            this.makeId(newNode)
            if(this.content[newNode.id]){
                this.removeNode(newNode,false)
            }
            newNode.parent=parentNode.id
            this.content[newNode.id]=newNode
            parentNode.children.splice(i,0,newNode.id)
            this.renderChanged(parentNode)
			return newNode
        }

        //prepend when referenceNode is falsy
        insertNodeAfter(newNode,referenceNode,parentNode){
            const {children:siblings=[]}=this.getNode(parentNode.id)
            const beforeNode=!referenceNode ? siblings[0] : siblings[siblings.indexOf(referenceNode.id)+1]
            return this.insertNodeBefore(newNode,beforeNode ? {id:beforeNode} : null,parentNode)
        }

        attach(node){
            this.makeId(node)
            this.content[node.id]=node
            return this.renderChanged({id:node.id})
        }
    }

    const makeState=(data={})=>{
        const content=Object.keys({"1":{},"2":{},"3":{},...data}).reduce(
            (content,k)=>content.set(k,immutable.fromJS({id:k,parent:"root",props:{},...(data[k]||{})})),
            new Map()
                .set("root",immutable.fromJS({id:"root",type:"document",children:["1","2","3"]}))
        )
        const _content=content.asMutable()
        const doc=new StateDocument(content,_content)
        return createState(doc,content).set("_content",_content)
    }

    const test=(content,selectionx={})=>{
        const selection={cursorAt:"end",...selectionx}
        const state=makeState(content).set("selection",immutable.fromJS(selection))
        const reducer=new Reducer(state)
        expect(reducer.selection).toMatchObject(selection)
        return {selection,reducer}
    }

    describe("utils",()=>{
        it("cursorAt",()=>{
            const {reducer}=test()
            expect(reducer.cursorAt("1",1)).toMatchObject({start:{id:"1",at:1},end:{id:"1",at:1}})
            expect(reducer.cursorAt("1",2,"2",3)).toMatchObject({start:{id:"1",at:2},end:{id:"2",at:3}})
        })

        describe("clone",()=>{
            it("t(ex)t",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                })
                reducer.cursorAt("1.1",1,"1.1",3)
                debugger
                const cloned=reducer.clone()
                expect(cloned.attr('type')).toBe('text')
                expect(cloned.text()).toBe("ex")
            })

            it("image",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"image",parent:"1"},
                })
                reducer.cursorAt("1.1",0,"1.1",1)
                expect(reducer.clone().attr('type')).toBe('image')

                reducer.cursorAt("1.1",0)
                expect(reducer.clone().attr('type')).toBe('image')
            })

            it("<p><r><d><t>hello</t></d></r><t>(world</t></p><p><r><d><t>hello</t></d></r><t>)world</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"run",children:["1.1.1"],parent:"1"},
                    "1.1.1":{type:"sdt", children:["1.1.1.1"],parent:"1.1"},
                    "1.1.1.1":{type:"text",children:"hello",parent:"1.1.1"},
                    "1.2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2.1","2.2"]},
                    "2.1":{type:"run",children:["2.1.1"],parent:"2"},
                    "2.1.1":{type:"sdt", children:["2.1.1.1"],parent:"2.1"},
                    "2.1.1.1":{type:"text",children:"hello",parent:"2.1.1"},
                    "2.2":{type:"text",children:"world",parent:"2"},
                })

                reducer.cursorAt("1.1.1.1",0,"2.2",0)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(2)

                expect(cloned.eq(0).text()).toBe("helloworld")
                expect(cloned.eq(1).text()).toBe("hello")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)

                expect(cloned.eq(1).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)
            })

            it("<p><r><d><t>hello</t></d></r><t>w(orld</t></p><p><r><d><t>hello</t></d></r><t>w)orld</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"run",children:["1.1.1"],parent:"1"},
                    "1.1.1":{type:"sdt", children:["1.1.1.1"],parent:"1.1"},
                    "1.1.1.1":{type:"text",children:"hello",parent:"1.1.1"},
                    "1.2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2.1","2.2"]},
                    "2.1":{type:"run",children:["2.1.1"],parent:"2"},
                    "2.1.1":{type:"sdt", children:["2.1.1.1"],parent:"2.1"},
                    "2.1.1.1":{type:"text",children:"hello",parent:"2.1.1"},
                    "2.2":{type:"text",children:"world",parent:"2"},
                })

                reducer.cursorAt("1.1.1.1",1,"2.2",1)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(2)

                expect(cloned.eq(0).text()).toBe("elloworld")
                expect(cloned.eq(1).text()).toBe("hellow")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)

                expect(cloned.eq(1).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)
            })

            it("<p><r><d><t>hello</t></d></r><t>w(orld</t></p><p/><p><r><d><t>hello</t></d></r><t>w)orld</t></p>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"run",children:["1.1.1"],parent:"1"},
                    "1.1.1":{type:"sdt", children:["1.1.1.1"],parent:"1.1"},
                    "1.1.1.1":{type:"text",children:"hello",parent:"1.1.1"},
                    "1.2":{type:"text",children:"world",parent:"1"},

                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"world",parent:"2"},


                    "3":{type:"paragraph",children:["3.1","3.2"]},
                    "3.1":{type:"run",children:["3.1.1"],parent:"3"},
                    "3.1.1":{type:"sdt", children:["3.1.1.1"],parent:"3.1"},
                    "3.1.1.1":{type:"text",children:"hello",parent:"3.1.1"},
                    "3.2":{type:"text",children:"world",parent:"3"},
                })

                reducer.cursorAt("1.1.1.1",1,"3.2",1)
                const cloned=reducer.clone()
                expect(cloned.length).toBe(3)
                expect(cloned.filter('paragraph').length).toBe(3)

                expect(cloned.eq(0).text()).toBe("elloworld")
                expect(cloned.eq(2).text()).toBe("hellow")

                expect(cloned.eq(0).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)

                expect(cloned.eq(2).attr('type')).toBe('paragraph')
                expect(cloned.eq(0).find("run,sdt").length).toBe(2)
            })
        })

        describe("seperateSelection",()=>{
            it("T(ex)t",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                })
                reducer.cursorAt("1.1",1, "1.1",3)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(3)
                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ex')
                expect(texts.eq(2).text()).toBe('t')

                const id=texts.eq(1).attr('id')
                expect(reducer.selection).toMatchObject({start:{id,at:0},end:{id,at:2}})
            })

            it("T(extHe)llo",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"Hello",parent:"1"},
                })
                reducer.cursorAt("1.1",1, "1.2",2)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)

                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ext')
                expect(texts.eq(2).text()).toBe('He')
                expect(texts.eq(3).text()).toBe('llo')
                expect(texts.eq(3).attr('id')).toBe("1.2")


                const start=texts.eq(1)
                const end=texts.eq(2)
                expect(reducer.selection).toMatchObject({start:{id:start.attr("id"),at:0},end:{id:end.attr('id'),at:2}})
            })

            it("<run><text>T(ext</text></run><run><text>He)llo</text></run>",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"run",children:["1.1.0"],parent:"1"},
                    "1.1.0":{type:"text",children:"text",parent:"1.1"},
                    "1.2":{type:"run",children:["1.2.0"],parent:"1"},
                    "1.2.0":{type:"text",children:"Hello",parent:"1.2"},
                })
                reducer.cursorAt("1.1.0",1, "1.2.0",2)
                reducer.seperateSelection()
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)
                expect(reducer.$('run').length).toBe(2)

                expect(texts.eq(0).text()).toBe('t')
                expect(texts.eq(1).text()).toBe('ext')
                expect(texts.eq(2).text()).toBe('He')
                expect(texts.eq(3).text()).toBe('llo')
                expect(texts.eq(3).attr('id')).toBe("1.2.0")


                const start=texts.eq(1)
                const end=texts.eq(2)
                expect(reducer.selection).toMatchObject({start:{id:start.attr("id"),at:0},end:{id:end.attr('id'),at:2}})
            })
        })
    })


    describe("remove",()=>{
        const test=(content,selectionx={})=>{
            const selection={cursorAt:"end",...selectionx}
            const state=makeState(content).set("selection",immutable.fromJS(selection))
            const reducer=new Reducer(state)
            expect(reducer.selection).toMatchObject(selection)
            const composer={
                nextCursorable(){

                },
                prevCursorable(){

                }
            }
            const responsible={
                getComposer(){
                    return composer
                }
            }

            return {reducer,responsible,composer}
        }
        describe("forward",()=>{
            it("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1.1",at:2}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("txt")
                expect(reducer.file.getNode("1.1").children).toBe("txt")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:1},end:{id:"1.1",at:1}})
            })

            it("<p>text|</p>",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1",at:1}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("text")
                expect(reducer.file.getNode("1.1").children).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1",at:1},end:{id:"1",at:1}})
            })

            it("tex|tHello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"Hello",parent:"1"}
                })
                reducer.cursorAt("1.1",3)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$(`#1.1`).text()).toBe("tex")
                expect(reducer.file.getNode(`1.1`).children).toBe("tex")
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("|image",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"image",parent:"1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$('#1.1').length).toBe(0)
                expect(reducer.file.getNode('1.1')).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("|<anchor>image</anchor>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"anchor",parent:"1",children:["1.1.1"]},
                    "1.1.1":{type:"image",parent:"1.1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})
                expect(reducer.$('#1.1,#1.1.1').length).toBe(0)
                expect(reducer.file.getNode('1.1')).toBeFalsy()
                expect(reducer.file.getNode('1.1.1')).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("<p>|</p><p/>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"text",parent:"2"},
                })
                reducer.cursorAt("1",1)
                composer.nextCursorable=jest.fn(()=>({id:"2.1",at:0}))
                reducer.remove({responsible})
                expect(reducer.$('#2').length).toBe(0)
                expect(reducer.file.getNode('2')).toBeFalsy()
                expect(reducer.$('#1').children().toArray()).toMatchObject(["1.1","2.1"])
                expect(reducer.selection).toMatchObject({start:{id:"2.1",at:0},end:{id:"2.1",at:0}})
            })
        })

        describe("backword",()=>{
            it("t|ext",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:0}))
                reducer.remove({backspace:true,responsible})
                expect(reducer.$(`#1.1`).text()).toBe("ext")
                expect(reducer.file.getNode(`1.1`).children).toBe("ext")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:0},end:{id:"1.1",at:0}})
            })

            it("|text",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",0)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:0}))
                reducer.remove({backspace:true,responsible})
                expect(reducer.$(`#1.1`).text()).toBe("text")
                expect(reducer.file.getNode(`1.1`).children).toBe("text")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:0},end:{id:"1.1",at:0}})
            })

            it("image|Text",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"image",parent:"1"},
                    "1.2":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:0}))
                composer.nextCursorable=jest.fn(()=>{
                    expect(reducer.selection).toMatchObject({start:{id:"1.1",at:0}})
                    return {id:"1.2",at:0}
                })
                reducer.remove({backspace:true,responsible})
                expect(reducer.$('#1.1').length).toBe(0)
                expect(reducer.file.getNode('1.1')).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("<p/><p>|</p>",()=>{
                const {reducer,composer,responsible,doc}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"text",parent:"2"},
                })
                reducer.cursorAt("2.1",0)
                composer.prevCursorable=jest.fn(()=>({id:"1",at:1}))
                composer.nextCursorable=jest.fn(()=>{
                    expect(reducer.selection).toMatchObject({start:{id:"1",at:1}})
                    return {id:"2.1",at:0}
                })
                reducer.remove({backspace:true,responsible})
                expect(reducer.$('#2').length).toBe(0)
                expect(reducer.file.getNode('2')).toBeFalsy()
                expect(reducer.$('#1').children().toArray()).toMatchObject(["1.1","2.1"])
                expect(reducer.selection).toMatchObject({start:{id:"2.1",at:0},end:{id:"2.1",at:0}})
            })
        })

        describe("selection",()=>{
            it("t(ex)t",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"text",parent:"1"}
                })
                reducer.cursorAt("1.1",1,"1.1",3)
                composer.nextCursorable=jest.fn(()=>({id:"1",at:1}))
                reducer.remove({responsible})
                expect(reducer.$('#1.1').text()).toBe("tt")
                expect(reducer.file.getNode('1.1').children).toBe("tt")
                expect(reducer.selection).toMatchObject({start:{id:"1.1",at:1},end:{id:"1.1",at:1}})
            })

            it("t(ext)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1.1",1,"1.2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:3}))
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1.1').text()).toBe("t")
                expect(reducer.file.getNode('1.1').children).toBe("t")
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("t(extHe)llo",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1.1",1,"1.2",2)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})
                const texts=reducer.$('text')
                expect(texts.length).toBe(2)

                expect(reducer.$('#1.1').text()).toBe("t")
                expect(reducer.file.getNode('1.1').children).toBe("t")
                const cursor=texts.eq(1)
                expect(cursor.text()).toBe("llo")
                expect(reducer.file.getNode(cursor.attr('id')).children).toBe("llo")
                const id=cursor.attr('id')
                expect(reducer.selection).toMatchObject({start:{id,at:0},end:{id,at:0}})
            })

            it("(text)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"text",children:"text",parent:"1"},
                    "1.2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1.1",0,"1.2",0)
                composer.prevCursorable=jest.fn(()=>({id:"1.1",at:3}))
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1.1').text()).toBe("")
                expect(reducer.file.getNode('1.1').children).toBe("")
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })

            it("(Image)Hello",()=>{
                const {reducer,composer,responsible}=test({
                    "1":{type:"paragraph",children:["1.1","1.2"]},
                    "1.1":{type:"image",parent:"1"},
                    "1.2":{type:"text",children:"hello",parent:"1"}
                })
                reducer.cursorAt("1.1",0,"1.1",1)
                composer.nextCursorable=jest.fn(()=>({id:"1.2",at:0}))
                reducer.remove({responsible})

                expect(reducer.$('#1.1').length).toBe(0)
                expect(reducer.file.getNode('1.1')).toBeFalsy()
                expect(reducer.selection).toMatchObject({start:{id:"1.2",at:0},end:{id:"1.2",at:0}})
            })
        })
    })


    describe("create",()=>{
        it("image on |text",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1.1"]},
                "1.1":{type:"text",children:"hello",parent:"1"}
            })
            reducer.cursorAt("1.1",0)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.length).toBe(2)
            expect(children.eq(0).attr('type')).toBe("image")
            expect(children.eq(1).text()).toBe("hello")
            const cursor={id:children.eq(0).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })

        it("image on T|ext",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1.1"]},
                "1.1":{type:"text",children:"hello",parent:"1"}
            })
            reducer.cursorAt("1.1",1)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.eq(0).text()).toBe("h")
            expect(children.eq(2).text()).toBe("ello")
            expect(children.eq(1).attr('type')).toBe("image")
            const cursor={id:children.eq(1).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })

        it("image on T(ex)t",()=>{
            const {reducer}=test({
                "1":{type:"paragraph",children:["1.1"]},
                "1.1":{type:"text",children:"Text",parent:"1"}
            })
            reducer.cursorAt("1.1",1,"1.1",3)
            reducer.create({type:'image'})
            const children=reducer.$('#1').children()
            expect(children.eq(0).text()).toBe("T")
            expect(children.eq(2).text()).toBe("t")
            expect(children.eq(1).attr('type')).toBe("image")
            const cursor={id:children.eq(1).attr('id'),at:0}
            expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
        })
    })

    describe("insert",()=>{
        describe("text",()=>{
			describe("on text",()=>{
				it("hello =>h|ello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.1"]},
						"1.1":{type:"text",children:"hello",parent:"1"}
					})
					reducer.cursorAt("1.1",1)
					reducer.insert("hello")
					expect(reducer.$('#1.1').text()).toBe("hhelloello")
					expect(reducer.file.getNode('1.1').children).toBe("hhelloello")
					const cursor={id:"1.1",at:1+5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})


				it("hello =>h(el)lo",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.1"]},
						"1.1":{type:"text",children:"hello",parent:"1"}
					})
					reducer.cursorAt("1.1",1,"1.1",3)
					reducer.insert("hello")

					expect(reducer.$(`#${1.1}`).text()).toBe("hhellolo")
					expect(reducer.file.getNode('1.1').children).toBe("hhellolo")
					const cursor={id:"1.1",at:1+5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello => h(ello</>Te)xt",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.1","1.2"]},
						"1.1":{type:"text",children:"hello",parent:"1"},
						"1.2":{type:"text",children:"Text",parent:"1"},
					})
					reducer.cursorAt("1.1",1,"1.2",2)
					reducer.insert("hello")

					expect(reducer.$('text').length).toBe(2)

					expect(reducer.$(`#${1.1}`).text()).toBe("h")
					expect(reducer.file.getNode('1.1').children).toBe("h")
					expect(reducer.$('#1.2').text()).toBe("helloxt")
					expect(reducer.file.getNode('1.2').children).toBe("helloxt")

					const cursor={id:"1.2",at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello\\rworld=>t|ext",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.1"]},
						"1.1":{type:"text",children:"text",parent:"1"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1.1",1)
					reducer.insert("hello\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(1)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('worldext')
				})

				it("hello\\rmy\\rworld=>t|ext",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.1"]},
						"1.1":{type:"text",children:"text",parent:"1"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1.1",1)
					reducer.insert("hello\rmy\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(2)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('my')
					expect(p1.eq(2).find('text').text()).toBe('worldext')
				})

                it("hello\\rmy\\rworld=>t|ext with structure",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.0"]},
                        "1.0":{type:"run", children:["1.1"],parent:"1"},
						"1.1":{type:"text",children:"text",parent:"1.0"},
					})
					const p0=reducer.$('paragraph')
					reducer.cursorAt("1.1",1)
					reducer.insert("hello\rmy\rworld")
					const p1=reducer.$('paragraph')
					expect(p1.length-p0.length).toBe(2)
					expect(p1.eq(0).find('text').text()).toBe('thello')
					expect(p1.eq(1).find('text').text()).toBe('my')
					expect(p1.eq(2).find('text').text()).toBe('worldext')

                    p1.toArray().forEach(p=>expect(reducer.$('#'+p).find('run').length).toBe(1))
				})
			})

			describe("at object beginning",()=>{
				it("hello=>|imageHello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.0","1.1"]},
						"1.0":{type:"image",parent:"1"},
						"1.1":{type:"text",children:"hello",parent:"1"},
					})
					reducer.cursorAt("1.0",0)
					reducer.insert("hello")
					const texts=reducer.$('text')
					expect(texts.length).toBe(2)
					expect(texts.eq(0).text()).toBe("hello")
					expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1.0","1.1"])
					const cursor={id:texts.eq(0).attr('id'),at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})

				it("hello=>|<shape/>Hello",()=>{
					const {reducer}=test({
						"1":{type:"paragraph",children:["1.0","1.1"]},
						"1.0":{type:"shape",parent:"1"},
						"1.1":{type:"text",children:"hello",parent:"1"},
					})
					reducer.cursorAt("1.0",0)
					reducer.insert("hello")
					const texts=reducer.$('text')
					expect(texts.length).toBe(2)
					expect(texts.eq(0).text()).toBe("hello")
					expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1.0","1.1"])
					const cursor={id:texts.eq(0).attr('id'),at:5}
					expect(reducer.selection).toMatchObject({start:cursor,end:cursor})
				})
			})

            describe("at end of paragraph",()=>{
                it("h=><p><text>hello|</text></p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                    })

                    reducer.cursorAt("1.1",5)
                    reducer.insert("a")
                    expect(reducer.$('#1.1').text()).toBe("helloa")
                    expect(reducer.selection).toMatchObject({start:{id:"1.1",at:6}})
                })

                it("h=><p>hello|</p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                    })

                    reducer.cursorAt("1",1)
                    reducer.insert("a")
                    expect(reducer.$('#1.1').text()).toBe("helloa")
                    expect(reducer.selection).toMatchObject({start:{id:"1.1",at:6}})
                })

                it("** h=><p><image>|</p>",()=>{
                    const {reducer,selection}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"image",parent:"1"}
                    })

                    reducer.cursorAt("1",1)
                    reducer.insert("a")
                    const text=reducer.$('text')
                    expect(text.length).toBe(1)
                    expect(text.text()).toBe("a")
                    //expect(reducer.$('#1').children().toArray()).toMatchObject(["1.1",text.attr('id')])
                    expect(reducer.selection).toMatchObject({start:{id:text.attr('id'),at:1}})
                })
            })
        })

        describe("contents",()=>{
            describe('at beginning',()=>{
                it("<t>hello</t> -> |Text",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"text",children:"text",parent:"1"},
                    })
                    reducer.cursorAt("1.1",0)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(2)
                    expect(texts.eq(0).text()).toBe("hello")
                    expect(texts.eq(1).text()).toBe("text")
                })

                it("<t>hello</t> -> |<image/>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"image",parent:"1"},
                    })
                    reducer.cursorAt("1.1",0)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(1)
                    expect(reducer.$('#1').children().toArray()).toMatchObject([texts.eq(0).attr('id'),"1.1"])
                })
            })

            describe("inline text",()=>{
                it("<t>hello</t> -> <t>T|ext</t>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"text",children:"text",parent:"1"},
                    })
                    reducer.cursorAt("1.1",1)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(3)
                    expect(texts.eq(0).text()).toBe("t")
                    expect(texts.eq(1).text()).toBe("hello")
                    expect(texts.eq(2).text()).toBe("ext")
                })

                it("<t>hello</t> -> <r><t>T|ext</t></r>",()=>{
                    const {reducer}=test({
                        "1":{type:"paragraph",children:["1.1"]},
                        "1.1":{type:"run",children:["1.1.1"],parent:"1"},
                        "1.1.1":{type:"text",children:"text",parent:"1.1"},
                    })
                    reducer.cursorAt("1.1.1",1)
                    reducer.insert([{type:"text",children:"hello"}])
                    const texts=reducer.$('#1 text')
                    expect(texts.length).toBe(3)
                    expect(texts.eq(0).text()).toBe("t")
                    expect(texts.eq(1).text()).toBe("hello")
                    expect(texts.eq(2).text()).toBe("ext")
                    expect(reducer.$('#1 run').length).toBe(2)
                })
            })
        })

    })

    describe("update",()=>{
        describe("text",()=>{
            it("cursor",()=>{
                const {reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                })

                reducer.cursorAt("1.1",1)
                reducer.update({text:{size:5}})
                expect(reducer.$('#1.1').attr('size')).toBe(5)
                expect(reducer.selection).toMatchObject(selection)
            })

            it("inline text selection",()=>{
                const {reducer,selection}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}}
                })

                reducer.cursorAt("1.1",1,"1.1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(3)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}})
            })

            it("cross text selection",()=>{
                const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1.1",1,"2.1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(4)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(5)
                expect(texts.eq(3).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}, end:{id:texts.eq(2).attr('id'),at:3}})
            })

			it("textImagetext",()=>{
				const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2","1.3"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1.2":{type:"image",parent:"1"},
					"1.3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1.1",1,"2.1",3)
                reducer.update({text:{size:5}})
                const texts=reducer.$('text')
                expect(texts.length).toBe(5)
                expect(texts.eq(0).attr('size')).toBe(1)
                expect(texts.eq(1).attr('size')).toBe(5)
                expect(texts.eq(2).attr('size')).toBe(5)
                expect(texts.eq(3).attr('size')).toBe(5)
                expect(texts.eq(4).attr('size')).toBe(1)

                expect(reducer.selection).toMatchObject({start:{id:texts.eq(1).attr('id'),at:0}, end:{id:texts.eq(3).attr('id'),at:3}})
			})
			it("<paragraph/>",()=>{
				const {reducer}=test({
                    "1":{type:"paragraph",children:["1.1","1.2","1.3"]},
                    "1.1":{type:"text",children:"hello",parent:"1",props:{size:1}},
					"1.2":{type:"image",parent:"1"},
					"1.3":{type:"text",children:"hello",parent:"1",props:{size:2}},

                    "2":{type:"paragraph",children:["2.1"]},
                    "2.1":{type:"text",children:"hello",parent:"2",props:{size:1}},
                })

                reducer.cursorAt("1",0,"1",1)
                reducer.update({text:{size:5}})
                expect(reducer.$('#1 text').length).toBe(2)
                expect(reducer.$('#1.1').attr('size')).toBe(5)
                expect(reducer.$('#1.3').attr('size')).toBe(5)
                expect(reducer.$('#2.1').attr('size')).toBe(1)
                expect(reducer.selection).toMatchObject({start:{id:"1",at:0},end:{id:"1",at:1}})
			})
        })
    })
})
