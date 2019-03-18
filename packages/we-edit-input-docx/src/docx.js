import docx4js from "docx4js"
import Fetchable from "fetchable"
import {transactifyCheerio} from "we-edit"
export default class Document extends docx4js{
	static get URL(){
		if(!this.__cachedData){
			this.__cachedData=new Fetchable("docx-memory")
		}
		return this.__cachedData
	}

	createObjectURL(data,type){
		return Document.URL.createObjectURL(...arguments)
	}

	revokeObjectURL(url){
		return Document.URL.revokeObjectURL(...arguments)
	}

	getDataPartAsUrl(name,type="*/*"){
		let part=this.parts[name]
		let crc32=part._data.crc32
		if(!this._shouldReleased.has(crc32)){
			this._shouldReleased.set(crc32,this.createObjectURL(this.getDataPart(name),type))
		}
		return this._shouldReleased.get(crc32)
	}

	release(){
		for(let [, url] of this._shouldReleased){
			this.revokeObjectURL(url)
		}
	}

	startTransaction(){
		this.officeDocument.content.startTransaction()
		this.officeDocument.numbering.startTransaction()
		this.officeDocument.styles.startTransaction()
	}

	commit(){
		return {
			content:this.officeDocument.content.commit(),
			numbering:this.officeDocument.numbering.commit(),
			styles:this.officeDocument.styles.commit()
		}
	}

	rollback(){
		this.officeDocument.content.rollback()
		this.officeDocument.numbering.rollback()
		this.officeDocument.styles.rollback()
	}

	static OfficeDocument=class extends docx4js.OfficeDocument{
		_init(){
			super._init(...arguments)
			if(!this.numbering){
				this.addNumberingPart()
			}

			const trap={
				save(action){

				},
				patch(patches){

				}
			}

			transactifyCheerio(this.content,trap)
			transactifyCheerio(this.numbering,trap)
			transactifyCheerio(this.styles,trap)
		}

		addNumberingPart(){
			const rId=this.add(
				"http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",
				"numbering.xml",
				`<?xml version="1.0" encoding="UTF-8"?>
				<w:numbering xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:cx6="http://schemas.microsoft.com/office/drawing/2016/5/12/chartex" xmlns:cx7="http://schemas.microsoft.com/office/drawing/2016/5/13/chartex" xmlns:cx8="http://schemas.microsoft.com/office/drawing/2016/5/14/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink" xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se w16cid wp14">
				</w:numbering>`.replace(/>\s+/g,">").replace(/\s+</g,"<")
			)
			Object.defineProperty(this,"numbering",{
				get(){
					return this.getRelObject("numbering.xml")
				}
			})
		}
	}
}
