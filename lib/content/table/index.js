"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("../any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Any) {
	_inherits(Table, _Any);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
	}

	_createClass(Table, [{
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
				return parent.appendComposed(_this2.createComposed2Parent(_extends({}, props, { x: -x, y: sz / 2, children: lines })));
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

			_get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), "onAllChildrenComposed", this).call(this);
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
	_inherits(ComposedTable, _Group);

	function ComposedTable() {
		_classCallCheck(this, ComposedTable);

		return _possibleConstructorReturn(this, (ComposedTable.__proto__ || Object.getPrototypeOf(ComposedTable)).apply(this, arguments));
	}

	return ComposedTable;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlRhYmxlIiwiZ2V0Q29udGVudCIsInJvd3MiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwicGFyZW50IiwiY29udGV4dCIsImdldFN0eWxlIiwieCIsIm1hcmdpbiIsImxlZnQiLCJzeiIsImJvcmRlciIsInRvcCIsImNvbW1pdCIsInByb3BzIiwibGluZXMiLCJhcHBlbmRDb21wb3NlZCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInkiLCJyZWR1Y2UiLCJzdGF0ZSIsInJvdyIsImkiLCJzcGFjZSIsImNvbnRlbnQiLCJjb21wb3NlZExpbmUiLCJyb3dIZWlnaHQiLCJoZWlnaHQiLCJyb3dXaWR0aCIsIndpZHRoIiwicHVzaCIsImNsb25lRWxlbWVudCIsImtleSIsIm5leHRBdmFpbGFibGVTcGFjZSIsImNlbGwiLCJkaXNwbGF5TmFtZSIsIkNvbXBvc2VkVGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7OzsyQkFFWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQU87QUFBQTtBQUFBO0FBQVEsVUFBS0MsVUFBTDtBQUFSO0FBQVAsSUFBUDtBQUNBOzs7MENBRXNCO0FBQUE7O0FBQUEsT0FDTkMsSUFETSxHQUNBLEtBQUtDLFFBREwsQ0FDZkMsUUFEZTtBQUFBLE9BRWZDLE1BRmUsR0FFUCxLQUFLQyxPQUZFLENBRWZELE1BRmU7O0FBQUEsK0JBR3FCSCxLQUFLLENBQUwsRUFBUUMsUUFBUixDQUFpQkMsUUFBakIsQ0FBMEIsQ0FBMUIsRUFBNkJHLFFBQTdCLEVBSHJCO0FBQUEsT0FHRkMsQ0FIRSx5QkFHZkMsTUFIZSxDQUdQQyxJQUhPO0FBQUEsT0FHZUMsRUFIZix5QkFHRUMsTUFIRixDQUdVQyxHQUhWLENBR2VGLEVBSGY7O0FBS3RCLE9BQU1HLFNBQU8sU0FBUEEsTUFBTyxDQUFDQyxLQUFELEVBQU9DLEtBQVA7QUFBQSxXQUFlWCxPQUFPWSxjQUFQLENBQXNCLE9BQUtDLHFCQUFMLGNBQStCSCxLQUEvQixJQUFxQ1AsR0FBRSxDQUFDQSxDQUF4QyxFQUEwQ1csR0FBRVIsS0FBRyxDQUEvQyxFQUFpRFAsVUFBU1ksS0FBMUQsSUFBdEIsQ0FBZjtBQUFBLElBQWI7O0FBTHNCLHNCQU9DZCxLQUFLa0IsTUFBTCxDQUFZLFVBQUNDLEtBQUQsRUFBT0MsR0FBUCxFQUFXQyxDQUFYLEVBQWU7QUFBQSxRQUM1Q0MsS0FENEMsR0FDN0JILEtBRDZCLENBQzVDRyxLQUQ0QztBQUFBLFFBQ3RDQyxPQURzQyxHQUM3QkosS0FENkIsQ0FDdENJLE9BRHNDOztBQUVqRCxRQUFJVCxRQUFNSyxNQUFNTCxLQUFoQjtBQUNBLFFBQUlVLGVBQWFKLElBQUlKLHFCQUFKLENBQTBCRyxLQUExQixDQUFqQjtBQUhpRCw4QkFJUkssYUFBYVgsS0FKTDtBQUFBLFFBSW5DWSxTQUptQyx1QkFJMUNDLE1BSjBDO0FBQUEsUUFJbEJDLFFBSmtCLHVCQUl4QkMsS0FKd0I7OztBQU1qRCxRQUFHTixNQUFNSSxNQUFOLEdBQWFILFFBQVFHLE1BQXJCLElBQTZCRCxTQUFoQyxFQUEwQztBQUN6Q1gsV0FBTWUsSUFBTixDQUFXLGdCQUFNQyxZQUFOLENBQW1CTixZQUFuQixFQUFpQyxFQUFDUCxHQUFFTSxRQUFRRyxNQUFYLEVBQWtCSyxLQUFJWixNQUFNQyxHQUE1QixFQUFqQyxDQUFYO0FBQ0FHLGFBQVFHLE1BQVIsSUFBZ0JELFNBQWhCO0FBQ0FGLGFBQVFLLEtBQVIsR0FBY0QsUUFBZDtBQUNBLEtBSkQsTUFJSztBQUNKZixZQUFPVyxPQUFQLEVBQWdCVCxLQUFoQjtBQUNBUyxhQUFRRyxNQUFSLEdBQWUsQ0FBZjtBQUNBWixhQUFNSyxNQUFNTCxLQUFOLEdBQVksRUFBbEI7QUFDQUssV0FBTUcsS0FBTixHQUFZbkIsT0FBTzZCLGtCQUFQLENBQTBCLEVBQUNOLFFBQU9ELFNBQVIsRUFBMUIsQ0FBWjtBQUNBWCxXQUFNZSxJQUFOLENBQVcsZ0JBQU1DLFlBQU4sQ0FBbUJOLFlBQW5CLEVBQWlDLEVBQUNQLEdBQUVNLFFBQVFHLE1BQVgsRUFBa0JLLEtBQUlaLE1BQU1DLEdBQTVCLEVBQWpDLENBQVg7QUFDQUcsYUFBUUcsTUFBUixJQUFnQkQsU0FBaEI7QUFDQUYsYUFBUUssS0FBUixHQUFjRCxRQUFkO0FBQ0E7QUFDRFIsVUFBTUMsR0FBTjtBQUNBLFdBQU9ELEtBQVA7QUFDQSxJQXJCc0IsRUFxQnJCLEVBQUNHLE9BQU1uQixPQUFPNkIsa0JBQVAsRUFBUCxFQUFvQ1QsU0FBUSxFQUFDRyxRQUFPLENBQVIsRUFBVUUsT0FBTSxDQUFoQixFQUE1QyxFQUFnRWQsT0FBTSxFQUF0RSxFQUF5RU0sS0FBSSxDQUE3RSxFQUFnRmEsTUFBSyxDQUFyRixFQXJCcUIsQ0FQRDtBQUFBLE9BT2ZWLE9BUGUsZ0JBT2ZBLE9BUGU7QUFBQSxPQU9OVCxLQVBNLGdCQU9OQSxLQVBNOztBQThCdEJGLFVBQU9XLE9BQVAsRUFBZ0JULEtBQWhCOztBQUVBO0FBQ0E7Ozt3Q0FFcUJELEssRUFBTTtBQUMzQixVQUFPLDhCQUFDLGFBQUQsRUFBbUJBLEtBQW5CLENBQVA7QUFDQTs7Ozs7O0FBM0NtQmYsSyxDQUNib0MsVyxHQUFZLE87a0JBRENwQyxLOztJQThDZnFDLGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi8uLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIEFueXtcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHRhYmxlPjx0Ym9keT57dGhpcy5nZXRDb250ZW50KCl9PC90Ym9keT48L3RhYmxlPlxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcblx0XHRjb25zdCB7Y2hpbGRyZW46cm93c309dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7bWFyZ2luOntsZWZ0Onh9LCBib3JkZXI6e3RvcDp7c3p9fX09cm93c1swXS5jb21wdXRlZC5jaGlsZHJlblswXS5nZXRTdHlsZSgpXHJcblxyXG5cdFx0Y29uc3QgY29tbWl0PShwcm9wcyxsaW5lcyk9PnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4ucHJvcHMseDoteCx5OnN6LzIsY2hpbGRyZW46bGluZXN9KSlcclxuXHJcblx0XHRjb25zdCB7Y29udGVudCwgbGluZXN9PXJvd3MucmVkdWNlKChzdGF0ZSxyb3csaSk9PntcclxuXHRcdFx0bGV0IHtzcGFjZSxjb250ZW50fT1zdGF0ZVxyXG5cdFx0XHRsZXQgbGluZXM9c3RhdGUubGluZXNcclxuXHRcdFx0bGV0IGNvbXBvc2VkTGluZT1yb3cuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHN0YXRlKVxyXG5cdFx0XHRjb25zdCB7aGVpZ2h0OnJvd0hlaWdodCwgd2lkdGg6cm93V2lkdGh9PWNvbXBvc2VkTGluZS5wcm9wc1xyXG5cclxuXHRcdFx0aWYoc3BhY2UuaGVpZ2h0LWNvbnRlbnQuaGVpZ2h0Pj1yb3dIZWlnaHQpe1xyXG5cdFx0XHRcdGxpbmVzLnB1c2goUmVhY3QuY2xvbmVFbGVtZW50KGNvbXBvc2VkTGluZSwge3k6Y29udGVudC5oZWlnaHQsa2V5OnN0YXRlLnJvd30pKVxyXG5cdFx0XHRcdGNvbnRlbnQuaGVpZ2h0Kz1yb3dIZWlnaHRcclxuXHRcdFx0XHRjb250ZW50LndpZHRoPXJvd1dpZHRoXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbW1pdChjb250ZW50LCBsaW5lcylcclxuXHRcdFx0XHRjb250ZW50LmhlaWdodD0wXHJcblx0XHRcdFx0bGluZXM9c3RhdGUubGluZXM9W11cclxuXHRcdFx0XHRzdGF0ZS5zcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHtoZWlnaHQ6cm93SGVpZ2h0fSlcclxuXHRcdFx0XHRsaW5lcy5wdXNoKFJlYWN0LmNsb25lRWxlbWVudChjb21wb3NlZExpbmUsIHt5OmNvbnRlbnQuaGVpZ2h0LGtleTpzdGF0ZS5yb3d9KSlcclxuXHRcdFx0XHRjb250ZW50LmhlaWdodCs9cm93SGVpZ2h0XHJcblx0XHRcdFx0Y29udGVudC53aWR0aD1yb3dXaWR0aFxyXG5cdFx0XHR9XHJcblx0XHRcdHN0YXRlLnJvdysrXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7c3BhY2U6cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpLCBjb250ZW50OntoZWlnaHQ6MCx3aWR0aDowfSwgbGluZXM6W10scm93OjAsIGNlbGw6MH0pXHJcblxyXG5cdFx0Y29tbWl0KGNvbnRlbnQsIGxpbmVzKVxyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0cmV0dXJuIDxDb21wb3NlZFRhYmxlIHsuLi5wcm9wc30vPlxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29tcG9zZWRUYWJsZSBleHRlbmRzIEdyb3Vwe1xyXG59XHJcbiJdfQ==