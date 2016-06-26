"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
    _inherits(Document, _HasChild);

    function Document() {
        _classCallCheck(this, Document);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
    }

    _createClass(Document, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("svg", this.props);
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;

            return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
                canvas: { width: width, height: height }
            });
        }
    }]);

    return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
    canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUFPLHFDQUFTLEtBQUssS0FBTCxDQUFoQixDQURJOzs7OzBDQUlTO3lCQUNRLEtBQUssS0FBTCxDQURSO2dCQUNOLHFCQURNO2dCQUNBLHVCQURBOztBQUViLG1CQUFPLE9BQU8sTUFBUCw0QkFQTSx3REFPTixFQUFzQztBQUN6Qyx3QkFBUSxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVI7YUFERyxDQUFQLENBRmE7Ozs7V0FMQTs7O1NBWVYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLFlBQVEsaUJBQVUsTUFBVjtDQURhLEVBRXZCLGNBQVMsaUJBQVQ7a0JBZGUiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8c3ZnIHsuLi50aGlzLnByb3BzfS8+XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgY2FudmFzOiB7d2lkdGgsaGVpZ2h0fVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcbn1cbiJdfQ==