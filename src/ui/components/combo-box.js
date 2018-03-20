import React,{PureComponent} from "react"
import PropTypes from "prop-types"

import {AutoComplete} from "material-ui"

export class ComboBox extends PureComponent{
	static contextTypes={
		muiTheme: PropTypes.object,
	}
	state={searchText:this.getText(this.props)}

	isObjectData(props){
		const {dataSource:[first]}=props||this.props
		return typeof(first)=="object"
	}

	getText(props){
		const {dataSource, value, dataSourceConfig}=props||this.props
		const {text:kText,value:kValue}=dataSourceConfig||{ text: 'text', value: 'value',}
		if(this.isObjectData(props)){
			let found=dataSource.find(a=>a[kValue]==value)
			return found[kText]+""
		}else{
			return value+""
		}
	}

	getIndex(text){
		const {dataSource, dataSourceConfig}=this.props
		const {text:kText,value:kValue}=dataSourceConfig||{ text: 'text', value: 'value',}
		if(this.isObjectData()){
			return dataSource.findIndex(a=>a[kText]==text)
		}else{
			return dataSource.indexOf(text)
		}
	}

	getValue(index){
		const {dataSource, dataSourceConfig}=this.props
		const {text:kText,value:kValue}=dataSourceConfig||{ text: 'text', value: 'value',}
		if(this.isObjectData()){
			return dataSource[index][kValue]
		}else{
			return dataSource[index]
		}
	}

	render(){
		let {comboBox}=this.context.muiTheme
		let {name=`_${Date.now()}`, value, onChange, onException, style, menuProps={}, textFieldStyle, ...props}=this.props
		let text=this.getText()
		let {searchText}=this.state
		if(comboBox && comboBox.height){
			if(!style){
				style={height:comboBox.height}
			}else if(!style.height){
				style.height=comboBox.height
			}
		}

		if(comboBox && comboBox.textFieldStyle){
			textFieldStyle={...comboBox.textFieldStyle,...textFieldStyle}
		}

		if(comboBox && comboBox.menu){
			menuProps={...comboBox.menu,...menuProps}
		}

		if(style){
			if(!textFieldStyle){
				textFieldStyle={}
			}
			if(style.width && !textFieldStyle.width){
				textFieldStyle.width=style.width
			}

			if(style.height && !textFieldStyle.height){
				textFieldStyle.height=style.height
			}

			if(menuProps.style && !menuProps.style.width && style.width)
				menuProps.style={...menuProps.style, width:style.width}
		}

		return <AutoComplete
			name={name}
			searchText={searchText}
			menuProps={menuProps}
			onNewRequest={
				(selected, index)=>{
					if(-1==index && selected){//enter
						index=this.getIndex(selected)
					}

					if(-1!=index){
						onChange && onChange(this.getValue(index))
					}else if(selected){
						onException && onException(selected)
					}
				}
			}

			onUpdateInput={
				(searchText, dataSource)=>{
					this.setState({searchText})
				}
			}

			onClose={()=>this.setState({searchText:text})}

			filter={
				(searchText,key)=>{
					if(searchText!=text){
						return key.indexOf(searchText)!=-1
					}else{
						return true
					}
				}
			}
			openOnFocus={true}
			style={style}
			textFieldStyle={textFieldStyle}
			{...props} />
	}

	componentWillReceiveProps(next){
		if(this.props.value!=next.value){
			this.setState({searchText:this.getText(next)})
		}
	}
}

export default ComboBox
