"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var composed = this.composed;
			var content = this.state.content;
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var _props2 = this.props;
			var documentStyles = _props2.documentStyles;
			var pageGap = _props2.pageGap;

			var others = _objectWithoutProperties(_props2, ["documentStyles", "pageGap"]);

			return _react2.default.createElement(
				"svg",
				_extends({}, others, {
					ref: "svg",
					width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this),
				_react2.default.createElement(Composed, { ref: "composed", gap: pageGap, canvas: { width: width }, sections: function sections() {
						return _this2.children.reduce(function (collected, section) {
							collected.push(section.composed);
							return collected;
						}, []);
					}
				}),
				this.more()
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var documentStyles = this.props.documentStyles;
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;
			var contentStyle = _props3.contentStyle;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				getDefaultStyle: function getDefaultStyle(type) {
					return documentStyles.getDefault(type);
				},

				containerStyle: contentStyle
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
			var _props4 = this.props;
			var pageGap = _props4.pageGap;
			var width = _props4.width;
			var height = _props4.height;
			var _refs = this.refs;
			var svg = _refs.svg;
			var composed = _refs.composed;
			var _composed$info = composed.info;
			var contentHeight = _composed$info.height;
			var pages = _composed$info.pages;


			height = Math.max(contentHeight, height);
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
Document.childContextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func,
	containerStyle: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: window.innerWidth,
	height: window.innerHeight,
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
	}

	_createClass(Composed, [{
		key: "render",
		value: function render() {
			var _props5 = this.props;
			var sections = _props5.sections;
			var gap = _props5.gap;
			var canvas = _props5.canvas;

			var info = this._info = { height: gap, pages: 0 };
			return _react2.default.createElement(
				_group2.default,
				{ y: gap },
				sections().map(function (pages, i, a, b) {
					var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDQSxXQUFrRCxLQUFsRCxTQURBO09BQ2lCLFVBQWlDLEtBQXhDLE1BQU8sUUFEakI7Z0JBQ2tELEtBQXZCLE1BRDNCO09BQ2tDLHFCQURsQztPQUN5Qyx1QkFEekM7aUJBRW9DLEtBQUssS0FBTCxDQUZwQztPQUVBLHdDQUZBO09BRWdCLDBCQUZoQjs7T0FFNEIsMEVBRjVCOztBQUdELFVBQ0w7O2lCQUFTO0FBQ1IsVUFBSSxLQUFKO0FBQ0EsWUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9COytCQVBrQiwrQ0FPbEI7SUFJQyw4QkFBQyxRQUFELElBQVUsS0FBSSxVQUFKLEVBQWUsS0FBSyxPQUFMLEVBQWMsUUFBUSxFQUFDLFlBQUQsRUFBUixFQUFpQixVQUFVO2FBQ2pFLE9BQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsVUFBQyxTQUFELEVBQVksT0FBWixFQUFzQjtBQUMxQyxpQkFBVSxJQUFWLENBQWUsUUFBUSxRQUFSLENBQWYsQ0FEMEM7QUFFMUMsY0FBTyxTQUFQLENBRjBDO09BQXRCLEVBR25CLEVBSEY7TUFEaUU7S0FBbEUsQ0FKRDtJQVVFLEtBQUssSUFBTCxFQVZGO0lBREssQ0FIQzs7OztvQ0F3Qlk7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRXdCLEtBQUssS0FBTCxDQUZ4QjtPQUVOLHNCQUZNO09BRUMsMEJBRkQ7T0FFVSxvQ0FGVjs7QUFHbkIsVUFBTyxPQUFPLE1BQVAsNEJBOUJZLHdEQThCWixFQUFzQztBQUNuQyw4Q0FBZ0IsTUFBSztBQUM3QixZQUFPLGVBQWUsVUFBZixDQUEwQixJQUExQixDQUFQLENBRDZCO0tBRGM7O0FBSTVDLG9CQUFlLFlBQWY7SUFKTSxDQUFQLENBSG1COzs7O2lDQVdMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLElBQUwsQ0FBVSxRQUFWLEVBQ0YsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixRQUFuQixDQUE0QixFQUFDLGNBQWMsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFkLEVBQTdCLEVBREQ7Ozs7c0NBSWtCO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ2IsMEJBRGE7T0FDSixzQkFESTtPQUNHLHdCQURIO2VBRUksS0FBSyxJQUFMLENBRko7T0FFWCxnQkFGVztPQUVOLDBCQUZNO3dCQUdnQixTQUFTLElBQVQsQ0FIaEI7T0FHTiwrQkFBUCxPQUhhO09BR1MsNkJBSFQ7OztBQUtsQixZQUFRLEtBQUssR0FBTCxDQUFTLGFBQVQsRUFBd0IsTUFBeEIsQ0FBUixDQUxrQjtBQU1sQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsTUFBMUIsRUFOa0I7QUFPbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLGNBQVMsTUFBM0MsRUFQa0I7Ozs7dUNBVUM7QUFDbkIsUUFBSyxpQkFBTCxHQURtQjs7Ozt5QkFJZDtBQUNMLFVBQU8sSUFBUCxDQURLOzs7O1FBekRjOzs7U0FDYixjQUFZO0FBREMsU0FzQlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLGtCQUFpQixpQkFBVSxJQUFWO0FBQ3ZCLGlCQUFnQixpQkFBVSxNQUFWO0NBRlcsRUFHdkIsY0FBUyxpQkFBVDtBQXpCZSxTQTZEYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxVQUFQO0FBQ1AsU0FBUSxPQUFPLFdBQVA7QUFDUixVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQWpFbUI7O0lBeUVmOzs7Ozs7Ozs7OzsyQkFDRztpQkFDdUIsS0FBSyxLQUFMLENBRHZCO09BQ0EsNEJBREE7T0FDVSxrQkFEVjtPQUNlLHdCQURmOztBQUVQLE9BQU0sT0FBSyxLQUFLLEtBQUwsR0FBVyxFQUFDLFFBQU8sR0FBUCxFQUFZLE9BQU0sQ0FBTixFQUF4QixDQUZKO0FBR1AsVUFDQzs7TUFBTyxHQUFHLEdBQUgsRUFBUDtJQUVDLFdBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFtQjtTQUFOLDBEQUFFLGlCQUFJOztBQUNqQyxZQUFPOztRQUFPLEdBQUcsS0FBSyxNQUFMLEVBQWEsS0FBSyxDQUFMLEVBQXZCO01BQ04sTUFBTSxHQUFOLENBQVUsVUFBQyxJQUFELEVBQU0sQ0FBTixFQUFVO0FBQ25CLFdBQUksVUFBUzs7VUFBTyxHQUFHLENBQUgsRUFBTSxHQUFHLENBQUMsT0FBTyxLQUFQLEdBQWEsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFkLEdBQStCLENBQS9CLEVBQWtDLEtBQUssQ0FBTCxFQUFsRDtRQUEwRCw4Q0FBVSxJQUFWLENBQTFEO1FBQVQsQ0FEZTtBQUVuQixZQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsR0FBakIsQ0FGZTtBQUduQixZQUFLLE1BQUwsSUFBYyxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEdBQWpCLENBSEs7QUFJbkIsWUFBSyxLQUFMLEdBSm1CO0FBS25CLGNBQU8sT0FBUCxDQUxtQjtPQUFWLENBREo7TUFBUCxDQURpQztLQUFuQixDQUZoQjtJQURELENBSE87Ozs7c0JBc0JFO0FBQ1QsVUFBTyxLQUFLLEtBQUwsQ0FERTs7OztRQXZCTCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtIYXNDaGlsZH0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbXBvc2VkLCBzdGF0ZTp7Y29udGVudH0sIHByb3BzOnt3aWR0aCwgaGVpZ2h0fX09dGhpc1xuXHRcdGNvbnN0IHtkb2N1bWVudFN0eWxlcywgcGFnZUdhcCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi5vdGhlcnN9XG5cdFx0XHRcdHJlZj1cInN2Z1wiXG5cdFx0XHRcdHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cblx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9Pntcblx0XHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKHNlY3Rpb24uY29tcG9zZWQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXG5cdFx0XHRcdFx0fSxbXSl9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0e3RoaXMubW9yZSgpfVxuXHRcdFx0PC9zdmc+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcblx0XHRjb25zdCBkb2N1bWVudFN0eWxlcz10aGlzLnByb3BzLmRvY3VtZW50U3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgY29udGVudFN0eWxlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxuXHRcdFx0fSxcblx0XHRcdGNvbnRhaW5lclN0eWxlOmNvbnRlbnRTdHlsZVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXG5cdH1cblxuXHRtb3JlKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcblx0XHRwYWdlR2FwOiAyMCxcblx0XHRzdHlsZToge1xuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXG5cdFx0fVxuXHR9XG5cblxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7c2VjdGlvbnMsIGdhcCwgY2FudmFzfT10aGlzLnByb3BzXG5cdFx0Y29uc3QgaW5mbz10aGlzLl9pbmZvPXtoZWlnaHQ6Z2FwLCBwYWdlczowfVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgeT17Z2FwfT5cblx0XHRcdHtcblx0XHRcdFx0c2VjdGlvbnMoKS5tYXAoKHBhZ2VzLGksYSxiLHk9MCk9Pntcblx0XHRcdFx0XHRyZXR1cm4gPEdyb3VwIHk9e2luZm8uaGVpZ2h0fSBrZXk9e2l9Pntcblx0XHRcdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xuXHRcdFx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IHg9eyhjYW52YXMud2lkdGgtcGFnZS5zaXplLndpZHRoKS8yfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0XHRcdHkrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcblx0XHRcdFx0XHRcdFx0aW5mby5oZWlnaHQrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcblx0XHRcdFx0XHRcdFx0aW5mby5wYWdlcysrXG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH08L0dyb3VwPlxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblx0XG5cdGdldCBpbmZvKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cblx0fVxufVxuIl19