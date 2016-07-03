"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_NoChild) {
    _inherits(Image, _NoChild);

    function Image() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Image);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Image)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "image", _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Image, [{
        key: "createComposedPiece",
        value: function createComposedPiece() {
            var _props = this.props;
            var src = _props.src;
            var width = _props.width;
            var height = _props.height;

            var others = _objectWithoutProperties(_props, ["src", "width", "height"]);

            var availableSpace = this.context.parent.nextAvailableSpace({ width: width, height: height });
            var props = Object.assign(others, {
                width: width,
                height: height,
                xlinkHref: src,
                y: -height
            });

            return _react2.default.createElement("image", props);
        }
    }]);

    return Image;
}(_any.NoChild);

exports.default = Image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2ltYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozt1TUFDakIsY0FBWTs7O2lCQURLOzs4Q0FFSTt5QkFDcUIsS0FBSyxLQUFMLENBRHJCO2dCQUNWLGlCQURVO2dCQUNMLHFCQURLO2dCQUNFLHVCQURGOztnQkFDYSxzRUFEYjs7QUFFakIsZ0JBQUksaUJBQWUsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsQ0FBdUMsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUF2QyxDQUFmLENBRmE7QUFHakIsZ0JBQUksUUFBTyxPQUFPLE1BQVAsQ0FBYyxNQUFkLEVBQXFCO0FBQ3hCLDRCQUR3QjtBQUV4Qiw4QkFGd0I7QUFHeEIsMkJBQVcsR0FBWDtBQUNBLG1CQUFFLENBQUMsTUFBRDthQUpDLENBQVAsQ0FIYTs7QUFVakIsbUJBQU8sdUNBQVcsS0FBWCxDQUFQLENBVmlCOzs7O1dBRkoiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2UgZXh0ZW5kcyBOb0NoaWxke1xuICAgIGRpc3BsYXlOYW1lPVwiaW1hZ2VcIlxuICAgIGNyZWF0ZUNvbXBvc2VkUGllY2UoKXtcbiAgICAgICAgY29uc3Qge3NyYywgd2lkdGgsIGhlaWdodCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGxldCBhdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSh7d2lkdGgsaGVpZ2h0fSlcbiAgICAgICAgbGV0IHByb3BzPShPYmplY3QuYXNzaWduKG90aGVycyx7XG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHhsaW5rSHJlZjogc3JjLFxuICAgICAgICAgICAgICAgIHk6LWhlaWdodFxuICAgICAgICAgICAgfSkpXG5cbiAgICAgICAgcmV0dXJuIDxpbWFnZSB7Li4ucHJvcHN9IC8+XG4gICAgfVxufVxuIl19