"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _maxSafeInteger = require("babel-runtime/core-js/number/max-safe-integer");

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

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
			var _getStyle = this.getStyle(),
			    margin = _getStyle.margin,
			    border = _getStyle.border,
			    width = _getStyle.width;

			var gap = "right,left,top,bottom".split(",").reduce(function (state, a) {
				state[a] = Math.max(margin[a], border[a].sz / 2);
				return state;
			}, {});
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
				{ width: width + gap.right + gap.left, height: y + gap.top + gap.bottom },
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
			var _getStyle2 = this.getStyle(),
			    margin = _getStyle2.margin,
			    border = _getStyle2.border,
			    width = _getStyle2.width;

			width = width - Math.max(margin.right, border.right.sz / 2) - Math.max(margin.left, border.left.sz / 2);

			return { width: width, height: _maxSafeInteger2.default };
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
				return margin[a] = directStyle.get("margin." + a) || tableStyle.get("tblPr.tblCellMar." + a) || 0;
			});

			var spacing = rowStyle.get("spacing") || 0;

			var background = directStyle.get('tcPr.shd', conditions);

			var width = directStyle.get('tcPr.tcW');

			var height = rowStyle.get('tcHeight');

			return this._style = { border: border, margin: margin, spacing: spacing, background: background, width: width, height: height };
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

var ComposedCell = function (_Component) {
	(0, _inherits3.default)(ComposedCell, _Component);

	function ComposedCell() {
		(0, _classCallCheck3.default)(this, ComposedCell);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedCell.__proto__ || (0, _getPrototypeOf2.default)(ComposedCell)).apply(this, arguments));
	}

	(0, _createClass3.default)(ComposedCell, [{
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
			    others = (0, _objectWithoutProperties3.default)(_props, ["width", "height", "background", "children"]);

			return _react2.default.createElement(
				_group2.default,
				others,
				background && _react2.default.createElement("rect", { width: width, height: height, fill: background }),
				children
			);
		}
	}]);
	return ComposedCell;
}(_react.Component);

ComposedCell.childContextTypes = {
	cellSize: _react.PropTypes.object
};

var Border = function (_Component2) {
	(0, _inherits3.default)(Border, _Component2);

	function Border() {
		(0, _classCallCheck3.default)(this, Border);
		return (0, _possibleConstructorReturn3.default)(this, (Border.__proto__ || (0, _getPrototypeOf2.default)(Border)).apply(this, arguments));
	}

	(0, _createClass3.default)(Border, [{
		key: "render",
		value: function render() {
			var _props$border = this.props.border,
			    left = _props$border.left,
			    right = _props$border.right,
			    bottom = _props$border.bottom,
			    top = _props$border.top;
			var _context3 = this.context,
			    height = _context3.rowSize.height,
			    width = _context3.cellSize.width;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJhc0lzRnVuYyIsImNvbmQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsIkNlbGwiLCJnZXRDb250ZW50IiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInB1c2giLCJhcmd1bWVudHMiLCJnZXRTdHlsZSIsIm1hcmdpbiIsImJvcmRlciIsIndpZHRoIiwiZ2FwIiwic3BsaXQiLCJyZWR1Y2UiLCJzdGF0ZSIsImEiLCJNYXRoIiwibWF4Iiwic3oiLCJ5IiwicG9zaXRpb25lZExpbmVzIiwibWFwIiwibGluZSIsImkiLCJwcm9wcyIsImhlaWdodCIsInBvc2l0aW9uZWRMaW5lIiwicmlnaHQiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwicmVxdWlyZWQiLCJfc3R5bGUiLCJjb25kaXRpb25zIiwiY29udGV4dCIsInRhYmxlU3R5bGUiLCJyb3dTdHlsZSIsImRpcmVjdFN0eWxlIiwiYmFzZWRPbiIsImVkZ2VzIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJnZXRCb3JkZXIiLCJmb3JFYWNoIiwiZ2V0Iiwic3BhY2luZyIsImJhY2tncm91bmQiLCJzZWxmIiwiaW5oZXJpdGVkU3R5bGUiLCJwYXRoIiwidiIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiaXNGaXJzdFJvdyIsImZ1bmMiLCJpc0xhc3RSb3ciLCJpc0JhbmQxSG9yeiIsImlzQmFuZDJIb3J6IiwiaXNGaXJzdENvbCIsImlzTGFzdENvbCIsImlzQmFuZDFWZXJ0IiwiaXNCYW5kMlZlcnQiLCJpc1NlQ2VsbCIsImlzU3dDZWxsIiwiaXNOZUNlbGwiLCJpc053Q2VsbCIsImlzRmlyc3RSb3dBYnNvbHV0ZSIsImlzTGFzdFJvd0Fic29sdXRlIiwiaXNGaXJzdENvbEFic29sdXRlIiwiaXNMYXN0Q29sQWJzb2x1dGUiLCJDb21wb3NlZENlbGwiLCJjZWxsU2l6ZSIsImNoaWxk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QUwsQ0FBV2YsTUFEbEM7QUFBQSxPQUNBbUIsSUFEQSxpQkFDQUEsSUFEQTtBQUFBLE9BQ0tELEtBREwsaUJBQ0tBLEtBREw7QUFBQSxPQUNXRyxNQURYLGlCQUNXQSxNQURYO0FBQUEsT0FDa0JELEdBRGxCLGlCQUNrQkEsR0FEbEI7QUFBQSxtQkFFb0MsS0FBS0ssT0FGekM7QUFBQSxPQUVTVCxNQUZULGFBRUFxRCxPQUZBLENBRVNyRCxNQUZUO0FBQUEsT0FFNEJmLEtBRjVCLGFBRWtCK0QsUUFGbEIsQ0FFNEIvRCxLQUY1Qjs7QUFHUCxVQUNDO0FBQUE7QUFBQTtBQUNFbUIsUUFBSVgsRUFBSixJQUFVLHdDQUFNLGFBQWFXLElBQUlYLEVBQXZCLEVBQTJCLFFBQVFXLElBQUlrRCxLQUF2QyxFQUE4QyxjQUFZckUsS0FBWixPQUE5QyxHQURaO0FBRUVvQixXQUFPWixFQUFQLElBQWEsd0NBQU0sYUFBYVksT0FBT1osRUFBMUIsRUFBOEIsUUFBUVksT0FBT2lELEtBQTdDLEVBQW9ELFdBQVN0RCxNQUFULFVBQW9CZixLQUFwQixTQUE2QmUsTUFBakYsR0FGZjtBQUdFRSxVQUFNVCxFQUFOLElBQVksd0NBQU0sYUFBYVMsTUFBTVQsRUFBekIsRUFBNkIsUUFBUVMsTUFBTW9ELEtBQTNDLEVBQWtELFNBQU9yRSxLQUFQLFlBQW1CQSxLQUFuQixTQUE0QmUsTUFBOUUsR0FIZDtBQUlFRyxTQUFLVixFQUFMLElBQVcsd0NBQU0sYUFBYVUsS0FBS1YsRUFBeEIsRUFBNEIsUUFBUVUsS0FBS21ELEtBQXpDLEVBQWdELGdCQUFjdEQsTUFBOUQ7QUFKYixJQUREO0FBUUE7Ozs7O0FBaEJJb0QsTSxDQUNFeEIsWSxHQUFhO0FBQ25CeUIsVUFBUyxpQkFBVXhCLE1BREE7QUFFbkJtQixXQUFVLGlCQUFVbkI7QUFGRCxDIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxubGV0IGFzSXNGdW5jPWNvbmQ9PmBpcyR7Y29uZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2NvbmQuc3Vic3RyKDEpfWBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImNlbGxcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8dGQ+e3RoaXMuZ2V0Q29udGVudCgpfTwvdGQ+XHJcblx0fVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpe1xyXG5cdFx0bGV0IHttYXJnaW4sYm9yZGVyLHdpZHRofT10aGlzLmdldFN0eWxlKClcclxuXHRcdGxldCBnYXA9XCJyaWdodCxsZWZ0LHRvcCxib3R0b21cIi5zcGxpdChcIixcIikucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRzdGF0ZVthXT1NYXRoLm1heChtYXJnaW5bYV0sYm9yZGVyW2FdLnN6LzIpXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7fSlcclxuXHRcdGxldCB5PTBcclxuXHRcdGxldCBwb3NpdGlvbmVkTGluZXM9dGhpcy5jb21wdXRlZC5jb21wb3NlZC5tYXAoKGxpbmUsaSk9PntcclxuXHRcdFx0Y29uc3Qge3dpZHRoLGhlaWdodH09bGluZS5wcm9wc1xyXG5cdFx0XHRsZXQgcG9zaXRpb25lZExpbmU9KDxHcm91cCB5PXt5fSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBrZXk9e2l9PntsaW5lfTwvR3JvdXA+KVxyXG5cdFx0XHR5Kz1oZWlnaHRcclxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uZWRMaW5lXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxDb21wb3NlZENlbGwgd2lkdGg9e3dpZHRoK2dhcC5yaWdodCtnYXAubGVmdH0gaGVpZ2h0PXt5K2dhcC50b3ArZ2FwLmJvdHRvbX0+XHJcblx0XHRcdFx0PEJvcmRlciBib3JkZXI9e2JvcmRlcn0vPlxyXG5cdFx0XHRcdDxHcm91cCB4PXtnYXAubGVmdH0geT17Z2FwLnRvcH0+XHJcblx0XHRcdFx0XHR7cG9zaXRpb25lZExpbmVzfVxyXG5cdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdDwvQ29tcG9zZWRDZWxsPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCB7bWFyZ2luLGJvcmRlcix3aWR0aH09dGhpcy5nZXRTdHlsZSgpXHJcblx0XHR3aWR0aD13aWR0aFxyXG5cdFx0XHQtTWF0aC5tYXgobWFyZ2luLnJpZ2h0LGJvcmRlci5yaWdodC5zei8yKVxyXG5cdFx0XHQtTWF0aC5tYXgobWFyZ2luLmxlZnQsYm9yZGVyLmxlZnQuc3ovMilcclxuXHJcblx0XHRyZXR1cm4ge3dpZHRoLGhlaWdodDpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUn1cclxuXHR9XHJcblxyXG5cdGdldFN0eWxlKCl7XHJcblx0XHRpZih0aGlzLl9zdHlsZSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3N0eWxlXHJcblxyXG5cdFx0bGV0IGNvbmRpdGlvbnM9dGhpcy5jb25kaXRpb25zXHJcblxyXG5cdFx0Y29uc3Qge3RhYmxlU3R5bGUsIHJvd1N0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGRpcmVjdFN0eWxlLmJhc2VkT249cm93U3R5bGVcclxuXHRcdHJvd1N0eWxlLmJhc2VkT249dGFibGVTdHlsZVxyXG5cclxuXHJcblx0XHRsZXQgZWRnZXM9XCJsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3dcIi5zcGxpdChcIixcIilcclxuXHRcdFx0LmZpbHRlcihjb25kPT4hY29uZGl0aW9ucy5pbmNsdWRlcyhjb25kKSAmJiB0aGlzLmNvbnRleHRbYXNJc0Z1bmMoY29uZCkrXCJBYnNvbHV0ZVwiXSgpKVxyXG5cclxuXHRcdGxldCBib3JkZXI9ZGlyZWN0U3R5bGUuZ2V0Qm9yZGVyKGNvbmRpdGlvbnMsIGVkZ2VzKVxyXG5cclxuXHRcdGxldCBtYXJnaW49e31cclxuXHRcdFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLmZvckVhY2goYT0+bWFyZ2luW2FdPWRpcmVjdFN0eWxlLmdldChgbWFyZ2luLiR7YX1gKXx8dGFibGVTdHlsZS5nZXQoYHRibFByLnRibENlbGxNYXIuJHthfWApfHwwKVxyXG5cclxuXHRcdGxldCBzcGFjaW5nPXJvd1N0eWxlLmdldChgc3BhY2luZ2ApfHwwXHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQ9ZGlyZWN0U3R5bGUuZ2V0KCd0Y1ByLnNoZCcsY29uZGl0aW9ucylcclxuXHJcblx0XHRsZXQgd2lkdGg9ZGlyZWN0U3R5bGUuZ2V0KCd0Y1ByLnRjVycpXHJcblxyXG5cdFx0bGV0IGhlaWdodD1yb3dTdHlsZS5nZXQoJ3RjSGVpZ2h0JylcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc3R5bGU9e2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nLCBiYWNrZ3JvdW5kLHdpZHRoLGhlaWdodH1cclxuXHR9XHJcblxyXG5cdGdldCBjb25kaXRpb25zKCl7XHJcblx0XHRyZXR1cm4gXCJzZUNlbGwsc3dDZWxsLG5lQ2VsbCxud0NlbGwsbGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93LGJhbmQySG9yeixiYW5kMUhvcnosYmFuZDJWZXJ0LGJhbmQxVmVydFwiXHJcblx0XHRcdC5zcGxpdChcIixcIikuZmlsdGVyKGNvbmQ9PnRoaXMuY29udGV4dFthc0lzRnVuYyhjb25kKV0oKSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0cm93U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQxSG9yejogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQySG9yejogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQxVmVydDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0JhbmQyVmVydDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc1NlQ2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc1N3Q2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc05lQ2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc053Q2VsbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRsZXQgY29uZGl0aW9ucz10aGlzLmNvbmRpdGlvbnNcclxuXHRcdGNvbnN0IHt0YWJsZVN0eWxlLCByb3dTdHlsZSwgaW5oZXJpdGVkU3R5bGV9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2RpcmVjdFN0eWxlfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0XHRpbmhlcml0ZWRTdHlsZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0KHBhdGgpe1xyXG5cdFx0XHRcdFx0XHRkaXJlY3RTdHlsZS5iYXNlZE9uPXJvd1N0eWxlXHJcblx0XHRcdFx0XHRcdHJvd1N0eWxlLmJhc2VkT249dGFibGVTdHlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdj1kaXJlY3RTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodj09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaGVyaXRlZFN0eWxlLmdldChwYXRoLCBjb25kaXRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbXBvc2VkQ2VsbCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0Y2VsbFNpemU6UHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjZWxsU2l6ZToge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0LCBiYWNrZ3JvdW5kLCBjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgey4uLm90aGVyc30+XHJcblx0XHRcdFx0e2JhY2tncm91bmQgJiYgKDxyZWN0IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9e2JhY2tncm91bmR9Lz4pfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9Hcm91cD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEJvcmRlciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvd1NpemU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtsZWZ0LHJpZ2h0LGJvdHRvbSx0b3B9PXRoaXMucHJvcHMuYm9yZGVyXHJcblx0XHRjb25zdCB7cm93U2l6ZTp7aGVpZ2h0fSwgY2VsbFNpemU6e3dpZHRofX09dGhpcy5jb250ZXh0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXA+XHJcblx0XHRcdFx0e3RvcC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17dG9wLnN6fSBzdHJva2U9e3RvcC5jb2xvcn0gZD17YE0wIDAgTCR7d2lkdGh9IDBgfS8+fVxyXG5cdFx0XHRcdHtib3R0b20uc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2JvdHRvbS5zen0gc3Ryb2tlPXtib3R0b20uY29sb3J9IGQ9e2BNMCAke2hlaWdodH0gTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XHJcblx0XHRcdFx0e3JpZ2h0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtyaWdodC5zen0gc3Ryb2tlPXtyaWdodC5jb2xvcn0gZD17YE0ke3dpZHRofSAwIEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHRcdHtsZWZ0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtsZWZ0LnN6fSBzdHJva2U9e2xlZnQuY29sb3J9IGQ9e2BNMCAwIEwwICR7aGVpZ2h0fWB9Lz59XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==