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

var _line = require("./line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var _props$size = _props.size;
            var width = _props$size.width;
            var height = _props$size.height;
            var _props$margin = _props.margin;
            var left = _props$margin.left;
            var top = _props$margin.top;
            var bottom = _props$margin.bottom;
            var _props$margin$header = _props$margin.header;
            var headerStartAt = _props$margin$header === undefined ? 0 : _props$margin$header;
            var columns = _props.columns;
            var header = _props.header;
            var footer = _props.footer;

            return _react2.default.createElement(
                _group2.default,
                { className: "page" },
                _react2.default.createElement(Paper, { width: width, height: height, fill: "white" }),
                _react2.default.createElement(
                    _group2.default,
                    { x: left, y: headerStartAt },
                    header
                ),
                _react2.default.createElement(
                    _group2.default,
                    { x: left, y: top, className: "content" },
                    columns.map(function (a, i) {
                        return _react2.default.createElement(Column, _extends({ key: i }, a));
                    })
                ),
                _react2.default.createElement(
                    _group2.default,
                    { x: left, y: height - bottom },
                    footer
                )
            );
        }
    }]);

    return Page;
}(_react.Component);

Page.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    size: _react.PropTypes.object.isRequired,
    margin: _react.PropTypes.object,
    header: _react.PropTypes.element,
    footer: _react.PropTypes.element
};
exports.default = Page;

var Column = function (_Group) {
    _inherits(Column, _Group);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
    }

    return Column;
}(_group2.default);

var Paper = function (_Component2) {
    _inherits(Paper, _Component2);

    function Paper() {
        _classCallCheck(this, Paper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).apply(this, arguments));
    }

    _createClass(Paper, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("rect", this.props);
        }
    }]);

    return Paper;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBTUQsS0FBSyxLQUFMLENBTkM7cUNBRVQsS0FGUztnQkFFSCwwQkFGRztnQkFFSSw0QkFGSjt1Q0FHVCxPQUhTO2dCQUdELDBCQUhDO2dCQUdJLHdCQUhKO2dCQUdTLDhCQUhUO3FEQUdpQixPQUhqQjtnQkFHd0IscURBQWMseUJBSHRDO2dCQUlULHlCQUpTO2dCQUtULHVCQUxTO2dCQU1ULHVCQU5TOztBQU9KLG1CQUNJOztrQkFBTyxXQUFVLE1BQVYsRUFBUDtnQkFDSSw4QkFBQyxLQUFELElBQU8sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE1BQUssT0FBTCxFQUFyQyxDQURKO2dCQUVJOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLGFBQUgsRUFBaEI7b0JBQW1DLE1BQW5DO2lCQUZKO2dCQUdSOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBUSxXQUFVLFNBQVYsRUFBeEI7b0JBQ0UsUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsrQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7cUJBQVAsQ0FEZDtpQkFIUTtnQkFNSTs7c0JBQU8sR0FBRyxJQUFILEVBQVMsR0FBRyxTQUFPLE1BQVAsRUFBbkI7b0JBQW1DLE1BQW5DO2lCQU5KO2FBREosQ0FQSTs7OztXQURTOzs7S0FvQlYsWUFBVTtBQUNiLGFBQVMsaUJBQVUsT0FBVixDQUFrQixpQkFBVSxNQUFWLENBQWxCLENBQW9DLFVBQXBDO0FBQ2YsVUFBTSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCO0FBQ04sWUFBUSxpQkFBVSxNQUFWO0FBQ0YsWUFBUSxpQkFBVSxPQUFWO0FBQ1IsWUFBUSxpQkFBVSxPQUFWOztrQkF6Qks7O0lBNkJmOzs7Ozs7Ozs7Ozs7SUFFQTs7Ozs7Ozs7Ozs7aUNBQ0c7QUFDUCxtQkFBTyxzQ0FBVSxLQUFLLEtBQUwsQ0FBakIsQ0FETzs7OztXQURIIiwiZmlsZSI6InBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge1xuXHRcdFx0c2l6ZTp7d2lkdGgsIGhlaWdodH0sIFxuXHRcdFx0bWFyZ2luOntsZWZ0LHRvcCwgYm90dG9tLCBoZWFkZXI6aGVhZGVyU3RhcnRBdD0wfSwgXG5cdFx0XHRjb2x1bW5zLCBcblx0XHRcdGhlYWRlciwgXG5cdFx0XHRmb290ZXJ9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cCBjbGFzc05hbWU9XCJwYWdlXCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17bGVmdH0geT17aGVhZGVyU3RhcnRBdH0+e2hlYWRlcn08L0dyb3VwPlxuXHRcdFx0XHQ8R3JvdXAgeD17bGVmdH0geT17dG9wfSBjbGFzc05hbWU9XCJjb250ZW50XCI+XG5cdFx0XHRcdFx0e2NvbHVtbnMubWFwKChhLGkpPT48Q29sdW1uIGtleT17aX0gey4uLmF9Lz4pfVxuXHRcdFx0XHQ8L0dyb3VwPlxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtsZWZ0fSB5PXtoZWlnaHQtYm90dG9tfT57Zm9vdGVyfTwvR3JvdXA+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXG5cdFx0c2l6ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdG1hcmdpbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgaGVhZGVyOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgZm9vdGVyOiBQcm9wVHlwZXMuZWxlbWVudFxuICAgIH1cbn1cblxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgR3JvdXB7fVxuXG5jbGFzcyBQYXBlciBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIDxyZWN0IHsuLi50aGlzLnByb3BzfS8+XG5cdH1cbn1cbiJdfQ==