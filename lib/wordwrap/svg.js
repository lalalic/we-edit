"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var SVGWordWrapper = function (_HtmlWordWrapper) {
    _inherits(SVGWordWrapper, _HtmlWordWrapper);

    function SVGWordWrapper() {
        _classCallCheck(this, SVGWordWrapper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SVGWordWrapper).apply(this, arguments));
    }

    _createClass(SVGWordWrapper, [{
        key: "_createTester",
        value: function _createTester() {
            var container = document.createElement("div");
            container.style = "position:absolute;top:-1000";
            document.body.appendChild(container);
            var _window = window;
            var screenX = _window.screenX;
            var screenY = _window.screenY;

            container.innerHTML = "\n        <svg width=\"" + screenX + "\" height=\"" + screenY + "\" viewBox=\"0 0 " + screenX + " " + screenY + "\" xmlns=\"http://www.w3.org/2000/svg\">\n            <text>*</text>\n        </svg>\n        ";

            return container.querySelector('text');
        }
    }, {
        key: "_textMetrics",
        value: function _textMetrics(word) {
            var tester = this.constructor.tester;
            tester.firstChild.data = word;
            return tester.getBBox();
        }
    }]);

    return SVGWordWrapper;
}(_html2.default);

exports.default = SVGWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUI7Ozs7Ozs7Ozs7O3dDQUNGO0FBQ1gsZ0JBQUksWUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVixDQURPO0FBRVgsc0JBQVUsS0FBVixHQUFnQiw2QkFBaEIsQ0FGVztBQUdYLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQTFCLEVBSFc7MEJBSWMsT0FKZDtnQkFJSiwwQkFKSTtnQkFJSywwQkFKTDs7QUFLWCxzQkFBVSxTQUFWLCtCQUVjLDJCQUFvQixnQ0FBeUIsZ0JBQVcsMEdBRnRFLENBTFc7O0FBWVgsbUJBQU8sVUFBVSxhQUFWLENBQXdCLE1BQXhCLENBQVAsQ0FaVzs7OztxQ0FlRixNQUFLO0FBQ2QsZ0JBQUksU0FBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FERztBQUVkLG1CQUFPLFVBQVAsQ0FBa0IsSUFBbEIsR0FBdUIsSUFBdkIsQ0FGYztBQUdkLG1CQUFPLE9BQU8sT0FBUCxFQUFQLENBSGM7Ozs7V0FoQkQiLCJmaWxlIjoic3ZnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi9odG1sXCJcblxuLyoqXG4gKlxuICogd2h5IGl0J3Mgc2xvd2VyIHRoYW4gaHRtbFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdXb3JkV3JhcHBlciBleHRlbmRzIEh0bWxXb3JkV3JhcHBlcntcbiAgICBfY3JlYXRlVGVzdGVyKCl7XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICBjb250YWluZXIuc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEwMDBcIlxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgY29uc3Qge3NjcmVlblgsIHNjcmVlbll9PXdpbmRvd1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MPVxuICAgICAgICBgXG4gICAgICAgIDxzdmcgd2lkdGg9XCIke3NjcmVlblh9XCIgaGVpZ2h0PVwiJHtzY3JlZW5ZfVwiIHZpZXdCb3g9XCIwIDAgJHtzY3JlZW5YfSAke3NjcmVlbll9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICAgICAgPHRleHQ+KjwvdGV4dD5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIGBcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3RleHQnKVxuICAgIH1cblxuICAgIF90ZXh0TWV0cmljcyh3b3JkKXtcbiAgICAgICAgbGV0IHRlc3Rlcj10aGlzLmNvbnN0cnVjdG9yLnRlc3RlclxuICAgICAgICB0ZXN0ZXIuZmlyc3RDaGlsZC5kYXRhPXdvcmRcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCQm94KClcbiAgICB9XG59XG4iXX0=