import ReactDOMServer from "react-dom/server"
import Pagination from "model/pagination"
import Input from "input"

export function compose(input){
	return Input.load(input)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}