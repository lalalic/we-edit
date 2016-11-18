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

var _mouseEventOffset = require("mouse-event-offset");

var _mouseEventOffset2 = _interopRequireDefault(_mouseEventOffset);

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
	}]);
	return EditableText;
}(Super);

var ACTION = exports.ACTION = {
	INSERT: function INSERT(text) {
		return { type: "insert.text", payload: text };
	}
};

var reducer = exports.reducer = function reducer(state, _ref) {
	var type = _ref.type,
	    payload = _ref.payload;

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

exports.default = EditableText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJBQ1RJT04iLCJJTlNFUlQiLCJ0eXBlIiwicGF5bG9hZCIsInRleHQiLCJyZWR1Y2VyIiwic2VsZWN0aW9uIiwic3RhcnQiLCJlbmQiLCJuZXdUZXh0Iiwic3BsaWNlIiwiYXQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztJQUFZQSxTOztBQWVaOzs7Ozs7QUFaQSxJQUFNQyxRQUFNLHNDQUFaOztJQUNhQyxZLFdBQUFBLFk7OztBQUNaLHlCQUFhO0FBQUE7O0FBQUEsaUpBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXLHNCQUFjLGlJQUFhLEVBQTNCLEVBQThCLEVBQUNDLFNBQVEsTUFBS0MsS0FBTCxDQUFXQyxRQUFwQixFQUE5QixDQUFYO0FBRlk7QUFHWjs7OztvQ0FFZ0I7QUFDaEIsVUFBTyxDQUFQO0FBQ0E7OztFQVJnQ04sSzs7QUFhM0IsSUFBTU8sMEJBQU87QUFDbkJDLFNBQVE7QUFBQSxTQUFPLEVBQUNDLE1BQUssYUFBTixFQUFvQkMsU0FBUUMsSUFBNUIsRUFBUDtBQUFBO0FBRFcsQ0FBYjs7QUFJQSxJQUFNQyw0QkFBUSxTQUFSQSxPQUFRLENBQUNULEtBQUQsUUFBeUI7QUFBQSxLQUFoQk0sSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUM3QyxTQUFPRCxJQUFQO0FBQ0EsT0FBSyxhQUFMO0FBQUEsMEJBQ21CTixNQUFNVSxTQUR6QjtBQUFBLE9BQ1FDLEtBRFIsb0JBQ1FBLEtBRFI7QUFBQSxPQUNjQyxHQURkLG9CQUNjQSxHQURkOztBQUVDLE9BQUdELFNBQU9DLEdBQVYsRUFBYztBQUNiLFFBQUlYLFVBQVEsMEJBQVdELEtBQVgsRUFBa0JXLE1BQU1WLE9BQXhCLENBQVo7QUFDQSxRQUFJWSxVQUFRWixRQUFRRSxRQUFSLENBQWlCVyxNQUFqQixDQUF3QkgsTUFBTUksRUFBOUIsRUFBaUNSLFFBQVFTLE1BQXpDLEVBQWdEVCxPQUFoRCxDQUFaO0FBRUEsSUFKRCxNQUlLLENBRUo7QUFDRjtBQVZBO0FBWUEsUUFBT1AsS0FBUDtBQUNBLENBZE07O2tCQWdCUUYsWSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxyXG5cclxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0ICogYXMgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5cclxuY29uc3QgU3VwZXI9ZWRpdGFibGUoVGV4dClcclxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlVGV4dCBleHRlbmRzIFN1cGVye1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPU9iamVjdC5hc3NpZ24oc3VwZXIuc3RhdGV8fHt9LHtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW59KVxyXG5cdH1cclxuXHRcclxuXHRnZXRDb250ZW50Q291bnQoKXtcclxuXHRcdHJldHVybiAxXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQge2dldENvbnRlbnR9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdElOU0VSVDogdGV4dD0+KHt0eXBlOlwiaW5zZXJ0LnRleHRcIixwYXlsb2FkOnRleHR9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGUsIHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIFwiaW5zZXJ0LnRleHRcIjpcclxuXHRcdGNvbnN0IHtzdGFydCxlbmR9PXN0YXRlLnNlbGVjdGlvblxyXG5cdFx0aWYoc3RhcnQ9PWVuZCl7XHJcblx0XHRcdGxldCBjb250ZW50PWdldENvbnRlbnQoc3RhdGUsIHN0YXJ0LmNvbnRlbnQpXHJcblx0XHRcdGxldCBuZXdUZXh0PWNvbnRlbnQuY2hpbGRyZW4uc3BsaWNlKHN0YXJ0LmF0LHBheWxvYWQubGVuZ3RoLHBheWxvYWQpXHJcblx0XHRcdFxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdGJyZWFrXHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0YWJsZVRleHQiXX0=