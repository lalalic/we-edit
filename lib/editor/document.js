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
						//backspace
						e.preventDefault();
						_this2.store.dispatch(_text.ACTION.REMOVE(1));
						break;
					case 32:
						//space
						e.preventDefault();
						_this2.store.dispatch(_text.ACTION.INSERT(String.fromCharCode(e.keyCode)));
						break;
					case 37:
						//ARROW LEFT
						e.preventDefault();
						_this2.store.dispatch(_selection.ACTION.MOVE_LEFT());
						break;
					case 38:
						//ARROW UP
						e.preventDefault();
						_this2.store.dispatch(_selection.ACTION.MOVE_UP());
						break;
					case 39:
						//ARROW RIGHT
						e.preventDefault();
						_this2.store.dispatch(_selection.ACTION.MOVE_RIGHT());
						break;
					case 40:
						//ARROW DOWN
						e.preventDefault();
						_this2.store.dispatch(_selection.ACTION.MOVE_DOWN());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwib3RoZXJzIiwic3R5bGUiLCJzZXR0aW5nIiwiaW5wdXRSZWFkeSIsImN1cnNvclJlYWR5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoIiwiUkVNT1ZFIiwiSU5TRVJUIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfUklHSFQiLCJNT1ZFX0RPV04iLCJyb290IiwicmVmcyIsInN2ZyIsInRhcmdldCIsIm5vZGVOYW1lIiwidGV4dCIsInRleHRDb250ZW50IiwiY29udGVudEVuZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiY29udGVudElEIiwieCIsIkFUIiwibGVuZ3RoIiwiY2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxRQUFNLDBDQUFaOztBQUVBLElBQU1DLG1CQUFpQkMsT0FBT0Msb0NBQVAsa0JBQXZCOztJQUVxQkMsZ0I7OztBQUNwQiw2QkFBYTtBQUFBOztBQUFBLHlKQUNIQyxTQURHOztBQUdaLFFBQUtDLEtBQUwsR0FBVyx3QkFDVixnQkFBd0JDLE1BQXhCO0FBQUEsT0FBRUMsU0FBRixRQUFFQSxTQUFGO0FBQUEs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dEIsT0FBRyxDQUFDLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsUUFBdkIsQ0FBZ0NILEtBQWhDLENBQUosRUFDQywySkFBdUJBLEtBQXZCO0FBQ0Q7OztFQTlGNEN6QyxLOztrQkFBekJJLGdCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGNvbXBvc2UsIGFwcGx5TWlkZGxld2FyZSwgY29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxyXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxyXG5pbXBvcnQgdGh1bmsgZnJvbSBcInJlZHV4LXRodW5rXCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgVGV4dF9BQ1RJT059IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgQ3Vyc29yLCB7QUNUSU9OIGFzIEN1cnNvcl9BQ1RJT059IGZyb20gXCIuL2N1cnNvclwiXHJcbmltcG9ydCBTZWxlY3Rpb24sIHtBQ1RJT04gYXMgU2VsZWN0aW9uX0FDVElPTiwgcmVkdWNlciBhcyBTZWxlY3Rpb25fcmVkdWNlcn0gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5cclxuY29uc3QgY29tcG9zZUVuaGFuY2Vycz13aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2VcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRhYmxlRG9jdW1lbnQgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHRoaXMuc3RvcmU9Y3JlYXRlU3RvcmUoXHJcblx0XHRcdCh7c2VsZWN0aW9uLCAuLi5vdGhlcnN9LGFjdGlvbik9Pk9iamVjdC5hc3NpZ24ob3RoZXJzLCBjb21iaW5lUmVkdWNlcnMoe1xyXG5cdFx0XHRcdFx0c2VsZWN0aW9uOlNlbGVjdGlvbl9yZWR1Y2VyXHJcblx0XHRcdH0pKHtzZWxlY3Rpb259LGFjdGlvbikpXHJcblx0XHRcdCx7XHJcblx0XHRcdFx0c3R5bGU6e31cclxuXHRcdFx0XHQsc2V0dGluZzp7fVxyXG5cdFx0XHR9XHJcblx0XHRcdCxjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaykpKVxyXG5cdH1cclxuXHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIFs8Q3Vyc29yIGtleT1cImN1cnNvclwiLz4sIDxTZWxlY3Rpb24ga2V5PVwic2VsZWN0aW9uXCIvPl1cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFByb3ZpZGVyIHN0b3JlPXt0aGlzLnN0b3JlfT5cclxuXHRcdFx0e3N1cGVyLnJlbmRlcigpfVxyXG5cdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcclxuXHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuY3Vyc29yUmVhZHkoKVxyXG5cdH1cclxuXHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4Oi8vYmFja3NwYWNlXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChUZXh0X0FDVElPTi5SRU1PVkUoMSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzI6Ly9zcGFjZVxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzc6Ly9BUlJPVyBMRUZUXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChTZWxlY3Rpb25fQUNUSU9OLk1PVkVfTEVGVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM4Oi8vQVJST1cgVVBcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9VUCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM5Oi8vQVJST1cgUklHSFRcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9SSUdIVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDQwOi8vQVJST1cgRE9XTlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goU2VsZWN0aW9uX0FDVElPTi5NT1ZFX0RPV04oKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y3Vyc29yUmVhZHkoKXtcclxuXHRcdGNvbnN0IHJvb3Q9dGhpcy5yZWZzLnN2Z1xyXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZT0+e1xyXG5cdFx0XHRjb25zdCB0YXJnZXQ9ZS50YXJnZXRcclxuXHRcdFx0c3dpdGNoKHRhcmdldC5ub2RlTmFtZSl7XHJcblx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGxldCB0ZXh0PXRhcmdldC50ZXh0Q29udGVudFxyXG5cdFx0XHRcdGxldCBjb250ZW50RW5kSW5kZXg9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImVuZFwiKVxyXG5cdFx0XHRcdGxldCBjb250ZW50SUQ9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29udGVudFwiKVxyXG5cdFx0XHRcdGxldCBbeF09b2Zmc2V0KGUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKEN1cnNvcl9BQ1RJT04uQVQoY29udGVudElELGNvbnRlbnRFbmRJbmRleC10ZXh0Lmxlbmd0aCwgeCkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==