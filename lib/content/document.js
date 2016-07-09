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

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, pageGap: pageGap },
				getDefaultStyle: function getDefaultStyle(type) {
					return documentStyles.getDefault(type);
				}
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
	canvas: _react.PropTypes.object,
	getDefaultStyle: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O29NQUdwQixXQUFTLE1BQUssS0FBTCxDQUFXLE9BQVg7OztjQUhXOzsyQkFLVDtPQUNILFdBQWtELEtBQWxELFNBREc7T0FDYyxVQUFpQyxLQUF4QyxNQUFPLFFBRGQ7Z0JBQytDLEtBQXZCLE1BRHhCO09BQytCLHFCQUQvQjtPQUNzQyx1QkFEdEM7aUJBRWlDLEtBQUssS0FBTCxDQUZqQztPQUVILHdDQUZHO09BRWEsMEJBRmI7O09BRXlCLDBFQUZ6Qjs7QUFHSixVQUNMOztpQkFBUztBQUNSLFVBQUksS0FBSjtBQUNBLFlBQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixrQkFBZ0IsY0FBUyxNQUF6QixHQUYvQjsrQkFUa0IsK0NBU2xCO0lBSUMsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLE9BQU8sS0FBSyxRQUFMLEVBQWUsS0FBSyxPQUFMLEVBQWMsUUFBUSxFQUFDLFlBQUQsRUFBUixFQUE3RCxDQUpEO0lBS0UsS0FBSyxJQUFMLEVBTEY7SUFESyxDQUhJOzs7O29DQW1CUztBQUNuQixPQUFNLGlCQUFlLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FERjtpQkFFVSxLQUFLLEtBQUwsQ0FGVjtPQUVOLHNCQUZNO09BRUMsMEJBRkQ7O0FBR25CLFVBQU8sT0FBTyxNQUFQLDRCQTNCWSx3REEyQlosRUFBc0M7QUFDbkMsWUFBUSxFQUFDLFlBQUQsRUFBTyxnQkFBUCxFQUFSO0FBQ1QsOENBQWdCLE1BQUs7QUFDcEIsWUFBTyxlQUFlLFVBQWYsQ0FBMEIsSUFBMUIsQ0FBUCxDQURvQjtLQUZ1QjtJQUF0QyxDQUFQLENBSG1COzs7O2lDQVdMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBQWQsSUFBdUMsSUFBdkMsRUFDRixPQUREO0FBRUEsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixFQUhtQjs7QUFLbkIsUUFBSyxJQUFMLENBQVUsUUFBVixJQUFzQixLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLFFBQW5CLENBQTRCLEVBQUMsY0FBYyxJQUFJLElBQUosR0FBVyxRQUFYLEVBQWQsRUFBN0IsQ0FBdEIsQ0FMbUI7Ozs7c0NBUUQ7aUJBQ1csS0FBSyxLQUFMLENBRFg7T0FDYiwwQkFEYTtPQUNKLHNCQURJO09BQ0csd0JBREg7T0FFWCxNQUFLLEtBQUssSUFBTCxDQUFMLElBRlc7O0FBR2xCLE9BQUksT0FBSyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVztBQUN2QyxhQUFRLEtBQUssTUFBTCxHQUFZLEVBQUUsSUFBRixDQUFPLE1BQVAsR0FBYyxPQUExQjtBQUNSLFlBQU0sS0FBSyxHQUFMLENBQVMsS0FBSyxLQUFMLEVBQVcsRUFBRSxLQUFGLENBQTFCO0lBRjRCLEVBRVMsRUFBQyxRQUFPLE9BQVAsRUFBZ0IsT0FBTSxLQUFOLEVBRi9DLENBQUwsQ0FIYzs7QUFPbEIsWUFBUSxLQUFLLEdBQUwsQ0FBUyxLQUFLLE1BQUwsRUFBYSxNQUF0QixDQUFSLENBUGtCO0FBUWxCLE9BQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixNQUExQixFQVJrQjtBQVNsQixPQUFJLFlBQUosQ0FBaUIsU0FBakIsV0FBa0MsY0FBUyxNQUEzQyxFQVRrQjs7Ozt1Q0FZQztBQUNuQixRQUFLLGlCQUFMLEdBRG1COzs7O3lCQUlkO0FBQ0wsVUFBTyxJQUFQLENBREs7Ozs7UUEzRGM7OztTQUNiLGNBQVk7QUFEQyxTQW1CVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0FBQ2Qsa0JBQWlCLGlCQUFVLElBQVY7Q0FGVSxFQUd2QixjQUFTLGlCQUFUO0FBdEJlLFNBK0RiLGVBQWE7QUFDbkIsUUFBTyxPQUFPLFVBQVA7QUFDUCxTQUFRLE9BQU8sV0FBUDtBQUNSLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBbkVtQjs7SUEwRWY7Ozs7Ozs7Ozs7OzJCQUNHO2lCQUNvQixLQUFLLEtBQUwsQ0FEcEI7T0FDQSxzQkFEQTtPQUNPLGtCQURQO09BQ1ksd0JBRFo7O0FBRVAsT0FBSSxJQUFFLENBQUYsQ0FGRztBQUdQLFVBQ0M7O01BQU8sR0FBRyxHQUFILEVBQVA7SUFFQyxNQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBTSxDQUFOLEVBQVU7QUFDbkIsU0FBSSxVQUFTOztRQUFPLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWQsR0FBK0IsQ0FBL0IsRUFBa0MsS0FBSyxDQUFMLEVBQWxEO01BQTBELDhDQUFVLElBQVYsQ0FBMUQ7TUFBVCxDQURlO0FBRW5CLFVBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUZlO0FBR25CLFlBQU8sT0FBUCxDQUhtQjtLQUFWLENBRlg7SUFERCxDQUhPOzs7O1FBREgiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdGN1cnJlbnRZPXRoaXMucHJvcHMucGFnZUdhcFxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbXBvc2VkLCBzdGF0ZTp7Y29udGVudH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xuXHRcdGNvbnN0IHtkb2N1bWVudFN0eWxlcywgcGFnZUdhcCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi5vdGhlcnN9XG5cdFx0XHRcdHJlZj1cInN2Z1wiXG5cdFx0XHRcdHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cblx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgcGFnZXM9e3RoaXMuY29tcG9zZWR9IGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fS8+XG5cdFx0XHRcdHt0aGlzLm1vcmUoKX1cblx0XHRcdDwvc3ZnPlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGNvbnN0IGRvY3VtZW50U3R5bGVzPXRoaXMucHJvcHMuZG9jdW1lbnRTdHlsZXNcbiAgICAgICAgY29uc3Qge3dpZHRoLCBwYWdlR2FwfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgY2FudmFzOiB7d2lkdGgscGFnZUdhcH0sXG5cdFx0XHRnZXREZWZhdWx0U3R5bGUodHlwZSl7XG5cdFx0XHRcdHJldHVybiBkb2N1bWVudFN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXG5cdFx0XHR9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xuXHRcdGlmKHRoaXMuY29tcG9zZWRbdGhpcy5jb21wb3NlZC5sZW5ndGgtMV09PXBhZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHR0aGlzLmNvbXBvc2VkLnB1c2gocGFnZSlcblxuXHRcdHRoaXMucmVmcy5jb21wb3NlZCAmJiB0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2Z309dGhpcy5yZWZzXG5cdFx0bGV0IHNpemU9dGhpcy5jb21wb3NlZC5yZWR1Y2UoKGxhc3QsYSk9Pih7XG5cdFx0XHRcdGhlaWdodDogbGFzdC5oZWlnaHQrYS5zaXplLmhlaWdodCtwYWdlR2FwLFxuXHRcdFx0XHR3aWR0aDpNYXRoLm1heChsYXN0LndpZHRoLGEud2lkdGgpfSkse2hlaWdodDpwYWdlR2FwLCB3aWR0aDp3aWR0aH0pXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChzaXplLmhlaWdodCwgaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0aGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuXG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtwYWdlcywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRsZXQgeT0wXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxufVxuIl19