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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiU3VwZXIiLCJzZWxmIiwiY3Vyc29yIiwicmVmcyIsImlucHV0UmVhZHkiLCJmb2N1c0N1cnNvciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJiYWNrc3BhY2UiLCJpbnNlcnQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJmaXJzdFRleHQiLCJmaW5kRE9NTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImNoaWxkIiwiY29tcHV0ZWQiLCJjaGlsZHJlbiIsImluY2x1ZGVzIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLFFBQU0sMENBQVY7Ozs7Ozs7Ozs7Ozt5QkFFTztBQUNMLFVBQU8sa0RBQVEsS0FBSSxRQUFaLEdBQVA7QUFDQTs7O29DQU9nQjtBQUNoQixPQUFJQyxPQUFLLElBQVQ7QUFDQSxVQUFPLDZKQUFzQztBQUM1Q0MsVUFENEMsb0JBQ3BDO0FBQ1AsWUFBT0QsS0FBS0UsSUFBTCxDQUFVRCxNQUFqQjtBQUNBO0FBSDJDLElBQXRDLENBQVA7QUFLQTs7O3NDQUVrQjtBQUNsQjs7QUFFQSxRQUFLRSxVQUFMOztBQUVBLFFBQUtDLFdBQUw7QUFDQTs7OytCQUVXO0FBQUE7O0FBQ1hDLFlBQVNDLGdCQUFULENBQTBCLFNBQTFCLEVBQW9DLGFBQUc7QUFDdEMsWUFBT0MsRUFBRUMsT0FBVDtBQUNBLFVBQUssQ0FBTDtBQUNDRCxRQUFFRSxjQUFGO0FBQ0EsYUFBS1AsSUFBTCxDQUFVRCxNQUFWLENBQWlCUyxTQUFqQjtBQUNEO0FBQ0EsVUFBSyxFQUFMO0FBQ0NILFFBQUVFLGNBQUY7QUFDQSxhQUFLUCxJQUFMLENBQVVELE1BQVYsQ0FBaUJVLE1BQWpCLENBQXdCQyxPQUFPQyxZQUFQLENBQW9CTixFQUFFQyxPQUF0QixDQUF4QjtBQUNEO0FBUkE7QUFVQSxJQVhEOztBQWFBSCxZQUFTQyxnQkFBVCxDQUEwQixVQUExQixFQUFxQyxhQUFHO0FBQ3ZDLFdBQUtKLElBQUwsQ0FBVUQsTUFBVixDQUFpQlUsTUFBakIsQ0FBd0JDLE9BQU9DLFlBQVAsQ0FBb0JOLEVBQUVDLE9BQXRCLENBQXhCO0FBQ0EsSUFGRDtBQUdBOzs7Z0NBRVk7QUFDWixPQUFJTSxZQUFVLG1CQUFTQyxXQUFULENBQXFCLElBQXJCLEVBQTJCQyxhQUEzQixDQUF5QyxtQkFBekMsQ0FBZDtBQUNBLE9BQUdGLFNBQUgsRUFBYTtBQUNaLFFBQUlHLFFBQVFaLFNBQVNhLFdBQVQsQ0FBcUIsV0FBckIsQ0FBWjtBQUNBRCxVQUFNRSxTQUFOLENBQWdCLE9BQWhCLEVBQXdCLElBQXhCLEVBQTZCLElBQTdCO0FBQ0FMLGNBQVVNLGFBQVYsQ0FBd0JILEtBQXhCO0FBQ0E7QUFDRDs7O21DQUVnQkksSyxFQUFNO0FBQ3RCLE9BQUcsQ0FBQyxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLFFBQXZCLENBQWdDSCxLQUFoQyxDQUFKLEVBQ0MsdUlBQXVCQSxLQUF2QjtBQUNEOzs7RUExRDJCdEIsSzs7T0FNckIwQixpQixHQUFrQixzQkFBYztBQUN0Q3hCLFNBQVEsaUJBQVV5QjtBQURvQixDQUFkLEVBRXZCM0IsTUFBTTBCLGlCQUZpQixDIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5pbXBvcnQge0RvY3VtZW50fSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4vY3Vyc29yXCJcclxuXHJcbmxldCBTdXBlcj1lZGl0YWJsZShEb2N1bWVudClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTdXBlcntcclxuXHRtb3JlKCl7XHJcblx0XHRyZXR1cm4gPEN1cnNvciByZWY9XCJjdXJzb3JcIi8+XHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Y3Vyc29yOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sU3VwZXIuY2hpbGRDb250ZXh0VHlwZXMpXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0dmFyIHNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHRjdXJzb3IoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5yZWZzLmN1cnNvclxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcclxuXHJcblx0XHR0aGlzLmlucHV0UmVhZHkoKVxyXG5cclxuXHRcdHRoaXMuZm9jdXNDdXJzb3IoKVxyXG5cdH1cclxuXHJcblx0aW5wdXRSZWFkeSgpe1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixlPT57XHJcblx0XHRcdHN3aXRjaChlLmtleUNvZGUpe1xyXG5cdFx0XHRjYXNlIDg6XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFx0dGhpcy5yZWZzLmN1cnNvci5iYWNrc3BhY2UoKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIDMyOlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuaW5zZXJ0KFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIixlPT57XHJcblx0XHRcdHRoaXMucmVmcy5jdXJzb3IuaW5zZXJ0KFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRmb2N1c0N1cnNvcigpe1xyXG5cdFx0bGV0IGZpcnN0VGV4dD1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yKCdzdmcgLmNvbnRlbnQgdGV4dCcpXHJcblx0XHRpZihmaXJzdFRleHQpe1xyXG5cdFx0XHRsZXQgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIlNWR0V2ZW50c1wiKVxyXG5cdFx0XHRldmVudC5pbml0RXZlbnQoXCJjbGlja1wiLHRydWUsdHJ1ZSlcclxuXHRcdFx0Zmlyc3RUZXh0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcclxuXHRcdGlmKCF0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmluY2x1ZGVzKGNoaWxkKSlcclxuXHRcdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZChjaGlsZClcclxuXHR9XHJcbn1cclxuIl19