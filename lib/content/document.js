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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJkaXNwbGF5IiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzJCQUdaO0FBQUE7O0FBQUEsT0FDVUMsUUFEVixHQUM0QyxJQUQ1QyxDQUNBQyxRQURBLENBQ1VELFFBRFY7QUFBQSxnQkFDNEMsSUFENUMsQ0FDcUJFLEtBRHJCO0FBQUEsT0FDNEJDLEtBRDVCLFVBQzRCQSxLQUQ1QjtBQUFBLE9BQ21DQyxNQURuQyxVQUNtQ0EsTUFEbkM7QUFBQSxpQkFFMkIsS0FBS0YsS0FGaEM7QUFBQSxPQUVBRyxPQUZBLFdBRUFBLE9BRkE7QUFBQSxPQUVTQyxLQUZULFdBRVNBLEtBRlQ7QUFBQSxPQUVtQkMsTUFGbkI7O0FBR0QsVUFDTDtBQUFBO0FBQUE7QUFDQztBQUFB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QUFBQSxRQUFPLEdBQUd0QixLQUFLbEIsTUFBZixFQUF1QixLQUFLcUMsQ0FBNUI7QUFDTmpCLFlBQU1nQixHQUFOLENBQVUsVUFBQ3pCLElBQUQsRUFBTTBCLENBQU4sRUFBVTtBQUNuQixXQUFJSSxVQUFTO0FBQUE7QUFBQSxVQUFPLEdBQUdELENBQVYsRUFBYSxHQUFHLENBQUNOLE9BQU9uQyxLQUFQLEdBQWFZLEtBQUsrQixJQUFMLENBQVUzQyxLQUF4QixJQUErQixDQUEvQyxFQUFrRCxLQUFLc0MsQ0FBdkQ7QUFBMEQsc0RBQVUxQixJQUFWO0FBQTFELFFBQWI7QUFDQTZCLFlBQUk3QixLQUFLK0IsSUFBTCxDQUFVMUMsTUFBVixHQUFpQmlDLEdBQXJCO0FBQ0FmLFlBQUtsQixNQUFMLElBQWNXLEtBQUsrQixJQUFMLENBQVUxQyxNQUFWLEdBQWlCaUMsR0FBL0I7QUFDQWYsWUFBS0UsS0FBTDtBQUNBLGNBQU9xQixPQUFQO0FBQ0EsT0FORDtBQURNLE1BQVA7QUFTQSxLQVZEO0FBRkQsSUFERDtBQWlCQTs7O3NCQUVTO0FBQ1QsVUFBTyxLQUFLTixLQUFaO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7cGFnZUdhcCwgc3R5bGUsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJub25lXCJ9fT5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PHN2ZyBzdHlsZT17c3R5bGV9XG5cdFx0XHRcdFx0cmVmPVwic3ZnXCJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9XG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XG5cdFx0XHRcdFx0dmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cblx0XHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XG5cdFx0XHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKHNlY3Rpb24uY29tcHV0ZWQuY29tcG9zZWQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcblx0XHRcdFx0XHRcdH0sW10pfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXHRnZXQgY29tcG9zZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmNvbXBvc2VkXG5cdH1cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XG5cdFx0XHR7XG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9PC9Hcm91cD5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=