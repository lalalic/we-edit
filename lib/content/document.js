"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _page = require("../composed/page");

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		_classCallCheck(this, Document);

		return _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));
	}

	_createClass(Document, [{
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
			    others = _objectWithoutProperties(_props2, ["pageGap", "style"]);

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: {/*display:"none"*/} },
					_get(Document.prototype.__proto__ || Object.getPrototypeOf(Document.prototype), "render", this).call(this)
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
		key: "compose",
		value: function compose() {}
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
	_inherits(Composed, _Group);

	function Composed() {
		_classCallCheck(this, Composed);

		return _possibleConstructorReturn(this, (Composed.__proto__ || Object.getPrototypeOf(Composed)).apply(this, arguments));
	}

	_createClass(Composed, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJjaGlsZHJlbiIsInJlZHVjZSIsImNvbGxlY3RlZCIsInNlY3Rpb24iLCJwdXNoIiwibW9yZSIsInBhZ2UiLCJyZWZzIiwic2V0U3RhdGUiLCJjb21wb3NlZFRpbWUiLCJEYXRlIiwidG9TdHJpbmciLCJzdmciLCJpbmZvIiwiY29udGVudEhlaWdodCIsInBhZ2VzIiwiTWF0aCIsIm1heCIsInNldEF0dHJpYnV0ZSIsImNvbXBvbmVudERpZE1vdW50IiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJiYWNrZ3JvdW5kIiwiQ29tcG9zZWQiLCJzZWN0aW9ucyIsImdhcCIsImNhbnZhcyIsIl9pbmZvIiwibWFwIiwiaSIsImEiLCJiIiwieSIsIm5ld1BhZ2UiLCJzaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7MkJBR1o7QUFBQTs7QUFBQSxPQUNVQyxRQURWLEdBQzRDLElBRDVDLENBQ0FDLFFBREEsQ0FDVUQsUUFEVjtBQUFBLGdCQUM0QyxJQUQ1QyxDQUNxQkUsS0FEckI7QUFBQSxPQUM0QkMsS0FENUIsVUFDNEJBLEtBRDVCO0FBQUEsT0FDbUNDLE1BRG5DLFVBQ21DQSxNQURuQzs7QUFBQSxpQkFFMkIsS0FBS0YsS0FGaEM7QUFBQSxPQUVBRyxPQUZBLFdBRUFBLE9BRkE7QUFBQSxPQUVTQyxLQUZULFdBRVNBLEtBRlQ7QUFBQSxPQUVtQkMsTUFGbkI7O0FBR0QsVUFDTDtBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsT0FBSyxPQUFPLENBQUMsa0JB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QUtqQixNQUFmLEVBQXVCLEtBQUtvQyxDQUE1QjtBQUNOakIsWUFBTWdCLEdBQU4sQ0FBVSxVQUFDekIsSUFBRCxFQUFNMEIsQ0FBTixFQUFVO0FBQ25CLFdBQUlJLFVBQVM7QUFBQTtBQUFBLFVBQU8sR0FBR0QsQ0FBVixFQUFhLEdBQUcsQ0FBQ04sT0FBT2xDLEtBQVAsR0FBYVcsS0FBSytCLElBQUwsQ0FBVTFDLEtBQXhCLElBQStCLENBQS9DLEVBQWtELEtBQUtxQyxDQUF2RDtBQUEwRCxzREFBVTFCLElBQVY7QUFBMUQsUUFBYjtBQUNBNkIsWUFBSTdCLEtBQUsrQixJQUFMLENBQVV6QyxNQUFWLEdBQWlCZ0MsR0FBckI7QUFDQWYsWUFBS2pCLE1BQUwsSUFBY1UsS0FBSytCLElBQUwsQ0FBVXpDLE1BQVYsR0FBaUJnQyxHQUEvQjtBQUNBZixZQUFLRSxLQUFMO0FBQ0EsY0FBT3FCLE9BQVA7QUFDQSxPQU5EO0FBRE0sTUFBUDtBQVNBLEtBVkQ7QUFGRCxJQUREO0FBaUJBOzs7c0JBRVM7QUFDVCxVQUFPLEtBQUtOLEtBQVo7QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NvbXB1dGVkOntjb21wb3NlZH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xyXG5cdFx0Y29uc3Qge3BhZ2VHYXAsIHN0eWxlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3svKmRpc3BsYXk6XCJub25lXCIqL319PlxyXG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8c3ZnIHN0eWxlPXtzdHlsZX1cclxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXHJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9XHJcblx0XHRcdFx0XHRoZWlnaHQ9e2hlaWdodH1cclxuXHRcdFx0XHRcdHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XHJcblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cclxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9PntcclxuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcclxuXHRcdFx0XHRcdFx0fSxbXSl9XHJcblx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0PC9zdmc+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG4gICAgfVxyXG5cdFxyXG5cdGNvbXBvc2UoKXtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQocGFnZSl7XHJcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXHJcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGxldCB7cGFnZUdhcCwgd2lkdGgsIGhlaWdodH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xyXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cclxuXHJcblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXHJcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcclxuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdH1cclxuXHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG5cdFx0d2lkdGg6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVyV2lkdGgsXHJcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxyXG5cdFx0cGFnZUdhcDogMjAsXHJcblx0XHRzdHlsZToge1xyXG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBjb21wb3NlZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVmcy5jb21wb3NlZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VjdGlvbnMoKS5tYXAoKHBhZ2VzLGksYSxiLHk9MCk9PntcclxuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xyXG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9PntcclxuXHRcdFx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXHJcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXHJcblx0XHRcdFx0XHRcdFx0aW5mby5wYWdlcysrXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2VcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH08L0dyb3VwPlxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGdldCBpbmZvKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xyXG5cdH1cclxufVxyXG4iXX0=