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
			    width = _getStyle.width,
			    background = _getStyle.background;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NlbGwuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJhc0lzRnVuYyIsImNvbmQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsIkNlbGwiLCJnZXRDb250ZW50IiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInB1c2giLCJhcmd1bWVudHMiLCJnZXRTdHlsZSIsIm1hcmdpbiIsImJvcmRlciIsIndpZHRoIiwiYmFja2dyb3VuZCIsImdhcCIsInNwbGl0IiwicmVkdWNlIiwic3RhdGUiLCJhIiwiTWF0aCIsIm1heCIsInN6IiwieSIsInBvc2l0aW9uZWRMaW5lcyIsIm1hcCIsImxpbmUiLCJpIiwicHJvcHMiLCJoZWlnaHQiLCJwb3NpdGlvbmVkTGluZSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyZXF1aXJlZCIsInJpZ2h0IiwiX3N0eWxlIiwiY29uZGl0aW9ucyIsImNvbnRleHQiLCJ0YWJsZVN0eWxlIiwicm93U3R5bGUiLCJkaXJlY3RTdHlsZSIsImJhc2VkT24iLCJlZGdlcyIsImZpbHRlciIsImluY2x1ZGVzIiwiZ2V0Qm9yZGVyIiwiZm9yRWFjaCIsImdldCIsInNwYWNpbmciLCJzZWxmIiwiaW5oZXJpdGVkU3R5bGUiLCJwYXRoIiwidiIsInVuZGVmaW5lZCIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiaXNGaXJzdFJvdyIsImZ1bmMiLCJpc0xhc3RSb3ciLCJpc0JhbmQxSG9yeiIsImlzQmFuZDJIb3J6IiwiaXNGaXJzdENvbCIsImlzTGFzdENvbCIsImlzQmFuZDFWZXJ0IiwiaXNCYW5kMlZlcnQiLCJpc1NlQ2VsbCIsImlzU3dDZWxsIiwiaXNOZUNlbGwiLCJpc053Q2VsbCIsImlzRmlyc3RSb3dBYnNvbHV0ZSIsImlzTGFzdFJvd0Fic29sdXRlIiwiaXNGaXJzdENvbEFic29sdXRlIiwiaXNMYXN0Q29sQWJzb2x1dGUiLCJDb21wb3NlZENlbGwiLCJjZWxsU2l6ZSIsImNoaWxkcmVuIiwib3RoZXJzIiwicm93U2l6ZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiQm9yZGVyIiwiY29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsUUFBTSx5Q0FBVjtBQUNBLElBQUlDLFdBQVMsU0FBVEEsUUFBUztBQUFBLGVBQVdDLEtBQUtDLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLFdBQWYsRUFBWCxHQUEwQ0YsS0FBS0csTUFBTCxDQUFZLENBQVosQ0FBMUM7QUFBQSxDQUFiOztJQUNxQkMsSTs7Ozs7Ozs7OzsyQkFHWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQUssU0FBS0MsVUFBTDtBQUFMLElBQVA7QUFDQTs7O21DQUVlO0FBQUE7O0FBQ2YsOEJBQUtDLFFBQUwsQ0FBY0MsUUFBZCxFQUF1QkMsSUFBdkIsMkJBQStCQyxTQUEvQjtBQUNBOzs7MENBRXNCO0FBQUEsbUJBQ2UsS0FBS0MsUUFBTCxFQURmO0FBQUEsT0FDakJDLE1BRGlCLGFBQ2pCQSxNQURpQjtBQUFBLE9BQ1ZDLE1BRFUsYUFDVkEsTUFEVTtBQUFBLE9BQ0hDLEtBREcsYUFDSEEsS0FERztBQUFBLE9BQ0dDLFVBREgsYUFDR0EsVUFESDs7QUFFdEIsT0FBSUMsTUFBSSx3QkFBd0JDLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DQyxNQUFuQyxDQUEwQyxVQUFDQyxLQUFELEVBQU9DLENBQVAsRUFBVztBQUM1REQsVUFBTUMsQ0FBTixJQUFTQyxLQUFLQyxHQUFMLENBQVNWLE9BQU9RLENBQVAsQ0FBVCxFQUFtQlAsT0FBT08sQ0FBUCxFQUFVRyxFQUFWLEdBQWEsQ0FBaEMsQ0FBVDtBQUNBLFdBQU9KLEtBQVA7QUFDQSxJQUhPLEVBR04sRUFITSxDQUFSO0FBSUEsT0FBSUssSUFBRSxDQUFOO0FBQ0EsT0FBSUMsa0JBQWdCLEtBQUtsQixRQUFMLENBQWNDLFFBQWQsQ0FBdUJrQixHQUF2QixDQUEyQixVQUFDQyxJQUFELEVBQU1DLENBQU4sRUFBVTtBQUFBLHNCQUNuQ0QsS0FBS0UsS0FEOEI7QUFBQSxRQUNqRGYsS0FEaUQsZUFDakRBLEtBRGlEO0FBQUEsUUFDM0NnQixNQUQyQyxlQUMzQ0EsTUFEMkM7O0FBRXhELFFBQUlDLGlCQUFnQjtBQUFBO0FBQUEsT0FBTyxHQUFHUCxDQUFWLEVBQWEsT0FBT1YsS0FBcEIsRUFBMkIsUUFBUWdCLE1BQW5DLEVBQTJDLEtBQUtGLENBQWhEO0FBQW9ERDtBQUFwRCxLQUFwQjtBQUNBSCxTQUFHTSxNQUFIO0FBQ0EsV0FBT0MsY0FBUDtBQUNBLElBTG1CLENBQXBCOztBQU9BLFVBQ0M7QUFBQyxnQkFBRDtBQUFBLE1BQWMsT0FBT2pCLEtBQXJCLEVBQTRCLFFBQVFVLElBQUVSLElBQUlnQixHQUFOLEdBQVVoQixJQUFJaUIsTUFBbEQsRUFBMEQsWUFBWWxCLFVBQXRFO0FBQ0Msa0NBQUMsTUFBRCxJQUFRLFFBQVFGLE1BQWhCLEdBREQ7QUFFQztBQUFBO0FBQUEsT0FBTyxHQUFHRyxJQUFJa0IsSUFBZCxFQUFvQixHQUFHbEIsSUFBSWdCLEdBQTNCO0FBQ0VQO0FBREY7QUFGRCxJQUREO0FBUUE7OztxQ0FFa0JVLFEsRUFBUztBQUFBLG9CQUNELEtBQUt4QixRQUFMLEVBREM7QUFBQSxPQUN0QkMsTUFEc0IsY0FDdEJBLE1BRHNCO0FBQUEsT0FDZkMsTUFEZSxjQUNmQSxNQURlO0FBQUEsT0FDUkMsS0FEUSxjQUNSQSxLQURROztBQUUzQkEsV0FBTUEsUUFDSk8sS0FBS0MsR0FBTCxDQUFTVixPQUFPd0IsS0FBaEIsRUFBc0J2QixPQUFPdUIsS0FBUCxDQUFhYixFQUFiLEdBQWdCLENBQXRDLENBREksR0FFSkYsS0FBS0MsR0FBTCxDQUFTVixPQUFPc0IsSUFBaEIsRUFBcUJyQixPQUFPcUIsSUFBUCxDQUFZWCxFQUFaLEdBQWUsQ0FBcEMsQ0FGRjs7QUFJQSxVQUFPLEVBQUNULFlBQUQsRUFBT2dCLGdDQUFQLEVBQVA7QUFDQTs7OzZCQUVTO0FBQUE7O0FBQ1QsT0FBRyxLQUFLTyxNQUFSLEVBQ0MsT0FBTyxLQUFLQSxNQUFaOztBQUVELE9BQUlDLGFBQVcsS0FBS0EsVUFBcEI7O0FBSlMsa0JBTW9CLEtBQUtDLE9BTnpCO0FBQUEsT0FNRkMsVUFORSxZQU1GQSxVQU5FO0FBQUEsT0FNVUMsUUFOVixZQU1VQSxRQU5WO0FBQUEsT0FPRkMsV0FQRSxHQU9XLEtBQUtiLEtBUGhCLENBT0ZhLFdBUEU7OztBQVNUQSxlQUFZQyxPQUFaLEdBQW9CRixRQUFwQjtBQUNBQSxZQUFTRSxPQUFULEdBQWlCSCxVQUFqQjs7QUFHQSxPQUFJSSxRQUFNLG9DQUFvQzNCLEtBQXBDLENBQTBDLEdBQTFDLEVBQ1I0QixNQURRLENBQ0Q7QUFBQSxXQUFNLENBQUNQLFdBQVdRLFFBQVgsQ0FBb0I3QyxJQUFwQixDQUFELElBQThCLE9BQUtzQyxPQUFMLENBQWF2QyxTQUFTQyxJQUFULElBQWUsVUFBNUIsR0FBcEM7QUFBQSxJQURDLENBQVY7O0FBR0EsT0FBSVksU0FBTzZCLFlBQVlLLFNBQVosQ0FBc0JULFVBQXRCLEVBQWtDTSxLQUFsQyxDQUFYOztBQUVBLE9BQUloQyxTQUFPLEVBQVg7QUFDQSwyQkFBd0JLLEtBQXhCLENBQThCLEdBQTlCLEVBQW1DK0IsT0FBbkMsQ0FBMkM7QUFBQSxXQUFHcEMsT0FBT1EsQ0FBUCxJQUFVc0IsWUFBWU8sR0FBWixhQUEwQjdCLENBQTFCLEtBQWdDb0IsV0FBV1MsR0FBWCx1QkFBbUM3QixDQUFuQyxDQUFoQyxJQUF5RSxDQUF0RjtBQUFBLElBQTNDOztBQUVBLE9BQUk4QixVQUFRVCxTQUFTUSxHQUFULGVBQXlCLENBQXJDOztBQUVBLE9BQUlsQyxhQUFXMkIsWUFBWU8sR0FBWixDQUFnQixVQUFoQixFQUEyQlgsVUFBM0IsQ0FBZjs7QUFFQSxPQUFJeEIsUUFBTTRCLFlBQVlPLEdBQVosQ0FBZ0IsVUFBaEIsQ0FBVjs7QUFFQSxPQUFJbkIsU0FBT1csU0FBU1EsR0FBVCxDQUFhLFVBQWIsQ0FBWDs7QUFFQSxVQUFPLEtBQUtaLE1BQUwsR0FBWSxFQUFDeEIsY0FBRCxFQUFTRCxjQUFULEVBQWlCc0MsZ0JBQWpCLEVBQTBCbkMsc0JBQTFCLEVBQXFDRCxZQUFyQyxFQUEyQ2dCLGNBQTNDLEVBQW5CO0FBQ0E7OztvQ0E0QmdCO0FBQ2hCLE9BQUlxQixPQUFLLElBQVQ7QUFDQSxPQUFJYixhQUFXLEtBQUtBLFVBQXBCO0FBRmdCLG1CQUc2QixLQUFLQyxPQUhsQztBQUFBLE9BR1RDLFVBSFMsYUFHVEEsVUFIUztBQUFBLE9BR0dDLFFBSEgsYUFHR0EsUUFISDtBQUFBLE9BR2FXLGNBSGIsYUFHYUEsY0FIYjtBQUFBLE9BSVRWLFdBSlMsR0FJSSxLQUFLYixLQUpULENBSVRhLFdBSlM7O0FBS1YsVUFBTyx5SkFBdUM7QUFDbERVLG9CQUFlO0FBQ0NILFFBREQsZUFDS0ksSUFETCxFQUNVO0FBQ3ZCWCxrQkFBWUMsT0FBWixHQUFvQkYsUUFBcEI7QUFDQUEsZUFBU0UsT0FBVCxHQUFpQkgsVUFBakI7QUFDa0IsVUFBSWMsSUFBRVosWUFBWU8sR0FBWixDQUFnQkksSUFBaEIsRUFBc0JmLFVBQXRCLENBQU47QUFDQSxVQUFHZ0IsS0FBR0MsU0FBTixFQUNJLE9BQU9ILGVBQWVILEdBQWYsQ0FBbUJJLElBQW5CLEVBQXlCZixVQUF6QixDQUFQO0FBQ0osYUFBT2dCLENBQVA7QUFDSDtBQVJGO0FBRG1DLElBQXZDLENBQVA7QUFZTjs7O3NCQTNDZTtBQUFBOztBQUNmLFVBQU8sd0dBQ0xyQyxLQURLLENBQ0MsR0FERCxFQUNNNEIsTUFETixDQUNhO0FBQUEsV0FBTSxPQUFLTixPQUFMLENBQWF2QyxTQUFTQyxJQUFULENBQWIsR0FBTjtBQUFBLElBRGIsQ0FBUDtBQUVBOzs7RUEvRWdDRixLOztBQUFiTSxJLENBQ2JtRCxXLEdBQVksTTtBQURDbkQsSSxDQWlGYm9ELFksR0FBYSxzQkFBYztBQUNqQ2pCLGFBQVksaUJBQVVrQixNQURXO0FBRWpDakIsV0FBVSxpQkFBVWlCLE1BRmE7QUFHakNDLGFBQVksaUJBQVVDLElBSFc7QUFJakNDLFlBQVcsaUJBQVVELElBSlk7QUFLakNFLGNBQWEsaUJBQVVGLElBTFU7QUFNakNHLGNBQWEsaUJBQVVILElBTlU7QUFPakNJLGFBQVksaUJBQVVKLElBUFc7QUFRakNLLFlBQVcsaUJBQVVMLElBUlk7QUFTakNNLGNBQWEsaUJBQVVOLElBVFU7QUFVakNPLGNBQWEsaUJBQVVQLElBVlU7QUFXakNRLFdBQVUsaUJBQVVSLElBWGE7QUFZakNTLFdBQVUsaUJBQVVULElBWmE7QUFhakNVLFdBQVUsaUJBQVVWLElBYmE7QUFjakNXLFdBQVUsaUJBQVVYLElBZGE7QUFlakNZLHFCQUFvQixpQkFBVVosSUFmRztBQWdCakNhLG9CQUFtQixpQkFBVWIsSUFoQkk7QUFpQmpDYyxxQkFBb0IsaUJBQVVkLElBakJHO0FBa0JqQ2Usb0JBQW1CLGlCQUFVZjtBQWxCSSxDQUFkLEVBbUJqQjdELE1BQU0wRCxZQW5CVyxDO2tCQWpGQXBELEk7O0lBMEhmdUUsWTs7Ozs7Ozs7OztvQ0FRWTtBQUNoQixVQUFPO0FBQ05DLGNBQVU7QUFDVC9ELFlBQU8sS0FBS2UsS0FBTCxDQUFXZixLQURUO0FBRVRnQixhQUFRLEtBQUtELEtBQUwsQ0FBV0M7QUFGVjtBQURKLElBQVA7QUFNQTs7OzJCQUVPO0FBQUEsZ0JBQytDLEtBQUtELEtBRHBEO0FBQUEsT0FDQWYsS0FEQSxVQUNBQSxLQURBO0FBQUEsT0FDTWdCLE1BRE4sVUFDTUEsTUFETjtBQUFBLE9BQ2NmLFVBRGQsVUFDY0EsVUFEZDtBQUFBLE9BQzBCK0QsUUFEMUIsVUFDMEJBLFFBRDFCO0FBQUEsT0FDdUNDLE1BRHZDO0FBQUEsT0FFQUMsT0FGQSxHQUVTLEtBQUt6QyxPQUZkLENBRUF5QyxPQUZBOztBQUdQLFVBQ0M7QUFBQTtBQUFXRCxVQUFYO0FBQ0VoRSxpQkFBYyx3Q0FBTSxPQUFPRCxLQUFiLEVBQW9CLFFBQVFrRSxRQUFRbEQsTUFBcEMsRUFBNEMsTUFBTWYsVUFBbEQsR0FBZCxHQUFpRixJQURuRjtBQUVFK0Q7QUFGRixJQUREO0FBTUE7Ozs7O0FBMUJJRixZLENBQ0VuQixZLEdBQWE7QUFDbkJ1QixVQUFTLGlCQUFVdEI7QUFEQSxDO0FBRGZrQixZLENBSUVLLGlCLEdBQWtCO0FBQ3hCSixXQUFTLGlCQUFVbkI7QUFESyxDOztJQXlCcEJ3QixNOzs7Ozs7Ozs7OzJCQUtHO0FBQUEsdUJBQ3VCLEtBQUtyRCxLQUFMLENBQVdoQixNQURsQztBQUFBLE9BQ0FxQixJQURBLGlCQUNBQSxJQURBO0FBQUEsT0FDS0UsS0FETCxpQkFDS0EsS0FETDtBQUFBLE9BQ1dILE1BRFgsaUJBQ1dBLE1BRFg7QUFBQSxPQUNrQkQsR0FEbEIsaUJBQ2tCQSxHQURsQjtBQUFBLG1CQUVvQyxLQUFLTyxPQUZ6QztBQUFBLE9BRVNULE1BRlQsYUFFQWtELE9BRkEsQ0FFU2xELE1BRlQ7QUFBQSxPQUU0QmhCLEtBRjVCLGFBRWtCK0QsUUFGbEIsQ0FFNEIvRCxLQUY1Qjs7QUFHUCxVQUNDO0FBQUE7QUFBQTtBQUNFa0IsUUFBSVQsRUFBSixJQUFVLHdDQUFNLGFBQWFTLElBQUlULEVBQXZCLEVBQTJCLFFBQVFTLElBQUltRCxLQUF2QyxFQUE4QyxjQUFZckUsS0FBWixPQUE5QyxHQURaO0FBRUVtQixXQUFPVixFQUFQLElBQWEsd0NBQU0sYUFBYVUsT0FBT1YsRUFBMUIsRUFBOEIsUUFBUVUsT0FBT2tELEtBQTdDLEVBQW9ELFdBQVNyRCxNQUFULFVBQW9CaEIsS0FBcEIsU0FBNkJnQixNQUFqRixHQUZmO0FBR0VNLFVBQU1iLEVBQU4sSUFBWSx3Q0FBTSxhQUFhYSxNQUFNYixFQUF6QixFQUE2QixRQUFRYSxNQUFNK0MsS0FBM0MsRUFBa0QsU0FBT3JFLEtBQVAsWUFBbUJBLEtBQW5CLFNBQTRCZ0IsTUFBOUUsR0FIZDtBQUlFSSxTQUFLWCxFQUFMLElBQVcsd0NBQU0sYUFBYVcsS0FBS1gsRUFBeEIsRUFBNEIsUUFBUVcsS0FBS2lELEtBQXpDLEVBQWdELGdCQUFjckQsTUFBOUQ7QUFKYixJQUREO0FBUUE7Ozs7O0FBaEJJb0QsTSxDQUNFekIsWSxHQUFhO0FBQ25CdUIsVUFBUyxpQkFBVXRCLE1BREE7QUFFbkJtQixXQUFVLGlCQUFVbkI7QUFGRCxDIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxubGV0IGFzSXNGdW5jPWNvbmQ9PmBpcyR7Y29uZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2NvbmQuc3Vic3RyKDEpfWBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cImNlbGxcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8dGQ+e3RoaXMuZ2V0Q29udGVudCgpfTwvdGQ+XHJcblx0fVxyXG5cclxuXHRhcHBlbmRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpe1xyXG5cdFx0bGV0IHttYXJnaW4sYm9yZGVyLHdpZHRoLGJhY2tncm91bmR9PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0bGV0IGdhcD1cInJpZ2h0LGxlZnQsdG9wLGJvdHRvbVwiLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHN0YXRlLGEpPT57XHJcblx0XHRcdHN0YXRlW2FdPU1hdGgubWF4KG1hcmdpblthXSxib3JkZXJbYV0uc3ovMilcclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt9KVxyXG5cdFx0bGV0IHk9MFxyXG5cdFx0bGV0IHBvc2l0aW9uZWRMaW5lcz10aGlzLmNvbXB1dGVkLmNvbXBvc2VkLm1hcCgobGluZSxpKT0+e1xyXG5cdFx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0fT1saW5lLnByb3BzXHJcblx0XHRcdGxldCBwb3NpdGlvbmVkTGluZT0oPEdyb3VwIHk9e3l9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGtleT17aX0+e2xpbmV9PC9Hcm91cD4pXHJcblx0XHRcdHkrPWhlaWdodFxyXG5cdFx0XHRyZXR1cm4gcG9zaXRpb25lZExpbmVcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PENvbXBvc2VkQ2VsbCB3aWR0aD17d2lkdGh9IGhlaWdodD17eStnYXAudG9wK2dhcC5ib3R0b219IGJhY2tncm91bmQ9e2JhY2tncm91bmR9PlxyXG5cdFx0XHRcdDxCb3JkZXIgYm9yZGVyPXtib3JkZXJ9Lz5cclxuXHRcdFx0XHQ8R3JvdXAgeD17Z2FwLmxlZnR9IHk9e2dhcC50b3B9PlxyXG5cdFx0XHRcdFx0e3Bvc2l0aW9uZWRMaW5lc31cclxuXHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHQ8L0NvbXBvc2VkQ2VsbD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XHJcblx0XHRsZXQge21hcmdpbixib3JkZXIsd2lkdGh9PXRoaXMuZ2V0U3R5bGUoKVxyXG5cdFx0d2lkdGg9d2lkdGhcclxuXHRcdFx0LU1hdGgubWF4KG1hcmdpbi5yaWdodCxib3JkZXIucmlnaHQuc3ovMilcclxuXHRcdFx0LU1hdGgubWF4KG1hcmdpbi5sZWZ0LGJvcmRlci5sZWZ0LnN6LzIpXHJcblxyXG5cdFx0cmV0dXJuIHt3aWR0aCxoZWlnaHQ6TnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJ9XHJcblx0fVxyXG5cclxuXHRnZXRTdHlsZSgpe1xyXG5cdFx0aWYodGhpcy5fc3R5bGUpXHJcblx0XHRcdHJldHVybiB0aGlzLl9zdHlsZVxyXG5cclxuXHRcdGxldCBjb25kaXRpb25zPXRoaXMuY29uZGl0aW9uc1xyXG5cclxuXHRcdGNvbnN0IHt0YWJsZVN0eWxlLCByb3dTdHlsZX09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7ZGlyZWN0U3R5bGV9PXRoaXMucHJvcHNcclxuXHJcblx0XHRkaXJlY3RTdHlsZS5iYXNlZE9uPXJvd1N0eWxlXHJcblx0XHRyb3dTdHlsZS5iYXNlZE9uPXRhYmxlU3R5bGVcclxuXHJcblxyXG5cdFx0bGV0IGVkZ2VzPVwibGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdC5maWx0ZXIoY29uZD0+IWNvbmRpdGlvbnMuaW5jbHVkZXMoY29uZCkgJiYgdGhpcy5jb250ZXh0W2FzSXNGdW5jKGNvbmQpK1wiQWJzb2x1dGVcIl0oKSlcclxuXHJcblx0XHRsZXQgYm9yZGVyPWRpcmVjdFN0eWxlLmdldEJvcmRlcihjb25kaXRpb25zLCBlZGdlcylcclxuXHJcblx0XHRsZXQgbWFyZ2luPXt9XHJcblx0XHRcImxlZnQscmlnaHQsdG9wLGJvdHRvbVwiLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGE9Pm1hcmdpblthXT1kaXJlY3RTdHlsZS5nZXQoYG1hcmdpbi4ke2F9YCl8fHRhYmxlU3R5bGUuZ2V0KGB0YmxQci50YmxDZWxsTWFyLiR7YX1gKXx8MClcclxuXHJcblx0XHRsZXQgc3BhY2luZz1yb3dTdHlsZS5nZXQoYHNwYWNpbmdgKXx8MFxyXG5cclxuXHRcdGxldCBiYWNrZ3JvdW5kPWRpcmVjdFN0eWxlLmdldCgndGNQci5zaGQnLGNvbmRpdGlvbnMpXHJcblxyXG5cdFx0bGV0IHdpZHRoPWRpcmVjdFN0eWxlLmdldCgndGNQci50Y1cnKVxyXG5cclxuXHRcdGxldCBoZWlnaHQ9cm93U3R5bGUuZ2V0KCd0Y0hlaWdodCcpXHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3N0eWxlPXtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZCx3aWR0aCxoZWlnaHR9XHJcblx0fVxyXG5cclxuXHRnZXQgY29uZGl0aW9ucygpe1xyXG5cdFx0cmV0dXJuIFwic2VDZWxsLHN3Q2VsbCxuZUNlbGwsbndDZWxsLGxhc3RDb2wsZmlyc3RDb2wsbGFzdFJvdyxmaXJzdFJvdyxiYW5kMkhvcnosYmFuZDFIb3J6LGJhbmQyVmVydCxiYW5kMVZlcnRcIlxyXG5cdFx0XHQuc3BsaXQoXCIsXCIpLmZpbHRlcihjb25kPT50aGlzLmNvbnRleHRbYXNJc0Z1bmMoY29uZCldKCkpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMkhvcno6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMVZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMlZlcnQ6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNTd0NlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNOd0NlbGw6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzRmlyc3RDb2xBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2xBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0bGV0IGNvbmRpdGlvbnM9dGhpcy5jb25kaXRpb25zXHJcblx0XHRjb25zdCB7dGFibGVTdHlsZSwgcm93U3R5bGUsIGluaGVyaXRlZFN0eWxlfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtkaXJlY3RTdHlsZX09dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKCBzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdFx0aW5oZXJpdGVkU3R5bGU6e1xyXG4gICAgICAgICAgICAgICAgICAgIGdldChwYXRoKXtcclxuXHRcdFx0XHRcdFx0ZGlyZWN0U3R5bGUuYmFzZWRPbj1yb3dTdHlsZVxyXG5cdFx0XHRcdFx0XHRyb3dTdHlsZS5iYXNlZE9uPXRhYmxlU3R5bGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHY9ZGlyZWN0U3R5bGUuZ2V0KHBhdGgsIGNvbmRpdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHY9PXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmhlcml0ZWRTdHlsZS5nZXQocGF0aCwgY29uZGl0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb21wb3NlZENlbGwgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3dTaXplOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRjZWxsU2l6ZTpQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNlbGxTaXplOiB7XHJcblx0XHRcdFx0d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXHJcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt3aWR0aCxoZWlnaHQsIGJhY2tncm91bmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtyb3dTaXplfT10aGlzLmNvbnRleHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCB7Li4ub3RoZXJzfT5cclxuXHRcdFx0XHR7YmFja2dyb3VuZCA/ICg8cmVjdCB3aWR0aD17d2lkdGh9IGhlaWdodD17cm93U2l6ZS5oZWlnaHR9IGZpbGw9e2JhY2tncm91bmR9Lz4pIDogbnVsbH1cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3dTaXplOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0Y2VsbFNpemU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bGVmdCxyaWdodCxib3R0b20sdG9wfT10aGlzLnByb3BzLmJvcmRlclxyXG5cdFx0Y29uc3Qge3Jvd1NpemU6e2hlaWdodH0sIGNlbGxTaXplOnt3aWR0aH19PXRoaXMuY29udGV4dFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwPlxyXG5cdFx0XHRcdHt0b3Auc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3RvcC5zen0gc3Ryb2tlPXt0b3AuY29sb3J9IGQ9e2BNMCAwIEwke3dpZHRofSAwYH0vPn1cclxuXHRcdFx0XHR7Ym90dG9tLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtib3R0b20uc3p9IHN0cm9rZT17Ym90dG9tLmNvbG9yfSBkPXtgTTAgJHtoZWlnaHR9IEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHRcdHtyaWdodC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17cmlnaHQuc3p9IHN0cm9rZT17cmlnaHQuY29sb3J9IGQ9e2BNJHt3aWR0aH0gMCBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cclxuXHRcdFx0XHR7bGVmdC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17bGVmdC5zen0gc3Ryb2tlPXtsZWZ0LmNvbG9yfSBkPXtgTTAgMCBMMCAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG4iXX0=