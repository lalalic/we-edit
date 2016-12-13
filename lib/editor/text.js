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
				(function () {
					var content = (0, _selector.getContent)(id);
					var text = content.getContent();
					var newText = text.substring(0, at) + t + text.substr(end.at);
					content.setState({ content: newText }, function (e) {
						content.reCompose();
						dispatch(Selection.ACTION.SELECT(id, at + t.length));
					});
				})();
			} else {}
		};
	},
	REMOVE: function REMOVE(n) {
		return function (dispatch, getState) {
			var state = getState();
			var _state$selection2 = state.selection,
			    _state$selection2$sta = _state$selection2.start,
			    id = _state$selection2$sta.id,
			    at = _state$selection2$sta.at,
			    end = _state$selection2.end;

			if (id == end.id) {
				(function () {
					var content = (0, _selector.getContent)(id);
					var text = content.getContent();
					var newText = text.substring(0, at - n) + text.substr(end.at);
					content.setState({ content: newText }, function (e) {
						content.reCompose();
						dispatch(Selection.ACTION.SELECT(id, at - n));
					});
				})();
			} else {}
		};
	}
};

exports.default = EditableText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJET01BSU4iLCJBQ1RJT04iLCJJTlNFUlQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic2VsZWN0aW9uIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwidGV4dCIsImdldENvbnRlbnQiLCJuZXdUZXh0Iiwic3Vic3RyaW5nIiwidCIsInN1YnN0ciIsInNldFN0YXRlIiwicmVDb21wb3NlIiwiU0VMRUNUIiwibGVuZ3RoIiwiUkVNT1ZFIiwibiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0lBQVlBLFM7O0FBZVo7Ozs7OztBQVpBLElBQU1DLFFBQU0sc0NBQVo7O0lBQ2FDLFksV0FBQUEsWTs7O0FBQ1oseUJBQWE7QUFBQTs7QUFBQSxpSkFDSEMsU0FERzs7QUFFWixRQUFLQyxLQUFMLEdBQVcsc0JBQWMsaUlBQWEsRUFBM0IsRUFBOEIsRUFBQ0MsU0FBUSxNQUFLQyxLQUFMLENBQVdDLFFBQXBCLEVBQTlCLENBQVg7QUFGWTtBQUdaOzs7O29DQUVnQjtBQUNoQixVQUFPLENBQVA7QUFDQTs7O0VBUmdDTixLOztBQWFsQyxJQUFNTyxTQUFPLE1BQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQUcsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2hDLE9BQU1SLFFBQU1RLFVBQVo7QUFEZ0MsMEJBRU5SLE1BQU1TLFNBRkE7QUFBQSxnREFFekJDLEtBRnlCO0FBQUEsT0FFbEJDLEVBRmtCLHlCQUVsQkEsRUFGa0I7QUFBQSxPQUVmQyxFQUZlLHlCQUVmQSxFQUZlO0FBQUEsT0FFWEMsR0FGVyxvQkFFWEEsR0FGVzs7QUFHaEMsT0FBR0YsTUFBSUUsSUFBSUYsRUFBWCxFQUFjO0FBQUE7QUFDYixTQUFJVixVQUFRLDBCQUFXVSxFQUFYLENBQVo7QUFDQSxTQUFJRyxPQUFLYixRQUFRYyxVQUFSLEVBQVQ7QUFDQSxTQUFJQyxVQUFRRixLQUFLRyxTQUFMLENBQWUsQ0FBZixFQUFpQkwsRUFBakIsSUFBcUJNLENBQXJCLEdBQXVCSixLQUFLSyxNQUFMLENBQVlOLElBQUlELEVBQWhCLENBQW5DO0FBQ0FYLGFBQVFtQixRQUFSLENBQWlCLEVBQUNuQixTQUFRZSxPQUFULEVBQWpCLEVBQW9DLGFBQUc7QUFDdENmLGNBQVFvQixTQUFSO0FBQ0FkLGVBQVNYLFVBQVVTLE1BQVYsQ0FBaUJpQixNQUFqQixDQUF3QlgsRUFBeEIsRUFBMkJDLEtBQUdNLEVBQUVLLE1BQWhDLENBQVQ7QUFDQSxNQUhEO0FBSmE7QUFRYixJQVJELE1BUUssQ0FFSjtBQUNELEdBZE87QUFBQSxFQURXO0FBZ0JsQkMsU0FBUTtBQUFBLFNBQUcsVUFBQ2pCLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUNqQyxPQUFNUixRQUFNUSxVQUFaO0FBRGlDLDJCQUVQUixNQUFNUyxTQUZDO0FBQUEsaURBRTFCQyxLQUYwQjtBQUFBLE9BRW5CQyxFQUZtQix5QkFFbkJBLEVBRm1CO0FBQUEsT0FFaEJDLEVBRmdCLHlCQUVoQkEsRUFGZ0I7QUFBQSxPQUVaQyxHQUZZLHFCQUVaQSxHQUZZOztBQUdqQyxPQUFHRixNQUFJRSxJQUFJRixFQUFYLEVBQWM7QUFBQTtBQUNiLFNBQUlWLFVBQVEsMEJBQVdVLEVBQVgsQ0FBWjtBQUNBLFNBQUlHLE9BQUtiLFFBQVFjLFVBQVIsRUFBVDtBQUNBLFNBQUlDLFVBQVFGLEtBQUtHLFNBQUwsQ0FBZSxDQUFmLEVBQWlCTCxLQUFHYSxDQUFwQixJQUF1QlgsS0FBS0ssTUFBTCxDQUFZTixJQUFJRCxFQUFoQixDQUFuQztBQUNBWCxhQUFRbUIsUUFBUixDQUFpQixFQUFDbkIsU0FBUWUsT0FBVCxFQUFqQixFQUFvQyxhQUFHO0FBQ3RDZixjQUFRb0IsU0FBUjtBQUNBZCxlQUFTWCxVQUFVUyxNQUFWLENBQWlCaUIsTUFBakIsQ0FBd0JYLEVBQXhCLEVBQTJCQyxLQUFHYSxDQUE5QixDQUFUO0FBQ0EsTUFIRDtBQUphO0FBUWIsSUFSRCxNQVFLLENBRUo7QUFDRCxHQWRRO0FBQUE7QUFoQlUsQ0FBYjs7a0JBaUNRM0IsWSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxuXG5pbXBvcnQge1RleHR9IGZyb20gXCIuLi9jb250ZW50XCJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0ICogYXMgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXG5cblxuY29uc3QgU3VwZXI9ZWRpdGFibGUoVGV4dClcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVRleHQgZXh0ZW5kcyBTdXBlcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcblx0fVxuXG5cdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdHJldHVybiAxXG5cdH1cbn1cblxuaW1wb3J0IHtnZXRDb250ZW50fSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmNvbnN0IERPTUFJTj1cInRleHRcIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdElOU0VSVDogdD0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3Qge3N0YXJ0OntpZCxhdH0sZW5kfT1zdGF0ZS5zZWxlY3Rpb25cblx0XHRpZihpZD09ZW5kLmlkKXtcblx0XHRcdGxldCBjb250ZW50PWdldENvbnRlbnQoaWQpXG5cdFx0XHRsZXQgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxuXHRcdFx0bGV0IG5ld1RleHQ9dGV4dC5zdWJzdHJpbmcoMCxhdCkrdCt0ZXh0LnN1YnN0cihlbmQuYXQpXG5cdFx0XHRjb250ZW50LnNldFN0YXRlKHtjb250ZW50Om5ld1RleHR9LCBlPT57XG5cdFx0XHRcdGNvbnRlbnQucmVDb21wb3NlKClcblx0XHRcdFx0ZGlzcGF0Y2goU2VsZWN0aW9uLkFDVElPTi5TRUxFQ1QoaWQsYXQrdC5sZW5ndGgpKVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblxuXHRcdH1cblx0fVxuXHQsUkVNT1ZFOiBuPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlLnNlbGVjdGlvblxuXHRcdGlmKGlkPT1lbmQuaWQpe1xuXHRcdFx0bGV0IGNvbnRlbnQ9Z2V0Q29udGVudChpZClcblx0XHRcdGxldCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXG5cdFx0XHRsZXQgbmV3VGV4dD10ZXh0LnN1YnN0cmluZygwLGF0LW4pK3RleHQuc3Vic3RyKGVuZC5hdClcblx0XHRcdGNvbnRlbnQuc2V0U3RhdGUoe2NvbnRlbnQ6bmV3VGV4dH0sIGU9Pntcblx0XHRcdFx0Y29udGVudC5yZUNvbXBvc2UoKVxuXHRcdFx0XHRkaXNwYXRjaChTZWxlY3Rpb24uQUNUSU9OLlNFTEVDVChpZCxhdC1uKSlcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdGFibGVUZXh0XG4iXX0=