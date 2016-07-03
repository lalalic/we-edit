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
            var width = _props.width;
            var height = _props.height;
            var margin = _props.margin;
            var columns = _props.columns;
            var header = _props.header;
            var footer = _props.footer;

            return _react2.default.createElement(
                _group2.default,
                null,
                _react2.default.createElement("rect", { width: width, height: height, fill: "white" }),
                header,
                columns.map(function (a, i) {
                    return _react2.default.createElement(Column, _extends({ key: i }, a));
                }),
                footer
            );
        }
    }]);

    return Page;
}(_react.Component);

Page.propTypes = {
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBQ21ELEtBQUssS0FBTCxDQURuRDtnQkFDRyxxQkFESDtnQkFDVSx1QkFEVjtnQkFDa0IsdUJBRGxCO2dCQUMwQix5QkFEMUI7Z0JBQ21DLHVCQURuQztnQkFDMkMsdUJBRDNDOztBQUVKLG1CQUNJOzs7Z0JBQ0ksd0NBQU0sT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLE1BQUssT0FBTCxFQUFwQyxDQURKO2dCQUVLLE1BRkw7Z0JBR0ssUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsyQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7aUJBQVAsQ0FIakI7Z0JBSUssTUFKTDthQURKLENBRkk7Ozs7V0FEUzs7O0tBYVYsWUFBVTtBQUNiLGFBQVMsaUJBQVUsT0FBVixDQUFrQixpQkFBVSxNQUFWLENBQWxCLENBQW9DLFVBQXBDO0FBQ1QsWUFBUSxpQkFBVSxPQUFWO0FBQ1IsWUFBUSxpQkFBVSxPQUFWOztrQkFoQks7O0lBb0JmIiwiZmlsZSI6InBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIG1hcmdpbiwgY29sdW1ucywgaGVhZGVyLCBmb290ZXJ9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cD5cbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAge2hlYWRlcn1cbiAgICAgICAgICAgICAgICB7Y29sdW1ucy5tYXAoKGEsaSk9PjxDb2x1bW4ga2V5PXtpfSB7Li4uYX0vPil9XG4gICAgICAgICAgICAgICAge2Zvb3Rlcn1cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcbiAgICAgICAgaGVhZGVyOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgZm9vdGVyOiBQcm9wVHlwZXMuZWxlbWVudFxuICAgIH1cbn1cblxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgR3JvdXB7XG4gICAgXG59XG4iXX0=