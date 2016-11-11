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

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = function (_Group) {
	(0, _inherits3.default)(Line, _Group);

	function Line() {
		(0, _classCallCheck3.default)(this, Line);
		return (0, _possibleConstructorReturn3.default)(this, (Line.__proto__ || (0, _getPrototypeOf2.default)(Line)).apply(this, arguments));
	}

	(0, _createClass3.default)(Line, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    height = _props.height,
			    descent = _props.descent;

			return _react2.default.createElement(_group2.default, (0, _extends3.default)({ y: height - descent }, this.props));
		}
	}]);
	return Line;
}(_group2.default);

exports.default = Line;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9saW5lLmpzIl0sIm5hbWVzIjpbIkxpbmUiLCJwcm9wcyIsImhlaWdodCIsImRlc2NlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7OzsyQkFDWjtBQUFBLGdCQUNpQixLQUFLQyxLQUR0QjtBQUFBLE9BQ0FDLE1BREEsVUFDQUEsTUFEQTtBQUFBLE9BQ1FDLE9BRFIsVUFDUUEsT0FEUjs7QUFFUCxVQUFPLHdFQUFPLEdBQUdELFNBQU9DLE9BQWpCLElBQThCLEtBQUtGLEtBQW5DLEVBQVA7QUFDQTs7Ozs7a0JBSm1CRCxJIiwiZmlsZSI6ImxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmUgZXh0ZW5kcyBHcm91cHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiA8R3JvdXAgeT17aGVpZ2h0LWRlc2NlbnR9IHsuLi50aGlzLnByb3BzfS8+XHJcblx0fVxyXG59XHJcbiJdfQ==