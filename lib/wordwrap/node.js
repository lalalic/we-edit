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

        return _possibleConstructorReturn(this, (NodeWordWraper.__proto__ || Object.getPrototypeOf(NodeWordWraper)).apply(this, arguments));
    }

    _createClass(NodeWordWraper, [{
        key: "lineHeight",
        value: function lineHeight() {
            this.tester = _fonts2.default.get(this.fontFamily);
            return {
                height: this.tester.lineHeight(this.size),
                descent: this.tester.lineDescent(this.size)
            };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9ub2RlLmpzIl0sIm5hbWVzIjpbIk5vZGVXb3JkV3JhcGVyIiwidGVzdGVyIiwiZ2V0IiwiZm9udEZhbWlseSIsImhlaWdodCIsImxpbmVIZWlnaHQiLCJzaXplIiwiZGVzY2VudCIsImxpbmVEZXNjZW50Iiwid29yZCIsInN0cmluZ1dpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7cUNBQ0w7QUFDZCxpQkFBS0MsTUFBTCxHQUFZLGdCQUFNQyxHQUFOLENBQVUsS0FBS0MsVUFBZixDQUFaO0FBQ00sbUJBQU87QUFDWkMsd0JBQVMsS0FBS0gsTUFBTCxDQUFZSSxVQUFaLENBQXVCLEtBQUtDLElBQTVCLENBREc7QUFFWkMseUJBQVMsS0FBS04sTUFBTCxDQUFZTyxXQUFaLENBQXdCLEtBQUtGLElBQTdCO0FBRkcsYUFBUDtBQUlIOzs7b0NBRVdHLEksRUFBSztBQUNiLG1CQUFPLEtBQUtSLE1BQUwsQ0FBWVMsV0FBWixDQUF3QkQsSUFBeEIsRUFBOEIsS0FBS0gsSUFBbkMsQ0FBUDtBQUNIOzs7Ozs7a0JBWGdCTixjIiwiZmlsZSI6Im5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV29yZFdyYXBwZXIgZnJvbSBcIi5cIlxyXG5pbXBvcnQgRm9udHMgZnJvbSBcIi4uL2ZvbnRzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVXb3JkV3JhcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcbiAgICBsaW5lSGVpZ2h0KCl7XHJcblx0XHR0aGlzLnRlc3Rlcj1Gb250cy5nZXQodGhpcy5mb250RmFtaWx5KVxyXG4gICAgICAgIHJldHVybiB7XHJcblx0XHRcdGhlaWdodCA6IHRoaXMudGVzdGVyLmxpbmVIZWlnaHQodGhpcy5zaXplKSwgXHJcblx0XHRcdGRlc2NlbnQ6IHRoaXMudGVzdGVyLmxpbmVEZXNjZW50KHRoaXMuc2l6ZSlcclxuXHRcdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlc3Rlci5zdHJpbmdXaWR0aCh3b3JkLCB0aGlzLnNpemUpXHJcbiAgICB9XHJcbn1cclxuIl19