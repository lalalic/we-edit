"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function (_Component) {
	(0, _inherits3.default)(Group, _Component);

	function Group() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Group);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call.apply(_ref, [this].concat(args))), _this), _this.state = { composedTime: new Date().toString() }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Group, [{
		key: "render",
		value: function render() {
			var len = (0, _keys2.default)(this.props).length;
			if (len == 0) return null;else if (len == 1 && _react2.default.Children.count(this.props.children) == 1) {
				return _react2.default.Children.only(_react2.default.Children.toArray(this.props.children)[0]);
			}

			var _props = this.props,
			    x = _props.x,
			    y = _props.y,
			    width = _props.width,
			    height = _props.height,
			    others = (0, _objectWithoutProperties3.default)(_props, ["x", "y", "width", "height"]);

			if (x || y) others.transform = "translate(" + (x || 0) + " " + (y || 0) + ")";
			return _react2.default.createElement("g", (0, _extends3.default)({ x: x, y: y }, others));
		}
	}]);
	return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6WyJHcm91cCIsInN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwibGVuIiwicHJvcHMiLCJsZW5ndGgiLCJDaGlsZHJlbiIsImNvdW50IiwiY2hpbGRyZW4iLCJvbmx5IiwidG9BcnJheSIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJvdGhlcnMiLCJ0cmFuc2Zvcm0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d01BQ3BCQyxLLEdBQU0sRUFBQ0MsY0FBYSxJQUFJQyxJQUFKLEdBQVdDLFFBQVgsRUFBZCxFOzs7OzsyQkFDSztBQUNWLE9BQUlDLE1BQUksb0JBQVksS0FBS0MsS0FBakIsRUFBd0JDLE1BQWhDO0FBQ0EsT0FBR0YsT0FBSyxDQUFSLEVBQ0MsT0FBTyxJQUFQLENBREQsS0FFSyxJQUFHQSxPQUFLLENBQUwsSUFBVSxnQkFBTUcsUUFBTixDQUFlQyxLQUFmLENBQXFCLEtBQUtILEtBQUwsQ0FBV0ksUUFBaEMsS0FBMkMsQ0FBeEQsRUFBMEQ7QUFDOUQsV0FBTyxnQkFBTUYsUUFBTixDQUFlRyxJQUFmLENBQW9CLGdCQUFNSCxRQUFOLENBQWVJLE9BQWYsQ0FBdUIsS0FBS04sS0FBTCxDQUFXSSxRQUFsQyxFQUE0QyxDQUE1QyxDQUFwQixDQUFQO0FBQ0E7O0FBTlMsZ0JBUTBCLEtBQUtKLEtBUi9CO0FBQUEsT0FRTE8sQ0FSSyxVQVFMQSxDQVJLO0FBQUEsT0FRSEMsQ0FSRyxVQVFIQSxDQVJHO0FBQUEsT0FRQUMsS0FSQSxVQVFBQSxLQVJBO0FBQUEsT0FRT0MsTUFSUCxVQVFPQSxNQVJQO0FBQUEsT0FRa0JDLE1BUmxCOztBQVNWLE9BQUdKLEtBQUdDLENBQU4sRUFDQ0csT0FBT0MsU0FBUCxtQkFBOEJMLEtBQUcsQ0FBakMsV0FBc0NDLEtBQUcsQ0FBekM7QUFDRCxVQUFPLDREQUFHLEdBQUdELENBQU4sRUFBUyxHQUFHQyxDQUFaLElBQW1CRyxNQUFuQixFQUFQO0FBQ0c7Ozs7O2tCQWRnQmpCLEsiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtjb21wb3NlZFRpbWU6bmV3IERhdGUoKS50b1N0cmluZygpfVxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRsZXQgbGVuPU9iamVjdC5rZXlzKHRoaXMucHJvcHMpLmxlbmd0aFxyXG5cdFx0aWYobGVuPT0wKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0ZWxzZSBpZihsZW49PTEgJiYgUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PTEpe1xyXG5cdFx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pWzBdKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRsZXQge3gseSwgd2lkdGgsIGhlaWdodCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRpZih4fHx5KVxyXG5cdFx0XHRvdGhlcnMudHJhbnNmb3JtPWB0cmFuc2xhdGUoJHt4fHwwfSAke3l8fDB9KWBcclxuXHRcdHJldHVybiA8ZyB4PXt4fSB5PXt5fSB7Li4ub3RoZXJzfS8+XHJcbiAgICB9XHJcbn1cclxuIl19