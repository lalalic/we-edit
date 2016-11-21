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
	}, {
		key: "composed",
		get: function get() {
			return this.refs.composed;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInNlbGYiLCJzdHlsZXMiLCJkaXJlY3RTdHlsZSIsImdldERlZmF1bHRTdHlsZSIsInR5cGUiLCJnZXREZWZhdWx0IiwiaW5oZXJpdGVkU3R5bGUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7OzsyQkFHWjtBQUFBOztBQUFBLE9BQ1VDLFFBRFYsR0FDNEMsSUFENUMsQ0FDQUMsUUFEQSxDQUNVRCxRQURWO0FBQUEsZ0JBQzRDLElBRDVDLENBQ3FCRSxLQURyQjtBQUFBLE9BQzRCQyxLQUQ1QixVQUM0QkEsS0FENUI7QUFBQSxPQUNtQ0MsTUFEbkMsVUFDbUNBLE1BRG5DO0FBQUEsaUJBRTJC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T3dCLE9BQVA7QUFDQSxPQU5EO0FBRE0sTUFBUDtBQVNBLEtBVkQ7QUFGRCxJQUREO0FBaUJBOzs7c0JBRVM7QUFDVCxVQUFPLEtBQUtOLEtBQVo7QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NvbXB1dGVkOntjb21wb3NlZH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xyXG5cdFx0Y29uc3Qge3BhZ2VHYXAsIHN0eWxlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0XHQ8c3ZnIHN0eWxlPXtzdHlsZX1cclxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXHJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9XHJcblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cclxuXHRcdFx0XHRcdHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XHJcblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9PntcclxuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcclxuXHRcdFx0XHRcdFx0fSxbXSl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRjb25zdCBzZWxmPXRoaXNcclxuXHRcdGNvbnN0IHN0eWxlcz10aGlzLnByb3BzLnN0eWxlc1xyXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiBzdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbmhlcml0ZWRTdHlsZTpkaXJlY3RTdHlsZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xyXG5cdFx0aWYodGhpcy5yZWZzLmNvbXBvc2VkKVxyXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtzdmcsIGNvbXBvc2VkfT10aGlzLnJlZnNcclxuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXHJcblxyXG5cdFx0aGVpZ2h0PVx0TWF0aC5tYXgoY29udGVudEhlaWdodCwgaGVpZ2h0KSsxKnBhZ2VHYXBcclxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcclxuXHR9XHJcblxyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cdFx0aGVpZ2h0OiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuXHRcdHBhZ2VHYXA6IDIwLFxyXG5cdFx0c3R5bGU6IHtcclxuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgY29tcG9zZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlZnMuY29tcG9zZWRcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7c2VjdGlvbnMsIGdhcCwgY2FudmFzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgeT17Z2FwfT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gPEdyb3VwIHk9e2luZm8uaGVpZ2h0fSBrZXk9e2l9PntcclxuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XHJcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxyXG5cdFx0XHRcdFx0XHRcdHkrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcclxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9PC9Hcm91cD5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRnZXQgaW5mbygpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cclxuXHR9XHJcbn1cclxuIl19