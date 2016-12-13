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

var _styleInheritable = require("./style-inheritable");

var _table = require("../../content/table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */
var StyleInheriTable = (0, _styleInheritable.styleInheritable)(_table2.default);

var _class = function (_StyleInheriTable) {
	(0, _inherits3.default)(_class, _StyleInheriTable);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "getStyle",
		value: function getStyle() {
			return this.props.directStyle || this.defaultStyle;
		}
	}, {
		key: "getHeaderRowCount",
		value: function getHeaderRowCount() {
			var _ref = this.getStyle().get('tblPr.tblLook') || {},
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
			var style = this.getStyle();

			var _ref2 = style.get('tblPr.tblLook') || {},
			    firstRow = _ref2.firstRow,
			    lastRow = _ref2.lastRow,
			    noHBand = _ref2.noHBand;

			return (0, _extends3.default)({}, (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "getChildContext", this).call(this), {
				tableStyle: style,
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
	return _class;
}(StyleInheriTable);

_class.childContextTypes = (0, _extends3.default)({}, StyleInheriTable.childContextTypes, {
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isFirstRowAbsolute: _react.PropTypes.func,
	isLastRowAbsolute: _react.PropTypes.func,
	isBand1Horz: _react.PropTypes.func,
	isBand2Horz: _react.PropTypes.func
});
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3RhYmxlLmpzIl0sIm5hbWVzIjpbIlN0eWxlSW5oZXJpVGFibGUiLCJwcm9wcyIsImRpcmVjdFN0eWxlIiwiZGVmYXVsdFN0eWxlIiwiZ2V0U3R5bGUiLCJnZXQiLCJmaXJzdFJvdyIsIkNoaWxkcmVuIiwidG9BcnJheSIsImNoaWxkcmVuIiwiZmlsdGVyIiwic3R5bGUiLCJhIiwidGJsSGVhZGVyIiwibGVuZ3RoIiwic2VsZiIsImxhc3RSb3ciLCJub0hCYW5kIiwidGFibGVTdHlsZSIsImlzRmlyc3RSb3ciLCJpc0ZpcnN0Um93QWJzb2x1dGUiLCJjb21wdXRlZCIsImlzTGFzdFJvdyIsImlzTGFzdFJvd0Fic29sdXRlIiwiZ2V0Q29udGVudENvdW50IiwiaXNCYW5kMUhvcnoiLCJnZXRIZWFkZXJSb3dDb3VudCIsImlzQmFuZDJIb3J6IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvYmplY3QiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsbUJBQWlCLHdEQUF2Qjs7Ozs7Ozs7Ozs7OzZCQUVjO0FBQ04sVUFBTyxLQUFLQyxLQUFMLENBQVdDLFdBQVgsSUFBd0IsS0FBS0MsWUFBcEM7QUFDSDs7O3NDQUVrQjtBQUFBLGNBQ0osS0FBS0MsUUFBTCxHQUFnQkMsR0FBaEIsQ0FBb0IsZUFBcEIsS0FBc0MsRUFEbEM7QUFBQSxPQUNkQyxRQURjLFFBQ2RBLFFBRGM7O0FBRXJCLE9BQUdBLGFBQVcsR0FBZCxFQUNDLE9BQU8sQ0FBUDs7QUFFRCxVQUFPLGdCQUFNQyxRQUFOLENBQWVDLE9BQWYsQ0FBdUIsS0FBS1AsS0FBTCxDQUFXUSxRQUFsQyxFQUE0Q0MsTUFBNUMsQ0FBbUQsYUFBRztBQUM1RCxRQUFJQyxRQUFNQyxFQUFFWCxLQUFGLENBQVFDLFdBQWxCO0FBQ0EsUUFBR1MsU0FBU0EsTUFBTUUsU0FBbEIsRUFDQyxPQUFPLElBQVA7QUFDRCxXQUFPLEtBQVA7QUFDQSxJQUxNLEVBS0pDLE1BTEg7QUFNQTs7O29DQWFtQjtBQUNiLE9BQU1DLE9BQUssSUFBWDtBQUNBLE9BQU1KLFFBQU0sS0FBS1AsUUFBTCxFQUFaOztBQUZhLGVBR3NCTyxNQUFNTixHQUFOLENBQVUsZUFBVixLQUE0QixFQUhsRDtBQUFBLE9BR05DLFFBSE0sU0FHTkEsUUFITTtBQUFBLE9BR0lVLE9BSEosU0FHSUEsT0FISjtBQUFBLE9BR2FDLE9BSGIsU0FHYUEsT0FIYjs7QUFJYjtBQUVJQyxnQkFBWVAsS0FGaEI7QUFHTFEsY0FISyx3QkFHTztBQUNYLFlBQU9iLFlBQVUsR0FBVixJQUFpQixLQUFLYyxrQkFBTCxFQUF4QjtBQUNBLEtBTEk7QUFNTEEsc0JBTkssZ0NBTWU7QUFDbkIsWUFBT0wsS0FBS00sUUFBTCxDQUFjWixRQUFkLENBQXVCSyxNQUF2QixJQUErQixDQUF0QztBQUNBLEtBUkk7QUFVTFEsYUFWSyx1QkFVTTtBQUNWLFlBQU9OLFdBQVMsR0FBVCxJQUFnQixLQUFLTyxpQkFBTCxFQUF2QjtBQUNBLEtBWkk7QUFjTEEscUJBZEssK0JBY2M7QUFDbEIsWUFBT1IsS0FBS00sUUFBTCxDQUFjWixRQUFkLENBQXVCSyxNQUF2QixJQUErQkMsS0FBS1MsZUFBTCxLQUF1QixDQUE3RDtBQUNBLEtBaEJJO0FBa0JMQyxlQWxCSyx5QkFrQlE7QUFDWixZQUFPUixXQUFTLEdBQVQsSUFBZ0IsQ0FBQyxLQUFLRSxVQUFMLEVBQWpCLElBQXNDLENBQUMsS0FBS0csU0FBTCxFQUF2QyxJQUEyRCxDQUFDUCxLQUFLTSxRQUFMLENBQWNaLFFBQWQsQ0FBdUJLLE1BQXZCLEdBQThCQyxLQUFLVyxpQkFBTCxFQUEvQixJQUF5RCxDQUF6RCxJQUE0RCxDQUE5SDtBQUNBLEtBcEJJO0FBc0JMQyxlQXRCSyx5QkFzQlE7QUFDWixZQUFPVixXQUFTLEdBQVQsSUFBZ0IsQ0FBQyxLQUFLRSxVQUFMLEVBQWpCLElBQXNDLENBQUMsS0FBS0csU0FBTCxFQUF2QyxJQUEyRCxDQUFDUCxLQUFLTSxRQUFMLENBQWNaLFFBQWQsQ0FBdUJLLE1BQXZCLEdBQThCQyxLQUFLVyxpQkFBTCxFQUEvQixJQUF5RCxDQUF6RCxJQUE0RCxDQUE5SDtBQUNBO0FBeEJJO0FBMEJIOzs7RUEzRHdCMUIsZ0I7O09Ba0JsQjRCLGlCLDhCQUNBNUIsaUJBQWlCNEIsaUI7QUFDcEJWLGFBQVksaUJBQVVXLE07QUFDdEJWLGFBQVksaUJBQVVXLEk7QUFDNUJSLFlBQVcsaUJBQVVRLEk7QUFDckJWLHFCQUFvQixpQkFBVVUsSTtBQUM5QlAsb0JBQW1CLGlCQUFVTyxJO0FBQzdCTCxjQUFhLGlCQUFVSyxJO0FBQ3ZCSCxjQUFhLGlCQUFVRyIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9zdHlsZS1pbmhlcml0YWJsZVwiXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4uLy4uL2NvbnRlbnQvdGFibGVcIlxuXG4vKipcbiAqXG4gKlxuICogIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxuICovXG5jb25zdCBTdHlsZUluaGVyaVRhYmxlPXN0eWxlSW5oZXJpdGFibGUoVGFibGUpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFN0eWxlSW5oZXJpVGFibGV7XG4gICAgZ2V0U3R5bGUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGlyZWN0U3R5bGV8fHRoaXMuZGVmYXVsdFN0eWxlXG4gICAgfVxuXG4gICAgZ2V0SGVhZGVyUm93Q291bnQoKXtcblx0XHRjb25zdCB7Zmlyc3RSb3d9PXRoaXMuZ2V0U3R5bGUoKS5nZXQoJ3RibFByLnRibExvb2snKXx8e31cblx0XHRpZihmaXJzdFJvdyE9PVwiMVwiKVxuXHRcdFx0cmV0dXJuIDBcblxuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pLmZpbHRlcihhPT57XG5cdFx0XHRsZXQgc3R5bGU9YS5wcm9wcy5kaXJlY3RTdHlsZVxuXHRcdFx0aWYoc3R5bGUgJiYgc3R5bGUudGJsSGVhZGVyKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fSkubGVuZ3RoXG5cdH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG4gICAgICAgIC4uLlN0eWxlSW5oZXJpVGFibGUuY2hpbGRDb250ZXh0VHlwZXMsXG4gICAgICAgIHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3dBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCBzZWxmPXRoaXNcbiAgICAgICAgY29uc3Qgc3R5bGU9dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGNvbnN0IHtmaXJzdFJvdywgbGFzdFJvdywgbm9IQmFuZH09c3R5bGUuZ2V0KCd0YmxQci50YmxMb29rJyl8fHt9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdXBlci5nZXRDaGlsZENvbnRleHQoKSxcbiAgICAgICAgICAgIHRhYmxlU3R5bGU6IHN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gZmlyc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc0ZpcnN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGxhc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKVxuXHRcdFx0fSxcblxuXHRcdFx0aXNMYXN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcblx0XHRcdH0sXG5cblx0XHRcdGlzQmFuZDFIb3J6KCl7XG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MVxuXHRcdFx0fSxcblxuXHRcdFx0aXNCYW5kMkhvcnooKXtcblx0XHRcdFx0cmV0dXJuIG5vSEJhbmQ9PVwiMFwiICYmICF0aGlzLmlzRmlyc3RSb3coKSAmJiAhdGhpcy5pc0xhc3RSb3coKSAmJiAoc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgtc2VsZi5nZXRIZWFkZXJSb3dDb3VudCgpKSUyPT0wXG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=