"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
		key: "appendComposed",
		value: function appendComposed(page) {
			if (this.refs.composed) this.refs.composed.setState({ composedTime: new Date().toString() });
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props3 = this.props,
			    pageGap = _props3.pageGap,
			    width = _props3.width,
			    height = _props3.height;
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
			var _props4 = this.props,
			    sections = _props4.sections,
			    gap = _props4.gap,
			    canvas = _props4.canvas;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJkaXNwbGF5IiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzJCQUdaO0FBQUE7O0FBQUEsT0FDVUMsUUFEVixHQUM0QyxJQUQ1QyxDQUNBQyxRQURBLENBQ1VELFFBRFY7QUFBQSxnQkFDNEMsSUFENUMsQ0FDcUJFLEtBRHJCO0FBQUEsT0FDNEJDLEtBRDVCLFVBQzRCQSxLQUQ1QjtBQUFBLE9BQ21DQyxNQURuQyxVQUNtQ0EsTUFEbkM7QUFBQSxpQkFFMkIsS0FBS0YsS0FGaEM7QUFBQSxPQUVBRyxPQUZBLFdBRUFBLE9BRkE7QUFBQSxPQUVTQyxLQUZULFdBRVNBLEtBRlQ7QUFBQSxPQUVtQkMsTUFGbkI7O0FBR0QsVUFDTDtBQUFBO0FBQUE7QUFDQztBQUFB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QUFBQSxRQUFPLEdBQUd0QixLQUFLbEIsTUFBZixFQUF1QixLQUFLcUMsQ0FBNUI7QUFDTmpCLFlBQU1nQixHQUFOLENBQVUsVUFBQ3pCLElBQUQsRUFBTTBCLENBQU4sRUFBVTtBQUNuQixXQUFJSSxVQUFTO0FBQUE7QUFBQSxVQUFPLEdBQUdELENBQVYsRUFBYSxHQUFHLENBQUNOLE9BQU9uQyxLQUFQLEdBQWFZLEtBQUsrQixJQUFMLENBQVUzQyxLQUF4QixJQUErQixDQUEvQyxFQUFrRCxLQUFLc0MsQ0FBdkQ7QUFBMEQsc0RBQVUxQixJQUFWO0FBQTFELFFBQWI7QUFDQTZCLFlBQUk3QixLQUFLK0IsSUFBTCxDQUFVMUMsTUFBVixHQUFpQmlDLEdBQXJCO0FBQ0FmLFlBQUtsQixNQUFMLElBQWNXLEtBQUsrQixJQUFMLENBQVUxQyxNQUFWLEdBQWlCaUMsR0FBL0I7QUFDQWYsWUFBS0UsS0FBTDtBQUNBLGNBQU9xQixPQUFQO0FBQ0EsT0FORDtBQURNLE1BQVA7QUFTQSxLQVZEO0FBRkQsSUFERDtBQWlCQTs7O3NCQUVTO0FBQ1QsVUFBTyxLQUFLTixLQUFaO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcclxuXHRcdGNvbnN0IHtwYWdlR2FwLCBzdHlsZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcIm5vbmVcIn19PlxyXG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8c3ZnIHN0eWxlPXtzdHlsZX1cclxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXHJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9XHJcblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cclxuXHRcdFx0XHRcdHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XHJcblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9PntcclxuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcclxuXHRcdFx0XHRcdFx0fSxbXSl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG4gICAgfVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcclxuXHRcdGlmKHRoaXMucmVmcy5jb21wb3NlZClcclxuXHRcdFx0dGhpcy5yZWZzLmNvbXBvc2VkLnNldFN0YXRlKHtjb21wb3NlZFRpbWU6IG5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7c3ZnLCBjb21wb3NlZH09dGhpcy5yZWZzXHJcblx0XHRsZXQge2hlaWdodDpjb250ZW50SGVpZ2h0LCBwYWdlc309Y29tcG9zZWQuaW5mb1xyXG5cclxuXHRcdGhlaWdodD1cdE1hdGgubWF4KGNvbnRlbnRIZWlnaHQsIGhlaWdodCkrMSpwYWdlR2FwXHJcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGhlaWdodClcclxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xyXG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXHJcblx0fVxyXG5cclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuXHRcdGhlaWdodDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcblx0XHRwYWdlR2FwOiAyMCxcclxuXHRcdHN0eWxlOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IGNvbXBvc2VkKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmNvbXBvc2VkXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgaW5mbz10aGlzLl9pbmZvPXtoZWlnaHQ6Z2FwLCBwYWdlczowfVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xyXG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XHJcblx0XHRcdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcclxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXHJcblx0XHRcdFx0XHRcdFx0aW5mby5oZWlnaHQrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcclxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fTwvR3JvdXA+XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Z2V0IGluZm8oKXtcclxuXHRcdHJldHVybiB0aGlzLl9pbmZvXHJcblx0fVxyXG59XHJcbiJdfQ==