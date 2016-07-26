"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _editable2.default)(_content.Document);

var _class = function (_Super) {
	_inherits(_class, _Super);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "more",
		value: function more() {
			return _react2.default.createElement(_cursor2.default, { ref: "cursor" });
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return Object.assign(_get(Object.getPrototypeOf(_class.prototype), "getChildContext", this).call(this), {
				cursor: function cursor() {
					return self.refs.cursor;
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			_get(Object.getPrototypeOf(_class.prototype), "componentDidMount", this).call(this);

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
			if (!this.computed.children.includes(child)) _get(Object.getPrototypeOf(_class.prototype), "on1ChildComposed", this).call(this, child);
		}
	}]);

	return _class;
}(Super);

_class.childContextTypes = Object.assign({
	cursor: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sMENBQU47Ozs7Ozs7Ozs7Ozs7eUJBRUc7QUFDTCxVQUFPLGtEQUFRLEtBQUksUUFBSixFQUFSLENBQVAsQ0FESzs7OztvQ0FTVztBQUNoQixPQUFJLE9BQUssSUFBTCxDQURZO0FBRWhCLFVBQU8sT0FBTyxNQUFQLG9GQUFzQztBQUM1Qyw4QkFBUTtBQUNQLFlBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQURBO0tBRG9DO0lBQXRDLENBQVAsQ0FGZ0I7Ozs7c0NBU0U7QUFDbEIsdUZBRGtCOztBQUdsQixRQUFLLFVBQUwsR0FIa0I7O0FBS2xCLFFBQUssV0FBTCxHQUxrQjs7OzsrQkFRUDs7O0FBQ1gsWUFBUyxnQkFBVCxDQUEwQixTQUExQixFQUFvQyxhQUFHO0FBQ3RDLFlBQU8sRUFBRSxPQUFGO0FBQ1AsVUFBSyxDQUFMO0FBQ0MsUUFBRSxjQUFGLEdBREQ7QUFFQyxhQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLFNBQWpCLEdBRkQ7QUFHQSxZQUhBO0FBREEsVUFLSyxFQUFMO0FBQ0MsUUFBRSxjQUFGLEdBREQ7QUFMQTtBQVFDLGFBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsQ0FBd0IsT0FBTyxZQUFQLENBQW9CLEVBQUUsT0FBRixDQUE1QyxFQUREO0FBUEEsS0FEc0M7SUFBSCxDQUFwQyxDQURXOzs7O2dDQWVDO0FBQ1osT0FBSSxZQUFVLG1CQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkIsYUFBM0IsQ0FBeUMsbUJBQXpDLENBQVYsQ0FEUTtBQUVaLE9BQUcsU0FBSCxFQUFhO0FBQ1osUUFBSSxRQUFRLFNBQVMsV0FBVCxDQUFxQixXQUFyQixDQUFSLENBRFE7QUFFWixVQUFNLFNBQU4sQ0FBZ0IsT0FBaEIsRUFBd0IsSUFBeEIsRUFBNkIsSUFBN0IsRUFGWTtBQUdaLGNBQVUsYUFBVixDQUF3QixLQUF4QixFQUhZO0lBQWI7Ozs7bUNBT2dCLE9BQU07QUFDdEIsT0FBRyxDQUFDLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsUUFBdkIsQ0FBZ0MsS0FBaEMsQ0FBRCxFQUNGLG1GQUF1QixNQUF2QixDQUREOzs7OztFQXBEMkI7O09BTXJCLG9CQUFrQixPQUFPLE1BQVAsQ0FBYztBQUN0QyxTQUFRLGlCQUFVLElBQVY7Q0FEZ0IsRUFFdkIsTUFBTSxpQkFBTiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIlxyXG5cclxuaW1wb3J0IHtEb2N1bWVudH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuL2N1cnNvclwiXHJcblxyXG5sZXQgU3VwZXI9ZWRpdGFibGUoRG9jdW1lbnQpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3VwZXJ7XHJcblx0bW9yZSgpe1xyXG5cdFx0cmV0dXJuIDxDdXJzb3IgcmVmPVwiY3Vyc29yXCIvPlxyXG5cdH1cclxuXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdGN1cnNvcjogUHJvcFR5cGVzLmZ1bmNcclxuXHR9LFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHZhciBzZWxmPXRoaXNcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0Y3Vyc29yKCl7XHJcblx0XHRcdFx0cmV0dXJuIHNlbGYucmVmcy5jdXJzb3JcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRzdXBlci5jb21wb25lbnREaWRNb3VudCgpXHJcblxyXG5cdFx0dGhpcy5pbnB1dFJlYWR5KClcclxuXHJcblx0XHR0aGlzLmZvY3VzQ3Vyc29yKClcclxuXHR9XHJcblxyXG5cdGlucHV0UmVhZHkoKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZT0+e1xyXG5cdFx0XHRzd2l0Y2goZS5rZXlDb2RlKXtcclxuXHRcdFx0Y2FzZSA4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRcdHRoaXMucmVmcy5jdXJzb3IuYmFja3NwYWNlKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAzMjpcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0aGlzLnJlZnMuY3Vyc29yLmluc2VydChTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSkpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRmb2N1c0N1cnNvcigpe1xyXG5cdFx0bGV0IGZpcnN0VGV4dD1SZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5xdWVyeVNlbGVjdG9yKCdzdmcgLmNvbnRlbnQgdGV4dCcpXHJcblx0XHRpZihmaXJzdFRleHQpe1xyXG5cdFx0XHRsZXQgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIlNWR0V2ZW50c1wiKVxyXG5cdFx0XHRldmVudC5pbml0RXZlbnQoXCJjbGlja1wiLHRydWUsdHJ1ZSlcclxuXHRcdFx0Zmlyc3RUZXh0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcclxuXHRcdGlmKCF0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmluY2x1ZGVzKGNoaWxkKSlcclxuXHRcdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZChjaGlsZClcclxuXHR9XHJcbn1cclxuIl19