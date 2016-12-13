"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _any = require("../any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Any) {
	(0, _inherits3.default)(Table, _Any);

	function Table() {
		(0, _classCallCheck3.default)(this, Table);
		return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
	}

	(0, _createClass3.default)(Table, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"table",
				null,
				_react2.default.createElement(
					"tbody",
					null,
					this.getContent()
				)
			);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			var _this2 = this;

			var rows = this.computed.children;
			var parent = this.context.parent;

			var _rows$0$computed$chil = rows[0].computed.children[0].getStyle(),
			    x = _rows$0$computed$chil.margin.left,
			    sz = _rows$0$computed$chil.border.top.sz;

			var commit = function commit(props, lines) {
				return parent.appendComposed(_this2.createComposed2Parent((0, _extends3.default)({}, props, { x: -x, y: sz / 2, children: lines })));
			};

			var _rows$reduce = rows.reduce(function (state, row, i) {
				var space = state.space,
				    content = state.content;

				var lines = state.lines;
				var composedLine = row.createComposed2Parent(state);
				var _composedLine$props = composedLine.props,
				    rowHeight = _composedLine$props.height,
				    rowWidth = _composedLine$props.width;


				if (space.height - content.height >= rowHeight) {
					lines.push(_react2.default.cloneElement(composedLine, { y: content.height, key: state.row }));
					content.height += rowHeight;
					content.width = rowWidth;
				} else {
					commit(content, lines);
					content.height = 0;
					lines = state.lines = [];
					state.space = parent.nextAvailableSpace({ height: rowHeight });
					lines.push(_react2.default.cloneElement(composedLine, { y: content.height, key: state.row }));
					content.height += rowHeight;
					content.width = rowWidth;
				}
				state.row++;
				return state;
			}, { space: parent.nextAvailableSpace(), content: { height: 0, width: 0 }, lines: [], row: 0, cell: 0 }),
			    content = _rows$reduce.content,
			    lines = _rows$reduce.lines;

			commit(content, lines);

			(0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(ComposedTable, props);
		}
	}]);
	return Table;
}(_any2.default);

Table.displayName = "table";
exports.default = Table;

var ComposedTable = function (_Group) {
	(0, _inherits3.default)(ComposedTable, _Group);

	function ComposedTable() {
		(0, _classCallCheck3.default)(this, ComposedTable);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedTable.__proto__ || (0, _getPrototypeOf2.default)(ComposedTable)).apply(this, arguments));
	}

	return ComposedTable;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRhYmxlIiwiZ2V0Q29udGVudCIsInJvd3MiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwicGFyZW50IiwiY29udGV4dCIsImdldFN0eWxlIiwieCIsIm1hcmdpbiIsImxlZnQiLCJzeiIsImJvcmRlciIsInRvcCIsImNvbW1pdCIsInByb3BzIiwibGluZXMiLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInkiLCJyZWR1Y2UiLCJzdGF0ZSIsInJvdyIsImkiLCJzcGFjZSIsImNvbnRlbnQiLCJjb21wb3NlZExpbmUiLCJyb3dIZWlnaHQiLCJoZWlnaHQiLCJyb3dXaWR0aCIsIndpZHRoIiwicHVzaCIsImNsb25lRWxlbWVudCIsImtleSIsIm5leHRBdmFpbGFibGVTcGFjZSIsImNlbGwiLCJkaXNwbGF5TmFtZSIsIkNvbXBvc2VkVGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7OzsyQkFFWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQU87QUFBQTtBQUFBO0FBQVEsVUFBS0MsVUFBTDtBQUFSO0FBQVAsSUFBUDtBQUNBOzs7MENBRXNCO0FBQUE7O0FBQUEsT0FDTkMsSUFETSxHQUNBLEtBQUtDLFFBREwsQ0FDZkMsUUFEZTtBQUFBLE9BRWZDLE1BRmUsR0FFUCxLQUFLQyxPQUZFLENBRWZELE1BRmU7O0FBQUEsK0JBR3FCSCxLQUFLLENBQUwsRUFBUUMsUUFBUixDQUFpQkMsUUFBakIsQ0FBMEIsQ0FBMUIsRUFBNkJHLFFBQTdCLEVBSHJCO0FBQUEsT0FHRkMsQ0FIRSx5QkFHZkMsTUFIZSxDQUdQQyxJQUhPO0FBQUEsT0FHZUMsRUFIZix5QkFHRUMsTUFIRixDQUdVQyxHQUhWLENBR2VGLEVBSGY7O0FBS3RCLE9BQU1HLFNBQU8sU0FBUEEsTUFBTyxDQUFDQyxLQUFELEVBQU9DLEtBQVA7QUFBQSxXQUFlWCxPQUFPWSxjQUFQLENBQXNCLE9BQUtDLHFCQUFMLDRCQUErQkgsS0FBL0IsSUFBcUNQLEdBQUUsQ0FBQ0EsQ0FBeEMsRUFBMENXLEdBQUVSLEtBQUcsQ0FBL0MsRUFBaURQLFVBQVNZLEtBQTFELElBQXRCLENBQWY7QUFBQSxJQUFiOztBQUxzQixzQkFPQ2QsS0FBS2tCLE1BQUwsQ0FBWSxVQUFDQyxLQUFELEVBQU9DLEdBQVAsRUFBV0MsQ0FBWCxFQUFlO0FBQUEsUUFDNUNDLEtBRDRDLEdBQzdCSCxLQUQ2QixDQUM1Q0csS0FENEM7QUFBQSxRQUN0Q0MsT0FEc0MsR0FDN0JKLEtBRDZCLENBQ3RDSSxPQURzQzs7QUFFakQsUUFBSVQsUUFBTUssTUFBTUwsS0FBaEI7QUFDQSxRQUFJVSxlQUFhSixJQUFJSixxQkFBSixDQUEwQkcsS0FBMUIsQ0FBakI7QUFIaUQsOEJBSVJLLGFBQWFYLEtBSkw7QUFBQSxRQUluQ1ksU0FKbUMsdUJBSTFDQyxNQUowQztBQUFBLFFBSWxCQyxRQUprQix1QkFJeEJDLEtBSndCOzs7QUFNakQsUUFBR04sTUFBTUksTUFBTixHQUFhSCxRQUFRRyxNQUFyQixJQUE2QkQsU0FBaEMsRUFBMEM7QUFDekNYLFdBQU1lLElBQU4sQ0FBVyxnQkFBTUMsWUFBTixDQUFtQk4sWUFBbkIsRUFBaUMsRUFBQ1AsR0FBRU0sUUFBUUcsTUFBWCxFQUFrQkssS0FBSVosTUFBTUMsR0FBNUIsRUFBakMsQ0FBWDtBQUNBRyxhQUFRRyxNQUFSLElBQWdCRCxTQUFoQjtBQUNBRixhQUFRSyxLQUFSLEdBQWNELFFBQWQ7QUFDQSxLQUpELE1BSUs7QUFDSmYsWUFBT1csT0FBUCxFQUFnQlQsS0FBaEI7QUFDQVMsYUFBUUcsTUFBUixHQUFlLENBQWY7QUFDQVosYUFBTUssTUFBTUwsS0FBTixHQUFZLEVBQWxCO0FBQ0FLLFdBQU1HLEtBQU4sR0FBWW5CLE9BQU82QixrQkFBUCxDQUEwQixFQUFDTixRQUFPRCxTQUFSLEVBQTFCLENBQVo7QUFDQVgsV0FBTWUsSUFBTixDQUFXLGdCQUFNQyxZQUFOLENBQW1CTixZQUFuQixFQUFpQyxFQUFDUCxHQUFFTSxRQUFRRyxNQUFYLEVBQWtCSyxLQUFJWixNQUFNQyxHQUE1QixFQUFqQyxDQUFYO0FBQ0FHLGFBQVFHLE1BQVIsSUFBZ0JELFNBQWhCO0FBQ0FGLGFBQVFLLEtBQVIsR0FBY0QsUUFBZDtBQUNBO0FBQ0RSLFVBQU1DLEdBQU47QUFDQSxXQUFPRCxLQUFQO0FBQ0EsSUFyQnNCLEVBcUJyQixFQUFDRyxPQUFNbkIsT0FBTzZCLGtCQUFQLEVBQVAsRUFBb0NULFNBQVEsRUFBQ0csUUFBTyxDQUFSLEVBQVVFLE9BQU0sQ0FBaEIsRUFBNUMsRUFBZ0VkLE9BQU0sRUFBdEUsRUFBeUVNLEtBQUksQ0FBN0UsRUFBZ0ZhLE1BQUssQ0FBckYsRUFyQnFCLENBUEQ7QUFBQSxPQU9mVixPQVBlLGdCQU9mQSxPQVBlO0FBQUEsT0FPTlQsS0FQTSxnQkFPTkEsS0FQTTs7QUE4QnRCRixVQUFPVyxPQUFQLEVBQWdCVCxLQUFoQjs7QUFFQTtBQUNBOzs7d0NBRXFCRCxLLEVBQU07QUFDM0IsVUFBTyw4QkFBQyxhQUFELEVBQW1CQSxLQUFuQixDQUFQO0FBQ0E7Ozs7O0FBM0NtQmYsSyxDQUNib0MsVyxHQUFZLE87a0JBRENwQyxLOztJQThDZnFDLGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4uL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uLy4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBBbnl7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInRhYmxlXCJcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIDx0YWJsZT48dGJvZHk+e3RoaXMuZ2V0Q29udGVudCgpfTwvdGJvZHk+PC90YWJsZT5cblx0fVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbjpyb3dzfT10aGlzLmNvbXB1dGVkXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge21hcmdpbjp7bGVmdDp4fSwgYm9yZGVyOnt0b3A6e3N6fX19PXJvd3NbMF0uY29tcHV0ZWQuY2hpbGRyZW5bMF0uZ2V0U3R5bGUoKVxuXG5cdFx0Y29uc3QgY29tbWl0PShwcm9wcyxsaW5lcyk9PnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4ucHJvcHMseDoteCx5OnN6LzIsY2hpbGRyZW46bGluZXN9KSlcblxuXHRcdGNvbnN0IHtjb250ZW50LCBsaW5lc309cm93cy5yZWR1Y2UoKHN0YXRlLHJvdyxpKT0+e1xuXHRcdFx0bGV0IHtzcGFjZSxjb250ZW50fT1zdGF0ZVxuXHRcdFx0bGV0IGxpbmVzPXN0YXRlLmxpbmVzXG5cdFx0XHRsZXQgY29tcG9zZWRMaW5lPXJvdy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoc3RhdGUpXG5cdFx0XHRjb25zdCB7aGVpZ2h0OnJvd0hlaWdodCwgd2lkdGg6cm93V2lkdGh9PWNvbXBvc2VkTGluZS5wcm9wc1xuXG5cdFx0XHRpZihzcGFjZS5oZWlnaHQtY29udGVudC5oZWlnaHQ+PXJvd0hlaWdodCl7XG5cdFx0XHRcdGxpbmVzLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KGNvbXBvc2VkTGluZSwge3k6Y29udGVudC5oZWlnaHQsa2V5OnN0YXRlLnJvd30pKVxuXHRcdFx0XHRjb250ZW50LmhlaWdodCs9cm93SGVpZ2h0XG5cdFx0XHRcdGNvbnRlbnQud2lkdGg9cm93V2lkdGhcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21taXQoY29udGVudCwgbGluZXMpXG5cdFx0XHRcdGNvbnRlbnQuaGVpZ2h0PTBcblx0XHRcdFx0bGluZXM9c3RhdGUubGluZXM9W11cblx0XHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7aGVpZ2h0OnJvd0hlaWdodH0pXG5cdFx0XHRcdGxpbmVzLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KGNvbXBvc2VkTGluZSwge3k6Y29udGVudC5oZWlnaHQsa2V5OnN0YXRlLnJvd30pKVxuXHRcdFx0XHRjb250ZW50LmhlaWdodCs9cm93SGVpZ2h0XG5cdFx0XHRcdGNvbnRlbnQud2lkdGg9cm93V2lkdGhcblx0XHRcdH1cblx0XHRcdHN0YXRlLnJvdysrXG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LHtzcGFjZTpwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCksIGNvbnRlbnQ6e2hlaWdodDowLHdpZHRoOjB9LCBsaW5lczpbXSxyb3c6MCwgY2VsbDowfSlcblxuXHRcdGNvbW1pdChjb250ZW50LCBsaW5lcylcblxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cblxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHJldHVybiA8Q29tcG9zZWRUYWJsZSB7Li4ucHJvcHN9Lz5cblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZFRhYmxlIGV4dGVuZHMgR3JvdXB7XG59XG4iXX0=