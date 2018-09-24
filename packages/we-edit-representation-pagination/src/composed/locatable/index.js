import Document from "../document"

import locatableDocument from "./document"

const isDocument=A=>A==Document
export default function locatable(A){
	if(isDocument(A)){
		return locatableDocument(A)
	}else{
		return A
	}
}
