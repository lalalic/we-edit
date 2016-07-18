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
				y1: 2 * descent,
				x2: width,
				y2: -height + 2 * descent,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    y1 = node.getAttribute('y1'),
			    y2 = node.getAttribute('y2');
			this.timer = setInterval(function (a) {
				node.setAttribute('y1', node.getAttribute('y1') == y1 ? y2 : y1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxNQUFNLElBQU4sRUFBWSxJQUFJLENBQUosRUFBTyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxTQUFRLENBQVIsRUFBVyxPQUFNLEVBQU47OztjQUZqRDs7MkJBSVQ7Z0JBQzRCLEtBQUssS0FBTCxDQUQ1QjtPQUNILHFCQURHO09BQ0ksdUJBREo7T0FDWSx5QkFEWjtPQUNxQixxQkFEckI7O0FBRVYsVUFDQyw4QkFBQyxLQUFELElBQU8sS0FBSSxPQUFKLEVBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE9BQU8sS0FBUCxFQUFjLFNBQVMsT0FBVCxFQUEvRCxDQURELENBRlU7Ozs7cUNBT1EsV0FBVyxXQUFVO2lCQUNkLEtBQUssS0FBTCxDQURjO09BQ2hDLHdCQURnQztPQUN4QixvQkFEd0I7T0FDbEIsZ0JBRGtCOztBQUV2QyxPQUFHLFVBQVUsSUFBVixFQUFlO0FBQ2pCLFNBQUssV0FBTCxDQUFpQixtQkFBUyxXQUFULENBQXFCLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBdEMsRUFEaUI7QUFFakIsU0FBSyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLFFBQTNCLEVBRmlCO0lBQWxCOzs7O3lCQU1NLFNBQVE7aUJBQ0ssS0FBSyxLQUFMLENBREw7T0FDUCx3QkFETztPQUNDLGdCQUREOztBQUVkLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQVcsSUFBRyxLQUFHLFFBQVEsTUFBUixFQUFoQyxFQUZjO0FBR2QsVUFBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixDQUFqQixFQUFtQixPQUFuQixFQUhjOzs7OzhCQU1KO2lCQUNTLEtBQUssS0FBTCxDQURUO09BQ0gsd0JBREc7T0FDSyxnQkFETDs7QUFFVixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBTCxFQUFXLElBQUcsS0FBRyxDQUFILEVBQTdCLEVBRlU7QUFHVixVQUFPLE1BQVAsQ0FBYyxLQUFHLENBQUgsRUFBSyxDQUFuQixFQUhVOzs7O1FBekJTOzs7T0FDYixjQUFZO2tCQURDOztJQWdDUjs7Ozs7Ozs7Ozs7MkJBQ0o7Z0JBQzZCLEtBQUssS0FBTCxDQUQ3QjtPQUNGLHFCQURFO09BQ0ssdUJBREw7T0FDYSx5QkFEYjtPQUNzQixxQkFEdEI7O0FBRVAsV0FBTSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQU4sQ0FGTztBQUdQLFlBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFQLENBSE87QUFJUCxhQUFRLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBUixDQUpPO0FBS1AsVUFBTztBQUNKLFFBQUksS0FBSjtBQUNBLFFBQUksSUFBRSxPQUFGO0FBQ0osUUFBSSxLQUFKO0FBQ0EsUUFBSSxDQUFDLE1BQUQsR0FBUSxJQUFFLE9BQUY7QUFDWixpQkFBYSxDQUFiO0FBQ0EsWUFBUSxNQUFNLEtBQU4sSUFBYSxPQUFiO0lBTkosQ0FBUCxDQUxPOzs7O3VDQWVZO0FBQ25CLE9BQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLElBQXJCLENBQUwsQ0FEZTtBQUVuQixPQUFJLElBQUUsQ0FBQyxJQUFEO09BQU8sS0FBRyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBSDtPQUE0QixLQUFHLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFILENBRnRCO0FBR25CLFFBQUssS0FBTCxHQUFXLFlBQVksYUFBRztBQUN6QixTQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUIsS0FBSyxZQUFMLENBQWtCLElBQWxCLEtBQXlCLEVBQXpCLEdBQThCLEVBQTlCLEdBQW1DLEVBQW5DLENBQXZCLENBRHlCO0lBQUgsRUFFcEIsR0FGUSxDQUFYLENBSG1COzs7O3lDQVFFO0FBQ3JCLFFBQUssS0FBTCxJQUFjLGNBQWMsS0FBSyxLQUFMLENBQTVCLENBRHFCOzs7O1FBeEJWIiwiZmlsZSI6ImN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImN1cnNvclwiXG5cdHN0YXRlPXt0YXJnZXQ6bnVsbCwgbm9kZTogbnVsbCwgYXQ6IDAsIHdpZHRoOjAsIGhlaWdodDowLCBkZXNjZW50OjAsIHN0eWxlOnt9fVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIHN0eWxlfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxTaGFwZSByZWY9XCJzaGFwZVwiIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHN0eWxlPXtzdHlsZX0gZGVzY2VudD17ZGVzY2VudH0vPlxuXHRcdClcbiAgICB9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcblx0XHRjb25zdCB7dGFyZ2V0LCBub2RlLCBhdH09dGhpcy5zdGF0ZVxuXHRcdGlmKHRhcmdldCAmJiBub2RlKXtcblx0XHRcdG5vZGUuYXBwZW5kQ2hpbGQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNoYXBlKSlcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjdXJzb3InKVxuXHRcdH1cblx0fVxuXG5cdGluc2VydChjb250ZW50KXtcblx0XHRjb25zdCB7dGFyZ2V0LCBhdH09dGhpcy5zdGF0ZVxuXHRcdHRoaXMuc2V0U3RhdGUoe25vZGU6bnVsbCwgYXQ6YXQrY29udGVudC5sZW5ndGh9KVxuXHRcdHRhcmdldC5zcGxpY2UoYXQsMCxjb250ZW50KVxuXHR9XG5cblx0YmFja3NwYWNlKCl7XG5cdFx0Y29uc3Qge3RhcmdldCwgYXR9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtub2RlOm51bGwsIGF0OmF0LTF9KVxuXHRcdHRhcmdldC5zcGxpY2UoYXQtMSwxKVxuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCBzdHlsZX09dGhpcy5wcm9wc1xuXHRcdHdpZHRoPU1hdGguY2VpbCh3aWR0aClcblx0XHRoZWlnaHQ9TWF0aC5jZWlsKGhlaWdodClcblx0XHRkZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxuXHRcdHJldHVybiA8bGluZVxuXHRcdFx0XHRcdHgxPXt3aWR0aH1cblx0XHRcdFx0XHR5MT17MipkZXNjZW50fVxuXHRcdFx0XHRcdHgyPXt3aWR0aH1cblx0XHRcdFx0XHR5Mj17LWhlaWdodCsyKmRlc2NlbnR9XG5cdFx0XHRcdFx0c3Ryb2tlV2lkdGg9ezF9XG5cdFx0XHRcdFx0c3Ryb2tlPXtzdHlsZS5jb2xvcnx8XCJibGFja1wifVxuXHRcdFx0XHRcdC8+XG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKVxuXHRcdGxldCB4PS0xMDAwLCB5MT1ub2RlLmdldEF0dHJpYnV0ZSgneTEnKSwgeTI9bm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJylcblx0XHR0aGlzLnRpbWVyPXNldEludGVydmFsKGE9Pntcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKCd5MScsbm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJyk9PXkxID8geTIgOiB5MSlcblx0XHR9LCA3MDApXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMudGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuXHR9XG59XG4iXX0=