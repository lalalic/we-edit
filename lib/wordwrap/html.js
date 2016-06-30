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
        value: function _textMetrics(word, style) {
            var tester = this.constructor.tester;
            tester.innerHTML = word;
            return tester.getBoundingClientRect();
        }
    }]);

    return HtmlWordWrapper;
}(_2.default);

exports.default = HtmlWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7d0NBQ0Y7QUFDWCxnQkFBSSxTQUFPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFQLENBRE87QUFFWCxxQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQUZXO0FBR1gsbUJBQU8sS0FBUCxHQUFhLDREQUFiLENBSFc7QUFJWCxtQkFBTyxNQUFQLENBSlc7Ozs7cUNBT0YsTUFBSyxPQUFNO0FBQ3BCLGdCQUFJLFNBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBRFM7QUFFcEIsbUJBQU8sU0FBUCxHQUFpQixJQUFqQixDQUZvQjtBQUdwQixtQkFBTyxPQUFPLHFCQUFQLEVBQVAsQ0FIb0I7Ozs7V0FSUCIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHRtbFdvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XG4gICAgX2NyZWF0ZVRlc3Rlcigpe1xuICAgICAgICBsZXQgdGVzdGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3RlcilcbiAgICAgICAgdGVzdGVyLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG4gICAgICAgIHJldHVybiB0ZXN0ZXJcbiAgICB9XG5cbiAgICBfdGV4dE1ldHJpY3Mod29yZCxzdHlsZSl7XG4gICAgICAgIGxldCB0ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXJcbiAgICAgICAgdGVzdGVyLmlubmVySFRNTD13b3JkXG4gICAgICAgIHJldHVybiB0ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB9XG59XG4iXX0=