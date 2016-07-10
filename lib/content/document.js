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
			var svg = this.refs.svg;

			var size = this.composed.reduce(function (last, a) {
				return {
					height: last.height + a.size.height + pageGap,
					width: Math.max(last.width, a.width) };
			}, { height: pageGap, width: width });

			height = Math.max(size.height, height);
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

			var sectionY = gap;
			return _react2.default.createElement(
				_group2.default,
				{ y: gap },
				sections().map(function (pages, i, a, b) {
					var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

					return _react2.default.createElement(
						_group2.default,
						{ y: sectionY, key: i },
						pages.map(function (page, i) {
							var newPage = _react2.default.createElement(
								_group2.default,
								{ y: y, x: (canvas.width - page.size.width) / 2, key: i },
								_react2.default.createElement(_page2.default, page)
							);
							y += page.size.height + gap;
							sectionY += page.size.height + gap;
							return newPage;
						})
					);
				})
			);
		}
	}]);

	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUdaOzs7T0FDQSxXQUFrRCxLQUFsRCxTQURBO09BQ2lCLFVBQWlDLEtBQXhDLE1BQU8sUUFEakI7Z0JBQ2tELEtBQXZCLE1BRDNCO09BQ2tDLHFCQURsQztPQUN5Qyx1QkFEekM7aUJBRW9DLEtBQUssS0FBTCxDQUZwQztPQUVBLHdDQUZBO09BRWdCLDBCQUZoQjs7T0FFNEIsMEVBRjVCOztBQUdELFVBQ0w7O2lCQUFTO0FBQ1IsVUFBSSxLQUFKO0FBQ0EsWUFBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBRi9COytCQVBrQiwrQ0FPbEI7SUFJQyw4QkFBQyxRQUFELElBQVUsS0FBSSxVQUFKLEVBQWUsS0FBSyxPQUFMLEVBQWMsUUFBUSxFQUFDLFlBQUQsRUFBUixFQUFpQixVQUFVO2FBQ2pFLE9BQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsVUFBQyxTQUFELEVBQVksT0FBWixFQUFzQjtBQUMxQyxpQkFBVSxJQUFWLENBQWUsUUFBUSxRQUFSLENBQWYsQ0FEMEM7QUFFMUMsY0FBTyxTQUFQLENBRjBDO09BQXRCLEVBR25CLEVBSEY7TUFEaUU7S0FBbEUsQ0FKRDtJQVVFLEtBQUssSUFBTCxFQVZGO0lBREssQ0FIQzs7OztvQ0F3Qlk7QUFDbkIsT0FBTSxpQkFBZSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBREY7aUJBRXdCLEtBQUssS0FBTCxDQUZ4QjtPQUVOLHNCQUZNO09BRUMsMEJBRkQ7T0FFVSxvQ0FGVjs7QUFHbkIsVUFBTyxPQUFPLE1BQVAsNEJBOUJZLHdEQThCWixFQUFzQztBQUNuQyw4Q0FBZ0IsTUFBSztBQUM3QixZQUFPLGVBQWUsVUFBZixDQUEwQixJQUExQixDQUFQLENBRDZCO0tBRGM7O0FBSTVDLG9CQUFlLFlBQWY7SUFKTSxDQUFQLENBSG1COzs7O2lDQVdMLE1BQUs7QUFDbkIsT0FBRyxLQUFLLElBQUwsQ0FBVSxRQUFWLEVBQ0YsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixRQUFuQixDQUE0QixFQUFDLGNBQWMsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFkLEVBQTdCLEVBREQ7Ozs7c0NBSWtCO2lCQUNXLEtBQUssS0FBTCxDQURYO09BQ2IsMEJBRGE7T0FDSixzQkFESTtPQUNHLHdCQURIO09BRVgsTUFBSyxLQUFLLElBQUwsQ0FBTCxJQUZXOztBQUdsQixPQUFJLE9BQUssS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixVQUFDLElBQUQsRUFBTSxDQUFOO1dBQVc7QUFDdkMsYUFBUSxLQUFLLE1BQUwsR0FBWSxFQUFFLElBQUYsQ0FBTyxNQUFQLEdBQWMsT0FBMUI7QUFDUixZQUFNLEtBQUssR0FBTCxDQUFTLEtBQUssS0FBTCxFQUFXLEVBQUUsS0FBRixDQUExQjtJQUY0QixFQUVTLEVBQUMsUUFBTyxPQUFQLEVBQWdCLE9BQU0sS0FBTixFQUYvQyxDQUFMLENBSGM7O0FBT2xCLFlBQVEsS0FBSyxHQUFMLENBQVMsS0FBSyxNQUFMLEVBQWEsTUFBdEIsQ0FBUixDQVBrQjtBQVFsQixPQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMEIsTUFBMUIsRUFSa0I7QUFTbEIsT0FBSSxZQUFKLENBQWlCLFNBQWpCLFdBQWtDLGNBQVMsTUFBM0MsRUFUa0I7Ozs7dUNBWUM7QUFDbkIsUUFBSyxpQkFBTCxHQURtQjs7Ozt5QkFJZDtBQUNMLFVBQU8sSUFBUCxDQURLOzs7O1FBM0RjOzs7U0FDYixjQUFZO0FBREMsU0FzQlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLGtCQUFpQixpQkFBVSxJQUFWO0FBQ3ZCLGlCQUFnQixpQkFBVSxNQUFWO0NBRlcsRUFHdkIsY0FBUyxpQkFBVDtBQXpCZSxTQStEYixlQUFhO0FBQ25CLFFBQU8sT0FBTyxVQUFQO0FBQ1AsU0FBUSxPQUFPLFdBQVA7QUFDUixVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQW5FbUI7O0lBMkVmOzs7Ozs7Ozs7OzsyQkFDRztpQkFDdUIsS0FBSyxLQUFMLENBRHZCO09BQ0EsNEJBREE7T0FDVSxrQkFEVjtPQUNlLHdCQURmOztBQUVQLE9BQUksV0FBUyxHQUFULENBRkc7QUFHUCxVQUNDOztNQUFPLEdBQUcsR0FBSCxFQUFQO0lBRUMsV0FBVyxHQUFYLENBQWUsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQW1CO1NBQU4sMERBQUUsaUJBQUk7O0FBQ2pDLFlBQU87O1FBQU8sR0FBRyxRQUFILEVBQWEsS0FBSyxDQUFMLEVBQXBCO01BQ04sTUFBTSxHQUFOLENBQVUsVUFBQyxJQUFELEVBQU0sQ0FBTixFQUFVO0FBQ25CLFdBQUksVUFBUzs7VUFBTyxHQUFHLENBQUgsRUFBTSxHQUFHLENBQUMsT0FBTyxLQUFQLEdBQWEsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFkLEdBQStCLENBQS9CLEVBQWtDLEtBQUssQ0FBTCxFQUFsRDtRQUEwRCw4Q0FBVSxJQUFWLENBQTFEO1FBQVQsQ0FEZTtBQUVuQixZQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsR0FBaUIsR0FBakIsQ0FGZTtBQUduQixtQkFBVyxLQUFLLElBQUwsQ0FBVSxNQUFWLEdBQWlCLEdBQWpCLENBSFE7QUFJbkIsY0FBTyxPQUFQLENBSm1CO09BQVYsQ0FESjtNQUFQLENBRGlDO0tBQW5CLENBRmhCO0lBREQsQ0FITzs7OztRQURIIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkLCB0b2dnbGFibGV9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZCwgc3RhdGU6e2NvbnRlbnR9LCBwcm9wczp7d2lkdGgsIGhlaWdodH19PXRoaXNcblx0XHRjb25zdCB7ZG9jdW1lbnRTdHlsZXMsIHBhZ2VHYXAsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4ub3RoZXJzfVxuXHRcdFx0XHRyZWY9XCJzdmdcIlxuXHRcdFx0XHR3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIGdhcD17cGFnZUdhcH0gY2FudmFzPXt7d2lkdGh9fSBzZWN0aW9ucz17KCk9PlxuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XG5cdFx0XHRcdFx0XHRjb2xsZWN0ZWQucHVzaChzZWN0aW9uLmNvbXBvc2VkKVxuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbGxlY3RlZFxuXHRcdFx0XHRcdH0sW10pfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdHt0aGlzLm1vcmUoKX1cblx0XHRcdDwvc3ZnPlxuXHRcdClcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0Y29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0Y29uc3QgZG9jdW1lbnRTdHlsZXM9dGhpcy5wcm9wcy5kb2N1bWVudFN0eWxlc1xuICAgICAgICBjb25zdCB7d2lkdGgsIHBhZ2VHYXAsIGNvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGdldERlZmF1bHRTdHlsZSh0eXBlKXtcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50U3R5bGVzLmdldERlZmF1bHQodHlwZSlcblx0XHRcdH0sXG5cdFx0XHRjb250YWluZXJTdHlsZTpjb250ZW50U3R5bGVcbiAgICAgICAgfSlcbiAgICB9XG5cblx0YXBwZW5kQ29tcG9zZWQocGFnZSl7XG5cdFx0aWYodGhpcy5yZWZzLmNvbXBvc2VkKVxuXHRcdFx0dGhpcy5yZWZzLmNvbXBvc2VkLnNldFN0YXRlKHtjb21wb3NlZFRpbWU6IG5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCB7cGFnZUdhcCwgd2lkdGgsIGhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtzdmd9PXRoaXMucmVmc1xuXHRcdGxldCBzaXplPXRoaXMuY29tcG9zZWQucmVkdWNlKChsYXN0LGEpPT4oe1xuXHRcdFx0XHRoZWlnaHQ6IGxhc3QuaGVpZ2h0K2Euc2l6ZS5oZWlnaHQrcGFnZUdhcCxcblx0XHRcdFx0d2lkdGg6TWF0aC5tYXgobGFzdC53aWR0aCxhLndpZHRoKX0pLHtoZWlnaHQ6cGFnZUdhcCwgd2lkdGg6d2lkdGh9KVxuXG5cdFx0aGVpZ2h0PVx0TWF0aC5tYXgoc2l6ZS5oZWlnaHQsIGhlaWdodClcblx0XHRzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLGhlaWdodClcblx0XHRzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JyxgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWApXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUoKXtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcblx0fVxuXG5cdG1vcmUoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdHBhZ2VHYXA6IDIwLFxuXHRcdHN0eWxlOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOlwibGlnaHRncmF5XCJcblx0XHR9XG5cdH1cblxuXG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzZWN0aW9ucywgZ2FwLCBjYW52YXN9PXRoaXMucHJvcHNcblx0XHRsZXQgc2VjdGlvblk9Z2FwXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB5PXtnYXB9PlxuXHRcdFx0e1xuXHRcdFx0XHRzZWN0aW9ucygpLm1hcCgocGFnZXMsaSxhLGIseT0wKT0+e1xuXHRcdFx0XHRcdHJldHVybiA8R3JvdXAgeT17c2VjdGlvbll9IGtleT17aX0+e1xuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0geD17KGNhbnZhcy53aWR0aC1wYWdlLnNpemUud2lkdGgpLzJ9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHRcdFx0eSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRzZWN0aW9uWSs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9PC9Hcm91cD5cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG59XG4iXX0=