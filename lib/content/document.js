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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDQSxXQUFrRCxLQUFsRCxTQURBO09BQ2lCLFVBQWlDLEtBQXhDLE1BQU8sUUFEakI7Z0JBQ2tELEtBQXZCLE1BRDNCO09BQ2tDLHFCQURsQztPQUN5Qyx1QkFEekM7aUJBRW9DLEtBQUssS0FBTCxDQUZwQztPQUVBLHdDQUZBO09BRWdCLDBCQUZoQjs7T0FFNEIsMEVBRjVCOztBQUdELFVBQ0w7OztJQUNDOztPQUFLLElBQUcsU0FBSCxFQUFMO2dDQVJpQiwrQ0FRakI7S0FERDtJQUlDOztnQkFBSyxJQUFHLFVBQUgsSUFBa0I7QUFDdEIsV0FBSSxLQUFKO0FBQ0EsYUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9CO0tBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLEtBQUssT0FBTCxFQUFjLFFBQVEsRUFBQyxZQUFELEVBQVIsRUFBaUIsVUFBVTtjQUNqRSxPQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBc0I7QUFDMUMsa0JBQVUsSUFBVixDQUFlLFFBQVEsUUFBUixDQUFmLENBRDBDO0FBRTFDLGVBQU8sU0FBUCxDQUYwQztRQUF0QixFQUduQixFQUhGO09BRGlFO01BQWxFLENBSEQ7S0FTRSxLQUFLLElBQUwsRUFURjtLQUpEO0lBREssQ0FIQzs7OztvQ0E0Qlk7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRXdCLEtBQUssS0FBTCxDQUZ4QjtPQUVOLHNCQUZNO09BRUMsMEJBRkQ7T0FFVSxvQ0FGVjs7QUFHbkIsVUFBTyxPQUFPLE1BQVAsNEJBbENZLHdEQWtDWixFQUFzQztBQUNuQyw4Q0FBZ0IsTUFBSztBQUM3QixZQUFPLGVBQWUsVUFBZixDQUEwQixJQUExQixDQUFQLENBRDZCO0tBRGM7O0FBSTVDLG9CQUFlLFlBQWY7SUFKTSxDQUFQLENBSG1COzs7O2lDQVdMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLElBQUwsQ0FBVSxRQUFWLEVBQ0YsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixRQUFuQixDQUE0QixFQUFDLGNBQWMsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFkLEVBQTdCLEVBREQ7Ozs7c0NBSWtCO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ2IsMEJBRGE7T0FDSixzQkFESTtPQUNHLHdCQURIO2VBRUksS0FBSyxJQUFMLENBRko7T0FFWCxnQkFGVztPQUVOLDBCQUZNO3dCQUdnQixTQUFTLElBQVQsQ0FIaEI7T0FHTiwrQkFBUCxPQUhhO09BR1MsNkJBSFQ7OztBQUtsQixZQUFRLEtBQUssR0FBTCxDQUFTLGFBQVQsRUFBd0IsTUFBeEIsSUFBZ0MsSUFBRSxPQUFGLENBTHRCO0FBTWxCLE9BQUksWUFBSixDQUFpQixRQUFqQixFQUEwQixNQUExQixFQU5rQjtBQU9sQixPQUFJLFlBQUosQ0FBaUIsU0FBakIsV0FBa0MsY0FBUyxNQUEzQyxFQVBrQjs7Ozt1Q0FVQztBQUNuQixRQUFLLGlCQUFMLEdBRG1COzs7O3lCQUlkO0FBQ0wsVUFBTyxJQUFQLENBREs7Ozs7UUE3RGM7OztTQUNiLGNBQVk7QUFEQyxTQTBCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsa0JBQWlCLGlCQUFVLElBQVY7QUFDdkIsaUJBQWdCLGlCQUFVLE1BQVY7Q0FGVyxFQUd2QixjQUFTLGlCQUFUO0FBN0JlLFNBaUViLGVBQWE7QUFDbkIsUUFBTyxPQUFPLFVBQVA7QUFDUCxTQUFRLE9BQU8sV0FBUDtBQUNSLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBckVtQjs7SUE2RWY7Ozs7Ozs7Ozs7OzJCQUNHO2lCQUN1QixLQUFLLEtBQUwsQ0FEdkI7T0FDQSw0QkFEQTtPQUNVLGtCQURWO09BQ2Usd0JBRGY7O0FBRVAsT0FBTSxPQUFLLEtBQUssS0FBTCxHQUFXLEVBQUMsUUFBTyxHQUFQLEVBQVksT0FBTSxDQUFOLEVBQXhCLENBRko7QUFHUCxVQUNDOztNQUFPLEdBQUcsR0FBSCxFQUFQO0lBRUMsV0FBVyxHQUFYLENBQWUsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQW1CO1NBQU4sMERBQUUsaUJBQUk7O0FBQ2pDLFlBQU87O1FBQU8sR0FBRyxLQUFLLE1BQUwsRUFBYSxLQUFLLENBQUwsRUFBdkI7TUFDTixNQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBTSxDQUFOLEVBQVU7QUFDbkIsV0FBSSxVQUFTOztVQUFPLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWQsR0FBK0IsQ0FBL0IsRUFBa0MsS0FBSyxDQUFMLEVBQWxEO1FBQTBELDhDQUFVLElBQVYsQ0FBMUQ7UUFBVCxDQURlO0FBRW5CLFlBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUZlO0FBR25CLFlBQUssTUFBTCxJQUFjLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsR0FBakIsQ0FISztBQUluQixZQUFLLEtBQUwsR0FKbUI7QUFLbkIsY0FBTyxPQUFQLENBTG1CO09BQVYsQ0FESjtNQUFQLENBRGlDO0tBQW5CLENBRmhCO0lBREQsQ0FITzs7OztzQkFzQkU7QUFDVCxVQUFPLEtBQUssS0FBTCxDQURFOzs7O1FBdkJMIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWQsIHN0YXRlOntjb250ZW50fSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG5cdFx0Y29uc3Qge2RvY3VtZW50U3R5bGVzLCBwYWdlR2FwLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgaWQ9XCJjb250ZW50XCI+XG5cdFx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PHN2ZyBpZD1cImNvbXBvc2VkXCIgey4uLm90aGVyc31cblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHRcdHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XG5cdFx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuLnJlZHVjZSgoY29sbGVjdGVkLCBzZWN0aW9uKT0+e1xuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXBvc2VkKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXG5cdFx0XHRcdFx0XHR9LFtdKX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0Y29uc3QgZG9jdW1lbnRTdHlsZXM9dGhpcy5wcm9wcy5kb2N1bWVudFN0eWxlc1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGNvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZSh0eXBlKXtcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50U3R5bGVzLmdldERlZmF1bHQodHlwZSlcblx0XHRcdH0sXG5cdFx0XHRjb250YWluZXJTdHlsZTpjb250ZW50U3R5bGVcbiAgICAgICAgfSlcbiAgICB9XG5cblx0YXBwZW5kQ29tcG9zZWQocGFnZSl7XG5cdFx0aWYodGhpcy5yZWZzLmNvbXBvc2VkKVxuXHRcdFx0dGhpcy5yZWZzLmNvbXBvc2VkLnNldFN0YXRlKHtjb21wb3NlZFRpbWU6IG5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCB7cGFnZUdhcCwgd2lkdGgsIGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtzdmcsIGNvbXBvc2VkfT10aGlzLnJlZnNcblx0XHRsZXQge2hlaWdodDpjb250ZW50SGVpZ2h0LCBwYWdlc309Y29tcG9zZWQuaW5mb1xuXG5cdFx0aGVpZ2h0PVx0TWF0aC5tYXgoY29udGVudEhlaWdodCwgaGVpZ2h0KSsxKnBhZ2VHYXBcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGhlaWdodClcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcblx0fVxuXG5cdG1vcmUoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fTwvR3JvdXA+XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXHRcblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=