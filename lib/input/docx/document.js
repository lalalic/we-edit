"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _document = require("../../content/document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Document) {
    (0, _inherits3.default)(_class, _Document);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: "getChildContext",
        value: function getChildContext() {
            var styles = this.props.styles;
            var directStyle = this.props.directStyle;


            return (0, _extends3.default)({}, (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "getChildContext", this).call(this), {
                getDefaultStyle: function getDefaultStyle(type) {
                    return styles.getDefault(type == 'inline' ? "character" : type);
                },
                inheritedStyle: directStyle
            });
        }
    }]);
    return _class;
}(_document2.default);

_class.childContextTypes = (0, _extends3.default)({}, _document2.default.childContextTypes, {
    getDefaultStyle: _react.PropTypes.func,
    inheritedStyle: _react.PropTypes.object
});
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbInN0eWxlcyIsInByb3BzIiwiZGlyZWN0U3R5bGUiLCJnZXREZWZhdWx0U3R5bGUiLCJnZXREZWZhdWx0IiwidHlwZSIsImluaGVyaXRlZFN0eWxlIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OzswQ0FTcUI7QUFDYixnQkFBTUEsU0FBTyxLQUFLQyxLQUFMLENBQVdELE1BQXhCO0FBRGEsZ0JBRU5FLFdBRk0sR0FFTyxLQUFLRCxLQUZaLENBRU5DLFdBRk07OztBQUliO0FBRUlDLGlDQUFpQjtBQUFBLDJCQUFNSCxPQUFPSSxVQUFQLENBQWtCQyxRQUFNLFFBQU4sR0FBaUIsV0FBakIsR0FBK0JBLElBQWpELENBQU47QUFBQSxpQkFGckI7QUFHSUMsZ0NBQWVKO0FBSG5CO0FBS0g7Ozs7O09BZk1LLGlCLDhCQUNBLG1CQUFTQSxpQjtBQUNaSixxQkFBaUIsaUJBQVVLLEk7QUFDM0JGLG9CQUFnQixpQkFBVUciLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgRG9jdW1lbnQgZnJvbSBcIi4uLy4uL2NvbnRlbnQvZG9jdW1lbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIERvY3VtZW50e1xuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG4gICAgICAgIC4uLkRvY3VtZW50LmNoaWxkQ29udGV4dFR5cGVzLFxuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCBzdHlsZXM9dGhpcy5wcm9wcy5zdHlsZXNcbiAgICAgICAgY29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmdldENoaWxkQ29udGV4dCgpLFxuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiB0eXBlPT5zdHlsZXMuZ2V0RGVmYXVsdCh0eXBlPT0naW5saW5lJyA/IFwiY2hhcmFjdGVyXCIgOiB0eXBlKSxcbiAgICAgICAgICAgIGluaGVyaXRlZFN0eWxlOmRpcmVjdFN0eWxlXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=