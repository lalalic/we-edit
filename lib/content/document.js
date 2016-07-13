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
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ id: "content" },
					_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this)
				),
				_react2.default.createElement(
					"svg",
					_extends({ id: "composed" }, others, {
						ref: "svg",
						width: width, height: height, viewBox: "0 0 " + width + " " + height }),
					_react2.default.createElement(Composed, { ref: "composed", gap: pageGap, canvas: { width: width }, sections: function sections() {
							return _this2.children.reduce(function (collected, section) {
								collected.push(section.composed);
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
			svg.setAttribute('height', height + pageGap);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDQSxXQUFrRCxLQUFsRCxTQURBO09BQ2lCLFVBQWlDLEtBQXhDLE1BQU8sUUFEakI7Z0JBQ2tELEtBQXZCLE1BRDNCO09BQ2tDLHFCQURsQztPQUN5Qyx1QkFEekM7aUJBRW9DLEtBQUssS0FBTCxDQUZwQztPQUVBLHdDQUZBO09BRWdCLDBCQUZoQjs7T0FFNEIsMEVBRjVCOztBQUdELFVBQ0w7OztJQUNDOztPQUFLLElBQUcsU0FBSCxFQUFMO2dDQVJpQiwrQ0FRakI7S0FERDtJQUlDOztnQkFBSyxJQUFHLFVBQUgsSUFBa0I7QUFDdEIsV0FBSSxLQUFKO0FBQ0EsYUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9CO0tBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLEtBQUssT0FBTCxFQUFjLFFBQVEsRUFBQyxZQUFELEVBQVIsRUFBaUIsVUFBVTtjQUNqRSxPQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBc0I7QUFDMUMsa0JBQVUsSUFBVixDQUFlLFFBQVEsUUFBUixDQUFmLENBRDBDO0FBRTFDLGVBQU8sU0FBUCxDQUYwQztRQUF0QixFQUduQixFQUhGO09BRGlFO01BQWxFLENBSEQ7S0FTRSxLQUFLLElBQUwsRUFURjtLQUpEO0lBREssQ0FIQzs7OztvQ0E0Qlk7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRXdCLEtBQUssS0FBTCxDQUZ4QjtPQUVOLHNCQUZNO09BRUMsMEJBRkQ7T0FFVSxvQ0FGVjs7QUFHbkIsVUFBTyxPQUFPLE1BQVAsNEJBbENZLHdEQWtDWixFQUFzQztBQUNuQyw4Q0FBZ0IsTUFBSztBQUM3QixZQUFPLGVBQWUsVUFBZixDQUEwQixJQUExQixDQUFQLENBRDZCO0tBRGM7O0FBSTVDLG9CQUFlLFlBQWY7SUFKTSxDQUFQLENBSG1COzs7O2lDQVdMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLElBQUwsQ0FBVSxRQUFWLEVBQ0YsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixRQUFuQixDQUE0QixFQUFDLGNBQWMsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFkLEVBQTdCLEVBREQ7Ozs7c0NBSWtCO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ2IsMEJBRGE7T0FDSixzQkFESTtPQUNHLHdCQURIO2VBRUksS0FBSyxJQUFMLENBRko7T0FFWCxnQkFGVztPQUVOLDBCQUZNO3dCQUdnQixTQUFTLElBQVQsQ0FIaEI7T0FHTiwrQkFBUCxPQUhhO09BR1MsNkJBSFQ7OztBQUtsQixZQUFRLEtBQUssR0FBTCxDQUFTLGFBQVQsRUFBd0IsTUFBeEIsQ0FBUixDQUxrQjtBQU1sQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsU0FBTyxPQUFQLENBQTFCLENBTmtCO0FBT2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxjQUFTLE1BQTNDLEVBUGtCOzs7O3VDQVVDO0FBQ25CLFFBQUssaUJBQUwsR0FEbUI7Ozs7eUJBSWQ7QUFDTCxVQUFPLElBQVAsQ0FESzs7OztRQTdEYzs7O1NBQ2IsY0FBWTtBQURDLFNBMEJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxrQkFBaUIsaUJBQVUsSUFBVjtBQUN2QixpQkFBZ0IsaUJBQVUsTUFBVjtDQUZXLEVBR3ZCLGNBQVMsaUJBQVQ7QUE3QmUsU0FpRWIsZUFBYTtBQUNuQixRQUFPLE9BQU8sVUFBUDtBQUNQLFNBQVEsT0FBTyxXQUFQO0FBQ1IsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkFyRW1COztJQTZFZjs7Ozs7Ozs7Ozs7MkJBQ0c7aUJBQ3VCLEtBQUssS0FBTCxDQUR2QjtPQUNBLDRCQURBO09BQ1Usa0JBRFY7T0FDZSx3QkFEZjs7QUFFUCxPQUFNLE9BQUssS0FBSyxLQUFMLEdBQVcsRUFBQyxRQUFPLEdBQVAsRUFBWSxPQUFNLENBQU4sRUFBeEIsQ0FGSjtBQUdQLFVBQ0M7O01BQU8sR0FBRyxHQUFILEVBQVA7SUFFQyxXQUFXLEdBQVgsQ0FBZSxVQUFDLEtBQUQsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBbUI7U0FBTiwwREFBRSxpQkFBSTs7QUFDakMsWUFBTzs7UUFBTyxHQUFHLEtBQUssTUFBTCxFQUFhLEtBQUssQ0FBTCxFQUF2QjtNQUNOLE1BQU0sR0FBTixDQUFVLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTtBQUNuQixXQUFJLFVBQVM7O1VBQU8sR0FBRyxDQUFILEVBQU0sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZCxHQUErQixDQUEvQixFQUFrQyxLQUFLLENBQUwsRUFBbEQ7UUFBMEQsOENBQVUsSUFBVixDQUExRDtRQUFULENBRGU7QUFFbkIsWUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEdBQWpCLENBRmU7QUFHbkIsWUFBSyxNQUFMLElBQWMsS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUhLO0FBSW5CLFlBQUssS0FBTCxHQUptQjtBQUtuQixjQUFPLE9BQVAsQ0FMbUI7T0FBVixDQURKO01BQVAsQ0FEaUM7S0FBbkIsQ0FGaEI7SUFERCxDQUhPOzs7O3NCQXNCRTtBQUNULFVBQU8sS0FBSyxLQUFMLENBREU7Ozs7UUF2QkwiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgc3RhdGU6e2NvbnRlbnR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7ZG9jdW1lbnRTdHlsZXMsIHBhZ2VHYXAsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBpZD1cImNvbnRlbnRcIj5cblx0XHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8c3ZnIGlkPVwiY29tcG9zZWRcIiB7Li4ub3RoZXJzfVxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cblx0XHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XG5cdFx0XHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKHNlY3Rpb24uY29tcG9zZWQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcblx0XHRcdFx0XHRcdH0sW10pfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcblx0XHRjb25zdCBkb2N1bWVudFN0eWxlcz10aGlzLnByb3BzLmRvY3VtZW50U3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgY29udGVudFN0eWxlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxuXHRcdFx0fSxcblx0XHRcdGNvbnRhaW5lclN0eWxlOmNvbnRlbnRTdHlsZVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQrcGFnZUdhcClcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcblx0fVxuXG5cdG1vcmUoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fTwvR3JvdXA+XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXHRcblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=