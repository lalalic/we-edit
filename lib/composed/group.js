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
			    index = _props.index,
			    others = (0, _objectWithoutProperties3.default)(_props, ["x", "y", "width", "height", "index"]);

			if (x || y) others.transform = "translate(" + (x || 0) + " " + (y || 0) + ")";
			return _react2.default.createElement("g", (0, _extends3.default)({ x: x, y: y }, others));
		}
	}]);
	return Group;
}(_react.Component);

exports.default = Group;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9ncm91cC5qcyJdLCJuYW1lcyI6WyJHcm91cCIsInN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwibGVuIiwicHJvcHMiLCJsZW5ndGgiLCJDaGlsZHJlbiIsImNvdW50IiwiY2hpbGRyZW4iLCJvbmx5IiwidG9BcnJheSIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJpbmRleCIsIm90aGVycyIsInRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TUFDcEJDLEssR0FBTSxFQUFDQyxjQUFhLElBQUlDLElBQUosR0FBV0MsUUFBWCxFQUFkLEU7Ozs7OzJCQUNLO0FBQ1YsT0FBSUMsTUFBSSxvQkFBWSxLQUFLQyxLQUFqQixFQUF3QkMsTUFBaEM7QUFDQSxPQUFHRixPQUFLLENBQVIsRUFDQyxPQUFPLElBQVAsQ0FERCxLQUVLLElBQUdBLE9BQUssQ0FBTCxJQUFVLGdCQUFNRyxRQUFOLENBQWVDLEtBQWYsQ0FBcUIsS0FBS0gsS0FBTCxDQUFXSSxRQUFoQyxLQUEyQyxDQUF4RCxFQUEwRDtBQUM5RCxXQUFPLGdCQUFNRixRQUFOLENBQWVHLElBQWYsQ0FBb0IsZ0JBQU1ILFFBQU4sQ0FBZUksT0FBZixDQUF1QixLQUFLTixLQUFMLENBQVdJLFFBQWxDLEVBQTRDLENBQTVDLENBQXBCLENBQVA7QUFDQTs7QUFOUyxnQkFRaUMsS0FBS0osS0FSdEM7QUFBQSxPQVFMTyxDQVJLLFVBUUxBLENBUks7QUFBQSxPQVFIQyxDQVJHLFVBUUhBLENBUkc7QUFBQSxPQVFBQyxLQVJBLFVBUUFBLEtBUkE7QUFBQSxPQVFPQyxNQVJQLFVBUU9BLE1BUlA7QUFBQSxPQVFlQyxLQVJmLFVBUWVBLEtBUmY7QUFBQSxPQVF5QkMsTUFSekI7O0FBU1YsT0FBR0wsS0FBR0MsQ0FBTixFQUNDSSxPQUFPQyxTQUFQLG1CQUE4Qk4sS0FBRyxDQUFqQyxXQUFzQ0MsS0FBRyxDQUF6QztBQUNELFVBQU8sNERBQUcsR0FBR0QsQ0FBTixFQUFTLEdBQUdDLENBQVosSUFBbUJJLE1BQW5CLEVBQVA7QUFDRzs7Ozs7a0JBZGdCbEIsSyIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cCBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e2NvbXBvc2VkVGltZTpuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9XG4gICAgcmVuZGVyKCl7XG5cdFx0bGV0IGxlbj1PYmplY3Qua2V5cyh0aGlzLnByb3BzKS5sZW5ndGhcblx0XHRpZihsZW49PTApXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2UgaWYobGVuPT0xICYmIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT0xKXtcblx0XHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbilbMF0pXG5cdFx0fVxuXHRcdFxuXHRcdGxldCB7eCx5LCB3aWR0aCwgaGVpZ2h0LCBpbmRleCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0aWYoeHx8eSlcblx0XHRcdG90aGVycy50cmFuc2Zvcm09YHRyYW5zbGF0ZSgke3h8fDB9ICR7eXx8MH0pYFxuXHRcdHJldHVybiA8ZyB4PXt4fSB5PXt5fSB7Li4ub3RoZXJzfS8+XG4gICAgfVxufVxuIl19