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
            var columns = _props.columns;
            var header = _props.header;
            var footer = _props.footer;

            return _react2.default.createElement(
                _group2.default,
                null,
                _react2.default.createElement("rect", { width: width, height: height, fill: "white" }),
                header,
                _react2.default.createElement(
                    _group2.default,
                    { x: left, y: top },
                    columns.map(function (a, i) {
                        return _react2.default.createElement(Column, _extends({ key: i }, a));
                    })
                ),
                footer
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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBQ3FFLEtBQUssS0FBTCxDQURyRTtxQ0FDRyxLQURIO2dCQUNTLDBCQURUO2dCQUNnQiw0QkFEaEI7dUNBQ3lCLE9BRHpCO2dCQUNpQywwQkFEakM7Z0JBQ3NDLHdCQUR0QztnQkFDNEMseUJBRDVDO2dCQUNxRCx1QkFEckQ7Z0JBQzZELHVCQUQ3RDs7QUFFSixtQkFDSTs7O2dCQUNJLHdDQUFNLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixNQUFLLE9BQUwsRUFBcEMsQ0FESjtnQkFFSyxNQUZMO2dCQUdSOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBaEI7b0JBQ0UsUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsrQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7cUJBQVAsQ0FEZDtpQkFIUTtnQkFNSyxNQU5MO2FBREosQ0FGSTs7OztXQURTOzs7S0FlVixZQUFVO0FBQ2IsYUFBUyxpQkFBVSxPQUFWLENBQWtCLGlCQUFVLE1BQVYsQ0FBbEIsQ0FBb0MsVUFBcEM7QUFDZixVQUFNLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDTixZQUFRLGlCQUFVLE1BQVY7QUFDRixZQUFRLGlCQUFVLE9BQVY7QUFDUixZQUFRLGlCQUFVLE9BQVY7O2tCQXBCSzs7SUF3QmYiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7c2l6ZTp7d2lkdGgsIGhlaWdodH0sIG1hcmdpbjp7bGVmdCx0b3B9LCBjb2x1bW5zLCBoZWFkZXIsIGZvb3Rlcn09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICB7aGVhZGVyfVxuXHRcdFx0XHQ8R3JvdXAgeD17bGVmdH0geT17dG9wfT5cblx0XHRcdFx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxDb2x1bW4ga2V5PXtpfSB7Li4uYX0vPil9XG5cdFx0XHRcdDwvR3JvdXA+XG4gICAgICAgICAgICAgICAge2Zvb3Rlcn1cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcblx0XHRzaXplOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBoZWFkZXI6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBmb290ZXI6IFByb3BUeXBlcy5lbGVtZW50XG4gICAgfVxufVxuXG5jbGFzcyBDb2x1bW4gZXh0ZW5kcyBHcm91cHtcbiAgICBcbn1cbiJdfQ==