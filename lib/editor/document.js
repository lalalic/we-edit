"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _mouseEventOffset = require("mouse-event-offset");

var _mouseEventOffset2 = _interopRequireDefault(_mouseEventOffset);

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _text = require("./text");

var _cursor = require("./cursor");

var _cursor2 = _interopRequireDefault(_cursor);

var _selection = require("./selection");

var _selection2 = _interopRequireDefault(_selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _editable2.default)(_content.Document);

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var EditableDocument = function (_Super) {
	(0, _inherits3.default)(EditableDocument, _Super);

	function EditableDocument() {
		(0, _classCallCheck3.default)(this, EditableDocument);

		var _this = (0, _possibleConstructorReturn3.default)(this, (EditableDocument.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument)).apply(this, arguments));

		_this.store = (0, _redux.createStore)(function (_ref, action) {
			var selection = _ref.selection,
			    others = (0, _objectWithoutProperties3.default)(_ref, ["selection"]);
			return (0, _assign2.default)(others, (0, _redux.combineReducers)({
				selection: _selection.reducer
			})({ selection: selection }, action));
		}, {
			style: {},
			setting: {}
		}, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));
		return _this;
	}

	(0, _createClass3.default)(EditableDocument, [{
		key: "more",
		value: function more() {
			return [_react2.default.createElement(_cursor2.default, { key: "cursor" }), _react2.default.createElement(_selection2.default, { key: "selection" })];
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_reactRedux.Provider,
				{ store: this.store },
				(0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "render", this).call(this)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			(0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "componentDidMount", this).call(this);

			this.inputReady();

			this.cursorReady();
		}
	}, {
		key: "inputReady",
		value: function inputReady() {
			var _this2 = this;

			document.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 8:
						e.preventDefault();
						_this2.store.dispatch(_text.ACTION.REMOVE(-1));
						break;
					case 32:
						e.preventDefault();
						_this2.store.dispatch(_text.ACTION.INSERT(String.fromCharCode(e.keyCode)));
						break;
				}
			});

			document.addEventListener("keypress", function (e) {
				_this2.store.dispatch(_text.ACTION.INSERT(String.fromCharCode(e.keyCode)));
			});
		}
	}, {
		key: "cursorReady",
		value: function cursorReady() {
			var _this3 = this;

			var root = this.refs.svg;
			root.addEventListener("click", function (e) {
				var target = e.target;
				switch (target.nodeName) {
					case 'text':
						var text = target.textContent;
						var contentEndIndex = target.getAttribute("end");
						var contentID = target.getAttribute("data-content");

						var _offset = (0, _mouseEventOffset2.default)(e, target),
						    _offset2 = (0, _slicedToArray3.default)(_offset, 1),
						    x = _offset2[0];

						_this3.store.dispatch(_cursor.ACTION.AT(contentID, contentEndIndex - text.length, x));
						break;
					case 'image':
						break;
				}
			});
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed(child) {
			if (!this.computed.children.includes(child)) (0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);
	return EditableDocument;
}(Super);

exports.default = EditableDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwib3RoZXJzIiwic3R5bGUiLCJzZXR0aW5nIiwiaW5wdXRSZWFkeSIsImN1cnNvclJlYWR5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoIiwiUkVNT1ZFIiwiSU5TRVJUIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicm9vdCIsInJlZnMiLCJzdmciLCJ0YXJnZXQiLCJub2RlTmFtZSIsInRleHQiLCJ0ZXh0Q29udGVudCIsImNvbnRlbnRFbmRJbmRleCIsImdldEF0dHJpYnV0ZSIsImNvbnRlbnRJRCIsIngiLCJBVCIsImxlbmd0aCIsImNoaWxkIiwiY29tcHV0ZWQiLCJjaGlsZHJlbiIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsUUFBTSwwQ0FBWjs7QUFFQSxJQUFNQyxtQkFBaUJDLE9BQU9DLG9DQUFQLGtCQUF2Qjs7SUFFcUJDLGdCOzs7QUFDcEIsNkJBQWE7QUFBQTs7QUFBQSx5SkFDSEMsU0FERzs7QUFHWixRQUFLQyxLQUFMLEdBQVcsd0JBQ1YsZ0JBQXdCQyxNQUF4QjtBQUFBLE9BQUVDLFNBQUYsUUFBRUEsU0FBRjtBQUFBLE9BQWdCQyxNQUFoQjtBQUFBLFVBQWlDLHNCQUFjQSxNQUFkLEVBQXNCLDRCQUFnQjtBQUNyRUQ7QUFEcUUsSUFBaEIsRUFFcEQsRUFBQ0Esb0JBQUQsRUFGb0QsRUFFeENELE1BRndDLENBQXRCLENBQWpDO0FBQUEsR0FEVSxFQUlUO0FBQ0FHLFVBQU0sRUFETjtBQUVDQyxZQUFRO0FBRlQsR0FKUyxFQVFUVixpQkFBaUIsaURBQWpCLENBUlMsQ0FBWDtBQUhZO0FBWVo7Ozs7eUJBRUs7QUFDTCxVQUFPLENBQUMsa0RBQVEsS0FBSSxRQUFaLEdBQUQsRUFBeUIscURBQVcsS0FBSSxXQUFmLEdBQXpCLENBQVA7QUFDQTs7OzJCQUVPO0FBQ1AsVUFDQztBQUFBO0FBQUEsTUFBVSxPQUFPLEtBQUtLLEtBQXRCO0FBQUE7QUFBQSxJQUREO0FBS0E7OztzQ0FFa0I7QUFDbEI7O0FBRUEsUUFBS00sVUFBTDs7QUFFQSxRQUFLQyxXQUFMO0FBQ0E7OzsrQkFHVztBQUFBOztBQUNYQyxZQUFTQyxnQkFBVCxDQUEwQixTQUExQixFQUFvQyxhQUFHO0FBQ3RDLFlBQU9DLEVBQUVDLE9BQVQ7QUFDQSxVQUFLLENBQUw7QUFDQ0QsUUFBRUUsY0FBRjtBQUNBLGFBQUtaLEtBQUwsQ0FBV2EsUUFBWCxDQUFvQixhQUFZQyxNQUFaLENBQW1CLENBQUMsQ0FBcEIsQ0FBcEI7QUFDRDtBQUNBLFVBQUssRUFBTDtBQUNDSixRQUFFRSxjQUFGO0FBQ0EsYUFBS1osS0FBTCxDQUFXYSxRQUFYLENBQW9CLGFBQVlFLE1BQVosQ0FBbUJDLE9BQU9DLFlBQVAsQ0FBb0JQLEVBQUVDLE9BQXRCLENBQW5CLENBQXBCO0FBQ0Q7QUFSQTtBQVVBLElBWEQ7O0FBYUFILFlBQVNDLGdCQUFULENBQTBCLFVBQTFCLEVBQXFDLGFBQUc7QUFDdkMsV0FBS1QsS0FBTCxDQUFXYSxRQUFYLENBQW9CLGFBQVlFLE1BQVosQ0FBbUJDLE9BQU9DLFlBQVAsQ0FBb0JQLEVBQUVDLE9BQXRCLENBQW5CLENBQXBCO0FBQ0EsSUFGRDtBQUdBOzs7Z0NBRVk7QUFBQTs7QUFDWixPQUFNTyxPQUFLLEtBQUtDLElBQUwsQ0FBVUMsR0FBckI7QUFDQUYsUUFBS1QsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsYUFBRztBQUNqQyxRQUFNWSxTQUFPWCxFQUFFVyxNQUFmO0FBQ0EsWUFBT0EsT0FBT0MsUUFBZDtBQUNBLFVBQUssTUFBTDtBQUNDLFVBQUlDLE9BQUtGLE9BQU9HLFdBQWhCO0FBQ0EsVUFBSUMsa0JBQWdCSixPQUFPSyxZQUFQLENBQW9CLEtBQXBCLENBQXBCO0FBQ0EsVUFBSUMsWUFBVU4sT0FBT0ssWUFBUCxDQUFvQixjQUFwQixDQUFkOztBQUhELG9CQUlTLGdDQUFPaEIsQ0FBUCxFQUFVVyxNQUFWLENBSlQ7QUFBQTtBQUFBLFVBSU1PLENBSk47O0FBS0MsYUFBSzVCLEtBQUwsQ0FBV2EsUUFBWCxDQUFvQixlQUFjZ0IsRUFBZCxDQUFpQkYsU0FBakIsRUFBMkJGLGtCQUFnQkYsS0FBS08sTUFBaEQsRUFBd0RGLENBQXhELENBQXBCO0FBQ0Q7QUFDQSxVQUFLLE9BQUw7QUFDQTtBQVRBO0FBV0EsSUFiRDtBQWdCQTs7O21DQUVnQkcsSyxFQUFNO0FBQ3RCLE9BQUcsQ0FBQyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLFFBQXZCLENBQWdDSCxLQUFoQyxDQUFKLEVBQ0MsMkpBQXVCQSxLQUF2QjtBQUNEOzs7RUE5RTRDckMsSzs7a0JBQXpCSSxnQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21wb3NlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IG9mZnNldCBmcm9tIFwibW91c2UtZXZlbnQtb2Zmc2V0XCJcclxuaW1wb3J0IHRodW5rIGZyb20gXCJyZWR1eC10aHVua1wiXHJcblxyXG5pbXBvcnQge0RvY3VtZW50fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCB7QUNUSU9OIGFzIFRleHRfQUNUSU9OfSBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IEN1cnNvciwge0FDVElPTiBhcyBDdXJzb3JfQUNUSU9OfSBmcm9tIFwiLi9jdXJzb3JcIlxyXG5pbXBvcnQgU2VsZWN0aW9uLCB7QUNUSU9OIGFzIFNlbGVjdGlvbl9BQ1RJT04sIHJlZHVjZXIgYXMgU2VsZWN0aW9uX3JlZHVjZXJ9IGZyb20gXCIuL3NlbGVjdGlvblwiXHJcblxyXG5jb25zdCBTdXBlcj1lZGl0YWJsZShEb2N1bWVudClcclxuXHJcbmNvbnN0IGNvbXBvc2VFbmhhbmNlcnM9d2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0YWJsZURvY3VtZW50IGV4dGVuZHMgU3VwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHR0aGlzLnN0b3JlPWNyZWF0ZVN0b3JlKFxyXG5cdFx0XHQoe3NlbGVjdGlvbiwgLi4ub3RoZXJzfSxhY3Rpb24pPT5PYmplY3QuYXNzaWduKG90aGVycywgY29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0XHRcdHNlbGVjdGlvbjpTZWxlY3Rpb25fcmVkdWNlclxyXG5cdFx0XHR9KSh7c2VsZWN0aW9ufSxhY3Rpb24pKVxyXG5cdFx0XHQse1xyXG5cdFx0XHRcdHN0eWxlOnt9XHJcblx0XHRcdFx0LHNldHRpbmc6e31cclxuXHRcdFx0fVxyXG5cdFx0XHQsY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmspKSlcclxuXHR9XHJcblxyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiBbPEN1cnNvciBrZXk9XCJjdXJzb3JcIi8+LCA8U2VsZWN0aW9uIGtleT1cInNlbGVjdGlvblwiLz5dXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQcm92aWRlciBzdG9yZT17dGhpcy5zdG9yZX0+XHJcblx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRzdXBlci5jb21wb25lbnREaWRNb3VudCgpXHJcblxyXG5cdFx0dGhpcy5pbnB1dFJlYWR5KClcclxuXHJcblx0XHR0aGlzLmN1cnNvclJlYWR5KClcclxuXHR9XHJcblxyXG5cclxuXHRpbnB1dFJlYWR5KCl7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGU9PntcclxuXHRcdFx0c3dpdGNoKGUua2V5Q29kZSl7XHJcblx0XHRcdGNhc2UgODpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFRleHRfQUNUSU9OLlJFTU9WRSgtMSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzI6XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChUZXh0X0FDVElPTi5JTlNFUlQoU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y3Vyc29yUmVhZHkoKXtcclxuXHRcdGNvbnN0IHJvb3Q9dGhpcy5yZWZzLnN2Z1xyXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZT0+e1xyXG5cdFx0XHRjb25zdCB0YXJnZXQ9ZS50YXJnZXRcclxuXHRcdFx0c3dpdGNoKHRhcmdldC5ub2RlTmFtZSl7XHJcblx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGxldCB0ZXh0PXRhcmdldC50ZXh0Q29udGVudFxyXG5cdFx0XHRcdGxldCBjb250ZW50RW5kSW5kZXg9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImVuZFwiKVxyXG5cdFx0XHRcdGxldCBjb250ZW50SUQ9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29udGVudFwiKVxyXG5cdFx0XHRcdGxldCBbeF09b2Zmc2V0KGUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKEN1cnNvcl9BQ1RJT04uQVQoY29udGVudElELGNvbnRlbnRFbmRJbmRleC10ZXh0Lmxlbmd0aCwgeCkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==