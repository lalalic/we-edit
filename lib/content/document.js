"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _page = require("../composed/page");

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Document);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.currentY = _this.props.pageGap, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var composed = this.composed;
			var content = this.state.content;
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var _props2 = this.props;
			var documentStyles = _props2.documentStyles;
			var pageGap = _props2.pageGap;

			var others = _objectWithoutProperties(_props2, ["documentStyles", "pageGap"]);

			return _react2.default.createElement(
				"svg",
				_extends({}, others, {
					ref: "svg",
					width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this),
				_react2.default.createElement(Composed, { ref: "composed", pages: this.composed, gap: pageGap, canvas: { width: width } }),
				this.more()
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var documentStyles = this.props.documentStyles;
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;
			var contentStyle = _props3.contentStyle;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				getDefaultStyle: function getDefaultStyle(type) {
					return documentStyles.getDefault(type);
				},

				containerStyle: contentStyle
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(page) {
			if (this.composed[this.composed.length - 1] == page) return;
			this.composed.push(page);

			this.refs.composed && this.refs.composed.setState({ composedTime: new Date().toString() });
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props4 = this.props;
			var pageGap = _props4.pageGap;
			var width = _props4.width;
			var height = _props4.height;
			var svg = this.refs.svg;

			var size = this.composed.reduce(function (last, a) {
				return {
					height: last.height + a.size.height + pageGap,
					width: Math.max(last.width, a.width) };
			}, { height: pageGap, width: width });

			height = Math.max(size.height, height);
			svg.setAttribute('height', height);
			svg.setAttribute('viewBox', "0 0 " + width + " " + height);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.componentDidMount();
		}
	}, {
		key: "more",
		value: function more() {
			return null;
		}
	}]);

	return Document;
}(_any.HasChild);

Document.displayName = "document";
Document.childContextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func,
	containerStyle: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: window.innerWidth,
	height: window.innerHeight,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;

var Composed = function (_Group) {
	_inherits(Composed, _Group);

	function Composed() {
		_classCallCheck(this, Composed);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
	}

	_createClass(Composed, [{
		key: "render",
		value: function render() {
			var _props5 = this.props;
			var pages = _props5.pages;
			var gap = _props5.gap;
			var canvas = _props5.canvas;

			var y = 0;
			return _react2.default.createElement(
				_group2.default,
				{ y: gap },
				pages.map(function (page, i) {
					var newPage = _react2.default.createElement(
						_group2.default,
						{ y: y, x: (canvas.width - page.size.width) / 2, key: i },
						_react2.default.createElement(_page2.default, page)
					);
					y += page.size.height + gap;
					return newPage;
				})
			);
		}
	}]);

	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O29NQUdwQixXQUFTLE1BQUssS0FBTCxDQUFXLE9BQVg7OztjQUhXOzsyQkFLVDtPQUNILFdBQWtELEtBQWxELFNBREc7T0FDYyxVQUFpQyxLQUF4QyxNQUFPLFFBRGQ7Z0JBQytDLEtBQXZCLE1BRHhCO09BQytCLHFCQUQvQjtPQUNzQyx1QkFEdEM7aUJBRWlDLEtBQUssS0FBTCxDQUZqQztPQUVILHdDQUZHO09BRWEsMEJBRmI7O09BRXlCLDBFQUZ6Qjs7QUFHSixVQUNMOztpQkFBUztBQUNSLFVBQUksS0FBSjtBQUNBLFlBQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixrQkFBZ0IsY0FBUyxNQUF6QixHQUYvQjsrQkFUa0IsK0NBU2xCO0lBSUMsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLE9BQU8sS0FBSyxRQUFMLEVBQWUsS0FBSyxPQUFMLEVBQWMsUUFBUSxFQUFDLFlBQUQsRUFBUixFQUE3RCxDQUpEO0lBS0UsS0FBSyxJQUFMLEVBTEY7SUFESyxDQUhJOzs7O29DQW1CUztBQUNuQixPQUFNLGlCQUFlLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FERjtpQkFFd0IsS0FBSyxLQUFMLENBRnhCO09BRU4sc0JBRk07T0FFQywwQkFGRDtPQUVVLG9DQUZWOztBQUduQixVQUFPLE9BQU8sTUFBUCw0QkEzQlksd0RBMkJaLEVBQXNDO0FBQ25DLDhDQUFnQixNQUFLO0FBQzdCLFlBQU8sZUFBZSxVQUFmLENBQTBCLElBQTFCLENBQVAsQ0FENkI7S0FEYzs7QUFJNUMsb0JBQWUsWUFBZjtJQUpNLENBQVAsQ0FIbUI7Ozs7aUNBV0wsTUFBSztBQUNuQixPQUFHLEtBQUssUUFBTCxDQUFjLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsQ0FBckIsQ0FBZCxJQUF1QyxJQUF2QyxFQUNGLE9BREQ7QUFFQSxRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLEVBSG1COztBQUtuQixRQUFLLElBQUwsQ0FBVSxRQUFWLElBQXNCLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBbUIsUUFBbkIsQ0FBNEIsRUFBQyxjQUFjLElBQUksSUFBSixHQUFXLFFBQVgsRUFBZCxFQUE3QixDQUF0QixDQUxtQjs7OztzQ0FRRDtpQkFDVyxLQUFLLEtBQUwsQ0FEWDtPQUNiLDBCQURhO09BQ0osc0JBREk7T0FDRyx3QkFESDtPQUVYLE1BQUssS0FBSyxJQUFMLENBQUwsSUFGVzs7QUFHbEIsT0FBSSxPQUFLLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsVUFBQyxJQUFELEVBQU0sQ0FBTjtXQUFXO0FBQ3ZDLGFBQVEsS0FBSyxNQUFMLEdBQVksRUFBRSxJQUFGLENBQU8sTUFBUCxHQUFjLE9BQTFCO0FBQ1IsWUFBTSxLQUFLLEdBQUwsQ0FBUyxLQUFLLEtBQUwsRUFBVyxFQUFFLEtBQUYsQ0FBMUI7SUFGNEIsRUFFUyxFQUFDLFFBQU8sT0FBUCxFQUFnQixPQUFNLEtBQU4sRUFGL0MsQ0FBTCxDQUhjOztBQU9sQixZQUFRLEtBQUssR0FBTCxDQUFTLEtBQUssTUFBTCxFQUFhLE1BQXRCLENBQVIsQ0FQa0I7QUFRbEIsT0FBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLE1BQTFCLEVBUmtCO0FBU2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxjQUFTLE1BQTNDLEVBVGtCOzs7O3VDQVlDO0FBQ25CLFFBQUssaUJBQUwsR0FEbUI7Ozs7eUJBSWQ7QUFDTCxVQUFPLElBQVAsQ0FESzs7OztRQTNEYzs7O1NBQ2IsY0FBWTtBQURDLFNBbUJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxrQkFBaUIsaUJBQVUsSUFBVjtBQUN2QixpQkFBZ0IsaUJBQVUsTUFBVjtDQUZXLEVBR3ZCLGNBQVMsaUJBQVQ7QUF0QmUsU0ErRGIsZUFBYTtBQUNuQixRQUFPLE9BQU8sVUFBUDtBQUNQLFNBQVEsT0FBTyxXQUFQO0FBQ1IsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkFuRW1COztJQTBFZjs7Ozs7Ozs7Ozs7MkJBQ0c7aUJBQ29CLEtBQUssS0FBTCxDQURwQjtPQUNBLHNCQURBO09BQ08sa0JBRFA7T0FDWSx3QkFEWjs7QUFFUCxPQUFJLElBQUUsQ0FBRixDQUZHO0FBR1AsVUFDQzs7TUFBTyxHQUFHLEdBQUgsRUFBUDtJQUVDLE1BQU0sR0FBTixDQUFVLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTtBQUNuQixTQUFJLFVBQVM7O1FBQU8sR0FBRyxDQUFILEVBQU0sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZCxHQUErQixDQUEvQixFQUFrQyxLQUFLLENBQUwsRUFBbEQ7TUFBMEQsOENBQVUsSUFBVixDQUExRDtNQUFULENBRGU7QUFFbkIsVUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEdBQWpCLENBRmU7QUFHbkIsWUFBTyxPQUFQLENBSG1CO0tBQVYsQ0FGWDtJQURELENBSE87Ozs7UUFESCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZCwgdG9nZ2xhYmxlfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblxuXHRjdXJyZW50WT10aGlzLnByb3BzLnBhZ2VHYXBcblxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgc3RhdGU6e2NvbnRlbnR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7ZG9jdW1lbnRTdHlsZXMsIHBhZ2VHYXAsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4ub3RoZXJzfVxuXHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIHBhZ2VzPXt0aGlzLmNvbXBvc2VkfSBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0vPlxuXHRcdFx0XHR7dGhpcy5tb3JlKCl9XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGNvbnN0IGRvY3VtZW50U3R5bGVzPXRoaXMucHJvcHMuZG9jdW1lbnRTdHlsZXNcbiAgICAgICAgY29uc3Qge3dpZHRoLCBwYWdlR2FwLCBjb250ZW50U3R5bGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XG5cdFx0XHRcdHJldHVybiBkb2N1bWVudFN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0Y29udGFpbmVyU3R5bGU6Y29udGVudFN0eWxlXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xuXHRcdGlmKHRoaXMuY29tcG9zZWRbdGhpcy5jb21wb3NlZC5sZW5ndGgtMV09PXBhZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHR0aGlzLmNvbXBvc2VkLnB1c2gocGFnZSlcblxuXHRcdHRoaXMucmVmcy5jb21wb3NlZCAmJiB0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2Z309dGhpcy5yZWZzXG5cdFx0bGV0IHNpemU9dGhpcy5jb21wb3NlZC5yZWR1Y2UoKGxhc3QsYSk9Pih7XG5cdFx0XHRcdGhlaWdodDogbGFzdC5oZWlnaHQrYS5zaXplLmhlaWdodCtwYWdlR2FwLFxuXHRcdFx0XHR3aWR0aDpNYXRoLm1heChsYXN0LndpZHRoLGEud2lkdGgpfSkse2hlaWdodDpwYWdlR2FwLCB3aWR0aDp3aWR0aH0pXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChzaXplLmhlaWdodCwgaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0aGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuXG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtwYWdlcywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRsZXQgeT0wXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxufVxuIl19