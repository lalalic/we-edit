import React,{PureComponent} from "react"
import PropTypes from "prop-types"

import {AutoComplete} from "material-ui"
import IconMore from 'material-ui/svg-icons/navigation/arrow-drop-down'

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
			if(found){
				return found[kText]+""
			}else{
				return ""
			}
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
		let {name=`_${Date.now()}`, value, onChange, onException, style, menuProps={}, 
			textFieldStyle, inputStyle, children,icon=children, ...props}=this.props
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
		
		if(inputStyle && inputStyle.border){
			inputStyle.paddingRight=6
			
		}
		
		if(!icon){
			icon=(<IconMore 
					style={{height:textFieldStyle.height-4,width:6}} 
					viewBox="6 -20 18 28" 
					/>)
		}

		return (
			<span>
				<AutoComplete
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
					inputStyle={inputStyle}
					textFieldStyle={textFieldStyle}
					{...props} />
					{icon}
			</span>
		)
	}

	componentWillReceiveProps(next){
		if(this.props.value!=next.value){
			this.setState({searchText:this.getText(next)})
		}
	}
}

export default ComboBox
