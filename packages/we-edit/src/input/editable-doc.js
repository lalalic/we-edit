/**
* concepts:
	node: content node
	element: state element, {type, props, id, parent}
*
*/
export default class {
	/*create/asign uid for node*/
	makeId(node,id){
		
	}
	
	/*find node by id*/
	getNode(id){
		
	}
	
	/*clone node without all ids*/
	cloneNode(node, autoAttach=true){
		
	}
	
	createNode(element, reducer){
		
	}
	
	updateNode(element, changing, query){
		
	}
	
	removeNode(element){
		
	}

	insertNodeBefore(newNode,referenceNode,parentNode){
		
	}
	
	insertNodeAfter(newNode,referenceNode,parentNode){
		
	}
	
	construct(fromId,toId){
		
	}
	
	toString(id){
		return `[${id}]`
	}
}