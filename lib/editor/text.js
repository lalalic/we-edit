"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
    _inherits(_class, _editable);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "createComposedPiece",
        value: function createComposedPiece(props) {
            var _this2 = this;

            return _react2.default.createElement("text", _extends({}, props, { onClick: function onClick(e) {
                    return _this2.onClick(e, props);
                } }));
        }
    }, {
        key: "onClick",
        value: function onClick(event, text) {
            var _this3 = this;

            var offsetX = event.nativeEvent.offsetX;

            var composer = new this.constructor.WordWrapper(text.children);
            var loc = composer.next({ width: offsetX }) || { end: 0 };
            var index = text.end - text.children.length + loc.end;
            this.setState({ cursor: index, content: "Raymond changed it" }, function (a) {
                return _this3.reCompose();
            });
        }
    }]);

    return _class;
}((0, _editable3.default)(_content.Text));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NENBR3dCLE9BQU07OztBQUN0QixtQkFBTyxtREFBVSxTQUFPLFNBQVM7MkJBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLEtBQWY7aUJBQUgsR0FBMUIsQ0FBUCxDQURzQjs7OztnQ0FJbEIsT0FBTyxNQUFLOzs7Z0JBQ1QsVUFBUyxNQUFNLFdBQU4sQ0FBVCxRQURTOztBQUVoQixnQkFBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLEtBQUssUUFBTCxDQUExQyxDQUZZO0FBR2hCLGdCQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUhRO0FBSWhCLGdCQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FKeEI7QUFLaEIsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxLQUFQLEVBQWMsU0FBUSxvQkFBUixFQUE3QixFQUE0RDt1QkFBRyxPQUFLLFNBQUw7YUFBSCxDQUE1RCxDQUxnQjs7Ozs7RUFMSyIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHR9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoVGV4dCl7XG4gICAgY3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XG4gICAgICAgIHJldHVybiA8dGV4dCB7Li4ucHJvcHN9IG9uQ2xpY2s9e2U9PnRoaXMub25DbGljayhlLHByb3BzKX0vPlxuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xuICAgICAgICBjb25zdCB7b2Zmc2V0WH09ZXZlbnQubmF0aXZlRXZlbnRcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKHRleHQuY2hpbGRyZW4pXG4gICAgICAgIGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XG4gICAgICAgIGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnNvcjppbmRleCwgY29udGVudDpcIlJheW1vbmQgY2hhbmdlZCBpdFwifSwgYT0+dGhpcy5yZUNvbXBvc2UoKSlcbiAgICB9XG59XG4iXX0=