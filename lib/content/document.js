"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
			    others = (0, _objectWithoutProperties3.default)(_props2, ["pageGap"]);

			return _react2.default.createElement(
				"div",
				null,
				(0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "render", this).call(this),
				_react2.default.createElement(
					"svg",
					(0, _extends3.default)({}, others, {
						ref: "svg",
						width: width, height: height, viewBox: "0 0 " + width + " " + height }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwib3RoZXJzIiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJzZWxmIiwic3R5bGVzIiwiZGlyZWN0U3R5bGUiLCJnZXREZWZhdWx0U3R5bGUiLCJ0eXBlIiwiZ2V0RGVmYXVsdCIsImluaGVyaXRlZFN0eWxlIiwicGFnZSIsInJlZnMiLCJzZXRTdGF0ZSIsImNvbXBvc2VkVGltZSIsIkRhdGUiLCJ0b1N0cmluZyIsInN2ZyIsImluZm8iLCJjb250ZW50SGVpZ2h0IiwicGFnZXMiLCJNYXRoIiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY29tcG9uZW50RGlkTW91bnQiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MkJBR1o7QUFBQTs7QUFBQSxPQUNVQyxRQURWLEdBQzRDLElBRDVDLENBQ0FDLFFBREEsQ0FDVUQsUUFEVjtBQUFBLGdCQUM0QyxJQUQ1QyxDQUNxQkUsS0FEckI7QUFBQSxPQUM0QkMsS0FENUIsVUFDNEJBLEtBRDVCO0FBQUEsT0FDbUNDLE1BRG5DLFVBQ21DQSxNQURuQztBQUFBLGlC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S0FBS04sS0FBWjtBQUNBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y29tcHV0ZWQ6e2NvbXBvc2VkfSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXHJcblx0XHRjb25zdCB7cGFnZUdhcCwgLi4ub3RoZXJzfT10aGlzLnByb3BzIFxyXG4gICAgICAgIHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxyXG5cdFx0XHRcdDxzdmcgey4uLm90aGVyc31cclxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXHJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxyXG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XHJcblx0XHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XHJcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXHJcblx0XHRcdFx0XHRcdH0sW10pfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxyXG5cdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XHJcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuICAgIGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0Y29uc3Qgc2VsZj10aGlzXHJcblx0XHRjb25zdCBzdHlsZXM9dGhpcy5wcm9wcy5zdHlsZXNcclxuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGRpcmVjdFN0eWxlfT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdFx0XHRyZXR1cm4gc3R5bGVzLmdldERlZmF1bHQodHlwZSlcclxuXHRcdFx0fSxcclxuXHRcdFx0aW5oZXJpdGVkU3R5bGU6ZGlyZWN0U3R5bGVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcclxuXHRcdGlmKHRoaXMucmVmcy5jb21wb3NlZClcclxuXHRcdFx0dGhpcy5yZWZzLmNvbXBvc2VkLnNldFN0YXRlKHtjb21wb3NlZFRpbWU6IG5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7c3ZnLCBjb21wb3NlZH09dGhpcy5yZWZzXHJcblx0XHRsZXQge2hlaWdodDpjb250ZW50SGVpZ2h0LCBwYWdlc309Y29tcG9zZWQuaW5mb1xyXG5cclxuXHRcdGhlaWdodD1cdE1hdGgubWF4KGNvbnRlbnRIZWlnaHQsIGhlaWdodCkrMSpwYWdlR2FwXHJcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGhlaWdodClcclxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xyXG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXHJcblx0fVxyXG5cclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuXHRcdGhlaWdodDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcblx0XHRwYWdlR2FwOiAyMCxcclxuXHRcdHN0eWxlOiB7XHJcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG59XHJcblxyXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgaW5mbz10aGlzLl9pbmZvPXtoZWlnaHQ6Z2FwLCBwYWdlczowfVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xyXG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XHJcblx0XHRcdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcclxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXHJcblx0XHRcdFx0XHRcdFx0aW5mby5oZWlnaHQrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcclxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fTwvR3JvdXA+XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Z2V0IGluZm8oKXtcclxuXHRcdHJldHVybiB0aGlzLl9pbmZvXHJcblx0fVxyXG59XHJcbiJdfQ==