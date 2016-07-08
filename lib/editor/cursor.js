"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Component) {
	_inherits(Cursor, _Component);

	function Cursor() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Cursor);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { shape: null, target: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    show = false;
			this.timer = setInterval(function (a) {
				node.setAttribute('transform', "translate(" + (show ? 0 : x) + ",0)");
				show = !show;
			}, this.props.interval);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var target = this.state.target;

			target.blur();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.timer && clearInterval(this.timer);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"g",
				null,
				this.state.shape
			);
		}
	}, {
		key: "replaceFocusedContent",
		value: function replaceFocusedContent(content) {
			var _state = this.state;
			var target = _state.target;
			var loc = _state.loc;

			target.insert(loc, content);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
Cursor.defaultProps = {
	interval: 700
};
exports.default = Cursor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztrTUFFcEIsUUFBTSxFQUFDLE9BQU0sSUFBTixFQUFZLFFBQU8sSUFBUDs7O2NBRkM7O3NDQUlEO0FBQ2xCLE9BQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLElBQXJCLENBQUwsQ0FEYztBQUVsQixPQUFJLElBQUUsQ0FBQyxJQUFEO09BQU8sT0FBSyxLQUFMLENBRks7QUFHbEIsUUFBSyxLQUFMLEdBQVcsWUFBWSxhQUFHO0FBQ3pCLFNBQUssWUFBTCxDQUFrQixXQUFsQixrQkFBMkMsT0FBTyxDQUFQLEdBQVcsQ0FBWCxTQUEzQyxFQUR5QjtBQUV6QixXQUFLLENBQUMsSUFBRCxDQUZvQjtJQUFILEVBR3BCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FISCxDQUhrQjs7Ozt1Q0FTQztPQUNaLFNBQVEsS0FBSyxLQUFMLENBQVIsT0FEWTs7QUFFbkIsVUFBTyxJQUFQLEdBRm1COzs7O3lDQUtFO0FBQ3JCLFFBQUssS0FBTCxJQUFjLGNBQWMsS0FBSyxLQUFMLENBQTVCLENBRHFCOzs7OzJCQUlYO0FBQ1YsVUFBTzs7O0lBQUksS0FBSyxLQUFMLENBQVcsS0FBWDtJQUFYLENBRFU7Ozs7d0NBUVcsU0FBUTtnQkFDVCxLQUFLLEtBQUwsQ0FEUztPQUN0Qix1QkFEc0I7T0FDZCxpQkFEYzs7QUFFN0IsVUFBTyxNQUFQLENBQWMsR0FBZCxFQUFtQixPQUFuQixFQUY2Qjs7OztRQTlCVjs7O09BQ2IsY0FBWTtBQURDLE9BMEJiLGVBQWE7QUFDbkIsV0FBUyxHQUFUOztrQkEzQm1CIiwiZmlsZSI6ImN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImN1cnNvclwiXG5cdHN0YXRlPXtzaGFwZTpudWxsLCB0YXJnZXQ6bnVsbH1cblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IG5vZGU9UmVhY3RET00uZmluZERPTU5vZGUodGhpcylcblx0XHRsZXQgeD0tMTAwMCwgc2hvdz1mYWxzZVxuXHRcdHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYHRyYW5zbGF0ZSgke3Nob3cgPyAwIDogeH0sMClgKVxuXHRcdFx0c2hvdz0hc2hvd1xuXHRcdH0sIHRoaXMucHJvcHMuaW50ZXJ2YWwpXG5cdH1cblx0XG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdGNvbnN0IHt0YXJnZXR9PXRoaXMuc3RhdGVcblx0XHR0YXJnZXQuYmx1cigpXG5cdH1cblx0XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy50aW1lciAmJiBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG5cdH1cblx0XG4gICAgcmVuZGVyKCl7XG5cdFx0cmV0dXJuIDxnPnt0aGlzLnN0YXRlLnNoYXBlfTwvZz5cbiAgICB9XG5cdFxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRpbnRlcnZhbDo3MDBcblx0fVxuXHRcblx0cmVwbGFjZUZvY3VzZWRDb250ZW50KGNvbnRlbnQpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIGxvY309dGhpcy5zdGF0ZVxuXHRcdHRhcmdldC5pbnNlcnQobG9jLCBjb250ZW50KVxuXHR9XG59XG4iXX0=