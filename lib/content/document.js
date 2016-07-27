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
			var pageGap = _props2.pageGap;

			var others = _objectWithoutProperties(_props2, ["pageGap"]);

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
			var self = this;
			var styles = this.props.styles;
			var _props3 = this.props;
			var width = _props3.width;
			var pageGap = _props3.pageGap;
			var directStyle = _props3.directStyle;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDVSxXQUFrQyxLQUE1QyxTQUFVLFNBRFY7Z0JBQzRDLEtBQXZCLE1BRHJCO09BQzRCLHFCQUQ1QjtPQUNtQyx1QkFEbkM7aUJBRW9CLEtBQUssS0FBTCxDQUZwQjtPQUVBLDBCQUZBOztPQUVZLHdEQUZaOztBQUdELFVBQ0w7OztJQUNDOzs7Z0NBUmlCLCtDQVFqQjtLQUREO0lBSUM7O2tCQUFTO0FBQ1IsV0FBSSxLQUFKO0FBQ0EsYUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9CO0tBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLEtBQUssT0FBTCxFQUFjLFFBQVEsRUFBQyxZQUFELEVBQVIsRUFBaUIsVUFBVTtjQUNqRSxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBc0I7QUFDbkQsa0JBQVUsSUFBVixDQUFlLFFBQVEsUUFBUixDQUFpQixRQUFqQixDQUFmLENBRG1EO0FBRW5ELGVBQU8sU0FBUCxDQUZtRDtRQUF0QixFQUc1QixFQUhGO09BRGlFO01BQWxFLENBSEQ7S0FTRSxLQUFLLElBQUwsRUFURjtLQUpEO0lBREssQ0FIQzs7OztvQ0E0Qlk7QUFDbkIsT0FBTSxPQUFLLElBQUwsQ0FEYTtBQUVuQixPQUFNLFNBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZNO2lCQUd1QixLQUFLLEtBQUwsQ0FIdkI7T0FHTixzQkFITTtPQUdDLDBCQUhEO09BR1Usa0NBSFY7O0FBSW5CLFVBQU8sT0FBTyxNQUFQLDRCQW5DWSx3REFtQ1osRUFBc0M7QUFDbkMsOENBQWdCLE1BQUs7QUFDN0IsWUFBTyxPQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBUCxDQUQ2QjtLQURjOztBQUk1QyxvQkFBZSxXQUFmO0lBSk0sQ0FBUCxDQUptQjs7OztpQ0FZTCxNQUFLO0FBQ25CLE9BQUcsS0FBSyxJQUFMLENBQVUsUUFBVixFQUNGLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBbUIsUUFBbkIsQ0FBNEIsRUFBQyxjQUFjLElBQUksSUFBSixHQUFXLFFBQVgsRUFBZCxFQUE3QixFQUREOzs7O3NDQUlrQjtpQkFDVyxLQUFLLEtBQUwsQ0FEWDtPQUNiLDBCQURhO09BQ0osc0JBREk7T0FDRyx3QkFESDtlQUVJLEtBQUssSUFBTCxDQUZKO09BRVgsZ0JBRlc7T0FFTiwwQkFGTTt3QkFHZ0IsU0FBUyxJQUFULENBSGhCO09BR04sK0JBQVAsT0FIYTtPQUdTLDZCQUhUOzs7QUFLbEIsWUFBUSxLQUFLLEdBQUwsQ0FBUyxhQUFULEVBQXdCLE1BQXhCLElBQWdDLElBQUUsT0FBRixDQUx0QjtBQU1sQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsTUFBMUIsRUFOa0I7QUFPbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLGNBQVMsTUFBM0MsRUFQa0I7Ozs7dUNBVUM7QUFDbkIsUUFBSyxpQkFBTCxHQURtQjs7Ozt5QkFJZDtBQUNMLFVBQU8sSUFBUCxDQURLOzs7O1FBOURjOzs7U0FDYixjQUFZO0FBREMsU0EwQlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLGtCQUFpQixpQkFBVSxJQUFWO0FBQ3ZCLGlCQUFnQixpQkFBVSxNQUFWO0NBRlcsRUFHdkIsY0FBUyxpQkFBVDtBQTdCZSxTQWtFYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxNQUFQLElBQWdCLFdBQWhCLEdBQThCLEtBQTlCLEdBQXNDLE9BQU8sVUFBUDtBQUM3QyxTQUFRLE9BQU8sTUFBUCxJQUFnQixXQUFoQixHQUE4QixLQUE5QixHQUFzQyxPQUFPLFdBQVA7QUFDOUMsVUFBUyxFQUFUO0FBQ0EsUUFBTztBQUNOLGNBQVcsV0FBWDtFQUREOztrQkF0RW1COztJQThFZjs7Ozs7Ozs7Ozs7MkJBQ0c7aUJBQ3VCLEtBQUssS0FBTCxDQUR2QjtPQUNBLDRCQURBO09BQ1Usa0JBRFY7T0FDZSx3QkFEZjs7QUFFUCxPQUFNLE9BQUssS0FBSyxLQUFMLEdBQVcsRUFBQyxRQUFPLEdBQVAsRUFBWSxPQUFNLENBQU4sRUFBeEIsQ0FGSjtBQUdQLFVBQ0M7O01BQU8sR0FBRyxHQUFILEVBQVA7SUFFQyxXQUFXLEdBQVgsQ0FBZSxVQUFDLEtBQUQsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBbUI7U0FBTiwwREFBRSxpQkFBSTs7QUFDakMsWUFBTzs7UUFBTyxHQUFHLEtBQUssTUFBTCxFQUFhLEtBQUssQ0FBTCxFQUF2QjtNQUNOLE1BQU0sR0FBTixDQUFVLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTtBQUNuQixXQUFJLFVBQVM7O1VBQU8sR0FBRyxDQUFILEVBQU0sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZCxHQUErQixDQUEvQixFQUFrQyxLQUFLLENBQUwsRUFBbEQ7UUFBMEQsOENBQVUsSUFBVixDQUExRDtRQUFULENBRGU7QUFFbkIsWUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEdBQWpCLENBRmU7QUFHbkIsWUFBSyxNQUFMLElBQWMsS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUhLO0FBSW5CLFlBQUssS0FBTCxHQUptQjtBQUtuQixjQUFPLE9BQVAsQ0FMbUI7T0FBVixDQURKO01BQVAsQ0FEaUM7S0FBbkIsQ0FGaEI7SUFERCxDQUhPOzs7O3NCQXNCRTtBQUNULFVBQU8sS0FBSyxLQUFMLENBREU7Ozs7UUF2QkwiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wdXRlZDp7Y29tcG9zZWR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7cGFnZUdhcCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHtzdXBlci5yZW5kZXIoKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxzdmcgey4uLm90aGVyc31cblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHRcdHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XG5cdFx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnJlZHVjZSgoY29sbGVjdGVkLCBzZWN0aW9uKT0+e1xuXHRcdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXB1dGVkLmNvbXBvc2VkKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXG5cdFx0XHRcdFx0XHR9LFtdKX1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxuXHRcdFx0XHQ8L3N2Zz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aW5oZXJpdGVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0Y29uc3Qgc2VsZj10aGlzXG5cdFx0Y29uc3Qgc3R5bGVzPXRoaXMucHJvcHMuc3R5bGVzXG4gICAgICAgIGNvbnN0IHt3aWR0aCwgcGFnZUdhcCwgZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBnZXREZWZhdWx0U3R5bGUodHlwZSl7XG5cdFx0XHRcdHJldHVybiBzdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKVxuXHRcdFx0fSxcblx0XHRcdGluaGVyaXRlZFN0eWxlOmRpcmVjdFN0eWxlXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xuXHRcdGlmKHRoaXMucmVmcy5jb21wb3NlZClcblx0XHRcdHRoaXMucmVmcy5jb21wb3NlZC5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7c3ZnLCBjb21wb3NlZH09dGhpcy5yZWZzXG5cdFx0bGV0IHtoZWlnaHQ6Y29udGVudEhlaWdodCwgcGFnZXN9PWNvbXBvc2VkLmluZm9cblxuXHRcdGhlaWdodD1cdE1hdGgubWF4KGNvbnRlbnRIZWlnaHQsIGhlaWdodCkrMSpwYWdlR2FwXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JyxoZWlnaHQpXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpXG5cdH1cblxuXHRtb3JlKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJIZWlnaHQsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxuXG5cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3NlY3Rpb25zLCBnYXAsIGNhbnZhc309dGhpcy5wcm9wc1xuXHRcdGNvbnN0IGluZm89dGhpcy5faW5mbz17aGVpZ2h0OmdhcCwgcGFnZXM6MH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHk9e2dhcH0+XG5cdFx0XHR7XG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XG5cdFx0XHRcdFx0cmV0dXJuIDxHcm91cCB5PXtpbmZvLmhlaWdodH0ga2V5PXtpfT57XG5cdFx0XHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdFx0XHR5Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8uaGVpZ2h0Kz0ocGFnZS5zaXplLmhlaWdodCtnYXApXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9PC9Hcm91cD5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cblx0Z2V0IGluZm8oKXtcblx0XHRyZXR1cm4gdGhpcy5faW5mb1xuXHR9XG59XG4iXX0=