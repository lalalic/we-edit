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

            var height = 25;

            return { width: width, height: height };
        }
    }]);

    return CanvasWordWrapper;
}(_2.default);

exports.default = CanvasWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt3Q0FDRjtBQUNYLGdCQUFJLFNBQU8sU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVAsQ0FETztBQUVYLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCLEVBRlc7QUFHWCxtQkFBTyxLQUFQLEdBQWEsNERBQWIsQ0FIVztBQUlYLG1CQUFPLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFQLENBSlc7Ozs7cUNBT0YsTUFBSztBQUNkLGdCQUFJLFNBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBREc7O3NDQUVGLE9BQU8sV0FBUCxDQUFtQixJQUFuQixFQUZFOztnQkFFVCxrQ0FGUzs7QUFHZCxnQkFBSSxTQUFPLEVBQVAsQ0FIVTs7QUFLZCxtQkFBTyxFQUFDLFlBQUQsRUFBUSxjQUFSLEVBQVAsQ0FMYzs7OztXQVJEIiwiZmlsZSI6ImNhbnZhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLlwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1dvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XG4gICAgX2NyZWF0ZVRlc3Rlcigpe1xuICAgICAgICB2YXIgdGVzdGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdGVyKVxuICAgICAgICB0ZXN0ZXIuc3R5bGU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4XCJcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRDb250ZXh0KCcyZCcpXG4gICAgfVxuXG4gICAgX3RleHRNZXRyaWNzKHdvcmQpe1xuICAgICAgICBsZXQgdGVzdGVyPXRoaXMuY29uc3RydWN0b3IudGVzdGVyXG4gICAgICAgIGxldCB7d2lkdGh9PXRlc3Rlci5tZWFzdXJlVGV4dCh3b3JkKVxuICAgICAgICBsZXQgaGVpZ2h0PTI1XG5cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0fVxuICAgIH1cbn1cbiJdfQ==