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

		_this.props.directStyle.metadata.basedOn = _this.context.rowStyle || _this.context.tableStyle;
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
			var directStyle = this.props.directStyle;

			var conditions = (directStyle.cnfStyle || []).concat(rowConditions);
			if (!conditions.includes("firstRow") && isFirstRow()) conditions.push("firstRow");
			if (!conditions.includes("lastRow") && isLastRow()) conditions.push("lastRow");
			if (!conditions.includes("firstCol") && isFirstCol()) conditions.push("firstCol");
			if (!conditions.includes("lastCol") && isLastCol()) conditions.push("lastCol");

			var border = directStyle.getBorder(conditions);

			var margin = {};
			"left,right,top,bottom".split(",").forEach(function (a) {
				return margin[a] = directStyle.get("margin." + a) || 0;
			});

			var spacing = rowStyle.get("spacing") || 0;

			var background = directStyle.get('shd', conditions);

			return this._style = { border: border, margin: margin, spacing: spacing, background: background };
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var directStyle = this.props.directStyle;
			var _context2 = this.context;
			var inheritedStyle = _context2.inheritedStyle;
			var rowConditions = _context2.conditions;

			var conditions = (directStyle.cnfStyle || []).concat(rowConditions);

			return Object.assign(_get(Object.getPrototypeOf(Cell.prototype), "getChildContext", this).call(this), {
				inheritedStyle: {
					get: function get(path) {
						var v = directStyle.get(path, conditions);
						if (v == undefined) return inheritedStyle.get(path, conditions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx5Q0FBTjs7SUFDaUI7OztBQUVwQixVQUZvQixJQUVwQixHQUFhO3dCQUZPLE1BRVA7O3FFQUZPLGtCQUdWLFlBREc7O0FBRVosUUFBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixRQUF2QixDQUFnQyxPQUFoQyxHQUF3QyxNQUFLLE9BQUwsQ0FBYSxRQUFiLElBQXVCLE1BQUssT0FBTCxDQUFhLFVBQWIsQ0FGbkQ7O0VBQWI7O2NBRm9COztxQ0FNRCxVQUFTOytDQU5SLHlEQU80QixXQURwQjs7T0FDdEIseUJBRHNCO09BQ2hCLDJCQURnQjs7bUJBR2QsS0FBSyxRQUFMLEdBSGM7O09BR3RCLDBCQUhzQjs7QUFJM0IsV0FBTSxRQUNKLE9BQU8sS0FBUCxHQUNBLE9BQU8sSUFBUCxDQU55Qjs7QUFRM0IsWUFBTyxTQUNMLE9BQU8sR0FBUCxHQUNBLE9BQU8sTUFBUCxDQVZ5Qjs7QUFZM0IsVUFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVAsQ0FaMkI7Ozs7NkJBZWxCO0FBQ1QsT0FBRyxLQUFLLE1BQUwsRUFDRixPQUFPLEtBQUssTUFBTCxDQURSO2tCQUVxRyxLQUFLLE9BQUwsQ0FINUY7T0FHRixpQ0FIRTtPQUdVLDZCQUhWO09BRytCLHlCQUFYLFdBSHBCO09BRzhDLGlDQUg5QztPQUcwRCwrQkFIMUQ7T0FHcUUsaUNBSHJFO09BR2lGLCtCQUhqRjtPQUlGLGNBQWEsS0FBSyxLQUFMLENBQWIsWUFKRTs7QUFLVCxPQUFJLGFBQVcsQ0FBQyxZQUFZLFFBQVosSUFBc0IsRUFBdEIsQ0FBRCxDQUEyQixNQUEzQixDQUFrQyxhQUFsQyxDQUFYLENBTEs7QUFNVCxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFVBQXBCLENBQUQsSUFBb0MsWUFBcEMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsVUFBaEIsRUFERDtBQUVBLE9BQUcsQ0FBQyxXQUFXLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBRCxJQUFtQyxXQUFuQyxFQUNGLFdBQVcsSUFBWCxDQUFnQixTQUFoQixFQUREO0FBRUEsT0FBRyxDQUFDLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFELElBQW9DLFlBQXBDLEVBQ0YsV0FBVyxJQUFYLENBQWdCLFVBQWhCLEVBREQ7QUFFQSxPQUFHLENBQUMsV0FBVyxRQUFYLENBQW9CLFNBQXBCLENBQUQsSUFBbUMsV0FBbkMsRUFDRixXQUFXLElBQVgsQ0FBZ0IsU0FBaEIsRUFERDs7QUFHQSxPQUFJLFNBQU8sWUFBWSxTQUFaLENBQXNCLFVBQXRCLENBQVAsQ0FmSzs7QUFpQlQsT0FBSSxTQUFPLEVBQVAsQ0FqQks7QUFrQlQsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsWUFBWSxHQUFaLGFBQTBCLENBQTFCLEtBQWdDLENBQWhDO0lBQWIsQ0FBM0MsQ0FsQlM7O0FBb0JULE9BQUksVUFBUSxTQUFTLEdBQVQsZUFBeUIsQ0FBekIsQ0FwQkg7O0FBc0JULE9BQUksYUFBVyxZQUFZLEdBQVosQ0FBZ0IsS0FBaEIsRUFBc0IsVUFBdEIsQ0FBWCxDQXRCSzs7QUF5QlQsVUFBTyxLQUFLLE1BQUwsR0FBWSxFQUFDLGNBQUQsRUFBUyxjQUFULEVBQWlCLGdCQUFqQixFQUEwQixzQkFBMUIsRUFBWixDQXpCRTs7OztvQ0F1Q087T0FDQyxjQUFhLEtBQUssS0FBTCxDQUFiLFlBREQ7bUJBRTJDLEtBQUssT0FBTCxDQUYzQztPQUVDLDBDQUZEO09BRTRCLDBCQUFYLFdBRmpCOztBQUdmLE9BQUksYUFBVyxDQUFDLFlBQVksUUFBWixJQUFzQixFQUF0QixDQUFELENBQTJCLE1BQTNCLENBQWtDLGFBQWxDLENBQVgsQ0FIVzs7QUFLTixVQUFPLE9BQU8sTUFBUCw0QkFqRUUsb0RBaUVGLEVBQXVDO0FBQ3JELG9CQUFlO0FBQ0ksdUJBQUksTUFBSztBQUNMLFVBQUksSUFBRSxZQUFZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0IsVUFBdEIsQ0FBRixDQURDO0FBRUwsVUFBRyxLQUFHLFNBQUgsRUFDQyxPQUFPLGVBQWUsR0FBZixDQUFtQixJQUFuQixFQUF5QixVQUF6QixDQUFQLENBREo7QUFFQSxhQUFPLENBQVAsQ0FKSztNQURiO0tBQWY7SUFEYyxDQUFQLENBTE07Ozs7UUE1REc7RUFBYTs7QUFBYixLQUNiLGNBQVk7QUFEQyxLQWtEYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGFBQVksaUJBQVUsTUFBVjtBQUNaLGFBQVksaUJBQVUsS0FBVjtBQUNaLFdBQVUsaUJBQVUsTUFBVjtBQUNWLGFBQVksaUJBQVUsSUFBVjtBQUNaLGFBQVksaUJBQVUsSUFBVjtBQUNaLFlBQVcsaUJBQVUsSUFBVjtBQUNYLFlBQVcsaUJBQVUsSUFBVjtDQVBRLEVBUWpCLE1BQU0sWUFBTjtrQkExRGlCIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZSwgaXNUb2dnbGVTdHlsZX0gZnJvbSBcIi4vYW55XCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImNlbGxcIlxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnByb3BzLmRpcmVjdFN0eWxlLm1ldGFkYXRhLmJhc2VkT249dGhpcy5jb250ZXh0LnJvd1N0eWxlfHx0aGlzLmNvbnRleHQudGFibGVTdHlsZVxyXG5cdH1cclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpe1xyXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXN1cGVyLm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0bGV0IHttYXJnaW59PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0d2lkdGg9d2lkdGhcclxuXHRcdFx0LW1hcmdpbi5yaWdodFxyXG5cdFx0XHQtbWFyZ2luLmxlZnRcclxuXHJcblx0XHRoZWlnaHQ9aGVpZ2h0XHJcblx0XHRcdC1tYXJnaW4udG9wXHJcblx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblxyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0aWYodGhpcy5fc3R5bGUpXHJcblx0XHRcdHJldHVybiB0aGlzLl9zdHlsZVxyXG5cdFx0Y29uc3Qge3RhYmxlU3R5bGUsIHJvd1N0eWxlLCBjb25kaXRpb25zOnJvd0NvbmRpdGlvbnMsIGlzRmlyc3RSb3csIGlzTGFzdFJvdywgaXNGaXJzdENvbCwgaXNMYXN0Q29sfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGNvbmRpdGlvbnM9KGRpcmVjdFN0eWxlLmNuZlN0eWxlfHxbXSkuY29uY2F0KHJvd0NvbmRpdGlvbnMpXHJcblx0XHRpZighY29uZGl0aW9ucy5pbmNsdWRlcyhcImZpcnN0Um93XCIpICYmIGlzRmlyc3RSb3coKSlcclxuXHRcdFx0Y29uZGl0aW9ucy5wdXNoKFwiZmlyc3RSb3dcIilcclxuXHRcdGlmKCFjb25kaXRpb25zLmluY2x1ZGVzKFwibGFzdFJvd1wiKSAmJiBpc0xhc3RSb3coKSlcclxuXHRcdFx0Y29uZGl0aW9ucy5wdXNoKFwibGFzdFJvd1wiKVxyXG5cdFx0aWYoIWNvbmRpdGlvbnMuaW5jbHVkZXMoXCJmaXJzdENvbFwiKSAmJiBpc0ZpcnN0Q29sKCkpXHJcblx0XHRcdGNvbmRpdGlvbnMucHVzaChcImZpcnN0Q29sXCIpXHJcblx0XHRpZighY29uZGl0aW9ucy5pbmNsdWRlcyhcImxhc3RDb2xcIikgJiYgaXNMYXN0Q29sKCkpXHJcblx0XHRcdGNvbmRpdGlvbnMucHVzaChcImxhc3RDb2xcIilcclxuXHJcblx0XHRsZXQgYm9yZGVyPWRpcmVjdFN0eWxlLmdldEJvcmRlcihjb25kaXRpb25zKVxyXG5cclxuXHRcdGxldCBtYXJnaW49e31cclxuXHRcdFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goYT0+bWFyZ2luW2FdPWRpcmVjdFN0eWxlLmdldChgbWFyZ2luLiR7YX1gKXx8MClcclxuXHJcblx0XHRsZXQgc3BhY2luZz1yb3dTdHlsZS5nZXQoYHNwYWNpbmdgKXx8MFxyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kPWRpcmVjdFN0eWxlLmdldCgnc2hkJyxjb25kaXRpb25zKVxyXG5cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3R5bGU9e2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nLCBiYWNrZ3JvdW5kfVxyXG5cdH1cclxuXHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0Y29uZGl0aW9uczogUHJvcFR5cGVzLmFycmF5LFxyXG5cdFx0cm93U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzRmlyc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbDogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG4gICAgICAgICAgICBjb25zdCB7ZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuICAgICAgICAgICAgY29uc3Qge2luaGVyaXRlZFN0eWxlLCBjb25kaXRpb25zOnJvd0NvbmRpdGlvbnN9PXRoaXMuY29udGV4dFxyXG5cdFx0XHRsZXQgY29uZGl0aW9ucz0oZGlyZWN0U3R5bGUuY25mU3R5bGV8fFtdKS5jb25jYXQocm93Q29uZGl0aW9ucylcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdFx0XHRpbmhlcml0ZWRTdHlsZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2PWRpcmVjdFN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmhlcml0ZWRTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblx0XHRcdFx0fSlcclxuXHRcdH1cclxufVxyXG4iXX0=