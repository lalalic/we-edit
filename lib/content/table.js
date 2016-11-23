"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = _any2.default;
/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */

var Table = function (_Super) {
	(0, _inherits3.default)(Table, _Super);

	function Table() {
		(0, _classCallCheck3.default)(this, Table);
		return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
	}

	(0, _createClass3.default)(Table, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var availableSpace = this.context.parent.nextAvailableSpace(required);
			return { width: this.props.width, height: availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(colGroups) {
			var _props = this.props,
			    width = _props.width,
			    cols = _props.tblGrid;

			var height = 0,
			    self = this;

			var x = 0,
			    rowNo = this.computed.children.length - 1;
			var groupsWithXY = colGroups.map(function (linesWithStyle, colNo) {
				var _linesWithStyle$style = linesWithStyle.style,
				    border = _linesWithStyle$style.border,
				    margin = _linesWithStyle$style.margin,
				    spacing = _linesWithStyle$style.spacing,
				    background = _linesWithStyle$style.background;

				var y = 0;
				var grouped = linesWithStyle.map(function (line) {
					var a = _react2.default.createElement(
						_group2.default,
						{ y: y },
						line
					);
					y += line.props.height;
					return a;
				});
				y += spacing * .5 + border.top.sz + margin.top + margin.bottom + border.bottom.sz + spacing * .5;
				var cell = _react2.default.createElement(
					Cell,
					{ height: y, x: x, width: cols[colNo], background: background },
					_react2.default.createElement(
						Spacing,
						{ x: spacing / 2, y: spacing / 2 },
						_react2.default.createElement(
							Border,
							{ border: border, spacing: spacing },
							_react2.default.createElement(
								Margin,
								{ x: margin.left, y: margin.top },
								grouped
							)
						)
					)
				);
				x += cols[colNo];
				height = Math.max(height, y);
				return cell;
			});

			this.context.parent.appendComposed(this.createComposed2Parent({ width: width, height: height, children: groupsWithXY }));
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(Row, props);
		}
	}, {
		key: "getHeaderRowCount",
		value: function getHeaderRowCount() {
			var _ref = (this.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {},
			    firstRow = _ref.firstRow;

			if (firstRow !== "1") return 0;

			return _react2.default.Children.toArray(this.props.children).filter(function (a) {
				var style = a.props.directStyle;
				if (style && style.tblHeader) return true;
				return false;
			}).length;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = (self.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {},
			    firstRow = _ref2.firstRow,
			    lastRow = _ref2.lastRow,
			    noHBand = _ref2.noHBand;

			return (0, _assign2.default)((0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.directStyle || this.defaultStyle,
				isFirstRow: function isFirstRow() {
					return firstRow == "1" && this.isFirstRowAbsolute();
				},
				isFirstRowAbsolute: function isFirstRowAbsolute() {
					return self.computed.children.length == 0;
				},
				isLastRow: function isLastRow() {
					return lastRow == "1" && this.isLastRowAbsolute();
				},
				isLastRowAbsolute: function isLastRowAbsolute() {
					return self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Horz: function isBand1Horz() {
					return noHBand == "0" && !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length - self.getHeaderRowCount()) % 2 == 1;
				},
				isBand2Horz: function isBand2Horz() {
					return noHBand == "0" && !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length - self.getHeaderRowCount()) % 2 == 0;
				}
			});
		}
	}]);
	return Table;
}(Super);

Table.displayName = "table";
Table.childContextTypes = (0, _assign2.default)({
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isFirstRowAbsolute: _react.PropTypes.func,
	isLastRowAbsolute: _react.PropTypes.func,
	isBand1Horz: _react.PropTypes.func,
	isBand2Horz: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = Table;

var Spacing = function (_Group) {
	(0, _inherits3.default)(Spacing, _Group);

	function Spacing() {
		(0, _classCallCheck3.default)(this, Spacing);
		return (0, _possibleConstructorReturn3.default)(this, (Spacing.__proto__ || (0, _getPrototypeOf2.default)(Spacing)).apply(this, arguments));
	}

	return Spacing;
}(_group2.default);

var Margin = function (_Group2) {
	(0, _inherits3.default)(Margin, _Group2);

	function Margin() {
		(0, _classCallCheck3.default)(this, Margin);
		return (0, _possibleConstructorReturn3.default)(this, (Margin.__proto__ || (0, _getPrototypeOf2.default)(Margin)).apply(this, arguments));
	}

	return Margin;
}(_group2.default);

var Cell = function (_Group3) {
	(0, _inherits3.default)(Cell, _Group3);

	function Cell() {
		(0, _classCallCheck3.default)(this, Cell);
		return (0, _possibleConstructorReturn3.default)(this, (Cell.__proto__ || (0, _getPrototypeOf2.default)(Cell)).apply(this, arguments));
	}

	(0, _createClass3.default)(Cell, [{
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
			var _props2 = this.props,
			    width = _props2.width,
			    height = _props2.height,
			    background = _props2.background,
			    children = _props2.children,
			    others = (0, _objectWithoutProperties3.default)(_props2, ["width", "height", "background", "children"]);

			return _react2.default.createElement(
				_group2.default,
				others,
				background && _react2.default.createElement("rect", { width: width, height: height, fill: background }),
				children
			);
		}
	}]);
	return Cell;
}(_group2.default);

Cell.contextTypes = {
	cellSize: _react.PropTypes.object
};
Cell.childContextTypes = {
	cellSize: _react.PropTypes.object
};

var Row = function (_Group4) {
	(0, _inherits3.default)(Row, _Group4);

	function Row() {
		(0, _classCallCheck3.default)(this, Row);
		return (0, _possibleConstructorReturn3.default)(this, (Row.__proto__ || (0, _getPrototypeOf2.default)(Row)).apply(this, arguments));
	}

	(0, _createClass3.default)(Row, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				rowSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}]);
	return Row;
}(_group2.default);

Row.childContextTypes = {
	rowSize: _react.PropTypes.object
};

var Border = function (_Component) {
	(0, _inherits3.default)(Border, _Component);

	function Border() {
		(0, _classCallCheck3.default)(this, Border);
		return (0, _possibleConstructorReturn3.default)(this, (Border.__proto__ || (0, _getPrototypeOf2.default)(Border)).apply(this, arguments));
	}

	(0, _createClass3.default)(Border, [{
		key: "render",
		value: function render() {
			var _props3 = this.props,
			    spacing = _props3.spacing,
			    _props3$border = _props3.border,
			    left = _props3$border.left,
			    right = _props3$border.right,
			    bottom = _props3$border.bottom,
			    top = _props3$border.top,
			    children = _props3.children,
			    others = (0, _objectWithoutProperties3.default)(_props3, ["spacing", "border", "children"]);
			var _context = this.context,
			    height = _context.rowSize.height,
			    width = _context.cellSize.width;

			width -= spacing;
			height -= spacing;
			return _react2.default.createElement(
				_group2.default,
				others,
				top.sz && _react2.default.createElement("path", { strokeWidth: top.sz, stroke: top.color, d: "M0 0 L" + width + " 0" }),
				bottom.sz && _react2.default.createElement("path", { strokeWidth: bottom.sz, stroke: bottom.color, d: "M0 " + height + " L" + width + " " + height }),
				right.sz && _react2.default.createElement("path", { strokeWidth: right.sz, stroke: right.color, d: "M" + width + " 0 L" + width + " " + height }),
				left.sz && _react2.default.createElement("path", { strokeWidth: left.sz, stroke: left.color, d: "M0 0 L0 " + height }),
				_react2.default.createElement(
					_group2.default,
					{ x: left.sz, y: top.sz },
					children
				)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbIlN1cGVyIiwiVGFibGUiLCJyZXF1aXJlZCIsImF2YWlsYWJsZVNwYWNlIiwiY29udGV4dCIsInBhcmVudCIsIm5leHRBdmFpbGFibGVTcGFjZSIsIndpZHRoIiwicHJvcHMiLCJoZWlnaHQiLCJjb2xHcm91cHMiLCJjb2xzIiwidGJsR3JpZCIsInNlbGYiLCJ4Iiwicm93Tm8iLCJjb21wdXRlZCIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZ3JvdXBzV2l0aFhZIiwibWFwIiwibGluZXNXaXRoU3R5bGUiLCJjb2xObyIsInN0eWxlIiwiYm9yZGVyIiwibWFyZ2luIiwic3BhY2luZyIsImJhY2tncm91bmQiLCJ5IiwiZ3JvdXBlZCIsImEiLCJsaW5lIiwidG9wIiwic3oiLCJib3R0b20iLCJjZWxsIiwibGVmdCIsIk1hdGgiLCJtYXgiLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsImRpcmVjdFN0eWxlIiwiZGVmYXVsdFN0eWxlIiwiZ2V0IiwiZmlyc3RSb3ciLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJmaWx0ZXIiLCJ0YmxIZWFkZXIiLCJsYXN0Um93Iiwibm9IQmFuZCIsInRhYmxlU3R5bGUiLCJpc0ZpcnN0Um93IiwiaXNGaXJzdFJvd0Fic29sdXRlIiwiaXNMYXN0Um93IiwiaXNMYXN0Um93QWJzb2x1dGUiLCJnZXRDb250ZW50Q291bnQiLCJpc0JhbmQxSG9yeiIsImdldEhlYWRlclJvd0NvdW50IiwiaXNCYW5kMkhvcnoiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIlNwYWNpbmciLCJNYXJnaW4iLCJDZWxsIiwiY2VsbFNpemUiLCJvdGhlcnMiLCJjb250ZXh0VHlwZXMiLCJSb3ciLCJyb3dTaXplIiwiQm9yZGVyIiwicmlnaHQiLCJjb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUZoQixDQUUwQjVELEtBRjFCOztBQUdQQSxZQUFPbUIsT0FBUDtBQUNBakIsYUFBUWlCLE9BQVI7QUFDQSxVQUNDO0FBQUE7QUFBVzBDLFVBQVg7QUFDRXBDLFFBQUlDLEVBQUosSUFBVSx3Q0FBTSxhQUFhRCxJQUFJQyxFQUF2QixFQUEyQixRQUFRRCxJQUFJMEMsS0FBdkMsRUFBOEMsY0FBWW5FLEtBQVosT0FBOUMsR0FEWjtBQUVFMkIsV0FBT0QsRUFBUCxJQUFhLHdDQUFNLGFBQWFDLE9BQU9ELEVBQTFCLEVBQThCLFFBQVFDLE9BQU93QyxLQUE3QyxFQUFvRCxXQUFTakUsTUFBVCxVQUFvQkYsS0FBcEIsU0FBNkJFLE1BQWpGLEdBRmY7QUFHRWdFLFVBQU14QyxFQUFOLElBQVksd0NBQU0sYUFBYXdDLE1BQU14QyxFQUF6QixFQUE2QixRQUFRd0MsTUFBTUMsS0FBM0MsRUFBa0QsU0FBT25FLEtBQVAsWUFBbUJBLEtBQW5CLFNBQTRCRSxNQUE5RSxHQUhkO0FBSUUyQixTQUFLSCxFQUFMLElBQVcsd0NBQU0sYUFBYUcsS0FBS0gsRUFBeEIsRUFBNEIsUUFBUUcsS0FBS3NDLEtBQXpDLEVBQWdELGdCQUFjakUsTUFBOUQsR0FKYjtBQUtDO0FBQUE7QUFBQSxPQUFPLEdBQUcyQixLQUFLSCxFQUFmLEVBQW1CLEdBQUdELElBQUlDLEVBQTFCO0FBQ0VoQjtBQURGO0FBTEQsSUFERDtBQVlBOzs7OztBQXRCSXVELE0sQ0FDRUgsWSxHQUFhO0FBQ25CRSxVQUFTLGlCQUFVVCxNQURBO0FBRW5CSyxXQUFVLGlCQUFVTDtBQUZELEMiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuXHJcbmNvbnN0IFN1cGVyPUFueVxyXG4vKipcclxuICpcclxuICpcclxuICogIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXHJcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcclxuXHRcdGxldCBhdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQoY29sR3JvdXBzKXtcclxuXHRcdGNvbnN0IHt3aWR0aCwgdGJsR3JpZDpjb2xzfT10aGlzLnByb3BzXHJcblx0XHRsZXQgaGVpZ2h0PTAsIHNlbGY9dGhpc1xyXG5cclxuXHRcdGxldCB4PTAsIHJvd05vPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLTFcclxuXHRcdGxldCBncm91cHNXaXRoWFk9Y29sR3JvdXBzLm1hcCgobGluZXNXaXRoU3R5bGUsY29sTm8pPT57XHJcblx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmcsIGJhY2tncm91bmR9PWxpbmVzV2l0aFN0eWxlLnN0eWxlXHJcblx0XHRcdGxldCB5PTBcclxuXHRcdFx0bGV0IGdyb3VwZWQ9bGluZXNXaXRoU3R5bGUubWFwKGxpbmU9PntcclxuXHRcdFx0XHRcdGxldCBhPTxHcm91cCB5PXt5fT57bGluZX08L0dyb3VwPlxyXG5cdFx0XHRcdFx0eSs9bGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdHJldHVybiBhXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0eSs9KHNwYWNpbmcqLjVcclxuXHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdCttYXJnaW4udG9wXHJcblx0XHRcdFx0K21hcmdpbi5ib3R0b21cclxuXHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxyXG5cdFx0XHRcdCtzcGFjaW5nKi41KVxyXG5cdFx0XHRsZXQgY2VsbD0oXHJcblx0XHRcdFx0PENlbGwgaGVpZ2h0PXt5fSB4PXt4fSB3aWR0aD17Y29sc1tjb2xOb119IGJhY2tncm91bmQ9e2JhY2tncm91bmR9PlxyXG5cdFx0XHRcdFx0PFNwYWNpbmcgeD17c3BhY2luZy8yfSB5PXtzcGFjaW5nLzJ9PlxyXG5cdFx0XHRcdFx0XHQ8Qm9yZGVyIGJvcmRlcj17Ym9yZGVyfSBzcGFjaW5nPXtzcGFjaW5nfT5cclxuXHRcdFx0XHRcdFx0XHQ8TWFyZ2luIHg9e21hcmdpbi5sZWZ0fSB5PXttYXJnaW4udG9wfT5cclxuXHRcdFx0XHRcdFx0XHRcdHtncm91cGVkfVxyXG5cdFx0XHRcdFx0XHRcdDwvTWFyZ2luPlxyXG5cdFx0XHRcdFx0XHQ8L0JvcmRlcj5cclxuXHRcdFx0XHRcdDwvU3BhY2luZz5cclxuXHRcdFx0XHQ8L0NlbGw+XHJcblx0XHRcdCk7XHJcblx0XHRcdHgrPWNvbHNbY29sTm9dXHJcblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcclxuXHRcdFx0cmV0dXJuIGNlbGxcclxuXHRcdH0pXHJcblxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7d2lkdGgsaGVpZ2h0LGNoaWxkcmVuOmdyb3Vwc1dpdGhYWX0pKVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8Um93IHsuLi5wcm9wc30vPlxyXG5cdH1cclxuXHJcblx0Z2V0SGVhZGVyUm93Q291bnQoKXtcclxuXHRcdGNvbnN0IHtmaXJzdFJvd309KHRoaXMucHJvcHMuZGlyZWN0U3R5bGV8fHNlbGYuZGVmYXVsdFN0eWxlKS5nZXQoJ3RibFByLnRibExvb2snKXx8e31cclxuXHRcdGlmKGZpcnN0Um93IT09XCIxXCIpXHJcblx0XHRcdHJldHVybiAwXHJcblxyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKGE9PntcclxuXHRcdFx0bGV0IHN0eWxlPWEucHJvcHMuZGlyZWN0U3R5bGVcclxuXHRcdFx0aWYoc3R5bGUgJiYgc3R5bGUudGJsSGVhZGVyKVxyXG5cdFx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fSkubGVuZ3RoXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFIb3J6OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGxldCBzZWxmPXRoaXNcclxuXHRcdGNvbnN0IHtmaXJzdFJvdywgbGFzdFJvdywgbm9IQmFuZH09KHNlbGYucHJvcHMuZGlyZWN0U3R5bGV8fHNlbGYuZGVmYXVsdFN0eWxlKS5nZXQoJ3RibFByLnRibExvb2snKXx8e31cclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0dGFibGVTdHlsZTogdGhpcy5wcm9wcy5kaXJlY3RTdHlsZXx8dGhpcy5kZWZhdWx0U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RSb3coKXtcclxuXHRcdFx0XHRyZXR1cm4gZmlyc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNGaXJzdFJvd0Fic29sdXRlKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRpc0xhc3RSb3coKXtcclxuXHRcdFx0XHRyZXR1cm4gbGFzdFJvdz09XCIxXCIgJiYgdGhpcy5pc0xhc3RSb3dBYnNvbHV0ZSgpXHJcblx0XHRcdH0sXHJcblx0XHRcdFxyXG5cdFx0XHRpc0xhc3RSb3dBYnNvbHV0ZSgpe1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aD09c2VsZi5nZXRDb250ZW50Q291bnQoKS0xXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRpc0JhbmQxSG9yeigpe1xyXG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0aXNCYW5kMkhvcnooKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9IQmFuZD09XCIwXCImJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MFxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3BhY2luZyBleHRlbmRzIEdyb3Vwe31cclxuY2xhc3MgTWFyZ2luIGV4dGVuZHMgR3JvdXB7fVxyXG5cclxuY2xhc3MgQ2VsbCBleHRlbmRzIEdyb3Vwe1xyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Y2VsbFNpemU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRjZWxsU2l6ZTpQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNlbGxTaXplOiB7XHJcblx0XHRcdFx0d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXHJcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHt3aWR0aCxoZWlnaHQsIGJhY2tncm91bmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxHcm91cCB7Li4ub3RoZXJzfT5cclxuXHRcdFx0XHR7YmFja2dyb3VuZCAmJiAoPHJlY3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZmlsbD17YmFja2dyb3VuZH0vPil9XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L0dyb3VwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFJvdyBleHRlbmRzIEdyb3Vwe1xyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cm93U2l6ZToge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQm9yZGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdGNlbGxTaXplOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3NwYWNpbmcsYm9yZGVyOntsZWZ0LHJpZ2h0LGJvdHRvbSx0b3B9LCBjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3Jvd1NpemU6e2hlaWdodH0sIGNlbGxTaXplOnt3aWR0aH19PXRoaXMuY29udGV4dFxyXG5cdFx0d2lkdGgtPXNwYWNpbmdcclxuXHRcdGhlaWdodC09c3BhY2luZ1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxyXG5cdFx0XHRcdHt0b3Auc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3RvcC5zen0gc3Ryb2tlPXt0b3AuY29sb3J9IGQ9e2BNMCAwIEwke3dpZHRofSAwYH0vPn1cclxuXHRcdFx0XHR7Ym90dG9tLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtib3R0b20uc3p9IHN0cm9rZT17Ym90dG9tLmNvbG9yfSBkPXtgTTAgJHtoZWlnaHR9IEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHRcdHtyaWdodC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17cmlnaHQuc3p9IHN0cm9rZT17cmlnaHQuY29sb3J9IGQ9e2BNJHt3aWR0aH0gMCBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cclxuXHRcdFx0XHR7bGVmdC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17bGVmdC5zen0gc3Ryb2tlPXtsZWZ0LmNvbG9yfSBkPXtgTTAgMCBMMCAke2hlaWdodH1gfS8+fVxyXG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0LnN6fSB5PXt0b3Auc3p9PlxyXG5cdFx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcblxyXG5cdH1cclxufVxyXG4iXX0=