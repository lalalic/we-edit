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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
            var x = _props.x;
            var y = _props.y;
            var width = _props.width;
            var height = _props.height;
            var margin = _props.margin;
            var columns = _props.columns;
            var header = _props.header;
            var footer = _props.footer;

            return _react2.default.createElement(
                _group2.default,
                { x: x, y: y },
                _react2.default.createElement("rect", { x: 0, y: 0, width: width, height: height, fill: "white" }),
                header,
                columns.map(function (a, i) {
                    var lines = a.children;
                    var x = a.x;
                    var y = a.y;

                    var lineY = 0;
                    return _react2.default.createElement(
                        Column,
                        { key: i, x: x, y: y },
                        lines.map(function (a, i) {
                            var height = a.height;

                            var others = _objectWithoutProperties(a, ["height"]);

                            return _react2.default.createElement(_line2.default, _extends({ key: i, x: 0, y: lineY += height }, others));
                        })
                    );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlL3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUNUO3lCQUN1RCxLQUFLLEtBQUwsQ0FEdkQ7Z0JBQ0csYUFESDtnQkFDSyxhQURMO2dCQUNPLHFCQURQO2dCQUNjLHVCQURkO2dCQUNzQix1QkFEdEI7Z0JBQzhCLHlCQUQ5QjtnQkFDdUMsdUJBRHZDO2dCQUMrQyx1QkFEL0M7O0FBRUosbUJBQ0k7O2tCQUFPLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBSCxFQUFiO2dCQUNJLHdDQUFNLEdBQUcsQ0FBSCxFQUFNLEdBQUcsQ0FBSCxFQUFNLE9BQU8sS0FBUCxFQUFjLFFBQVEsTUFBUixFQUFnQixNQUFLLE9BQUwsRUFBaEQsQ0FESjtnQkFFSyxNQUZMO2dCQUdLLFFBQVEsR0FBUixDQUFZLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTzt3QkFDQyxRQUFZLEVBQXRCLFNBRFM7d0JBQ1EsSUFBSyxFQUFMLEVBRFI7d0JBQ1UsSUFBRyxFQUFILEVBRFY7O0FBRWhCLHdCQUFJLFFBQU0sQ0FBTixDQUZZO0FBR2hCLDJCQUNJO0FBQUMsOEJBQUQ7MEJBQVEsS0FBSyxDQUFMLEVBQVEsR0FBRyxDQUFILEVBQU0sR0FBRyxDQUFILEVBQXRCO3dCQUNLLE1BQU0sR0FBTixDQUFVLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztnQ0FDVCxTQUFtQixFQUFuQixPQURTOztnQ0FDRSxrQ0FBUSxlQURWOztBQUVkLG1DQUFPLHlEQUFNLEtBQUssQ0FBTCxFQUFRLEdBQUcsQ0FBSCxFQUFNLEdBQUcsU0FBTyxNQUFQLElBQW1CLE9BQTFDLENBQVAsQ0FGYzt5QkFBUCxDQURmO3FCQURKLENBSGdCO2lCQUFQLENBSGpCO2dCQWVLLE1BZkw7YUFESixDQUZJOzs7O1dBRFM7OztLQXdCVixZQUFVO0FBQ2IsYUFBUyxpQkFBVSxPQUFWLENBQWtCLGlCQUFVLE1BQVYsQ0FBbEIsQ0FBb0MsVUFBcEM7QUFDVCxZQUFRLGlCQUFVLE9BQVY7QUFDUixZQUFRLGlCQUFVLE9BQVY7O2tCQTNCSzs7SUErQmYiLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuL2dyb3VwXCJcbmltcG9ydCBMaW5lIGZyb20gXCIuL2xpbmVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7eCx5LHdpZHRoLCBoZWlnaHQsIG1hcmdpbiwgY29sdW1ucywgaGVhZGVyLCBmb290ZXJ9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cCB4PXt4fSB5PXt5fT5cbiAgICAgICAgICAgICAgICA8cmVjdCB4PXswfSB5PXswfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBmaWxsPVwid2hpdGVcIi8+XG4gICAgICAgICAgICAgICAge2hlYWRlcn1cbiAgICAgICAgICAgICAgICB7Y29sdW1ucy5tYXAoKGEsaSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOiBsaW5lcywgeCx5fT1hXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lWT0wXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29sdW1uIGtleT17aX0geD17eH0geT17eX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xpbmVzLm1hcCgoYSxpKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge2hlaWdodCwgLi4ub3RoZXJzfT1hXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TGluZSBrZXk9e2l9IHg9ezB9IHk9e2xpbmVZKz1oZWlnaHR9IHsuLi5vdGhlcnN9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge2Zvb3Rlcn1cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcbiAgICAgICAgaGVhZGVyOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICAgICAgZm9vdGVyOiBQcm9wVHlwZXMuZWxlbWVudFxuICAgIH1cbn1cblxuY2xhc3MgQ29sdW1uIGV4dGVuZHMgR3JvdXB7fVxuIl19