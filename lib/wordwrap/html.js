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

var HtmlWordWrapper = function (_WordWrapper) {
    _inherits(HtmlWordWrapper, _WordWrapper);

    function HtmlWordWrapper() {
        _classCallCheck(this, HtmlWordWrapper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlWordWrapper).apply(this, arguments));
    }

    _createClass(HtmlWordWrapper, [{
        key: "_createTester",
        value: function _createTester() {
            var tester = document.createElement('span');
            document.body.appendChild(tester);
            tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";
            return tester;
        }
    }, {
        key: "_textMetrics",
        value: function _textMetrics(word) {
            var tester = this.constructor.tester;
            tester.innerHTML = word;
            return tester.getBoundingClientRect();
        }
    }]);

    return HtmlWordWrapper;
}(_2.default);

exports.default = HtmlWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7d0NBQ0Y7QUFDWCxnQkFBSSxTQUFPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFQLENBRE87QUFFWCxxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQUZXO0FBR1gsbUJBQU8sS0FBUCxHQUFhLDREQUFiLENBSFc7QUFJWCxtQkFBTyxNQUFQLENBSlc7Ozs7cUNBT0YsTUFBSztBQUNkLGdCQUFJLFNBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBREc7QUFFZCxtQkFBTyxTQUFQLEdBQWlCLElBQWpCLENBRmM7QUFHZCxtQkFBTyxPQUFPLHFCQUFQLEVBQVAsQ0FIYzs7OztXQVJEIiwiZmlsZSI6Imh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi5cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcbiAgICBfY3JlYXRlVGVzdGVyKCl7XG4gICAgICAgIGxldCB0ZXN0ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdGVyKVxuICAgICAgICB0ZXN0ZXIuc3R5bGU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4XCJcbiAgICAgICAgcmV0dXJuIHRlc3RlclxuICAgIH1cblxuICAgIF90ZXh0TWV0cmljcyh3b3JkKXtcbiAgICAgICAgbGV0IHRlc3Rlcj10aGlzLmNvbnN0cnVjdG9yLnRlc3RlclxuICAgICAgICB0ZXN0ZXIuaW5uZXJIVE1MPXdvcmRcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIH1cbn1cbiJdfQ==