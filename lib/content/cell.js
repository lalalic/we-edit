"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _any.styleInheritable)(_any2.default);
var asIsFunc = function asIsFunc(cond) {
	return "is" + cond.charAt(0).toUpperCase() + cond.substr(1);
};

var Cell = function (_Super) {
	(0, _inherits3.default)(Cell, _Super);

	function Cell() {
		(0, _classCallCheck3.default)(this, Cell);
		return (0, _possibleConstructorReturn3.default)(this, (Cell.__proto__ || (0, _getPrototypeOf2.default)(Cell)).apply(this, arguments));
	}

	(0, _createClass3.default)(Cell, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var _get$apply = (0, _get3.default)(Cell.prototype.__proto__ || (0, _getPrototypeOf2.default)(Cell.prototype), "nextAvailableSpace", this).apply(this, arguments),
			    width = _get$apply.width,
			    height = _get$apply.height;

			var _getStyle = this.getStyle(),
			    margin = _getStyle.margin;

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

			var _context = this.context,
			    tableStyle = _context.tableStyle,
			    rowStyle = _context.rowStyle;
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
			var conditions = this.conditions;
			var _context2 = this.context,
			    tableStyle = _context2.tableStyle,
			    rowStyle = _context2.rowStyle,
			    inheritedStyle = _context2.inheritedStyle;
			var directStyle = this.props.directStyle;

			return (0, _assign2.default)((0, _get3.default)(Cell.prototype.__proto__ || (0, _getPrototypeOf2.default)(Cell.prototype), "getChildContext", this).call(this), {
				inheritedStyle: {
					get: function get(path) {
						directStyle.basedOn = rowStyle;
						rowStyle.basedOn = tableStyle;
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
Cell.contextTypes = (0, _assign2.default)({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJhc0lzRnVuYyIsImNvbmQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsIkNlbGwiLCJyZXF1aXJlZCIsImFyZ3VtZW50cyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0U3R5bGUiLCJtYXJnaW4iLCJyaWdodCIsImxlZnQiLCJ0b3AiLCJib3R0b20iLCJfc3R5bGUiLCJjb25kaXRpb25zIiwiY29udGV4dCIsInRhYmxlU3R5bGUiLCJyb3dTdHlsZSIsImRpcmVjdFN0eWxlIiwicHJvcHMiLCJiYXNlZE9uIiwiZWRnZXMiLCJzcGxpdCIsImZpbHRlciIsImluY2x1ZGVzIiwiYm9yZGVyIiwiZ2V0Qm9yZGVyIiwiZm9yRWFjaCIsImEiLCJnZXQiLCJzcGFjaW5nIiwiYmFja2dyb3VuZCIsInNlbGYiLCJpbmhlcml0ZWRTdHlsZSIsInBhdGgiLCJ2IiwidW5kZWZpbmVkIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJpc0ZpcnN0Um93IiwiZnVuYyIsImlzTGFzdFJvdyIsImlzQmFuZDFIb3J6IiwiaXNCYW5kMkhvcnoiLCJpc0ZpcnN0Q29sIiwiaXNMYXN0Q29sIiwiaXNCYW5kMVZlcnQiLCJpc0JhbmQyVmVydCIsImlzU2VDZWxsIiwiaXNTd0NlbGwiLCJpc05lQ2VsbCIsImlzTndDZWxsIiwiaXNGaXJzdFJvd0Fic29sdXRlIiwiaXNMYXN0Um93QWJzb2x1dGUiLCJpc0ZpcnN0Q29sQWJzb2x1dGUiLCJpc0xhc3RDb2xBYnNvbHV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7OztBQUVBLElBQUlBLFFBQU0seUNBQVY7QUFDQSxJQUFJQyxXQUFTLFNBQVRBLFFBQVM7QUFBQSxlQUFXQyxLQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlQyxXQUFmLEVBQVgsR0FBMENGLEtB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LFNBQVNDLElBQVQsQ0FBYixHQUFOO0FBQUEsSUFEYixDQUFQO0FBRUE7OztFQWhEZ0NGLEs7O0FBQWJNLEksQ0FDYm1DLFcsR0FBWSxNO0FBRENuQyxJLENBa0Rib0MsWSxHQUFhLHNCQUFjO0FBQ2pDdEIsYUFBWSxpQkFBVXVCLE1BRFc7QUFFakN0QixXQUFVLGlCQUFVc0IsTUFGYTtBQUdqQ0MsYUFBWSxpQkFBVUMsSUFIVztBQUlqQ0MsWUFBVyxpQkFBVUQsSUFKWTtBQUtqQ0UsY0FBYSxpQkFBVUYsSUFMVTtBQU1qQ0csY0FBYSxpQkFBVUgsSUFOVTtBQU9qQ0ksYUFBWSxpQkFBVUosSUFQVztBQVFqQ0ssWUFBVyxpQkFBVUwsSUFSWTtBQVNqQ00sY0FBYSxpQkFBVU4sSUFUVTtBQVVqQ08sY0FBYSxpQkFBVVAsSUFWVTtBQVdqQ1EsV0FBVSxpQkFBVVIsSUFYYTtBQVlqQ1MsV0FBVSxpQkFBVVQsSUFaYTtBQWFqQ1UsV0FBVSxpQkFBVVYsSUFiYTtBQWNqQ1csV0FBVSxpQkFBVVgsSUFkYTtBQWVqQ1kscUJBQW9CLGlCQUFVWixJQWZHO0FBZ0JqQ2Esb0JBQW1CLGlCQUFVYixJQWhCSTtBQWlCakNjLHFCQUFvQixpQkFBVWQsSUFqQkc7QUFrQmpDZSxvQkFBbUIsaUJBQVVmO0FBbEJJLENBQWQsRUFtQmpCN0MsTUFBTTBDLFlBbkJXLEM7a0JBbERBcEMsSSIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGV9IGZyb20gXCIuL2FueVwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmxldCBhc0lzRnVuYz1jb25kPT5gaXMke2NvbmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtjb25kLnN1YnN0cigxKX1gXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGwgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJjZWxsXCJcclxuXHRuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpe1xyXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXN1cGVyLm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0bGV0IHttYXJnaW59PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0d2lkdGg9d2lkdGhcclxuXHRcdFx0LW1hcmdpbi5yaWdodFxyXG5cdFx0XHQtbWFyZ2luLmxlZnRcclxuXHJcblx0XHRoZWlnaHQ9aGVpZ2h0XHJcblx0XHRcdC1tYXJnaW4udG9wXHJcblx0XHRcdC1tYXJnaW4uYm90dG9tXHJcblxyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0aWYodGhpcy5fc3R5bGUpXHJcblx0XHRcdHJldHVybiB0aGlzLl9zdHlsZVxyXG5cclxuXHRcdGxldCBjb25kaXRpb25zPXRoaXMuY29uZGl0aW9uc1xyXG5cclxuXHRcdGNvbnN0IHt0YWJsZVN0eWxlLCByb3dTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7ZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuXHJcblx0XHRkaXJlY3RTdHlsZS5iYXNlZE9uPXJvd1N0eWxlXHJcblx0XHRyb3dTdHlsZS5iYXNlZE9uPXRhYmxlU3R5bGVcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRsZXQgZWRnZXM9XCJsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3dcIi5zcGxpdChcIixcIilcclxuXHRcdFx0LmZpbHRlcihjb25kPT4hY29uZGl0aW9ucy5pbmNsdWRlcyhjb25kKSAmJiB0aGlzLmNvbnRleHRbYXNJc0Z1bmMoY29uZCkrXCJBYnNvbHV0ZVwiXSgpKVxyXG5cclxuXHRcdGxldCBib3JkZXI9ZGlyZWN0U3R5bGUuZ2V0Qm9yZGVyKGNvbmRpdGlvbnMsIGVkZ2VzKVxyXG5cclxuXHRcdGxldCBtYXJnaW49e31cclxuXHRcdFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goYT0+bWFyZ2luW2FdPWRpcmVjdFN0eWxlLmdldChgbWFyZ2luLiR7YX1gKXx8MClcclxuXHJcblx0XHRsZXQgc3BhY2luZz1yb3dTdHlsZS5nZXQoYHNwYWNpbmdgKXx8MFxyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kPWRpcmVjdFN0eWxlLmdldCgndGNQci5zaGQnLGNvbmRpdGlvbnMpXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3N0eWxlPXtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZH1cclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb25zKCl7XHJcblx0XHRyZXR1cm4gXCJzZUNlbGwsc3dDZWxsLG5lQ2VsbCxud0NlbGwsbGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93LGJhbmQySG9yeixiYW5kMUhvcnosYmFuZDJWZXJ0LGJhbmQxVmVydFwiXHJcblx0XHRcdC5zcGxpdChcIixcIikuZmlsdGVyKGNvbmQ9PnRoaXMuY29udGV4dFthc0lzRnVuYyhjb25kKV0oKSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0cm93U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQxSG9yejogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQySG9yejogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQxVmVydDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQyVmVydDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc1NlQ2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc1N3Q2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc05lQ2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc053Q2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRsZXQgY29uZGl0aW9ucz10aGlzLmNvbmRpdGlvbnNcclxuXHRcdGNvbnN0IHt0YWJsZVN0eWxlLCByb3dTdHlsZSwgaW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0XHRpbmhlcml0ZWRTdHlsZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xyXG5cdFx0XHRcdFx0XHRkaXJlY3RTdHlsZS5iYXNlZE9uPXJvd1N0eWxlXHJcblx0XHRcdFx0XHRcdHJvd1N0eWxlLmJhc2VkT249dGFibGVTdHlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1kaXJlY3RTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuIl19