"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _class = function (_Super) {
	(0, _inherits3.default)(_class, _Super);

	function _class() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, _class);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call.apply(_ref, [this].concat(args))), _this), _this.store = (0, _redux.createStore)((0, _redux.combineReducers)({ selection: Selection.reducer }), {}, composeEnhancers()), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(_class, [{
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
				(0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "render", this).call(this)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return (0, _assign2.default)((0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "getChildContext", this).call(this), {
				cursor: function cursor() {
					return self.refs.cursor;
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			(0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "componentDidMount", this).call(this);

			this.inputReady();

			this.focusCursor();
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
			if (!this.computed.children.includes(child)) (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);
	return _class;
}(Super);

_class.childContextTypes = (0, _assign2.default)({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU2VsZWN0aW9uIiwiU3VwZXIiLCJjb21wb3NlRW5oYW5jZXJzIiwid2luZG93IiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwic3RvcmUiLCJzZWxlY3Rpb24iLCJyZWR1Y2VyIiwic2VsZiIsImN1cnNvciIsInJlZnMiLCJpbnB1dFJlYWR5IiwiZm9jdXNDdXJzb3IiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwiYmFja3NwYWNlIiwiaW5zZXJ0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZmlyc3RUZXh0IiwiZmluZERPTU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiZXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJjaGlsZCIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJpbmNsdWRlcyIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLFM7Ozs7OztBQUVaLElBQU1DLFFBQU0sMENBQVo7O0FBRUEsSUFBTUMsbUJBQWlCQyxPQUFPQyxvQ0FBUCxrQkFBdkI7Ozs7Ozs7Ozs7Ozs7Ozs7ME1BR0NDLEssR0FBTSx3QkFBWSw0QkFBZ0IsRUFBQ0MsV0FBVU4sVUFBVU8sT0FBckIsRUFBaEIsQ0FBWixFQUE0RCxFQUE1RCxFQUFnRUwsa0JBQWhFLEM7Ozs7O3lCQUVBO0FBQ0wsVUFBTyxrREFBUSxLQUFJLFFBQVosR0FBUDtBQUNBOzs7MkJBRU87QUFDUCxVQUNDO0FBQUE7QUFBQSxNQUFVLE9BQU8sS0FBS0csS0FBdEI7QUFBQTtBQUFBLElBREQ7QUFLQTs7O29DQU9nQjtBQUNoQixPQUFJRyxPQUFLLElBQVQ7QUFDQSxVQUFPLDZKQUFzQztBQUM1Q0MsVUFENEMsb0JBQ3BDO0FBQ1AsWUFBT0QsS0FBS0UsSUFBTCxDQUFVRCxNQUFqQjtBQUNBO0FBSDJDLElBQXRDLENBQVA7QUFLQTs7O3NDQUVrQjtBQUNsQjs7QUFFQSxRQUFLRSxVQUFMOztBQUVBLFFBQUtDLFdBQUw7QUFDQTs7OytCQUVXO0FBQUE7O0FBQ1hDLFlBQVNDLGdCQUFULENBQTBCLFNBQTFCLEVBQW9DLGFBQUc7QUFDdEMsWUFBT0MsRUFBRUMsT0FBVDtBQUNBLFVBQUssQ0FBTDtBQUNDRCxRQUFFRSxjQUFGO0FBQ0EsYUFBS1AsSUFBTCxDQUFVRCxNQUFWLENBQWlCUyxTQUFqQjtBQUNEO0FBQ0EsVUFBSyxFQUFMO0FBQ0NILFFBQUVFLGNBQUY7QUFDQSxhQUFLUCxJQUFMLENBQVVELE1BQVYsQ0FBaUJVLE1BQWpCLENBQXdCQyxPQUFPQyxZQUFQLENBQW9CTixFQUFFQyxPQUF0QixDQUF4QjtBQUNEO0FBUkE7QUFVQSxJQVhEOztBQWFBSCxZQUFTQyxnQkFBVCxDQUEwQixVQUExQixFQUFxQyxhQUFHO0FBQ3ZDLFdBQUtKLElBQUwsQ0FBVUQsTUFBVixDQUFpQlUsTUFBakIsQ0FBd0JDLE9BQU9DLFlBQVAsQ0FBb0JOLEVBQUVDLE9BQXRCLENBQXhCO0FBQ0EsSUFGRDtBQUdBOzs7Z0NBRVk7QUFDWixPQUFJTSxZQUFVLG1CQUFTQyxXQUFULENBQXFCLElBQXJCLEVBQTJCQyxhQUEzQixDQUF5QyxtQkFBekMsQ0FBZDtBQUNBLE9BQUdGLFNBQUgsRUFBYTtBQUNaLFFBQUlHLFFBQVFaLFNBQVNhLFdBQVQsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBRCxVQUFNRSxTQUFOLENBQWdCLE9BQWhCLEVBQXdCLElBQXhCLEVBQTZCLElBQTdCO0FBQ0FMLGNBQVVNLGFBQVYsQ0FBd0JILEtBQXhCO0FBQ0E7QUFDRDs7O21DQUVnQkksSyxFQUFNO0FBQ3RCLE9BQUcsQ0FBQyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLFFBQXZCLENBQWdDSCxLQUFoQyxDQUFKLEVBQ0MsdUlBQXVCQSxLQUF2QjtBQUNEOzs7RUFwRTJCNUIsSzs7T0FnQnJCZ0MsaUIsR0FBa0Isc0JBQWM7QUFDdEN4QixTQUFRLGlCQUFVeUI7QUFEb0IsQ0FBZCxFQUV2QmpDLE1BQU1nQyxpQkFGaUIsQyIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBjb21wb3NlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcInJlZHV4XCJcclxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9jdXJzb3JcIlxyXG5pbXBvcnQgKiBhcyBTZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uXCJcclxuXHJcbmNvbnN0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5cclxuY29uc3QgY29tcG9zZUVuaGFuY2Vycz13aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2VcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RvcmU9Y3JlYXRlU3RvcmUoY29tYmluZVJlZHVjZXJzKHtzZWxlY3Rpb246U2VsZWN0aW9uLnJlZHVjZXJ9KSwge30sIGNvbXBvc2VFbmhhbmNlcnMoKSlcclxuXHRcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gPEN1cnNvciByZWY9XCJjdXJzb3JcIi8+XHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFByb3ZpZGVyIHN0b3JlPXt0aGlzLnN0b3JlfT5cclxuXHRcdFx0e3N1cGVyLnJlbmRlcigpfVxyXG5cdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHZhciBzZWxmPXRoaXNcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0Y3Vyc29yKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYucmVmcy5jdXJzb3JcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRzdXBlci5jb21wb25lbnREaWRNb3VudCgpXHJcblxyXG5cdFx0dGhpcy5pbnB1dFJlYWR5KClcclxuXHJcblx0XHR0aGlzLmZvY3VzQ3Vyc29yKClcclxuXHR9XHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuYmFja3NwYWNlKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAzMjpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsZT0+e1xyXG5cdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Zm9jdXNDdXJzb3IoKXtcclxuXHRcdGxldCBmaXJzdFRleHQ9UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3Rvcignc3ZnIC5jb250ZW50IHRleHQnKVxyXG5cdFx0aWYoZmlyc3RUZXh0KXtcclxuXHRcdFx0bGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJTVkdFdmVudHNcIilcclxuXHRcdFx0ZXZlbnQuaW5pdEV2ZW50KFwiY2xpY2tcIix0cnVlLHRydWUpXHJcblx0XHRcdGZpcnN0VGV4dC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==