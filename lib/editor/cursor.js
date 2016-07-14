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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cursor)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { target: null, node: null, at: 0, width: 0, height: 0, style: {} }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Cursor, [{
		key: "render",
		value: function render() {
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;
			var style = _state.style;

			return _react2.default.createElement(Shape, { ref: "shape", width: width, height: height, style: style });
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
		key: "replaceFocusedContent",
		value: function replaceFocusedContent(content) {
			var _state3 = this.state;
			var target = _state3.target;
			var at = _state3.at;

			this.setState({ node: null, at: at + content.length });
			target.splice(at, 0, content);
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
			    next = 0;
			this.timer = setInterval(function (a) {
				node.setAttribute('y1', next);
				next = next ? 0 : node.getAttribute('y2');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvY3Vyc29yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7a01BRXBCLFFBQU0sRUFBQyxRQUFPLElBQVAsRUFBYSxNQUFNLElBQU4sRUFBWSxJQUFJLENBQUosRUFBTyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBVSxPQUFNLEVBQU47OztjQUZ0Qzs7MkJBSVQ7Z0JBQ21CLEtBQUssS0FBTCxDQURuQjtPQUNILHFCQURHO09BQ0ksdUJBREo7T0FDWSxxQkFEWjs7QUFFVixVQUNDLDhCQUFDLEtBQUQsSUFBTyxLQUFJLE9BQUosRUFBWSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0IsT0FBTyxLQUFQLEVBQWpELENBREQsQ0FGVTs7OztxQ0FPUSxXQUFXLFdBQVU7aUJBQ2QsS0FBSyxLQUFMLENBRGM7T0FDaEMsd0JBRGdDO09BQ3hCLG9CQUR3QjtPQUNsQixnQkFEa0I7O0FBRXZDLE9BQUcsVUFBVSxJQUFWLEVBQWU7QUFDakIsU0FBSyxXQUFMLENBQWlCLG1CQUFTLFdBQVQsQ0FBcUIsS0FBSyxJQUFMLENBQVUsS0FBVixDQUF0QyxFQURpQjtBQUVqQixTQUFLLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsUUFBM0IsRUFGaUI7SUFBbEI7Ozs7d0NBTXFCLFNBQVE7aUJBQ1YsS0FBSyxLQUFMLENBRFU7T0FDdEIsd0JBRHNCO09BQ2QsZ0JBRGM7O0FBRTdCLFFBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQVcsSUFBRyxLQUFHLFFBQVEsTUFBUixFQUFoQyxFQUY2QjtBQUc3QixVQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLENBQWpCLEVBQW1CLE9BQW5CLEVBSDZCOzs7O1FBbkJWOzs7T0FDYixjQUFZO2tCQURDOztJQTBCUjs7Ozs7Ozs7Ozs7MkJBQ0o7Z0JBQ3NCLEtBQUssS0FBTCxDQUR0QjtPQUNBLHFCQURBO09BQ08sdUJBRFA7T0FDZSxxQkFEZjs7QUFFUCxVQUFPO0FBQ0osUUFBSSxLQUFKO0FBQ0EsUUFBSSxDQUFKO0FBQ0EsUUFBSSxLQUFKO0FBQ0EsUUFBSSxDQUFDLE1BQUQ7QUFDSixpQkFBYSxDQUFiO0FBQ0EsWUFBUSxNQUFNLEtBQU4sSUFBYSxPQUFiO0lBTkosQ0FBUCxDQUZPOzs7O3NDQVlXO0FBQ2xCLE9BQUksT0FBSyxtQkFBUyxXQUFULENBQXFCLElBQXJCLENBQUwsQ0FEYztBQUVsQixPQUFJLElBQUUsQ0FBQyxJQUFEO09BQU8sT0FBSyxDQUFMLENBRks7QUFHbEIsUUFBSyxLQUFMLEdBQVcsWUFBWSxhQUFHO0FBQ3pCLFNBQUssWUFBTCxDQUFrQixJQUFsQixFQUF1QixJQUF2QixFQUR5QjtBQUV6QixXQUFLLE9BQU8sQ0FBUCxHQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFWLENBRm9CO0lBQUgsRUFHcEIsR0FIUSxDQUFYLENBSGtCOzs7O3lDQVNHO0FBQ3JCLFFBQUssS0FBTCxJQUFjLGNBQWMsS0FBSyxLQUFMLENBQTVCLENBRHFCOzs7O1FBdEJWIiwiZmlsZSI6ImN1cnNvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJzb3IgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImN1cnNvclwiXG5cdHN0YXRlPXt0YXJnZXQ6bnVsbCwgbm9kZTogbnVsbCwgYXQ6IDAsIHdpZHRoOjAsIGhlaWdodDowLCBzdHlsZTp7fX1cblxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBzdHlsZX09dGhpcy5zdGF0ZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8U2hhcGUgcmVmPVwic2hhcGVcIiB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBzdHlsZT17c3R5bGV9Lz5cblx0XHQpXG4gICAgfVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSl7XG5cdFx0Y29uc3Qge3RhcmdldCwgbm9kZSwgYXR9PXRoaXMuc3RhdGVcblx0XHRpZih0YXJnZXQgJiYgbm9kZSl7XG5cdFx0XHRub2RlLmFwcGVuZENoaWxkKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zaGFwZSkpXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY3Vyc29yJylcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlRm9jdXNlZENvbnRlbnQoY29udGVudCl7XG5cdFx0Y29uc3Qge3RhcmdldCwgYXR9PXRoaXMuc3RhdGVcblx0XHR0aGlzLnNldFN0YXRlKHtub2RlOm51bGwsIGF0OmF0K2NvbnRlbnQubGVuZ3RofSlcblx0XHR0YXJnZXQuc3BsaWNlKGF0LDAsY29udGVudClcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgU2hhcGUgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0LCBzdHlsZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiA8bGluZVxuXHRcdFx0XHRcdHgxPXt3aWR0aH1cblx0XHRcdFx0XHR5MT17MH1cblx0XHRcdFx0XHR4Mj17d2lkdGh9XG5cdFx0XHRcdFx0eTI9ey1oZWlnaHR9XG5cdFx0XHRcdFx0c3Ryb2tlV2lkdGg9ezF9XG5cdFx0XHRcdFx0c3Ryb2tlPXtzdHlsZS5jb2xvcnx8XCJibGFja1wifVxuXHRcdFx0XHRcdC8+XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCBub2RlPVJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpXG5cdFx0bGV0IHg9LTEwMDAsIG5leHQ9MFxuXHRcdHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoYT0+e1xuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3kxJyxuZXh0KVxuXHRcdFx0bmV4dD1uZXh0ID8gMDogbm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJylcblx0XHR9LCA3MDApXG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMudGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuXHR9XG59XG4iXX0=