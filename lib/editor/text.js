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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJET01BSU4iLCJBQ1RJT04iLCJJTlNFUlQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic2VsZWN0aW9uIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwidGV4dCIsImdldENvbnRlbnQiLCJuZXdUZXh0Iiwic3Vic3RyaW5nIiwidCIsInN1YnN0ciIsInNldFN0YXRlIiwicmVDb21wb3NlIiwiU0VMRUNUIiwibGVuZ3RoIiwiUkVNT1ZFIiwibiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0lBQVlBLFM7O0FBZVo7Ozs7OztBQVpBLElBQU1DLFFBQU0sc0NBQVo7O0lBQ2FDLFksV0FBQUEsWTs7O0FBQ1oseUJBQWE7QUFBQTs7QUFBQSxpSkFDSEMsU0FERzs7QUFFWixRQUFLQyxLQUFMLEdBQVcsc0JBQWMsaUlBQWEsRUFBM0IsRUFBOEIsRUFBQ0MsU0FBUSxNQUFLQyxLQUFMLENBQVdDLFFBQXBCLEVBQTlCLENBQVg7QUFGWTtBQUdaOzs7O29DQUVnQjtBQUNoQixVQUFPLENBQVA7QUFDQTs7O0VBUmdDTixLOztBQWFsQyxJQUFNTyxTQUFPLE1BQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQUcsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2hDLE9BQU1SLFFBQU1RLFVBQVo7QUFEZ0MsMEJBRU5SLE1BQU1TLFNBRkE7QUFBQSxnREFFekJDLEtBRnlCO0FBQUEsT0FFbEJDLEVBRmtCLHlCQUVsQkEsRUFGa0I7QUFBQSxPQUVmQyxFQUZlLHlCQUVmQSxFQUZlO0FBQUEsT0FFWEMsR0FGVyxvQkFFWEEsR0FGVzs7QUFHaEMsT0FBR0YsTUFBSUUsSUFBSUYsRUFBWCxFQUFjO0FBQUE7QUFDYixTQUFJVixVQUFRLDBCQUFXVSxFQUFYLENBQVo7QUFDQSxTQUFJRyxPQUFLYixRQUFRYyxVQUFSLEVBQVQ7QUFDQSxTQUFJQyxVQUFRRixLQUFLRyxTQUFMLENBQWUsQ0FBZixFQUFpQkwsRUFBakIsSUFBcUJNLENBQXJCLEdBQXVCSixLQUFLSyxNQUFMLENBQVlOLElBQUlELEVBQWhCLENBQW5DO0FBQ0FYLGFBQVFtQixRQUFSLENBQWlCLEVBQUNuQixTQUFRZSxPQUFULEVBQWpCLEVBQW9DLGFBQUc7QUFDdENmLGNBQVFvQixTQUFSO0FBQ0FkLGVBQVNYLFVBQVVTLE1BQVYsQ0FBaUJpQixNQUFqQixDQUF3QlgsRUFBeEIsRUFBMkJDLEtBQUdNLEVBQUVLLE1BQWhDLENBQVQ7QUFDQSxNQUhEO0FBSmE7QUFRYixJQVJELE1BUUssQ0FFSjtBQUNELEdBZE87QUFBQSxFQURXO0FBZ0JsQkMsU0FBUTtBQUFBLFNBQUcsVUFBQ2pCLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUNqQyxPQUFNUixRQUFNUSxVQUFaO0FBRGlDLDJCQUVQUixNQUFNUyxTQUZDO0FBQUEsaURBRTFCQyxLQUYwQjtBQUFBLE9BRW5CQyxFQUZtQix5QkFFbkJBLEVBRm1CO0FBQUEsT0FFaEJDLEVBRmdCLHlCQUVoQkEsRUFGZ0I7QUFBQSxPQUVaQyxHQUZZLHFCQUVaQSxHQUZZOztBQUdqQyxPQUFHRixNQUFJRSxJQUFJRixFQUFYLEVBQWM7QUFBQTtBQUNiLFNBQUlWLFVBQVEsMEJBQVdVLEVBQVgsQ0FBWjtBQUNBLFNBQUlHLE9BQUtiLFFBQVFjLFVBQVIsRUFBVDtBQUNBLFNBQUlDLFVBQVFGLEtBQUtHLFNBQUwsQ0FBZSxDQUFmLEVBQWlCTCxLQUFHYSxDQUFwQixJQUF1QlgsS0FBS0ssTUFBTCxDQUFZTixJQUFJRCxFQUFoQixDQUFuQztBQUNBWCxhQUFRbUIsUUFBUixDQUFpQixFQUFDbkIsU0FBUWUsT0FBVCxFQUFqQixFQUFvQyxhQUFHO0FBQ3RDZixjQUFRb0IsU0FBUjtBQUNBZCxlQUFTWCxVQUFVUyxNQUFWLENBQWlCaUIsTUFBakIsQ0FBd0JYLEVBQXhCLEVBQTJCQyxLQUFHYSxDQUE5QixDQUFUO0FBQ0EsTUFIRDtBQUphO0FBUWIsSUFSRCxNQVFLLENBRUo7QUFDRCxHQWRRO0FBQUE7QUFoQlUsQ0FBYjs7a0JBaUNRM0IsWSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxyXG5cclxuaW1wb3J0IHtUZXh0fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcblxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0ICogYXMgU2VsZWN0aW9uIGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5cclxuY29uc3QgU3VwZXI9ZWRpdGFibGUoVGV4dClcclxuZXhwb3J0IGNsYXNzIEVkaXRhYmxlVGV4dCBleHRlbmRzIFN1cGVye1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPU9iamVjdC5hc3NpZ24oc3VwZXIuc3RhdGV8fHt9LHtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW59KVxyXG5cdH1cclxuXHJcblx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IHtnZXRDb250ZW50fSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG5jb25zdCBET01BSU49XCJ0ZXh0XCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0SU5TRVJUOiB0PT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3Qge3N0YXJ0OntpZCxhdH0sZW5kfT1zdGF0ZS5zZWxlY3Rpb25cclxuXHRcdGlmKGlkPT1lbmQuaWQpe1xyXG5cdFx0XHRsZXQgY29udGVudD1nZXRDb250ZW50KGlkKVxyXG5cdFx0XHRsZXQgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxyXG5cdFx0XHRsZXQgbmV3VGV4dD10ZXh0LnN1YnN0cmluZygwLGF0KSt0K3RleHQuc3Vic3RyKGVuZC5hdClcclxuXHRcdFx0Y29udGVudC5zZXRTdGF0ZSh7Y29udGVudDpuZXdUZXh0fSwgZT0+e1xyXG5cdFx0XHRcdGNvbnRlbnQucmVDb21wb3NlKClcclxuXHRcdFx0XHRkaXNwYXRjaChTZWxlY3Rpb24uQUNUSU9OLlNFTEVDVChpZCxhdCt0Lmxlbmd0aCkpXHJcblx0XHRcdH0pXHJcblx0XHR9ZWxzZXtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cdCxSRU1PVkU6IG49PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlLnNlbGVjdGlvblxyXG5cdFx0aWYoaWQ9PWVuZC5pZCl7XHJcblx0XHRcdGxldCBjb250ZW50PWdldENvbnRlbnQoaWQpXHJcblx0XHRcdGxldCB0ZXh0PWNvbnRlbnQuZ2V0Q29udGVudCgpXHJcblx0XHRcdGxldCBuZXdUZXh0PXRleHQuc3Vic3RyaW5nKDAsYXQtbikrdGV4dC5zdWJzdHIoZW5kLmF0KVxyXG5cdFx0XHRjb250ZW50LnNldFN0YXRlKHtjb250ZW50Om5ld1RleHR9LCBlPT57XHJcblx0XHRcdFx0Y29udGVudC5yZUNvbXBvc2UoKVxyXG5cdFx0XHRcdGRpc3BhdGNoKFNlbGVjdGlvbi5BQ1RJT04uU0VMRUNUKGlkLGF0LW4pKVxyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2V7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRWRpdGFibGVUZXh0XHJcbiJdfQ==