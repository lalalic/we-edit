"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _text = require("../../content/text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Text) {
    (0, _inherits3.default)(_class, _Text);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
        key: "getStyle",
        value: function getStyle() {
            var inheritedStyle = this.context.inheritedStyle;


            return 'rFonts,sz,color,b,i,vanish'.split(",").reduce(function (style, key) {
                var stylePath = "rPr." + key;
                var value = inheritedStyle.get(stylePath);
                if (value != undefined) {
                    style[key] = value;
                }
                return style;
            }, {});
        }
    }]);
    return _class;
}(_text2.default);

_class.contextTypes = (0, _extends3.default)({}, _text2.default.contextTypes, {
    inheritedStyle: _react.PropTypes.object
});
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3RleHQuanMiXSwibmFtZXMiOlsiaW5oZXJpdGVkU3R5bGUiLCJjb250ZXh0Iiwic3BsaXQiLCJyZWR1Y2UiLCJzdHlsZSIsImtleSIsInN0eWxlUGF0aCIsInZhbHVlIiwiZ2V0IiwidW5kZWZpbmVkIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O21DQVFjO0FBQUEsZ0JBQ0NBLGNBREQsR0FDaUIsS0FBS0MsT0FEdEIsQ0FDQ0QsY0FERDs7O0FBR1osbUJBQU8sNkJBQTZCRSxLQUE3QixDQUFtQyxHQUFuQyxFQUF3Q0MsTUFBeEMsQ0FBK0MsVUFBQ0MsS0FBRCxFQUFRQyxHQUFSLEVBQWM7QUFDMUQsb0JBQUlDLHFCQUFpQkQsR0FBckI7QUFDVCxvQkFBSUUsUUFBTVAsZUFBZVEsR0FBZixDQUFtQkYsU0FBbkIsQ0FBVjtBQUNTLG9CQUFHQyxTQUFPRSxTQUFWLEVBQW9CO0FBQ2hCTCwwQkFBTUMsR0FBTixJQUFXRSxLQUFYO0FBQ1o7QUFDUSx1QkFBT0gsS0FBUDtBQUNILGFBUEEsRUFPQyxFQVBELENBQVA7QUFRRzs7Ozs7T0FoQk1NLFksOEJBQ04sZUFBS0EsWTtBQUNSVixvQkFBZ0IsaUJBQVVXIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi4vLi4vY29udGVudC90ZXh0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBUZXh0e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdC4uLlRleHQuY29udGV4dFR5cGVzLFxuXHRcdGluaGVyaXRlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuICAgIGdldFN0eWxlKCl7XG4gICAgICAgIGNvbnN0IHtpbmhlcml0ZWRTdHlsZX09dGhpcy5jb250ZXh0XG5cblx0XHRyZXR1cm4gJ3JGb250cyxzeixjb2xvcixiLGksdmFuaXNoJy5zcGxpdChcIixcIikucmVkdWNlKChzdHlsZSwga2V5KT0+e1xuICAgICAgICAgICAgbGV0IHN0eWxlUGF0aD1gclByLiR7a2V5fWBcblx0XHRcdGxldCB2YWx1ZT1pbmhlcml0ZWRTdHlsZS5nZXQoc3R5bGVQYXRoKVxuICAgICAgICAgICAgaWYodmFsdWUhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XT12YWx1ZVxuXHRcdFx0fVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlXG4gICAgICAgIH0se30pXG4gICAgfVxufVxuIl19