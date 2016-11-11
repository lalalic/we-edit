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
				_react2.default.createElement(
					"div",
					null,
					(0, _get3.default)(Document.prototype.__proto__ || (0, _getPrototypeOf2.default)(Document.prototype), "render", this).call(this)
				),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwib3RoZXJzIiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJzZWxmIiwic3R5bGVzIiwiZGlyZWN0U3R5bGUiLCJnZXREZWZhdWx0U3R5bGUiLCJ0eXBlIiwiZ2V0RGVmYXVsdCIsImluaGVyaXRlZFN0eWxlIiwicGFnZSIsInJlZnMiLCJzZXRTdGF0ZSIsImNvbXBvc2VkVGltZSIsIkRhdGUiLCJ0b1N0cmluZyIsInN2ZyIsImluZm8iLCJjb250ZW50SGVpZ2h0IiwicGFnZXMiLCJNYXRoIiwibWF4Iiwic2V0QXR0cmlidXRlIiwiY29tcG9uZW50RGlkTW91bnQiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInN0eWxlIiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MkJBR1o7QUFBQTs7QUFBQSxPQUNVQyxRQURWLEdBQzRDLElBRDVDLENBQ0FDLFFBREEsQ0FDVUQsUUFEVjtBQUFBLGdCQUM0QyxJQUQ1QyxDQUNxQkUsS0FEckI7QUFBQSxPQUM0QkMsS0FENUIsVUFDNEJBLEtBRDVCO0FBQUEsT0FDbUNDLE1BRG5DLFVBQ21DQSxNQURuQztBQUFBLGlC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O0FBaUJBOzs7c0JBRVM7QUFDVCxVQUFPLEtBQUtOLEtBQVo7QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NvbXB1dGVkOntjb21wb3NlZH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xyXG5cdFx0Y29uc3Qge3BhZ2VHYXAsIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8c3ZnIHsuLi5vdGhlcnN9XHJcblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxyXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cclxuXHRcdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fSBzZWN0aW9ucz17KCk9PlxyXG5cdFx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnJlZHVjZSgoY29sbGVjdGVkLCBzZWN0aW9uKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKHNlY3Rpb24uY29tcHV0ZWQuY29tcG9zZWQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxlY3RlZFxyXG5cdFx0XHRcdFx0XHR9LFtdKX1cclxuXHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdHt0aGlzLm1vcmUoKX1cclxuXHRcdFx0XHQ8L3N2Zz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpbmhlcml0ZWRTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcbiAgICBnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGNvbnN0IHNlbGY9dGhpc1xyXG5cdFx0Y29uc3Qgc3R5bGVzPXRoaXMucHJvcHMuc3R5bGVzXHJcbiAgICAgICAgY29uc3Qge3dpZHRoLCBwYWdlR2FwLCBkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XHJcblx0XHRcdFx0cmV0dXJuIHN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXHJcblx0XHRcdH0sXHJcblx0XHRcdGluaGVyaXRlZFN0eWxlOmRpcmVjdFN0eWxlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQocGFnZSl7XHJcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXHJcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGxldCB7cGFnZUdhcCwgd2lkdGgsIGhlaWdodH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xyXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cclxuXHJcblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXHJcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdH1cclxuXHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG5cdFx0d2lkdGg6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVyV2lkdGgsXHJcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxyXG5cdFx0cGFnZUdhcDogMjAsXHJcblx0XHRzdHlsZToge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxufVxyXG5cclxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VjdGlvbnMoKS5tYXAoKHBhZ2VzLGksYSxiLHk9MCk9PntcclxuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xyXG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9PntcclxuXHRcdFx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXHJcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXHJcblx0XHRcdFx0XHRcdFx0aW5mby5wYWdlcysrXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2VcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH08L0dyb3VwPlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGdldCBpbmZvKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xyXG5cdH1cclxufVxyXG4iXX0=