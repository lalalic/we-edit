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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = _any2.default;
/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */

var Table = function (_Super) {
	_inherits(Table, _Super);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	}

	_createClass(Table, [{
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var availableSpace = this.context.parent.nextAvailableSpace(required);
			return { width: this.props.width, height: availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(colGroups) {
			var _props = this.props;
			var width = _props.width;
			var cols = _props.cols;

			var height = 0,
			    self = this;

			var x = 0,
			    rowNo = this.computed.children.length - 1;
			var groupsWithXY = colGroups.map(function (linesWithStyle, colNo) {
				var _linesWithStyle$style = linesWithStyle.style;
				var border = _linesWithStyle$style.border;
				var margin = _linesWithStyle$style.margin;
				var spacing = _linesWithStyle$style.spacing;
				var background = _linesWithStyle$style.background;

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
			var _ref = (this.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {};

			var firstRow = _ref.firstRow;

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

			var _ref2 = (self.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {};

			var firstRow = _ref2.firstRow;
			var lastRow = _ref2.lastRow;
			var noHBand = _ref2.noHBand;

			return Object.assign(_get(Object.getPrototypeOf(Table.prototype), "getChildContext", this).call(this), {
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
Table.childContextTypes = Object.assign({
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
	_inherits(Spacing, _Group);

	function Spacing() {
		_classCallCheck(this, Spacing);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Spacing).apply(this, arguments));
	}

	return Spacing;
}(_group2.default);

var Margin = function (_Group2) {
	_inherits(Margin, _Group2);

	function Margin() {
		_classCallCheck(this, Margin);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Margin).apply(this, arguments));
	}

	return Margin;
}(_group2.default);

var Cell = function (_Group3) {
	_inherits(Cell, _Group3);

	function Cell() {
		_classCallCheck(this, Cell);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).apply(this, arguments));
	}

	_createClass(Cell, [{
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
			var _props2 = this.props;
			var width = _props2.width;
			var height = _props2.height;
			var background = _props2.background;
			var children = _props2.children;

			var others = _objectWithoutProperties(_props2, ["width", "height", "background", "children"]);

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
	_inherits(Row, _Group4);

	function Row() {
		_classCallCheck(this, Row);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
	}

	_createClass(Row, [{
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
	_inherits(Border, _Component);

	function Border() {
		_classCallCheck(this, Border);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Border).apply(this, arguments));
	}

	_createClass(Border, [{
		key: "render",
		value: function render() {
			var _props3 = this.props;
			var spacing = _props3.spacing;
			var _props3$border = _props3.border;
			var left = _props3$border.left;
			var right = _props3$border.right;
			var bottom = _props3$border.bottom;
			var top = _props3$border.top;
			var children = _props3.children;

			var others = _objectWithoutProperties(_props3, ["spacing", "border", "children"]);

			var _context = this.context;
			var height = _context.rowSize.height;
			var width = _context.cellSize.width;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxxQkFBTjs7Ozs7OztJQU1xQjs7Ozs7Ozs7Ozs7cUNBRUQsVUFBUztBQUMzQixPQUFJLGlCQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLENBQXVDLFFBQXZDLENBQWYsQ0FEdUI7QUFFM0IsVUFBTyxFQUFDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFRLGVBQWUsTUFBZixFQUF6QyxDQUYyQjs7OztpQ0FLYixXQUFVO2dCQUNKLEtBQUssS0FBTCxDQURJO09BQ2pCLHFCQURpQjtPQUNWLG1CQURVOztBQUV4QixPQUFJLFNBQU8sQ0FBUDtPQUFVLE9BQUssSUFBTCxDQUZVOztBQUl4QixPQUFJLElBQUUsQ0FBRjtPQUFLLFFBQU0sS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixHQUE4QixDQUE5QixDQUpTO0FBS3hCLE9BQUksZUFBYSxVQUFVLEdBQVYsQ0FBYyxVQUFDLGNBQUQsRUFBZ0IsS0FBaEIsRUFBd0I7Z0NBQ1osZUFBZSxLQUFmLENBRFk7UUFDakQsc0NBRGlEO1FBQ3pDLHNDQUR5QztRQUNqQyx3Q0FEaUM7UUFDeEIsOENBRHdCOztBQUV0RCxRQUFJLElBQUUsQ0FBRixDQUZrRDtBQUd0RCxRQUFJLFVBQVEsZUFBZSxHQUFmLENBQW1CLGdCQUFNO0FBQ25DLFNBQUksSUFBRTs7UUFBTyxHQUFHLENBQUgsRUFBUDtNQUFjLElBQWQ7TUFBRixDQUQrQjtBQUVuQyxVQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FGZ0M7QUFHbkMsWUFBTyxDQUFQLENBSG1DO0tBQU4sQ0FBM0IsQ0FIa0Q7QUFRdEQsU0FBSSxVQUFRLEVBQVIsR0FDRixPQUFPLEdBQVAsQ0FBVyxFQUFYLEdBQ0EsT0FBTyxHQUFQLEdBQ0EsT0FB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OztPQUNFLGVBQWE7QUFDbkIsVUFBUyxpQkFBVSxNQUFWO0FBQ1QsV0FBVSxpQkFBVSxNQUFWIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuY29uc3QgU3VwZXI9QW55XG4vKipcbiAqXG4gKlxuICogIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN1cGVye1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG5cblx0YXBwZW5kQ29tcG9zZWQoY29sR3JvdXBzKXtcblx0XHRjb25zdCB7d2lkdGgsIGNvbHN9PXRoaXMucHJvcHNcblx0XHRsZXQgaGVpZ2h0PTAsIHNlbGY9dGhpc1xuXG5cdFx0bGV0IHg9MCwgcm93Tm89dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtMVxuXHRcdGxldCBncm91cHNXaXRoWFk9Y29sR3JvdXBzLm1hcCgobGluZXNXaXRoU3R5bGUsY29sTm8pPT57XG5cdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nLCBiYWNrZ3JvdW5kfT1saW5lc1dpdGhTdHlsZS5zdHlsZVxuXHRcdFx0bGV0IHk9MFxuXHRcdFx0bGV0IGdyb3VwZWQ9bGluZXNXaXRoU3R5bGUubWFwKGxpbmU9Pntcblx0XHRcdFx0XHRsZXQgYT08R3JvdXAgeT17eX0+e2xpbmV9PC9Hcm91cD5cblx0XHRcdFx0XHR5Kz1saW5lLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdH0pXG5cdFx0XHR5Kz0oc3BhY2luZyouNVxuXHRcdFx0XHQrYm9yZGVyLnRvcC5zelxuXHRcdFx0XHQrbWFyZ2luLnRvcFxuXHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxuXHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxuXHRcdFx0XHQrc3BhY2luZyouNSlcblx0XHRcdGxldCBjZWxsPShcblx0XHRcdFx0PENlbGwgaGVpZ2h0PXt5fSB4PXt4fSB3aWR0aD17Y29sc1tjb2xOb119IGJhY2tncm91bmQ9e2JhY2tncm91bmR9PlxuXHRcdFx0XHRcdDxTcGFjaW5nIHg9e3NwYWNpbmcvMn0geT17c3BhY2luZy8yfT5cblx0XHRcdFx0XHRcdDxCb3JkZXIgYm9yZGVyPXtib3JkZXJ9IHNwYWNpbmc9e3NwYWNpbmd9PlxuXHRcdFx0XHRcdFx0XHQ8TWFyZ2luIHg9e21hcmdpbi5sZWZ0fSB5PXttYXJnaW4udG9wfT5cblx0XHRcdFx0XHRcdFx0XHR7Z3JvdXBlZH1cblx0XHRcdFx0XHRcdFx0PC9NYXJnaW4+XG5cdFx0XHRcdFx0XHQ8L0JvcmRlcj5cblx0XHRcdFx0XHQ8L1NwYWNpbmc+XG5cdFx0XHRcdDwvQ2VsbD5cblx0XHRcdCk7XG5cdFx0XHR4Kz1jb2xzW2NvbE5vXVxuXHRcdFx0aGVpZ2h0PU1hdGgubWF4KGhlaWdodCx5KVxuXHRcdFx0cmV0dXJuIGNlbGxcblx0XHR9KVxuXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7d2lkdGgsaGVpZ2h0LGNoaWxkcmVuOmdyb3Vwc1dpdGhYWX0pKVxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPFJvdyB7Li4ucHJvcHN9Lz5cblx0fVxuXG5cdGdldEhlYWRlclJvd0NvdW50KCl7XG5cdFx0Y29uc3Qge2ZpcnN0Um93fT0odGhpcy5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdGlmKGZpcnN0Um93IT09XCIxXCIpXG5cdFx0XHRyZXR1cm4gMFxuXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKGE9Pntcblx0XHRcdGxldCBzdHlsZT1hLnByb3BzLmRpcmVjdFN0eWxlXG5cdFx0XHRpZihzdHlsZSAmJiBzdHlsZS50YmxIZWFkZXIpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9KS5sZW5ndGhcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3dBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuY1xuXHR9LCBTdXBlci5jaGlsZENvbnRleHRUeXBlcylcblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRsZXQgc2VsZj10aGlzXG5cdFx0Y29uc3Qge2ZpcnN0Um93LCBsYXN0Um93LCBub0hCYW5kfT0oc2VsZi5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGV8fHRoaXMuZGVmYXVsdFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gZmlyc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc0ZpcnN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGxhc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKVxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0aXNMYXN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcblx0XHRcdH0sXG5cblx0XHRcdGlzQmFuZDFIb3J6KCl7XG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MVxuXHRcdFx0fSxcblxuXHRcdFx0aXNCYW5kMkhvcnooKXtcblx0XHRcdFx0cmV0dXJuIG5vSEJhbmQ9PVwiMFwiJiYgIXRoaXMuaXNGaXJzdFJvdygpICYmICF0aGlzLmlzTGFzdFJvdygpICYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlclJvd0NvdW50KCkpJTI9PTBcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbmNsYXNzIFNwYWNpbmcgZXh0ZW5kcyBHcm91cHt9XG5jbGFzcyBNYXJnaW4gZXh0ZW5kcyBHcm91cHt9XG5cbmNsYXNzIENlbGwgZXh0ZW5kcyBHcm91cHtcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0Y2VsbFNpemU6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0Y2VsbFNpemU6UHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNlbGxTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3dpZHRoLGhlaWdodCwgYmFja2dyb3VuZCwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgey4uLm90aGVyc30+XG5cdFx0XHRcdHtiYWNrZ3JvdW5kICYmICg8cmVjdCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPXtiYWNrZ3JvdW5kfS8+KX1cblx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxufVxuXG5jbGFzcyBSb3cgZXh0ZW5kcyBHcm91cHtcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRyb3dTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIEJvcmRlciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzcGFjaW5nLGJvcmRlcjp7bGVmdCxyaWdodCxib3R0b20sdG9wfSwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGxldCB7cm93U2l6ZTp7aGVpZ2h0fSwgY2VsbFNpemU6e3dpZHRofX09dGhpcy5jb250ZXh0XG5cdFx0d2lkdGgtPXNwYWNpbmdcblx0XHRoZWlnaHQtPXNwYWNpbmdcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxuXHRcdFx0XHR7dG9wLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXt0b3Auc3p9IHN0cm9rZT17dG9wLmNvbG9yfSBkPXtgTTAgMCBMJHt3aWR0aH0gMGB9Lz59XG5cdFx0XHRcdHtib3R0b20uc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2JvdHRvbS5zen0gc3Ryb2tlPXtib3R0b20uY29sb3J9IGQ9e2BNMCAke2hlaWdodH0gTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XG5cdFx0XHRcdHtyaWdodC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17cmlnaHQuc3p9IHN0cm9rZT17cmlnaHQuY29sb3J9IGQ9e2BNJHt3aWR0aH0gMCBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cblx0XHRcdFx0e2xlZnQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2xlZnQuc3p9IHN0cm9rZT17bGVmdC5jb2xvcn0gZD17YE0wIDAgTDAgJHtoZWlnaHR9YH0vPn1cblx0XHRcdFx0PEdyb3VwIHg9e2xlZnQuc3p9IHk9e3RvcC5zen0+XG5cdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cblx0fVxufVxuIl19