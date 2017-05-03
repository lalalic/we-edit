import ReactDOMServer from "react-dom/server"
import Pagination from "model/pagination"
import Input from "input"

export function compose(file){
	return Input.load(file)
		.then(doc=>ReactDOMServer.renderToStaticMarkup(doc.render(Pagination)))
}