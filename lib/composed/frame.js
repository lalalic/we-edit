"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Frame = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Frame = exports.Frame = function Frame(_ref) {
	var _ref$margin = _ref.margin,
	    left = _ref$margin.left,
	    top = _ref$margin.top,
	    columns = _ref.columns;
	return _react2.default.createElement(
		_group2.default,
		{ x: left, y: top },
		columns.map(function (a, i) {
			return _react2.default.createElement(_group2.default, _extends({ key: i }, a));
		})
	);
};

Frame.propTypes = {
	columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	size: _react.PropTypes.object.isRequired,
	margin: _react.PropTypes.object
};

exports.default = Frame;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9mcmFtZS5qcyJdLCJuYW1lcyI6WyJGcmFtZSIsIm1hcmdpbiIsImxlZnQiLCJ0b3AiLCJjb2x1bW5zIiwibWFwIiwiYSIsImkiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7OztBQUVPLElBQU1BLHdCQUFNLFNBQU5BLEtBQU07QUFBQSx3QkFBRUMsTUFBRjtBQUFBLEtBQVVDLElBQVYsZUFBVUEsSUFBVjtBQUFBLEtBQWVDLEdBQWYsZUFBZUEsR0FBZjtBQUFBLEtBQXFCQyxPQUFyQixRQUFxQkEsT0FBckI7QUFBQSxRQUNsQjtBQUFBO0FBQUEsSUFBTyxHQUFHRixJQUFWLEVBQWdCLEdBQUdDLEdBQW5CO0FBQ0VDLFVBQVFDLEdBQVIsQ0FBWSxVQUFDQyxDQUFELEVBQUdDLENBQUg7QUFBQSxVQUFPLDBEQUFPLEtBQUtBLENBQVosSUFBbUJELENBQW5CLEVBQVA7QUFBQSxHQUFaO0FBREYsRUFEa0I7QUFBQSxDQUFaOztBQU1QTixNQUFNUSxTQUFOLEdBQWdCO0FBQ2ZKLFVBQVMsaUJBQVVLLE9BQVYsQ0FBa0IsaUJBQVVDLE1BQTVCLEVBQW9DQyxVQUQ5QjtBQUVmQyxPQUFNLGlCQUFVRixNQUFWLENBQWlCQyxVQUZSO0FBR2ZWLFNBQVEsaUJBQVVTO0FBSEgsQ0FBaEI7O2tCQU1lVixLIiwiZmlsZSI6ImZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEZyYW1lPSh7bWFyZ2luOntsZWZ0LHRvcH0sIGNvbHVtbnN9KT0+KFxyXG5cdDxHcm91cCB4PXtsZWZ0fSB5PXt0b3B9PlxyXG5cdFx0e2NvbHVtbnMubWFwKChhLGkpPT48R3JvdXAga2V5PXtpfSB7Li4uYX0vPil9XHJcblx0PC9Hcm91cD5cclxuKVxyXG5cclxuRnJhbWUucHJvcFR5cGVzPXtcclxuXHRjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG5cdHNpemU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRtYXJnaW46IFByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRnJhbWVcclxuIl19