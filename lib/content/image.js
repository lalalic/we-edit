"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function (_NoChild) {
    (0, _inherits3.default)(Image, _NoChild);

    function Image() {
        (0, _classCallCheck3.default)(this, Image);
        return (0, _possibleConstructorReturn3.default)(this, (Image.__proto__ || (0, _getPrototypeOf2.default)(Image)).apply(this, arguments));
    }

    (0, _createClass3.default)(Image, [{
        key: "createComposed2Parent",
        value: function createComposed2Parent() {
            var _props = this.props,
                src = _props.src,
                _props$extent = _props.extent,
                width = _props$extent.width,
                height = _props$extent.height,
                others = (0, _objectWithoutProperties3.default)(_props, ["src", "extent"]);

            var availableSpace = this.context.parent.nextAvailableSpace({ width: width, height: height });
            return _react2.default.createElement("image", {
                width: width,
                height: height,
                xlinkHref: src,
                y: -height
            });
        }
    }]);
    return Image;
}(_any.NoChild);

Image.displayName = "image";
exports.default = Image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ltYWdlLmpzIl0sIm5hbWVzIjpbIkltYWdlIiwicHJvcHMiLCJzcmMiLCJleHRlbnQiLCJ3aWR0aCIsImhlaWdodCIsIm90aGVycyIsImF2YWlsYWJsZVNwYWNlIiwiY29udGV4dCIsInBhcmVudCIsIm5leHRBdmFpbGFibGVTcGFjZSIsInhsaW5rSHJlZiIsInkiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztJQUVxQkEsSzs7Ozs7Ozs7OztnREFFTTtBQUFBLHlCQUMyQixLQUFLQyxLQURoQztBQUFBLGdCQUNaQyxHQURZLFVBQ1pBLEdBRFk7QUFBQSx1Q0FDUEMsTUFETztBQUFBLGdCQUNDQyxLQURELGlCQUNDQSxLQUREO0FBQUEsZ0JBQ09DLE1BRFAsaUJBQ09BLE1BRFA7QUFBQSxnQkFDbUJDLE1BRG5COztBQUVuQixnQkFBSUMsaUJBQWUsS0FBS0MsT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxrQkFBcEIsQ0FBdUMsRUFBQ04sWUFBRCxFQUFPQyxjQUFQLEVBQXZDLENBQW5CO0FBQ0EsbUJBQU8sdUNBQVc7QUFDVkQsNEJBRFU7QUFFVkMsOEJBRlU7QUFHVk0sMkJBQVdULEdBSEQ7QUFJVlUsbUJBQUUsQ0FBQ1A7QUFKTyxhQUFYLENBQVA7QUFNSDs7Ozs7QUFYZ0JMLEssQ0FDVmEsVyxHQUFZLE87a0JBREZiLEsiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2UgZXh0ZW5kcyBOb0NoaWxke1xyXG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwiaW1hZ2VcIlxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XHJcbiAgICAgICAgY29uc3Qge3NyYywgZXh0ZW50Ont3aWR0aCxoZWlnaHR9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgICBsZXQgYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2Uoe3dpZHRoLGhlaWdodH0pXHJcbiAgICAgICAgcmV0dXJuIDxpbWFnZSB7Li4ue1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB4bGlua0hyZWY6IHNyYyxcclxuICAgICAgICAgICAgICAgIHk6LWhlaWdodFxyXG4gICAgICAgICAgICB9fSAvPlxyXG4gICAgfVxyXG59XHJcbiJdfQ==