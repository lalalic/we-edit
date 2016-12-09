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
				_react2.default.createElement(
					"div",
					{ style: { display: "none" } },
					(0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "render", this).call(this)
				),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJkaXNwbGF5IiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJzZWxmIiwic3R5bGVzIiwiZGlyZWN0U3R5bGUiLCJnZXREZWZhdWx0U3R5bGUiLCJ0eXBlIiwiZ2V0RGVmYXVsdCIsImluaGVyaXRlZFN0eWxlIiwicGFnZSIsInJlZnMiLCJzZXRTdGF0ZSIsImNvbXBvc2VkVGltZSIsIkRhdGUiLCJ0b1N0cmluZyIsInN2ZyIsImluZm8iLCJjb250ZW50SGVpZ2h0IiwicGFnZXMiLCJNYXRoIiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY29tcG9uZW50RGlkTW91bnQiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImJhY2tncm91bmQiLCJDb21wb3NlZCIsInNlY3Rpb25zIiwiZ2FwIiwiY2FudmFzIiwiX2luZm8iLCJtYXAiLCJpIiwiYSIsImIiLCJ5IiwibmV3UGFnZSIsInNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzJCQUdaO0FBQUE7O0FBQUEsT0FDVUMsUUFEVixHQUM0QyxJQUQ1QyxDQUNBQyxRQURBLENBQ1VELFFBRFY7QUFBQSxnQkFDNEMsSUFENUMsQ0FDcUJFLEtBRHJCO0FBQUEsT0FDNEJDLEtBRDVCLFVBQzRCQSxLQUQ1QjtBQUFBLE9BQ21DQyxNQURuQyxVQUNtQ0EsTUFE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R0FBaUIyQyxHQUEvQjtBQUNBbEIsWUFBS0UsS0FBTDtBQUNBLGNBQU93QixPQUFQO0FBQ0EsT0FORDtBQURNLE1BQVA7QUFTQSxLQVZEO0FBRkQsSUFERDtBQWlCQTs7O3NCQUVTO0FBQ1QsVUFBTyxLQUFLTixLQUFaO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcclxuXHRcdGNvbnN0IHtwYWdlR2FwLCBzdHlsZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcIm5vbmVcIn19PlxyXG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8c3ZnIHN0eWxlPXtzdHlsZX1cclxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXHJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9XHJcblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cclxuXHRcdFx0XHRcdHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XHJcblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9PntcclxuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcclxuXHRcdFx0XHRcdFx0fSxbXSl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHQuLi5IYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcyxcclxuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGNvbnN0IHNlbGY9dGhpc1xyXG5cdFx0Y29uc3Qgc3R5bGVzPXRoaXMucHJvcHMuc3R5bGVzXHJcbiAgICAgICAgY29uc3Qge3dpZHRoLCBwYWdlR2FwLCBkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XHJcblx0XHRcdFx0cmV0dXJuIHN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXHJcblx0XHRcdH0sXHJcblx0XHRcdGluaGVyaXRlZFN0eWxlOmRpcmVjdFN0eWxlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQocGFnZSl7XHJcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXHJcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGxldCB7cGFnZUdhcCwgd2lkdGgsIGhlaWdodH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xyXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cclxuXHJcblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXHJcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdH1cclxuXHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG5cdFx0d2lkdGg6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVyV2lkdGgsXHJcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxyXG5cdFx0cGFnZUdhcDogMjAsXHJcblx0XHRzdHlsZToge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBjb21wb3NlZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVmcy5jb21wb3NlZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VjdGlvbnMoKS5tYXAoKHBhZ2VzLGksYSxiLHk9MCk9PntcclxuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xyXG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9PntcclxuXHRcdFx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXHJcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXHJcblx0XHRcdFx0XHRcdFx0aW5mby5wYWdlcysrXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2VcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH08L0dyb3VwPlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGdldCBpbmZvKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xyXG5cdH1cclxufVxyXG4iXX0=