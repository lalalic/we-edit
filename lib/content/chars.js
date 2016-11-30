"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4;

exports.category = category;
exports.isChar = isChar;
exports.isWhitespace = isWhitespace;
exports.isPunctuation = isPunctuation;
exports.isBeginningSymbol = isBeginningSymbol;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Char = function (_Component) {
	(0, _inherits3.default)(Char, _Component);

	function Char() {
		(0, _classCallCheck3.default)(this, Char);
		return (0, _possibleConstructorReturn3.default)(this, (Char.__proto__ || (0, _getPrototypeOf2.default)(Char)).apply(this, arguments));
	}

	(0, _createClass3.default)(Char, [{
		key: "compose",
		value: function compose() {}
	}, {
		key: "render",
		value: function render() {
			return null;
		}
	}], [{
		key: "is",
		value: function is() {
			return false;
		}
	}, {
		key: "ableExceed",
		value: function ableExceed() {
			return false;
		}
	}, {
		key: "canSeperateWith",
		value: function canSeperateWith(type) {
			return this !== type;
		}
	}]);
	return Char;
}(_react.Component);

var REG_WHITESPACE = /[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/;
var REG_NUMBER = /[0-9]/;
var TYPES = [(_temp = _class = function (_Char) {
	(0, _inherits3.default)(Letter, _Char);

	function Letter() {
		(0, _classCallCheck3.default)(this, Letter);
		return (0, _possibleConstructorReturn3.default)(this, (Letter.__proto__ || (0, _getPrototypeOf2.default)(Letter)).apply(this, arguments));
	}

	(0, _createClass3.default)(Letter, null, [{
		key: "is",
		value: function is() {
			return true;
		}
	}]);
	return Letter;
}(Char), _class.displayName = "letter", _temp), (_temp2 = _class2 = function (_Char2) {
	(0, _inherits3.default)(Whitespace, _Char2);

	function Whitespace() {
		(0, _classCallCheck3.default)(this, Whitespace);
		return (0, _possibleConstructorReturn3.default)(this, (Whitespace.__proto__ || (0, _getPrototypeOf2.default)(Whitespace)).apply(this, arguments));
	}

	(0, _createClass3.default)(Whitespace, null, [{
		key: "is",
		value: function is(a) {
			return REG_WHITESPACE.test(a);
		}
	}, {
		key: "ableExceed",
		value: function ableExceed() {
			return true;
		}
	}]);
	return Whitespace;
}(Char), _class2.displayName = "whitespace", _temp2), (_temp3 = _class3 = function (_Char3) {
	(0, _inherits3.default)(Number, _Char3);

	function Number() {
		(0, _classCallCheck3.default)(this, Number);
		return (0, _possibleConstructorReturn3.default)(this, (Number.__proto__ || (0, _getPrototypeOf2.default)(Number)).apply(this, arguments));
	}

	(0, _createClass3.default)(Number, null, [{
		key: "is",
		value: function is(a) {
			return REG_NUMBER.test(a);
		}
	}]);
	return Number;
}(Char), _class3.displayName = "number", _temp3), (_temp4 = _class4 = function (_Char4) {
	(0, _inherits3.default)(Punctuation, _Char4);

	function Punctuation() {
		(0, _classCallCheck3.default)(this, Punctuation);
		return (0, _possibleConstructorReturn3.default)(this, (Punctuation.__proto__ || (0, _getPrototypeOf2.default)(Punctuation)).apply(this, arguments));
	}

	(0, _createClass3.default)(Punctuation, null, [{
		key: "is",
		value: function is(a) {
			return a === ',' || a === '.' || a === '!';
		}
	}, {
		key: "ableExceed",
		value: function ableExceed() {
			return true;
		}
	}]);
	return Punctuation;
}(Char), _class4.displayName = "punctuation", _temp4)].reverse();

function category(c, last) {
	return TYPES.find(function (a) {
		return a.is(c);
	});
}

function isChar(a) {
	return !isWhitespace(a) && !isPunctuation(a);
}

function isWhitespace(a) {
	return REG_WHITESPACE.test(a);
}

function isPunctuation(a) {
	return a === ',' || a === '.' || a === '!';
}

function isBeginningSymbol(a) {
	return a === '(' || a === '{' || a === '<' || a === '[';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NoYXJzLmpzIl0sIm5hbWVzIjpbImNhdGVnb3J5IiwiaXNDaGFyIiwiaXNXaGl0ZXNwYWNlIiwiaXNQdW5jdHVhdGlvbiIsImlzQmVnaW5uaW5nU3ltYm9sIiwiQ2hhciIsInR5cGUiLCJSRUdfV0hJVEVTUEFDRSIsIlJFR19OVU1CRVIiLCJUWVBFUyIsImRpc3BsYXlOYW1lIiwiYSIsInRlc3QiLCJyZXZlcnNlIiwiYyIsImxhc3QiLCJmaW5kIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxRWdCQSxRLEdBQUFBLFE7UUFJQUMsTSxHQUFBQSxNO1FBSUFDLFksR0FBQUEsWTtRQUlBQyxhLEdBQUFBLGE7UUFJQUMsaUIsR0FBQUEsaUI7O0FBckZoQjs7OztBQUNBOzs7O0lBRU1DLEk7Ozs7Ozs7Ozs7NEJBQ0ksQ0FFUjs7OzJCQUVPO0FBQ1AsVUFBTyxJQUFQO0FBQ0E7Ozt1QkFFVTtBQUNWLFVBQU8sS0FBUDtBQUNBOzs7K0JBRWtCO0FBQ2xCLFVBQU8sS0FBUDtBQUNBOzs7a0NBRXNCQyxJLEVBQUs7QUFDM0IsVUFBTyxTQUFPQSxJQUFkO0FBQ0E7Ozs7O0FBSUYsSUFBTUMsaUJBQWUscUVBQXJCO0FBQ0EsSUFBTUMsYUFBVyxPQUFqQjtBQUNBLElBQU1DLFFBQU07QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUJBSUM7QUFDVixVQUFPLElBQVA7QUFDQTtBQU5TO0FBQUE7QUFBQSxFQUNXSixJQURYLFVBRUhLLFdBRkcsR0FFUyxRQUZUO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQVlBQyxDQVpBLEVBWUU7QUFDWCxVQUFPSixlQUFlSyxJQUFmLENBQW9CRCxDQUFwQixDQUFQO0FBQ0E7QUFkUztBQUFBO0FBQUEsK0JBZ0JTO0FBQ2xCLFVBQU8sSUFBUDtBQUNBO0FBbEJTO0FBQUE7QUFBQSxFQVNlTixJQVRmLFdBVUhLLFdBVkcsR0FVUyxZQVZUO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQXdCQUMsQ0F4QkEsRUF3QkU7QUFDWCxVQUFPSCxXQUFXSSxJQUFYLENBQWdCRCxDQUFoQixDQUFQO0FBQ0E7QUExQlM7QUFBQTtBQUFBLEVBcUJXTixJQXJCWCxXQXNCSEssV0F0QkcsR0FzQlMsUUF0QlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBK0JBQyxDQS9CQSxFQStCRTtBQUNYLFVBQU9BLE1BQUksR0FBSixJQUFXQSxNQUFJLEdBQWYsSUFBc0JBLE1BQUksR0FBakM7QUFDQTtBQWpDUztBQUFBO0FBQUEsK0JBbUNTO0FBQ2xCLFVBQU8sSUFBUDtBQUNBO0FBckNTO0FBQUE7QUFBQSxFQTRCZ0JOLElBNUJoQixXQTZCSEssV0E3QkcsR0E2QlMsYUE3QlQsV0F1Q1ZHLE9BdkNVLEVBQVo7O0FBeUNPLFNBQVNiLFFBQVQsQ0FBa0JjLENBQWxCLEVBQW9CQyxJQUFwQixFQUF5QjtBQUMvQixRQUFPTixNQUFNTyxJQUFOLENBQVc7QUFBQSxTQUFHTCxFQUFFTSxFQUFGLENBQUtILENBQUwsQ0FBSDtBQUFBLEVBQVgsQ0FBUDtBQUNBOztBQUVNLFNBQVNiLE1BQVQsQ0FBZ0JVLENBQWhCLEVBQWtCO0FBQ3hCLFFBQU8sQ0FBQ1QsYUFBYVMsQ0FBYixDQUFELElBQW9CLENBQUNSLGNBQWNRLENBQWQsQ0FBNUI7QUFDQTs7QUFFTSxTQUFTVCxZQUFULENBQXNCUyxDQUF0QixFQUF3QjtBQUMzQixRQUFPSixlQUFlSyxJQUFmLENBQW9CRCxDQUFwQixDQUFQO0FBQ0g7O0FBRU0sU0FBU1IsYUFBVCxDQUF1QlEsQ0FBdkIsRUFBeUI7QUFDL0IsUUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUFqQztBQUNBOztBQUVNLFNBQVNQLGlCQUFULENBQTJCTyxDQUEzQixFQUE2QjtBQUNuQyxRQUFPQSxNQUFJLEdBQUosSUFBV0EsTUFBSSxHQUFmLElBQXNCQSxNQUFJLEdBQTFCLElBQWlDQSxNQUFJLEdBQTVDO0FBQ0EiLCJmaWxlIjoiY2hhcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuXHJcbmNsYXNzIENoYXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29tcG9zZSgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGlzKCl7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGFibGVFeGNlZWQoKXtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY2FuU2VwZXJhdGVXaXRoKHR5cGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMhPT10eXBlXHJcblx0fVxyXG59XHJcblxyXG5cclxuY29uc3QgUkVHX1dISVRFU1BBQ0U9L1xccy91XHJcbmNvbnN0IFJFR19OVU1CRVI9L1swLTldL1xyXG5jb25zdCBUWVBFUz1bXHJcblx0IGNsYXNzIExldHRlciBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJsZXR0ZXJcIlxyXG5cdFx0XHJcblx0XHRzdGF0aWMgaXMoKXtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LGNsYXNzIFdoaXRlc3BhY2UgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwid2hpdGVzcGFjZVwiXHJcblx0XHRcclxuXHRcdHN0YXRpYyBpcyhhKXtcclxuXHRcdFx0cmV0dXJuIFJFR19XSElURVNQQUNFLnRlc3QoYSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c3RhdGljIGFibGVFeGNlZWQoKXtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCxjbGFzcyBOdW1iZXIgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwibnVtYmVyXCJcclxuXHRcdFxyXG5cdFx0c3RhdGljIGlzKGEpe1xyXG5cdFx0XHRyZXR1cm4gUkVHX05VTUJFUi50ZXN0KGEpXHJcblx0XHR9XHJcblx0fVxyXG5cdCxjbGFzcyBQdW5jdHVhdGlvbiBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwdW5jdHVhdGlvblwiXHJcblx0XHRcclxuXHRcdHN0YXRpYyBpcyhhKXtcclxuXHRcdFx0cmV0dXJuIGE9PT0nLCcgfHwgYT09PScuJyB8fCBhPT09JyEnXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHN0YXRpYyBhYmxlRXhjZWVkKCl7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblx0fVxyXG5dLnJldmVyc2UoKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhdGVnb3J5KGMsbGFzdCl7XHJcblx0cmV0dXJuIFRZUEVTLmZpbmQoYT0+YS5pcyhjKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhcihhKXtcclxuXHRyZXR1cm4gIWlzV2hpdGVzcGFjZShhKSAmJiAhaXNQdW5jdHVhdGlvbihhKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGEpe1xyXG4gICAgcmV0dXJuIFJFR19XSElURVNQQUNFLnRlc3QoYSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUHVuY3R1YXRpb24oYSl7XHJcblx0cmV0dXJuIGE9PT0nLCcgfHwgYT09PScuJyB8fCBhPT09JyEnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JlZ2lubmluZ1N5bWJvbChhKXtcclxuXHRyZXR1cm4gYT09PScoJyB8fCBhPT09J3snIHx8IGE9PT0nPCcgfHwgYT09PSdbJ1xyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==