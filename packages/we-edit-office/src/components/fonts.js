import React, {Component} from "react"
import {Popover} from "material-ui"
import {Menu, MenuItem} from "./menu"

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

export default class FontList extends Component{
	constructor(){
		super(...arguments)
		this.state={fonts:[]}
		this.close=this.close.bind(this)
		this.menu=React.createRef()
		this.container=React.createRef()
	}

	componentDidMount(){
		document?.addEventListener("fontLoaded",this.fontListener=e=>{
			this.setState({fonts:Array.from(e?.detail?.fonts||document.fonts||[])})
		})

		this.fontListener()
	}

	componentWillUnmount(){
		document?.removeEventListener("fontLoaded",this.fontListener)
	}

	render(){
		const {props:{value="", onChange,style,...props},state:{open,anchor, filter=value}}=this
		return (
			<span ref={this.container} style={{marginLeft:2,marginRight:2}}>
				<input {...props}
					style={style}
					name="font" 
					value={open?filter:value} 
					autoComplete="off"
					spellCheck="false"
					onFocus={e=>{
						this.setState({open:true})
						e.target.select()
					}}
					onChange={e=>{
						this.setState({filter:e.currentTarget.value})
					}}
					onKeyDown={e=>{
						switch(e.key){
							case 'Escape':
								this.close()
							break
							case 'Enter':
								filter!=value && onChange?.(filter)
							break
						}
					}}
					/>
				{open && <Popover open={true} 
					onRequestClose={this.close}
					anchorEl={this.container.current} 
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          			targetOrigin={{horizontal: 'left', vertical: 'top'}}
					>
					<Menu ref={this.menu}
						onEscKeyDown={this.close}
						disableAutoFocus={true}>
						{this.getMenuItems()}
					</Menu>
				</Popover>}
			</span>
		)
	}

	close(){
		this.setState({open:false, anchor:undefined,filter:undefined})
	}

	getMenuItems(){
		const {state:{fonts, filter},props:{value, onChange}}=this
		return Array.from(new Set(fonts.filter(a=>a.status=="loaded").map(({family})=>family))).sort()
			.reduce((menus, a)=>{
				if(filter && !a.startsWith(filter)){
					return menus
				}
				const last=menus[menus.length-1]
				let item=<MenuItem key={a} primaryText={a} 	
					checked={value===a} 
					insetChildren={true} 
					onClick={e=>{
						onChange?.(a)
						this.close()
					}}
				/>
				if(last && a.startsWith(last.text+" ")){
					item=React.cloneElement(item,{primaryText:a.substr(last.text.length).trim()})
					if(last.value.props.menuItems){
						last.value.props.menuItems.push(item)
						if(item.props.checked){
							last.value=React.cloneElement(last.value,{checked:true})
						}
					}else{
						menus.splice(-1,1,{
							text:last.text, 
							value:React.cloneElement(last.value,{
								checked:item.props.checked,
								rightIcon:<ArrowDropRight />,
								onClick(e){
									e.stopPropagation()
									e.preventDefault()
								},
								menuItems:[React.cloneElement(last.value,{primaryText:"Regular"}),item],
							})
						})
					}
				}else{
					menus.push({text:a, value:item})
				}
				return menus
			},[])
			.map(a=>a.value)
	}
}


