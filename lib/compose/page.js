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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlL3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDt5QkFDbUQsS0FBSyxLQUFMLENBRG5EO2dCQUNHLHFCQURIO2dCQUNVLHVCQURWO2dCQUNrQix1QkFEbEI7Z0JBQzBCLHlCQUQxQjtnQkFDbUMsdUJBRG5DO2dCQUMyQyx1QkFEM0M7O0FBRUosbUJBQ0k7OztnQkFDSSx3Q0FBTSxPQUFPLEtBQVAsRUFBYyxRQUFRLE1BQVIsRUFBZ0IsTUFBSyxPQUFMLEVBQXBDLENBREo7Z0JBRUssTUFGTDtnQkFHSyxRQUFRLEdBQVIsQ0FBWSxVQUFDLENBQUQsRUFBRyxDQUFIOzJCQUFPLDhCQUFDLE1BQUQsYUFBUSxLQUFLLENBQUwsSUFBWSxFQUFwQjtpQkFBUCxDQUhqQjtnQkFJSyxNQUpMO2FBREosQ0FGSTs7OztXQURTOzs7S0FhVixZQUFVO0FBQ2IsYUFBUyxpQkFBVSxPQUFWLENBQWtCLGlCQUFVLE1BQVYsQ0FBbEIsQ0FBb0MsVUFBcEM7QUFDVCxZQUFRLGlCQUFVLE9BQVY7QUFDUixZQUFRLGlCQUFVLE9BQVY7O2tCQWhCSzs7SUFvQmYiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodCwgbWFyZ2luLCBjb2x1bW5zLCBoZWFkZXIsIGZvb3Rlcn09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwPlxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IGZpbGw9XCJ3aGl0ZVwiLz5cbiAgICAgICAgICAgICAgICB7aGVhZGVyfVxuICAgICAgICAgICAgICAgIHtjb2x1bW5zLm1hcCgoYSxpKT0+PENvbHVtbiBrZXk9e2l9IHsuLi5hfS8+KX1cbiAgICAgICAgICAgICAgICB7Zm9vdGVyfVxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuICAgICAgICBoZWFkZXI6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgICAgICBmb290ZXI6IFByb3BUeXBlcy5lbGVtZW50XG4gICAgfVxufVxuXG5jbGFzcyBDb2x1bW4gZXh0ZW5kcyBHcm91cHt9XG4iXX0=