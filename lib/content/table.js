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

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */

var Table = function (_Container) {
	_inherits(Table, _Container);

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
		key: "getChildContext",
		value: function getChildContext() {
			var children = this.computed.children;
			var contentLength = this.getContentCount();
			return Object.assign(_get(Object.getPrototypeOf(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.contentStyle,
				isFirstRow: function isFirstRow() {
					return children.length == 0;
				},
				isLastRow: function isLastRow() {
					return children.length == contentLength - 1;
				}
			});
		}
	}]);

	return Table;
}(_container2.default);

Table.displayName = "table";
Table.childContextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func
}, _container2.default.childContextTypes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCOzs7Ozs7Ozs7OztxQ0FFRCxVQUFTO0FBQzNCLE9BQUksaUJBQWUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsQ0FBdUMsUUFBdkMsQ0FBZixDQUR1QjtBQUUzQixVQUFPLEVBQUMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFFBQVEsZUFBZSxNQUFmLEVBQXpDLENBRjJCOzs7O2lDQUtiLFdBQVU7Z0JBQ0osS0FBSyxLQUFMLENBREk7T0FDakIscUJBRGlCO09BQ1YsbUJBRFU7O0FBRXhCLE9BQUksU0FBTyxDQUFQO09BQVUsT0FBSyxJQUFMLENBRlU7O0FBSXhCLE9BQUksSUFBRSxDQUFGO09BQUssUUFBTSxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLEdBQThCLENBQTlCLENBSlM7QUFLeEIsT0FBSSxlQUFhLFVBQVUsR0FBVixDQUFjLFVBQUMsY0FBRCxFQUFnQixLQUFoQixFQUF3QjtnQ0FDWixlQUFlLEtBQWYsQ0FEWTtRQUNqRCxzQ0FEaUQ7UUFDekMsc0NBRHlDO1FBQ2pDLHdDQURpQztRQUN4Qiw4Q0FEd0I7O0FBRXRELFFBQUksSUFBRSxDQUFGLENBRmtEO0FBR3RELFFBQUksVUFBUSxlQUFlLEdBQWYsQ0FBbUIsZ0JBQU07QUFDbkMsU0FBSSxJQUFFOztRQUFPLEdBQUcsQ0FBSCxFQUFQO01BQWMsSUFBZDtNQUFGLENBRCtCO0FBRW5DLFVBQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZnQztBQUduQyxZQUFPLENBQVAsQ0FIbUM7S0FBTixDQUEzQixDQUhrRDtBQVF0RCxTQUFJLFVBQVEsRUFBUixHQUNGLE9BQU8sR0FBUCxDQUFXLEVBQVgsR0FDQSxPQUFPLEdBQVAsR0FDQSxPQUFPLE1BQVAsR0FDQSxPQUFP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QkFEM0I7T0FDa0MseUJBRGxDO09BQ3dDLDRCQUR4Qzs7T0FDcUQsOEVBRHJEOztrQkFFa0MsS0FBSyxPQUFMLENBRmxDO09BRU8sa0JBQVQsUUFBUyxPQUZQO09BRTBCLGlCQUFWLFNBQVUsTUFGMUI7O0FBR1AsWUFBTyxPQUFQLENBSE87QUFJUCxhQUFRLE9BQVIsQ0FKTztBQUtQLFVBQ0M7O0lBQVcsTUFBWDtJQUNFLElBQUksRUFBSixJQUFVLHdDQUFNLGFBQWEsSUFBSSxFQUFKLEVBQVEsUUFBUSxJQUFJLEtBQUosRUFBVyxjQUFZLFlBQVosRUFBOUMsQ0FBVjtJQUNBLE9BQU8sRUFBUCxJQUFhLHdDQUFNLGFBQWEsT0FBTyxFQUFQLEVBQVcsUUFBUSxPQUFPLEtBQVAsRUFBYyxXQUFTLGdCQUFXLGNBQVMsTUFBN0IsRUFBcEQsQ0FBYjtJQUNBLE1BQU0sRUFBTixJQUFZLHdDQUFNLGFBQWEsTUFBTSxFQUFOLEVBQVUsUUFBUSxNQUFNLEtBQU4sRUFBYSxTQUFPLGlCQUFZLGNBQVMsTUFBNUIsRUFBbEQsQ0FBWjtJQUNBLEtBQUssRUFBTCxJQUFXLHdDQUFNLGFBQWEsS0FBSyxFQUFMLEVBQVMsUUFBUSxLQUFLLEtBQUwsRUFBWSxnQkFBYyxNQUFkLEVBQWhELENBQVg7SUFDRDs7T0FBTyxHQUFHLEtBQUssRUFBTCxFQUFTLEdBQUcsSUFBSSxFQUFKLEVBQXRCO0tBQ0UsUUFERjtLQUxEO0lBREQsQ0FMTzs7OztRQUxIOzs7T0FDRSxlQUFhO0FBQ25CLFVBQVMsaUJBQVUsTUFBVjtBQUNULFdBQVUsaUJBQVUsTUFBViIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IENvbnRhaW5lciBmcm9tIFwiLi9jb250YWluZXJcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbi8qKlxuICpcbiAqXG4gKiAgY29uZGl0aW9uYWwgZm9ybWF0dGluZzogaHR0cDovL29mZmljZW9wZW54bWwuY29tL1dQc3R5bGVUYWJsZVN0eWxlc0NvbmQucGhwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgQ29udGFpbmVye1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG5cblx0YXBwZW5kQ29tcG9zZWQoY29sR3JvdXBzKXtcblx0XHRjb25zdCB7d2lkdGgsIGNvbHN9PXRoaXMucHJvcHNcblx0XHRsZXQgaGVpZ2h0PTAsIHNlbGY9dGhpc1xuXG5cdFx0bGV0IHg9MCwgcm93Tm89dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtMVxuXHRcdGxldCBncm91cHNXaXRoWFk9Y29sR3JvdXBzLm1hcCgobGluZXNXaXRoU3R5bGUsY29sTm8pPT57XG5cdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nLCBiYWNrZ3JvdW5kfT1saW5lc1dpdGhTdHlsZS5zdHlsZVxuXHRcdFx0bGV0IHk9MFxuXHRcdFx0bGV0IGdyb3VwZWQ9bGluZXNXaXRoU3R5bGUubWFwKGxpbmU9Pntcblx0XHRcdFx0XHRsZXQgYT08R3JvdXAgeT17eX0+e2xpbmV9PC9Hcm91cD5cblx0XHRcdFx0XHR5Kz1saW5lLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdH0pXG5cdFx0XHR5Kz0oc3BhY2luZyouNVxuXHRcdFx0XHQrYm9yZGVyLnRvcC5zelxuXHRcdFx0XHQrbWFyZ2luLnRvcFxuXHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxuXHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxuXHRcdFx0XHQrc3BhY2luZyouNSlcblx0XHRcdGxldCBjZWxsPShcblx0XHRcdFx0PENlbGwgaGVpZ2h0PXt5fSB4PXt4fSB3aWR0aD17Y29sc1tjb2xOb119IGJhY2tncm91bmQ9e2JhY2tncm91bmR9PlxuXHRcdFx0XHRcdDxTcGFjaW5nIHg9e3NwYWNpbmcvMn0geT17c3BhY2luZy8yfT5cblx0XHRcdFx0XHRcdDxCb3JkZXIgYm9yZGVyPXtib3JkZXJ9IHNwYWNpbmc9e3NwYWNpbmd9PlxuXHRcdFx0XHRcdFx0XHQ8TWFyZ2luIHg9e21hcmdpbi5sZWZ0fSB5PXttYXJnaW4udG9wfT5cblx0XHRcdFx0XHRcdFx0XHR7Z3JvdXBlZH1cblx0XHRcdFx0XHRcdFx0PC9NYXJnaW4+XG5cdFx0XHRcdFx0XHQ8L0JvcmRlcj5cblx0XHRcdFx0XHQ8L1NwYWNpbmc+XG5cdFx0XHRcdDwvQ2VsbD5cblx0XHRcdCk7XG5cdFx0XHR4Kz1jb2xzW2NvbE5vXVxuXHRcdFx0aGVpZ2h0PU1hdGgubWF4KGhlaWdodCx5KVxuXHRcdFx0cmV0dXJuIGNlbGxcblx0XHR9KVxuXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7d2lkdGgsaGVpZ2h0LGNoaWxkcmVuOmdyb3Vwc1dpdGhYWX0pKVxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPFJvdyB7Li4ucHJvcHN9Lz5cblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmNcblx0fSwgQ29udGFpbmVyLmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuLmxlbmd0aD09Y29udGVudExlbmd0aC0xXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufVxuXG5jbGFzcyBTcGFjaW5nIGV4dGVuZHMgR3JvdXB7fVxuY2xhc3MgTWFyZ2luIGV4dGVuZHMgR3JvdXB7fVxuXG5jbGFzcyBDZWxsIGV4dGVuZHMgR3JvdXB7XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdGNlbGxTaXplOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdGNlbGxTaXplOlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRjZWxsU2l6ZToge1xuXHRcdFx0XHR3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCxoZWlnaHQsIGJhY2tncm91bmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxuXHRcdFx0XHR7YmFja2dyb3VuZCAmJiAoPHJlY3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZmlsbD17YmFja2dyb3VuZH0vPil9XG5cdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cbn1cblxuY2xhc3MgUm93IGV4dGVuZHMgR3JvdXB7XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0cm93U2l6ZTpQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cm93U2l6ZToge1xuXHRcdFx0XHR3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBCb3JkZXIgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvd1NpemU6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0Y2VsbFNpemU6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7c3BhY2luZyxib3JkZXI6e2xlZnQscmlnaHQsYm90dG9tLHRvcH0sIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRsZXQge3Jvd1NpemU6e2hlaWdodH0sIGNlbGxTaXplOnt3aWR0aH19PXRoaXMuY29udGV4dFxuXHRcdHdpZHRoLT1zcGFjaW5nXG5cdFx0aGVpZ2h0LT1zcGFjaW5nXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB7Li4ub3RoZXJzfT5cblx0XHRcdFx0e3RvcC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17dG9wLnN6fSBzdHJva2U9e3RvcC5jb2xvcn0gZD17YE0wIDAgTCR7d2lkdGh9IDBgfS8+fVxuXHRcdFx0XHR7Ym90dG9tLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtib3R0b20uc3p9IHN0cm9rZT17Ym90dG9tLmNvbG9yfSBkPXtgTTAgJHtoZWlnaHR9IEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxuXHRcdFx0XHR7cmlnaHQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3JpZ2h0LnN6fSBzdHJva2U9e3JpZ2h0LmNvbG9yfSBkPXtgTSR7d2lkdGh9IDAgTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XG5cdFx0XHRcdHtsZWZ0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtsZWZ0LnN6fSBzdHJva2U9e2xlZnQuY29sb3J9IGQ9e2BNMCAwIEwwICR7aGVpZ2h0fWB9Lz59XG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0LnN6fSB5PXt0b3Auc3p9PlxuXHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXG5cdH1cbn1cbiJdfQ==