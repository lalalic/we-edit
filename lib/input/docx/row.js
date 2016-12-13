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

var _row = require("../../content/row");

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Row) {
	(0, _inherits3.default)(_class, _Row);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "getHeaderColCount",
		value: function getHeaderColCount() {
			var _ref = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref.firstColumn;

			if (firstColumn == "0") return 0;
			return 1;
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			return this.props.directStyle;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref2.firstColumn,
			    lastColumn = _ref2.lastColumn,
			    noVBand = _ref2.noVBand;

			return (0, _extends3.default)({}, (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "getChildContext", this).call(this), {
				rowStyle: this.getStyle(),
				isFirstCol: function isFirstCol() {
					return firstColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isFirstColAbsolute();
				},
				isFirstColAbsolute: function isFirstColAbsolute() {
					return self.computed.children.length == 0;
				},
				isLastCol: function isLastCol() {
					return lastColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isLastColAbsolute();
				},
				isLastColAbsolute: function isLastColAbsolute() {
					return self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Vert: function isBand1Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 1;
				},
				isBand2Vert: function isBand2Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 0;
				},
				isSeCell: function isSeCell() {
					return this.isLastRowAbsolute() && this.isLastColAbsolute();
				},
				isSwCell: function isSwCell() {
					return this.isLastRowAbsolute() && this.isFirstColAbsolute();
				},
				isNeCell: function isNeCell() {
					return this.isFirstRowAbsolute() && this.isLastColAbsolute();
				},
				isNwCell: function isNwCell() {
					return this.isFirstRowAbsolute() && this.isFirstColAbsolute();
				}
			});
		}
	}]);
	return _class;
}(_row2.default);

_class.contextTypes = (0, _extends3.default)({}, _row2.default.contextTypes, {
	tableStyle: _react.PropTypes.object
});
_class.childContextTypes = (0, _extends3.default)({}, _row2.default.childContextTypes, {
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isFirstColAbsolute: _react.PropTypes.func,
	isLastColAbsolute: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func
});
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3Jvdy5qcyJdLCJuYW1lcyI6WyJjb250ZXh0IiwidGFibGVTdHlsZSIsImdldCIsImZpcnN0Q29sdW1uIiwicHJvcHMiLCJkaXJlY3RTdHlsZSIsInNlbGYiLCJsYXN0Q29sdW1uIiwibm9WQmFuZCIsInJvd1N0eWxlIiwiZ2V0U3R5bGUiLCJpc0ZpcnN0Q29sIiwiaXNGaXJzdFJvdyIsImlzTGFzdFJvdyIsImlzRmlyc3RDb2xBYnNvbHV0ZSIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJpc0xhc3RDb2wiLCJpc0xhc3RDb2xBYnNvbHV0ZSIsImdldENvbnRlbnRDb3VudCIsImlzQmFuZDFWZXJ0IiwiZ2V0SGVhZGVyQ29sQ291bnQiLCJpc0JhbmQyVmVydCIsImlzU2VDZWxsIiwiaXNMYXN0Um93QWJzb2x1dGUiLCJpc1N3Q2VsbCIsImlzTmVDZWxsIiwiaXNGaXJzdFJvd0Fic29sdXRlIiwiaXNOd0NlbGwiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJjaGlsZENvbnRleHRUeXBlcyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O3NDQVF1QjtBQUFBLGNBQ0ssS0FBS0EsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QixLQUErQyxFQURwRDtBQUFBLE9BQ1JDLFdBRFEsUUFDUkEsV0FEUTs7QUFFZixPQUFHQSxlQUFhLEdBQWhCLEVBQ0ksT0FBTyxDQUFQO0FBQ0osVUFBTyxDQUFQO0FBQ0g7Ozs2QkFFUztBQUNOLFVBQU8sS0FBS0MsS0FBTCxDQUFXQyxXQUFsQjtBQUNIOzs7b0NBaUJnQjtBQUNiLE9BQU1DLE9BQUssSUFBWDs7QUFEYSxlQUU0QixLQUFLTixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLEdBQXhCLENBQTRCLGVBQTVCLEtBQThDLEVBRjFFO0FBQUEsT0FFTkMsV0FGTSxTQUVOQSxXQUZNO0FBQUEsT0FFT0ksVUFGUCxTQUVPQSxVQUZQO0FBQUEsT0FFbUJDLE9BRm5CLFNBRW1CQSxPQUZuQjs7QUFHYjtBQUVJQyxjQUFVLEtBQUtDLFFBQUwsRUFGZDtBQUdJQyxjQUhKLHdCQUdnQjtBQUNwQixZQUFPUixlQUFhLEdBQWIsSUFBb0IsQ0FBQyxLQUFLUyxVQUFMLEVBQXJCLElBQ0gsQ0FBQyxLQUFLQyxTQUFMLEVBREUsSUFFSCxLQUFLQyxrQkFBTCxFQUZKO0FBSUEsS0FSSTtBQVNMQSxzQkFUSyxnQ0FTZTtBQUNuQixZQUFPUixLQUFLUyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQXRDO0FBQ0EsS0FYSTtBQVlMQyxhQVpLLHVCQVlNO0FBQ1YsWUFBT1gsY0FBWSxHQUFaLElBQW1CLENBQUMsS0FBS0ssVUFBTCxFQUFwQixJQUNILENBQUMsS0FBS0MsU0FBTCxFQURFLElBRUgsS0FBS00saUJBQUwsRUFGSjtBQUdBLEtBaEJJO0FBaUJMQSxxQkFqQkssK0JBaUJjO0FBQ2xCLFlBQU9iLEtBQUtTLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0JYLEtBQUtjLGVBQUwsS0FBdUIsQ0FBN0Q7QUFDQSxLQW5CSTtBQW9CTEMsZUFwQksseUJBb0JRO0FBQ1osWUFBT2IsV0FBUyxHQUFULElBQWdCLENBQUMsS0FBS0csVUFBTCxFQUFqQixJQUNILENBQUMsS0FBS08sU0FBTCxFQURFLElBRUgsQ0FBQ1osS0FBS1MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUF2QixHQUE4QlgsS0FBS2dCLGlCQUFMLEVBQS9CLElBQXlELENBQXpELElBQTRELENBRmhFO0FBR0EsS0F4Qkk7QUF5QkxDLGVBekJLLHlCQXlCUTtBQUNaLFlBQU9mLFdBQVMsR0FBVCxJQUFnQixDQUFDLEtBQUtHLFVBQUwsRUFBakIsSUFDSCxDQUFDLEtBQUtPLFNBQUwsRUFERSxJQUVILENBQUNaLEtBQUtTLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsR0FBOEJYLEtBQUtnQixpQkFBTCxFQUEvQixJQUF5RCxDQUF6RCxJQUE0RCxDQUZoRTtBQUdBLEtBN0JJO0FBOEJMRSxZQTlCSyxzQkE4Qks7QUFDVCxZQUFPLEtBQUtDLGlCQUFMLE1BQTRCLEtBQUtOLGlCQUFMLEVBQW5DO0FBQ0EsS0FoQ0k7QUFpQ0xPLFlBakNLLHNCQWlDSztBQUNULFlBQU8sS0FBS0QsaUJBQUwsTUFBNEIsS0FBS1gsa0JBQUwsRUFBbkM7QUFDQSxLQW5DSTtBQW9DTGEsWUFwQ0ssc0JBb0NLO0FBQ1QsWUFBTyxLQUFLQyxrQkFBTCxNQUE4QixLQUFLVCxpQkFBTCxFQUFyQztBQUNBLEtBdENJO0FBdUNMVSxZQXZDSyxzQkF1Q0s7QUFDVCxZQUFPLEtBQUtELGtCQUFMLE1BQTZCLEtBQUtkLGtCQUFMLEVBQXBDO0FBQ0E7QUF6Q0k7QUEyQ0g7Ozs7O09BN0VNZ0IsWSw4QkFDQSxjQUFJQSxZO0FBQ1A3QixhQUFZLGlCQUFVOEI7O09BY25CQyxpQiw4QkFDQSxjQUFJQSxpQjtBQUNQdkIsV0FBVSxpQkFBVXNCLE07QUFDcEJwQixhQUFZLGlCQUFVc0IsSTtBQUN0QmYsWUFBVyxpQkFBVWUsSTtBQUNyQm5CLHFCQUFvQixpQkFBVW1CLEk7QUFDOUJkLG9CQUFtQixpQkFBVWMsSTtBQUM3QlosY0FBYSxpQkFBVVksSTtBQUN2QlYsY0FBYSxpQkFBVVUsSTtBQUN2QlQsV0FBVSxpQkFBVVMsSTtBQUNwQlAsV0FBVSxpQkFBVU8sSTtBQUNwQk4sV0FBVSxpQkFBVU0sSTtBQUNwQkosV0FBVSxpQkFBVUkiLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgUm93IGZyb20gXCIuLi8uLi9jb250ZW50L3Jvd1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUm93e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICAuLi5Sb3cuY29udGV4dFR5cGVzLFxuICAgICAgICB0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgZ2V0SGVhZGVyQ29sQ291bnQoKXtcbiAgICAgICAgY29uc3Qge2ZpcnN0Q29sdW1ufT10aGlzLmNvbnRleHQudGFibGVTdHlsZS5nZXQoJ3RibFByLnRibExvb2snKSB8fHt9XG4gICAgICAgIGlmKGZpcnN0Q29sdW1uPT1cIjBcIilcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIHJldHVybiAxXG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGlyZWN0U3R5bGVcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuICAgICAgICAuLi5Sb3cuY2hpbGRDb250ZXh0VHlwZXMsXG4gICAgICAgIHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBpc0ZpcnN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaXNMYXN0Q29sOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaXNGaXJzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaXNMYXN0Q29sQWJzb2x1dGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpc0JhbmQxVmVydDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlzQmFuZDJWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaXNTZUNlbGw6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICBpc1N3Q2VsbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGlzTmVDZWxsOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgaXNOd0NlbGw6IFByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHNlbGY9dGhpc1xuICAgICAgICBjb25zdCB7Zmlyc3RDb2x1bW4sIGxhc3RDb2x1bW4sIG5vVkJhbmR9PXRoaXMuY29udGV4dC50YWJsZVN0eWxlLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCksXG4gICAgICAgICAgICByb3dTdHlsZTogdGhpcy5nZXRTdHlsZSgpLFxuICAgICAgICAgICAgaXNGaXJzdENvbCgpe1xuXHRcdFx0XHRyZXR1cm4gZmlyc3RDb2x1bW49PVwiMVwiICYmICF0aGlzLmlzRmlyc3RSb3coKVxuXHRcdFx0XHRcdCYmICF0aGlzLmlzTGFzdFJvdygpXG5cdFx0XHRcdFx0JiYgdGhpcy5pc0ZpcnN0Q29sQWJzb2x1dGUoKVxuXG5cdFx0XHR9LFxuXHRcdFx0aXNGaXJzdENvbEFic29sdXRlKCl7XG5cdFx0XHRcdHJldHVybiBzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aD09MFxuXHRcdFx0fSxcblx0XHRcdGlzTGFzdENvbCgpe1xuXHRcdFx0XHRyZXR1cm4gbGFzdENvbHVtbj09XCIxXCIgJiYgIXRoaXMuaXNGaXJzdFJvdygpXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNMYXN0Um93KClcblx0XHRcdFx0XHQmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc0xhc3RDb2xBYnNvbHV0ZSgpe1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PXNlbGYuZ2V0Q29udGVudENvdW50KCktMVxuXHRcdFx0fSxcblx0XHRcdGlzQmFuZDFWZXJ0KCl7XG5cdFx0XHRcdHJldHVybiBub1ZCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Q29sKClcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RDb2woKVxuXHRcdFx0XHRcdCYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlckNvbENvdW50KCkpJTI9PTFcblx0XHRcdH0sXG5cdFx0XHRpc0JhbmQyVmVydCgpe1xuXHRcdFx0XHRyZXR1cm4gbm9WQmFuZD09XCIwXCIgJiYgIXRoaXMuaXNGaXJzdENvbCgpXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNMYXN0Q29sKClcblx0XHRcdFx0XHQmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJDb2xDb3VudCgpKSUyPT0wXG5cdFx0XHR9LFxuXHRcdFx0aXNTZUNlbGwoKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKSAmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc1N3Q2VsbCgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0xhc3RSb3dBYnNvbHV0ZSgpICYmIHRoaXMuaXNGaXJzdENvbEFic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc05lQ2VsbCgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0ZpcnN0Um93QWJzb2x1dGUoKSAgJiYgdGhpcy5pc0xhc3RDb2xBYnNvbHV0ZSgpXG5cdFx0XHR9LFxuXHRcdFx0aXNOd0NlbGwoKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKCkgJiYgdGhpcy5pc0ZpcnN0Q29sQWJzb2x1dGUoKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxufVxuIl19