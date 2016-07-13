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
                { className: "page" },
                _react2.default.createElement(Paper, { width: width, height: height, fill: "white" }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9wYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBQ3FFLEtBQUssS0FBTCxDQURyRTtxQ0FDRyxLQURIO2dCQUNTLDBCQURUO2dCQUNnQiw0QkFEaEI7dUNBQ3lCLE9BRHpCO2dCQUNpQywwQkFEakM7Z0JBQ3NDLHdCQUR0QztnQkFDNEMseUJBRDVDO2dCQUNxRCx1QkFEckQ7Z0JBQzZELHVCQUQ3RDs7QUFFSixtQkFDSTs7a0JBQU8sV0FBVSxNQUFWLEVBQVA7Z0JBQ0ksOEJBQUMsS0FBRCxJQUFPLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixNQUFLLE9BQUwsRUFBckMsQ0FESjtnQkFFSyxNQUZMO2dCQUdSOztzQkFBTyxHQUFHLElBQUgsRUFBUyxHQUFHLEdBQUgsRUFBaEI7b0JBQ0UsUUFBUSxHQUFSLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDsrQkFBTyw4QkFBQyxNQUFELGFBQVEsS0FBSyxDQUFMLElBQVksRUFBcEI7cUJBQVAsQ0FEZDtpQkFIUTtnQkFNSyxNQU5MO2FBREosQ0FGSTs7OztXQURTOzs7S0FlVixZQUFVO0FBQ2IsYUFBUyxpQkFBVSxPQUFWLENBQWtCLGlCQUFVLE1BQVYsQ0FBbEIsQ0FBb0MsVUFBcEM7QUFDZixVQUFNLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDTixZQUFRLGlCQUFVLE1BQVY7QUFDRixZQUFRLGlCQUFVLE9BQVY7QUFDUixZQUFRLGlCQUFVLE9BQVY7O2tCQXBCSzs7SUF3QmY7Ozs7Ozs7Ozs7OztJQUVBOzs7Ozs7Ozs7OztpQ0FDRztBQUNQLG1CQUFPLHNDQUFVLEtBQUssS0FBTCxDQUFqQixDQURPOzs7O1dBREgiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7c2l6ZTp7d2lkdGgsIGhlaWdodH0sIG1hcmdpbjp7bGVmdCx0b3B9LCBjb2x1bW5zLCBoZWFkZXIsIGZvb3Rlcn09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGNsYXNzTmFtZT1cInBhZ2VcIj5cbiAgICAgICAgICAgICAgICA8UGFwZXIgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gZmlsbD1cIndoaXRlXCIvPlxuICAgICAgICAgICAgICAgIHtoZWFkZXJ9XG5cdFx0XHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9PlxuXHRcdFx0XHRcdHtjb2x1bW5zLm1hcCgoYSxpKT0+PENvbHVtbiBrZXk9e2l9IHsuLi5hfS8+KX1cblx0XHRcdFx0PC9Hcm91cD5cbiAgICAgICAgICAgICAgICB7Zm9vdGVyfVxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuXHRcdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGhlYWRlcjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gICAgICAgIGZvb3RlcjogUHJvcFR5cGVzLmVsZW1lbnRcbiAgICB9XG59XG5cbmNsYXNzIENvbHVtbiBleHRlbmRzIEdyb3Vwe31cblxuY2xhc3MgUGFwZXIgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiA8cmVjdCB7Li4udGhpcy5wcm9wc30vPlxuXHR9XG59XG4iXX0=