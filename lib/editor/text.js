"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = exports.EditableText = undefined;

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

var DOMAIN = "text";
var ACTION = exports.ACTION = {
	INSERT: function INSERT(t) {
		return function (dispatch, getState) {
			var state = getState();
			var _state$selection = state.selection,
			    _state$selection$star = _state$selection.start,
			    id = _state$selection$star.id,
			    at = _state$selection$star.at,
			    end = _state$selection.end;

			if (id == end.id) {
				var content = (0, _selector.getContent)(id);
				var text = content.getContent();
				var newText = text.substring(0, at) + t + text.substr(end.at);
				content.setState({ content: newText });
			} else {}
		};
	},
	REMOVE: function REMOVE(n) {
		return function (dispatch, getState) {
			var state = getState;
			var _state$selection2 = state.selection,
			    _state$selection2$sta = _state$selection2.start,
			    id = _state$selection2$sta.id,
			    at = _state$selection2$sta.at,
			    end = _state$selection2.end;

			if (id == end.id) {
				var content = (0, _selector.getContent)(id);
				var text = content.getContent();
				var newText = text.substring(0, at) + text.substr(end.at + n);
				content.setState({ content: nexText });
			} else {}
		};
	}
};

exports.default = EditableText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJET01BSU4iLCJBQ1RJT04iLCJJTlNFUlQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic2VsZWN0aW9uIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwidGV4dCIsImdldENvbnRlbnQiLCJuZXdUZXh0Iiwic3Vic3RyaW5nIiwidCIsInN1YnN0ciIsInNldFN0YXRlIiwiUkVNT1ZFIiwibiIsIm5leFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztJQUFZQSxTOztBQWVaOzs7Ozs7QUFaQSxJQUFNQyxRQUFNLHNDQUFaOztJQUNhQyxZLFdBQUFBLFk7OztBQUNaLHlCQUFhO0FBQUE7O0FBQUEsaUpBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXLHNCQUFjLGlJQUFhLEVBQTNCLEVBQThCLEVBQUNDLFNBQVEsTUFBS0MsS0FBTCxDQUFXQyxRQUFwQixFQUE5QixDQUFYO0FBRlk7QUFHWjs7OztvQ0FFZ0I7QUFDaEIsVUFBTyxDQUFQO0FBQ0E7OztFQVJnQ04sSzs7QUFhbEMsSUFBTU8sU0FBTyxNQUFiO0FBQ08sSUFBTUMsMEJBQU87QUFDbkJDLFNBQVE7QUFBQSxTQUFHLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUNoQyxPQUFNUixRQUFNUSxVQUFaO0FBRGdDLDBCQUVOUixNQUFNUyxTQUZBO0FBQUEsZ0RBRXpCQyxLQUZ5QjtBQUFBLE9BRWxCQyxFQUZrQix5QkFFbEJBLEVBRmtCO0FBQUEsT0FFZkMsRUFGZSx5QkFFZkEsRUFGZTtBQUFBLE9BRVhDLEdBRlcsb0JBRVhBLEdBRlc7O0FBR2hDLE9BQUdGLE1BQUlFLElBQUlGLEVBQVgsRUFBYztBQUNiLFFBQUlWLFVBQVEsMEJBQVdVLEVBQVgsQ0FBWjtBQUNBLFFBQUlHLE9BQUtiLFFBQVFjLFVBQVIsRUFBVDtBQUNBLFFBQUlDLFVBQVFGLEtBQUtHLFNBQUwsQ0FBZSxDQUFmLEVBQWlCTCxFQUFqQixJQUFxQk0sQ0FBckIsR0FBdUJKLEtBQUtLLE1BQUwsQ0FBWU4sSUFBSUQsRUFBaEIsQ0FBbkM7QUFDQVgsWUFBUW1CLFFBQVIsQ0FBaUIsRUFBQ25CLFNBQVFlLE9BQVQsRUFBakI7QUFDQSxJQUxELE1BS0ssQ0FFSjtBQUNELEdBWE87QUFBQSxFQURXO0FBYWxCSyxTQUFRO0FBQUEsU0FBRyxVQUFDZCxRQUFELEVBQVdDLFFBQVgsRUFBc0I7QUFDakMsT0FBTVIsUUFBTVEsUUFBWjtBQURpQywyQkFFUFIsTUFBTVMsU0FGQztBQUFBLGlEQUUxQkMsS0FGMEI7QUFBQSxPQUVuQkMsRUFGbUIseUJBRW5CQSxFQUZtQjtBQUFBLE9BRWhCQyxFQUZnQix5QkFFaEJBLEVBRmdCO0FBQUEsT0FFWkMsR0FGWSxxQkFFWkEsR0FGWTs7QUFHakMsT0FBR0YsTUFBSUUsSUFBSUYsRUFBWCxFQUFjO0FBQ2IsUUFBSVYsVUFBUSwwQkFBV1UsRUFBWCxDQUFaO0FBQ0EsUUFBSUcsT0FBS2IsUUFBUWMsVUFBUixFQUFUO0FBQ0EsUUFBSUMsVUFBUUYsS0FBS0csU0FBTCxDQUFlLENBQWYsRUFBaUJMLEVBQWpCLElBQXFCRSxLQUFLSyxNQUFMLENBQVlOLElBQUlELEVBQUosR0FBT1UsQ0FBbkIsQ0FBakM7QUFDQXJCLFlBQVFtQixRQUFSLENBQWlCLEVBQUNuQixTQUFRc0IsT0FBVCxFQUFqQjtBQUNBLElBTEQsTUFLSyxDQUVKO0FBQ0QsR0FYUTtBQUFBO0FBYlUsQ0FBYjs7a0JBMkJRekIsWSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxuXG5pbXBvcnQge1RleHR9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0ICogYXMgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXG5cblxuY29uc3QgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVRleHQgZXh0ZW5kcyBTdXBlcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcblx0fVxuXG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiAxXG5cdH1cbn1cblxuaW1wb3J0IHtnZXRDb250ZW50fSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmNvbnN0IERPTUFJTj1cInRleHRcIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdElOU0VSVDogdD0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3Qge3N0YXJ0OntpZCxhdH0sZW5kfT1zdGF0ZS5zZWxlY3Rpb25cblx0XHRpZihpZD09ZW5kLmlkKXtcblx0XHRcdGxldCBjb250ZW50PWdldENvbnRlbnQoaWQpXG5cdFx0XHRsZXQgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxuXHRcdFx0bGV0IG5ld1RleHQ9dGV4dC5zdWJzdHJpbmcoMCxhdCkrdCt0ZXh0LnN1YnN0cihlbmQuYXQpXG5cdFx0XHRjb250ZW50LnNldFN0YXRlKHtjb250ZW50Om5ld1RleHR9KVxuXHRcdH1lbHNle1xuXG5cdFx0fVxuXHR9XG5cdCxSRU1PVkU6IG49PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGVcblx0XHRjb25zdCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlLnNlbGVjdGlvblxuXHRcdGlmKGlkPT1lbmQuaWQpe1xuXHRcdFx0bGV0IGNvbnRlbnQ9Z2V0Q29udGVudChpZClcblx0XHRcdGxldCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXG5cdFx0XHRsZXQgbmV3VGV4dD10ZXh0LnN1YnN0cmluZygwLGF0KSt0ZXh0LnN1YnN0cihlbmQuYXQrbilcblx0XHRcdGNvbnRlbnQuc2V0U3RhdGUoe2NvbnRlbnQ6bmV4VGV4dH0pXG5cdFx0fWVsc2V7XG5cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdGFibGVUZXh0XG4iXX0=