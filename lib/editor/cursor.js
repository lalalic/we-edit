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

			return _react2.default.createElement("line", {
				x1: width,
				y1: descent,
				x2: width,
				y2: -height - descent,
				strokeWidth: 1,
				stroke: style.color || "black"
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var descent = this.props.descent;

			var node = _reactDom2.default.findDOMNode(this);
			var x = -1000,
			    next = descent;
			this.timer = setInterval(function (a) {
				node.setAttribute('y1', next);
				next = next != descent ? descent : node.getAttribute('y2');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxNQUFNLElBQU4sRUFBWSxJQUFJLENBQUosRUFBTyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxTQUFRLENBQVIsRUFBVyxPQUFNLEVBQU47OztjQUZqRDs7MkJBSVQ7Z0JBQzRCLEtBQUssS0FBTCxDQUQ1QjtPQUNILHFCQURHO09BQ0ksdUJBREo7T0FDWSx5QkFEWjtPQUNxQixxQkFEckI7O0FBRVYsVUFDQyw4QkFBQyxLQUFELElBQU8sS0FBSSxPQUFKLEVBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE9BQU8sS0FBUCxFQUFjLFNBQVMsT0FBVCxFQUEvRCxDQURELENBRlU7Ozs7cUNBT1EsV0FBVyxXQUFVO2lCQUNkLEtBQUssS0FBTCxDQURjO09BQ2hDLHdCQURnQztPQUN4QixvQkFEd0I7T0FDbEIsZ0JBRGtCOztBQUV2QyxPQUFHLFVBQVUsSUFBVixFQUFlO0FBQ2pCLFNBQUssV0FBTCxDQUFpQixtQkFBUyxXQUFULENBQXFCLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBdEMsRUFEaUI7QUFFakIsU0FBSyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLFFBQTNCLEVBRmlCO0lBQWxCOzs7O3lCQU1NLFNBQVE7aUJBQ0ssS0FBSyxLQUFMLENBREw7T0FDUCx3QkFETztPQUNDLGdCQUREOztBQUVkLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQVcsSUFBRyxLQUFHLFFBQVEsTUFBUixFQUFoQyxFQUZjO0FBR2QsVUFBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixDQUFqQixFQUFtQixPQUFuQixFQUhjOzs7OzhCQU1KO2lCQUNTLEtBQUssS0FBTCxDQURUO09BQ0gsd0JBREc7T0FDSyxnQkFETDs7QUFFVixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBTCxFQUFXLElBQUcsS0FBRyxDQUFILEVBQTdCLEVBRlU7QUFHVixVQUFPLE1BQVAsQ0FBYyxLQUFHLENBQUgsRUFBSyxDQUFuQixFQUhVOzs7O1FBekJTOzs7T0FDYixjQUFZO2tCQURDOztJQWdDUjs7Ozs7Ozs7Ozs7MkJBQ0o7Z0JBQytCLEtBQUssS0FBTCxDQUQvQjtPQUNBLHFCQURBO09BQ08sdUJBRFA7T0FDZSx5QkFEZjtPQUN3QixxQkFEeEI7O0FBRVAsVUFBTztBQUNKLFFBQUksS0FBSjtBQUNBLFFBQUksT0FBSjtBQUNBLFFBQUksS0FBSjtBQUNBLFFBQUksQ0FBQyxNQUFELEdBQVEsT0FBUjtBQUNKLGlCQUFhLENBQWI7QUFDQSxZQUFRLE1BQU0sS0FBTixJQUFhLE9BQWI7SUFOSixDQUFQLENBRk87Ozs7c0NBWVc7T0FDYixVQUFTLEtBQUssS0FBTCxDQUFULFFBRGE7O0FBRWxCLE9BQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLElBQXJCLENBQUwsQ0FGYztBQUdsQixPQUFJLElBQUUsQ0FBQyxJQUFEO09BQU8sT0FBSyxPQUFMLENBSEs7QUFJbEIsUUFBSyxLQUFMLEdBQVcsWUFBWSxhQUFHO0FBQ3pCLFNBQUssWUFBTCxDQUFrQixJQUFsQixFQUF1QixJQUF2QixFQUR5QjtBQUV6QixXQUFLLFFBQU0sT0FBTixHQUFnQixPQUFoQixHQUF5QixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBekIsQ0FGb0I7SUFBSCxFQUdwQixHQUhRLENBQVgsQ0FKa0I7Ozs7eUNBVUc7QUFDckIsUUFBSyxLQUFMLElBQWMsY0FBYyxLQUFLLEtBQUwsQ0FBNUIsQ0FEcUI7Ozs7UUF2QlYiLCJmaWxlIjoiY3Vyc29yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY3Vyc29yXCJcblx0c3RhdGU9e3RhcmdldDpudWxsLCBub2RlOiBudWxsLCBhdDogMCwgd2lkdGg6MCwgaGVpZ2h0OjAsIGRlc2NlbnQ6MCwgc3R5bGU6e319XG5cbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgZGVzY2VudCwgc3R5bGV9PXRoaXMuc3RhdGVcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFNoYXBlIHJlZj1cInNoYXBlXCIgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gc3R5bGU9e3N0eWxlfSBkZXNjZW50PXtkZXNjZW50fS8+XG5cdFx0KVxuICAgIH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIG5vZGUsIGF0fT10aGlzLnN0YXRlXG5cdFx0aWYodGFyZ2V0ICYmIG5vZGUpe1xuXHRcdFx0bm9kZS5hcHBlbmRDaGlsZChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2hhcGUpKVxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2N1cnNvcicpXG5cdFx0fVxuXHR9XG5cblx0aW5zZXJ0KGNvbnRlbnQpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIGF0fT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bm9kZTpudWxsLCBhdDphdCtjb250ZW50Lmxlbmd0aH0pXG5cdFx0dGFyZ2V0LnNwbGljZShhdCwwLGNvbnRlbnQpXG5cdH1cblx0XG5cdGJhY2tzcGFjZSgpe1xuXHRcdGNvbnN0IHt0YXJnZXQsIGF0fT10aGlzLnN0YXRlXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bm9kZTpudWxsLCBhdDphdC0xfSlcblx0XHR0YXJnZXQuc3BsaWNlKGF0LTEsMSlcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU2hhcGUgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBkZXNjZW50LCBzdHlsZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiA8bGluZVxuXHRcdFx0XHRcdHgxPXt3aWR0aH1cblx0XHRcdFx0XHR5MT17ZGVzY2VudH1cblx0XHRcdFx0XHR4Mj17d2lkdGh9XG5cdFx0XHRcdFx0eTI9ey1oZWlnaHQtZGVzY2VudH1cblx0XHRcdFx0XHRzdHJva2VXaWR0aD17MX1cblx0XHRcdFx0XHRzdHJva2U9e3N0eWxlLmNvbG9yfHxcImJsYWNrXCJ9XG5cdFx0XHRcdFx0Lz5cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtkZXNjZW50fT10aGlzLnByb3BzXG5cdFx0bGV0IG5vZGU9UmVhY3RET00uZmluZERPTU5vZGUodGhpcylcblx0XHRsZXQgeD0tMTAwMCwgbmV4dD1kZXNjZW50XG5cdFx0dGhpcy50aW1lcj1zZXRJbnRlcnZhbChhPT57XG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgneTEnLG5leHQpXG5cdFx0XHRuZXh0PW5leHQhPWRlc2NlbnQgPyBkZXNjZW50OiBub2RlLmdldEF0dHJpYnV0ZSgneTInKVxuXHRcdH0sIDcwMClcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy50aW1lciAmJiBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG5cdH1cbn1cbiJdfQ==