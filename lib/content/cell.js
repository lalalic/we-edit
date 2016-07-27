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
var asIsFunc = function asIsFunc(cond) {
	return "is" + cond.charAt(0).toUpperCase() + cond.substr(1);
};

var Cell = function (_Super) {
	_inherits(Cell, _Super);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));
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
			var _this2 = this;

			if (this._style) return this._style;

			var conditions = this.conditions;

			var _context = this.context;
			var tableStyle = _context.tableStyle;
			var rowStyle = _context.rowStyle;
			var directStyle = this.props.directStyle;


			directStyle.basedOn = rowStyle;
			rowStyle.basedOn = tableStyle;

			var edges = "lastCol,firstCol,lastRow,firstRow".split(",").filter(function (cond) {
				return !conditions.includes(cond) && _this2.context[asIsFunc(cond) + "Absolute"]();
			});

			var border = directStyle.getBorder(conditions, edges);

			var margin = {};
			"left,right,top,bottom".split(",").forEach(function (a) {
				return margin[a] = directStyle.get("margin." + a) || 0;
			});

			var spacing = rowStyle.get("spacing") || 0;

			var background = directStyle.get('tcPr.shd', conditions);

			return this._style = { border: border, margin: margin, spacing: spacing, background: background };
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			var _context2 = this.context;
			var tableStyle = _context2.tableStyle;
			var rowStyle = _context2.rowStyle;
			var inheritedStyle = _context2.inheritedStyle;
			var directStyle = this.props.directStyle;

			return Object.assign(_get(Object.getPrototypeOf(Cell.prototype), "getChildContext", this).call(this), {
				inheritedStyle: {
					get: function get(path) {
						directStyle.basedOn = rowStyle;
						rowStyle.basedOn = tableStyle;
						var conditions = self.conditions;
						var v = directStyle.get(path, conditions);
						if (v == undefined) return inheritedStyle.get(path, conditions);
						return v;
					}
				}
			});
		}
	}, {
		key: "conditions",
		get: function get() {
			var _this3 = this;

			return "seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert".split(",").filter(function (cond) {
				return _this3.context[asIsFunc(cond)]();
			});
		}
	}]);

	return Cell;
}(Super);

Cell.displayName = "cell";
Cell.contextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	rowStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isBand1Horz: _react.PropTypes.func,
	isBand2Horz: _react.PropTypes.func,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func,
	isFirstRowAbsolute: _react.PropTypes.func,
	isLastRowAbsolute: _react.PropTypes.func,
	isFirstColAbsolute: _react.PropTypes.func,
	isLastColAbsolute: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSx5Q0FBTjtBQUNKLElBQUksV0FBUyxTQUFULFFBQVM7ZUFBVyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixLQUErQixLQUFLLE1BQUwsQ0FBWSxDQUFaO0NBQTFDOztJQUNROzs7Ozs7Ozs7OztxQ0FFRCxVQUFTOytDQUZSLHlEQUc0QixXQURwQjs7T0FDdEIseUJBRHNCO09BQ2hCLDJCQURnQjs7bUJBR2QsS0FBSyxRQUFMLEdBSGM7O09BR3RCLDBCQUhzQjs7QUFJM0IsV0FBTSxRQUNKLE9BQU8sS0FBUCxHQUNBLE9BQU8sSUFBUCxDQU55Qjs7QUFRM0IsWUFBTyxTQUNMLE9BQU8sR0FBUCxHQUNBLE9BQU8sTUFBUCxDQVZ5Qjs7QUFZM0IsVUFBTyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQVAsQ0FaMkI7Ozs7NkJBZWxCOzs7QUFDVCxPQUFHLEtBQUssTUFBTCxFQUNGLE9BQU8sS0FBSyxNQUFMLENBRFI7O0FBR0EsT0FBSSxhQUFXLEtBQUssVUFBTCxDQUpOOztrQkFNb0IsS0FBSyxPQUFMLENBTnBCO09BTUYsaUNBTkU7T0FNVSw2QkFOVjtPQU9GLGNBQWEsS0FBSyxLQUFMLENBQWIsWUFQRTs7O0FBU1QsZUFBWSxPQUFaLEdBQW9CLFFBQXBCLENBVFM7QUFVVCxZQUFTLE9BQVQsR0FBaUIsVUFBakIsQ0FWUzs7QUFhVCxPQUFJLFFBQU0sb0NBQW9DLEtBQXBDLENBQTBDLEdBQTFDLEVBQ1IsTUFEUSxDQUNEO1dBQU0sQ0FBQyxXQUFXLFFBQVgsQ0FBb0IsSUFBcEIsQ0FBRCxJQUE4QixPQUFLLE9BQUwsQ0FBYSxTQUFTLElBQVQsSUFBZSxVQUFmLENBQWIsRUFBOUI7SUFBTixDQURMLENBYks7O0FBZ0JULE9BQUksU0FBTyxZQUFZLFNBQVosQ0FBc0IsVUFBdEIsRUFBa0MsS0FBbEMsQ0FBUCxDQWhCSzs7QUFrQlQsT0FBSSxTQUFPLEVBQVAsQ0FsQks7QUFtQlQsMkJBQXdCLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DLE9BQW5DLENBQTJDO1dBQUcsT0FBTyxDQUFQLElBQVUsWUFBWSxHQUFaLGFBQTBCLENBQTFCLEtBQWdDLENBQWhDO0lBQWIsQ0FBM0MsQ0FuQlM7O0FBcUJULE9BQUksVUFBUSxTQUFTLEdBQVQsZUFBeUIsQ0FBekIsQ0FyQkg7O0FBdUJULE9BQUksYUFBVyxZQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBMkIsVUFBM0IsQ0FBWCxDQXZCSzs7QUF5QlQsVUFBTyxLQUFLLE1BQUwsR0FBWSxFQUFDLGNBQUQsRUFBUyxjQUFULEVBQWlCLGdCQUFqQixFQUEwQixzQkFBMUIsRUFBWixDQXpCRTs7OztvQ0FzRE87QUFDaEIsT0FBSSxPQUFLLElBQUwsQ0FEWTttQkFFNkIsS0FBSyxPQUFMLENBRjdCO09BRVQsa0NBRlM7T0FFRyw4QkFGSDtPQUVhLDBDQUZiO09BR1QsY0FBYSxLQUFLLEtBQUwsQ0FBYixZQUhTOztBQUlWLFVBQU8sT0FBTyxNQUFQLDRCQTNFTSxvREEyRU4sRUFBdUM7QUFDbEQsb0JBQWU7QUFDQyx1QkFBSSxNQUFLO0FBQ3ZCLGtCQUFZLE9BQVosR0FBb0IsUUFBcEIsQ0FEdUI7QUFFdkIsZUFBUyxPQUFULEdBQWlCLFVBQWpCLENBRnVCO0FBR3ZCLFVBQUksYUFBVyxLQUFLLFVBQUwsQ0FIUTtBQUlMLFVBQUksSUFBRSxZQUFZLEdBQVosQ0FBZ0IsSUFBaEIsRUFBc0IsVUFBdEIsQ0FBRixDQUpDO0FBS0wsVUFBRyxLQUFHLFNBQUgsRUFDQyxPQUFPLGVBQWUsR0FBZixDQUFtQixJQUFuQixFQUF5QixVQUF6QixDQUFQLENBREo7QUFFQSxhQUFPLENBQVAsQ0FQSztNQURWO0tBQWY7SUFEVyxDQUFQLENBSlU7Ozs7c0JBMUJEOzs7QUFDZixVQUFPLHdHQUNMLEtBREssQ0FDQyxHQURELEVBQ00sTUFETixDQUNhO1dBQU0sT0FBSyxPQUFMLENBQWEsU0FBUyxJQUFULENBQWI7SUFBTixDQURwQixDQURlOzs7O1FBN0NJO0VBQWE7O0FBQWIsS0FDYixjQUFZO0FBREMsS0FrRGIsZUFBYSxPQUFPLE1BQVAsQ0FBYztBQUNqQyxhQUFZLGlCQUFVLE1BQVY7QUFDWixXQUFVLGlCQUFVLE1BQVY7QUFDVixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7QUFDWCxjQUFhLGlCQUFVLElBQVY7QUFDYixjQUFhLGlCQUFVLElBQVY7QUFDYixhQUFZLGlCQUFVLElBQVY7QUFDWixZQUFXLGlCQUFVLElBQVY7QUFDWCxjQUFhLGlCQUFVLElBQVY7QUFDYixjQUFhLGlCQUFVLElBQVY7QUFDYixXQUFVLGlCQUFVLElBQVY7QUFDVixXQUFVLGlCQUFVLElBQVY7QUFDVixXQUFVLGlCQUFVLElBQVY7QUFDVixXQUFVLGlCQUFVLElBQVY7QUFDVixxQkFBb0IsaUJBQVUsSUFBVjtBQUNwQixvQkFBbUIsaUJBQVUsSUFBVjtBQUNuQixxQkFBb0IsaUJBQVUsSUFBVjtBQUNwQixvQkFBbUIsaUJBQVUsSUFBVjtDQWxCQSxFQW1CakIsTUFBTSxZQUFOO2tCQXJFaUIiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxyXG5sZXQgYXNJc0Z1bmM9Y29uZD0+YGlzJHtjb25kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7Y29uZC5zdWJzdHIoMSl9YFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwiY2VsbFwiXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1zdXBlci5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdGxldCB7bWFyZ2lufT10aGlzLmdldFN0eWxlKClcclxuXHRcdHdpZHRoPXdpZHRoXHJcblx0XHRcdC1tYXJnaW4ucmlnaHRcclxuXHRcdFx0LW1hcmdpbi5sZWZ0XHJcblxyXG5cdFx0aGVpZ2h0PWhlaWdodFxyXG5cdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHQtbWFyZ2luLmJvdHRvbVxyXG5cclxuXHRcdHJldHVybiB7d2lkdGgsaGVpZ2h0fVxyXG5cdH1cclxuXHJcblx0Z2V0U3R5bGUoKXtcclxuXHRcdGlmKHRoaXMuX3N0eWxlKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fc3R5bGVcclxuXHJcblx0XHRsZXQgY29uZGl0aW9ucz10aGlzLmNvbmRpdGlvbnNcclxuXHJcblx0XHRjb25zdCB7dGFibGVTdHlsZSwgcm93U3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXHJcblxyXG5cdFx0ZGlyZWN0U3R5bGUuYmFzZWRPbj1yb3dTdHlsZVxyXG5cdFx0cm93U3R5bGUuYmFzZWRPbj10YWJsZVN0eWxlXHJcblx0XHRcclxuXHRcdFxyXG5cdFx0bGV0IGVkZ2VzPVwibGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdC5maWx0ZXIoY29uZD0+IWNvbmRpdGlvbnMuaW5jbHVkZXMoY29uZCkgJiYgdGhpcy5jb250ZXh0W2FzSXNGdW5jKGNvbmQpK1wiQWJzb2x1dGVcIl0oKSlcclxuXHJcblx0XHRsZXQgYm9yZGVyPWRpcmVjdFN0eWxlLmdldEJvcmRlcihjb25kaXRpb25zLCBlZGdlcylcclxuXHJcblx0XHRsZXQgbWFyZ2luPXt9XHJcblx0XHRcImxlZnQscmlnaHQsdG9wLGJvdHRvbVwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGE9Pm1hcmdpblthXT1kaXJlY3RTdHlsZS5nZXQoYG1hcmdpbi4ke2F9YCl8fDApXHJcblxyXG5cdFx0bGV0IHNwYWNpbmc9cm93U3R5bGUuZ2V0KGBzcGFjaW5nYCl8fDBcclxuXHJcblx0XHRsZXQgYmFja2dyb3VuZD1kaXJlY3RTdHlsZS5nZXQoJ3RjUHIuc2hkJyxjb25kaXRpb25zKVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zdHlsZT17Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmcsIGJhY2tncm91bmR9XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9ucygpe1xyXG5cdFx0cmV0dXJuIFwic2VDZWxsLHN3Q2VsbCxuZUNlbGwsbndDZWxsLGxhc3RDb2wsZmlyc3RDb2wsbGFzdFJvdyxmaXJzdFJvdyxiYW5kMkhvcnosYmFuZDFIb3J6LGJhbmQyVmVydCxiYW5kMVZlcnRcIlxyXG5cdFx0XHQuc3BsaXQoXCIsXCIpLmZpbHRlcihjb25kPT50aGlzLmNvbnRleHRbYXNJc0Z1bmMoY29uZCldKCkpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMkhvcno6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMVZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMlZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTd0NlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOd0NlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzRmlyc3RDb2xBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2xBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0Y29uc3Qge3RhYmxlU3R5bGUsIHJvd1N0eWxlLCBpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7ZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbiggc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRcdGluaGVyaXRlZFN0eWxlOntcclxuICAgICAgICAgICAgICAgICAgICBnZXQocGF0aCl7XHJcblx0XHRcdFx0XHRcdGRpcmVjdFN0eWxlLmJhc2VkT249cm93U3R5bGVcclxuXHRcdFx0XHRcdFx0cm93U3R5bGUuYmFzZWRPbj10YWJsZVN0eWxlXHJcblx0XHRcdFx0XHRcdGxldCBjb25kaXRpb25zPXNlbGYuY29uZGl0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1kaXJlY3RTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuIl19