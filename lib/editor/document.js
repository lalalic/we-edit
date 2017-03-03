"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Document);

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var EditableDocument = function (_Super) {
	_inherits(EditableDocument, _Super);

	function EditableDocument() {
		_classCallCheck(this, EditableDocument);

		var _this = _possibleConstructorReturn(this, (EditableDocument.__proto__ || Object.getPrototypeOf(EditableDocument)).apply(this, arguments));

		_this.store = (0, _redux.createStore)(function (_ref, action) {
			var selection = _ref.selection,
			    others = _objectWithoutProperties(_ref, ["selection"]);

			return Object.assign(others, (0, _redux.combineReducers)({
				selection: _selection.reducer
			})({ selection: selection }, action));
		}, {
			style: {},
			setting: {}
		}, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));
		return _this;
	}

	_createClass(EditableDocument, [{
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
				_get(EditableDocument.prototype.__proto__ || Object.getPrototypeOf(EditableDocument.prototype), "render", this).call(this)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			_get(EditableDocument.prototype.__proto__ || Object.getPrototypeOf(EditableDocument.prototype), "componentDidMount", this).call(this);

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
						    _offset2 = _slicedToArray(_offset, 1),
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
			if (!this.computed.children.includes(child)) _get(EditableDocument.prototype.__proto__ || Object.getPrototypeOf(EditableDocument.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);

	return EditableDocument;
}(Super);

exports.default = EditableDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwib3RoZXJzIiwiT2JqZWN0IiwiYXNzaWduIiwic3R5bGUiLCJzZXR0aW5nIiwiaW5wdXRSZWFkeSIsImN1cnNvclJlYWR5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImRpc3BhdGNoIiwiUkVNT1ZFIiwiSU5TRVJUIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfUklHSFQiLCJNT1ZFX0RPV04iLCJyb290IiwicmVmcyIsInN2ZyIsInRhcmdldCIsIm5vZGVOYW1lIiwidGV4dCIsInRleHRDb250ZW50IiwiY29udGVudEVuZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiY29udGVudElEIiwieCIsIkFUIiwibGVuZ3RoIiwiY2hpbGQiLCJjb21wdXRlZCIsImNoaWxkcmVuIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFFBQU0sMENBQVo7O0FBRUEsSUFBTUMsbUJBQWlCQyxPQUFPQyxvQ0FBUCxrQkFBdkI7O0lBRXFCQyxnQjs7O0FBQ3BCLDZCQUFhO0FBQUE7O0FBQUEsbUlBQ0hDLFNBREc7O0FBR1osUUFBS0MsS0FBTCxHQUFXLHdCQUNWLGdCQUF3QkMsTUFBeEI7QUFBQSxPQUFFQyxTQUFGLFFBQUVBLFNBQUY7QUFBQSxPQUFn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RUFBTTtBQUN0QixPQUFHLENBQUMsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxRQUF2QixDQUFnQ0gsS0FBaEMsQ0FBSixFQUNDLHFJQUF1QkEsS0FBdkI7QUFDRDs7OztFQTlGNEMzQyxLOztrQkFBekJJLGdCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGNvbXBvc2UsIGFwcGx5TWlkZGxld2FyZSwgY29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxyXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgb2Zmc2V0IGZyb20gXCJtb3VzZS1ldmVudC1vZmZzZXRcIlxyXG5pbXBvcnQgdGh1bmsgZnJvbSBcInJlZHV4LXRodW5rXCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IHtBQ1RJT04gYXMgVGV4dF9BQ1RJT059IGZyb20gXCIuL3RleHRcIlxyXG5pbXBvcnQgQ3Vyc29yLCB7QUNUSU9OIGFzIEN1cnNvcl9BQ1RJT059IGZyb20gXCIuL2N1cnNvclwiXHJcbmltcG9ydCBTZWxlY3Rpb24sIHtBQ1RJT04gYXMgU2VsZWN0aW9uX0FDVElPTiwgcmVkdWNlciBhcyBTZWxlY3Rpb25fcmVkdWNlcn0gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5cclxuY29uc3QgY29tcG9zZUVuaGFuY2Vycz13aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2VcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRhYmxlRG9jdW1lbnQgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHRoaXMuc3RvcmU9Y3JlYXRlU3RvcmUoXHJcblx0XHRcdCh7c2VsZWN0aW9uLCAuLi5vdGhlcnN9LGFjdGlvbik9Pk9iamVjdC5hc3NpZ24ob3RoZXJzLCBjb21iaW5lUmVkdWNlcnMoe1xyXG5cdFx0XHRcdFx0c2VsZWN0aW9uOlNlbGVjdGlvbl9yZWR1Y2VyXHJcblx0XHRcdH0pKHtzZWxlY3Rpb259LGFjdGlvbikpXHJcblx0XHRcdCx7XHJcblx0XHRcdFx0c3R5bGU6e31cclxuXHRcdFx0XHQsc2V0dGluZzp7fVxyXG5cdFx0XHR9XHJcblx0XHRcdCxjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaykpKVxyXG5cdH1cclxuXHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIFs8Q3Vyc29yIGtleT1cImN1cnNvclwiLz4sIDxTZWxlY3Rpb24ga2V5PVwic2VsZWN0aW9uXCIvPl1cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFByb3ZpZGVyIHN0b3JlPXt0aGlzLnN0b3JlfT5cclxuXHRcdFx0e3N1cGVyLnJlbmRlcigpfVxyXG5cdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcclxuXHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuY3Vyc29yUmVhZHkoKVxyXG5cdH1cclxuXHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4Oi8vYmFja3NwYWNlXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChUZXh0X0FDVElPTi5SRU1PVkUoMSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzI6Ly9zcGFjZVxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzc6Ly9BUlJPVyBMRUZUXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChTZWxlY3Rpb25fQUNUSU9OLk1PVkVfTEVGVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM4Oi8vQVJST1cgVVBcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9VUCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDM5Oi8vQVJST1cgUklHSFRcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKFNlbGVjdGlvbl9BQ1RJT04uTU9WRV9SSUdIVCgpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDQwOi8vQVJST1cgRE9XTlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goU2VsZWN0aW9uX0FDVElPTi5NT1ZFX0RPV04oKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goVGV4dF9BQ1RJT04uSU5TRVJUKFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y3Vyc29yUmVhZHkoKXtcclxuXHRcdGNvbnN0IHJvb3Q9dGhpcy5yZWZzLnN2Z1xyXG5cdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZT0+e1xyXG5cdFx0XHRjb25zdCB0YXJnZXQ9ZS50YXJnZXRcclxuXHRcdFx0c3dpdGNoKHRhcmdldC5ub2RlTmFtZSl7XHJcblx0XHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRcdGxldCB0ZXh0PXRhcmdldC50ZXh0Q29udGVudFxyXG5cdFx0XHRcdGxldCBjb250ZW50RW5kSW5kZXg9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImVuZFwiKVxyXG5cdFx0XHRcdGxldCBjb250ZW50SUQ9dGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29udGVudFwiKVxyXG5cdFx0XHRcdGxldCBbeF09b2Zmc2V0KGUsIHRhcmdldClcclxuXHRcdFx0XHR0aGlzLnN0b3JlLmRpc3BhdGNoKEN1cnNvcl9BQ1RJT04uQVQoY29udGVudElELGNvbnRlbnRFbmRJbmRleC10ZXh0Lmxlbmd0aCwgeCkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==