"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reducer = exports.ACTION = exports.EditableText = undefined;

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

var _reactRedux = require("react-redux");

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _selection = require("./selection");

var Selection = _interopRequireWildcard(_selection);

var _selector = require("./selector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _editable2.default)(_content.Text);

var EditableText = exports.EditableText = function (_Super) {
	(0, _inherits3.default)(EditableText, _Super);

	function EditableText() {
		(0, _classCallCheck3.default)(this, EditableText);

		var _this = (0, _possibleConstructorReturn3.default)(this, (EditableText.__proto__ || (0, _getPrototypeOf2.default)(EditableText)).apply(this, arguments));

		_this.state = (0, _assign2.default)((0, _get3.default)(EditableText.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableText.prototype), "state", _this) || {}, { content: _this.props.children });
		return _this;
	}

	(0, _createClass3.default)(EditableText, [{
		key: "getContentCount",
		value: function getContentCount() {
			return 1;
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var _this2 = this;

			var composed = (0, _get3.default)(EditableText.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableText.prototype), "createComposed2Parent", this).apply(this, arguments);
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
			this.props.dispatch(Selection.ACTION.SELECT(this._id, index));
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
	return EditableText;
}(Super);

EditableText.contextTypes = (0, _assign2.default)({
	cursor: _react.PropTypes.func
}, Super.contextTypes);
var ACTION = exports.ACTION = {
	INSERT: function INSERT(text) {
		return { type: "insert.text", payload: text };
	}
};

var reducer = exports.reducer = function reducer(state, _ref3) {
	var type = _ref3.type,
	    payload = _ref3.payload;

	switch (type) {
		case "insert.text":
			var _state$selection = state.selection,
			    start = _state$selection.start,
			    end = _state$selection.end;

			if (start == end) {
				var content = (0, _selector.getContent)(state, start.content);
				var newText = content.children.splice(start.at, payload.length, payload);
			} else {}
			break;
	}
	return state;
};

exports.default = (0, _reactRedux.connect)()(EditableText);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJjb21wb3NlZCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsInRleHQiLCJjbG9uZUVsZW1lbnQiLCJvbkNsaWNrIiwiZSIsInBzIiwiZW5kIiwidGV4dHBpZWNlIiwiY3Vyc29yIiwiY29udGV4dCIsInRhcmdldCIsImN1cnNvckF0IiwiYXQiLCJsZW5ndGgiLCJyZWYiLCJub2RlIiwiZmluZERPTU5vZGUiLCJhIiwic3Vic3RyIiwic3R5bGUiLCJnZXRTdHlsZSIsImNvbXBvc2VyIiwiY29uc3RydWN0b3IiLCJXb3JkV3JhcHBlciIsIm5leHQiLCJjb250ZW50V2lkdGgiLCJmb250RmFtaWx5Iiwic2V0U3RhdGUiLCJldmVudCIsIm5hdGl2ZUV2ZW50Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4IiwicCIsIm9mZnNldCIsInRhZ05hbWUiLCJnZXRBdHRyaWJ1dGUiLCJwYXJzZUZsb2F0IiwicGFyZW50RWxlbWVudCIsImluZGV4IiwicGFyZW50Tm9kZSIsIk1hdGgiLCJjZWlsIiwiZGlzcGF0Y2giLCJBQ1RJT04iLCJTRUxFQ1QiLCJfaWQiLCJzdGFydCIsInN0ciIsInNwbGljZSIsInJlQ29tcG9zZSIsImNvbnRleHRUeXBlcyIsImZ1bmMiLCJJTlNFUlQiLCJ0eXBlIiwicGF5bG9hZCIsInJlZHVjZXIiLCJzZWxlY3Rpb24iLCJuZXdUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0lBQVlBLFM7O0FBeUZaOzs7Ozs7QUF0RkEsSUFBTUMsUUFBTSxzQ0FBWjs7SUFDYUMsWSxXQUFBQSxZOzs7QUFD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cFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCAqIGFzIFNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKFRleHQpXHJcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVRleHQgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcclxuXHR9XHJcblx0XHJcblx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHRcclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0bGV0IGNvbXBvc2VkPXN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCguLi5hcmd1bWVudHMpXHJcblx0XHRsZXQge3dpZHRoLCBoZWlnaHQsIGRlc2NlbnQsIGNoaWxkcmVuOnRleHR9PWNvbXBvc2VkLnByb3BzXHJcblx0XHR0ZXh0PVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtvbkNsaWNrOmU9PnRoaXMub25DbGljayhlLHByb3BzKX0pXHJcblxyXG5cdFx0bGV0IHBzPXt3aWR0aCxoZWlnaHQsZGVzY2VudH1cclxuXHRcdGNvbnN0IHtlbmQsIGNoaWxkcmVuOiB0ZXh0cGllY2V9PXByb3BzXHJcblxyXG5cdFx0bGV0IGN1cnNvcj10aGlzLmNvbnRleHQuY3Vyc29yKCl8fHtzdGF0ZTp7fX1cclxuXHRcdGxldCB7dGFyZ2V0LGF0OiBjdXJzb3JBdH09Y3Vyc29yLnN0YXRlXHJcblx0XHRcclxuXHRcdGlmKHRhcmdldD09dGhpcyAmJiBlbmQtdGV4dHBpZWNlLmxlbmd0aDxjdXJzb3JBdCAmJiBjdXJzb3JBdDw9ZW5kKXtcclxuXHRcdFx0cHMucmVmPWE9PntcclxuXHRcdFx0XHRsZXQgbm9kZT1SZWFjdERPTS5maW5kRE9NTm9kZShhKVxyXG5cdFx0XHRcdGxldCB0ZXh0PXRleHRwaWVjZS5zdWJzdHIoMCxjdXJzb3JBdC0oZW5kLXRleHRwaWVjZS5sZW5ndGgpKVxyXG5cdFx0XHRcdGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuXHRcdFx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dCwgc3R5bGUpXHJcblx0XHRcdFx0bGV0IHtjb250ZW50V2lkdGgsIGZvbnRGYW1pbHl9PWNvbXBvc2VyLm5leHQoe3dpZHRofSl8fHtlbmQ6MH1cclxuXHRcdFx0XHRjdXJzb3Iuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdFx0XHRhdDpjdXJzb3JBdCxcclxuXHRcdFx0XHRcdG5vZGUsXHJcblx0XHRcdFx0XHR3aWR0aDpjb250ZW50V2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQ6Y29tcG9zZXIuaGVpZ2h0LCBcclxuXHRcdFx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsIFxyXG5cdFx0XHRcdFx0c3R5bGV9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JvdXAgey4uLnBzfT5cclxuXHRcdFx0e3RleHR9XHJcblx0XHRcdDwvR3JvdXA+XHJcblx0XHQpXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XHJcblx0XHRjb25zdCB7bmF0aXZlRXZlbnQ6e29mZnNldFg9MCwgb2Zmc2V0WT0wfSwgdGFyZ2V0fT1ldmVudFxyXG5cdFx0bGV0IHg9b2Zmc2V0WC0oZnVuY3Rpb24ocCl7XHJcblx0XHRcdGxldCBvZmZzZXQ9MFxyXG5cdFx0XHR3aGlsZShwICYmIHAudGFnTmFtZSE9XCJzdmdcIil7XHJcblx0XHRcdFx0bGV0IHg9cC5nZXRBdHRyaWJ1dGUoXCJ4XCIpXHJcblx0XHRcdFx0aWYoeClcclxuXHRcdFx0XHRcdG9mZnNldCs9cGFyc2VGbG9hdCh4KVxyXG5cdFx0XHRcdHA9cC5wYXJlbnRFbGVtZW50XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG9mZnNldFxyXG5cdFx0fSkodGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIGxldCBzdHlsZT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbiwgc3R5bGUpXHJcbiAgICAgICAgbGV0IHtjb250ZW50V2lkdGgsZW5kfT1jb21wb3Nlci5uZXh0KHt3aWR0aDp4fSl8fHtlbmQ6MCxjb250ZW50V2lkdGg6MH1cclxuICAgICAgICBsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrZW5kXHJcblx0XHRsZXQgY3Vyc29yPXRoaXMuY29udGV4dC5jdXJzb3IoKVxyXG5cdFx0Y3Vyc29yLnNldFN0YXRlKHtcclxuXHRcdFx0dGFyZ2V0OnRoaXMsXHJcblx0XHRcdGF0OiBpbmRleCxcclxuXHRcdFx0bm9kZTp0YXJnZXQucGFyZW50Tm9kZSxcclxuXHRcdFx0d2lkdGg6TWF0aC5jZWlsKGNvbnRlbnRXaWR0aCksXHJcblx0XHRcdGhlaWdodDpjb21wb3Nlci5oZWlnaHQsXHJcblx0XHRcdGRlc2NlbnQ6IGNvbXBvc2VyLmRlc2NlbnQsXHJcblx0XHRcdHN0eWxlIH0pXHJcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKFNlbGVjdGlvbi5BQ1RJT04uU0VMRUNUKHRoaXMuX2lkLGluZGV4KSlcclxuICAgIH1cclxuXHJcblx0c3BsaWNlKHN0YXJ0LCBsZW5ndGgsIHN0cil7XHJcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Y29udGVudDpjb250ZW50LnNwbGljZShzdGFydCxsZW5ndGgsc3RyKX0sZT0+e1xyXG5cdFx0XHR0aGlzLnJlQ29tcG9zZSgpXHRcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxyXG59XHJcblxyXG5pbXBvcnQge2dldENvbnRlbnR9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdElOU0VSVDogdGV4dD0+KHt0eXBlOlwiaW5zZXJ0LnRleHRcIixwYXlsb2FkOnRleHR9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGUsIHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIFwiaW5zZXJ0LnRleHRcIjpcclxuXHRcdGNvbnN0IHtzdGFydCxlbmR9PXN0YXRlLnNlbGVjdGlvblxyXG5cdFx0aWYoc3RhcnQ9PWVuZCl7XHJcblx0XHRcdGxldCBjb250ZW50PWdldENvbnRlbnQoc3RhdGUsIHN0YXJ0LmNvbnRlbnQpXHJcblx0XHRcdGxldCBuZXdUZXh0PWNvbnRlbnQuY2hpbGRyZW4uc3BsaWNlKHN0YXJ0LmF0LHBheWxvYWQubGVuZ3RoLHBheWxvYWQpXHJcblx0XHRcdFxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdGJyZWFrXHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoRWRpdGFibGVUZXh0KSJdfQ==