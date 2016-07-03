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

var CanvasWordWrapper = function (_WordWrapper) {
    _inherits(CanvasWordWrapper, _WordWrapper);

    function CanvasWordWrapper() {
        _classCallCheck(this, CanvasWordWrapper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasWordWrapper).apply(this, arguments));
    }

    _createClass(CanvasWordWrapper, [{
        key: "_createTester",
        value: function _createTester() {
            var tester = document.createElement('canvas');
            document.body.appendChild(tester);
            tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";
            return tester.getContext('2d');
        }
    }, {
        key: "_textMetrics",
        value: function _textMetrics(word) {
            var tester = this.constructor.tester;

            var _tester$measureText = tester.measureText(word);

            var width = _tester$measureText.width;

            return { width: width };
        }
    }]);

    return CanvasWordWrapper;
}(_2.default);

exports.default = CanvasWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt3Q0FDRjtBQUNYLGdCQUFJLFNBQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVAsQ0FETztBQUVYLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCLEVBRlc7QUFHWCxtQkFBTyxLQUFQLEdBQWEsNERBQWIsQ0FIVztBQUlYLG1CQUFPLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFQLENBSlc7Ozs7cUNBT0YsTUFBSztBQUNkLGdCQUFJLFNBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBREc7O3NDQUVGLE9BQU8sV0FBUCxDQUFtQixJQUFuQixFQUZFOztnQkFFVCxrQ0FGUzs7QUFHZCxtQkFBTyxFQUFDLFlBQUQsRUFBUCxDQUhjOzs7O1dBUkQiLCJmaWxlIjoiY2FudmFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcbiAgICBfY3JlYXRlVGVzdGVyKCl7XG4gICAgICAgIHZhciB0ZXN0ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXG4gICAgICAgIHRlc3Rlci5zdHlsZT1cIm1hcmdpbjowO3BhZGRpbmc6MDtib3JkZXI6MDtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMDAwcHhcIlxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldENvbnRleHQoJzJkJylcbiAgICB9XG5cbiAgICBfdGV4dE1ldHJpY3Mod29yZCl7XG4gICAgICAgIGxldCB0ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXJcbiAgICAgICAgbGV0IHt3aWR0aH09dGVzdGVyLm1lYXN1cmVUZXh0KHdvcmQpXG4gICAgICAgIHJldHVybiB7d2lkdGh9XG4gICAgfVxufVxuIl19