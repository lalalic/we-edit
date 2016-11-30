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
				{ x: x },
				piece
			));
			state.x = x + width;
			return state;
		}, { pieces: [], x: 0 }).pieces
	);
};

exports.default = Line;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC9saW5lLmpzIl0sIm5hbWVzIjpbIkxpbmUiLCJjaGlsZHJlbiIsImhlaWdodCIsInJlZHVjZSIsImgiLCJwcm9wcyIsIk1hdGgiLCJtYXgiLCJkZXNjZW50Iiwic3RhdGUiLCJwaWVjZSIsImkiLCJwaWVjZXMiLCJ4Iiwid2lkdGgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsc0JBQUssU0FBTEEsSUFBSyxPQUFjO0FBQUEsS0FBWkMsUUFBWSxRQUFaQSxRQUFZOztBQUMvQixLQUFNQyxTQUFPRCxTQUFTRSxNQUFULENBQWdCLFVBQUNDLENBQUQ7QUFBQSxNQUFXRixNQUFYLFNBQUlHLEtBQUosQ0FBV0gsTUFBWDtBQUFBLFNBQXNCSSxLQUFLQyxHQUFMLENBQVNILENBQVQsRUFBV0YsTUFBWCxDQUF0QjtBQUFBLEVBQWhCLEVBQXlELENBQXpELENBQWI7QUFDQSxLQUFNTSxVQUFRUCxTQUFTRSxNQUFULENBQWdCLFVBQUNDLENBQUQ7QUFBQSxrQ0FBSUMsS0FBSixDQUFXRyxPQUFYO0FBQUEsTUFBV0EsT0FBWCx1Q0FBbUIsQ0FBbkI7QUFBQSxTQUF5QkYsS0FBS0MsR0FBTCxDQUFTSCxDQUFULEVBQVdJLE9BQVgsQ0FBekI7QUFBQSxFQUFoQixFQUE2RCxDQUE3RCxDQUFkOztBQUVBLFFBQ0M7QUFBQTtBQUFBLElBQU8sR0FBR04sU0FBT00sT0FBakIsRUFBMEIsV0FBVSxNQUFwQztBQUVDUCxXQUFTRSxNQUFULENBQWdCLFVBQUNNLEtBQUQsRUFBT0MsS0FBUCxFQUFhQyxDQUFiLEVBQWlCO0FBQUEsT0FDekJDLE1BRHlCLEdBQ2ZILEtBRGUsQ0FDekJHLE1BRHlCO0FBQUEsT0FDbEJDLENBRGtCLEdBQ2ZKLEtBRGUsQ0FDbEJJLENBRGtCO0FBQUEsc0JBRVhILE1BQU1MLEtBRks7QUFBQSxPQUV6QlMsS0FGeUIsZ0JBRXpCQSxLQUZ5QjtBQUFBLE9BRW5CWixNQUZtQixnQkFFbkJBLE1BRm1COztBQUdoQ1UsVUFBT0csSUFBUCxDQUNDO0FBQUE7QUFBQSxNQUFPLEdBQUdGLENBQVY7QUFDRUg7QUFERixJQUREO0FBS0FELFNBQU1JLENBQU4sR0FBUUEsSUFBRUMsS0FBVjtBQUNBLFVBQU9MLEtBQVA7QUFDQSxHQVZELEVBVUUsRUFBQ0csUUFBTyxFQUFSLEVBQVdDLEdBQUUsQ0FBYixFQVZGLEVBVW1CRDtBQVpwQixFQUREO0FBaUJBLENBckJNOztrQkF1QlFaLEkiLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4vZ3JvdXBcIlxyXG5cclxuZXhwb3J0IGNvbnN0IExpbmU9KHtjaGlsZHJlbn0pPT57XHJcblx0Y29uc3QgaGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgoaCx7cHJvcHM6e2hlaWdodH19KT0+TWF0aC5tYXgoaCxoZWlnaHQpLDApXHJcblx0Y29uc3QgZGVzY2VudD1jaGlsZHJlbi5yZWR1Y2UoKGgse3Byb3BzOntkZXNjZW50PTB9fSk9Pk1hdGgubWF4KGgsZGVzY2VudCksMClcclxuXHRcclxuXHRyZXR1cm4gKFxyXG5cdFx0PEdyb3VwIHk9e2hlaWdodC1kZXNjZW50fSBjbGFzc05hbWU9XCJsaW5lXCI+XHJcblx0XHR7XHJcblx0XHRcdGNoaWxkcmVuLnJlZHVjZSgoc3RhdGUscGllY2UsaSk9PntcclxuXHRcdFx0XHRjb25zdCB7cGllY2VzLHh9PXN0YXRlXHJcblx0XHRcdFx0Y29uc3Qge3dpZHRoLGhlaWdodH09cGllY2UucHJvcHNcclxuXHRcdFx0XHRwaWVjZXMucHVzaChcclxuXHRcdFx0XHRcdDxHcm91cCB4PXt4fT5cclxuXHRcdFx0XHRcdFx0e3BpZWNlfVxyXG5cdFx0XHRcdFx0PC9Hcm91cD5cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdHN0YXRlLng9eCt3aWR0aFxyXG5cdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHR9LHtwaWVjZXM6W10seDowfSkucGllY2VzXHJcblx0XHR9XHJcblx0XHQ8L0dyb3VwPlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGluZVxyXG4iXX0=