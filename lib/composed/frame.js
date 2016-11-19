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

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Frame = function (_Component) {
    (0, _inherits3.default)(Frame, _Component);

    function Frame() {
        (0, _classCallCheck3.default)(this, Frame);
        return (0, _possibleConstructorReturn3.default)(this, (Frame.__proto__ || (0, _getPrototypeOf2.default)(Frame)).apply(this, arguments));
    }

    (0, _createClass3.default)(Frame, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                _props$margin = _props.margin,
                left = _props$margin.left,
                top = _props$margin.top,
                columns = _props.columns;

            return _react2.default.createElement(
                _group2.default,
                { x: left, y: top },
                columns.map(function (a, i) {
                    return _react2.default.createElement(Column, (0, _extends3.default)({ key: i }, a));
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
    (0, _inherits3.default)(Column, _Group);

    function Column() {
        (0, _classCallCheck3.default)(this, Column);
        return (0, _possibleConstructorReturn3.default)(this, (Column.__proto__ || (0, _getPrototypeOf2.default)(Column)).apply(this, arguments));
    }

    return Column;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZSIsInByb3BzIiwibWFyZ2luIiwibGVmdCIsInRvcCIsImNvbHVtbnMiLCJtYXAiLCJhIiwiaSIsInByb3BUeXBlcyIsImFycmF5T2YiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic2l6ZSIsIkNvbHVtbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7O2lDQUNUO0FBQUEseUJBQytCLEtBQUtDLEtBRHBDO0FBQUEsdUNBQ0dDLE1BREg7QUFBQSxnQkFDV0MsSUFEWCxpQkFDV0EsSUFEWDtBQUFBLGdCQUNnQkMsR0FEaEIsaUJBQ2dCQSxHQURoQjtBQUFBLGdCQUNzQkMsT0FEdEIsVUFDc0JBLE9BRHRCOztBQUVKLG1CQUNMO0FBQUE7QUFBQSxrQkFBTyxHQUFHRixJQUFWLEVBQWdCLEdBQUdDLEdBQW5CO0FBQ0VDLHdCQUFRQyxHQUFSLENBQVksVUFBQ0MsQ0FBRCxFQUFHQyxDQUFIO0FBQUEsMkJBQU8sOEJBQUMsTUFBRCwyQkFBUSxLQUFLQSxDQUFiLElBQW9CRCxDQUFwQixFQUFQO0FBQUEsaUJBQVo7QUFERixhQURLO0FBS0g7Ozs7O0FBUmdCUCxLLENBVVZTLFMsR0FBVTtBQUNiSixhQUFTLGlCQUFVSyxPQUFWLENBQWtCLGlCQUFVQyxNQUE1QixFQUFvQ0MsVUFEaEM7QUFFYkMsVUFBTSxpQkFBVUYsTUFBVixDQUFpQkMsVUFGVjtBQUdiVixZQUFRLGlCQUFVUztBQUhMLEM7a0JBVkFYLEs7O0lBa0JmYyxNIiwiZmlsZSI6ImZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7bWFyZ2luOntsZWZ0LHRvcH0sIGNvbHVtbnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9PlxuXHRcdFx0XHR7Y29sdW1ucy5tYXAoKGEsaSk9PjxDb2x1bW4ga2V5PXtpfSB7Li4uYX0vPil9XG5cdFx0XHQ8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXG4gICAgICAgIHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgbWFyZ2luOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfVxufVxuXG5cbmNsYXNzIENvbHVtbiBleHRlbmRzIEdyb3Vwe1xuXG59XG4iXX0=