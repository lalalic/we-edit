"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uuid = require("../tools/uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
	function _class() {
		(0, _classCallCheck3.default)(this, _class);
	}

	(0, _createClass3.default)(_class, [{
		key: "load",
		value: function load() {
			return _promise2.default.resolve({});
		}
	}, {
		key: "createElement",
		value: function createElement(type, props, children) {
			var id = (0, _uuid.uuid)();
			return _react2.default.createElement(type, (0, _extends3.default)({}, props, { id: id, key: id }), children);
		}
	}], [{
		key: "support",
		value: function support() {
			return false;
		}
	}]);
	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9iYXNlLmpzIl0sIm5hbWVzIjpbInJlc29sdmUiLCJ0eXBlIiwicHJvcHMiLCJjaGlsZHJlbiIsImlkIiwiY3JlYXRlRWxlbWVudCIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7O3lCQU9PO0FBQ0wsVUFBTyxrQkFBUUEsT0FBUixDQUFnQixFQUFoQixDQUFQO0FBQ0E7OztnQ0FFYUMsSSxFQUFNQyxLLEVBQU9DLFEsRUFBUztBQUNuQyxPQUFJQyxLQUFHLGlCQUFQO0FBQ0EsVUFBTyxnQkFBTUMsYUFBTixDQUFvQkosSUFBcEIsNkJBQThCQyxLQUE5QixJQUFxQ0UsTUFBckMsRUFBeUNFLEtBQUlGLEVBQTdDLEtBQWtERCxRQUFsRCxDQUFQO0FBQ0E7Ozs0QkFYZTtBQUNmLFVBQU8sS0FBUDtBQUNBIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7dXVpZH0gZnJvbSBcIi4uL3Rvb2xzL3V1aWRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0c3RhdGljIHN1cHBvcnQoKXtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0bG9hZCgpe1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh7fSlcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGNoaWxkcmVuKXtcclxuXHRcdGxldCBpZD11dWlkKClcclxuXHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHR5cGUsIHsuLi5wcm9wcywgaWQsIGtleTppZH0sIGNoaWxkcmVuKVxyXG5cdH1cclxufVxyXG4iXX0=