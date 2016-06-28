"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Component) {
	_inherits(Cursor, _Component);

	function Cursor() {
		_classCallCheck(this, Cursor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Cursor).apply(this, arguments));
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var x = _props.x;
			var y = _props.y;
			var height = _props.height;
			var width = _props.width;

			return _react2.default.createElement("rect", null);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.defaultProps = {
	width: 2
};
exports.default = Cursor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBQ1Q7Z0JBQ2UsS0FBSyxLQUFMLENBRGY7T0FDSCxhQURHO09BQ0QsYUFEQztPQUNDLHVCQUREO09BQ1EscUJBRFI7O0FBRUosVUFBTywyQ0FBUCxDQUZJOzs7O1FBRFM7OztPQU1iLGVBQWE7QUFDbkIsUUFBTSxDQUFOOztrQkFQbUIiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7eCx5LGhlaWdodCx3aWR0aH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPHJlY3QvPlxuICAgIH1cblx0XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOjJcblx0fVxufVxuIl19