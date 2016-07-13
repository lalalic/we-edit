"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Shape = undefined;

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { target: null, textpiece: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			return null;
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			var textpiece = this.state.textpiece;
			var nextTextpiece = nextState.textpiece;

			if (textpiece != nextTextpiece && textpiece) this.state.target.blur(textpiece);

			return false;
		}
	}, {
		key: "replaceFocusedContent",
		value: function replaceFocusedContent(content) {
			this.state.target.insert(content);
		}
	}]);

	return Cursor;
}(_react.Component);

Cursor.displayName = "cursor";
exports.default = Cursor;

var Shape = exports.Shape = function (_Component2) {
	_inherits(Shape, _Component2);

	function Shape() {
		_classCallCheck(this, Shape);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Shape).apply(this, arguments));
	}

	_createClass(Shape, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var style = _props.style;

			return _react2.default.createElement("line", {
				x1: width,
				y1: 0,
				x2: width,
				y2: -height,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    show = false;
			this.timer = setInterval(function (a) {
				node.setAttribute('transform', "translate(" + (show ? 0 : x) + ",0)");
				show = !show;
			}, 700);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.timer && clearInterval(this.timer);
		}
	}]);

	return Shape;
}(_react.Component);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxXQUFXLElBQVg7OztjQUZBOzsyQkFJVDtBQUNWLFVBQU8sSUFBUCxDQURVOzs7O3dDQUlXLFdBQVcsV0FBVTtPQUNuQyxZQUFXLEtBQUssS0FBTCxDQUFYLFVBRG1DO09BRXpCLGdCQUFlLFVBQXpCLFVBRm1DOztBQUcxQyxPQUFHLGFBQVcsYUFBWCxJQUE0QixTQUE1QixFQUNGLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsQ0FBdUIsU0FBdkIsRUFERDs7QUFHQSxVQUFPLEtBQVAsQ0FOMEM7Ozs7d0NBU3JCLFNBQVE7QUFDN0IsUUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixNQUFsQixDQUF5QixPQUF6QixFQUQ2Qjs7OztRQWpCVjs7O09BQ2IsY0FBWTtrQkFEQzs7SUFzQlI7Ozs7Ozs7Ozs7OzJCQUNKO2dCQUNzQixLQUFLLEtBQUwsQ0FEdEI7T0FDQSxxQkFEQTtPQUNPLHVCQURQO09BQ2UscUJBRGY7O0FBRVAsVUFBTztBQUNKLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBQyxNQUFEO0FBQ0osaUJBQWEsQ0FBYjtBQUNBLFlBQVEsTUFBTSxLQUFOLElBQWEsT0FBYjtJQU5KLENBQVAsQ0FGTzs7OztzQ0FZVztBQUNsQixPQUFJLE9BQUssbUJBQVMsV0FBVCxDQUFxQixJQUFyQixDQUFMLENBRGM7QUFFbEIsT0FBSSxJQUFFLENBQUMsSUFBRDtPQUFPLE9BQUssS0FBTCxDQUZLO0FBR2xCLFFBQUssS0FBTCxHQUFXLFlBQVksYUFBRztBQUN6QixTQUFLLFlBQUwsQ0FBa0IsV0FBbEIsa0JBQTJDLE9BQU8sQ0FBUCxHQUFXLENBQVgsU0FBM0MsRUFEeUI7QUFFekIsV0FBSyxDQUFDLElBQUQsQ0FGb0I7SUFBSCxFQUdwQixHQUhRLENBQVgsQ0FIa0I7Ozs7eUNBU0c7QUFDckIsUUFBSyxLQUFMLElBQWMsY0FBYyxLQUFLLEtBQUwsQ0FBNUIsQ0FEcUI7Ozs7UUF0QlYiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY3Vyc29yXCJcblx0c3RhdGU9e3RhcmdldDpudWxsLCB0ZXh0cGllY2U6IG51bGx9XG5cdFxuICAgIHJlbmRlcigpe1xuXHRcdHJldHVybiBudWxsXG4gICAgfVxuXHRcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcblx0XHRjb25zdCB7dGV4dHBpZWNlfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge3RleHRwaWVjZTpuZXh0VGV4dHBpZWNlfT1uZXh0U3RhdGVcblx0XHRpZih0ZXh0cGllY2UhPW5leHRUZXh0cGllY2UgJiYgdGV4dHBpZWNlKVxuXHRcdFx0dGhpcy5zdGF0ZS50YXJnZXQuYmx1cih0ZXh0cGllY2UpXG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdHJlcGxhY2VGb2N1c2VkQ29udGVudChjb250ZW50KXtcblx0XHR0aGlzLnN0YXRlLnRhcmdldC5pbnNlcnQoY29udGVudClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU2hhcGUgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBzdHlsZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiA8bGluZSBcblx0XHRcdFx0XHR4MT17d2lkdGh9IFxuXHRcdFx0XHRcdHkxPXswfSBcblx0XHRcdFx0XHR4Mj17d2lkdGh9IFxuXHRcdFx0XHRcdHkyPXstaGVpZ2h0fSBcblx0XHRcdFx0XHRzdHJva2VXaWR0aD17MX0gXG5cdFx0XHRcdFx0c3Ryb2tlPXtzdHlsZS5jb2xvcnx8XCJibGFja1wifVxuXHRcdFx0XHRcdC8+XG5cdH1cblx0XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IG5vZGU9UmVhY3RET00uZmluZERPTU5vZGUodGhpcylcblx0XHRsZXQgeD0tMTAwMCwgc2hvdz1mYWxzZVxuXHRcdHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScsYHRyYW5zbGF0ZSgke3Nob3cgPyAwIDogeH0sMClgKVxuXHRcdFx0c2hvdz0hc2hvd1xuXHRcdH0sIDcwMClcblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHR0aGlzLnRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblx0fVxufVxuIl19