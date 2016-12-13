"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Line = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("./group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = exports.Line = function Line(_ref) {
	var children = _ref.children;

	var height = children.reduce(function (h, _ref2) {
		var height = _ref2.props.height;
		return Math.max(h, height);
	}, 0);
	var descent = children.reduce(function (h, _ref3) {
		var _ref3$props$descent = _ref3.props.descent,
		    descent = _ref3$props$descent === undefined ? 0 : _ref3$props$descent;
		return Math.max(h, descent);
	}, 0);

	return _react2.default.createElement(
		_group2.default,
		{ y: height - descent, className: "line" },
		children.reduce(function (state, piece, i) {
			var pieces = state.pieces,
			    x = state.x;
			var _piece$props = piece.props,
			    width = _piece$props.width,
			    height = _piece$props.height;

			pieces.push(_react2.default.createElement(
				_group2.default,
				{ x: x, key: i },
				piece
			));
			state.x = x + width;
			return state;
		}, { pieces: [], x: 0 }).pieces
	);
};

exports.default = Line;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9saW5lLmpzIl0sIm5hbWVzIjpbIkxpbmUiLCJjaGlsZHJlbiIsImhlaWdodCIsInJlZHVjZSIsImgiLCJwcm9wcyIsIk1hdGgiLCJtYXgiLCJkZXNjZW50Iiwic3RhdGUiLCJwaWVjZSIsImkiLCJwaWVjZXMiLCJ4Iiwid2lkdGgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsc0JBQUssU0FBTEEsSUFBSyxPQUFjO0FBQUEsS0FBWkMsUUFBWSxRQUFaQSxRQUFZOztBQUMvQixLQUFNQyxTQUFPRCxTQUFTRSxNQUFULENBQWdCLFVBQUNDLENBQUQ7QUFBQSxNQUFXRixNQUFYLFNBQUlHLEtBQUosQ0FBV0gsTUFBWDtBQUFBLFNBQXNCSSxLQUFLQyxHQUFMLENBQVNILENBQVQsRUFBV0YsTUFBWCxDQUF0QjtBQUFBLEVBQWhCLEVBQXlELENBQXpELENBQWI7QUFDQSxLQUFNTSxVQUFRUCxTQUFTRSxNQUFULENBQWdCLFVBQUNDLENBQUQ7QUFBQSxrQ0FBSUMsS0FBSixDQUFXRyxPQUFYO0FBQUEsTUFBV0EsT0FBWCx1Q0FBbUIsQ0FBbkI7QUFBQSxTQUF5QkYsS0FBS0MsR0FBTCxDQUFTSCxDQUFULEVBQVdJLE9BQVgsQ0FBekI7QUFBQSxFQUFoQixFQUE2RCxDQUE3RCxDQUFkOztBQUVBLFFBQ0M7QUFBQTtBQUFBLElBQU8sR0FBR04sU0FBT00sT0FBakIsRUFBMEIsV0FBVSxNQUFwQztBQUVDUCxXQUFTRSxNQUFULENBQWdCLFVBQUNNLEtBQUQsRUFBT0MsS0FBUCxFQUFhQyxDQUFiLEVBQWlCO0FBQUEsT0FDekJDLE1BRHlCLEdBQ2ZILEtBRGUsQ0FDekJHLE1BRHlCO0FBQUEsT0FDbEJDLENBRGtCLEdBQ2ZKLEtBRGUsQ0FDbEJJLENBRGtCO0FBQUEsc0JBRVhILE1BQU1MLEtBRks7QUFBQSxPQUV6QlMsS0FGeUIsZ0JBRXpCQSxLQUZ5QjtBQUFBLE9BRW5CWixNQUZtQixnQkFFbkJBLE1BRm1COztBQUdoQ1UsVUFBT0csSUFBUCxDQUNDO0FBQUE7QUFBQSxNQUFPLEdBQUdGLENBQVYsRUFBYSxLQUFLRixDQUFsQjtBQUNFRDtBQURGLElBREQ7QUFLQUQsU0FBTUksQ0FBTixHQUFRQSxJQUFFQyxLQUFWO0FBQ0EsVUFBT0wsS0FBUDtBQUNBLEdBVkQsRUFVRSxFQUFDRyxRQUFPLEVBQVIsRUFBV0MsR0FBRSxDQUFiLEVBVkYsRUFVbUJEO0FBWnBCLEVBREQ7QUFpQkEsQ0FyQk07O2tCQXVCUVosSSIsImZpbGUiOiJsaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxuXG5leHBvcnQgY29uc3QgTGluZT0oe2NoaWxkcmVufSk9Pntcblx0Y29uc3QgaGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgoaCx7cHJvcHM6e2hlaWdodH19KT0+TWF0aC5tYXgoaCxoZWlnaHQpLDApXG5cdGNvbnN0IGRlc2NlbnQ9Y2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7ZGVzY2VudD0wfX0pPT5NYXRoLm1heChoLGRlc2NlbnQpLDApXG5cdFxuXHRyZXR1cm4gKFxuXHRcdDxHcm91cCB5PXtoZWlnaHQtZGVzY2VudH0gY2xhc3NOYW1lPVwibGluZVwiPlxuXHRcdHtcblx0XHRcdGNoaWxkcmVuLnJlZHVjZSgoc3RhdGUscGllY2UsaSk9Pntcblx0XHRcdFx0Y29uc3Qge3BpZWNlcyx4fT1zdGF0ZVxuXHRcdFx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0fT1waWVjZS5wcm9wc1xuXHRcdFx0XHRwaWVjZXMucHVzaChcblx0XHRcdFx0XHQ8R3JvdXAgeD17eH0ga2V5PXtpfT5cblx0XHRcdFx0XHRcdHtwaWVjZX1cblx0XHRcdFx0XHQ8L0dyb3VwPlxuXHRcdFx0XHQpO1xuXHRcdFx0XHRzdGF0ZS54PXgrd2lkdGhcblx0XHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0XHR9LHtwaWVjZXM6W10seDowfSkucGllY2VzXG5cdFx0fVxuXHRcdDwvR3JvdXA+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZVxuIl19