"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _2 = _interopRequireDefault(_);

var _fonts = require("./fonts");

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeWordWraper = function (_WordWrapper) {
    _inherits(NodeWordWraper, _WordWrapper);

    function NodeWordWraper(text, style) {
        _classCallCheck(this, NodeWordWraper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NodeWordWraper).apply(this, arguments));

        _this.tester = _fonts2.default.get(style.fontFamily);
        return _this;
    }

    _createClass(NodeWordWraper, [{
        key: "_creatTester",
        value: function _creatTester() {
            return this.tester;
        }
    }, {
        key: "textMetrics",
        value: function textMetrics(word, style) {}
    }]);

    return NodeWordWraper;
}(_2.default);

exports.default = NodeWordWraper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9ub2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsY0FDakIsQ0FBWSxJQUFaLEVBQWlCLEtBQWpCLEVBQXVCOzhCQUROLGdCQUNNOzsyRUFETiw0QkFFSixZQURVOztBQUVuQixjQUFLLE1BQUwsR0FBWSxnQkFBTSxHQUFOLENBQVUsTUFBTSxVQUFOLENBQXRCLENBRm1COztLQUF2Qjs7aUJBRGlCOzt1Q0FLSDtBQUNWLG1CQUFPLEtBQUssTUFBTCxDQURHOzs7O29DQUlGLE1BQU0sT0FBTTs7O1dBVFAiLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLlwiXG5pbXBvcnQgRm9udHMgZnJvbSBcIi4vZm9udHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlV29yZFdyYXBlciBleHRlbmRzIFdvcmRXcmFwcGVye1xuICAgIGNvbnN0cnVjdG9yKHRleHQsc3R5bGUpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMudGVzdGVyPUZvbnRzLmdldChzdHlsZS5mb250RmFtaWx5KVxuICAgIH1cbiAgICBfY3JlYXRUZXN0ZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdGVyXG4gICAgfVxuXG4gICAgdGV4dE1ldHJpY3Mod29yZCwgc3R5bGUpe1xuICAgICAgICBcblxuXG4gICAgfVxufVxuIl19