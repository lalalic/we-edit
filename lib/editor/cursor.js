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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { target: null, node: null, at: 0, width: 0, height: 0, descent: 0, style: {} }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;
			var descent = _state.descent;
			var style = _state.style;

			return _react2.default.createElement(Shape, { ref: "shape", width: width, height: height, style: style, descent: descent });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _state2 = this.state;
			var target = _state2.target;
			var node = _state2.node;
			var at = _state2.at;

			if (target && node) {
				node.appendChild(_reactDom2.default.findDOMNode(this.refs.shape));
				node.setAttribute('class', 'cursor');
			}
		}
	}, {
		key: "insert",
		value: function insert(content) {
			var _state3 = this.state;
			var target = _state3.target;
			var at = _state3.at;

			this.setState({ node: null, at: at + content.length });
			target.splice(at, 0, content);
		}
	}, {
		key: "backspace",
		value: function backspace() {
			var _state4 = this.state;
			var target = _state4.target;
			var at = _state4.at;

			this.setState({ node: null, at: at - 1 });
			target.splice(at - 1, 1);
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
			var descent = _props.descent;
			var style = _props.style;

			width = Math.ceil(width);
			height = Math.ceil(height);
			descent = Math.ceil(descent);
			return _react2.default.createElement("line", {
				x1: width,
				y1: descent,
				x2: width,
				y2: -height + descent,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			var node = _reactDom2.default.findDOMNode(this);
			this.timer = setInterval(function (a) {
				var y1 = node.getAttribute('y1'),
				    y2 = node.getAttribute('y2');
				node.setAttribute('y1', y1 == y2 ? _this3.props.descent : y2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxNQUFNLElBQU4sRUFBWSxJQUFJLENBQUosRUFBTyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxTQUFRLENBQVIsRUFBVyxPQUFNLEVBQU47OztjQUZqRDs7MkJBSVQ7Z0JBQzRCLEtBQUssS0FBTCxDQUQ1QjtPQUNILHFCQURHO09BQ0ksdUJBREo7T0FDWSx5QkFEWjtPQUNxQixxQkFEckI7O0FBRVYsVUFDQyw4QkFBQyxLQUFELElBQU8sS0FBSSxPQUFKLEVBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE9BQU8sS0FBUCxFQUFjLFNBQVMsT0FBVCxFQUEvRCxDQURELENBRlU7Ozs7cUNBT1EsV0FBVyxXQUFVO2lCQUNkLEtBQUssS0FBTCxDQURjO09BQ2hDLHdCQURnQztPQUN4QixvQkFEd0I7T0FDbEIsZ0JBRGtCOztBQUV2QyxPQUFHLFVBQVUsSUFBVixFQUFlO0FBQ2pCLFNBQUssV0FBTCxDQUFpQixtQkFBUyxXQUFULENBQXFCLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBdEMsRUFEaUI7QUFFakIsU0FBSyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLFFBQTNCLEVBRmlCO0lBQWxCOzs7O3lCQU1NLFNBQVE7aUJBQ0ssS0FBSyxLQUFMLENBREw7T0FDUCx3QkFETztPQUNDLGdCQUREOztBQUVkLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQVcsSUFBRyxLQUFHLFFBQVEsTUFBUixFQUFoQyxFQUZjO0FBR2QsVUFBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixDQUFqQixFQUFtQixPQUFuQixFQUhjOzs7OzhCQU1KO2lCQUNTLEtBQUssS0FBTCxDQURUO09BQ0gsd0JBREc7T0FDSyxnQkFETDs7QUFFVixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBTCxFQUFXLElBQUcsS0FBRyxDQUFILEVBQTdCLEVBRlU7QUFHVixVQUFPLE1BQVAsQ0FBYyxLQUFHLENBQUgsRUFBSyxDQUFuQixFQUhVOzs7O1FBekJTOzs7T0FDYixjQUFZO2tCQURDOztJQWdDUjs7Ozs7Ozs7Ozs7MkJBQ0o7Z0JBQzZCLEtBQUssS0FBTCxDQUQ3QjtPQUNGLHFCQURFO09BQ0ssdUJBREw7T0FDYSx5QkFEYjtPQUNzQixxQkFEdEI7O0FBRVAsV0FBTSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQU4sQ0FGTztBQUdQLFlBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFQLENBSE87QUFJUCxhQUFRLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBUixDQUpPO0FBS1AsVUFBTztBQUNKLFFBQUksS0FBSjtBQUNBLFFBQUksT0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBQyxNQUFELEdBQVEsT0FBUjtBQUNKLGlCQUFhLENBQWI7QUFDQSxZQUFRLE1BQU0sS0FBTixJQUFhLE9BQWI7SUFOSixDQUFQLENBTE87Ozs7c0NBZVc7OztBQUNsQixPQUFJLE9BQUssbUJBQVMsV0FBVCxDQUFxQixJQUFyQixDQUFMLENBRGM7QUFFbEIsUUFBSyxLQUFMLEdBQVcsWUFBWSxhQUFHO0FBQ3pCLFFBQUksS0FBRyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBSDtRQUE0QixLQUFHLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFILENBRFA7QUFFekIsU0FBSyxZQUFMLENBQWtCLElBQWxCLEVBQXVCLE1BQUksRUFBSixHQUFTLE9BQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsRUFBOUIsQ0FBdkIsQ0FGeUI7SUFBSCxFQUdwQixHQUhRLENBQVgsQ0FGa0I7Ozs7eUNBUUc7QUFDckIsUUFBSyxLQUFMLElBQWMsY0FBYyxLQUFLLEtBQUwsQ0FBNUIsQ0FEcUI7Ozs7UUF4QlYiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY3Vyc29yXCJcblx0c3RhdGU9e3RhcmdldDpudWxsLCBub2RlOiBudWxsLCBhdDogMCwgd2lkdGg6MCwgaGVpZ2h0OjAsIGRlc2NlbnQ6MCwgc3R5bGU6e319XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgc3R5bGV9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFNoYXBlIHJlZj1cInNoYXBlXCIgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gc3R5bGU9e3N0eWxlfSBkZXNjZW50PXtkZXNjZW50fS8+XG5cdFx0KVxuICAgIH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIG5vZGUsIGF0fT10aGlzLnN0YXRlXG5cdFx0aWYodGFyZ2V0ICYmIG5vZGUpe1xuXHRcdFx0bm9kZS5hcHBlbmRDaGlsZChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2hhcGUpKVxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2N1cnNvcicpXG5cdFx0fVxuXHR9XG5cblx0aW5zZXJ0KGNvbnRlbnQpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIGF0fT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bm9kZTpudWxsLCBhdDphdCtjb250ZW50Lmxlbmd0aH0pXG5cdFx0dGFyZ2V0LnNwbGljZShhdCwwLGNvbnRlbnQpXG5cdH1cblxuXHRiYWNrc3BhY2UoKXtcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe25vZGU6bnVsbCwgYXQ6YXQtMX0pXG5cdFx0dGFyZ2V0LnNwbGljZShhdC0xLDEpXG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIHN0eWxlfT10aGlzLnByb3BzXG5cdFx0d2lkdGg9TWF0aC5jZWlsKHdpZHRoKVxuXHRcdGhlaWdodD1NYXRoLmNlaWwoaGVpZ2h0KVxuXHRcdGRlc2NlbnQ9TWF0aC5jZWlsKGRlc2NlbnQpXG5cdFx0cmV0dXJuIDxsaW5lXG5cdFx0XHRcdFx0eDE9e3dpZHRofVxuXHRcdFx0XHRcdHkxPXtkZXNjZW50fVxuXHRcdFx0XHRcdHgyPXt3aWR0aH1cblx0XHRcdFx0XHR5Mj17LWhlaWdodCtkZXNjZW50fVxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoPXsxfVxuXHRcdFx0XHRcdHN0cm9rZT17c3R5bGUuY29sb3J8fFwiYmxhY2tcIn1cblx0XHRcdFx0XHQvPlxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKVxuXHRcdHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xuXHRcdFx0bGV0IHkxPW5vZGUuZ2V0QXR0cmlidXRlKCd5MScpLCB5Mj1ub2RlLmdldEF0dHJpYnV0ZSgneTInKVxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3kxJyx5MT09eTIgPyB0aGlzLnByb3BzLmRlc2NlbnQgOiB5Milcblx0XHR9LCA3MDApXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMudGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuXHR9XG59XG4iXX0=