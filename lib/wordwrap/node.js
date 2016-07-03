"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _2 = _interopRequireDefault(_);

var _3 = require("..");

var _4 = _interopRequireDefault(_3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeWordWraper = function (_WordWrapper) {
    _inherits(NodeWordWraper, _WordWrapper);

    function NodeWordWraper(text, style) {
        _classCallCheck(this, NodeWordWraper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NodeWordWraper).apply(this, arguments));

        _this.tester = _4.default.get(style.fontFamily);
        return _this;
    }

    _createClass(NodeWordWraper, [{
        key: "_creatTester",
        value: function _creatTester() {
            return this.tester;
        }
    }, {
        key: "textMetrics",
        value: function textMetrics(word, style) {
            this.tester.stringWidth(word, style);
        }
    }]);

    return NodeWordWraper;
}(_2.default);

exports.default = NodeWordWraper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9ub2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsY0FDakIsQ0FBWSxJQUFaLEVBQWlCLEtBQWpCLEVBQXVCOzhCQUROLGdCQUNNOzsyRUFETiw0QkFFSixZQURVOztBQUVuQixjQUFLLE1BQUwsR0FBWSxXQUFNLEdBQU4sQ0FBVSxNQUFNLFVBQU4sQ0FBdEIsQ0FGbUI7O0tBQXZCOztpQkFEaUI7O3VDQUtIO0FBQ1YsbUJBQU8sS0FBSyxNQUFMLENBREc7Ozs7b0NBSUYsTUFBTSxPQUFNO0FBQ3BCLGlCQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLEVBQTZCLEtBQTdCLEVBRG9COzs7O1dBVFAiLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLlwiXG5pbXBvcnQgRm9udHMgZnJvbSBcIi4uXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZVdvcmRXcmFwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LHN0eWxlKXtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLnRlc3Rlcj1Gb250cy5nZXQoc3R5bGUuZm9udEZhbWlseSlcbiAgICB9XG4gICAgX2NyZWF0VGVzdGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RlclxuICAgIH1cblxuICAgIHRleHRNZXRyaWNzKHdvcmQsIHN0eWxlKXtcbiAgICAgICAgdGhpcy50ZXN0ZXIuc3RyaW5nV2lkdGgod29yZCxzdHlsZSlcbiAgICB9XG59XG4iXX0=