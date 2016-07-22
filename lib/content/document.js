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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDVSxXQUFrQyxLQUE1QyxTQUFVLFNBRFY7Z0JBQzRDLEtBQXZCLE1BRHJCO09BQzRCLHFCQUQ1QjtPQUNtQyx1QkFEbkM7aUJBRW9CLEtBQUssS0FBTCxDQUZwQjtPQUVBLDBCQUZBOztPQUVZLHdEQUZaOztBQUdELFVBQ0w7OztJQUNDOzs7Z0NBUmlCLCtDQVFqQjtLQUREO0lBSUM7O2tCQUFTO0FBQ1IsV0FBSSxLQUFKO0FBQ0EsYUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9CO0tBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLEtBQUssT0FBTCxFQUFjLFFBQVEsRUFBQyxZQUFELEVBQVIsRUFBaUIsVUFBVTtjQUNqRSxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLENBQThCLFVBQUMsU0FBRCxFQUFZLE9BQVosRUFBc0I7QUFDbkQsa0JBQVUsSUFBVixDQUFlLFFBQVEsUUFBUixDQUFpQixRQUFqQixDQUFmLENBRG1EO0FBRW5ELGVBQU8sU0FBUCxDQUZtRDtRQUF0QixFQUc1QixFQUhGO09BRGlFO01BQWxFLENBSEQ7S0FTRSxLQUFLLElBQUwsRUFURjtLQUpEO0lBREssQ0FIQzs7OztvQ0E0Qlk7QUFDbkIsT0FBTSxTQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FETTtpQkFFdUIsS0FBSyxLQUFMLENBRnZCO09BRU4sc0JBRk07T0FFQywwQkFGRDtPQUVVLGtDQUZWOztBQUduQixVQUFPLE9BQU8sTUFBUCw0QkFsQ1ksd0RBa0NaLEVBQXNDO0FBQ25DLDhDQUFnQixNQUFLO0FBQzdCLFlBQU8sT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQVAsQ0FENkI7S0FEYzs7QUFJNUMsb0JBQWUsV0FBZjtJQUpNLENBQVAsQ0FIbUI7Ozs7aUNBV0wsTUFBSztBQUNuQixPQUFHLEtBQUssSUFBTCxDQUFVLFFBQVYsRUFDRixLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLFFBQW5CLENBQTRCLEVBQUMsY0FBYyxJQUFJLElBQUosR0FBVyxRQUFYLEVBQWQsRUFBN0IsRUFERDs7OztzQ0FJa0I7aUJBQ1csS0FBSyxLQUFMLENBRFg7T0FDYiwwQkFEYTtPQUNKLHNCQURJO09BQ0csd0JBREg7ZUFFSSxLQUFLLElBQUwsQ0FGSjtPQUVYLGdCQUZXO09BRU4sMEJBRk07d0JBR2dCLFNBQVMsSUFBVCxDQUhoQjtPQUdOLCtCQUFQLE9BSGE7T0FHUyw2QkFIVDs7O0FBS2xCLFlBQVEsS0FBSyxHQUFMLENBQVMsYUFBVCxFQUF3QixNQUF4QixJQUFnQyxJQUFFLE9BQUYsQ0FMdEI7QUFNbEIsT0FBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTBCLE1BQTFCLEVBTmtCO0FBT2xCLE9BQUksWUFBSixDQUFpQixTQUFqQixXQUFrQyxjQUFTLE1BQTNDLEVBUGtCOzs7O3VDQVVDO0FBQ25CLFFBQUssaUJBQUwsR0FEbUI7Ozs7eUJBSWQ7QUFDTCxVQUFPLElBQVAsQ0FESzs7OztRQTdEYzs7O1NBQ2IsY0FBWTtBQURDLFNBMEJWLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUNuQyxrQkFBaUIsaUJBQVUsSUFBVjtBQUN2QixpQkFBZ0IsaUJBQVUsTUFBVjtDQUZXLEVBR3ZCLGNBQVMsaUJBQVQ7QUE3QmUsU0FpRWIsZUFBYTtBQUNuQixRQUFPLE9BQU8sTUFBUCxJQUFnQixXQUFoQixHQUE4QixLQUE5QixHQUFzQyxPQUFPLFVBQVA7QUFDN0MsU0FBUSxPQUFPLE1BQVAsSUFBZ0IsV0FBaEIsR0FBOEIsS0FBOUIsR0FBc0MsT0FBTyxXQUFQO0FBQzlDLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBckVtQjs7SUE2RWY7Ozs7Ozs7Ozs7OzJCQUNHO2lCQUN1QixLQUFLLEtBQUwsQ0FEdkI7T0FDQSw0QkFEQTtPQUNVLGtCQURWO09BQ2Usd0JBRGY7O0FBRVAsT0FBTSxPQUFLLEtBQUssS0FBTCxHQUFXLEVBQUMsUUFBTyxHQUFQLEVBQVksT0FBTSxDQUFOLEVBQXhCLENBRko7QUFHUCxVQUNDOztNQUFPLEdBQUcsR0FBSCxFQUFQO0lBRUMsV0FBVyxHQUFYLENBQWUsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQW1CO1NBQU4sMERBQUUsaUJBQUk7O0FBQ2pDLFlBQU87O1FBQU8sR0FBRyxLQUFLLE1BQUwsRUFBYSxLQUFLLENBQUwsRUFBdkI7TUFDTixNQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBTSxDQUFOLEVBQVU7QUFDbkIsV0FBSSxVQUFTOztVQUFPLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWQsR0FBK0IsQ0FBL0IsRUFBa0MsS0FBSyxDQUFMLEVBQWxEO1FBQTBELDhDQUFVLElBQVYsQ0FBMUQ7UUFBVCxDQURlO0FBRW5CLFlBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFpQixHQUFqQixDQUZlO0FBR25CLFlBQUssTUFBTCxJQUFjLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsR0FBakIsQ0FISztBQUluQixZQUFLLEtBQUwsR0FKbUI7QUFLbkIsY0FBTyxPQUFQLENBTG1CO09BQVYsQ0FESjtNQUFQLENBRGlDO0tBQW5CLENBRmhCO0lBREQsQ0FITzs7OztzQkFzQkU7QUFDVCxVQUFPLEtBQUssS0FBTCxDQURFOzs7O1FBdkJMIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcHV0ZWQ6e2NvbXBvc2VkfSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXG5cdFx0Y29uc3Qge3BhZ2VHYXAsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8c3ZnIHsuLi5vdGhlcnN9XG5cdFx0XHRcdFx0cmVmPVwic3ZnXCJcblx0XHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fSBzZWN0aW9ucz17KCk9PlxuXHRcdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5yZWR1Y2UoKGNvbGxlY3RlZCwgc2VjdGlvbik9Pntcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxlY3RlZFxuXHRcdFx0XHRcdFx0fSxbXSl9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdHt0aGlzLm1vcmUoKX1cblx0XHRcdFx0PC9zdmc+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGNvbnN0IHN0eWxlcz10aGlzLnByb3BzLnN0eWxlc1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGRpcmVjdFN0eWxlfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xuICAgICAgICAgICAgZ2V0RGVmYXVsdFN0eWxlKHR5cGUpe1xuXHRcdFx0XHRyZXR1cm4gc3R5bGVzLmdldERlZmF1bHQodHlwZSlcblx0XHRcdH0sXG5cdFx0XHRpbmhlcml0ZWRTdHlsZTpkaXJlY3RTdHlsZVxuICAgICAgICB9KVxuICAgIH1cblxuXHRhcHBlbmRDb21wb3NlZChwYWdlKXtcblx0XHRpZih0aGlzLnJlZnMuY29tcG9zZWQpXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYWdlR2FwLCB3aWR0aCwgaGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3N2ZywgY29tcG9zZWR9PXRoaXMucmVmc1xuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXG5cblx0XHRoZWlnaHQ9XHRNYXRoLm1heChjb250ZW50SGVpZ2h0LCBoZWlnaHQpKzEqcGFnZUdhcFxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLGAwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YClcblx0fVxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuXHR9XG5cblx0bW9yZSgpe1xuXHRcdHJldHVybiBudWxsXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogdHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID8gMTAwMDAgOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRoZWlnaHQ6IHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/IDEwMDAwIDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17aW5mby5oZWlnaHR9IGtleT17aX0+e1xuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRpbmZvLnBhZ2VzKytcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fTwvR3JvdXA+XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXG5cdGdldCBpbmZvKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cblx0fVxufVxuIl19