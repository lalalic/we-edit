"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
	}, {
		key: "composed",
		get: function get() {
			return this.refs.composed;
		}
	}]);
	return Document;
}(_any.HasChild);

Document.displayName = "document";
Document.childContextTypes = (0, _extends3.default)({}, _any.HasChild.childContextTypes, {
	getDefaultStyle: _react.PropTypes.func,
	inheritedStyle: _react.PropTypes.object
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInNlbGYiLCJzdHlsZXMiLCJkaXJlY3RTdHlsZSIsImdldERlZmF1bHRTdHlsZSIsInR5cGUiLCJnZXREZWZhdWx0IiwiaW5oZXJpdGVkU3R5bGUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MkJBR1o7QUFBQTs7QUFBQSxPQUNVQyxRQURWLEdBQzRDLElBRDVDLENBQ0FDLFFBREEsQ0FDVUQsUUFEVjtBQUFBLGdCQUM0QyxJQUQ1QyxDQUNxQkUsS0FEckI7QUFBQSxPQUM0QkMsS0FENUIsVUFDNEJBLEtBRDVCO0FBQUEsT0FDbUNDLE1BRG5DLFVBQ21DQSxNQURuQztBQUFBLGlC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QVA7QUFTQSxLQVZEO0FBRkQsSUFERDtBQWlCQTs7O3NCQUVTO0FBQ1QsVUFBTyxLQUFLTixLQUFaO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcclxuXHRcdGNvbnN0IHtwYWdlR2FwLCBzdHlsZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XHJcblx0XHRcdFx0PHN2ZyBzdHlsZT17c3R5bGV9XHJcblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxyXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofVxyXG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XHJcblx0XHRcdFx0XHR2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxyXG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XHJcblx0XHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XHJcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXHJcblx0XHRcdFx0XHRcdH0sW10pfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxyXG5cdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMsXHJcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRjb25zdCBzZWxmPXRoaXNcclxuXHRcdGNvbnN0IHN0eWxlcz10aGlzLnByb3BzLnN0eWxlc1xyXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiBzdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbmhlcml0ZWRTdHlsZTpkaXJlY3RTdHlsZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xyXG5cdFx0aWYodGhpcy5yZWZzLmNvbXBvc2VkKVxyXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtzdmcsIGNvbXBvc2VkfT10aGlzLnJlZnNcclxuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXHJcblxyXG5cdFx0aGVpZ2h0PVx0TWF0aC5tYXgoY29udGVudEhlaWdodCwgaGVpZ2h0KSsxKnBhZ2VHYXBcclxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcclxuXHR9XHJcblxyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cdFx0aGVpZ2h0OiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuXHRcdHBhZ2VHYXA6IDIwLFxyXG5cdFx0c3R5bGU6IHtcclxuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgY29tcG9zZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlZnMuY29tcG9zZWRcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7c2VjdGlvbnMsIGdhcCwgY2FudmFzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgeT17Z2FwfT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gPEdyb3VwIHk9e2luZm8uaGVpZ2h0fSBrZXk9e2l9PntcclxuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XHJcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxyXG5cdFx0XHRcdFx0XHRcdHkrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcclxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9PC9Hcm91cD5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRnZXQgaW5mbygpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cclxuXHR9XHJcbn1cclxuIl19