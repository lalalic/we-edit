"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _container = require("./container");

var _container2 = _interopRequireDefault(_container);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.styleInheritable)(_container2.default);

var Cell = function (_Super) {
	_inherits(Cell, _Super);

	function Cell() {
		_classCallCheck(this, Cell);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));

		_this.computed.contentStyle.basedOn = _this.context.rowStyle || _this.context.tableStyle;
		return _this;
	}

	_createClass(Cell, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var _get$apply = _get(Object.getPrototypeOf(Cell.prototype), "nextAvailableSpace", this).apply(this, arguments);

			var width = _get$apply.width;
			var height = _get$apply.height;

			var _getStyle = this.getStyle();

			var border = _getStyle.border;
			var margin = _getStyle.margin;
			var spacing = _getStyle.spacing;

			width = width - border.right.sz - border.left.sz - margin.right - margin.left - spacing;

			height = height - border.top.sz - border.bottom.sz - margin.top - margin.bottom - spacing;
			return { width: width, height: height };
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			if (this._style) return this._style;
			var _context = this.context;
			var tableStyle = _context.tableStyle;
			var rowStyle = _context.rowStyle;
			var rowConditions = _context.conditions;
			var isFirstRow = _context.isFirstRow;
			var isLastRow = _context.isLastRow;
			var isFirstCol = _context.isFirstCol;
			var isLastCol = _context.isLastCol;
			var contentStyle = this.computed.contentStyle;

			var conditions = (contentStyle.cnfStyle || []).concat(rowConditions);
			if (!conditions.includes("firstRow") && isFirstRow()) conditions.push("firstRow");
			if (!conditions.includes("lastRow") && isLastRow()) conditions.push("lastRow");
			if (!conditions.includes("firstCol") && isFirstCol()) conditions.push("firstCol");
			if (!conditions.includes("lastCol") && isLastCol()) conditions.push("lastCol");

			var border = contentStyle.getBorder(conditions);

			var margin = {};
			"left,right,top,bottom".split(",").forEach(function (a) {
				return margin[a] = contentStyle.get("margin." + a) || 0;
			});

			var spacing = rowStyle.get("spacing") || 0;

			var background = contentStyle.get('shd', conditions);

			return this._style = { border: border, margin: margin, spacing: spacing, background: background };
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var contentStyle = this.computed.contentStyle;
			var _context2 = this.context;
			var containerStyle = _context2.containerStyle;
			var rowConditions = _context2.conditions;

			var conditions = (contentStyle.cnfStyle || []).concat(rowConditions);

			return Object.assign(_get(Object.getPrototypeOf(Cell.prototype), "getChildContext", this).call(this), {
				containerStyle: {
					get: function get(path) {
						var v = contentStyle.get(path, conditions);
						if (v == undefined) return containerStyle.get(path, conditions);else if ((0, _any.isToggleStyle)(path) && v == -1) {
							var toggles = containerStyle.get(path, conditions);
							if (typeof toggles == 'number') {
								if (toggles < 0) v = toggles - 1;else v = toggles;
							}
						}
						return v;
					}
				}
			});
		}
	}]);

	return Cell;
}(Super);

Cell.displayName = "cell";
Cell.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	conditions: _react.PropTypes.array,
	rowStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isFirstCol: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSwrQ0FBTjs7SUFDaUI7OztBQUVwQixVQUZvQixJQUVwQixHQUFhO3dCQUZPLE1BRVA7O3FFQUZPLGtCQUdWLFlBREc7O0FBRVosUUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixPQUEzQixHQUFtQyxNQUFLLE9BQUwsQ0FBYSxRQUFiLElBQXVCLE1BQUssT0FBTCxDQUFhLFVBQWIsQ0FGOUM7O0VBQWI7O2NBRm9COztxQ0FNRCxVQUFTOytDQU5SLHlEQU80QixXQURwQjs7T0FDdEIseUJBRHNCO09BQ2hCLDJCQURnQjs7bUJBR0csS0FBSyxRQUFMLEdBSEg7O09BR3RCLDBCQUhzQjtPQUdkLDBCQUhjO09BR04sNEJBSE07O0FBSTNCLFdBQU0sUUFDSixPQUFPLEtBQVAsQ0FBYSxFQUFiLEdBQ0EsT0FBTyxJQUFQLENBQVksRUFBWixHQUNBLE9BQU8sS0FBUCxHQUNBLE9BQU8sSUFBUCxHQUNBLE9BTEksQ0FKcUI7O0FBVzNCLFlBQU8sU0FDTCxPQUFPLEdBQVAsQ0FBVyxFQUFYLEdBQ0EsT0FBTyxNQUFQLENBQWMsRUFBZCxHQUNBLE9BQU8sR0FBUCxHQUNBLE9BQU8sTUFBUCxHQUNBLE9BTEssQ0FYb0I7QUFpQjNCLFVBQU8sRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFQLENBakIyQjs7Ozs2QkFvQmxCO0FBQ1QsT0FBRyxLQUFLLE1BQUwsRUFDRixPQUFPLEtBQUssTUFBTCxDQURSO2tCQUVxRyxLQUFLLE9BQUwsQ0FINUY7T0FHRixpQ0FIRTtPQUdVLDZCQUhWO09BRytCLHlCQUFYLFdBSHBCO09BRzhDLGlDQUg5QztPQUcwRCwrQkFIMUQ7T0FHcUUsaUNBSHJFO09BR2lGLCtCQUhqRjtPQUlGLGVBQWMsS0FBSyxRQUFMLENBQWQsYUFKRTs7QUFLVCxPQUFJLGFBQVcsQ0FBQyxhQUFhLFFBQWIsSUFBdUIsRUFBdkIsQ0FBRCxDQUE0QixNQUE1QixDQUFtQyxhQUFuQyxDQUFYLENBTEs7QUFNVCxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFVBQXBCLENBQUQsSUFBb0MsWUFBcEMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsVUFBaEIsRUFERDtBQUVBLE9BQUcsQ0FBQyxXQUFXLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBRCxJQUFtQyxXQUFuQyxFQUNGLFdBQVcsSUFBWCxDQUFnQixTQUFoQixFQUREO0FBRUEsT0FBRyxDQUFDLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFELElBQW9DLFlBQXBDLEVBQ0YsV0FBVyxJQUFYLENBQWdCLFVBQWhCLEVBREQ7QUFFQSxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFNBQXBCLENBQUQsSUFBbUMsV0FBbkMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsU0FBaEIsRUFERDs7QUFHQSxPQUFJLFNBQU8sYUFBYSxTQUFiLENBQXVCLFVBQXZCLENBQVAsQ0FmSzs7QUFpQlQsT0FBSSxTQUFPLEVBQVAsQ0FqQks7QUFrQlQsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsYUFBYSxHQUFiLGFBQTJCLENBQTNCLEtBQWlDLENBQWpDO0lBQWIsQ0FBM0MsQ0FsQlM7O0FBb0JULE9BQUksVUFBUSxTQUFTLEdBQVQsZUFBeUIsQ0FBekIsQ0FwQkg7O0FBc0JULE9BQUksYUFBVyxhQUFhLEdBQWIsQ0FBaUIsS0FBakIsRUFBdUIsVUFBdkIsQ0FBWCxDQXRCSzs7QUF5QlQsVUFBTyxLQUFLLE1BQUwsR0FBWSxFQUFDLGNBQUQsRUFBUyxjQUFULEVBQWlCLGdCQUFqQixFQUEwQixzQkFBMUIsRUFBWixDQXpCRTs7OztvQ0F1Q087T0FDQyxlQUFjLEtBQUssUUFBTCxDQUFkLGFBREQ7bUJBRTJDLEtBQUssT0FBTCxDQUYzQztPQUVDLDBDQUZEO09BRTRCLDBCQUFYLFdBRmpCOztBQUdmLE9BQUksYUFBVyxDQUFDLGFBQWEsUUFBYixJQUF1QixFQUF2QixDQUFELENBQTRCLE1BQTVCLENBQW1DLGFBQW5DLENBQVgsQ0FIVzs7QUFLTixVQUFPLE9BQU8sTUFBUCw0QkF0RUUsb0RBc0VGLEVBQXVDO0FBQ3JELG9CQUFlO0FBQ0ksdUJBQUksTUFBSztBQUNMLFVBQUksSUFBRSxhQUFhLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUIsVUFBdkIsQ0FBRixDQURDO0FBRUwsVUFBRyxLQUFHLFNBQUgsRUFDQyxPQUFPLGVBQWUsR0FBZixDQUFtQixJQUFuQixFQUF5QixVQUF6QixDQUFQLENBREosS0FFSyxJQUFHLHdCQUFjLElBQWQsS0FBdUIsS0FBRyxDQUFDLENBQUQsRUFBRztBQUNqQyxXQUFJLFVBQVEsZUFBZSxHQUFmLENBQW1CLElBQW5CLEVBQXlCLFVBQXpCLENBQVIsQ0FENkI7QUFFakMsV0FBRyxPQUFPLE9BQVAsSUFBaUIsUUFBakIsRUFBMEI7QUFDekIsWUFBRyxVQUFRLENBQVIsRUFDQyxJQUFFLFVBQVEsQ0FBUixDQUROLEtBR0ksSUFBRSxPQUFGLENBSEo7UUFESjtPQUZDO0FBU0wsYUFBTyxDQUFQLENBYks7TUFEYjtLQUFmO0lBRGMsQ0FBUCxDQUxNOzs7O1FBakVHO0VBQWE7O0FBQWIsS0FDYixjQUFZO0FBREMsS0F1RGIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxhQUFZLGlCQUFVLE1BQVY7QUFDWixhQUFZLGlCQUFVLEtBQVY7QUFDWixXQUFVLGlCQUFVLE1BQVY7QUFDVixhQUFZLGlCQUFVLElBQVY7QUFDWixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7QUFDWCxZQUFXLGlCQUFVLElBQVY7Q0FQUSxFQVFqQixNQUFNLFlBQU47a0JBL0RpQiIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIlxyXG5pbXBvcnQge3N0eWxlSW5oZXJpdGFibGUsIGlzVG9nZ2xlU3R5bGV9IGZyb20gXCIuL2FueVwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShDb250YWluZXIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGwgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJjZWxsXCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb21wdXRlZC5jb250ZW50U3R5bGUuYmFzZWRPbj10aGlzLmNvbnRleHQucm93U3R5bGV8fHRoaXMuY29udGV4dC50YWJsZVN0eWxlXHJcblx0fVxyXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09c3VwZXIubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nfT10aGlzLmdldFN0eWxlKClcclxuXHRcdHdpZHRoPXdpZHRoXHJcblx0XHRcdC1ib3JkZXIucmlnaHQuc3pcclxuXHRcdFx0LWJvcmRlci5sZWZ0LnN6XHJcblx0XHRcdC1tYXJnaW4ucmlnaHRcclxuXHRcdFx0LW1hcmdpbi5sZWZ0XHJcblx0XHRcdC1zcGFjaW5nXHJcblxyXG5cdFx0aGVpZ2h0PWhlaWdodFxyXG5cdFx0XHQtYm9yZGVyLnRvcC5zelxyXG5cdFx0XHQtYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHQtbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHQtc3BhY2luZ1xyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0aWYodGhpcy5fc3R5bGUpXHJcblx0XHRcdHJldHVybiB0aGlzLl9zdHlsZVxyXG5cdFx0Y29uc3Qge3RhYmxlU3R5bGUsIHJvd1N0eWxlLCBjb25kaXRpb25zOnJvd0NvbmRpdGlvbnMsIGlzRmlyc3RSb3csIGlzTGFzdFJvdywgaXNGaXJzdENvbCwgaXNMYXN0Q29sfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGxldCBjb25kaXRpb25zPShjb250ZW50U3R5bGUuY25mU3R5bGV8fFtdKS5jb25jYXQocm93Q29uZGl0aW9ucylcclxuXHRcdGlmKCFjb25kaXRpb25zLmluY2x1ZGVzKFwiZmlyc3RSb3dcIikgJiYgaXNGaXJzdFJvdygpKVxyXG5cdFx0XHRjb25kaXRpb25zLnB1c2goXCJmaXJzdFJvd1wiKVxyXG5cdFx0aWYoIWNvbmRpdGlvbnMuaW5jbHVkZXMoXCJsYXN0Um93XCIpICYmIGlzTGFzdFJvdygpKVxyXG5cdFx0XHRjb25kaXRpb25zLnB1c2goXCJsYXN0Um93XCIpXHJcblx0XHRpZighY29uZGl0aW9ucy5pbmNsdWRlcyhcImZpcnN0Q29sXCIpICYmIGlzRmlyc3RDb2woKSlcclxuXHRcdFx0Y29uZGl0aW9ucy5wdXNoKFwiZmlyc3RDb2xcIilcclxuXHRcdGlmKCFjb25kaXRpb25zLmluY2x1ZGVzKFwibGFzdENvbFwiKSAmJiBpc0xhc3RDb2woKSlcclxuXHRcdFx0Y29uZGl0aW9ucy5wdXNoKFwibGFzdENvbFwiKVxyXG5cclxuXHRcdGxldCBib3JkZXI9Y29udGVudFN0eWxlLmdldEJvcmRlcihjb25kaXRpb25zKVxyXG5cclxuXHRcdGxldCBtYXJnaW49e31cclxuXHRcdFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goYT0+bWFyZ2luW2FdPWNvbnRlbnRTdHlsZS5nZXQoYG1hcmdpbi4ke2F9YCl8fDApXHJcblxyXG5cdFx0bGV0IHNwYWNpbmc9cm93U3R5bGUuZ2V0KGBzcGFjaW5nYCl8fDBcclxuXHJcblx0XHRsZXQgYmFja2dyb3VuZD1jb250ZW50U3R5bGUuZ2V0KCdzaGQnLGNvbmRpdGlvbnMpXHJcblxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zdHlsZT17Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmcsIGJhY2tncm91bmR9XHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRjb25kaXRpb25zOiBQcm9wVHlwZXMuYXJyYXksXHJcblx0XHRyb3dTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHtjb250ZW50U3R5bGV9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICAgICAgY29uc3Qge2NvbnRhaW5lclN0eWxlLCBjb25kaXRpb25zOnJvd0NvbmRpdGlvbnN9PXRoaXMuY29udGV4dFxyXG5cdFx0XHRsZXQgY29uZGl0aW9ucz0oY29udGVudFN0eWxlLmNuZlN0eWxlfHxbXSkuY29uY2F0KHJvd0NvbmRpdGlvbnMpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyU3R5bGU6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1jb250ZW50U3R5bGUuZ2V0KHBhdGgsIGNvbmRpdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih2PT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lclN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihpc1RvZ2dsZVN0eWxlKHBhdGgpICYmIHY9PS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlcz1jb250YWluZXJTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YodG9nZ2xlcyk9PSdudW1iZXInKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodG9nZ2xlczwwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdj10b2dnbGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0fVxyXG59XHJcbiJdfQ==