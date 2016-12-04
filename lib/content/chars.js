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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NoYXJzLmpzIl0sIm5hbWVzIjpbImNhdGVnb3J5IiwiaXNDaGFyIiwiaXNXaGl0ZXNwYWNlIiwiaXNQdW5jdHVhdGlvbiIsImlzQmVnaW5uaW5nU3ltYm9sIiwiQ2hhciIsInR5cGUiLCJSRUdfV0hJVEVTUEFDRSIsIlJFR19OVU1CRVIiLCJUWVBFUyIsImRpc3BsYXlOYW1lIiwiYSIsInRlc3QiLCJyZXZlcnNlIiwiYyIsImxhc3QiLCJmaW5kIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxRWdCQSxRLEdBQUFBLFE7UUFJQUMsTSxHQUFBQSxNO1FBSUFDLFksR0FBQUEsWTtRQUlBQyxhLEdBQUFBLGE7UUFJQUMsaUIsR0FBQUEsaUI7O0FBckZoQjs7OztBQUNBOzs7O0lBRU1DLEk7Ozs7Ozs7Ozs7NEJBQ0ksQ0FFUjs7OzJCQUVPO0FBQ1AsVUFBTyxJQUFQO0FBQ0E7Ozt1QkFFVTtBQUNWLFVBQU8sS0FBUDtBQUNBOzs7K0JBRWtCO0FBQ2xCLFVBQU8sS0FBUDtBQUNBOzs7a0NBRXNCQyxJLEVBQUs7QUFDM0IsVUFBTyxTQUFPQSxJQUFkO0FBQ0E7Ozs7O0FBSUYsSUFBTUMsaUJBQWUscUVBQXJCO0FBQ0EsSUFBTUMsYUFBVyxPQUFqQjtBQUNBLElBQU1DLFFBQU07QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUJBSUM7QUFDVixVQUFPLElBQVA7QUFDQTtBQU5TO0FBQUE7QUFBQSxFQUNXSixJQURYLFVBRUhLLFdBRkcsR0FFUyxRQUZUO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQVlBQyxDQVpBLEVBWUU7QUFDWCxVQUFPSixlQUFlSyxJQUFmLENBQW9CRCxDQUFwQixDQUFQO0FBQ0E7QUFkUztBQUFBO0FBQUEsK0JBZ0JTO0FBQ2xCLFVBQU8sSUFBUDtBQUNBO0FBbEJTO0FBQUE7QUFBQSxFQVNlTixJQVRmLFdBVUhLLFdBVkcsR0FVUyxZQVZUO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQXdCQUMsQ0F4QkEsRUF3QkU7QUFDWCxVQUFPSCxXQUFXSSxJQUFYLENBQWdCRCxDQUFoQixDQUFQO0FBQ0E7QUExQlM7QUFBQTtBQUFBLEVBcUJXTixJQXJCWCxXQXNCSEssV0F0QkcsR0FzQlMsUUF0QlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBK0JBQyxDQS9CQSxFQStCRTtBQUNYLFVBQU9BLE1BQUksR0FBSixJQUFXQSxNQUFJLEdBQWYsSUFBc0JBLE1BQUksR0FBakM7QUFDQTtBQWpDUztBQUFBO0FBQUEsK0JBbUNTO0FBQ2xCLFVBQU8sSUFBUDtBQUNBO0FBckNTO0FBQUE7QUFBQSxFQTRCZ0JOLElBNUJoQixXQTZCSEssV0E3QkcsR0E2QlMsYUE3QlQsV0F1Q1ZHLE9BdkNVLEVBQVo7O0FBeUNPLFNBQVNiLFFBQVQsQ0FBa0JjLENBQWxCLEVBQW9CQyxJQUFwQixFQUF5QjtBQUMvQixRQUFPTixNQUFNTyxJQUFOLENBQVc7QUFBQSxTQUFHTCxFQUFFTSxFQUFGLENBQUtILENBQUwsQ0FBSDtBQUFBLEVBQVgsQ0FBUDtBQUNBOztBQUVNLFNBQVNiLE1BQVQsQ0FBZ0JVLENBQWhCLEVBQWtCO0FBQ3hCLFFBQU8sQ0FBQ1QsYUFBYVMsQ0FBYixDQUFELElBQW9CLENBQUNSLGNBQWNRLENBQWQsQ0FBNUI7QUFDQTs7QUFFTSxTQUFTVCxZQUFULENBQXNCUyxDQUF0QixFQUF3QjtBQUMzQixRQUFPSixlQUFlSyxJQUFmLENBQW9CRCxDQUFwQixDQUFQO0FBQ0g7O0FBRU0sU0FBU1IsYUFBVCxDQUF1QlEsQ0FBdkIsRUFBeUI7QUFDL0IsUUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUFqQztBQUNBOztBQUVNLFNBQVNQLGlCQUFULENBQTJCTyxDQUEzQixFQUE2QjtBQUNuQyxRQUFPQSxNQUFJLEdBQUosSUFBV0EsTUFBSSxHQUFmLElBQXNCQSxNQUFJLEdBQTFCLElBQWlDQSxNQUFJLEdBQTVDO0FBQ0EiLCJmaWxlIjoiY2hhcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5cbmNsYXNzIENoYXIgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbXBvc2UoKXtcblx0XHRcblx0fVxuXHRcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxuXHRcblx0c3RhdGljIGlzKCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdHN0YXRpYyBhYmxlRXhjZWVkKCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdHN0YXRpYyBjYW5TZXBlcmF0ZVdpdGgodHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMhPT10eXBlXG5cdH1cbn1cblxuXG5jb25zdCBSRUdfV0hJVEVTUEFDRT0vXFxzL3VcbmNvbnN0IFJFR19OVU1CRVI9L1swLTldL1xuY29uc3QgVFlQRVM9W1xuXHQgY2xhc3MgTGV0dGVyIGV4dGVuZHMgQ2hhcntcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJsZXR0ZXJcIlxuXHRcdFxuXHRcdHN0YXRpYyBpcygpe1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblx0XG5cdCxjbGFzcyBXaGl0ZXNwYWNlIGV4dGVuZHMgQ2hhcntcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ3aGl0ZXNwYWNlXCJcblx0XHRcblx0XHRzdGF0aWMgaXMoYSl7XG5cdFx0XHRyZXR1cm4gUkVHX1dISVRFU1BBQ0UudGVzdChhKVxuXHRcdH1cblx0XHRcblx0XHRzdGF0aWMgYWJsZUV4Y2VlZCgpe1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblxuXHQsY2xhc3MgTnVtYmVyIGV4dGVuZHMgQ2hhcntcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJudW1iZXJcIlxuXHRcdFxuXHRcdHN0YXRpYyBpcyhhKXtcblx0XHRcdHJldHVybiBSRUdfTlVNQkVSLnRlc3QoYSlcblx0XHR9XG5cdH1cblx0LGNsYXNzIFB1bmN0dWF0aW9uIGV4dGVuZHMgQ2hhcntcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwdW5jdHVhdGlvblwiXG5cdFx0XG5cdFx0c3RhdGljIGlzKGEpe1xuXHRcdFx0cmV0dXJuIGE9PT0nLCcgfHwgYT09PScuJyB8fCBhPT09JyEnXG5cdFx0fVxuXHRcdFxuXHRcdHN0YXRpYyBhYmxlRXhjZWVkKCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXS5yZXZlcnNlKClcblxuZXhwb3J0IGZ1bmN0aW9uIGNhdGVnb3J5KGMsbGFzdCl7XG5cdHJldHVybiBUWVBFUy5maW5kKGE9PmEuaXMoYykpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NoYXIoYSl7XG5cdHJldHVybiAhaXNXaGl0ZXNwYWNlKGEpICYmICFpc1B1bmN0dWF0aW9uKGEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1doaXRlc3BhY2UoYSl7XG4gICAgcmV0dXJuIFJFR19XSElURVNQQUNFLnRlc3QoYSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHVuY3R1YXRpb24oYSl7XG5cdHJldHVybiBhPT09JywnIHx8IGE9PT0nLicgfHwgYT09PSchJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCZWdpbm5pbmdTeW1ib2woYSl7XG5cdHJldHVybiBhPT09JygnIHx8IGE9PT0neycgfHwgYT09PSc8JyB8fCBhPT09J1snXG59XG5cblxuXG4iXX0=