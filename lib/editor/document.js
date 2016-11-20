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
				e.preventDefault();
				switch (e.keyCode) {
					case 8:
						//backspace
						_this2.store.dispatch(_text.ACTION.REMOVE(1));
						break;
					case 32:
						//space
						_this2.store.dispatch(_text.ACTION.INSERT(String.fromCharCode(e.keyCode)));
						break;
					case 37:
						//ARROW LEFT
						_this2.store.dispatch(_selection.ACTION.MOVE_LEFT());
						break;
					case 38:
						//ARROW UP
						_this2.store.dispatch(_selection.ACTION.MOVE_UP());
						break;
					case 39:
						//ARROW RIGHT
						_this2.store.dispatch(_selection.ACTION.MOVE_RIGHT());
						break;
					case 40:
						//ARROW DOWN
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwib3RoZXJzIiwic3R5bGUiLCJzZXR0aW5nIiwiaW5wdXRSZWFkeSIsImN1cnNvclJlYWR5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwia2V5Q29kZSIsImRpc3BhdGNoIiwiUkVNT1ZFIiwiSU5TRVJUIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfUklHSFQiLCJNT1ZFX0RPV04iLCJyb290IiwicmVmcyIsInN2ZyIsInRhcmdldCIsIm5vZGVOYW1lIiwidGV4dCIsInRleHRDb250ZW50IiwiY29udGVudEVuZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiY29udGVudElEIiwieCIsIkFUIiwibGVuZ3RoIiwiY2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxRQUFNLDBDQUFaOztBQUVBLElBQU1DLG1CQUFpQkMsT0FBT0Msb0NBQVAsa0JBQXZCOztJQUVxQkMsZ0I7OztBQUNwQiw2QkFBYTtBQUFBOztBQUFBLHlKQUNIQyxTQURHOztBQUdaLFFBQUtDLEtBQUwsR0FBVyx3QkFDVixnQkFBd0JDLE1BQXhCO0FBQUEsT0FBRUMsU0FBRixRQUFFQSxTQUFGO0FBQUEs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dkI7QUFDRDs7O0VBekY0Q3pDLEs7O2tCQUF6QkksZ0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tcG9zZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXHJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCBvZmZzZXQgZnJvbSBcIm1vdXNlLWV2ZW50LW9mZnNldFwiXHJcbmltcG9ydCB0aHVuayBmcm9tIFwicmVkdXgtdGh1bmtcIlxyXG5cclxuaW1wb3J0IHtEb2N1bWVudH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5pbXBvcnQge0FDVElPTiBhcyBUZXh0X0FDVElPTn0gZnJvbSBcIi4vdGV4dFwiXHJcbmltcG9ydCBDdXJzb3IsIHtBQ1RJT04gYXMgQ3Vyc29yX0FDVElPTn0gZnJvbSBcIi4vY3Vyc29yXCJcclxuaW1wb3J0IFNlbGVjdGlvbiwge0FDVElPTiBhcyBTZWxlY3Rpb25fQUNUSU9OLCByZWR1Y2VyIGFzIFNlbGVjdGlvbl9yZWR1Y2VyfSBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuY29uc3QgU3VwZXI9ZWRpdGFibGUoRG9jdW1lbnQpXHJcblxyXG5jb25zdCBjb21wb3NlRW5oYW5jZXJzPXdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdGFibGVEb2N1bWVudCBleHRlbmRzIFN1cGVye1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0dGhpcy5zdG9yZT1jcmVhdGVTdG9yZShcclxuXHRcdFx0KHtzZWxlY3Rpb24sIC4uLm90aGVyc30sYWN0aW9uKT0+T2JqZWN0LmFzc2lnbihvdGhlcnMsIGNvbWJpbmVSZWR1Y2Vycyh7XHJcblx0XHRcdFx0XHRzZWxlY3Rpb246U2VsZWN0aW9uX3JlZHVjZXJcclxuXHRcdFx0fSkoe3NlbGVjdGlvbn0sYWN0aW9uKSlcclxuXHRcdFx0LHtcclxuXHRcdFx0XHRzdHlsZTp7fVxyXG5cdFx0XHRcdCxzZXR0aW5nOnt9XHJcblx0XHRcdH1cclxuXHRcdFx0LGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rKSkpXHJcblx0fVxyXG5cclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gWzxDdXJzb3Iga2V5PVwiY3Vyc29yXCIvPiwgPFNlbGVjdGlvbiBrZXk9XCJzZWxlY3Rpb25cIi8+XVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3RoaXMuc3RvcmV9PlxyXG5cdFx0XHR7c3VwZXIucmVuZGVyKCl9XHJcblx0XHRcdDwvUHJvdmlkZXI+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cclxuXHRcdHRoaXMuaW5wdXRSZWFkeSgpXHJcblxyXG5cdFx0dGhpcy5jdXJzb3JSZWFkeSgpXHJcblx0fVxyXG5cclxuXHJcblx0aW5wdXRSZWFkeSgpe1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixlPT57XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4Oi8vYmFja3NwYWNlXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChUZXh0X0FDVElPTi5SRU1PVkUoMSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzI6Ly9zcGFjZVxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzc6Ly9BUlJPVyBMRUZUXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChTZWxlY3Rpb25fQUNUSU9OLk1PVkVfTEVGVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM4Oi8vQVJST1cgVVBcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9VUCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM5Oi8vQVJST1cgUklHSFRcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9SSUdIVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDQwOi8vQVJST1cgRE9XTlxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goU2VsZWN0aW9uX0FDVElPTi5NT1ZFX0RPV04oKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y3Vyc29yUmVhZHkoKXtcclxuXHRcdGNvbnN0IHJvb3Q9dGhpcy5yZWZzLnN2Z1xyXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZT0+e1xyXG5cdFx0XHRjb25zdCB0YXJnZXQ9ZS50YXJnZXRcclxuXHRcdFx0c3dpdGNoKHRhcmdldC5ub2RlTmFtZSl7XHJcblx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGxldCB0ZXh0PXRhcmdldC50ZXh0Q29udGVudFxyXG5cdFx0XHRcdGxldCBjb250ZW50RW5kSW5kZXg9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImVuZFwiKVxyXG5cdFx0XHRcdGxldCBjb250ZW50SUQ9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29udGVudFwiKVxyXG5cdFx0XHRcdGxldCBbeF09b2Zmc2V0KGUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKEN1cnNvcl9BQ1RJT04uQVQoY29udGVudElELGNvbnRlbnRFbmRJbmRleC10ZXh0Lmxlbmd0aCwgeCkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==