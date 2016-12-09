"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

			var headers = this.getHeaderRowCount();

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

var ComposedTable = function (_Group) {
	(0, _inherits3.default)(ComposedTable, _Group);

	function ComposedTable() {
		(0, _classCallCheck3.default)(this, ComposedTable);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedTable.__proto__ || (0, _getPrototypeOf2.default)(ComposedTable)).apply(this, arguments));
	}

	return ComposedTable;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN1cGVyIiwiVGFibGUiLCJnZXRDb250ZW50Iiwicm93cyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJjb250ZXh0IiwiaGVhZGVycyIsImdldEhlYWRlclJvd0NvdW50IiwiZ2V0U3R5bGUiLCJ4IiwibWFyZ2luIiwibGVmdCIsInN6IiwiYm9yZGVyIiwidG9wIiwiY29tbWl0IiwicHJvcHMiLCJsaW5lcyIsImFwcGVuZENvbXBvc2VkIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwieSIsInJlZHVjZSIsInN0YXRlIiwicm93IiwiaSIsInNwYWNlIiwiY29udGVudCIsImNvbXBvc2VkTGluZSIsInJvd0hlaWdodCIsImhlaWdodCIsInJvd1dpZHRoIiwid2lkdGgiLCJwdXNoIiwiY2xvbmVFbGVtZW50Iiwia2V5IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwiY2VsbCIsImRpcmVjdFN0eWxlIiwic2VsZiIsImRlZmF1bHRTdHlsZSIsImdldCIsImZpcnN0Um93IiwiQ2hpbGRyZW4iLCJ0b0FycmF5IiwiZmlsdGVyIiwic3R5bGUiLCJhIiwidGJsSGVhZGVyIiwibGVuZ3RoIiwibGFzdFJvdyIsIm5vSEJhbmQiLCJ0YWJsZVN0eWxlIiwiaXNGaXJzdFJvdyIsImlzRmlyc3RSb3dBYnNvbHV0ZSIsImlzTGFzdFJvdyIsImlzTGFzdFJvd0Fic29sdXRlIiwiZ2V0Q29udGVudENvdW50IiwiaXNCYW5kMUhvcnoiLCJpc0JhbmQySG9yeiIsImRpc3BsYXlOYW1lIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvYmplY3QiLCJmdW5jIiwiQ29tcG9zZWRUYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHFCQUFOO0FBQ0E7Ozs7OztJQUtxQkMsSzs7Ozs7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RCxLOztJQW9HZmdFLGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi8uLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5jb25zdCBTdXBlcj1BbnlcclxuLyoqXHJcbiAqXHJcbiAqXHJcbiAqICBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGFibGVcIlxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDx0YWJsZT48dGJvZHk+e3RoaXMuZ2V0Q29udGVudCgpfTwvdGJvZHk+PC90YWJsZT5cclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xyXG5cdFx0Y29uc3Qge2NoaWxkcmVuOnJvd3N9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3QgaGVhZGVycz10aGlzLmdldEhlYWRlclJvd0NvdW50KClcclxuXHRcdGNvbnN0IHttYXJnaW46e2xlZnQ6eH0sIGJvcmRlcjp7dG9wOntzen19fT1yb3dzWzBdLmNvbXB1dGVkLmNoaWxkcmVuWzBdLmdldFN0eWxlKClcclxuXHRcdFxyXG5cdFx0Y29uc3QgY29tbWl0PShwcm9wcyxsaW5lcyk9PnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4ucHJvcHMseDoteCx5OnN6LzIsY2hpbGRyZW46bGluZXN9KSlcclxuXHRcdFxyXG5cdFx0Y29uc3Qge2NvbnRlbnQsIGxpbmVzfT1yb3dzLnJlZHVjZSgoc3RhdGUscm93LGkpPT57XHJcblx0XHRcdGxldCB7c3BhY2UsY29udGVudH09c3RhdGVcclxuXHRcdFx0bGV0IGxpbmVzPXN0YXRlLmxpbmVzXHJcblx0XHRcdGxldCBjb21wb3NlZExpbmU9cm93LmNyZWF0ZUNvbXBvc2VkMlBhcmVudChzdGF0ZSlcclxuXHRcdFx0Y29uc3Qge2hlaWdodDpyb3dIZWlnaHQsIHdpZHRoOnJvd1dpZHRofT1jb21wb3NlZExpbmUucHJvcHNcclxuXHRcdFx0XHJcblx0XHRcdGlmKHNwYWNlLmhlaWdodC1jb250ZW50LmhlaWdodD49cm93SGVpZ2h0KXtcclxuXHRcdFx0XHRsaW5lcy5wdXNoKFJlYWN0LmNsb25lRWxlbWVudChjb21wb3NlZExpbmUsIHt5OmNvbnRlbnQuaGVpZ2h0LGtleTpzdGF0ZS5yb3d9KSlcclxuXHRcdFx0XHRjb250ZW50LmhlaWdodCs9cm93SGVpZ2h0XHJcblx0XHRcdFx0Y29udGVudC53aWR0aD1yb3dXaWR0aFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb21taXQoY29udGVudCwgbGluZXMpXHJcblx0XHRcdFx0Y29udGVudC5oZWlnaHQ9MFxyXG5cdFx0XHRcdGxpbmVzPXN0YXRlLmxpbmVzPVtdXHJcblx0XHRcdFx0c3RhdGUuc3BhY2U9cGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7aGVpZ2h0OnJvd0hlaWdodH0pXHJcblx0XHRcdFx0bGluZXMucHVzaChSZWFjdC5jbG9uZUVsZW1lbnQoY29tcG9zZWRMaW5lLCB7eTpjb250ZW50LmhlaWdodCxrZXk6c3RhdGUucm93fSkpXHJcblx0XHRcdFx0Y29udGVudC5oZWlnaHQrPXJvd0hlaWdodFxyXG5cdFx0XHRcdGNvbnRlbnQud2lkdGg9cm93V2lkdGhcclxuXHRcdFx0fVxyXG5cdFx0XHRzdGF0ZS5yb3crK1xyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3NwYWNlOnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSwgY29udGVudDp7aGVpZ2h0OjAsd2lkdGg6MH0sIGxpbmVzOltdLHJvdzowLCBjZWxsOjB9KVxyXG5cdFx0XHJcblx0XHRjb21taXQoY29udGVudCwgbGluZXMpXHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRyZXR1cm4gPENvbXBvc2VkVGFibGUgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuXHRnZXRIZWFkZXJSb3dDb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZpcnN0Um93fT0odGhpcy5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxyXG5cdFx0aWYoZmlyc3RSb3chPT1cIjFcIilcclxuXHRcdFx0cmV0dXJuIDBcclxuXHJcblx0XHRyZXR1cm4gUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKS5maWx0ZXIoYT0+e1xyXG5cdFx0XHRsZXQgc3R5bGU9YS5wcm9wcy5kaXJlY3RTdHlsZVxyXG5cdFx0XHRpZihzdHlsZSAmJiBzdHlsZS50YmxIZWFkZXIpXHJcblx0XHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHR9KS5sZW5ndGhcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0ZpcnN0Um93OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0ZpcnN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNMYXN0Um93QWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNCYW5kMkhvcno6IFByb3BUeXBlcy5mdW5jXHJcblx0fSwgU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0bGV0IHNlbGY9dGhpc1xyXG5cdFx0Y29uc3Qge2ZpcnN0Um93LCBsYXN0Um93LCBub0hCYW5kfT0oc2VsZi5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHR0YWJsZVN0eWxlOiB0aGlzLnByb3BzLmRpcmVjdFN0eWxlfHx0aGlzLmRlZmF1bHRTdHlsZSxcclxuXHRcdFx0aXNGaXJzdFJvdygpe1xyXG5cdFx0XHRcdHJldHVybiBmaXJzdFJvdz09XCIxXCIgJiYgdGhpcy5pc0ZpcnN0Um93QWJzb2x1dGUoKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0ZpcnN0Um93QWJzb2x1dGUoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PTBcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGlzTGFzdFJvdygpe1xyXG5cdFx0XHRcdHJldHVybiBsYXN0Um93PT1cIjFcIiAmJiB0aGlzLmlzTGFzdFJvd0Fic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGlzTGFzdFJvd0Fic29sdXRlKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGlzQmFuZDFIb3J6KCl7XHJcblx0XHRcdFx0cmV0dXJuIG5vSEJhbmQ9PVwiMFwiICYmICF0aGlzLmlzRmlyc3RSb3coKSAmJiAhdGhpcy5pc0xhc3RSb3coKSAmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJSb3dDb3VudCgpKSUyPT0xXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRpc0JhbmQySG9yeigpe1xyXG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiYmICF0aGlzLmlzRmlyc3RSb3coKSAmJiAhdGhpcy5pc0xhc3RSb3coKSAmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJSb3dDb3VudCgpKSUyPT0wXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb21wb3NlZFRhYmxlIGV4dGVuZHMgR3JvdXB7XHJcbn1cdFxyXG4iXX0=