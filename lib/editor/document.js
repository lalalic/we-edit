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

var _content = require("../content");

var _editable = require("./editable");

var _editable2 = _interopRequireDefault(_editable);

var _cursor = require("./cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = (0, _editable2.default)(_content.Document);

var _class = function (_Super) {
	(0, _inherits3.default)(_class, _Super);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "more",
		value: function more() {
			return _react2.default.createElement(_cursor2.default, { ref: "cursor" });
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
					default:
						_this2.refs.cursor.insert(String.fromCharCode(e.keyCode));
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJzZWxmIiwiY3Vyc29yIiwicmVmcyIsImlucHV0UmVhZHkiLCJmb2N1c0N1cnNvciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJiYWNrc3BhY2UiLCJpbnNlcnQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJmaXJzdFRleHQiLCJmaW5kRE9NTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImNoaWxkIiwiY29tcHV0ZWQiLCJjaGlsZHJlbiIsImluY2x1ZGVzIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLFFBQU0sMENBQVY7Ozs7Ozs7Ozs7Ozt5QkFFTztBQUNMLFVBQU8sa0RBQVEsS0FBSSxRQUFaLEdBQVA7QUFDQTs7O29DQU9nQjtBQUNoQixPQUFJQyxPQUFLLElBQVQ7QUFDQSxVQUFPLDZKQUFzQztBQUM1Q0MsVUFENEMsb0JBQ3BDO0FBQ1AsWUFBT0QsS0FBS0UsSUFBTCxDQUFVRCxNQUFqQjtBQUNBO0FBSDJDLElBQXRDLENBQVA7QUFLQTs7O3NDQUVrQjtBQUNsQjs7QUFFQSxRQUFLRSxVQUFMOztBQUVBLFFBQUtDLFdBQUw7QUFDQTs7OytCQUVXO0FBQUE7O0FBQ1hDLFlBQVNDLGdCQUFULENBQTBCLFNBQTFCLEVBQW9DLGFBQUc7QUFDdEMsWUFBT0MsRUFBRUMsT0FBVDtBQUNBLFVBQUssQ0FBTDtBQUNDRCxRQUFFRSxjQUFGO0FBQ0EsYUFBS1AsSUFBTCxDQUFVRCxNQUFWLENBQWlCUyxTQUFqQjtBQUNEO0FBQ0EsVUFBSyxFQUFMO0FBQ0NILFFBQUVFLGNBQUY7QUFDRDtBQUNDLGFBQUtQLElBQUwsQ0FBVUQsTUFBVixDQUFpQlUsTUFBakIsQ0FBd0JDLE9BQU9DLFlBQVAsQ0FBb0JOLEVBQUVDLE9BQXRCLENBQXhCO0FBUkQ7QUFVQSxJQVhEO0FBWUE7OztnQ0FFWTtBQUNaLE9BQUlNLFlBQVUsbUJBQVNDLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkJDLGFBQTNCLENBQXlDLG1CQUF6QyxDQUFkO0FBQ0EsT0FBR0YsU0FBSCxFQUFhO0FBQ1osUUFBSUcsUUFBUVosU0FBU2EsV0FBVCxDQUFxQixXQUFyQixDQUFaO0FBQ0FELFVBQU1FLFNBQU4sQ0FBZ0IsT0FBaEIsRUFBd0IsSUFBeEIsRUFBNkIsSUFBN0I7QUFDQUwsY0FBVU0sYUFBVixDQUF3QkgsS0FBeEI7QUFDQTtBQUNEOzs7bUNBRWdCSSxLLEVBQU07QUFDdEIsT0FBRyxDQUFDLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsUUFBdkIsQ0FBZ0NILEtBQWhDLENBQUosRUFDQyx1SUFBdUJBLEtBQXZCO0FBQ0Q7OztFQXREMkJ0QixLOztPQU1yQjBCLGlCLEdBQWtCLHNCQUFjO0FBQ3RDeEIsU0FBUSxpQkFBVXlCO0FBRG9CLENBQWQsRUFFdkIzQixNQUFNMEIsaUJBRmlCLEMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmltcG9ydCB7RG9jdW1lbnR9IGZyb20gXCIuLi9jb250ZW50XCJcclxuaW1wb3J0IGVkaXRhYmxlIGZyb20gXCIuL2VkaXRhYmxlXCJcclxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9jdXJzb3JcIlxyXG5cclxubGV0IFN1cGVyPWVkaXRhYmxlKERvY3VtZW50KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFN1cGVye1xyXG5cdG1vcmUoKXtcclxuXHRcdHJldHVybiA8Q3Vyc29yIHJlZj1cImN1cnNvclwiLz5cclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XHJcblx0XHRjdXJzb3I6IFByb3BUeXBlcy5mdW5jXHJcblx0fSxTdXBlci5jaGlsZENvbnRleHRUeXBlcylcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHR2YXIgc2VsZj10aGlzXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdGN1cnNvcigpe1xyXG5cdFx0XHRcdHJldHVybiBzZWxmLnJlZnMuY3Vyc29yXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cclxuXHRcdHRoaXMuaW5wdXRSZWFkeSgpXHJcblxyXG5cdFx0dGhpcy5mb2N1c0N1cnNvcigpXHJcblx0fVxyXG5cclxuXHRpbnB1dFJlYWR5KCl7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLGU9PntcclxuXHRcdFx0c3dpdGNoKGUua2V5Q29kZSl7XHJcblx0XHRcdGNhc2UgODpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmJhY2tzcGFjZSgpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMzI6XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5yZWZzLmN1cnNvci5pbnNlcnQoU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Zm9jdXNDdXJzb3IoKXtcclxuXHRcdGxldCBmaXJzdFRleHQ9UmVhY3RET00uZmluZERPTU5vZGUodGhpcykucXVlcnlTZWxlY3Rvcignc3ZnIC5jb250ZW50IHRleHQnKVxyXG5cdFx0aWYoZmlyc3RUZXh0KXtcclxuXHRcdFx0bGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJTVkdFdmVudHNcIilcclxuXHRcdFx0ZXZlbnQuaW5pdEV2ZW50KFwiY2xpY2tcIix0cnVlLHRydWUpXHJcblx0XHRcdGZpcnN0VGV4dC5kaXNwYXRjaEV2ZW50KGV2ZW50KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRpZighdGhpcy5jb21wdXRlZC5jaGlsZHJlbi5pbmNsdWRlcyhjaGlsZCkpXHJcblx0XHRcdHN1cGVyLm9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpXHJcblx0fVxyXG59XHJcbiJdfQ==