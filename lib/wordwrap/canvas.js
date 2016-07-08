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

								return _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasWordWrapper).apply(this, arguments));
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
												ctx2d.font = this.size + "px " + this.fontFamily;

												return _get(Object.getPrototypeOf(CanvasWordWrapper.prototype), "lineHeight", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sSUFBUDtJQUFhLFFBQU0sSUFBTjtBQUNqQixJQUFJLGdCQUFjLDREQUFkOztJQUNpQjs7Ozs7Ozs7Ozs7cUNBQ0w7QUFDZCxnQkFBRyxDQUFDLEtBQUQsRUFBTztBQUNULHlCQUFPLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFQLENBRFM7QUFFVCx5QkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQUZTO0FBR1QsdUJBQU8sS0FBUCxHQUFhLEVBQWIsQ0FIUztBQUlULHdCQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFOLENBSlM7YUFBVjtBQU1BLGtCQUFNLElBQU4sR0FBYyxLQUFLLElBQUwsV0FBZSxLQUFLLFVBQUwsQ0FQZjs7QUFTUiw4Q0FWYSw0REFVYixDQVRROzs7O29DQVlBLE1BQUs7QUFDYixtQkFBTyxNQUFNLFdBQU4sQ0FBa0IsSUFBbEIsRUFBd0IsS0FBeEIsQ0FETTs7OztXQWJBIiwiZmlsZSI6ImNhbnZhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9odG1sXCJcblxubGV0IGNhbnZhcz1udWxsLCBjdHgyZD1udWxsXG5sZXQgREVGQVVMVF9TVFlMRT1cIm1hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMDAwcHhcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcbiAgICBsaW5lSGVpZ2h0KCl7XG5cdFx0aWYoIWN0eDJkKXtcblx0XHRcdGNhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpXG5cdFx0XHRjYW52YXMuc3R5bGU9XCJcIlxuXHRcdFx0Y3R4MmQ9Y2FudmFzLmdldENvbnRleHQoJzJkJylcblx0XHR9XG5cdFx0Y3R4MmQuZm9udD1gJHt0aGlzLnNpemV9cHggJHt0aGlzLmZvbnRGYW1pbHl9YFxuXG4gICAgICAgIHJldHVybiBzdXBlci5saW5lSGVpZ2h0KClcbiAgICB9XG5cbiAgICBzdHJpbmdXaWR0aCh3b3JkKXtcbiAgICAgICAgcmV0dXJuIGN0eDJkLm1lYXN1cmVUZXh0KHdvcmQpLndpZHRoXG4gICAgfVxufVxuIl19