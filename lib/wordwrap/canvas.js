"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canvas = null,
    ctx2d = null;

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
																canvas.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";
																ctx2d = canvas.getContext('2d');
												}
												canvas.style = "font-family:" + this.fontFamily + ";font-size:" + this.fontSize;
												return ctx2d.measureText("A").height;
								}
				}, {
								key: "stringWidth",
								value: function stringWidth(word) {
												return ctx2d.measureText(word).width;
								}
				}]);

				return CanvasWordWrapper;
}(_2.default);

exports.default = CanvasWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFPLElBQVA7SUFBYSxRQUFNLElBQU47O0lBQ0k7Ozs7Ozs7Ozs7O3FDQUNMO0FBQ2QsZ0JBQUcsQ0FBQyxLQUFELEVBQU87QUFDVCx5QkFBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUCxDQURTO0FBRVQseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFGUztBQUdULHVCQUFPLEtBQVAsR0FBYSw0REFBYixDQUhTO0FBSVQsd0JBQU0sT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQU4sQ0FKUzthQUFWO0FBTUEsbUJBQU8sS0FBUCxvQkFBNEIsS0FBSyxVQUFMLG1CQUE2QixLQUFLLFFBQUwsQ0FQM0M7QUFRUixtQkFBTyxNQUFNLFdBQU4sQ0FBa0IsR0FBbEIsRUFBdUIsTUFBdkIsQ0FSQzs7OztvQ0FXQSxNQUFLO0FBQ2IsbUJBQU8sTUFBTSxXQUFOLENBQWtCLElBQWxCLEVBQXdCLEtBQXhCLENBRE07Ozs7V0FaQSIsImZpbGUiOiJjYW52YXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi5cIlxuXG5sZXQgY2FudmFzPW51bGwsIGN0eDJkPW51bGxcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XG4gICAgbGluZUhlaWdodCgpe1xuXHRcdGlmKCFjdHgyZCl7XG5cdFx0XHRjYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxuXHRcdFx0Y2FudmFzLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG5cdFx0XHRjdHgyZD1jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXHRcdH1cblx0XHRjYW52YXMuc3R5bGU9YGZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLmZvbnRTaXplfWBcbiAgICAgICAgcmV0dXJuIGN0eDJkLm1lYXN1cmVUZXh0KFwiQVwiKS5oZWlnaHRcbiAgICB9XG5cbiAgICBzdHJpbmdXaWR0aCh3b3JkKXtcbiAgICAgICAgcmV0dXJuIGN0eDJkLm1lYXN1cmVUZXh0KHdvcmQpLndpZHRoXG4gICAgfVxufVxuIl19