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
		key: "getChildContext",
		value: function getChildContext() {
			var children = this.computed.children;
			var contentLength = this.getContentCount();
			return Object.assign(_get(Object.getPrototypeOf(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.directStyle,
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
}(Super);

Table.displayName = "table";
Table.childContextTypes = Object.assign({
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxxQkFBTjs7Ozs7OztJQU1xQjs7Ozs7Ozs7Ozs7cUNBRUQsVUFBUztBQUMzQixPQUFJLGlCQUFlLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLENBQXVDLFFBQXZDLENBQWYsQ0FEdUI7QUFFM0IsVUFBTyxFQUFDLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFRLGVBQWUsTUFBZixFQUF6QyxDQUYyQjs7OztpQ0FLYixXQUFVO2dCQUNKLEtBQUssS0FBTCxDQURJO09BQ2pCLHFCQURpQjtPQUNWLG1CQURVOztBQUV4QixPQUFJLFNBQU8sQ0FBUDtPQUFVLE9BQUssSUFBTCxDQUZVOztBQUl4QixPQUFJLElBQUUsQ0FBRjtPQUFLLFFBQU0sS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixHQUE4QixDQUE5QixDQUpTO0FBS3hCLE9BQUksZUFBYSxVQUFVLEdBQVYsQ0FBYyxVQUFDLGNBQUQsRUFBZ0IsS0FBaEIsRUFBd0I7Z0NBQ1osZUFBZSxLQUFmLENBRFk7UUFDakQsc0NBRGlEO1FBQ3pDLHNDQUR5QztRQUNqQyx3Q0FEaUM7UUFDeEIsOENBRHdCOztBQUV0RCxRQUFJLElBQUUsQ0FBRixDQUZrRDtBQUd0RCxRQUFJLFVBQVEsZUFBZSxHQUFmLENBQW1CLGdCQUFNO0FBQ25DLFNBQUksSUFBRTs7UUFBTyxHQUFHLENBQUgsRUFBUDtNQUFjLElBQWQ7TUFBRixDQUQrQjtBQUVuQyxVQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FGZ0M7QUFHbkMsWUFBTyxDQUFQLENBSG1DO0tBQU4sQ0FBM0IsQ0FIa0Q7QUFRdEQsU0FBSSxVQUFRLEVBQVIsR0FDRixPQUFPLEdBQVAsQ0FBVyxFQUFYLEdBQ0EsT0FBTyxHQUFQLEdBQ0EsT0FBTyxNQUFQLEdBQ0EsT0FBTyxNQUFQLENBQWMsRUFBZCxHQUNBLFVBQVEsRUFBUixDQWJvRDtBQWN0RCxRQUFJLE9BQ0g7QUFBQyxTQUFEO09BQU0sUUFBUSxDQUFSLEVBQVcsR0FBRyxDQUFILEVBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBUCxFQUFvQixZQUFZLFVBQVosRUFBM0M7S0FDQztBQUFDLGFBQUQ7UUFBUyxHQUFHLFVBQVEsQ0FBUixFQUFXLEdBQUcsVUFBUSxDQUFSLEVBQTFCO01BQ0M7QUFBQyxhQUFEO1NBQVEsUUFBUSxNQUFSLEVBQWdCLFNBQVMsT0FBVCxFQUF4QjtPQUNDO0FBQUMsY0FBRDtVQUFRLEdBQUcsT0FBTyxJQUFQLEVBQWEsR0FBRyxPQUFPLEdBQVAsRUFBM0I7UUFDRSxPQURGO1FBREQ7T0FERDtNQUREO0tBREcsQ0Fka0Q7QUF5QnRELFNBQUcsS0FBSyxLQUFMLENBQUgsQ0F6QnNEO0FBMEJ0RCxhQUFPLEtBQUssR0FBTCxDQUFTLE1BQVQsRUFBZ0IsQ0FBaEIsQ0FBUCxDQTFCc0Q7QUEyQnRELFdBQU8sSUFBUCxDQTNCc0Q7SUFBeEIsQ0FBM0IsQ0FMb0I7O0FBbUN4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLEtBQUsscUJBQUwsQ0FBMkIsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFjLFVBQVMsWUFBVCxFQUF6QyxDQUFuQyxFQW5Dd0I7Ozs7d0NBc0NILE9BQU07QUFDM0IsVUFBTyw4QkFBQyxHQUFELEVBQVMsS0FBVCxDQUFQLENBRDJCOzs7O29DQVVYO0FBQ2hCLE9BQUksV0FBUyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBREc7QUFFaEIsT0FBSSxnQkFBYyxLQUFLLGVBQUwsRUFBZCxDQUZZO0FBR2hCLFVBQU8sT0FBTyxNQUFQLDRCQTFEWSxxREEwRFosRUFBc0M7QUFDNUMsZ0JBQVksS0FBSyxLQUFMLENBQVcsV0FBWDtBQUNaLHNDQUFZO0FBQ1gsWUFBTyxTQUFTLE1BQVQsSUFBaUIsQ0FBakIsQ0FESTtLQUZnQztBQU01QyxvQ0FBVztBQUNWLFlBQU8sU0FBUyxNQUFULElBQWlCLGdCQUFjLENBQWQsQ0FEZDtLQU5pQztJQUF0QyxDQUFQLENBSGdCOzs7O1FBdkRHO0VBQWM7O0FBQWQsTUFDYixjQUFZO0FBREMsTUFpRGIsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ3RDLGFBQVksaUJBQVUsTUFBVjtBQUNaLGFBQVksaUJBQVUsSUFBVjtBQUNaLFlBQVcsaUJBQVUsSUFBVjtDQUhhLEVBSXRCLE1BQU0saUJBQU47a0JBckRpQjs7SUF1RWY7Ozs7Ozs7Ozs7OztJQUNBOzs7Ozs7Ozs7Ozs7SUFFQTs7Ozs7Ozs7Ozs7b0NBU1k7QUFDaEIsVUFBTztBQUNOLGNBQVU7QUFDVCxZQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDUCxhQUFRLEtBQUssS0FBTCxDQUFXLE1BQVg7S0FGVDtJQURELENBRGdCOzs7OzJCQVNUO2lCQUMrQyxLQUFLLEtBQUwsQ0FEL0M7T0FDQSxzQkFEQTtPQUNNLHdCQUROO09BQ2MsZ0NBRGQ7T0FDMEIsNEJBRDFCOztPQUN1QywwRkFEdkM7O0FBRVAsVUFDQzs7SUFBVyxNQUFYO0lBQ0UsY0FBZSx3Q0FBTSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0IsTUFBTSxVQUFOLEVBQXBDLENBQWY7SUFDQSxRQUZGO0lBREQsQ0FGTzs7OztRQWxCSDs7O0tBQ0UsZUFBYTtBQUNuQixXQUFVLGlCQUFVLE1BQVY7O0FBRk4sS0FLRSxvQkFBa0I7QUFDeEIsV0FBUyxpQkFBVSxNQUFWOzs7SUF3Qkw7Ozs7Ozs7Ozs7O29DQUtZO0FBQ2hCLFVBQU87QUFDTixhQUFTO0FBQ1IsWUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYO0FBQ1AsYUFBUSxLQUFLLEtBQUwsQ0FBVyxNQUFYO0tBRlQ7SUFERCxDQURnQjs7OztRQUxaOzs7SUFDRSxvQkFBa0I7QUFDeEIsVUFBUSxpQkFBVSxNQUFWOzs7SUFhSjs7Ozs7Ozs7Ozs7MkJBS0c7aUJBQzZELEtBQUssS0FBTCxDQUQ3RDtPQUNBLDBCQURBO2dDQUNRLE9BRFI7T0FDZ0IsMkJBRGhCO09BQ3FCLDZCQURyQjtPQUMyQiwrQkFEM0I7T0FDa0MseUJBRGxDO09BQ3dDLDRCQUR4Qzs7T0FDcUQsOEVBRHJEOztrQkFFa0MsS0FBSyxPQUFMLENBRmxDO09BRU8sa0JBQVQsUUFBUyxPQUZQO09BRTBCLGlCQUFWLFNBQVUsTUFGMUI7O0FBR1AsWUFBTyxPQUFQLENBSE87QUFJUCxhQUFRLE9BQVIsQ0FKTztBQUtQLFVBQ0M7O0lBQVcsTUFBWDtJQUNFLElBQUksRUFBSixJQUFVLHdDQUFNLGFBQWEsSUFBSSxFQUFKLEVBQVEsUUFBUSxJQUFJLEtBQUosRUFBVyxjQUFZLFlBQVosRUFBOUMsQ0FBVjtJQUNBLE9BQU8sRUFBUCxJQUFhLHdDQUFNLGFBQWEsT0FBTyxFQUFQLEVBQVcsUUFBUSxPQUFPLEtBQVAsRUFBYyxXQUFTLGdCQUFXLGNBQVMsTUFBN0IsRUFBcEQsQ0FBYjtJQUNBLE1BQU0sRUFBTixJQUFZLHdDQUFNLGFBQWEsTUFBTSxFQUFOLEVBQVUsUUFBUSxNQUFNLEtBQU4sRUFBYSxTQUFPLGlCQUFZLGNBQVMsTUFBNUIsRUFBbEQsQ0FBWjtJQUNBLEtBQUssRUFBTCxJQUFXLHdDQUFNLGFBQWEsS0FBSyxFQUFMLEVBQVMsUUFBUSxLQUFLLEtBQUwsRUFBWSxnQkFBYyxNQUFkLEVBQWhELENBQVg7SUFDRDs7T0FBTyxHQUFHLEtBQUssRUFBTCxFQUFTLEdBQUcsSUFBSSxFQUFKLEVBQXRCO0tBQ0UsUUFERjtLQUxEO0lBREQsQ0FMTzs7OztRQUxIOzs7T0FDRSxlQUFhO0FBQ25CLFVBQVMsaUJBQVUsTUFBVjtBQUNULFdBQVUsaUJBQVUsTUFBViIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmNvbnN0IFN1cGVyPUFueVxuLyoqXG4gKlxuICpcbiAqICBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdXBlcntcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGFibGVcIlxuXHRuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpe1xuXHRcdGxldCBhdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRyZXR1cm4ge3dpZHRoOiB0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6IGF2YWlsYWJsZVNwYWNlLmhlaWdodH1cblx0fVxuXG5cdGFwcGVuZENvbXBvc2VkKGNvbEdyb3Vwcyl7XG5cdFx0Y29uc3Qge3dpZHRoLCBjb2xzfT10aGlzLnByb3BzXG5cdFx0bGV0IGhlaWdodD0wLCBzZWxmPXRoaXNcblxuXHRcdGxldCB4PTAsIHJvd05vPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLTFcblx0XHRsZXQgZ3JvdXBzV2l0aFhZPWNvbEdyb3Vwcy5tYXAoKGxpbmVzV2l0aFN0eWxlLGNvbE5vKT0+e1xuXHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZH09bGluZXNXaXRoU3R5bGUuc3R5bGVcblx0XHRcdGxldCB5PTBcblx0XHRcdGxldCBncm91cGVkPWxpbmVzV2l0aFN0eWxlLm1hcChsaW5lPT57XG5cdFx0XHRcdFx0bGV0IGE9PEdyb3VwIHk9e3l9PntsaW5lfTwvR3JvdXA+XG5cdFx0XHRcdFx0eSs9bGluZS5wcm9wcy5oZWlnaHRcblx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHR9KVxuXHRcdFx0eSs9KHNwYWNpbmcqLjVcblx0XHRcdFx0K2JvcmRlci50b3Auc3pcblx0XHRcdFx0K21hcmdpbi50b3Bcblx0XHRcdFx0K21hcmdpbi5ib3R0b21cblx0XHRcdFx0K2JvcmRlci5ib3R0b20uc3pcblx0XHRcdFx0K3NwYWNpbmcqLjUpXG5cdFx0XHRsZXQgY2VsbD0oXG5cdFx0XHRcdDxDZWxsIGhlaWdodD17eX0geD17eH0gd2lkdGg9e2NvbHNbY29sTm9dfSBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfT5cblx0XHRcdFx0XHQ8U3BhY2luZyB4PXtzcGFjaW5nLzJ9IHk9e3NwYWNpbmcvMn0+XG5cdFx0XHRcdFx0XHQ8Qm9yZGVyIGJvcmRlcj17Ym9yZGVyfSBzcGFjaW5nPXtzcGFjaW5nfT5cblx0XHRcdFx0XHRcdFx0PE1hcmdpbiB4PXttYXJnaW4ubGVmdH0geT17bWFyZ2luLnRvcH0+XG5cdFx0XHRcdFx0XHRcdFx0e2dyb3VwZWR9XG5cdFx0XHRcdFx0XHRcdDwvTWFyZ2luPlxuXHRcdFx0XHRcdFx0PC9Cb3JkZXI+XG5cdFx0XHRcdFx0PC9TcGFjaW5nPlxuXHRcdFx0XHQ8L0NlbGw+XG5cdFx0XHQpO1xuXHRcdFx0eCs9Y29sc1tjb2xOb11cblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcblx0XHRcdHJldHVybiBjZWxsXG5cdFx0fSlcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe3dpZHRoLGhlaWdodCxjaGlsZHJlbjpncm91cHNXaXRoWFl9KSlcblx0fVxuXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0cmV0dXJuIDxSb3cgey4uLnByb3BzfS8+XG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0dGFibGVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3c6IFByb3BUeXBlcy5mdW5jXG5cdH0sIFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdGxldCBjaGlsZHJlbj10aGlzLmNvbXB1dGVkLmNoaWxkcmVuXG5cdFx0bGV0IGNvbnRlbnRMZW5ndGg9dGhpcy5nZXRDb250ZW50Q291bnQoKVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGUsXG5cdFx0XHRpc0ZpcnN0Um93KCl7XG5cdFx0XHRcdHJldHVybiBjaGlsZHJlbi5sZW5ndGg9PTBcblx0XHRcdH0sXG5cblx0XHRcdGlzTGFzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW4ubGVuZ3RoPT1jb250ZW50TGVuZ3RoLTFcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbmNsYXNzIFNwYWNpbmcgZXh0ZW5kcyBHcm91cHt9XG5jbGFzcyBNYXJnaW4gZXh0ZW5kcyBHcm91cHt9XG5cbmNsYXNzIENlbGwgZXh0ZW5kcyBHcm91cHtcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0Y2VsbFNpemU6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0Y2VsbFNpemU6UHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cblx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNlbGxTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3dpZHRoLGhlaWdodCwgYmFja2dyb3VuZCwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgey4uLm90aGVyc30+XG5cdFx0XHRcdHtiYWNrZ3JvdW5kICYmICg8cmVjdCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPXtiYWNrZ3JvdW5kfS8+KX1cblx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxufVxuXG5jbGFzcyBSb3cgZXh0ZW5kcyBHcm91cHtcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRyb3dTaXplOiB7XG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIEJvcmRlciBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm93U2l6ZTogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRjZWxsU2l6ZTogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtzcGFjaW5nLGJvcmRlcjp7bGVmdCxyaWdodCxib3R0b20sdG9wfSwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdGxldCB7cm93U2l6ZTp7aGVpZ2h0fSwgY2VsbFNpemU6e3dpZHRofX09dGhpcy5jb250ZXh0XG5cdFx0d2lkdGgtPXNwYWNpbmdcblx0XHRoZWlnaHQtPXNwYWNpbmdcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxuXHRcdFx0XHR7dG9wLnN6ICYmIDxwYXRoIHN0cm9rZVdpZHRoPXt0b3Auc3p9IHN0cm9rZT17dG9wLmNvbG9yfSBkPXtgTTAgMCBMJHt3aWR0aH0gMGB9Lz59XG5cdFx0XHRcdHtib3R0b20uc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2JvdHRvbS5zen0gc3Ryb2tlPXtib3R0b20uY29sb3J9IGQ9e2BNMCAke2hlaWdodH0gTCR7d2lkdGh9ICR7aGVpZ2h0fWB9Lz59XG5cdFx0XHRcdHtyaWdodC5zeiAmJiA8cGF0aCBzdHJva2VXaWR0aD17cmlnaHQuc3p9IHN0cm9rZT17cmlnaHQuY29sb3J9IGQ9e2BNJHt3aWR0aH0gMCBMJHt3aWR0aH0gJHtoZWlnaHR9YH0vPn1cblx0XHRcdFx0e2xlZnQuc3ogJiYgPHBhdGggc3Ryb2tlV2lkdGg9e2xlZnQuc3p9IHN0cm9rZT17bGVmdC5jb2xvcn0gZD17YE0wIDAgTDAgJHtoZWlnaHR9YH0vPn1cblx0XHRcdFx0PEdyb3VwIHg9e2xlZnQuc3p9IHk9e3RvcC5zen0+XG5cdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cblx0fVxufVxuIl19