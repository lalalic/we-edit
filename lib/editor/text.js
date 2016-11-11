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

			var style = this.getStyle();
			var composer = new this.constructor.WordWrapper(text.children, style);

			var _ref2 = composer.next({ width: offsetX }) || { end: 0, contentWidth: 0 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJjb21wb3NlZCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsInRleHQiLCJjbG9uZUVsZW1lbnQiLCJvbkNsaWNrIiwiZSIsInBzIiwiZW5kIiwidGV4dHBpZWNlIiwiY3Vyc29yIiwiY29udGV4dCIsInRhcmdldCIsImN1cnNvckF0IiwiYXQiLCJsZW5ndGgiLCJyZWYiLCJub2RlIiwiZmluZERPTU5vZGUiLCJhIiwic3Vic3RyIiwic3R5bGUiLCJnZXRTdHlsZSIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsIm5leHQiLCJjb250ZW50V2lkdGgiLCJmb250RmFtaWx5Iiwic2V0U3RhdGUiLCJldmVudCIsIm5hdGl2ZUV2ZW50Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJpbmRleCIsInBhcmVudE5vZGUiLCJNYXRoIiwiY2VpbCIsInN0YXJ0Iiwic3RyIiwic3BsaWNlIiwicmVDb21wb3NlIiwiY29udGV4dFR5cGVzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxRQUFNLHNDQUFWOzs7OztBQUVDLG1CQUFhO0FBQUE7O0FBQUEscUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXLHNCQUFjLHFIQUFhLEVBQTNCLEVBQThCLEVBQUNDLFNBQVEsTUFBS0MsS0FBTCxDQUFXQyxRQUFwQixFQUE5QixDQUFYO0FBRlk7QUFHWjs7OztvQ0FFZ0I7QUFDaEIsVUFBTyxDQUFQO0FBQ0E7Ozt3Q0FFcUJELEssRUFBTTtBQUFBOztBQUMzQixPQUFJRSx3SkFBd0NMLFNBQXhDLENBQUo7QUFEMkIseUJBRWlCSyxT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TyxLQUFLQyxPQUFMLENBQWFELE1BQWIsRUFBWDtBQUNBQSxVQUFPbUIsUUFBUCxDQUFnQjtBQUNmakIsWUFBTyxJQURRO0FBRWZFLFFBQUlvQixLQUZXO0FBR2ZqQixVQUFLTCxPQUFPdUIsVUFIRztBQUlmbkMsV0FBTW9DLEtBQUtDLElBQUwsQ0FBVVYsWUFBVixDQUpTO0FBS2YxQixZQUFPc0IsU0FBU3RCLE1BTEQ7QUFNZkMsYUFBU3FCLFNBQVNyQixPQU5IO0FBT2ZtQixnQkFQZSxFQUFoQjtBQVFHOzs7eUJBRUdpQixLLEVBQU92QixNLEVBQVF3QixHLEVBQUk7QUFBQTs7QUFBQSxPQUNsQjNDLE9BRGtCLEdBQ1QsS0FBS0QsS0FESSxDQUNsQkMsT0FEa0I7O0FBRXpCLFFBQUtpQyxRQUFMLENBQWMsRUFBQ2pDLFNBQVFBLFFBQVE0QyxNQUFSLENBQWVGLEtBQWYsRUFBcUJ2QixNQUFyQixFQUE0QndCLEdBQTVCLENBQVQsRUFBZCxFQUF5RCxhQUFHO0FBQzNELFdBQUtFLFNBQUw7QUFDQSxJQUZEO0FBR0E7OztFQW5FMkJoRCxLOztPQXFFckJpRCxZLEdBQWEsc0JBQWM7QUFDakNoQyxTQUFRLGlCQUFVaUM7QUFEZSxDQUFkLEVBRWxCbEQsTUFBTWlELFlBRlksQyIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCB7U2hhcGUgYXMgQ3Vyc29yU2hhcGV9IGZyb20gXCIuL2N1cnNvclwiXHJcblxyXG5sZXQgU3VwZXI9ZWRpdGFibGUoVGV4dClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcclxuXHR9XHJcblx0XHJcblx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGNvbXBvc2VkPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNoaWxkcmVuOnRleHR9PWNvbXBvc2VkLnByb3BzXHJcblx0XHR0ZXh0PVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtvbkNsaWNrOmU9PnRoaXMub25DbGljayhlLHByb3BzKX0pXHJcblxyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHQsZGVzY2VudH1cclxuXHRcdGNvbnN0IHtlbmQsIGNoaWxkcmVuOiB0ZXh0cGllY2V9PXByb3BzXHJcblxyXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKCl8fHtzdGF0ZTp7fX1cclxuXHRcdGxldCB7dGFyZ2V0LGF0OiBjdXJzb3JBdH09Y3Vyc29yLnN0YXRlXHJcblx0XHRcclxuXHRcdGlmKHRhcmdldD09dGhpcyAmJiBlbmQtdGV4dHBpZWNlLmxlbmd0aDxjdXJzb3JBdCAmJiBjdXJzb3JBdDw9ZW5kKXtcclxuXHRcdFx0cHMucmVmPWE9PntcclxuXHRcdFx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZShhKVxyXG5cdFx0XHRcdGxldCB0ZXh0PXRleHRwaWVjZS5zdWJzdHIoMCxjdXJzb3JBdC0oZW5kLXRleHRwaWVjZS5sZW5ndGgpKVxyXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dCwgc3R5bGUpXHJcblx0XHRcdFx0bGV0IHtjb250ZW50V2lkdGgsIGZvbnRGYW1pbHl9PWNvbXBvc2VyLm5leHQoe3dpZHRofSl8fHtlbmQ6MH1cclxuXHRcdFx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdFx0XHRhdDpjdXJzb3JBdCxcclxuXHRcdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0XHR3aWR0aDpjb250ZW50V2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LCBcclxuXHRcdFx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsIFxyXG5cdFx0XHRcdFx0c3R5bGV9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgey4uLnBzfT5cclxuXHRcdFx0e3RleHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XHJcblx0XHRjb25zdCB7bmF0aXZlRXZlbnQ6e29mZnNldFg9MCwgb2Zmc2V0WT0wfSwgdGFyZ2V0fT1ldmVudFxyXG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXHJcbiAgICAgICAgbGV0IHtjb250ZW50V2lkdGgsZW5kfT1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrZW5kXHJcblx0XHRsZXQgY3Vyc29yPXRoaXMuY29udGV4dC5jdXJzb3IoKVxyXG5cdFx0Y3Vyc29yLnNldFN0YXRlKHtcclxuXHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdGF0OiBpbmRleCxcclxuXHRcdFx0bm9kZTp0YXJnZXQucGFyZW50Tm9kZSxcclxuXHRcdFx0d2lkdGg6TWF0aC5jZWlsKGNvbnRlbnRXaWR0aCksXHJcblx0XHRcdGhlaWdodDpjb21wb3Nlci5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsXHJcblx0XHRcdHN0eWxlIH0pXHJcbiAgICB9XHJcblxyXG5cdHNwbGljZShzdGFydCwgbGVuZ3RoLCBzdHIpe1xyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2NvbnRlbnQ6Y29udGVudC5zcGxpY2Uoc3RhcnQsbGVuZ3RoLHN0cil9LGU9PntcclxuXHRcdFx0dGhpcy5yZUNvbXBvc2UoKVx0XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcclxufVxyXG4iXX0=