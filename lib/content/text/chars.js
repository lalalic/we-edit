"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4, _class5, _temp5;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.category = category;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("../any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Char = function (_Component) {
	_inherits(Char, _Component);

	function Char() {
		_classCallCheck(this, Char);

		return _possibleConstructorReturn(this, (Char.__proto__ || Object.getPrototypeOf(Char)).apply(this, arguments));
	}

	_createClass(Char, [{
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
	_inherits(Letter, _Char);

	function Letter() {
		_classCallCheck(this, Letter);

		return _possibleConstructorReturn(this, (Letter.__proto__ || Object.getPrototypeOf(Letter)).apply(this, arguments));
	}

	_createClass(Letter, null, [{
		key: "is",
		value: function is() {
			return true;
		}
	}]);

	return Letter;
}(Char), _class.displayName = "letter", _temp), (_temp2 = _class2 = function (_Char2) {
	_inherits(Whitespace, _Char2);

	function Whitespace() {
		_classCallCheck(this, Whitespace);

		return _possibleConstructorReturn(this, (Whitespace.__proto__ || Object.getPrototypeOf(Whitespace)).apply(this, arguments));
	}

	_createClass(Whitespace, null, [{
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
	_inherits(Number, _Char3);

	function Number() {
		_classCallCheck(this, Number);

		return _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).apply(this, arguments));
	}

	_createClass(Number, null, [{
		key: "is",
		value: function is(a) {
			return REG_NUMBER.test(a);
		}
	}]);

	return Number;
}(Char), _class3.displayName = "number", _temp3), (_temp4 = _class4 = function (_Char4) {
	_inherits(Punctuation, _Char4);

	function Punctuation() {
		_classCallCheck(this, Punctuation);

		return _possibleConstructorReturn(this, (Punctuation.__proto__ || Object.getPrototypeOf(Punctuation)).apply(this, arguments));
	}

	_createClass(Punctuation, null, [{
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
	_inherits(BeginingSymbol, _Char5);

	function BeginingSymbol() {
		_classCallCheck(this, BeginingSymbol);

		return _possibleConstructorReturn(this, (BeginingSymbol.__proto__ || Object.getPrototypeOf(BeginingSymbol)).apply(this, arguments));
	}

	_createClass(BeginingSymbol, null, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RleHQvY2hhcnMuanMiXSwibmFtZXMiOlsiY2F0ZWdvcnkiLCJDaGFyIiwidHlwZSIsIlJFR19XSElURVNQQUNFIiwiUkVHX05VTUJFUiIsIlRZUEVTIiwiZGlzcGxheU5hbWUiLCJhIiwidGVzdCIsInJldmVyc2UiLCJjIiwibGFzdCIsImZpbmQiLCJpcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztRQW9GZ0JBLFEsR0FBQUEsUTs7QUFwRmhCOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFTUMsSTs7Ozs7Ozs7Ozs7NEJBQ0ksQ0FFUjs7OzJCQUVPO0FBQ1AsVUFBTyxJQUFQO0FBQ0E7Ozt1QkFFVTtBQUNWLFVBQU8sS0FBUDtBQUNBOzs7K0JBRWtCO0FBQ2xCLFVBQU8sS0FBUDtBQUNBOzs7a0NBRXNCQyxJLEVBQUs7QUFDM0IsVUFBTyxTQUFPQSxJQUFkO0FBQ0E7OztpQ0FFb0I7QUFDcEIsVUFBTyxJQUFQO0FBQ0E7Ozs7OztBQUlGLElBQU1DLGlCQUFlLHFFQUFyQjtBQUNBLElBQU1DLGFBQVcsT0FBakI7QUFDQSxJQUFNQyxRQUFNO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1QkFJQztBQUNWLFVBQU8sSUFBUDtBQUNBO0FBTlM7O0FBQUE7QUFBQSxFQUNXSixJQURYLFVBRUhLLFdBRkcsR0FFUyxRQUZUO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFZQUMsQ0FaQSxFQVlFO0FBQ1gsVUFBT0osZUFBZUssSUFBZixDQUFvQkQsQ0FBcEIsQ0FBUDtBQUNBO0FBZFM7QUFBQTtBQUFBLCtCQWdCUztBQUNsQixVQUFPLElBQVA7QUFDQTtBQWxCUzs7QUFBQTtBQUFBLEVBU2VOLElBVGYsV0FVSEssV0FWRyxHQVVTLFlBVlQ7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQXdCQUMsQ0F4QkEsRUF3QkU7QUFDWCxVQUFPSCxXQUFXSSxJQUFYLENBQWdCRCxDQUFoQixDQUFQO0FBQ0E7QUExQlM7O0FBQUE7QUFBQSxFQXFCV04sSUFyQlgsV0FzQkhLLFdBdEJHLEdBc0JTLFFBdEJUO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkErQkFDLENBL0JBLEVBK0JFO0FBQ1gsVUFBT0EsTUFBSSxHQUFKLElBQVdBLE1BQUksR0FBZixJQUFzQkEsTUFBSSxHQUFqQztBQUNBO0FBakNTO0FBQUE7QUFBQSwrQkFtQ1M7QUFDbEIsVUFBTyxJQUFQO0FBQ0E7QUFyQ1M7O0FBQUE7QUFBQSxFQTRCZ0JOLElBNUJoQixXQTZCSEssV0E3QkcsR0E2QlMsYUE3QlQ7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFCQTBDQUMsQ0ExQ0EsRUEwQ0U7QUFDWCxVQUFPQSxNQUFJLEdBQUosSUFBV0EsTUFBSSxHQUFmLElBQXNCQSxNQUFJLEdBQTFCLElBQWlDQSxNQUFJLEdBQTVDO0FBQ0E7QUE1Q1M7QUFBQTtBQUFBLGlDQThDVztBQUNwQixVQUFPLEtBQVA7QUFDQTtBQWhEUzs7QUFBQTtBQUFBLEVBdUNtQk4sSUF2Q25CLFdBd0NISyxXQXhDRyxHQXdDUyxnQkF4Q1QsV0FrRFZHLE9BbERVLEVBQVo7O0FBb0RPLFNBQVNULFFBQVQsQ0FBa0JVLENBQWxCLEVBQW9CQyxJQUFwQixFQUF5QjtBQUMvQixRQUFPTixNQUFNTyxJQUFOLENBQVc7QUFBQSxTQUFHTCxFQUFFTSxFQUFGLENBQUtILENBQUwsQ0FBSDtBQUFBLEVBQVgsQ0FBUDtBQUNBIiwiZmlsZSI6ImNoYXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuLi9hbnlcIlxyXG5cclxuY2xhc3MgQ2hhciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb3NlKCl7XHJcblxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlzKCl7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhYmxlRXhjZWVkKCl7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjYW5TZXBlcmF0ZVdpdGgodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcyE9PXR5cGVcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjYW5BdExpbmVFbmQoKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG59XHJcblxyXG5cclxuY29uc3QgUkVHX1dISVRFU1BBQ0U9L1xccy91XHJcbmNvbnN0IFJFR19OVU1CRVI9L1swLTldL1xyXG5jb25zdCBUWVBFUz1bXHJcblx0IGNsYXNzIExldHRlciBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJsZXR0ZXJcIlxyXG5cclxuXHRcdHN0YXRpYyBpcygpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LGNsYXNzIFdoaXRlc3BhY2UgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwid2hpdGVzcGFjZVwiXHJcblxyXG5cdFx0c3RhdGljIGlzKGEpe1xyXG5cdFx0XHRyZXR1cm4gUkVHX1dISVRFU1BBQ0UudGVzdChhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBhYmxlRXhjZWVkKCl7XHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQsY2xhc3MgTnVtYmVyIGV4dGVuZHMgQ2hhcntcclxuXHRcdHN0YXRpYyBkaXNwbGF5TmFtZT1cIm51bWJlclwiXHJcblxyXG5cdFx0c3RhdGljIGlzKGEpe1xyXG5cdFx0XHRyZXR1cm4gUkVHX05VTUJFUi50ZXN0KGEpXHJcblx0XHR9XHJcblx0fVxyXG5cdCxjbGFzcyBQdW5jdHVhdGlvbiBleHRlbmRzIENoYXJ7XHJcblx0XHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwdW5jdHVhdGlvblwiXHJcblxyXG5cdFx0c3RhdGljIGlzKGEpe1xyXG5cdFx0XHRyZXR1cm4gYT09PScsJyB8fCBhPT09Jy4nIHx8IGE9PT0nISdcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgYWJsZUV4Y2VlZCgpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsY2xhc3MgQmVnaW5pbmdTeW1ib2wgZXh0ZW5kcyBDaGFye1xyXG5cdFx0c3RhdGljIGRpc3BsYXlOYW1lPVwiYmVnaW5pbmdTeW1ib2xcIlxyXG5cclxuXHRcdHN0YXRpYyBpcyhhKXtcclxuXHRcdFx0cmV0dXJuIGE9PT0nKCcgfHwgYT09PSd7JyB8fCBhPT09JzwnIHx8IGE9PT0nWydcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgY2FuQXRMaW5lRW5kKCl7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0fVxyXG5cdH1cclxuXS5yZXZlcnNlKClcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYXRlZ29yeShjLGxhc3Qpe1xyXG5cdHJldHVybiBUWVBFUy5maW5kKGE9PmEuaXMoYykpXHJcbn1cclxuIl19