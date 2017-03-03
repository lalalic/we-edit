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

/**
 *
 * why it's slower than html
 */
var tester = null;

var SVGWordWrapper = function (_WordWrapper) {
    _inherits(SVGWordWrapper, _WordWrapper);

    function SVGWordWrapper() {
        _classCallCheck(this, SVGWordWrapper);

        return _possibleConstructorReturn(this, (SVGWordWrapper.__proto__ || Object.getPrototypeOf(SVGWordWrapper)).apply(this, arguments));
    }

    _createClass(SVGWordWrapper, [{
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
            tester.style = "white-space:pre;\n            font-family:" + this.fontFamily + ";\n            font-size:" + this.size + "pt;\n            font-weight:" + (this.style.b ? "700" : "400") + ";\n            font-style:" + (this.style.i ? "italic" : "normal") + ";\n            ";
            return _get(SVGWordWrapper.prototype.__proto__ || Object.getPrototypeOf(SVGWordWrapper.prototype), "lineHeight", this).call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOlsidGVzdGVyIiwiU1ZHV29yZFdyYXBwZXIiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsInNjcmVlblgiLCJzY3JlZW5ZIiwiaW5uZXJIVE1MIiwicXVlcnlTZWxlY3RvciIsImZvbnRGYW1pbHkiLCJzaXplIiwiYiIsImkiLCJ3b3JkIiwiZmlyc3RDaGlsZCIsImRhdGEiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUlBLElBQUlBLFNBQU8sSUFBWDs7SUFDcUJDLGM7Ozs7Ozs7Ozs7O3FDQUNMO0FBQ2QsZ0JBQUcsQ0FBQ0QsTUFBSixFQUFXO0FBQ1Ysb0JBQUlFLFlBQVVDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBRiwwQkFBVUcsS0FBVixHQUFnQiw2QkFBaEI7QUFDQUYseUJBQVNHLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsU0FBMUI7QUFIVSw4QkFJZU0sTUFKZjtBQUFBLG9CQUlIQyxPQUpHLFdBSUhBLE9BSkc7QUFBQSxvQkFJTUMsT0FKTixXQUlNQSxPQUpOOztBQUtWUiwwQkFBVVMsU0FBViw2QkFFY0YsT0FGZCxvQkFFa0NDLE9BRmxDLHlCQUUyREQsT0FGM0QsU0FFc0VDLE9BRnRFO0FBTUFWLHlCQUFPRSxVQUFVVSxhQUFWLENBQXdCLE1BQXhCLENBQVA7QUFDQTtBQUNEWixtQkFBT0ssS0FBUCxrREFDd0IsS0FBS1EsVUFEN0IsaUNBRXNCLEtBQUtDLElBRjNCLHNDQUd3QixLQUFLVCxLQUFMLENBQVdVLENBQVgsR0FBZSxLQUFmLEdBQXVCLEtBSC9DLG9DQUl1QixLQUFLVixLQUFMLENBQVdXLENBQVgsR0FBZSxRQUFmLEdBQTBCLFFBSmpEO0FBTU07QUFDSDs7O29DQUVXQyxJLEVBQUs7QUFDYmpCLG1CQUFPa0IsVUFBUCxDQUFrQkMsSUFBbEIsR0FBdUJGLElBQXZCO0FBQ0EsbUJBQU9qQixPQUFPb0IscUJBQVAsR0FBK0JDLEtBQXRDO0FBQ0g7Ozs7OztrQkEzQmdCcEIsYyIsImZpbGUiOiJzdmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi4vaHRtbFwiXHJcblxyXG4vKipcclxuICpcclxuICogd2h5IGl0J3Mgc2xvd2VyIHRoYW4gaHRtbFxyXG4gKi9cclxubGV0IHRlc3Rlcj1udWxsXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWR1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcbiAgICBsaW5lSGVpZ2h0KCl7XHJcblx0XHRpZighdGVzdGVyKXtcclxuXHRcdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblx0XHRcdGNvbnRhaW5lci5zdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO3RvcDotMTAwMFwiXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxyXG5cdFx0XHRjb25zdCB7c2NyZWVuWCwgc2NyZWVuWX09d2luZG93XHJcblx0XHRcdGNvbnRhaW5lci5pbm5lckhUTUw9XHJcblx0XHRcdGBcclxuXHRcdFx0PHN2ZyB3aWR0aD1cIiR7c2NyZWVuWH1cIiBoZWlnaHQ9XCIke3NjcmVlbll9XCIgdmlld0JveD1cIjAgMCAke3NjcmVlblh9ICR7c2NyZWVuWX1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcblx0XHRcdFx0PHRleHQ+KjwvdGV4dD5cclxuXHRcdFx0PC9zdmc+XHJcblx0XHRcdGBcclxuXHRcdFx0dGVzdGVyPWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCd0ZXh0JylcclxuXHRcdH1cclxuXHRcdHRlc3Rlci5zdHlsZT1gd2hpdGUtc3BhY2U6cHJlO1xyXG4gICAgICAgICAgICBmb250LWZhbWlseToke3RoaXMuZm9udEZhbWlseX07XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZToke3RoaXMuc2l6ZX1wdDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6JHt0aGlzLnN0eWxlLmIgPyBcIjcwMFwiIDogXCI0MDBcIn07XHJcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6JHt0aGlzLnN0eWxlLmkgPyBcIml0YWxpY1wiIDogXCJub3JtYWxcIn07XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICByZXR1cm4gc3VwZXIubGluZUhlaWdodCgpXHJcbiAgICB9XHJcblxyXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XHJcbiAgICAgICAgdGVzdGVyLmZpcnN0Q2hpbGQuZGF0YT13b3JkXHJcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgfVxyXG59XHJcbiJdfQ==