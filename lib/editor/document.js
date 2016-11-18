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

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _cursor = require("./cursor");

var Cursor = _interopRequireWildcard(_cursor);

var _selection = require("./selection");

var Selection = _interopRequireWildcard(_selection);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _editable2.default)(_content.Document);

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var ACTION = {
	SET: function SET(content) {
		return { type: "content.set", payload: content };
	}
};

var reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "content.set":
			return payload;
	}
	return state;
};

var EditableDocument = function (_Super) {
	(0, _inherits3.default)(EditableDocument, _Super);

	function EditableDocument() {
		(0, _classCallCheck3.default)(this, EditableDocument);

		var _this = (0, _possibleConstructorReturn3.default)(this, (EditableDocument.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument)).apply(this, arguments));

		_this.store = (0, _redux.createStore)(function (_ref2, action) {
			var content = _ref2.content,
			    selection = _ref2.selection,
			    cursor = _ref2.cursor,
			    others = (0, _objectWithoutProperties3.default)(_ref2, ["content", "selection", "cursor"]);
			return (0, _assign2.default)(others, (0, _redux.combineReducers)({
				content: reducer,
				selection: Selection.reducer,
				cursor: Cursor.reducer
			})({ content: content, selection: selection, cursor: cursor }, action));
		}, {
			style: {},
			setting: {}
		}, composeEnhancers());
		return _this;
	}

	(0, _createClass3.default)(EditableDocument, [{
		key: "more",
		value: function more() {
			return [_react2.default.createElement(Cursor.Cursor, { key: "cursor" }), _react2.default.createElement(Selection.Selection, { key: "selection" })];
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
						_this2.refs.cursor.backspace();
						break;
					case 32:
						e.preventDefault();
						_this2.refs.cursor.insert(String.fromCharCode(e.keyCode));
						break;
				}
			});

			document.addEventListener("keypress", function (e) {
				_this2.refs.cursor.insert(String.fromCharCode(e.keyCode));
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

						var _offset = offset(e, target),
						    _offset2 = (0, _slicedToArray3.default)(_offset, 1),
						    x = _offset2[0];

						var _getClientBoundBox = getClientBoundBox(target),
						    top = _getClientBoundBox.top,
						    left = _getClientBoundBox.left;

						_this3.store.dispatch(Cursor.ACTION.AT(contentID, contentEndIndex - text.length, x, top, left));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQ3Vyc29yIiwiU2VsZWN0aW9uIiwiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiQUNUSU9OIiwiU0VUIiwidHlwZSIsInBheWxvYWQiLCJjb250ZW50IiwicmVkdWNlciIsInN0YXRlIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwiY3Vyc29yIiwib3RoZXJzIiwic3R5bGUiLCJzZXR0aW5nIiwiaW5wdXRSZWFkeSIsImN1cnNvclJlYWR5IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInJlZnMiLCJiYWNrc3BhY2UiLCJpbnNlcnQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJyb290Iiwic3ZnIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJjb250ZW50RW5kSW5kZXgiLCJnZXRBdHRyaWJ1dGUiLCJjb250ZW50SUQiLCJvZmZzZXQiLCJ4IiwiZ2V0Q2xpZW50Qm91bmRCb3giLCJ0b3AiLCJsZWZ0IiwiZGlzcGF0Y2giLCJBVCIsImxlbmd0aCIsImNoaWxkIiwiY29tcHV0ZWQiLCJjaGlsZHJlbiIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsTTs7QUFDWjs7SUFBWUMsUzs7Ozs7O0FBRVosSUFBTUMsUUFBTSwwQ0FBWjs7QUFFQSxJQUFNQyxtQkFBaUJDLE9BQU9DLG9DQUFQLGtCQUF2Qjs7QUFFQSxJQUFNQyxTQUFPO0FBQ1pDLE1BQUs7QUFBQSxTQUFVLEVB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TUEsR0FMTjtBQUFBLFVBS1dDLElBTFgsc0JBS1dBLElBTFg7O0FBTUMsYUFBS2hDLEtBQUwsQ0FBV2lDLFFBQVgsQ0FBb0JoRCxPQUFPTSxNQUFQLENBQWMyQyxFQUFkLENBQWlCUCxTQUFqQixFQUEyQkYsa0JBQWdCRixLQUFLWSxNQUFoRCxFQUF3RE4sQ0FBeEQsRUFBMkRFLEdBQTNELEVBQStEQyxJQUEvRCxDQUFwQjtBQUNEO0FBQ0EsVUFBSyxPQUFMO0FBQ0E7QUFWQTtBQVlBLElBZEQ7QUFpQkE7OzttQ0FFZ0JJLEssRUFBTTtBQUN0QixPQUFHLENBQUMsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxRQUF2QixDQUFnQ0gsS0FBaEMsQ0FBSixFQUNDLDJKQUF1QkEsS0FBdkI7QUFDRDs7O0VBakY0Q2pELEs7O2tCQUF6QlcsZ0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tcG9zZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXHJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQge0RvY3VtZW50fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCAqIGFzIEN1cnNvciBmcm9tIFwiLi9jdXJzb3JcIlxyXG5pbXBvcnQgKiBhcyBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5cclxuY29uc3QgY29tcG9zZUVuaGFuY2Vycz13aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2VcclxuXHJcbmNvbnN0IEFDVElPTj17XHJcblx0U0VUOiBjb250ZW50PT4oe3R5cGU6XCJjb250ZW50LnNldFwiLHBheWxvYWQ6Y29udGVudH0pXHJcbn1cclxuXHJcbmNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSBcImNvbnRlbnQuc2V0XCI6XHJcblx0XHRyZXR1cm4gcGF5bG9hZFx0XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0YWJsZURvY3VtZW50IGV4dGVuZHMgU3VwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHR0aGlzLnN0b3JlPWNyZWF0ZVN0b3JlKFxyXG5cdFx0XHQoe2NvbnRlbnQsc2VsZWN0aW9uLCBjdXJzb3IsIC4uLm90aGVyc30sYWN0aW9uKT0+T2JqZWN0LmFzc2lnbihvdGhlcnMsIGNvbWJpbmVSZWR1Y2Vycyh7XHJcblx0XHRcdFx0XHRjb250ZW50OnJlZHVjZXJcclxuXHRcdFx0XHRcdCxzZWxlY3Rpb246U2VsZWN0aW9uLnJlZHVjZXJcclxuXHRcdFx0XHRcdCxjdXJzb3I6IEN1cnNvci5yZWR1Y2VyXHJcblx0XHRcdH0pKHtjb250ZW50LHNlbGVjdGlvbixjdXJzb3J9LGFjdGlvbikpXHJcblx0XHRcdCx7XHJcblx0XHRcdFx0c3R5bGU6e31cclxuXHRcdFx0XHQsc2V0dGluZzp7fVxyXG5cdFx0XHR9XHJcblx0XHRcdCxjb21wb3NlRW5oYW5jZXJzKCkpXHJcblx0fVxyXG5cdFxyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiBbPEN1cnNvci5DdXJzb3Iga2V5PVwiY3Vyc29yXCIvPiwgPFNlbGVjdGlvbi5TZWxlY3Rpb24ga2V5PVwic2VsZWN0aW9uXCIvPl1cclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3RoaXMuc3RvcmV9PlxyXG5cdFx0XHR7c3VwZXIucmVuZGVyKCl9XHJcblx0XHRcdDwvUHJvdmlkZXI+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdFx0XHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuY3Vyc29yUmVhZHkoKVxyXG5cdH1cclxuXHRcclxuXHJcblx0aW5wdXRSZWFkeSgpe1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixlPT57XHJcblx0XHRcdHN3aXRjaChlLmtleUNvZGUpe1xyXG5cdFx0XHRjYXNlIDg6XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5yZWZzLmN1cnNvci5iYWNrc3BhY2UoKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDMyOlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuaW5zZXJ0KFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMucmVmcy5jdXJzb3IuaW5zZXJ0KFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjdXJzb3JSZWFkeSgpe1xyXG5cdFx0Y29uc3Qgcm9vdD10aGlzLnJlZnMuc3ZnXHJcblx0XHRyb290LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlPT57XHJcblx0XHRcdGNvbnN0IHRhcmdldD1lLnRhcmdldFxyXG5cdFx0XHRzd2l0Y2godGFyZ2V0Lm5vZGVOYW1lKXtcclxuXHRcdFx0Y2FzZSAndGV4dCc6XHJcblx0XHRcdFx0bGV0IHRleHQ9dGFyZ2V0LnRleHRDb250ZW50XHJcblx0XHRcdFx0bGV0IGNvbnRlbnRFbmRJbmRleD10YXJnZXQuZ2V0QXR0cmlidXRlKFwiZW5kXCIpXHJcblx0XHRcdFx0bGV0IGNvbnRlbnRJRD10YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb250ZW50XCIpXHJcblx0XHRcdFx0bGV0IFt4XT1vZmZzZXQoZSwgdGFyZ2V0KVxyXG5cdFx0XHRcdGxldCB7dG9wLCBsZWZ0fT1nZXRDbGllbnRCb3VuZEJveCh0YXJnZXQpXHJcblx0XHRcdFx0dGhpcy5zdG9yZS5kaXNwYXRjaChDdXJzb3IuQUNUSU9OLkFUKGNvbnRlbnRJRCxjb250ZW50RW5kSW5kZXgtdGV4dC5sZW5ndGgsIHgsIHRvcCxsZWZ0KSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xyXG5cdFx0aWYoIXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uaW5jbHVkZXMoY2hpbGQpKVxyXG5cdFx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKGNoaWxkKVxyXG5cdH1cclxufVxyXG4iXX0=