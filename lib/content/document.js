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
					{ style: { display: "none" } },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiY29tcG9zZWQiLCJjb21wdXRlZCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJwYWdlR2FwIiwic3R5bGUiLCJvdGhlcnMiLCJkaXNwbGF5IiwiY2hpbGRyZW4iLCJyZWR1Y2UiLCJjb2xsZWN0ZWQiLCJzZWN0aW9uIiwicHVzaCIsIm1vcmUiLCJwYWdlIiwicmVmcyIsInNldFN0YXRlIiwiY29tcG9zZWRUaW1lIiwiRGF0ZSIsInRvU3RyaW5nIiwic3ZnIiwiaW5mbyIsImNvbnRlbnRIZWlnaHQiLCJwYWdlcyIsIk1hdGgiLCJtYXgiLCJzZXRBdHRyaWJ1dGUiLCJjb21wb25lbnREaWRNb3VudCIsImRpc3BsYXlOYW1lIiwiZGVmYXVsdFByb3BzIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYmFja2dyb3VuZCIsIkNvbXBvc2VkIiwic2VjdGlvbnMiLCJnYXAiLCJjYW52YXMiLCJfaW5mbyIsIm1hcCIsImkiLCJhIiwiYiIsInkiLCJuZXdQYWdlIiwic2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7OzJCQUdaO0FBQUE7O0FBQUEsT0FDVUMsUUFEVixHQUM0QyxJQUQ1QyxDQUNBQyxRQURBLENBQ1VELFFBRFY7QUFBQSxnQkFDNEMsSUFENUMsQ0FDcUJFLEtBRHJCO0FBQUEsT0FDNEJDLEtBRDVCLFVBQzRCQSxLQUQ1QjtBQUFBLE9BQ21DQyxNQURuQyxVQUNtQ0EsTUFEbkM7O0FBQUEsaUJBRTJCLEtBQUtGLEtBRmhDO0FBQUEsT0FFQUcsT0FGQSxXQUVBQSxPQUZBO0FBQUEsT0FFU0MsS0FGVCxXQUVTQSxLQUZUO0FBQUEsT0FFbUJDLE1BRm5COztBQUdELFVBQ0w7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLE9BQUssT0FBTyxFQUFDQyxTQUFRLE1BQVQsRUFBWjtBQUFBO0FBQUEsS0FERDtBQUlDO0FBQUE7QUFBQSxPQUFLLE9BQU9GLEtBQVo7QUFDQyxXQUFJLEtBREw7QUFFQyxhQUFPSCxLQUZSO0FBR0MsY0FBUUMsTUFIVDtBQUlDLHdCQUFnQkQsS0FBaEIsU0FBeUJDLE1BSjFCO0FBS0MsbUNBQUMsUUFBRCxJQUFVLEtBQUksVUFBZCxFQUF5QixLQUFLQyxPQUE5QixFQUF1QyxRQUFRLEVBQUNGLFlBQUQsRUFBL0MsRUFBd0QsVUFBVTtBQUFBLGNBQ2pFLE9BQUtGLFFBQUwsQ0FBY1EsUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBQ0MsU0FBRCxFQUFZQyxPQUFaLEVBQXNCO0FBQ25ERCxrQkFBVUUsSUFBVixDQUFlRCxRQUFRWCxRQUFSLENBQWlCRCxRQUFoQztBQUNBLGVBQU9XLFNBQVA7QUFDQSxRQUhELEVBR0UsRUFIRixDQURpRTtBQUFBO0FBQWxFLE9BTEQ7QUFXRSxVQUFLRyxJQUFMO0FBWEY7QUFKRCxJQURLO0FBb0JIOzs7NEJBRUssQ0FFUjs7O2lDQUVjQyxJLEVBQUs7QUFDbkIsT0FBRyxLQUFLQyxJQUFMLENBQVVoQixRQUFiLEVBQ0MsS0FBS2dCLElBQUwsQ0FBVWhCLFFBQVYsQ0FBbUJpQixRQUFuQixDQUE0QixFQUFDQyxjQUFjLElBQUlDLElBQUosR0FBV0MsUUFBWCxFQUFmLEVBQTVCO0FBQ0Q7OztzQ0FFa0I7QUFBQSxpQkFDVyxLQUFLbEIsS0FEaEI7QUFBQSxPQUNiRyxPQURhLFdBQ2JBLE9BRGE7QUFBQSxPQUNKRixLQURJLFdBQ0pBLEtBREk7QUFBQSxPQUNHQyxNQURILFdBQ0dBLE1BREg7QUFBQSxlQUVJLEtBQUtZLElBRlQ7QUFBQSxPQUVYSyxHQUZXLFNBRVhBLEdBRlc7QUFBQSxPQUVOckIsUUFGTSxTQUVOQSxRQUZNO0FBQUEsd0JBR2dCQSxTQUFTc0IsSUFIekI7QUFBQSxPQUdOQyxhQUhNLGtCQUdibkIsTUFIYTtBQUFBLE9BR1NvQixLQUhULGtCQUdTQSxLQUhUOzs7QUFLbEJwQixZQUFRcUIsS0FBS0MsR0FBTCxDQUFTSCxhQUFULEVBQXdCbkIsTUFBeEIsSUFBZ0MsSUFBRUMsT0FBMUM7QUFDQWdCLE9BQUlNLFlBQUosQ0FBaUIsUUFBakIsRUFBMEJ2QixNQUExQjtBQUNBaUIsT0FBSU0sWUFBSixDQUFpQixTQUFqQixXQUFrQ3hCLEtBQWxDLFNBQTJDQyxNQUEzQztBQUNBOzs7dUNBRW1CO0FBQ25CLFFBQUt3QixpQkFBTDtBQUNBOzs7eUJBRUs7QUFDTCxVQUFPLElBQVA7QUFDQTs7O3NCQVdhO0FBQ2IsVUFBTyxLQUFLWixJQUFMLENBQVVoQixRQUFqQjtBQUNBOzs7Ozs7QUFsRW1CRCxRLENBQ2I4QixXLEdBQVksVTtBQURDOUIsUSxDQXVEYitCLFksR0FBYTtBQUNuQjNCLFFBQU8sT0FBTzRCLE1BQVAsSUFBZ0IsV0FBaEIsR0FBOEIsS0FBOUIsR0FBc0NBLE9BQU9DLFVBRGpDO0FBRW5CNUIsU0FBUSxPQUFPMkIsTUFBUCxJQUFnQixXQUFoQixHQUE4QixLQUE5QixHQUFzQ0EsT0FBT0UsV0FGbEM7QUFHbkI1QixVQUFTLEVBSFU7QUFJbkJDLFFBQU87QUFDTjRCLGNBQVc7QUFETDtBQUpZLEM7a0JBdkRBbkMsUTs7SUFxRWZvQyxROzs7Ozs7Ozs7OzsyQkFDRztBQUFBLGlCQUN1QixLQUFLakMsS0FENUI7QUFBQSxPQUNBa0MsUUFEQSxXQUNBQSxRQURBO0FBQUEsT0FDVUMsR0FEVixXQUNVQSxHQURWO0FBQUEsT0FDZUMsTUFEZixXQUNlQSxNQURmOztBQUVQLE9BQU1oQixPQUFLLEtBQUtpQixLQUFMLEdBQVcsRUFBQ25DLFFBQU9pQyxHQUFSLEVBQWFiLE9BQU0sQ0FBbkIsRUFBdEI7QUFDQSxVQUNDO0FBQUE7QUFBQSxNQUFPLEdBQUdhLEdBQVY7QUFFQ0QsZUFBV0ksR0FBWCxDQUFlLFVBQUNoQixLQUFELEVBQU9pQixDQUFQLEVBQVNDLENBQVQsRUFBV0MsQ0FBWCxFQUFtQjtBQUFBLFNBQU5DLENBQU0sdUVBQUosQ0FBSTs7QUFDakMsWUFBTztBQUFBO0FBQUEsUUFBTyxHQUFHdEIsS0FBS2xCLE1BQWYsRUFBdUIsS0FBS3FDLENBQTVCO0FBQ05qQixZQUFNZ0IsR0FBTixDQUFVLFVBQUN6QixJQUFELEVBQU0wQixDQUFOLEVBQVU7QUFDbkIsV0FBSUksVUFBUztBQUFBO0FBQUEsVUFBTyxHQUFHRCxDQUFWLEVBQWEsR0FBRyxDQUFDTixPQUFPbkMsS0FBUCxHQUFhWSxLQUFLK0IsSUFBTCxDQUFVM0MsS0FBeEIsSUFBK0IsQ0FBL0MsRUFBa0QsS0FBS3NDLENBQXZEO0FBQTBELHNEQUFVMUIsSUFBVjtBQUExRCxRQUFiO0FBQ0E2QixZQUFJN0IsS0FBSytCLElBQUwsQ0FBVTFDLE1BQVYsR0FBaUJpQyxHQUFyQjtBQUNBZixZQUFLbEIsTUFBTCxJQUFjVyxLQUFLK0IsSUFBTCxDQUFVMUMsTUFBVixHQUFpQmlDLEdBQS9CO0FBQ0FmLFlBQUtFLEtBQUw7QUFDQSxjQUFPcUIsT0FBUDtBQUNBLE9BTkQ7QUFETSxNQUFQO0FBU0EsS0FWRDtBQUZELElBREQ7QUFpQkE7OztzQkFFUztBQUNULFVBQU8sS0FBS04sS0FBWjtBQUNBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y29tcHV0ZWQ6e2NvbXBvc2VkfSwgcHJvcHM6e3dpZHRoLCBoZWlnaHR9fT10aGlzXHJcblx0XHRjb25zdCB7cGFnZUdhcCwgc3R5bGUsIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJub25lXCJ9fT5cclxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PHN2ZyBzdHlsZT17c3R5bGV9XHJcblx0XHRcdFx0XHRyZWY9XCJzdmdcIlxyXG5cdFx0XHRcdFx0d2lkdGg9e3dpZHRofVxyXG5cdFx0XHRcdFx0aGVpZ2h0PXtoZWlnaHR9XHJcblx0XHRcdFx0XHR2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxyXG5cdFx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgZ2FwPXtwYWdlR2FwfSBjYW52YXM9e3t3aWR0aH19IHNlY3Rpb25zPXsoKT0+XHJcblx0XHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ucmVkdWNlKChjb2xsZWN0ZWQsIHNlY3Rpb24pPT57XHJcblx0XHRcdFx0XHRcdFx0Y29sbGVjdGVkLnB1c2goc2VjdGlvbi5jb21wdXRlZC5jb21wb3NlZClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gY29sbGVjdGVkXHJcblx0XHRcdFx0XHRcdH0sW10pfVxyXG5cdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0e3RoaXMubW9yZSgpfVxyXG5cdFx0XHRcdDwvc3ZnPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuICAgIH1cclxuXHRcclxuXHRjb21wb3NlKCl7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKHBhZ2Upe1xyXG5cdFx0aWYodGhpcy5yZWZzLmNvbXBvc2VkKVxyXG5cdFx0XHR0aGlzLnJlZnMuY29tcG9zZWQuc2V0U3RhdGUoe2NvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b1N0cmluZygpfSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRsZXQge3BhZ2VHYXAsIHdpZHRoLCBoZWlnaHR9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtzdmcsIGNvbXBvc2VkfT10aGlzLnJlZnNcclxuXHRcdGxldCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHBhZ2VzfT1jb21wb3NlZC5pbmZvXHJcblxyXG5cdFx0aGVpZ2h0PVx0TWF0aC5tYXgoY29udGVudEhlaWdodCwgaGVpZ2h0KSsxKnBhZ2VHYXBcclxuXHRcdHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsaGVpZ2h0KVxyXG5cdFx0c3ZnLnNldEF0dHJpYnV0ZSgndmlld0JveCcsYDAgMCAke3dpZHRofSAke2hlaWdodH1gKVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XHJcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KClcclxuXHR9XHJcblxyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHdpZHRoOiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cdFx0aGVpZ2h0OiB0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgPyAxMDAwMCA6IHdpbmRvdy5pbm5lckhlaWdodCxcclxuXHRcdHBhZ2VHYXA6IDIwLFxyXG5cdFx0c3R5bGU6IHtcclxuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgY29tcG9zZWQoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlZnMuY29tcG9zZWRcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7c2VjdGlvbnMsIGdhcCwgY2FudmFzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCBpbmZvPXRoaXMuX2luZm89e2hlaWdodDpnYXAsIHBhZ2VzOjB9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgeT17Z2FwfT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlY3Rpb25zKCkubWFwKChwYWdlcyxpLGEsYix5PTApPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gPEdyb3VwIHk9e2luZm8uaGVpZ2h0fSBrZXk9e2l9PntcclxuXHRcdFx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XHJcblx0XHRcdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSB4PXsoY2FudmFzLndpZHRoLXBhZ2Uuc2l6ZS53aWR0aCkvMn0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxyXG5cdFx0XHRcdFx0XHRcdHkrPShwYWdlLnNpemUuaGVpZ2h0K2dhcClcclxuXHRcdFx0XHRcdFx0XHRpbmZvLmhlaWdodCs9KHBhZ2Uuc2l6ZS5oZWlnaHQrZ2FwKVxyXG5cdFx0XHRcdFx0XHRcdGluZm8ucGFnZXMrK1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9PC9Hcm91cD5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRnZXQgaW5mbygpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luZm9cclxuXHR9XHJcbn1cclxuIl19