import Unknown from "./component"
import PropTypes from "prop-types"

export default class Container extends Unknown{
    static displayName="container"
    static propTypes={
        type: PropTypes.string,
    }
}
