"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.styleInheritable)(_any2.default);

var Cell = function (_Super) {
	_inherits(Cell, _Super);

	function Cell() {
		_classCallCheck(this, Cell);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));

		_this.props.contentStyle.metadata.basedOn = _this.context.rowStyle || _this.context.tableStyle;
		return _this;
	}

	_createClass(Cell, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var _get$apply = _get(Object.getPrototypeOf(Cell.prototype), "nextAvailableSpace", this).apply(this, arguments);

			var width = _get$apply.width;
			var height = _get$apply.height;

			var _getStyle = this.getStyle();

			var margin = _getStyle.margin;

			width = width - margin.right - margin.left;

			height = height - margin.top - margin.bottom;

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
			var contentStyle = this.props.contentStyle;

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
			var contentStyle = this.props.contentStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx5Q0FBTjs7SUFDaUI7OztBQUVwQixVQUZvQixJQUVwQixHQUFhO3dCQUZPLE1BRVA7O3FFQUZPLGtCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsWUFBWCxDQUF3QixRQUF4QixDQUFpQyxPQUFqQyxHQUF5QyxNQUFLLE9BQUwsQ0FBYSxRQUFiLElBQXVCLE1BQUssT0FBTCxDQUFhLFVBQWIsQ0FGcEQ7O0VBQWI7O2NBRm9COztxQ0FNRCxVQUFTOytDQU5SLHlEQU80QixXQURwQjs7T0FDdEIseUJBRHNCO09BQ2hCLDJCQURnQjs7bUJBR2QsS0FBSyxRQUFMLEdBSGM7O09BR3RCLDBCQUhzQjs7QUFJM0IsV0FBTSxRQUNKLE9BQU8sS0FBUCxHQUNBLE9BQU8sSUFBUCxDQU55Qjs7QUFRM0IsWUFBTyxTQUNMLE9BQU8sR0FBUCxHQUNBLE9BQU8sTUFBUCxDQVZ5Qjs7QUFZM0IsVUFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVAsQ0FaMkI7Ozs7NkJBZWxCO0FBQ1QsT0FBRyxLQUFLLE1BQUwsRUFDRixPQUFPLEtBQUssTUFBTCxDQURSO2tCQUVxRyxLQUFLLE9BQUwsQ0FINUY7T0FHRixpQ0FIRTtPQUdVLDZCQUhWO09BRytCLHlCQUFYLFdBSHBCO09BRzhDLGlDQUg5QztPQUcwRCwrQkFIMUQ7T0FHcUUsaUNBSHJFO09BR2lGLCtCQUhqRjtPQUlGLGVBQWMsS0FBSyxLQUFMLENBQWQsYUFKRTs7QUFLVCxPQUFJLGFBQVcsQ0FBQyxhQUFhLFFBQWIsSUFBdUIsRUFBdkIsQ0FBRCxDQUE0QixNQUE1QixDQUFtQyxhQUFuQyxDQUFYLENBTEs7QUFNVCxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFVBQXBCLENBQUQsSUFBb0MsWUFBcEMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsVUFBaEIsRUFERDtBQUVBLE9BQUcsQ0FBQyxXQUFXLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBRCxJQUFtQyxXQUFuQyxFQUNGLFdBQVcsSUFBWCxDQUFnQixTQUFoQixFQUREO0FBRUEsT0FBRyxDQUFDLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFELElBQW9DLFlBQXBDLEVBQ0YsV0FBVyxJQUFYLENBQWdCLFVBQWhCLEVBREQ7QUFFQSxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFNBQXBCLENBQUQsSUFBbUMsV0FBbkMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsU0FBaEIsRUFERDs7QUFHQSxPQUFJLFNBQU8sYUFBYSxTQUFiLENBQXVCLFVBQXZCLENBQVAsQ0FmSzs7QUFpQlQsT0FBSSxTQUFPLEVBQVAsQ0FqQks7QUFrQlQsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsYUFBYSxHQUFiLGFBQTJCLENBQTNCLEtBQWlDLENBQWpDO0lBQWIsQ0FBM0MsQ0FsQlM7O0FBb0JULE9BQUksVUFBUSxTQUFTLEdBQVQsZUFBeUIsQ0FBekIsQ0FwQkg7O0FBc0JULE9BQUksYUFBVyxhQUFhLEdBQWIsQ0FBaUIsS0FBakIsRUFBdUIsVUFBdkIsQ0FBWCxDQXRCSzs7QUF5QlQsVUFBTyxLQUFLLE1BQUwsR0FBWSxFQUFDLGNBQUQsRUFBUyxjQUFULEVBQWlCLGdCQUFqQixFQUEwQixzQkFBMUIsRUFBWixDQXpCRTs7OztvQ0F1Q087T0FDQyxlQUFjLEtBQUssS0FBTCxDQUFkLGFBREQ7bUJBRTJDLEtBQUssT0FBTCxDQUYzQztPQUVDLDBDQUZEO09BRTRCLDBCQUFYLFdBRmpCOztBQUdmLE9BQUksYUFBVyxDQUFDLGFBQWEsUUFBYixJQUF1QixFQUF2QixDQUFELENBQTRCLE1BQTVCLENBQW1DLGFBQW5DLENBQVgsQ0FIVzs7QUFLTixVQUFPLE9BQU8sTUFBUCw0QkFqRUUsb0RBaUVGLEVBQXVDO0FBQ3JELG9CQUFlO0FBQ0ksdUJBQUksTUFBSztBQUNMLFVBQUksSUFBRSxhQUFhLEdBQWIsQ0FBaUIsSUFBakIsRUFBdUIsVUFBdkIsQ0FBRixDQURDO0FBRUwsVUFBRyxLQUFHLFNBQUgsRUFDQyxPQUFPLGVBQWUsR0FBZixDQUFtQixJQUFuQixFQUF5QixVQUF6QixDQUFQLENBREosS0FFSyxJQUFHLHdCQUFjLElBQWQsS0FBdUIsS0FBRyxDQUFDLENBQUQsRUFBRztBQUNqQyxXQUFJLFVBQVEsZUFBZSxHQUFmLENBQW1CLElBQW5CLEVBQXlCLFVBQXpCLENBQVIsQ0FENkI7QUFFakMsV0FBRyxPQUFPLE9BQVAsSUFBaUIsUUFBakIsRUFBMEI7QUFDekIsWUFBRyxVQUFRLENBQVIsRUFDQyxJQUFFLFVBQVEsQ0FBUixDQUROLEtBR0ksSUFBRSxPQUFGLENBSEo7UUFESjtPQUZDO0FBU0wsYUFBTyxDQUFQLENBYks7TUFEYjtLQUFmO0lBRGMsQ0FBUCxDQUxNOzs7O1FBNURHO0VBQWE7O0FBQWIsS0FDYixjQUFZO0FBREMsS0FrRGIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxhQUFZLGlCQUFVLE1BQVY7QUFDWixhQUFZLGlCQUFVLEtBQVY7QUFDWixXQUFVLGlCQUFVLE1BQVY7QUFDVixhQUFZLGlCQUFVLElBQVY7QUFDWixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7QUFDWCxZQUFXLGlCQUFVLElBQVY7Q0FQUSxFQVFqQixNQUFNLFlBQU47a0JBMURpQiIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGUsIGlzVG9nZ2xlU3R5bGV9IGZyb20gXCIuL2FueVwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGwgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJjZWxsXCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5wcm9wcy5jb250ZW50U3R5bGUubWV0YWRhdGEuYmFzZWRPbj10aGlzLmNvbnRleHQucm93U3R5bGV8fHRoaXMuY29udGV4dC50YWJsZVN0eWxlXHJcblx0fVxyXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XHJcblx0XHRsZXQge3dpZHRoLGhlaWdodH09c3VwZXIubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRsZXQge21hcmdpbn09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHR3aWR0aD13aWR0aFxyXG5cdFx0XHQtbWFyZ2luLnJpZ2h0XHJcblx0XHRcdC1tYXJnaW4ubGVmdFxyXG5cclxuXHRcdGhlaWdodD1oZWlnaHRcclxuXHRcdFx0LW1hcmdpbi50b3BcclxuXHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodH1cclxuXHR9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRpZih0aGlzLl9zdHlsZSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N0eWxlXHJcblx0XHRjb25zdCB7dGFibGVTdHlsZSwgcm93U3R5bGUsIGNvbmRpdGlvbnM6cm93Q29uZGl0aW9ucywgaXNGaXJzdFJvdywgaXNMYXN0Um93LCBpc0ZpcnN0Q29sLCBpc0xhc3RDb2x9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGNvbmRpdGlvbnM9KGNvbnRlbnRTdHlsZS5jbmZTdHlsZXx8W10pLmNvbmNhdChyb3dDb25kaXRpb25zKVxyXG5cdFx0aWYoIWNvbmRpdGlvbnMuaW5jbHVkZXMoXCJmaXJzdFJvd1wiKSAmJiBpc0ZpcnN0Um93KCkpXHJcblx0XHRcdGNvbmRpdGlvbnMucHVzaChcImZpcnN0Um93XCIpXHJcblx0XHRpZighY29uZGl0aW9ucy5pbmNsdWRlcyhcImxhc3RSb3dcIikgJiYgaXNMYXN0Um93KCkpXHJcblx0XHRcdGNvbmRpdGlvbnMucHVzaChcImxhc3RSb3dcIilcclxuXHRcdGlmKCFjb25kaXRpb25zLmluY2x1ZGVzKFwiZmlyc3RDb2xcIikgJiYgaXNGaXJzdENvbCgpKVxyXG5cdFx0XHRjb25kaXRpb25zLnB1c2goXCJmaXJzdENvbFwiKVxyXG5cdFx0aWYoIWNvbmRpdGlvbnMuaW5jbHVkZXMoXCJsYXN0Q29sXCIpICYmIGlzTGFzdENvbCgpKVxyXG5cdFx0XHRjb25kaXRpb25zLnB1c2goXCJsYXN0Q29sXCIpXHJcblxyXG5cdFx0bGV0IGJvcmRlcj1jb250ZW50U3R5bGUuZ2V0Qm9yZGVyKGNvbmRpdGlvbnMpXHJcblxyXG5cdFx0bGV0IG1hcmdpbj17fVxyXG5cdFx0XCJsZWZ0LHJpZ2h0LHRvcCxib3R0b21cIi5zcGxpdChcIixcIikuZm9yRWFjaChhPT5tYXJnaW5bYV09Y29udGVudFN0eWxlLmdldChgbWFyZ2luLiR7YX1gKXx8MClcclxuXHJcblx0XHRsZXQgc3BhY2luZz1yb3dTdHlsZS5nZXQoYHNwYWNpbmdgKXx8MFxyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kPWNvbnRlbnRTdHlsZS5nZXQoJ3NoZCcsY29uZGl0aW9ucylcclxuXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3N0eWxlPXtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZH1cclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNvbmRpdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jXHJcblx0fSwgU3VwZXIuY29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuICAgICAgICAgICAgY29uc3Qge2NvbnRlbnRTdHlsZX09dGhpcy5wcm9wc1xyXG4gICAgICAgICAgICBjb25zdCB7Y29udGFpbmVyU3R5bGUsIGNvbmRpdGlvbnM6cm93Q29uZGl0aW9uc309dGhpcy5jb250ZXh0XHJcblx0XHRcdGxldCBjb25kaXRpb25zPShjb250ZW50U3R5bGUuY25mU3R5bGV8fFtdKS5jb25jYXQocm93Q29uZGl0aW9ucylcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdFx0XHRjb250YWluZXJTdHlsZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWNvbnRlbnRTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGFpbmVyU3R5bGUuZ2V0KHBhdGgsIGNvbmRpdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlzVG9nZ2xlU3R5bGUocGF0aCkgJiYgdj09LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2dnbGVzPWNvbnRhaW5lclN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZih0b2dnbGVzKT09J251bWJlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0b2dnbGVzPDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXMtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2PXRvZ2dsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdH0pXHJcblx0XHR9XHJcbn1cclxuIl19