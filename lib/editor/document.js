"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _cursor2 = _interopRequireDefault(_cursor);

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
			    others = (0, _objectWithoutProperties3.default)(_ref2, ["content", "selection"]);
			return (0, _assign2.default)(others, (0, _redux.combineReducers)({
				content: reducer,
				selection: Selection.reducer
			})({ content: content, selection: selection }, action));
		}, {
			content: {},
			style: {},
			setting: {},
			selection: {
				start: {
					id: 0,
					at: 0
				},
				end: {
					id: 0,
					at: 0
				}
			}
		}, composeEnhancers());
		return _this;
	}

	(0, _createClass3.default)(EditableDocument, [{
		key: "more",
		value: function more() {
			return _react2.default.createElement(_cursor2.default, { ref: "cursor" });
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
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return (0, _assign2.default)((0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "getChildContext", this).call(this), {
				cursor: function cursor() {
					return self.refs.cursor;
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			(0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "componentDidMount", this).call(this);

			this.inputReady();

			this.focusCursor();
		}
	}, {
		key: "extractContent",
		value: function extractContent() {
			var extract = function extract(element) {
				var children = element.children,
				    others = (0, _objectWithoutProperties3.default)(element, ["children"]);

				others.type = "";
				others.content = _react2.default.Children.map(children, extract);
				return others;
			};

			var _props = this.props,
			    children = _props.children,
			    others = (0, _objectWithoutProperties3.default)(_props, ["children"]);


			others.content = _react2.default.Children.map(children, extract);
			return others;
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
		key: "focusCursor",
		value: function focusCursor() {
			var firstText = _reactDom2.default.findDOMNode(this).querySelector('svg .content text');
			if (firstText) {
				var event = document.createEvent("SVGEvents");
				event.initEvent("click", true, true);
				firstText.dispatchEvent(event);
			}
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed(child) {
			if (!this.computed.children.includes(child)) (0, _get3.default)(EditableDocument.prototype.__proto__ || (0, _getPrototypeOf2.default)(EditableDocument.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);
	return EditableDocument;
}(Super);

EditableDocument.childContextTypes = (0, _assign2.default)({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = EditableDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0aW9uIiwiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiQUNUSU9OIiwiU0VUIiwidHlwZSIsInBheWxvYWQiLCJjb250ZW50IiwicmVkdWNlciIsInN0YXRlIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwib3RoZXJzIiwic3R5bGUiLCJzZXR0aW5nIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwic2VsZiIsImN1cnNvciIsInJlZnMiLCJpbnB1dFJlYWR5IiwiZm9jdXNDdXJzb3IiLCJleHRyYWN0IiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiQ2hpbGRyZW4iLCJtYXAiLCJwcm9wcyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJiYWNrc3BhY2UiLCJpbnNlcnQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJmaXJzdFRleHQiLCJmaW5kRE9NTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImNoaWxkIiwiY29tcHV0ZWQiLCJpbmNsdWRlcyIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxTOzs7Ozs7QUFFWixJQUFNQyxRQUFNLDBDQUFaOztBQUVBLElBQU1DLG1CQUFpQkMsT0FBT0Msb0NBQVAsa0JBQXZCOztBQUVBLElBQU1DLFNBQU87QUFDWkMsTUFBSztBQUFBLFNBQVUsRUFBQ0MsTUFBSyxhQUFOLEVBQW9CQyxTQUFRQyxPQUE1QixFQUFWO0FBQUE7QUFETyxDQUFiOztBQUlBLElBQU1DLFVBQVEsU0FBUkEsT0FBUSxHQUE0QjtBQUFBLEtBQTNCQyxLQUEyQix1RUFBckIsRUFBcUI7QUFBQTtBQUFBLEtBQWhCSixJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ3pDLFNBQU9ELElBQVA7QUFDQSxPQUFLLGFBQUw7QUFDQyxVQUFPQyxPQUFQO0FBRkQ7QUFJQSxRQUFPRyxLQUFQO0FBQ0EsQ0FORDs7SUFRcUJDLGdCOzs7QUFDcEIsNkJBQWE7QUFBQTs7QUFBQSx5SkFDSEMsU0FERzs7QUFHWixRQUFLQyxLQUFMLEdBQVcsd0JBQ1YsaUJBQWdDQyxNQUFoQztBQUFBLE9BQUVOLE9BQUYsU0FBRUEsT0FBRjtBQUFBLE9BQVVPLFNBQVYsU0FBVUEsU0FBVjtBQUFBLE9BQXdCQyxNQUF4QjtBQUFBLFVBQXlDLHNCQUFjQSxNQUFkLEVBQXNCLDRCQUFnQjtBQUM3RVIsYUFBUUMsT0FEcUU7QUFFNUVNLGVBQVVoQixVQUFVVTtBQUZ3RCxJQUFoQixFQUc1RCxFQUFDRCxnQkFBRCxFQUFTTyxvQkFBVCxFQUg0RCxFQUd4Q0QsTUFId0MsQ0FBdEIsQ0FBekM7QUFBQSxHQURVLEVBS1Q7QUFDQU4sWUFBUSxFQURSO0FBRUNTLFVBQU0sRUFGUDtBQUdDQyxZQUFRLEVBSFQ7QUFJQ0gsY0FBVTtBQUNWSSxXQUFNO0FBQ0xDLFNBQUcsQ0FERTtBQUVKQyxTQUFHO0FBRkMsS0FESTtBQUtUQyxTQUFJO0FBQ0pGLFNBQUcsQ0FEQztBQUVIQyxTQUFHO0FBRkE7QUFMSztBQUpYLEdBTFMsRUFvQlRwQixrQkFwQlMsQ0FBWDtBQUhZO0FBd0JaOzs7O3lCQUVLO0FBQ0wsVUFBTyxrREFBUSxLQUFJLFFBQVosR0FBUDtBQUNBOzs7MkJBRU87QUFDUCxVQUNDO0FBQUE7QUFBQSxNQUFVLE9BQU8sS0FBS1ksS0FBdEI7QUFBQTtBQUFBLElBREQ7QUFLQTs7O29DQU9nQjtBQUNoQixPQUFJVSxPQUFLLElBQVQ7QUFDQSxVQUFPLGlMQUFzQztBQUM1Q0MsVUFENEMsb0JBQ3BDO0FBQ1AsWUFBT0QsS0FBS0UsSUFBTCxDQUFVRCxNQUFqQjtBQUNBO0FBSDJDLElBQXRDLENBQVA7QUFLQTs7O3NDQUVrQjtBQUNsQjs7QUFFQSxRQUFLRSxVQUFMOztBQUVBLFFBQUtDLFdBQUw7QUFDQTs7O21DQUVlO0FBQ2YsT0FBTUMsVUFBUSxTQUFSQSxPQUFRLFVBQVM7QUFBQSxRQUNmQyxRQURlLEdBQ01DLE9BRE4sQ0FDZkQsUUFEZTtBQUFBLFFBQ0ZiLE1BREUsMENBQ01jLE9BRE47O0FBRXRCZCxXQUFPVixJQUFQLEdBQVksRUFBWjtBQUNBVSxXQUFPUixPQUFQLEdBQWUsZ0JBQU11QixRQUFOLENBQWVDLEdBQWYsQ0FBbUJILFFBQW5CLEVBQTZCRCxPQUE3QixDQUFmO0FBQ0EsV0FBT1osTUFBUDtBQUNBLElBTEQ7O0FBRGUsZ0JBUWEsS0FBS2lCLEtBUmxCO0FBQUEsT0FRUkosUUFSUSxVQVFSQSxRQVJRO0FBQUEsT0FRS2IsTUFSTDs7O0FBVWZBLFVBQU9SLE9BQVAsR0FBZSxnQkFBTXVCLFFBQU4sQ0FBZUMsR0FBZixDQUFtQkgsUUFBbkIsRUFBNkJELE9BQTdCLENBQWY7QUFDQSxVQUFPWixNQUFQO0FBQ0E7OzsrQkFFVztBQUFBOztBQUNYa0IsWUFBU0MsZ0JBQVQsQ0FBMEIsU0FBMUIsRUFBb0MsYUFBRztBQUN0QyxZQUFPQyxFQUFFQyxPQUFUO0FBQ0EsVUFBSyxDQUFMO0FBQ0NELFFBQUVFLGNBQUY7QUFDQSxhQUFLYixJQUFMLENBQVVELE1BQVYsQ0FBaUJlLFNBQWpCO0FBQ0Q7QUFDQSxVQUFLLEVBQUw7QUFDQ0gsUUFBRUUsY0FBRjtBQUNBLGFBQUtiLElBQUwsQ0FBVUQsTUFBVixDQUFpQmdCLE1BQWpCLENBQXdCQyxPQUFPQyxZQUFQLENBQW9CTixFQUFFQyxPQUF0QixDQUF4QjtBQUNEO0FBUkE7QUFVQSxJQVhEOztBQWFBSCxZQUFTQyxnQkFBVCxDQUEwQixVQUExQixFQUFxQyxhQUFHO0FBQ3ZDLFdBQUtWLElBQUwsQ0FBVUQsTUFBVixDQUFpQmdCLE1BQWpCLENBQXdCQyxPQUFPQyxZQUFQLENBQW9CTixFQUFFQyxPQUF0QixDQUF4QjtBQUNBLElBRkQ7QUFHQTs7O2dDQUVZO0FBQ1osT0FBSU0sWUFBVSxtQkFBU0MsV0FBVCxDQUFxQixJQUFyQixFQUEyQkMsYUFBM0IsQ0FBeUMsbUJBQXpDLENBQWQ7QUFDQSxPQUFHRixTQUFILEVBQWE7QUFDWixRQUFJRyxRQUFRWixTQUFTYSxXQUFULENBQXFCLFdBQXJCLENBQVo7QUFDQUQsVUFBTUUsU0FBTixDQUFnQixPQUFoQixFQUF3QixJQUF4QixFQUE2QixJQUE3QjtBQUNBTCxjQUFVTSxhQUFWLENBQXdCSCxLQUF4QjtBQUNBO0FBQ0Q7OzttQ0FFZ0JJLEssRUFBTTtBQUN0QixPQUFHLENBQUMsS0FBS0MsUUFBTCxDQUFjdEIsUUFBZCxDQUF1QnVCLFFBQXZCLENBQWdDRixLQUFoQyxDQUFKLEVBQ0MsMkpBQXVCQSxLQUF2QjtBQUNEOzs7RUExRzRDbEQsSzs7QUFBekJXLGdCLENBd0NiMEMsaUIsR0FBa0Isc0JBQWM7QUFDdEM3QixTQUFRLGlCQUFVOEI7QUFEb0IsQ0FBZCxFQUV2QnRELE1BQU1xRCxpQkFGaUIsQztrQkF4Q0wxQyxnQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21wb3NlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9jdXJzb3JcIlxyXG5pbXBvcnQgKiBhcyBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5cclxuY29uc3QgY29tcG9zZUVuaGFuY2Vycz13aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2VcclxuXHJcbmNvbnN0IEFDVElPTj17XHJcblx0U0VUOiBjb250ZW50PT4oe3R5cGU6XCJjb250ZW50LnNldFwiLHBheWxvYWQ6Y29udGVudH0pXHJcbn1cclxuXHJcbmNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSBcImNvbnRlbnQuc2V0XCI6XHJcblx0XHRyZXR1cm4gcGF5bG9hZFx0XHJcblx0fVxyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0YWJsZURvY3VtZW50IGV4dGVuZHMgU3VwZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHR0aGlzLnN0b3JlPWNyZWF0ZVN0b3JlKFxyXG5cdFx0XHQoe2NvbnRlbnQsc2VsZWN0aW9uLCAuLi5vdGhlcnN9LGFjdGlvbik9Pk9iamVjdC5hc3NpZ24ob3RoZXJzLCBjb21iaW5lUmVkdWNlcnMoe1xyXG5cdFx0XHRcdFx0Y29udGVudDpyZWR1Y2VyXHJcblx0XHRcdFx0XHQsc2VsZWN0aW9uOlNlbGVjdGlvbi5yZWR1Y2VyXHJcblx0XHRcdH0pKHtjb250ZW50LHNlbGVjdGlvbn0sYWN0aW9uKSlcclxuXHRcdFx0LHtcclxuXHRcdFx0XHRjb250ZW50Ont9XHJcblx0XHRcdFx0LHN0eWxlOnt9XHJcblx0XHRcdFx0LHNldHRpbmc6e31cclxuXHRcdFx0XHQsc2VsZWN0aW9uOntcclxuXHRcdFx0XHRcdHN0YXJ0OntcclxuXHRcdFx0XHRcdFx0aWQ6MFxyXG5cdFx0XHRcdFx0XHQsYXQ6MFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0LGVuZDp7XHJcblx0XHRcdFx0XHRcdGlkOjBcclxuXHRcdFx0XHRcdFx0LGF0OjBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0LGNvbXBvc2VFbmhhbmNlcnMoKSlcclxuXHR9XHJcblx0XHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIDxDdXJzb3IgcmVmPVwiY3Vyc29yXCIvPlxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQcm92aWRlciBzdG9yZT17dGhpcy5zdG9yZX0+XHJcblx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXHJcblx0fSxTdXBlci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHR2YXIgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdGN1cnNvcigpe1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLnJlZnMuY3Vyc29yXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdFx0XHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuZm9jdXNDdXJzb3IoKVxyXG5cdH1cclxuXHRcclxuXHRleHRyYWN0Q29udGVudCgpe1xyXG5cdFx0Y29uc3QgZXh0cmFjdD1lbGVtZW50PT57XHJcblx0XHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT1lbGVtZW50XHJcblx0XHRcdG90aGVycy50eXBlPVwiXCJcclxuXHRcdFx0b3RoZXJzLmNvbnRlbnQ9UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBleHRyYWN0KVxyXG5cdFx0XHRyZXR1cm4gb3RoZXJzXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRcclxuXHRcdG90aGVycy5jb250ZW50PVJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZXh0cmFjdClcclxuXHRcdHJldHVybiBvdGhlcnNcclxuXHR9XHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuYmFja3NwYWNlKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAzMjpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsZT0+e1xyXG5cdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Zm9jdXNDdXJzb3IoKXtcclxuXHRcdGxldCBmaXJzdFRleHQ9UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3Rvcignc3ZnIC5jb250ZW50IHRleHQnKVxyXG5cdFx0aWYoZmlyc3RUZXh0KXtcclxuXHRcdFx0bGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJTVkdFdmVudHNcIilcclxuXHRcdFx0ZXZlbnQuaW5pdEV2ZW50KFwiY2xpY2tcIix0cnVlLHRydWUpXHJcblx0XHRcdGZpcnN0VGV4dC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==