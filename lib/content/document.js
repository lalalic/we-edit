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

			var composed = this.computed.composed;
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
					null,
					_get(Object.getPrototypeOf(Document.prototype), "render", this).call(this)
				),
				_react2.default.createElement(
					"svg",
					_extends({}, others, {
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
			var documentStyles = this.props.documentStyles;
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;
			var contentStyle = this.computed.contentStyle;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDVSxXQUFrQyxLQUE1QyxTQUFVLFNBRFY7Z0JBQzRDLEtBQXZCLE1BRHJCO09BQzRCLHFCQUQ1QjtPQUNtQyx1QkFEbkM7aUJBRW9DLEtBQUssS0FBTCxDQUZwQztPQUVBLHdDQUZBO09BRWdCLDBCQUZoQjs7T0FFNEIsMEVBRjVCOztBQUdELFVBQ0w7OztJQUNDOzs7Z0NBUmlCLCtDQVFqQjtLQUREO0lBSUM7O2tCQUFTO0FBQ1IsV0FBSSxLQUFKO0FBQ0EsYUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9CO0tBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLEtBQUssT0FBTCxFQUFjLFFBQVEsRUFBQyxZQUFELEVBQVIsRUFBaUIsVUFBVTtjQUNqRSxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBc0I7QUFDbkQsa0JBQVUsSUFBVixDQUFlLFFBQVEsUUFBUixDQUFpQixRQUFqQixDQUFmLENBRG1EO0FBRW5ELGVBQU8sU0FBUCxDQUZtRDtRQUF0QixFQUc1QixFQUhGO09BRGlFO01BQWxFLENBSEQ7S0FTRSxLQUFLLElBQUwsRUFURjtLQUpEO0lBREssQ0FIQzs7OztvQ0E0Qlk7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRVUsS0FBSyxLQUFMLENBRlY7T0FFTixzQkFGTTtPQUVDLDBCQUZEO09BR1osZUFBYyxLQUFLLFFBQUwsQ0FBZCxhQUhZOztBQUluQixVQUFPLE9BQU8sTUFBUCw0QkFuQ1ksd0RBbUNaLEVBQXNDO0FBQ25DLDhDQUFnQixNQUFLO0FBQzdCLFlBQU8sZUFBZSxVQUFmLENBQTBCLElBQTFCLENBQVAsQ0FENkI7S0FEYzs7QUFJNUMsb0JBQWUsWUFBZjtJQUpNLENBQVAsQ0FKbUI7Ozs7aUNBWUwsTUFBSztBQUNuQixPQUFHLEtBQUssSUFBTCxDQUFVLFFBQVYsRUFDRixLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLFFBQW5CLENBQTRCLEVBQUMsY0FBYyxJQUFJLElBQUosR0FBVyxRQUFYLEVBQWQsRUFBN0IsRUFERDs7OztzQ0FJa0I7aUJBQ1csS0FBSyxLQUFMLENBRFg7T0FDYiwwQkFEYTtPQUNKLHNCQURJO09BQ0csd0JBREg7ZUFFSSxLQUFLLElBQUwsQ0FGSjtPQUVYLGdCQUZXO09BRU4sMEJBRk07d0JBR2dCLFNBQVMsSUFBVCxDQUhoQjtPQUdOLCtCQUFQLE9BSGE7T0FHUyw2QkFIVDs7O0FBS2xCLFlBQVEsS0FBSyxHQUFMLENBQVMsYUFBVCxFQUF3QixNQUF4QixJQUFnQyxJQUFFLE9BQUYsQ0FMdEI7QUFNbEIsT0FBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLE1BQTFCLEVBTmtCO0FBT2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxjQUFTLE1BQTNDLEVBUGtCOzs7O3VDQVVDO0FBQ25CLFFBQUssaUJBQUwsR0FEbUI7Ozs7eUJBSWQ7QUFDTCxVQUFPLElBQVAsQ0FESzs7OztRQTlEYzs7O1NBQ2IsY0FBWTtBQURDLFNBMEJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxrQkFBaUIsaUJBQVUsSUFBVjtBQUN2QixpQkFBZ0IsaUJBQVUsTUFBVjtDQUZXLEVBR3ZCLGNBQVMsaUJBQVQ7QUE3QmUsU0FrRWIsZUFBYTtBQUNuQixRQUFPLE9BQU8sTUFBUCxJQUFnQixXQUFoQixHQUE4QixLQUE5QixHQUFzQyxPQUFPLFVBQVA7QUFDN0MsU0FBUSxPQUFPLE1BQVAsSUFBZ0IsV0FBaEIsR0FBOEIsS0FBOUIsR0FBc0MsT0FBTyxXQUFQO0FBQzlDLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBdEVtQjs7SUE4RWY7Ozs7Ozs7Ozs7OzJCQUNHO2lCQUN1QixLQUFLLEtBQUwsQ0FEdkI7T0FDQSw0QkFEQTtPQUNVLGtCQURWO09BQ2Usd0JBRGY7O0FBRVAsT0FBTSxPQUFLLEtBQUssS0FBTCxHQUFXLEVBQUMsUUFBTyxHQUFQLEVBQVksT0FBTSxDQUFOLEVBQXhCLENBRko7QUFHUCxVQUNDOztNQUFPLEdBQUcsR0FBSCxFQUFQO0lBRUMsV0FBVyxHQUFYLENBQWUsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQW1CO1NBQU4sMERBQUUsaUJBQUk7O0FBQ2pDLFlBQU87O1FBQU8sR0FBRyxLQUFLLE1BQUwsRUFBYSxLQUFLLENBQUwsRUFBdkI7TUFDTixNQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBTSxDQUFOLEVBQVU7QUFDbkIsV0FBSSxVQUFTOztVQUFPLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWQsR0FBK0IsQ0FBL0IsRUFBa0MsS0FBSyxDQUFMLEVBQWxEO1FBQTBELDhDQUFVLElBQVYsQ0FBMUQ7UUFBVCxDQURlO0FBRW5CLFlBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUZlO0FBR25CLFlBQUssTUFBTCxJQUFjLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsR0FBakIsQ0FISztBQUluQixZQUFLLEtBQUwsR0FKbUI7QUFLbkIsY0FBTyxPQUFQLENBTG1CO09BQVYsQ0FESjtNQUFQLENBRGlDO0tBQW5CLENBRmhCO0lBREQsQ0FITzs7OztzQkFzQkU7QUFDVCxVQUFPLEtBQUssS0FBTCxDQURFOzs7O1FBdkJMIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcHV0ZWQ6e2NvbXBvc2VkfSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG5cdFx0Y29uc3Qge2RvY3VtZW50U3R5bGVzLCBwYWdlR2FwLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PHN2ZyB7Li4ub3RoZXJzfVxuXHRcdFx0XHRcdHJlZj1cInN2Z1wiXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBnYXA9e3BhZ2VHYXB9IGNhbnZhcz17e3dpZHRofX0gc2VjdGlvbnM9eygpPT5cblx0XHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XG5cdFx0XHRcdFx0XHRcdGNvbGxlY3RlZC5wdXNoKHNlY3Rpb24uY29tcHV0ZWQuY29tcG9zZWQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcblx0XHRcdFx0XHRcdH0sW10pfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRjb250YWluZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcblx0XHRjb25zdCBkb2N1bWVudFN0eWxlcz10aGlzLnByb3BzLmRvY3VtZW50U3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMuY29tcHV0ZWRcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XG5cdFx0XHRcdHJldHVybiBkb2N1bWVudFN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0Y29udGFpbmVyU3R5bGU6Y29udGVudFN0eWxlXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xuXHRcdGlmKHRoaXMucmVmcy5jb21wb3NlZClcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7c3ZnLCBjb21wb3NlZH09dGhpcy5yZWZzXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cblxuXHRcdGhlaWdodD1cdE1hdGgubWF4KGNvbnRlbnRIZWlnaHQsIGhlaWdodCkrMSpwYWdlR2FwXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXG5cdH1cblxuXHRtb3JlKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxuXG5cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XG5cdFx0XHR7XG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9PC9Hcm91cD5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=