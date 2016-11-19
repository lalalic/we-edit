"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require(".");

var _2 = _interopRequireDefault(_);

var _fonts = require("../fonts");

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeWordWraper = function (_WordWrapper) {
    (0, _inherits3.default)(NodeWordWraper, _WordWrapper);

    function NodeWordWraper() {
        (0, _classCallCheck3.default)(this, NodeWordWraper);
        return (0, _possibleConstructorReturn3.default)(this, (NodeWordWraper.__proto__ || (0, _getPrototypeOf2.default)(NodeWordWraper)).apply(this, arguments));
    }

    (0, _createClass3.default)(NodeWordWraper, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9ub2RlLmpzIl0sIm5hbWVzIjpbIk5vZGVXb3JkV3JhcGVyIiwidGVzdGVyIiwiZ2V0IiwiZm9udEZhbWlseSIsImhlaWdodCIsImxpbmVIZWlnaHQiLCJzaXplIiwiZGVzY2VudCIsImxpbmVEZXNjZW50Iiwid29yZCIsInN0cmluZ1dpZHRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7OztxQ0FDTDtBQUNkLGlCQUFLQyxNQUFMLEdBQVksZ0JBQU1DLEdBQU4sQ0FBVSxLQUFLQyxVQUFmLENBQVo7QUFDTSxtQkFBTztBQUNaQyx3QkFBUyxLQUFLSCxNQUFMLENBQVlJLFVBQVosQ0FBdUIsS0FBS0MsSUFBNUIsQ0FERztBQUVaQyx5QkFBUyxLQUFLTixNQUFMLENBQVlPLFdBQVosQ0FBd0IsS0FBS0YsSUFBN0I7QUFGRyxhQUFQO0FBSUg7OztvQ0FFV0csSSxFQUFLO0FBQ2IsbUJBQU8sS0FBS1IsTUFBTCxDQUFZUyxXQUFaLENBQXdCRCxJQUF4QixFQUE4QixLQUFLSCxJQUFuQyxDQUFQO0FBQ0g7Ozs7O2tCQVhnQk4sYyIsImZpbGUiOiJub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuXCJcbmltcG9ydCBGb250cyBmcm9tIFwiLi4vZm9udHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlV29yZFdyYXBlciBleHRlbmRzIFdvcmRXcmFwcGVye1xuICAgIGxpbmVIZWlnaHQoKXtcblx0XHR0aGlzLnRlc3Rlcj1Gb250cy5nZXQodGhpcy5mb250RmFtaWx5KVxuICAgICAgICByZXR1cm4ge1xuXHRcdFx0aGVpZ2h0IDogdGhpcy50ZXN0ZXIubGluZUhlaWdodCh0aGlzLnNpemUpLCBcblx0XHRcdGRlc2NlbnQ6IHRoaXMudGVzdGVyLmxpbmVEZXNjZW50KHRoaXMuc2l6ZSlcblx0XHRcdH1cbiAgICB9XG5cbiAgICBzdHJpbmdXaWR0aCh3b3JkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdGVyLnN0cmluZ1dpZHRoKHdvcmQsIHRoaXMuc2l6ZSlcbiAgICB9XG59XG4iXX0=