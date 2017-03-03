"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _html = require("./html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canvas = null,
    ctx2d = null;
var DEFAULT_STYLE = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

var CanvasWordWrapper = function (_WordWrapper) {
				_inherits(CanvasWordWrapper, _WordWrapper);

				function CanvasWordWrapper() {
								_classCallCheck(this, CanvasWordWrapper);

								return _possibleConstructorReturn(this, (CanvasWordWrapper.__proto__ || Object.getPrototypeOf(CanvasWordWrapper)).apply(this, arguments));
				}

				_createClass(CanvasWordWrapper, [{
								key: "lineHeight",
								value: function lineHeight() {
												if (!ctx2d) {
																canvas = document.createElement('canvas');
																document.body.appendChild(canvas);
																canvas.style = "";
																ctx2d = canvas.getContext('2d');
												}
												ctx2d.font = this.size + "pt " + this.fontFamily;

												return _get(CanvasWordWrapper.prototype.__proto__ || Object.getPrototypeOf(CanvasWordWrapper.prototype), "lineHeight", this).call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOlsiY2FudmFzIiwiY3R4MmQiLCJERUZBVUxUX1NUWUxFIiwiQ2FudmFzV29yZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldENvbnRleHQiLCJmb250Iiwic2l6ZSIsImZvbnRGYW1pbHkiLCJ3b3JkIiwibWVhc3VyZVRleHQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFPLElBQVg7QUFBQSxJQUFpQkMsUUFBTSxJQUF2QjtBQUNBLElBQUlDLGdCQUFjLDREQUFsQjs7SUFDcUJDLGlCOzs7Ozs7Ozs7OztxQ0FDTDtBQUNkLGdCQUFHLENBQUNGLEtBQUosRUFBVTtBQUNURCx5QkFBT0ksU0FBU0MsYUFBVCxDQUF1QixRQUF2QixDQUFQO0FBQ0FELHlCQUFTRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJQLE1BQTFCO0FBQ0FBLHVCQUFPUSxLQUFQLEdBQWEsRUFBYjtBQUNBUCx3QkFBTUQsT0FBT1MsVUFBUCxDQUFrQixJQUFsQixDQUFOO0FBQ0E7QUFDRFIsa0JBQU1TLElBQU4sR0FBYyxLQUFLQyxJQUFuQixXQUE2QixLQUFLQyxVQUFsQzs7QUFFTTtBQUNIOzs7b0NBRVdDLEksRUFBSztBQUNiLG1CQUFPWixNQUFNYSxXQUFOLENBQWtCRCxJQUFsQixFQUF3QkUsS0FBL0I7QUFDSDs7Ozs7O2tCQWZnQlosaUIiLCJmaWxlIjoiY2FudmFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuL2h0bWxcIlxyXG5cclxubGV0IGNhbnZhcz1udWxsLCBjdHgyZD1udWxsXHJcbmxldCBERUZBVUxUX1NUWUxFPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcbiAgICBsaW5lSGVpZ2h0KCl7XHJcblx0XHRpZighY3R4MmQpe1xyXG5cdFx0XHRjYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpXHJcblx0XHRcdGNhbnZhcy5zdHlsZT1cIlwiXHJcblx0XHRcdGN0eDJkPWNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcblx0XHR9XHJcblx0XHRjdHgyZC5mb250PWAke3RoaXMuc2l6ZX1wdCAke3RoaXMuZm9udEZhbWlseX1gXHJcblxyXG4gICAgICAgIHJldHVybiBzdXBlci5saW5lSGVpZ2h0KClcclxuICAgIH1cclxuXHJcbiAgICBzdHJpbmdXaWR0aCh3b3JkKXtcclxuICAgICAgICByZXR1cm4gY3R4MmQubWVhc3VyZVRleHQod29yZCkud2lkdGhcclxuICAgIH1cclxufVxyXG4iXX0=