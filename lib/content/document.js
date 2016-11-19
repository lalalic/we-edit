"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _page = require("../composed/page");

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_HasChild) {
	(0, _inherits3.default)(Document, _HasChild);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);
		return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
	}

	(0, _createClass3.default)(Document, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var composed = this.computed.composed,
			    _props = this.props,
			    width = _props.width,
			    height = _props.height;
			var _props2 = this.props,
			    pageGap = _props2.pageGap,
			    style = _props2.style,
			    others = (0, _objectWithoutProperties3.default)(_props2, ["pageGap", "style"]);

			return _react2.default.createElement(
				"div",
				null,
				(0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "render", this).call(this),
				_react2.default.createElement(
					"svg",
					{ style: style,
						ref: "svg",
						width: width,
						height: height,
						viewBox: "0 0 " + width + " " + height },
					_react2.default.createElement(Composed, { ref: "composed", gap: pageGap, canvas: { width: width }, sections: function sections() {
							return _this2.computed.children.reduce(function (collected, section) {
								collected.push(section.computed.composed);
								return collected;
							}, []);
						}
					}),
					this.more()
				)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			var styles = this.props.styles;
			var _props3 = this.props,
			    width = _props3.width,
			    pageGap = _props3.pageGap,
			    directStyle = _props3.directStyle;

			return (0, _assign2.default)((0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "getChildContext", this).call(this), {
				getDefaultStyle: function getDefaultStyle(type) {
					return styles.getDefault(type);
				},

				inheritedStyle: directStyle
			});
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(page) {
			if (this.refs.composed) this.refs.composed.setState({ composedTime: new Date().toString() });
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props4 = this.props,
			    pageGap = _props4.pageGap,
			    width = _props4.width,
			    height = _props4.height;
			var _refs = this.refs,
			    svg = _refs.svg,
			    composed = _refs.composed;
			var _composed$info = composed.info,
			    contentHeight = _composed$info.height,
			    pages = _composed$info.pages;


			height = Math.max(contentHeight, height) + 1 * pageGap;
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
Document.childContextTypes = (0, _assign2.default)({
	getDefaultStyle: _react.PropTypes.func,
	inheritedStyle: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: typeof window == 'undefined' ? 10000 : window.innerWidth,
	height: typeof window == 'undefined' ? 10000 : window.innerHeight,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;

var Composed = function (_Group) {
	(0, _inherits3.default)(Composed, _Group);

	function Composed() {
		(0, _classCallCheck3.default)(this, Composed);
		return (0, _possibleConstructorReturn3.default)(this, (Composed.__proto__ || (0, _getPrototypeOf2.default)(Composed)).apply(this, arguments));
	}

	(0, _createClass3.default)(Composed, [{
		key: "render",
		value: function render() {
			var _props5 = this.props,
			    sections = _props5.sections,
			    gap = _props5.gap,
			    canvas = _props5.canvas;

			var info = this._info = { height: gap, pages: 0 };
			return _react2.default.createElement(
				_group2.default,
				{ y: gap },
				sections().map(function (pages, i, a, b) {
					var y = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

					return _react2.default.createElement(
						_group2.default,
						{ y: info.height, key: i },
						pages.map(function (page, i) {
							var newPage = _react2.default.createElement(
								_group2.default,
								{ y: y, x: (canvas.width - page.size.width) / 2, key: i },
								_react2.default.createElement(_page2.default, page)
							);
							y += page.size.height + gap;
							info.height += page.size.height + gap;
							info.pages++;
							return newPage;
						})
					);
				})
			);
		}
	}, {
		key: "info",
		get: function get() {
			return this._info;
		}
	}]);
	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInNlbGYiLCJzdHlsZXMiLCJkaXJlY3RTdHlsZSIsImdldERlZmF1bHRTdHlsZSIsInR5cGUiLCJnZXREZWZhdWx0IiwiaW5oZXJpdGVkU3R5bGUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7OzsyQkFHWjtBQUFBOztBQUFBLE9BQ1VDLFFBRFYsR0FDNEMsSUFENUMsQ0FDQUMsUUFEQSxDQUNVRCxRQURWO0FBQUEsZ0JBQzRDLElBRDVDLENBQ3FCRSxLQURyQjtBQUFBLE9BQzRCQyxLQUQ1QixVQUM0QkEsS0FENUI7QUFBQSxPQUNtQ0MsTUFEbkMsVUFDbUNBLE1BRG5DO0FBQUEsaUJBRTJC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REQ7QUFpQkE7OztzQkFFUztBQUNULFVBQU8sS0FBS04sS0FBWjtBQUNBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcHV0ZWQ6e2NvbXBvc2VkfSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG5cdFx0Y29uc3Qge3BhZ2VHYXAsIHN0eWxlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cblx0XHRcdFx0PHN2ZyBzdHlsZT17c3R5bGV9XG5cdFx0XHRcdFx0cmVmPVwic3ZnXCJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9IFxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fSBcblx0XHRcdFx0XHR2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fSBzZWN0aW9ucz17KCk9PlxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9Pntcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxlY3RlZFxuXHRcdFx0XHRcdFx0fSxbXSl9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdHt0aGlzLm1vcmUoKX1cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGNvbnN0IHNlbGY9dGhpc1xuXHRcdGNvbnN0IHN0eWxlcz10aGlzLnByb3BzLnN0eWxlc1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGRpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gc3R5bGVzLmdldERlZmF1bHQodHlwZSlcblx0XHRcdH0sXG5cdFx0XHRpbmhlcml0ZWRTdHlsZTpkaXJlY3RTdHlsZVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fTwvR3JvdXA+XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXG5cdGdldCBpbmZvKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cblx0fVxufVxuIl19