"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_Any) {
	_inherits(Cell, _Any);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
	}

	_createClass(Cell, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"td",
				null,
				this.getContent()
			);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed() {
			var _computed$composed;

			(_computed$composed = this.computed.composed).push.apply(_computed$composed, arguments);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var style = this.getStyle();
			var margin = style.margin,
			    border = style.border,
			    width = style.width,
			    background = style.background;

			var gap = this.getContentGap(style);
			var y = 0;
			var positionedLines = this.computed.composed.map(function (line, i) {
				var _line$props = line.props,
				    width = _line$props.width,
				    height = _line$props.height;

				var positionedLine = _react2.default.createElement(
					_group2.default,
					{ y: y, width: width, height: height, key: i },
					line
				);
				y += height;
				return positionedLine;
			});

			return _react2.default.createElement(
				ComposedCell,
				{ width: width, height: y + gap.top + gap.bottom, background: background },
				_react2.default.createElement(Border, { border: border }),
				_react2.default.createElement(
					_group2.default,
					{ x: gap.left, y: gap.top },
					positionedLines
				)
			);
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var style = this.getStyle();
			var gap = this.getContentGap(style);
			var width = style.width - gap.right - gap.left;

			return { width: width, height: Number.MAX_SAFE_INTEGER };
		}
	}, {
		key: "getContentGap",
		value: function getContentGap(style) {
			return { left: 0, right: 0, top: 0, bottom: 0 };
		}
	}]);

	return Cell;
}(_any2.default);

Cell.displayName = "cell";
exports.default = Cell;

var ComposedCell = function (_Component) {
	_inherits(ComposedCell, _Component);

	function ComposedCell() {
		_classCallCheck(this, ComposedCell);

		return _possibleConstructorReturn(this, (ComposedCell.__proto__ || Object.getPrototypeOf(ComposedCell)).apply(this, arguments));
	}

	_createClass(ComposedCell, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				cellSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    width = _props.width,
			    height = _props.height,
			    background = _props.background,
			    children = _props.children,
			    others = _objectWithoutProperties(_props, ["width", "height", "background", "children"]);

			var rowSize = this.context.rowSize;

			return _react2.default.createElement(
				_group2.default,
				others,
				background ? _react2.default.createElement("rect", { width: width, height: rowSize.height, fill: background }) : null,
				children
			);
		}
	}]);

	return ComposedCell;
}(_react.Component);

ComposedCell.contextTypes = {
	rowSize: _react.PropTypes.object
};
ComposedCell.childContextTypes = {
	cellSize: _react.PropTypes.object
};

var Border = function (_Component2) {
	_inherits(Border, _Component2);

	function Border() {
		_classCallCheck(this, Border);

		return _possibleConstructorReturn(this, (Border.__proto__ || Object.getPrototypeOf(Border)).apply(this, arguments));
	}

	_createClass(Border, [{
		key: "render",
		value: function render() {
			var _props$border = this.props.border,
			    left = _props$border.left,
			    right = _props$border.right,
			    bottom = _props$border.bottom,
			    top = _props$border.top;
			var _context = this.context,
			    height = _context.rowSize.height,
			    width = _context.cellSize.width;

			return _react2.default.createElement(
				_group2.default,
				null,
				top.sz && _react2.default.createElement("path", { strokeWidth: top.sz, stroke: top.color, d: "M0 0 L" + width + " 0" }),
				bottom.sz && _react2.default.createElement("path", { strokeWidth: bottom.sz, stroke: bottom.color, d: "M0 " + height + " L" + width + " " + height }),
				right.sz && _react2.default.createElement("path", { strokeWidth: right.sz, stroke: right.color, d: "M" + width + " 0 L" + width + " " + height }),
				left.sz && _react2.default.createElement("path", { strokeWidth: left.sz, stroke: left.color, d: "M0 0 L0 " + height })
			);
		}
	}]);

	return Border;
}(_react.Component);

Border.contextTypes = {
	rowSize: _react.PropTypes.object,
	cellSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOlsiQ2VsbCIsImdldENvbnRlbnQiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsImFyZ3VtZW50cyIsInN0eWxlIiwiZ2V0U3R5bGUiLCJtYXJnaW4iLCJib3JkZXIiLCJ3aWR0aCIsImJhY2tncm91bmQiLCJnYXAiLCJnZXRDb250ZW50R2FwIiwieSIsInBvc2l0aW9uZWRMaW5lcyIsIm1hcCIsImxpbmUiLCJpIiwicHJvcHMiLCJoZWlnaHQiLCJwb3NpdGlvbmVkTGluZSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyZXF1aXJlZCIsInJpZ2h0IiwiTnVtYmVyIiwiTUFYX1NBRkVfSU5URUdFUiIsImRpc3BsYXlOYW1lIiwiQ29tcG9zZWRDZWxsIiwiY2VsbFNpemUiLCJjaGlsZHJlbiIsIm90aGVycyIsInJvd1NpemUiLCJjb250ZXh0IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJCb3JkZXIiLCJzeiIsImNvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSyxTQUFLQyxVQUFMO0FBQUwsSUFBUDtBQUNBOzs7bUNBRWU7QUFBQTs7QUFDZiw4QkFBS0MsUUFBTCxDQUFjQyxRQUFkLEVBQXVCQyxJQUF2QiwyQkFBK0JDLFNBQS9CO0FBQ0E7OzswQ0FFc0I7QUFDdEIsT0FBTUMsUUFBTSxLQUFLQyxRQUFMLEVBQVo7QUFEc0IsT0FFakJDLE1BRmlCLEdBRWVGLEtBRmYsQ0FFakJFLE1BRmlCO0FBQUEsT0FFVkMsTUFGVSxHQUVlSCxLQUZmLENBRVZHLE1BRlU7QUFBQSxPQUVIQyxLQUZHLEdBRWVKLEtBRmYsQ0FFSEksS0FGRztBQUFBLE9BRUdDLFVBRkgsR0FFZUwsS0FGZixDQUVHSyxVQUZIOztBQUd0QixPQUFJQyxNQUFJLEtBQUtDLGFBQUwsQ0FBbUJQLEtBQW5CLENBQVI7QUFDQSxPQUFJUSxJQUFFLENBQU47QUFDQSxPQUFJQyxrQkFBZ0IsS0FBS2IsUUFBTCxDQUFjQyxRQUFkLENBQXVCYSxHQUF2QixDQUEyQixVQUFDQyxJQUFELEVBQU1DLENBQU4sRUFBVTtBQUFBLHNCQUNuQ0QsS0FBS0UsS0FEOEI7QUFBQSxRQUNqRFQsS0FEaUQsZUFDakRBLEtBRGlEO0FBQUEsUUFDM0NVLE1BRDJDLGVBQzNDQSxNQUQyQzs7QUFFeEQsUUFBSUMsaUJBQWdCO0FBQUE7QUFBQSxPQUFPLEdBQUdQLENBQVYsRUFBYSxPQUFPSixLQUFwQixFQUEyQixRQUFRVSxNQUFuQyxFQUEyQyxLQUFLRixDQUFoRDtBQUFvREQ7QUFBcEQsS0FBcEI7QUFDQUgsU0FBR00sTUFBSDtBQUNBLFdBQU9DLGNBQVA7QUFDQSxJQUxtQixDQUFwQjs7QUFPQSxVQUNDO0FBQUMsZ0JBQUQ7QUFBQSxNQUFjLE9BQU9YLEtBQXJCLEVBQTRCLFFBQVFJLElBQUVGLElBQUlVLEdBQU4sR0FBVVYsSUFBSVcsTUFBbEQsRUFBMEQsWUFBWVosVUFBdEU7QUFDQyxrQ0FBQyxNQUFELElBQVEsUUFBUUYsTUFBaEIsR0FERDtBQUVDO0FBQUE7QUFBQSxPQUFPLEdBQUdHLElBQUlZLElBQWQsRUFBb0IsR0FBR1osSUFBSVUsR0FBM0I7QUFDRVA7QUFERjtBQUZELElBREQ7QUFRQTs7O3FDQUVrQlUsUSxFQUFTO0FBQzNCLE9BQU1uQixRQUFNLEtBQUtDLFFBQUwsRUFBWjtBQUNBLE9BQU1LLE1BQUksS0FBS0MsYUFBTCxDQUFtQlAsS0FBbkIsQ0FBVjtBQUNBLE9BQUlJLFFBQU1KLE1BQU1JLEtBQU4sR0FBWUUsSUFBSWMsS0FBaEIsR0FBc0JkLElBQUlZLElBQXBDOztBQUVBLFVBQU8sRUFBQ2QsWUFBRCxFQUFPVSxRQUFPTyxPQUFPQyxnQkFBckIsRUFBUDtBQUNBOzs7Z0NBRWF0QixLLEVBQU07QUFDbkIsVUFBTyxFQUFDa0IsTUFBSyxDQUFOLEVBQVFFLE9BQU0sQ0FBZCxFQUFnQkosS0FBSSxDQUFwQixFQUFzQkMsUUFBTyxDQUE3QixFQUFQO0FBQ0E7Ozs7OztBQTNDbUJ2QixJLENBQ2I2QixXLEdBQVksTTtrQkFEQzdCLEk7O0lBOENmOEIsWTs7Ozs7Ozs7Ozs7b0NBUVk7QUFDaEIsVUFBTztBQUNOQyxjQUFVO0FBQ1RyQixZQUFPLEtBQUtTLEtBQUwsQ0FBV1QsS0FEVDtBQUVUVSxhQUFRLEtBQUtELEtBQUwsQ0FBV0M7QUFGVjtBQURKLElBQVA7QUFNQTs7OzJCQUVPO0FBQUEsZ0JBQytDLEtBQUtELEtBRHBEO0FBQUEsT0FDQVQsS0FEQSxVQUNBQSxLQURBO0FBQUEsT0FDTVUsTUFETixVQUNNQSxNQUROO0FBQUEsT0FDY1QsVUFEZCxVQUNjQSxVQURkO0FBQUEsT0FDMEJxQixRQUQxQixVQUMwQkEsUUFEMUI7QUFBQSxPQUN1Q0MsTUFEdkM7O0FBQUEsT0FFQUMsT0FGQSxHQUVTLEtBQUtDLE9BRmQsQ0FFQUQsT0FGQTs7QUFHUCxVQUNDO0FBQUE7QUFBV0QsVUFBWDtBQUNFdEIsaUJBQWMsd0NBQU0sT0FBT0QsS0FBYixFQUFvQixRQUFRd0IsUUFBUWQsTUFBcEMsRUFBNEMsTUFBTVQsVUFBbEQsR0FBZCxHQUFpRixJQURuRjtBQUVFcUI7QUFGRixJQUREO0FBTUE7Ozs7OztBQTFCSUYsWSxDQUNFTSxZLEdBQWE7QUFDbkJGLFVBQVMsaUJBQVVHO0FBREEsQztBQURmUCxZLENBSUVRLGlCLEdBQWtCO0FBQ3hCUCxXQUFTLGlCQUFVTTtBQURLLEM7O0lBeUJwQkUsTTs7Ozs7Ozs7Ozs7MkJBS0c7QUFBQSx1QkFDdUIsS0FBS3BCLEtBQUwsQ0FBV1YsTUFEbEM7QUFBQSxPQUNBZSxJQURBLGlCQUNBQSxJQURBO0FBQUEsT0FDS0UsS0FETCxpQkFDS0EsS0FETDtBQUFBLE9BQ1dILE1BRFgsaUJBQ1dBLE1BRFg7QUFBQSxPQUNrQkQsR0FEbEIsaUJBQ2tCQSxHQURsQjtBQUFBLGtCQUVvQyxLQUFLYSxPQUZ6QztBQUFBLE9BRVNmLE1BRlQsWUFFQWMsT0FGQSxDQUVTZCxNQUZUO0FBQUEsT0FFNEJWLEtBRjVCLFlBRWtCcUIsUUFGbEIsQ0FFNEJyQixLQUY1Qjs7QUFHUCxVQUNDO0FBQUE7QUFBQTtBQUNFWSxRQUFJa0IsRUFBSixJQUFVLHdDQUFNLGFBQWFsQixJQUFJa0IsRUFBdkIsRUFBMkIsUUFBUWxCLElBQUltQixLQUF2QyxFQUE4QyxjQUFZL0IsS0FBWixPQUE5QyxHQURaO0FBRUVhLFdBQU9pQixFQUFQLElBQWEsd0NBQU0sYUFBYWpCLE9BQU9pQixFQUExQixFQUE4QixRQUFRakIsT0FBT2tCLEtBQTdDLEVBQW9ELFdBQVNyQixNQUFULFVBQW9CVixLQUFwQixTQUE2QlUsTUFBakYsR0FGZjtBQUdFTSxVQUFNYyxFQUFOLElBQVksd0NBQU0sYUFBYWQsTUFBTWMsRUFBekIsRUFBNkIsUUFBUWQsTUFBTWUsS0FBM0MsRUFBa0QsU0FBTy9CLEtBQVAsWUFBbUJBLEtBQW5CLFNBQTRCVSxNQUE5RSxHQUhkO0FBSUVJLFNBQUtnQixFQUFMLElBQVcsd0NBQU0sYUFBYWhCLEtBQUtnQixFQUF4QixFQUE0QixRQUFRaEIsS0FBS2lCLEtBQXpDLEVBQWdELGdCQUFjckIsTUFBOUQ7QUFKYixJQUREO0FBUUE7Ozs7OztBQWhCSW1CLE0sQ0FDRUgsWSxHQUFhO0FBQ25CRixVQUFTLGlCQUFVRyxNQURBO0FBRW5CTixXQUFVLGlCQUFVTTtBQUZELEMiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGwgZXh0ZW5kcyBBbnl7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY2VsbFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDx0ZD57dGhpcy5nZXRDb250ZW50KCl9PC90ZD5cclxuXHR9XHJcblxyXG5cdGFwcGVuZENvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2goLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XHJcblx0XHRjb25zdCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdGxldCB7bWFyZ2luLGJvcmRlcix3aWR0aCxiYWNrZ3JvdW5kfT1zdHlsZVxyXG5cdFx0bGV0IGdhcD10aGlzLmdldENvbnRlbnRHYXAoc3R5bGUpXHJcblx0XHRsZXQgeT0wXHJcblx0XHRsZXQgcG9zaXRpb25lZExpbmVzPXRoaXMuY29tcHV0ZWQuY29tcG9zZWQubWFwKChsaW5lLGkpPT57XHJcblx0XHRcdGNvbnN0IHt3aWR0aCxoZWlnaHR9PWxpbmUucHJvcHNcclxuXHRcdFx0bGV0IHBvc2l0aW9uZWRMaW5lPSg8R3JvdXAgeT17eX0gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0ga2V5PXtpfT57bGluZX08L0dyb3VwPilcclxuXHRcdFx0eSs9aGVpZ2h0XHJcblx0XHRcdHJldHVybiBwb3NpdGlvbmVkTGluZVxyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Q29tcG9zZWRDZWxsIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXt5K2dhcC50b3ArZ2FwLmJvdHRvbX0gYmFja2dyb3VuZD17YmFja2dyb3VuZH0+XHJcblx0XHRcdFx0PEJvcmRlciBib3JkZXI9e2JvcmRlcn0vPlxyXG5cdFx0XHRcdDxHcm91cCB4PXtnYXAubGVmdH0geT17Z2FwLnRvcH0+XHJcblx0XHRcdFx0XHR7cG9zaXRpb25lZExpbmVzfVxyXG5cdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdDwvQ29tcG9zZWRDZWxsPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGNvbnN0IHN0eWxlPXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0Y29uc3QgZ2FwPXRoaXMuZ2V0Q29udGVudEdhcChzdHlsZSlcclxuXHRcdGxldCB3aWR0aD1zdHlsZS53aWR0aC1nYXAucmlnaHQtZ2FwLmxlZnRcclxuXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn1cclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnRHYXAoc3R5bGUpe1xyXG5cdFx0cmV0dXJuIHtsZWZ0OjAscmlnaHQ6MCx0b3A6MCxib3R0b206MH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbXBvc2VkQ2VsbCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvd1NpemU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcclxuXHRcdGNlbGxTaXplOlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Y2VsbFNpemU6IHtcclxuXHRcdFx0XHR3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3dpZHRoLGhlaWdodCwgYmFja2dyb3VuZCwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3Jvd1NpemV9PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxyXG5cdFx0XHRcdHtiYWNrZ3JvdW5kID8gKDxyZWN0IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtyb3dTaXplLmhlaWdodH0gZmlsbD17YmFja2dyb3VuZH0vPikgOiBudWxsfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEJvcmRlciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvd1NpemU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtsZWZ0LHJpZ2h0LGJvdHRvbSx0b3B9PXRoaXMucHJvcHMuYm9yZGVyXHJcblx0XHRjb25zdCB7cm93U2l6ZTp7aGVpZ2h0fSwgY2VsbFNpemU6e3dpZHRofX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0e3RvcC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17dG9wLnN6fSBzdHJva2U9e3RvcC5jb2xvcn0gZD17YE0wIDAgTCR7d2lkdGh9IDBgfS8+fVxyXG5cdFx0XHRcdHtib3R0b20uc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2JvdHRvbS5zen0gc3Ryb2tlPXtib3R0b20uY29sb3J9IGQ9e2BNMCAke2hlaWdodH0gTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XHJcblx0XHRcdFx0e3JpZ2h0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtyaWdodC5zen0gc3Ryb2tlPXtyaWdodC5jb2xvcn0gZD17YE0ke3dpZHRofSAwIEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHRcdHtsZWZ0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtsZWZ0LnN6fSBzdHJva2U9e2xlZnQuY29sb3J9IGQ9e2BNMCAwIEwwICR7aGVpZ2h0fWB9Lz59XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==