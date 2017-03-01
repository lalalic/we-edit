"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

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

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("./cursor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _editable2.default)(_content.Text);

var _class = function (_Super) {
	(0, _inherits3.default)(_class, _Super);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

		_this.state = (0, _assign2.default)((0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "state", _this) || {}, { content: _this.props.children });
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "getContentCount",
		value: function getContentCount() {
			return 1;
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var _this2 = this;

			var composed = (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _composed$props = composed.props,
			    width = _composed$props.width,
			    height = _composed$props.height,
			    descent = _composed$props.descent,
			    text = _composed$props.children;

			text = _react2.default.cloneElement(text, { onClick: function onClick(e) {
					return _this2.onClick(e, props);
				} });

			var ps = { width: width, height: height, descent: descent };
			var end = props.end,
			    textpiece = props.children;


			var cursor = this.context.cursor() || { state: {} };
			var _cursor$state = cursor.state,
			    target = _cursor$state.target,
			    cursorAt = _cursor$state.at;


			if (target == this && end - textpiece.length < cursorAt && cursorAt <= end) {
				ps.ref = function (a) {
					var node = _reactDom2.default.findDOMNode(a);
					var text = textpiece.substr(0, cursorAt - (end - textpiece.length));
					var style = _this2.getStyle();
					var composer = new _this2.constructor.WordWrapper(text, style);

					var _ref = composer.next({ width: width }) || { end: 0 },
					    contentWidth = _ref.contentWidth,
					    fontFamily = _ref.fontFamily;

					cursor.setState({
						target: _this2,
						at: cursorAt,
						node: node,
						width: contentWidth,
						height: composer.height,
						descent: composer.descent,
						style: style });
				};
			}
			return _react2.default.createElement(
				_group2.default,
				ps,
				text
			);
		}
	}, {
		key: "onClick",
		value: function onClick(event, text) {
			var _event$nativeEvent = event.nativeEvent,
			    _event$nativeEvent$of = _event$nativeEvent.offsetX,
			    offsetX = _event$nativeEvent$of === undefined ? 0 : _event$nativeEvent$of,
			    _event$nativeEvent$of2 = _event$nativeEvent.offsetY,
			    offsetY = _event$nativeEvent$of2 === undefined ? 0 : _event$nativeEvent$of2,
			    target = event.target;

			var x = offsetX - function (p) {
				var offset = 0;
				while (p && p.tagName != "svg") {
					var _x = p.getAttribute("x");
					if (_x) offset += parseFloat(_x);
					p = p.parentElement;
				}
				return offset;
			}(target.parentElement);
			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);

			var _ref2 = composer.next({ width: x }) || { end: 0, contentWidth: 0 },
			    contentWidth = _ref2.contentWidth,
			    end = _ref2.end;

			var index = text.end - text.children.length + end;
			var cursor = this.context.cursor();
			cursor.setState({
				target: this,
				at: index,
				node: target.parentNode,
				width: Math.ceil(contentWidth),
				height: composer.height,
				descent: composer.descent,
				style: style });
		}
	}, {
		key: "splice",
		value: function splice(start, length, str) {
			var _this3 = this;

			var content = this.state.content;

			this.setState({ content: content.splice(start, length, str) }, function (e) {
				_this3.reCompose();
			});
		}
	}]);
	return _class;
}(Super);

_class.contextTypes = (0, _assign2.default)({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJjb21wb3NlZCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsInRleHQiLCJjbG9uZUVsZW1lbnQiLCJvbkNsaWNrIiwiZSIsInBzIiwiZW5kIiwidGV4dHBpZWNlIiwiY3Vyc29yIiwiY29udGV4dCIsInRhcmdldCIsImN1cnNvckF0IiwiYXQiLCJsZW5ndGgiLCJyZWYiLCJub2RlIiwiZmluZERPTU5vZGUiLCJhIiwic3Vic3RyIiwic3R5bGUiLCJnZXRTdHlsZSIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsIm5leHQiLCJjb250ZW50V2lkdGgiLCJmb250RmFtaWx5Iiwic2V0U3RhdGUiLCJldmVudCIsIm5hdGl2ZUV2ZW50Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4IiwicCIsIm9mZnNldCIsInRhZ05hbWUiLCJnZXRBdHRyaWJ1dGUiLCJwYXJzZUZsb2F0IiwicGFyZW50RWxlbWVudCIsImluZGV4IiwicGFyZW50Tm9kZSIsIk1hdGgiLCJjZWlsIiwic3RhcnQiLCJzdHIiLCJzcGxpY2UiLCJyZUNvbXBvc2UiLCJjb250ZXh0VHlwZXMiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBLElBQUlBLFFBQU0sc0NBQVY7Ozs7O0FBRUMsbUJBQWE7QUFBQTs7QUFBQSxxSUFDSEMsU0FERzs7QUFFWixRQUFLQyxLQUFMLEdBQVcsc0JBQWMscUhBQWEsRUFBM0IsRUFBOEIsRUFBQ0MsU0FBUSxNQUFLQyxLQUFMLENBQVdDLFFBQXBCLEVBQTlCLENBQVg7QUFGWTtBQUdaOzs7O29DQUVnQjtBQUNoQixVQUFPLENBQVA7QUFDQTs7O3dDQUVxQkQsSyxFQUFNO0FBQUE7O0FBQzNCLE9BQUlFLHdKQUF3Q0wsU0FBeEMsQ0FBSjtBQUQyQix5QkFFaUJLLFNBQVNGLEtBRjFCO0FBQUEsT0FFdEJHLEtBRnNCLG1CQUV0QkEsS0FGc0I7QUFBQSxPQUVmQyxNQUZlLG1CQUVmQSxNQUZlO0FBQUEsT0FFUEMsT0FGTyxtQkFFUEEsT0FGTztBQUFBLE9BRVdDLElBRlgsbUJBRUVMLFFBRkY7O0FBRzNCSyxVQUFLLGdCQUFNQyxZQUFOLENBQW1CRCxJQUFuQixFQUF3QixFQUFDRSxTQUFRO0FBQUEsWUFBRyxPQUFLQSxPQUFMLENBQWFDLENBQWIsRUFBZVQsS0FBZixDQUFIO0FBQUEsS0FBVCxFQUF4QixDQUFMOztBQUVBLE9BQUlVLEtBQUcsRUFBQ1AsWUFBRCxFQUFPQyxjQUFQLEVBQWNDLGdCQUFkLEVBQVA7QUFMMkIsT0FNcEJNLEdBTm9CLEdBTU1YLEtBTk4sQ0FNcEJXLEdBTm9CO0FBQUEsT0FNTEMsU0FOSyxHQU1NWixLQU5OLENBTWZDLFFBTmU7OztBQVEzQixPQUFJWSxTQUFPLEtBQUtDLE9BQUwsQ0FBYUQsTUFBYixNQUF1QixFQUFDZixPQUFNLEVBQVAsRUFBbEM7QUFSMkIsdUJBU0RlLE9BQU9mLEtBVE47QUFBQSxPQVN0QmlCLE1BVHNCLGlCQVN0QkEsTUFUc0I7QUFBQSxPQVNYQyxRQVRXLGlCQVNmQyxFQVRlOzs7QUFXM0IsT0FBR0YsVUFBUSxJQUFSLElBQWdCSixNQUFJQyxVQUFVTSxNQUFkLEdBQXFCRixRQUFyQyxJQUFpREEsWUFBVUwsR0FBOUQsRUFBa0U7QUFDakVELE9BQUdTLEdBQUgsR0FBTyxhQUFHO0FBQ1QsU0FBSUMsT0FBSyxtQkFBU0MsV0FBVCxDQUFxQkMsQ0FBckIsQ0FBVDtBQUNBLFNBQUloQixPQUFLTSxVQUFVVyxNQUFWLENBQWlCLENBQWpCLEVBQW1CUCxZQUFVTCxNQUFJQyxVQUFVTSxNQUF4QixDQUFuQixDQUFUO0FBQ0EsU0FBSU0sUUFBTSxPQUFLQyxRQUFMLEVBQVY7QUFDQSxTQUFJQyxXQUFTLElBQUksT0FBS0MsV0FBTCxDQUFpQkMsV0FBckIsQ0FBaUN0QixJQUFqQyxFQUF1Q2tCLEtBQXZDLENBQWI7O0FBSlMsZ0JBS3NCRSxTQUFTRyxJQUFULENBQWMsRUFBQzFCLFlBQUQsRUFBZCxLQUF3QixFQUFDUSxLQUFJLENBQUwsRUFMOUM7QUFBQSxTQUtKbUIsWUFMSSxRQUtKQSxZQUxJO0FBQUEsU0FLVUMsVUFMVixRQUtVQSxVQUxWOztBQU1UbEIsWUFBT21CLFFBQVAsQ0FBZ0I7QUFDZmpCLG9CQURlO0FBRWZFLFVBQUdELFFBRlk7QUFHZkksZ0JBSGU7QUFJZmpCLGFBQU0yQixZQUpTO0FBS2YxQixjQUFPc0IsU0FBU3RCLE1BTEQ7QUFNZkMsZUFBU3FCLFNBQVNyQixPQU5IO0FBT2ZtQixrQkFQZSxFQUFoQjtBQVFBLEtBZEQ7QUFlQTtBQUNELFVBQ0M7QUFBQTtBQUFXZCxNQUFYO0FBQ0NKO0FBREQsSUFERDtBQUtHOzs7MEJBRU8yQixLLEVBQU8zQixJLEVBQUs7QUFBQSw0QkFDNkIyQixLQUQ3QixDQUNmQyxXQURlO0FBQUEsa0RBQ0ZDLE9BREU7QUFBQSxPQUNGQSxPQURFLHlDQUNNLENBRE47QUFBQSxtREFDU0MsT0FEVDtBQUFBLE9BQ1NBLE9BRFQsMENBQ2lCLENBRGpCO0FBQUEsT0FDcUJyQixNQURyQixHQUM2QmtCLEtBRDdCLENBQ3FCbEIsTUFEckI7O0FBRXRCLE9BQUlzQixJQUFFRixVQUFTLFVBQVNHLENBQVQsRUFBVztBQUN6QixRQUFJQyxTQUFPLENBQVg7QUFDQSxXQUFNRCxLQUFLQSxFQUFFRSxPQUFGLElBQVcsS0FBdEIsRUFBNEI7QUFDM0IsU0FBSUgsS0FBRUMsRUFBRUcsWUFBRixDQUFlLEdBQWYsQ0FBTjtBQUNBLFNBQUdKLEVBQUgsRUFDQ0UsVUFBUUcsV0FBV0wsRUFBWCxDQUFSO0FBQ0RDLFNBQUVBLEVBQUVLLGFBQUo7QUFDQTtBQUNELFdBQU9KLE1BQVA7QUFDQSxJQVRhLENBU1h4QixPQUFPNEIsYUFUSSxDQUFkO0FBVU0sT0FBSW5CLFFBQU0sS0FBS0MsUUFBTCxFQUFWO0FBQ0EsT0FBSUMsV0FBUyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFdBQXJCLENBQWlDdEIsS0FBS0wsUUFBdEMsRUFBZ0R1QixLQUFoRCxDQUFiOztBQWJnQixlQWNPRSxTQUFTRyxJQUFULENBQWMsRUFBQzFCLE9BQU1rQyxDQUFQLEVBQWQsS0FBMEIsRUFBQzFCLEtBQUksQ0FBTCxFQUFPbUIsY0FBYSxDQUFwQixFQWRqQztBQUFBLE9BY1hBLFlBZFcsU0FjWEEsWUFkVztBQUFBLE9BY0VuQixHQWRGLFNBY0VBLEdBZEY7O0FBZWhCLE9BQUlpQyxRQUFNdEMsS0FBS0ssR0FBTCxHQUFTTCxLQUFLTCxRQUFMLENBQWNpQixNQUF2QixHQUE4QlAsR0FBeEM7QUFDTixPQUFJRSxTQUFPLEtBQUtDLE9BQUwsQ0FBYUQsTUFBYixFQUFYO0FBQ0FBLFVBQU9tQixRQUFQLENBQWdCO0FBQ2ZqQixZQUFPLElBRFE7QUFFZkUsUUFBSTJCLEtBRlc7QUFHZnhCLFVBQUtMLE9BQU84QixVQUhHO0FBSWYxQyxXQUFNMkMsS0FBS0MsSUFBTCxDQUFVakIsWUFBVixDQUpTO0FBS2YxQixZQUFPc0IsU0FBU3RCLE1BTEQ7QUFNZkMsYUFBU3FCLFNBQVNyQixPQU5IO0FBT2ZtQixnQkFQZSxFQUFoQjtBQVFHOzs7eUJBRUd3QixLLEVBQU85QixNLEVBQVErQixHLEVBQUk7QUFBQTs7QUFBQSxPQUNsQmxELE9BRGtCLEdBQ1QsS0FBS0QsS0FESSxDQUNsQkMsT0FEa0I7O0FBRXpCLFFBQUtpQyxRQUFMLENBQWMsRUFBQ2pDLFNBQVFBLFFBQVFtRCxNQUFSLENBQWVGLEtBQWYsRUFBcUI5QixNQUFyQixFQUE0QitCLEdBQTVCLENBQVQsRUFBZCxFQUF5RCxhQUFHO0FBQzNELFdBQUtFLFNBQUw7QUFDQSxJQUZEO0FBR0E7OztFQTdFMkJ2RCxLOztPQStFckJ3RCxZLEdBQWEsc0JBQWM7QUFDakN2QyxTQUFRLGlCQUFVd0M7QUFEZSxDQUFkLEVBRWxCekQsTUFBTXdELFlBRlksQyIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXHJcblxyXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcclxuXHR9XHJcblx0XHJcblx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGNvbXBvc2VkPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNoaWxkcmVuOnRleHR9PWNvbXBvc2VkLnByb3BzXHJcblx0XHR0ZXh0PVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtvbkNsaWNrOmU9PnRoaXMub25DbGljayhlLHByb3BzKX0pXHJcblxyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHQsZGVzY2VudH1cclxuXHRcdGNvbnN0IHtlbmQsIGNoaWxkcmVuOiB0ZXh0cGllY2V9PXByb3BzXHJcblxyXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKCl8fHtzdGF0ZTp7fX1cclxuXHRcdGxldCB7dGFyZ2V0LGF0OiBjdXJzb3JBdH09Y3Vyc29yLnN0YXRlXHJcblx0XHRcclxuXHRcdGlmKHRhcmdldD09dGhpcyAmJiBlbmQtdGV4dHBpZWNlLmxlbmd0aDxjdXJzb3JBdCAmJiBjdXJzb3JBdDw9ZW5kKXtcclxuXHRcdFx0cHMucmVmPWE9PntcclxuXHRcdFx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZShhKVxyXG5cdFx0XHRcdGxldCB0ZXh0PXRleHRwaWVjZS5zdWJzdHIoMCxjdXJzb3JBdC0oZW5kLXRleHRwaWVjZS5sZW5ndGgpKVxyXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dCwgc3R5bGUpXHJcblx0XHRcdFx0bGV0IHtjb250ZW50V2lkdGgsIGZvbnRGYW1pbHl9PWNvbXBvc2VyLm5leHQoe3dpZHRofSl8fHtlbmQ6MH1cclxuXHRcdFx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdFx0XHRhdDpjdXJzb3JBdCxcclxuXHRcdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0XHR3aWR0aDpjb250ZW50V2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LCBcclxuXHRcdFx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsIFxyXG5cdFx0XHRcdFx0c3R5bGV9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgey4uLnBzfT5cclxuXHRcdFx0e3RleHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XHJcblx0XHRjb25zdCB7bmF0aXZlRXZlbnQ6e29mZnNldFg9MCwgb2Zmc2V0WT0wfSwgdGFyZ2V0fT1ldmVudFxyXG5cdFx0bGV0IHg9b2Zmc2V0WC0oZnVuY3Rpb24ocCl7XHJcblx0XHRcdGxldCBvZmZzZXQ9MFxyXG5cdFx0XHR3aGlsZShwICYmIHAudGFnTmFtZSE9XCJzdmdcIil7XHJcblx0XHRcdFx0bGV0IHg9cC5nZXRBdHRyaWJ1dGUoXCJ4XCIpXHJcblx0XHRcdFx0aWYoeClcclxuXHRcdFx0XHRcdG9mZnNldCs9cGFyc2VGbG9hdCh4KVxyXG5cdFx0XHRcdHA9cC5wYXJlbnRFbGVtZW50XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG9mZnNldFxyXG5cdFx0fSkodGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXHJcbiAgICAgICAgbGV0IHtjb250ZW50V2lkdGgsZW5kfT1jb21wb3Nlci5uZXh0KHt3aWR0aDp4fSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrZW5kXHJcblx0XHRsZXQgY3Vyc29yPXRoaXMuY29udGV4dC5jdXJzb3IoKVxyXG5cdFx0Y3Vyc29yLnNldFN0YXRlKHtcclxuXHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdGF0OiBpbmRleCxcclxuXHRcdFx0bm9kZTp0YXJnZXQucGFyZW50Tm9kZSxcclxuXHRcdFx0d2lkdGg6TWF0aC5jZWlsKGNvbnRlbnRXaWR0aCksXHJcblx0XHRcdGhlaWdodDpjb21wb3Nlci5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsXHJcblx0XHRcdHN0eWxlIH0pXHJcbiAgICB9XHJcblxyXG5cdHNwbGljZShzdGFydCwgbGVuZ3RoLCBzdHIpe1xyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRlbnQ6Y29udGVudC5zcGxpY2Uoc3RhcnQsbGVuZ3RoLHN0cil9LGU9PntcclxuXHRcdFx0dGhpcy5yZUNvbXBvc2UoKVx0XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcclxufVxyXG4iXX0=