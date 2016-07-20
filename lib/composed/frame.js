"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Frame = function (_Component) {
    _inherits(Frame, _Component);

    function Frame() {
        _classCallCheck(this, Frame);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Frame).apply(this, arguments));
    }

    _createClass(Frame, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var _props$margin = _props.margin;
            var left = _props$margin.left;
            var top = _props$margin.top;
            var columns = _props.columns;

            return _react2.default.createElement(
                _group2.default,
                { x: left, y: top },
                columns.map(function (a, i) {
                    return _react2.default.createElement(Column, _extends({ key: i }, a));
                })
            );
        }
    }]);

    return Frame;
}(_react.Component);

Frame.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    size: _react.PropTypes.object.isRequired,
    margin: _react.PropTypes.object
};
exports.default = Frame;

var Column = function (_Group) {
    _inherits(Column, _Group);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
    }

    return Column;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9mcmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDt5QkFDK0IsS0FBSyxLQUFMLENBRC9CO3VDQUNHLE9BREg7Z0JBQ1csMEJBRFg7Z0JBQ2dCLHdCQURoQjtnQkFDc0IseUJBRHRCOztBQUVKLG1CQUNMOztrQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBaEI7Z0JBQ0UsUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsyQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7aUJBQVAsQ0FEZDthQURLLENBRkk7Ozs7V0FEUzs7O01BVVYsWUFBVTtBQUNiLGFBQVMsaUJBQVUsT0FBVixDQUFrQixpQkFBVSxNQUFWLENBQWxCLENBQW9DLFVBQXBDO0FBQ1QsVUFBTSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCO0FBQ04sWUFBUSxpQkFBVSxNQUFWOztrQkFiSzs7SUFrQmYiLCJmaWxlIjoiZnJhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWUgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHttYXJnaW46e2xlZnQsdG9wfSwgY29sdW1uc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHg9e2xlZnR9IHk9e3RvcH0+XG5cdFx0XHRcdHtjb2x1bW5zLm1hcCgoYSxpKT0+PENvbHVtbiBrZXk9e2l9IHsuLi5hfS8+KX1cblx0XHRcdDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcbiAgICAgICAgc2l6ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBtYXJnaW46IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG59XG5cblxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgR3JvdXB7XG5cbn1cbiJdfQ==