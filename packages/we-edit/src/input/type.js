import React from "react"
import PropTypes from "prop-types"

import uuid from "../tools/uuid"
import Reducer from "./reducer"

import {getSelection} from "../state/selector"
import {selection} from "../state/reducer"

const a_table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
const b_table = a_table.split(' ').map(function(s){ return parseInt(s,16) });
					
export class Viewable{
	static get isWeEditType(){
		return true
	}

	static support(file){
		return false
	}

	static propTypes={
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		ext: PropTypes.string.isRequired,
		mimeType: PropTypes.string.isRequired
	}

	static getType(){
		return this.defaultProps.type
	}

	static getTypeName(){
		return this.defaultProps.name
	}

	static getTypeExt(){
		return this.defaultProps.ext
	}

	static getTypeMimeType(){
		return this.defaultProps.mimeType
	}

	get name(){
		return this.props && this.props.name
	}

	get type(){
		return this.getType()
	}

	get typeName(){
		return this.getTypeName()
	}

	get typeExt(){
		return this.getTypeExt()
	}

	get mimeType(){
		return this.getTypeMimeType()
	}

	getType(){
		return this.constructor.getType()
	}

	getTypeName(){
		return this.constructor.getTypeName()
	}

	getTypeExt(){
		return this.constructor.getTypeExt()
	}

	getTypeMimeType(){
		return this.constructor.getTypeMimeType()
	}

	isTypeOf(InputType){
		return this instanceof InputType
	}

	editable(){
		return false
	}

	_loadString(data){
		if(typeof(data)=="string")
			return data
		if(data instanceof Blob)
			return data.text()
		return Buffer.from(data).toString()
	}

	//////////////////

	/**
	 * To make id for each content, so it can be searched and located during layouting
	 * number|string:[^[],:<>+~*#.!]{.*}, check content-id.validateId
	 * @param {*} node 
	 * @param {*} rootId 
	 * @param {*} nodeId 
	 * @returns 
	 */
	makeId(node, rootId, nodeId){
		return (this.props?.makeId||uuid)()
	}

	//doc=null//injected from load/create
	/**
	 * @param {*} param0 
	 * data: document data
	 * reducer: injected reducer
	 * id: injected id
	 * makeId: injected makeId
	 */
	parse({/*data:stream,array,object,...*, reducer, id, makeId,name, ext,type*/ ...props}){
		this.props={...props,supportPagination:true}
		return Promise.reject(new Error("need implementation to parse file {data}"))
	}

	release(){

	}

	/**
	* a higher-order component to transform basic components to your typed components
	* components may be model/html, model/pagination, model/pagination/edit depending on
	* outer component[editor, html, viewer, pagination, plain]
	*/
	transform(components){
		if(this.constructor.HOCs){
			const HOCs=this.constructor.HOCs
			return Object.keys(HOCs).reduce((transformed,k)=>{
				transformed[k]=HOCs[k](components)
				return transformed
			},{...components})
		}
		return {...components}
	}

	/**
	* render a loaded/created doc, loaded by this._loadFile, with models in domain to a element tree,
	* whose element is created with createElement
	*/
	render(createElement/*(TYPE, props, children, rawcontent)*/,models){
		return "Input.render should be implemented"
	}

	/**
	* []: the fonts array that loaded/created doc uses
	* it's only for <Pagination measure={FontMeasure}/> type
	* it will be called when rendering for pagination output
	* usually you can collect it during render function
	*/
	requiredFonts(contents){
		const Font_Props=this.constructor.Font_Props
		const fonts=new Set()
		contents?.forEach(ele=>{
			Font_Props[ele.get('type')]?.split(",")
				.forEach(prop=>{
					const my=ele.getIn(`props.${prop}`.split("."))
					if(!my)
						return 
					switch(typeof(my)){
						case "string":
							fonts.add(my)
							break
						default:
							Object.values(my.toJS()).forEach(a=>{
								if(typeof(a)=="string"){
									fonts.add(a)
								}
							})
							break
					}
				})
		})
		return Array.from(fonts).filter(a=>!!a)
	}

	static Font_Props={
		text:"fonts",
		paragraph:"defaultStyle.fonts",
	}
}

export class Editable extends Viewable{
	static Reducer=Reducer

	editable(){
		return true
	}

	stream(option){
		throw new Error("not support")
	}

	renderNode(node, createElement/*(TYPE, props, children, rawcontent)*/,models){

	}

	startTransaction(){
		if(this.doc.startTransaction){
			return this.doc.startTransaction(...arguments)
		}
	}

	commit(){
		if(this.doc.commit){
			return this.doc.commit(...arguments)
		}
	}

	rollback(){
		if(this.doc.rollback){
			this.doc.rollback(...arguments)
		}
	}

	_crc32(buffer){
		const isString=typeof(buffer)=="string"
		const data=i=>isString?buffer.charCodeAt(i):buffer[i]
		let crc = -1;
		for(let i=0, iTop=buffer.length; i<iTop; i++) {
			crc = ( crc >>> 8 ) ^ b_table[( crc ^ data(i)) & 0xFF];
		}
		return (crc ^ (-1)) >>> 0;
	}

	/**
	 * ** must keep content id
	 * @param {*} lastPatchStatus 
	 * @returns {status, patch:[{target, op:[replace|append|before|after], data}]}
	 */
	getPatch(lastPatchStatus){
		const stream=this.stream()
		return new Promise((resolve,reject)=>{
			const data=[]
			stream.on('readable',()=>{
				let chunk
				while(null!=(chunk=stream.read())){
					data.push(chunk)
				}
			})
			stream.on('end',()=>{
				let buffer=data[0]
				if(data.length>1){
					buffer=new Uint8Array(data.reduce((c,a)=>c+a.length,0))
					data.reduce((l,a)=>(buffer.set(a,l),l+a.length),0)
				}
				resolve(buffer)
			})
		})
		.then(data=>{
			const current=this._crc32(data)
			if(!lastPatchStatus || lastPatchStatus!=current){
				return {status:current, patch:[{target:'*', data}]}
			}
		})
	}

	/**
	*return:
	- false: no state change
	- {
		selection: change of selection,
		updated: updated content,
		undoables: saved changed content for history
	}: all these changes will be applied on state
	- any else: reduce selection action
	*/
	onChange(state,action){
		const {type,payload}=action
		const params=[state]
		const Reducer=this.constructor.Reducer
		const reducer=new Reducer(...params)
		switch(type){
			case `we-edit/CLOSE`:
				this.doc.release?.()
				return false
			case `we-edit/init`:
				reducer.init(payload)
				break
			case `we-edit/text/TYPE`:
				reducer.type(payload)
				break
			case `we-edit/text/DELETE`:
				reducer.delete(payload)
				break
			case `we-edit/text/BACKSPACE`:
				reducer.backspace(payload)
				break
			case `we-edit/text/TAB`:
				reducer.tab(payload)
				break
			case `we-edit/text/ENTER`:
				reducer.enter(payload)
				break
			case `we-edit/text/CONTROL`:
				reducer.control(payload)
				break
			case "we-edit/entity/CREATE":
				reducer.create(payload)
				break
			case "we-edit/entity/UPDATE":
				reducer.update(payload)
				break	
			case `we-edit/selection/UPDATE`:
				reducer.update(payload)
				break
			case 'we-edit/selection/COPY':
				reducer.copy(payload)
				break
			case 'we-edit/selection/PASTE':
				reducer.paste(payload)
				break
			case 'we-edit/selection/CUT':
				reducer.cut(payload)
				break
			case "we-edit/selection/MOVE":
				reducer.move(payload)
				break
			case "we-edit/selection/REMOVE":
				reducer.remove(payload)
				break
			case "we-edit/selection/EXTEND":
				reducer.extend(payload)
				break
			case "we-edit/selection/SELECTED":
				const {start, end, page}=selection(getSelection(state),action)
				reducer.cursorAt(start.id, start.at, end.id, end.at, page)
				break
			case "we-edit/selection/SEARCH":
				reducer.search(payload)
				break
			case "we-edit/selection/REPLACE":
				reducer.replace(payload)
				break

			case "we-edit/history/UNDO":
				reducer.undo(payload)
				break
			case "we-edit/cursor/FORWARD":
				reducer.forward(payload)
				break
			case "we-edit/cursor/BACKWARD":
				reducer.backward(payload)
				break
			case "we-edit/workers/merge":
				reducer.merge(payload)
				break
			case "we-edit/workers/push":
				reducer.push(payload)
				break
			case "we-edit/collaborative/conflict":
				return reducer.conflict(payload)
			default:
				return true
		}
		return reducer.state()
	}
}

export default Editable
