import ReactDOMServer from "react-dom/server"
import Pagination from "model/pagination"
import Native from "input/native"
import Input from "input"

Input.support(Native)

export function compose(file){
	return Input.load(file)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}


export {default as Input} from "input"