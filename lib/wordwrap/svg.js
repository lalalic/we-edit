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

/**
 *
 * why it's slower than html
 */
var tester = null;

var SVGWordWrapper = function (_WordWrapper) {
    (0, _inherits3.default)(SVGWordWrapper, _WordWrapper);

    function SVGWordWrapper() {
        (0, _classCallCheck3.default)(this, SVGWordWrapper);
        return (0, _possibleConstructorReturn3.default)(this, (SVGWordWrapper.__proto__ || (0, _getPrototypeOf2.default)(SVGWordWrapper)).apply(this, arguments));
    }

    (0, _createClass3.default)(SVGWordWrapper, [{
        key: "lineHeight",
        value: function lineHeight() {
            if (!tester) {
                var container = document.createElement("div");
                container.style = "position:absolute;top:-1000";
                document.body.appendChild(container);
                var _window = window,
                    screenX = _window.screenX,
                    screenY = _window.screenY;

                container.innerHTML = "\n\t\t\t<svg width=\"" + screenX + "\" height=\"" + screenY + "\" viewBox=\"0 0 " + screenX + " " + screenY + "\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<text>*</text>\n\t\t\t</svg>\n\t\t\t";
                tester = container.querySelector('text');
            }
            tester.style = "white-space:pre;\n            font-family:" + this.fontFamily + ";\n            font-size:" + this.size + "px;\n            font-weight:" + (this.style.b ? "700" : "400") + ";\n            font-style:" + (this.style.i ? "italic" : "normal") + ";\n            ";
            return (0, _get3.default)(SVGWordWrapper.prototype.__proto__ || (0, _getPrototypeOf2.default)(SVGWordWrapper.prototype), "lineHeight", this).call(this);
        }
    }, {
        key: "stringWidth",
        value: function stringWidth(word) {
            tester.firstChild.data = word;
            return tester.getBoundingClientRect().width;
        }
    }]);
    return SVGWordWrapper;
}(_html2.default);

exports.default = SVGWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOlsidGVzdGVyIiwiU1ZHV29yZFdyYXBwZXIiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsInNjcmVlblgiLCJzY3JlZW5ZIiwiaW5uZXJIVE1MIiwicXVlcnlTZWxlY3RvciIsImZvbnRGYW1pbHkiLCJzaXplIiwiYiIsImkiLCJ3b3JkIiwiZmlyc3RDaGlsZCIsImRhdGEiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7O0FBSUEsSUFBSUEsU0FBTyxJQUFYOztJQUNxQkMsYzs7Ozs7Ozs7OztxQ0FDTDtBQUNkLGdCQUFHLENBQUNELE1BQUosRUFBVztBQUNWLG9CQUFJRSxZQUFVQyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQUYsMEJBQVVHLEtBQVYsR0FBZ0IsNkJBQWhCO0FBQ0FGLHlCQUFTRyxJQUFULENBQWNDLFdBQWQsQ0FBMEJMLFNBQTFCO0FBSFUsOEJBSWVNLE1BSmY7QUFBQSxvQkFJSEMsT0FKRyxXQUlIQSxPQUpHO0FBQUEsb0JBSU1DLE9BSk4sV0FJTUEsT0FKTjs7QUFLVlIsMEJBQVVTLFNBQVYsNkJBRWNGLE9BRmQsb0JBRWtDQyxPQUZsQyx5QkFFMkRELE9BRjNELFNBRXNFQyxPQUZ0RTtBQU1BVix5QkFBT0UsVUFBVVUsYUFBVixDQUF3QixNQUF4QixDQUFQO0FBQ0E7QUFDRFosbUJBQU9LLEtBQVAsa0RBQ3dCLEtBQUtRLFVBRDdCLGlDQUVzQixLQUFLQyxJQUYzQixzQ0FHd0IsS0FBS1QsS0FBTCxDQUFXVSxDQUFYLEdBQWUsS0FBZixHQUF1QixLQUgvQyxvQ0FJdUIsS0FBS1YsS0FBTCxDQUFXVyxDQUFYLEdBQWUsUUFBZixHQUEwQixRQUpqRDtBQU1NO0FBQ0g7OztvQ0FFV0MsSSxFQUFLO0FBQ2JqQixtQkFBT2tCLFVBQVAsQ0FBa0JDLElBQWxCLEdBQXVCRixJQUF2QjtBQUNBLG1CQUFPakIsT0FBT29CLHFCQUFQLEdBQStCQyxLQUF0QztBQUNIOzs7OztrQkEzQmdCcEIsYyIsImZpbGUiOiJzdmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi4vaHRtbFwiXHJcblxyXG4vKipcclxuICpcclxuICogd2h5IGl0J3Mgc2xvd2VyIHRoYW4gaHRtbFxyXG4gKi9cclxubGV0IHRlc3Rlcj1udWxsXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcbiAgICBsaW5lSGVpZ2h0KCl7XHJcblx0XHRpZighdGVzdGVyKXtcclxuXHRcdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdGNvbnRhaW5lci5zdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO3RvcDotMTAwMFwiXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxyXG5cdFx0XHRjb25zdCB7c2NyZWVuWCwgc2NyZWVuWX09d2luZG93XHJcblx0XHRcdGNvbnRhaW5lci5pbm5lckhUTUw9XHJcblx0XHRcdGBcclxuXHRcdFx0PHN2ZyB3aWR0aD1cIiR7c2NyZWVuWH1cIiBoZWlnaHQ9XCIke3NjcmVlbll9XCIgdmlld0JveD1cIjAgMCAke3NjcmVlblh9ICR7c2NyZWVuWX1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcblx0XHRcdFx0PHRleHQ+KjwvdGV4dD5cclxuXHRcdFx0PC9zdmc+XHJcblx0XHRcdGBcclxuXHRcdFx0dGVzdGVyPWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCd0ZXh0JylcclxuXHRcdH1cclxuXHRcdHRlc3Rlci5zdHlsZT1gd2hpdGUtc3BhY2U6cHJlO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseToke3RoaXMuZm9udEZhbWlseX07XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZToke3RoaXMuc2l6ZX1weDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6JHt0aGlzLnN0eWxlLmIgPyBcIjcwMFwiIDogXCI0MDBcIn07XHJcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6JHt0aGlzLnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIn07XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICByZXR1cm4gc3VwZXIubGluZUhlaWdodCgpXHJcbiAgICB9XHJcblxyXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XHJcbiAgICAgICAgdGVzdGVyLmZpcnN0Q2hpbGQuZGF0YT13b3JkXHJcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgfVxyXG59XHJcbiJdfQ==