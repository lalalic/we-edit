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

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _html = require("./html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = null,
    ctx2d = null;
var DEFAULT_STYLE = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

var CanvasWordWrapper = function (_WordWrapper) {
				(0, _inherits3.default)(CanvasWordWrapper, _WordWrapper);

				function CanvasWordWrapper() {
								(0, _classCallCheck3.default)(this, CanvasWordWrapper);
								return (0, _possibleConstructorReturn3.default)(this, (CanvasWordWrapper.__proto__ || (0, _getPrototypeOf2.default)(CanvasWordWrapper)).apply(this, arguments));
				}

				(0, _createClass3.default)(CanvasWordWrapper, [{
								key: "lineHeight",
								value: function lineHeight() {
												if (!ctx2d) {
																canvas = document.createElement('canvas');
																document.body.appendChild(canvas);
																canvas.style = "";
																ctx2d = canvas.getContext('2d');
												}
												ctx2d.font = this.size + "pt " + this.fontFamily;

												return (0, _get3.default)(CanvasWordWrapper.prototype.__proto__ || (0, _getPrototypeOf2.default)(CanvasWordWrapper.prototype), "lineHeight", this).call(this);
								}
				}, {
								key: "stringWidth",
								value: function stringWidth(word) {
												return ctx2d.measureText(word).width;
								}
				}]);
				return CanvasWordWrapper;
}(_html2.default);

exports.default = CanvasWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiY3R4MmQiLCJERUZBVUxUX1NUWUxFIiwiQ2FudmFzV29yZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldENvbnRleHQiLCJmb250Iiwic2l6ZSIsImZvbnRGYW1pbHkiLCJ3b3JkIiwibWVhc3VyZVRleHQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQUlBLFNBQU8sSUFBWDtBQUFBLElBQWlCQyxRQUFNLElBQXZCO0FBQ0EsSUFBSUMsZ0JBQWMsNERBQWxCOztJQUNxQkMsaUI7Ozs7Ozs7Ozs7cUNBQ0w7QUFDZCxnQkFBRyxDQUFDRixLQUFKLEVBQVU7QUFDVEQseUJBQU9JLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUDtBQUNBRCx5QkFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCUCxNQUExQjtBQUNBQSx1QkFBT1EsS0FBUCxHQUFhLEVBQWI7QUFDQVAsd0JBQU1ELE9BQU9TLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBTjtBQUNBO0FBQ0RSLGtCQUFNUyxJQUFOLEdBQWMsS0FBS0MsSUFBbkIsV0FBNkIsS0FBS0MsVUFBbEM7O0FBRU07QUFDSDs7O29DQUVXQyxJLEVBQUs7QUFDYixtQkFBT1osTUFBTWEsV0FBTixDQUFrQkQsSUFBbEIsRUFBd0JFLEtBQS9CO0FBQ0g7Ozs7O2tCQWZnQlosaUIiLCJmaWxlIjoiY2FudmFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuL2h0bWxcIlxyXG5cclxubGV0IGNhbnZhcz1udWxsLCBjdHgyZD1udWxsXHJcbmxldCBERUZBVUxUX1NUWUxFPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcbiAgICBsaW5lSGVpZ2h0KCl7XHJcblx0XHRpZighY3R4MmQpe1xyXG5cdFx0XHRjYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpXHJcblx0XHRcdGNhbnZhcy5zdHlsZT1cIlwiXHJcblx0XHRcdGN0eDJkPWNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblx0XHR9XHJcblx0XHRjdHgyZC5mb250PWAke3RoaXMuc2l6ZX1wdCAke3RoaXMuZm9udEZhbWlseX1gXHJcblxyXG4gICAgICAgIHJldHVybiBzdXBlci5saW5lSGVpZ2h0KClcclxuICAgIH1cclxuXHJcbiAgICBzdHJpbmdXaWR0aCh3b3JkKXtcclxuICAgICAgICByZXR1cm4gY3R4MmQubWVhc3VyZVRleHQod29yZCkud2lkdGhcclxuICAgIH1cclxufVxyXG4iXX0=