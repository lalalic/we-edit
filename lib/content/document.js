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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInNlbGYiLCJzdHlsZXMiLCJkaXJlY3RTdHlsZSIsImdldERlZmF1bHRTdHlsZSIsInR5cGUiLCJnZXREZWZhdWx0IiwiaW5oZXJpdGVkU3R5bGUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MkJBR1o7QUFBQTs7QUFBQSxPQUNVQyxRQURWLEdBQzRDLElBRDVDLENBQ0FDLFFBREEsQ0FDVUQsUUFEVjtBQUFBLGdCQUM0QyxJQUQ1QyxDQUNxQkUsS0FEckI7QUFBQSxPQUM0QkMsS0FENUIsVUFDNEJBLEtBRDVCO0FBQUEsT0FDbUNDLE1BRG5DLFVBQ21DQSxNQURuQztBQUFBLGlC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QVA7QUFTQSxLQVZEO0FBRkQsSUFERDtBQWlCQTs7O3NCQUVTO0FBQ1QsVUFBTyxLQUFLTixLQUFaO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7cGFnZUdhcCwgc3R5bGUsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXHRcdFx0XHQ8c3ZnIHN0eWxlPXtzdHlsZX1cblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHRcdHdpZHRoPXt3aWR0aH1cblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cblx0XHRcdFx0XHR2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fSBzZWN0aW9ucz17KCk9PlxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9Pntcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxlY3RlZFxuXHRcdFx0XHRcdFx0fSxbXSl9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdHt0aGlzLm1vcmUoKX1cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHQuLi5IYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcyxcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGNvbnN0IHNlbGY9dGhpc1xuXHRcdGNvbnN0IHN0eWxlcz10aGlzLnByb3BzLnN0eWxlc1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGRpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gc3R5bGVzLmdldERlZmF1bHQodHlwZSlcblx0XHRcdH0sXG5cdFx0XHRpbmhlcml0ZWRTdHlsZTpkaXJlY3RTdHlsZVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXHRnZXQgY29tcG9zZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmNvbXBvc2VkXG5cdH1cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XG5cdFx0XHR7XG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9PC9Hcm91cD5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=