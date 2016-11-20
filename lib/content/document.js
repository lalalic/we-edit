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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInNlbGYiLCJzdHlsZXMiLCJkaXJlY3RTdHlsZSIsImdldERlZmF1bHRTdHlsZSIsInR5cGUiLCJnZXREZWZhdWx0IiwiaW5oZXJpdGVkU3R5bGUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7OzsyQkFHWjtBQUFBOztBQUFBLE9BQ1VDLFFBRFYsR0FDNEMsSUFENUMsQ0FDQUMsUUFEQSxDQUNVRCxRQURWO0FBQUEsZ0JBQzRDLElBRDVDLENBQ3FCRSxLQURyQjtBQUFBLE9BQzRCQyxLQUQ1QixVQUM0QkEsS0FENUI7QUFBQSxPQUNtQ0MsTUFEbkMsVUFDbUNBLE1BRG5DO0FBQUEsaUJBRTJC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T3dCLE9BQVA7QUFDQSxPQU5EO0FBRE0sTUFBUDtBQVNBLEtBVkQ7QUFGRCxJQUREO0FBaUJBOzs7c0JBRVM7QUFDVCxVQUFPLEtBQUtOLEtBQVo7QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbXB1dGVkOntjb21wb3NlZH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xuXHRcdGNvbnN0IHtwYWdlR2FwLCBzdHlsZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdDxzdmcgc3R5bGU9e3N0eWxlfVxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofVxuXHRcdFx0XHRcdGhlaWdodD17aGVpZ2h0fVxuXHRcdFx0XHRcdHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XG5cdFx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnJlZHVjZSgoY29sbGVjdGVkLCBzZWN0aW9uKT0+e1xuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXG5cdFx0XHRcdFx0XHR9LFtdKX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0Y29uc3Qgc2VsZj10aGlzXG5cdFx0Y29uc3Qgc3R5bGVzPXRoaXMucHJvcHMuc3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XG5cdFx0XHRcdHJldHVybiBzdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxuXHRcdFx0fSxcblx0XHRcdGluaGVyaXRlZFN0eWxlOmRpcmVjdFN0eWxlXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xuXHRcdGlmKHRoaXMucmVmcy5jb21wb3NlZClcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7c3ZnLCBjb21wb3NlZH09dGhpcy5yZWZzXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cblxuXHRcdGhlaWdodD1cdE1hdGgubWF4KGNvbnRlbnRIZWlnaHQsIGhlaWdodCkrMSpwYWdlR2FwXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXG5cdH1cblxuXHRtb3JlKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxuXG5cdGdldCBjb21wb3NlZCgpe1xuXHRcdHJldHVybiB0aGlzLnJlZnMuY29tcG9zZWRcblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7c2VjdGlvbnMsIGdhcCwgY2FudmFzfT10aGlzLnByb3BzXG5cdFx0Y29uc3QgaW5mbz10aGlzLl9pbmZvPXtoZWlnaHQ6Z2FwLCBwYWdlczowfVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgeT17Z2FwfT5cblx0XHRcdHtcblx0XHRcdFx0c2VjdGlvbnMoKS5tYXAoKHBhZ2VzLGksYSxiLHk9MCk9Pntcblx0XHRcdFx0XHRyZXR1cm4gPEdyb3VwIHk9e2luZm8uaGVpZ2h0fSBrZXk9e2l9Pntcblx0XHRcdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xuXHRcdFx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0XHRcdHkrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcblx0XHRcdFx0XHRcdFx0aW5mby5oZWlnaHQrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcblx0XHRcdFx0XHRcdFx0aW5mby5wYWdlcysrXG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH08L0dyb3VwPlxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxuXHRnZXQgaW5mbygpe1xuXHRcdHJldHVybiB0aGlzLl9pbmZvXG5cdH1cbn1cbiJdfQ==