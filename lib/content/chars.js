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
			return _react2.default.createElement(
				"i",
				null,
				this.props.chars.join('')
			);
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

function category(c) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2NoYXJzLmpzIl0sIm5hbWVzIjpbImNhdGVnb3J5IiwiaXNDaGFyIiwiaXNXaGl0ZXNwYWNlIiwiaXNQdW5jdHVhdGlvbiIsImlzQmVnaW5uaW5nU3ltYm9sIiwiQ2hhciIsInByb3BzIiwiY2hhcnMiLCJqb2luIiwiUkVHX1dISVRFU1BBQ0UiLCJSRUdfTlVNQkVSIiwiVFlQRVMiLCJkaXNwbGF5TmFtZSIsImEiLCJ0ZXN0IiwicmV2ZXJzZSIsImMiLCJmaW5kIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpRWdCQSxRLEdBQUFBLFE7UUFJQUMsTSxHQUFBQSxNO1FBSUFDLFksR0FBQUEsWTtRQUlBQyxhLEdBQUFBLGE7UUFJQUMsaUIsR0FBQUEsaUI7O0FBakZoQjs7OztBQUNBOzs7O0lBRU1DLEk7Ozs7Ozs7Ozs7NEJBQ0ksQ0FFUjs7OzJCQUVPO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSSxTQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUJDLElBQWpCLENBQXNCLEVBQXRCO0FBQUosSUFBUDtBQUNBOzs7dUJBRVU7QUFDVixVQUFPLEtBQVA7QUFDQTs7OytCQUVrQjtBQUNsQixVQUFPLEtBQVA7QUFDQTs7Ozs7QUFJRixJQUFNQyxpQkFBZSxxRUFBckI7QUFDQSxJQUFNQyxhQUFXLE9BQWpCO0FBQ0EsSUFBTUMsUUFBTTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1QkFJQztBQUNWLFVBQU8sSUFBUDtBQUNBO0FBTlM7QUFBQTtBQUFBLEVBQ1dOLElBRFgsVUFFSE8sV0FGRyxHQUVTLFFBRlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBWUFDLENBWkEsRUFZRTtBQUNYLFVBQU9KLGVBQWVLLElBQWYsQ0FBb0JELENBQXBCLENBQVA7QUFDQTtBQWRTO0FBQUE7QUFBQSwrQkFnQlM7QUFDbEIsVUFBTyxJQUFQO0FBQ0E7QUFsQlM7QUFBQTtBQUFBLEVBU2VSLElBVGYsV0FVSE8sV0FWRyxHQVVTLFlBVlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBd0JBQyxDQXhCQSxFQXdCRTtBQUNYLFVBQU9ILFdBQVdJLElBQVgsQ0FBZ0JELENBQWhCLENBQVA7QUFDQTtBQTFCUztBQUFBO0FBQUEsRUFxQldSLElBckJYLFdBc0JITyxXQXRCRyxHQXNCUyxRQXRCVDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkErQkFDLENBL0JBLEVBK0JFO0FBQ1gsVUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUFqQztBQUNBO0FBakNTO0FBQUE7QUFBQSwrQkFtQ1M7QUFDbEIsVUFBTyxJQUFQO0FBQ0E7QUFyQ1M7QUFBQTtBQUFBLEVBNEJnQlIsSUE1QmhCLFdBNkJITyxXQTdCRyxHQTZCUyxhQTdCVCxXQXVDVkcsT0F2Q1UsRUFBWjs7QUF5Q08sU0FBU2YsUUFBVCxDQUFrQmdCLENBQWxCLEVBQW9CO0FBQzFCLFFBQU9MLE1BQU1NLElBQU4sQ0FBVztBQUFBLFNBQUdKLEVBQUVLLEVBQUYsQ0FBS0YsQ0FBTCxDQUFIO0FBQUEsRUFBWCxDQUFQO0FBQ0E7O0FBRU0sU0FBU2YsTUFBVCxDQUFnQlksQ0FBaEIsRUFBa0I7QUFDeEIsUUFBTyxDQUFDWCxhQUFhVyxDQUFiLENBQUQsSUFBb0IsQ0FBQ1YsY0FBY1UsQ0FBZCxDQUE1QjtBQUNBOztBQUVNLFNBQVNYLFlBQVQsQ0FBc0JXLENBQXRCLEVBQXdCO0FBQzNCLFFBQU9KLGVBQWVLLElBQWYsQ0FBb0JELENBQXBCLENBQVA7QUFDSDs7QUFFTSxTQUFTVixhQUFULENBQXVCVSxDQUF2QixFQUF5QjtBQUMvQixRQUFPQSxNQUFJLEdBQUosSUFBV0EsTUFBSSxHQUFmLElBQXNCQSxNQUFJLEdBQWpDO0FBQ0E7O0FBRU0sU0FBU1QsaUJBQVQsQ0FBMkJTLENBQTNCLEVBQTZCO0FBQ25DLFFBQU9BLE1BQUksR0FBSixJQUFXQSxNQUFJLEdBQWYsSUFBc0JBLE1BQUksR0FBMUIsSUFBaUNBLE1BQUksR0FBNUM7QUFDQSIsImZpbGUiOiJjaGFycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxyXG5cclxuY2xhc3MgQ2hhciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb3NlKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPGk+e3RoaXMucHJvcHMuY2hhcnMuam9pbignJyl9PC9pPlxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgaXMoKXtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgYWJsZUV4Y2VlZCgpe1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG59XHJcblxyXG5cclxuY29uc3QgUkVHX1dISVRFU1BBQ0U9L1xccy91XHJcbmNvbnN0IFJFR19OVU1CRVI9L1swLTldL1xyXG5jb25zdCBUWVBFUz1bXHJcblx0IGNsYXNzIExldHRlciBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJsZXR0ZXJcIlxyXG5cdFx0XHJcblx0XHRzdGF0aWMgaXMoKXtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LGNsYXNzIFdoaXRlc3BhY2UgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwid2hpdGVzcGFjZVwiXHJcblx0XHRcclxuXHRcdHN0YXRpYyBpcyhhKXtcclxuXHRcdFx0cmV0dXJuIFJFR19XSElURVNQQUNFLnRlc3QoYSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c3RhdGljIGFibGVFeGNlZWQoKXtcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCxjbGFzcyBOdW1iZXIgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwibnVtYmVyXCJcclxuXHRcdFxyXG5cdFx0c3RhdGljIGlzKGEpe1xyXG5cdFx0XHRyZXR1cm4gUkVHX05VTUJFUi50ZXN0KGEpXHJcblx0XHR9XHJcblx0fVxyXG5cdCxjbGFzcyBQdW5jdHVhdGlvbiBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwdW5jdHVhdGlvblwiXHJcblx0XHRcclxuXHRcdHN0YXRpYyBpcyhhKXtcclxuXHRcdFx0cmV0dXJuIGE9PT0nLCcgfHwgYT09PScuJyB8fCBhPT09JyEnXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHN0YXRpYyBhYmxlRXhjZWVkKCl7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblx0fVxyXG5dLnJldmVyc2UoKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhdGVnb3J5KGMpe1xyXG5cdHJldHVybiBUWVBFUy5maW5kKGE9PmEuaXMoYykpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoYXIoYSl7XHJcblx0cmV0dXJuICFpc1doaXRlc3BhY2UoYSkgJiYgIWlzUHVuY3R1YXRpb24oYSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShhKXtcclxuICAgIHJldHVybiBSRUdfV0hJVEVTUEFDRS50ZXN0KGEpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1B1bmN0dWF0aW9uKGEpe1xyXG5cdHJldHVybiBhPT09JywnIHx8IGE9PT0nLicgfHwgYT09PSchJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNCZWdpbm5pbmdTeW1ib2woYSl7XHJcblx0cmV0dXJuIGE9PT0nKCcgfHwgYT09PSd7JyB8fCBhPT09JzwnIHx8IGE9PT0nWydcclxufVxyXG5cclxuXHJcbiJdfQ==