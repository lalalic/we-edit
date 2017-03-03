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
				content.setState({ content: newText }, function (e) {
					content.reCompose();
					dispatch(Selection.ACTION.SELECT(id, at + t.length));
				});
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
				var content = (0, _selector.getContent)(id);
				var text = content.getContent();
				var newText = text.substring(0, at - n) + text.substr(end.at);
				content.setState({ content: newText }, function (e) {
					content.reCompose();
					dispatch(Selection.ACTION.SELECT(id, at - n));
				});
			} else {}
		};
	}
};

exports.default = EditableText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGV4dC5qcyJdLCJuYW1lcyI6WyJTZWxlY3Rpb24iLCJTdXBlciIsIkVkaXRhYmxlVGV4dCIsImFyZ3VtZW50cyIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJET01BSU4iLCJBQ1RJT04iLCJJTlNFUlQiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwic2VsZWN0aW9uIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwidGV4dCIsImdldENvbnRlbnQiLCJuZXdUZXh0Iiwic3Vic3RyaW5nIiwidCIsInN1YnN0ciIsInNldFN0YXRlIiwicmVDb21wb3NlIiwiU0VMRUNUIiwibGVuZ3RoIiwiUkVNT1ZFIiwibiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0lBQVlBLFM7O0FBZVo7Ozs7OztBQVpBLElBQU1DLFFBQU0sc0NBQVo7O0lBQ2FDLFksV0FBQUEsWTs7O0FBQ1oseUJBQWE7QUFBQTs7QUFBQSxpSkFDSEMsU0FERzs7QUFFWixRQUFLQyxLQUFMLEdBQVcsc0JBQWMsaUlBQWEsRUFBM0IsRUFBOEIsRUFBQ0MsU0FBUSxNQUFLQyxLQUFMLENBQVdDLFFBQXBCLEVBQTlCLENBQVg7QUFGWTtBQUdaOzs7O29DQUVnQjtBQUNoQixVQUFPLENBQVA7QUFDQTs7O0VBUmdDTixLOztBQWFsQyxJQUFNTyxTQUFPLE1BQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQUcsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2hDLE9BQU1SLFFBQU1RLFVBQVo7QUFEZ0MsMEJBRU5SLE1BQU1TLFNBRkE7QUFBQSxnREFFekJDLEtBRnlCO0FBQUEsT0FFbEJDLEVBRmtCLHlCQUVsQkEsRUFGa0I7QUFBQSxPQUVmQyxFQUZlLHlCQUVmQSxFQUZlO0FBQUEsT0FFWEMsR0FGVyxvQkFFWEEsR0FGVzs7QUFHaEMsT0FBR0YsTUFBSUUsSUFBSUYsRUFBWCxFQUFjO0FBQ2IsUUFBSVYsVUFBUSwwQkFBV1UsRUFBWCxDQUFaO0FBQ0EsUUFBSUcsT0FBS2IsUUFBUWMsVUFBUixFQUFUO0FBQ0EsUUFBSUMsVUFBUUYsS0FBS0csU0FBTCxDQUFlLENBQWYsRUFBaUJMLEVBQWpCLElBQXFCTSxDQUFyQixHQUF1QkosS0FBS0ssTUFBTCxDQUFZTixJQUFJRCxFQUFoQixDQUFuQztBQUNBWCxZQUFRbUIsUUFBUixDQUFpQixFQUFDbkIsU0FBUWUsT0FBVCxFQUFqQixFQUFvQyxhQUFHO0FBQ3RDZixhQUFRb0IsU0FBUjtBQUNBZCxjQUFTWCxVQUFVUyxNQUFWLENBQWlCaUIsTUFBakIsQ0FBd0JYLEVBQXhCLEVBQTJCQyxLQUFHTSxFQUFFSyxNQUFoQyxDQUFUO0FBQ0EsS0FIRDtBQUlBLElBUkQsTUFRSyxDQUVKO0FBQ0QsR0FkTztBQUFBLEVBRFc7QUFnQmxCQyxTQUFRO0FBQUEsU0FBRyxVQUFDakIsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2pDLE9BQU1SLFFBQU1RLFVBQVo7QUFEaUMsMkJBRVBSLE1BQU1TLFNBRkM7QUFBQSxpREFFMUJDLEtBRjBCO0FBQUEsT0FFbkJDLEVBRm1CLHlCQUVuQkEsRUFGbUI7QUFBQSxPQUVoQkMsRUFGZ0IseUJBRWhCQSxFQUZnQjtBQUFBLE9BRVpDLEdBRlkscUJBRVpBLEdBRlk7O0FBR2pDLE9BQUdGLE1BQUlFLElBQUlGLEVBQVgsRUFBYztBQUNiLFFBQUlWLFVBQVEsMEJBQVdVLEVBQVgsQ0FBWjtBQUNBLFFBQUlHLE9BQUtiLFFBQVFjLFVBQVIsRUFBVDtBQUNBLFFBQUlDLFVBQVFGLEtBQUtHLFNBQUwsQ0FBZSxDQUFmLEVBQWlCTCxLQUFHYSxDQUFwQixJQUF1QlgsS0FBS0ssTUFBTCxDQUFZTixJQUFJRCxFQUFoQixDQUFuQztBQUNBWCxZQUFRbUIsUUFBUixDQUFpQixFQUFDbkIsU0FBUWUsT0FBVCxFQUFqQixFQUFvQyxhQUFHO0FBQ3RDZixhQUFRb0IsU0FBUjtBQUNBZCxjQUFTWCxVQUFVUyxNQUFWLENBQWlCaUIsTUFBakIsQ0FBd0JYLEVBQXhCLEVBQTJCQyxLQUFHYSxDQUE5QixDQUFUO0FBQ0EsS0FIRDtBQUlBLElBUkQsTUFRSyxDQUVKO0FBQ0QsR0FkUTtBQUFBO0FBaEJVLENBQWI7O2tCQWlDUTNCLFkiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IG9mZnNldCBmcm9tIFwibW91c2UtZXZlbnQtb2Zmc2V0XCJcclxuXHJcbmltcG9ydCB7VGV4dH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCAqIGFzIFNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKFRleHQpXHJcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVRleHQgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT1PYmplY3QuYXNzaWduKHN1cGVyLnN0YXRlfHx7fSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnRDb3VudCgpe1xyXG5cdFx0cmV0dXJuIDFcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCB7Z2V0Q29udGVudH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuY29uc3QgRE9NQUlOPVwidGV4dFwiXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdElOU0VSVDogdD0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IHtzdGFydDp7aWQsYXR9LGVuZH09c3RhdGUuc2VsZWN0aW9uXHJcblx0XHRpZihpZD09ZW5kLmlkKXtcclxuXHRcdFx0bGV0IGNvbnRlbnQ9Z2V0Q29udGVudChpZClcclxuXHRcdFx0bGV0IHRleHQ9Y29udGVudC5nZXRDb250ZW50KClcclxuXHRcdFx0bGV0IG5ld1RleHQ9dGV4dC5zdWJzdHJpbmcoMCxhdCkrdCt0ZXh0LnN1YnN0cihlbmQuYXQpXHJcblx0XHRcdGNvbnRlbnQuc2V0U3RhdGUoe2NvbnRlbnQ6bmV3VGV4dH0sIGU9PntcclxuXHRcdFx0XHRjb250ZW50LnJlQ29tcG9zZSgpXHJcblx0XHRcdFx0ZGlzcGF0Y2goU2VsZWN0aW9uLkFDVElPTi5TRUxFQ1QoaWQsYXQrdC5sZW5ndGgpKVxyXG5cdFx0XHR9KVxyXG5cdFx0fWVsc2V7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHQsUkVNT1ZFOiBuPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3Qge3N0YXJ0OntpZCxhdH0sZW5kfT1zdGF0ZS5zZWxlY3Rpb25cclxuXHRcdGlmKGlkPT1lbmQuaWQpe1xyXG5cdFx0XHRsZXQgY29udGVudD1nZXRDb250ZW50KGlkKVxyXG5cdFx0XHRsZXQgdGV4dD1jb250ZW50LmdldENvbnRlbnQoKVxyXG5cdFx0XHRsZXQgbmV3VGV4dD10ZXh0LnN1YnN0cmluZygwLGF0LW4pK3RleHQuc3Vic3RyKGVuZC5hdClcclxuXHRcdFx0Y29udGVudC5zZXRTdGF0ZSh7Y29udGVudDpuZXdUZXh0fSwgZT0+e1xyXG5cdFx0XHRcdGNvbnRlbnQucmVDb21wb3NlKClcclxuXHRcdFx0XHRkaXNwYXRjaChTZWxlY3Rpb24uQUNUSU9OLlNFTEVDVChpZCxhdC1uKSlcclxuXHRcdFx0fSlcclxuXHRcdH1lbHNle1xyXG5cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVkaXRhYmxlVGV4dFxyXG4iXX0=