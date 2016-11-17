"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

		_this.store = (0, _redux.createStore)((0, _redux.combineReducers)({
			content: reducer,
			selection: Selection.reducer
		}), {
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

		var content = _this.extractContent();

		_this.store.dispatch(ACTION.SET(content));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0aW9uIiwiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiQUNUSU9OIiwiU0VUIiwidHlwZSIsInBheWxvYWQiLCJjb250ZW50IiwicmVkdWNlciIsInN0YXRlIiwiRWRpdGFibGVEb2N1bWVudCIsImFyZ3VtZW50cyIsInN0b3JlIiwic2VsZWN0aW9uIiwic3R5bGUiLCJzZXR0aW5nIiwic3RhcnQiLCJpZCIsImF0IiwiZW5kIiwiZXh0cmFjdENvbnRlbnQiLCJkaXNwYXRjaCIsInNlbGYiLCJjdXJzb3IiLCJyZWZzIiwiaW5wdXRSZWFkeSIsImZvY3VzQ3Vyc29yIiwiZXh0cmFjdCIsImNoaWxkcmVuIiwiZWxlbWVudCIsIm90aGVycyIsIkNoaWxkcmVuIiwibWFwIiwicHJvcHMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiYmFja3NwYWNlIiwiaW5zZXJ0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZmlyc3RUZXh0IiwiZmluZERPTU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiZXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJjaGlsZCIsImNvbXB1dGVkIiwiaW5jbHVkZXMiLCJjaGlsZENvbnRleHRUeXBlcyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsUzs7Ozs7O0FBRVosSUFBTUMsUUFBTSwwQ0FBWjs7QUFFQSxJQUFNQyxtQkFBaUJDLE9BQU9DLG9DQUFQLGtCQUF2Qjs7QUFFQSxJQUFNQyxTQUFP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TUFBakIsQ0FBd0JDLE9BQU9DLFlBQVAsQ0FBb0JOLEVBQUVDLE9BQXRCLENBQXhCO0FBQ0EsSUFGRDtBQUdBOzs7Z0NBRVk7QUFDWixPQUFJTSxZQUFVLG1CQUFTQyxXQUFULENBQXFCLElBQXJCLEVBQTJCQyxhQUEzQixDQUF5QyxtQkFBekMsQ0FBZDtBQUNBLE9BQUdGLFNBQUgsRUFBYTtBQUNaLFFBQUlHLFFBQVFaLFNBQVNhLFdBQVQsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBRCxVQUFNRSxTQUFOLENBQWdCLE9BQWhCLEVBQXdCLElBQXhCLEVBQTZCLElBQTdCO0FBQ0FMLGNBQVVNLGFBQVYsQ0FBd0JILEtBQXhCO0FBQ0E7QUFDRDs7O21DQUVnQkksSyxFQUFNO0FBQ3RCLE9BQUcsQ0FBQyxLQUFLQyxRQUFMLENBQWN2QixRQUFkLENBQXVCd0IsUUFBdkIsQ0FBZ0NGLEtBQWhDLENBQUosRUFDQywySkFBdUJBLEtBQXZCO0FBQ0Q7OztFQTNHNENuRCxLOztBQUF6QlcsZ0IsQ0F5Q2IyQyxpQixHQUFrQixzQkFBYztBQUN0QzlCLFNBQVEsaUJBQVUrQjtBQURvQixDQUFkLEVBRXZCdkQsTUFBTXNELGlCQUZpQixDO2tCQXpDTDNDLGdCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGNvbXBvc2UsIGFwcGx5TWlkZGxld2FyZSwgY29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxyXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IHtEb2N1bWVudH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuL2N1cnNvclwiXHJcbmltcG9ydCAqIGFzIFNlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb25cIlxyXG5cclxuY29uc3QgU3VwZXI9ZWRpdGFibGUoRG9jdW1lbnQpXHJcblxyXG5jb25zdCBjb21wb3NlRW5oYW5jZXJzPXdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZVxyXG5cclxuY29uc3QgQUNUSU9OPXtcclxuXHRTRVQ6IGNvbnRlbnQ9Pih7dHlwZTpcImNvbnRlbnQuc2V0XCIscGF5bG9hZDpjb250ZW50fSlcclxufVxyXG5cclxuY29uc3QgcmVkdWNlcj0oc3RhdGU9e30sIHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIFwiY29udGVudC5zZXRcIjpcclxuXHRcdHJldHVybiBwYXlsb2FkXHRcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRhYmxlRG9jdW1lbnQgZXh0ZW5kcyBTdXBlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHRoaXMuc3RvcmU9Y3JlYXRlU3RvcmUoY29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0XHRjb250ZW50OnJlZHVjZXJcclxuXHRcdFx0XHQsc2VsZWN0aW9uOlNlbGVjdGlvbi5yZWR1Y2VyXHJcblx0XHRcdH0pLCB7XHJcblx0XHRcdFx0Y29udGVudDp7fVxyXG5cdFx0XHRcdCxzdHlsZTp7fVxyXG5cdFx0XHRcdCxzZXR0aW5nOnt9XHJcblx0XHRcdFx0LHNlbGVjdGlvbjp7XHJcblx0XHRcdFx0XHRzdGFydDp7XHJcblx0XHRcdFx0XHRcdGlkOjBcclxuXHRcdFx0XHRcdFx0LGF0OjBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCxlbmQ6e1xyXG5cdFx0XHRcdFx0XHRpZDowXHJcblx0XHRcdFx0XHRcdCxhdDowXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCBjb21wb3NlRW5oYW5jZXJzKCkpXHJcblx0XHRcclxuXHRcdGNvbnN0IGNvbnRlbnQ9dGhpcy5leHRyYWN0Q29udGVudCgpXHJcblx0XHRcclxuXHRcdHRoaXMuc3RvcmUuZGlzcGF0Y2goQUNUSU9OLlNFVChjb250ZW50KSlcclxuXHR9XHJcblx0XHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIDxDdXJzb3IgcmVmPVwiY3Vyc29yXCIvPlxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxQcm92aWRlciBzdG9yZT17dGhpcy5zdG9yZX0+XHJcblx0XHRcdHtzdXBlci5yZW5kZXIoKX1cclxuXHRcdFx0PC9Qcm92aWRlcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXHJcblx0fSxTdXBlci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHR2YXIgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdGN1cnNvcigpe1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLnJlZnMuY3Vyc29yXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdFx0XHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuZm9jdXNDdXJzb3IoKVxyXG5cdH1cclxuXHRcclxuXHRleHRyYWN0Q29udGVudCgpe1xyXG5cdFx0Y29uc3QgZXh0cmFjdD1lbGVtZW50PT57XHJcblx0XHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT1lbGVtZW50XHJcblx0XHRcdG90aGVycy50eXBlPVwiXCJcclxuXHRcdFx0b3RoZXJzLmNvbnRlbnQ9UmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBleHRyYWN0KVxyXG5cdFx0XHRyZXR1cm4gb3RoZXJzXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRcclxuXHRcdG90aGVycy5jb250ZW50PVJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZXh0cmFjdClcclxuXHRcdHJldHVybiBvdGhlcnNcclxuXHR9XHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuYmFja3NwYWNlKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAzMjpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsZT0+e1xyXG5cdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Zm9jdXNDdXJzb3IoKXtcclxuXHRcdGxldCBmaXJzdFRleHQ9UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3Rvcignc3ZnIC5jb250ZW50IHRleHQnKVxyXG5cdFx0aWYoZmlyc3RUZXh0KXtcclxuXHRcdFx0bGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJTVkdFdmVudHNcIilcclxuXHRcdFx0ZXZlbnQuaW5pdEV2ZW50KFwiY2xpY2tcIix0cnVlLHRydWUpXHJcblx0XHRcdGZpcnN0VGV4dC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==