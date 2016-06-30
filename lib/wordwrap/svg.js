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
        value: function _textMetrics(word, style) {
            var tester = this.constructor.tester;
            tester.firstChild.data = word;
            return tester.getBBox();
        }
    }]);

    return SVGWordWrapper;
}(_html2.default);

exports.default = SVGWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNcUI7Ozs7Ozs7Ozs7O3dDQUNGO0FBQ1gsZ0JBQUksWUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVixDQURPO0FBRVgsc0JBQVUsS0FBVixHQUFnQiw2QkFBaEIsQ0FGVztBQUdYLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQTFCLEVBSFc7MEJBSWMsT0FKZDtnQkFJSiwwQkFKSTtnQkFJSywwQkFKTDs7QUFLWCxzQkFBVSxTQUFWLCtCQUVjLDJCQUFvQixnQ0FBeUIsZ0JBQVcsMEdBRnRFLENBTFc7O0FBWVgsbUJBQU8sVUFBVSxhQUFWLENBQXdCLE1BQXhCLENBQVAsQ0FaVzs7OztxQ0FlRixNQUFNLE9BQU07QUFDckIsZ0JBQUksU0FBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FEVTtBQUVyQixtQkFBTyxVQUFQLENBQWtCLElBQWxCLEdBQXVCLElBQXZCLENBRnFCO0FBR3JCLG1CQUFPLE9BQU8sT0FBUCxFQUFQLENBSHFCOzs7O1dBaEJSIiwiZmlsZSI6InN2Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4vaHRtbFwiXG5cbi8qKlxuICpcbiAqIHdoeSBpdCdzIHNsb3dlciB0aGFuIGh0bWxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1ZHV29yZFdyYXBwZXIgZXh0ZW5kcyBIdG1sV29yZFdyYXBwZXJ7XG4gICAgX2NyZWF0ZVRlc3Rlcigpe1xuICAgICAgICBsZXQgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgY29udGFpbmVyLnN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMDAwXCJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIGNvbnN0IHtzY3JlZW5YLCBzY3JlZW5ZfT13aW5kb3dcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTD1cbiAgICAgICAgYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiJHtzY3JlZW5YfVwiIGhlaWdodD1cIiR7c2NyZWVuWX1cIiB2aWV3Qm94PVwiMCAwICR7c2NyZWVuWH0gJHtzY3JlZW5ZfVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgIDx0ZXh0Pio8L3RleHQ+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICBgXG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCd0ZXh0JylcbiAgICB9XG5cbiAgICBfdGV4dE1ldHJpY3Mod29yZCwgc3R5bGUpe1xuICAgICAgICBsZXQgdGVzdGVyPXRoaXMuY29uc3RydWN0b3IudGVzdGVyXG4gICAgICAgIHRlc3Rlci5maXJzdENoaWxkLmRhdGE9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJCb3goKVxuICAgIH1cbn1cbiJdfQ==