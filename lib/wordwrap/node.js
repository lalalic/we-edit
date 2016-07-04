"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _2 = _interopRequireDefault(_);

var _fonts = require("../fonts");

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeWordWraper = function (_WordWrapper) {
    _inherits(NodeWordWraper, _WordWrapper);

    function NodeWordWraper() {
        _classCallCheck(this, NodeWordWraper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NodeWordWraper).apply(this, arguments));
    }

    _createClass(NodeWordWraper, [{
        key: "lineHeight",
        value: function lineHeight() {
            this.tester = _fonts2.default.get(this.fontFamily);
            return this.tester.lineHeight(this.size);
        }
    }, {
        key: "stringWidth",
        value: function stringWidth(word) {
            return this.tester.stringWidth(word, this.size);
        }
    }]);

    return NodeWordWraper;
}(_2.default);

exports.default = NodeWordWraper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9ub2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztxQ0FDTDtBQUNkLGlCQUFLLE1BQUwsR0FBWSxnQkFBTSxHQUFOLENBQVUsS0FBSyxVQUFMLENBQXRCLENBRGM7QUFFUixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxVQUFaLENBQXVCLEtBQUssSUFBTCxDQUE5QixDQUZROzs7O29DQUtBLE1BQUs7QUFDYixtQkFBTyxLQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLEVBQThCLEtBQUssSUFBTCxDQUFyQyxDQURhOzs7O1dBTkEiLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLlwiXG5pbXBvcnQgRm9udHMgZnJvbSBcIi4uL2ZvbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZVdvcmRXcmFwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcbiAgICBsaW5lSGVpZ2h0KCl7XG5cdFx0dGhpcy50ZXN0ZXI9Rm9udHMuZ2V0KHRoaXMuZm9udEZhbWlseSlcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdGVyLmxpbmVIZWlnaHQodGhpcy5zaXplKVxuICAgIH1cblxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xuICAgICAgICByZXR1cm4gdGhpcy50ZXN0ZXIuc3RyaW5nV2lkdGgod29yZCwgdGhpcy5zaXplKVxuICAgIH1cbn1cbiJdfQ==