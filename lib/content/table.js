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
			    rowNo = this.children.length - 1;
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
			var children = this.children;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBT3FCOzs7Ozs7Ozs7OztxQ0FFRCxVQUFTO0FBQzNCLE9BQUksaUJBQWUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsQ0FBdUMsUUFBdkMsQ0FBZixDQUR1QjtBQUUzQixVQUFPLEVBQUMsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFFBQVEsZUFBZSxNQUFmLEVBQXpDLENBRjJCOzs7O2lDQUtiLFdBQVU7Z0JBQ0osS0FBSyxLQUFMLENBREk7T0FDakIscUJBRGlCO09BQ1YsbUJBRFU7O0FBRXhCLE9BQUksU0FBTyxDQUFQO09BQVUsT0FBSyxJQUFMLENBRlU7O0FBSXhCLE9BQUksSUFBRSxDQUFGO09BQUssUUFBTSxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLENBQXJCLENBSlM7QUFLeEIsT0FBSSxlQUFhLFVBQVUsR0FBVixDQUFjLFVBQUMsY0FBRCxFQUFnQixLQUFoQixFQUF3QjtnQ0FDWixlQUFlLEtBQWYsQ0FEWTtRQUNqRCxzQ0FEaUQ7UUFDekMsc0NBRHlDO1FBQ2pDLHdDQURpQztRQUN4Qiw4Q0FEd0I7O0FBRXRELFFBQUksSUFBRSxDQUFGLENBRmtEO0FBR3RELFFBQUksVUFBUSxlQUFlLEdBQWYsQ0FBbUIsZ0JBQU07QUFDbkMsU0FBSSxJQUFFOztRQUFPLEdBQUcsQ0FBSCxFQUFQO01BQWMsSUFBZDtNQUFGLENBRCtCO0FBRW5DLFVBQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUZnQztBQUduQyxZQUFPLENBQVAsQ0FIbUM7S0FBTixDQUEzQixDQUhrRDtBQVF0RCxTQUFJLFVBQVEsRUFBUixHQUNGLE9BQU8sR0FBUCxDQUFXLEVBQVgsR0FDQSxPQUFPLEdBQVAsR0FDQSxPQUFPLE1BQVAsR0FDQSxPQUFPLE1BQVAsQ0FBYyxF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d0MsNEJBRHhDOztPQUNxRCw4RUFEckQ7O2tCQUVrQyxLQUFLLE9BQUwsQ0FGbEM7T0FFTyxrQkFBVCxRQUFTLE9BRlA7T0FFMEIsaUJBQVYsU0FBVSxNQUYxQjs7QUFHUCxZQUFPLE9BQVAsQ0FITztBQUlQLGFBQVEsT0FBUixDQUpPO0FBS1AsVUFDQzs7SUFBVyxNQUFYO0lBQ0UsSUFBSSxFQUFKLElBQVUsd0NBQU0sYUFBYSxJQUFJLEVBQUosRUFBUSxRQUFRLElBQUksS0FBSixFQUFXLGNBQVksWUFBWixFQUE5QyxDQUFWO0lBQ0EsT0FBTyxFQUFQLElBQWEsd0NBQU0sYUFBYSxPQUFPLEVBQVAsRUFBVyxRQUFRLE9BQU8sS0FBUCxFQUFjLFdBQVMsZ0JBQVcsY0FBUyxNQUE3QixFQUFwRCxDQUFiO0lBQ0EsTUFBTSxFQUFOLElBQVksd0NBQU0sYUFBYSxNQUFNLEVBQU4sRUFBVSxRQUFRLE1BQU0sS0FBTixFQUFhLFNBQU8saUJBQVksY0FBUyxNQUE1QixFQUFsRCxDQUFaO0lBQ0EsS0FBSyxFQUFMLElBQVcsd0NBQU0sYUFBYSxLQUFLLEVBQUwsRUFBUyxRQUFRLEtBQUssS0FBTCxFQUFZLGdCQUFjLE1BQWQsRUFBaEQsQ0FBWDtJQUNEOztPQUFPLEdBQUcsS0FBSyxFQUFMLEVBQVMsR0FBRyxJQUFJLEVBQUosRUFBdEI7S0FDRSxRQURGO0tBTEQ7SUFERCxDQUxPOzs7O1FBTEg7OztPQUNFLGVBQWE7QUFDbkIsVUFBUyxpQkFBVSxNQUFWO0FBQ1QsV0FBVSxpQkFBVSxNQUFWIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gXCIuL2NvbnRhaW5lclwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuLyoqXG4gKiAgXG4gKiAgXG4gKiAgY29uZGl0aW9uYWwgZm9ybWF0dGluZzogaHR0cDovL29mZmljZW9wZW54bWwuY29tL1dQc3R5bGVUYWJsZVN0eWxlc0NvbmQucGhwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgQ29udGFpbmVye1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG5cdFxuXHRhcHBlbmRDb21wb3NlZChjb2xHcm91cHMpe1xuXHRcdGNvbnN0IHt3aWR0aCwgY29sc309dGhpcy5wcm9wc1xuXHRcdGxldCBoZWlnaHQ9MCwgc2VsZj10aGlzXG5cdFx0XG5cdFx0bGV0IHg9MCwgcm93Tm89dGhpcy5jaGlsZHJlbi5sZW5ndGgtMVxuXHRcdGxldCBncm91cHNXaXRoWFk9Y29sR3JvdXBzLm1hcCgobGluZXNXaXRoU3R5bGUsY29sTm8pPT57XG5cdFx0XHRsZXQge2JvcmRlciwgbWFyZ2luLCBzcGFjaW5nLCBiYWNrZ3JvdW5kfT1saW5lc1dpdGhTdHlsZS5zdHlsZVxuXHRcdFx0bGV0IHk9MFxuXHRcdFx0bGV0IGdyb3VwZWQ9bGluZXNXaXRoU3R5bGUubWFwKGxpbmU9Pntcblx0XHRcdFx0XHRsZXQgYT08R3JvdXAgeT17eX0+e2xpbmV9PC9Hcm91cD5cblx0XHRcdFx0XHR5Kz1saW5lLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdHJldHVybiBhXG5cdFx0XHRcdH0pXG5cdFx0XHR5Kz0oc3BhY2luZyouNVxuXHRcdFx0XHQrYm9yZGVyLnRvcC5zelxuXHRcdFx0XHQrbWFyZ2luLnRvcFxuXHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxuXHRcdFx0XHQrYm9yZGVyLmJvdHRvbS5zelxuXHRcdFx0XHQrc3BhY2luZyouNSlcblx0XHRcdGxldCBjZWxsPShcblx0XHRcdFx0PENlbGwgaGVpZ2h0PXt5fSB4PXt4fSB3aWR0aD17Y29sc1tjb2xOb119IGJhY2tncm91bmQ9e2JhY2tncm91bmR9PlxuXHRcdFx0XHRcdDxTcGFjaW5nIHg9e3NwYWNpbmcvMn0geT17c3BhY2luZy8yfT5cblx0XHRcdFx0XHRcdDxCb3JkZXIgYm9yZGVyPXtib3JkZXJ9IHNwYWNpbmc9e3NwYWNpbmd9PlxuXHRcdFx0XHRcdFx0XHQ8TWFyZ2luIHg9e21hcmdpbi5sZWZ0fSB5PXttYXJnaW4udG9wfT5cblx0XHRcdFx0XHRcdFx0XHR7Z3JvdXBlZH1cblx0XHRcdFx0XHRcdFx0PC9NYXJnaW4+XG5cdFx0XHRcdFx0XHQ8L0JvcmRlcj5cblx0XHRcdFx0XHQ8L1NwYWNpbmc+XG5cdFx0XHRcdDwvQ2VsbD5cdFxuXHRcdFx0KTtcblx0XHRcdHgrPWNvbHNbY29sTm9dXG5cdFx0XHRoZWlnaHQ9TWF0aC5tYXgoaGVpZ2h0LHkpXG5cdFx0XHRyZXR1cm4gY2VsbFxuXHRcdH0pXG5cdFx0XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7d2lkdGgsaGVpZ2h0LGNoaWxkcmVuOmdyb3Vwc1dpdGhYWX0pKVxuXHR9XG5cdFxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHJldHVybiA8Um93IHsuLi5wcm9wc30vPlxuXHR9XG5cdFxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jXG5cdH0sIENvbnRhaW5lci5jaGlsZENvbnRleHRUeXBlcylcblx0XG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNoaWxkcmVuXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuY29udGVudFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuLmxlbmd0aD09Y29udGVudExlbmd0aC0xXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufVxuXG5jbGFzcyBTcGFjaW5nIGV4dGVuZHMgR3JvdXB7fVxuY2xhc3MgTWFyZ2luIGV4dGVuZHMgR3JvdXB7fVxuXG5jbGFzcyBDZWxsIGV4dGVuZHMgR3JvdXB7XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdGNlbGxTaXplOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0Y2VsbFNpemU6UHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdFxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2VsbFNpemU6IHtcblx0XHRcdFx0d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHt3aWR0aCxoZWlnaHQsIGJhY2tncm91bmQsIGNoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxuXHRcdFx0XHR7YmFja2dyb3VuZCAmJiAoPHJlY3Qgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZmlsbD17YmFja2dyb3VuZH0vPil9XG5cdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG5cdFxufVxuXG5jbGFzcyBSb3cgZXh0ZW5kcyBHcm91cHtcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJvd1NpemU6IHtcblx0XHRcdFx0d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgQm9yZGVyIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3dTaXplOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGNlbGxTaXplOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3NwYWNpbmcsYm9yZGVyOntsZWZ0LHJpZ2h0LGJvdHRvbSx0b3B9LCBjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0bGV0IHtyb3dTaXplOntoZWlnaHR9LCBjZWxsU2l6ZTp7d2lkdGh9fT10aGlzLmNvbnRleHRcblx0XHR3aWR0aC09c3BhY2luZ1xuXHRcdGhlaWdodC09c3BhY2luZ1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgey4uLm90aGVyc30+XHRcblx0XHRcdFx0e3RvcC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17dG9wLnN6fSBzdHJva2U9e3RvcC5jb2xvcn0gZD17YE0wIDAgTCR7d2lkdGh9IDBgfS8+fVxuXHRcdFx0XHR7Ym90dG9tLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtib3R0b20uc3p9IHN0cm9rZT17Ym90dG9tLmNvbG9yfSBkPXtgTTAgJHtoZWlnaHR9IEwke3dpZHRofSAke2hlaWdodH1gfS8+fVxuXHRcdFx0XHR7cmlnaHQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e3JpZ2h0LnN6fSBzdHJva2U9e3JpZ2h0LmNvbG9yfSBkPXtgTSR7d2lkdGh9IDAgTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XG5cdFx0XHRcdHtsZWZ0LnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXtsZWZ0LnN6fSBzdHJva2U9e2xlZnQuY29sb3J9IGQ9e2BNMCAwIEwwICR7aGVpZ2h0fWB9Lz59XHRcdFx0XG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0LnN6fSB5PXt0b3Auc3p9PlxuXHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHRcdFxuXHR9XG59XG4iXX0=