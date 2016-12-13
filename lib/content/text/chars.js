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

var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4, _class5, _temp5;

exports.category = category;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("../any");

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
	}, {
		key: "canAtLineEnd",
		value: function canAtLineEnd() {
			return true;
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
}(Char), _class4.displayName = "punctuation", _temp4), (_temp5 = _class5 = function (_Char5) {
	(0, _inherits3.default)(BeginingSymbol, _Char5);

	function BeginingSymbol() {
		(0, _classCallCheck3.default)(this, BeginingSymbol);
		return (0, _possibleConstructorReturn3.default)(this, (BeginingSymbol.__proto__ || (0, _getPrototypeOf2.default)(BeginingSymbol)).apply(this, arguments));
	}

	(0, _createClass3.default)(BeginingSymbol, null, [{
		key: "is",
		value: function is(a) {
			return a === '(' || a === '{' || a === '<' || a === '[';
		}
	}, {
		key: "canAtLineEnd",
		value: function canAtLineEnd() {
			return false;
		}
	}]);
	return BeginingSymbol;
}(Char), _class5.displayName = "beginingSymbol", _temp5)].reverse();

function category(c, last) {
	return TYPES.find(function (a) {
		return a.is(c);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RleHQvY2hhcnMuanMiXSwibmFtZXMiOlsiY2F0ZWdvcnkiLCJDaGFyIiwidHlwZSIsIlJFR19XSElURVNQQUNFIiwiUkVHX05VTUJFUiIsIlRZUEVTIiwiZGlzcGxheU5hbWUiLCJhIiwidGVzdCIsInJldmVyc2UiLCJjIiwibGFzdCIsImZpbmQiLCJpcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW9GZ0JBLFEsR0FBQUEsUTs7QUFwRmhCOzs7O0FBQ0E7Ozs7SUFFTUMsSTs7Ozs7Ozs7Ozs0QkFDSSxDQUVSOzs7MkJBRU87QUFDUCxVQUFPLElBQVA7QUFDQTs7O3VCQUVVO0FBQ1YsVUFBTyxLQUFQO0FBQ0E7OzsrQkFFa0I7QUFDbEIsVUFBTyxLQUFQO0FBQ0E7OztrQ0FFc0JDLEksRUFBSztBQUMzQixVQUFPLFNBQU9BLElBQWQ7QUFDQTs7O2lDQUVvQjtBQUNwQixVQUFPLElBQVA7QUFDQTs7Ozs7QUFJRixJQUFNQyxpQkFBZSxxRUFBckI7QUFDQSxJQUFNQyxhQUFXLE9BQWpCO0FBQ0EsSUFBTUMsUUFBTTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1QkFJQztBQUNWLFVBQU8sSUFBUDtBQUNBO0FBTlM7QUFBQTtBQUFBLEVBQ1dKLElBRFgsVUFFSEssV0FGRyxHQUVTLFFBRlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBWUFDLENBWkEsRUFZRTtBQUNYLFVBQU9KLGVBQWVLLElBQWYsQ0FBb0JELENBQXBCLENBQVA7QUFDQTtBQWRTO0FBQUE7QUFBQSwrQkFnQlM7QUFDbEIsVUFBTyxJQUFQO0FBQ0E7QUFsQlM7QUFBQTtBQUFBLEVBU2VOLElBVGYsV0FVSEssV0FWRyxHQVVTLFlBVlQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUJBd0JBQyxDQXhCQSxFQXdCRTtBQUNYLFVBQU9ILFdBQVdJLElBQVgsQ0FBZ0JELENBQWhCLENBQVA7QUFDQTtBQTFCUztBQUFBO0FBQUEsRUFxQldOLElBckJYLFdBc0JISyxXQXRCRyxHQXNCUyxRQXRCVDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkErQkFDLENBL0JBLEVBK0JFO0FBQ1gsVUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUFqQztBQUNBO0FBakNTO0FBQUE7QUFBQSwrQkFtQ1M7QUFDbEIsVUFBTyxJQUFQO0FBQ0E7QUFyQ1M7QUFBQTtBQUFBLEVBNEJnQk4sSUE1QmhCLFdBNkJISyxXQTdCRyxHQTZCUyxhQTdCVDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkEwQ0FDLENBMUNBLEVBMENFO0FBQ1gsVUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUExQixJQUFpQ0EsTUFBSSxHQUE1QztBQUNBO0FBNUNTO0FBQUE7QUFBQSxpQ0E4Q1c7QUFDcEIsVUFBTyxLQUFQO0FBQ0E7QUFoRFM7QUFBQTtBQUFBLEVBdUNtQk4sSUF2Q25CLFdBd0NISyxXQXhDRyxHQXdDUyxnQkF4Q1QsV0FrRFZHLE9BbERVLEVBQVo7O0FBb0RPLFNBQVNULFFBQVQsQ0FBa0JVLENBQWxCLEVBQW9CQyxJQUFwQixFQUF5QjtBQUMvQixRQUFPTixNQUFNTyxJQUFOLENBQVc7QUFBQSxTQUFHTCxFQUFFTSxFQUFGLENBQUtILENBQUwsQ0FBSDtBQUFBLEVBQVgsQ0FBUDtBQUNBIiwiZmlsZSI6ImNoYXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtOb0NoaWxkfSBmcm9tIFwiLi4vYW55XCJcblxuY2xhc3MgQ2hhciBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9zZSgpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG5cblx0c3RhdGljIGlzKCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHRzdGF0aWMgYWJsZUV4Y2VlZCgpe1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0c3RhdGljIGNhblNlcGVyYXRlV2l0aCh0eXBlKXtcblx0XHRyZXR1cm4gdGhpcyE9PXR5cGVcblx0fVxuXG5cdHN0YXRpYyBjYW5BdExpbmVFbmQoKXtcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG59XG5cblxuY29uc3QgUkVHX1dISVRFU1BBQ0U9L1xccy91XG5jb25zdCBSRUdfTlVNQkVSPS9bMC05XS9cbmNvbnN0IFRZUEVTPVtcblx0IGNsYXNzIExldHRlciBleHRlbmRzIENoYXJ7XG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwibGV0dGVyXCJcblxuXHRcdHN0YXRpYyBpcygpe1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cblxuXHQsY2xhc3MgV2hpdGVzcGFjZSBleHRlbmRzIENoYXJ7XG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwid2hpdGVzcGFjZVwiXG5cblx0XHRzdGF0aWMgaXMoYSl7XG5cdFx0XHRyZXR1cm4gUkVHX1dISVRFU1BBQ0UudGVzdChhKVxuXHRcdH1cblxuXHRcdHN0YXRpYyBhYmxlRXhjZWVkKCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxuXG5cdCxjbGFzcyBOdW1iZXIgZXh0ZW5kcyBDaGFye1xuXHRcdHN0YXRpYyBkaXNwbGF5TmFtZT1cIm51bWJlclwiXG5cblx0XHRzdGF0aWMgaXMoYSl7XG5cdFx0XHRyZXR1cm4gUkVHX05VTUJFUi50ZXN0KGEpXG5cdFx0fVxuXHR9XG5cdCxjbGFzcyBQdW5jdHVhdGlvbiBleHRlbmRzIENoYXJ7XG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwicHVuY3R1YXRpb25cIlxuXG5cdFx0c3RhdGljIGlzKGEpe1xuXHRcdFx0cmV0dXJuIGE9PT0nLCcgfHwgYT09PScuJyB8fCBhPT09JyEnXG5cdFx0fVxuXG5cdFx0c3RhdGljIGFibGVFeGNlZWQoKXtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cdCxjbGFzcyBCZWdpbmluZ1N5bWJvbCBleHRlbmRzIENoYXJ7XG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwiYmVnaW5pbmdTeW1ib2xcIlxuXG5cdFx0c3RhdGljIGlzKGEpe1xuXHRcdFx0cmV0dXJuIGE9PT0nKCcgfHwgYT09PSd7JyB8fCBhPT09JzwnIHx8IGE9PT0nWydcblx0XHR9XG5cblx0XHRzdGF0aWMgY2FuQXRMaW5lRW5kKCl7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH1cbl0ucmV2ZXJzZSgpXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXRlZ29yeShjLGxhc3Qpe1xuXHRyZXR1cm4gVFlQRVMuZmluZChhPT5hLmlzKGMpKVxufVxuIl19