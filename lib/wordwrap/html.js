"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tester = null;
var DEFAULT_STYLE = "margin:0;padding:0;border:0;position:absolute;left:-1000px;white-space: pre;";

var HtmlWordWrapper = function (_WordWrapper) {
	_inherits(HtmlWordWrapper, _WordWrapper);

	function HtmlWordWrapper() {
		_classCallCheck(this, HtmlWordWrapper);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(HtmlWordWrapper).apply(this, arguments));
	}

	_createClass(HtmlWordWrapper, [{
		key: "lineHeight",
		value: function lineHeight() {
			if (!tester) {
				tester = document.createElement('span');
				document.body.appendChild(tester);
			}

			var p = document.createElement('p');
			document.body.appendChild(p);
			tester.style = p.style = DEFAULT_STYLE + ";font-family:" + this.fontFamily + ";font-size:" + this.size + "px";
			p.innerHTML = "<span style=\"" + DEFAULT_STYLE + "\">Ä</span>g";
			var height = p.getBoundingClientRect().height;
			var descent = height - p.querySelector('span').getBoundingClientRect().height;
			document.body.removeChild(p);
			return { height: height, descent: descent };
		}
	}, {
		key: "stringWidth",
		value: function stringWidth(word) {
			tester.innerHTML = word;
			return tester.getBoundingClientRect().width;
		}
	}]);

	return HtmlWordWrapper;
}(_2.default);

exports.default = HtmlWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBTyxJQUFQO0FBQ0osSUFBSSxnQkFBYyw4RUFBZDs7SUFDaUI7Ozs7Ozs7Ozs7OytCQUNSO0FBQ1gsT0FBRyxDQUFDLE1BQUQsRUFBUTtBQUNWLGFBQU8sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVAsQ0FEVTtBQUVWLGFBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFGVTtJQUFYOztBQUtBLE9BQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQU5PO0FBT1gsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQVBXO0FBUVgsVUFBTyxLQUFQLEdBQWEsRUFBRSxLQUFGLEdBQVcsa0NBQTZCLEtBQUssVUFBTCxtQkFBNkIsS0FBSyxJQUFMLE9BQXJFLENBUkY7QUFTWCxLQUFFLFNBQUYsc0JBQTRCLDhCQUE1QixDQVRXO0FBVVgsT0FBSSxTQUFPLEVBQUUscUJBQUYsR0FBMEIsTUFBMUIsQ0FWQTtBQVdYLE9BQUksVUFBUSxTQUFPLEVBQUUsYUFBRixDQUFnQixNQUFoQixFQUF3QixxQkFBeEIsR0FBZ0QsTUFBaEQsQ0FYUjtBQVlYLFlBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFaVztBQWFYLFVBQU8sRUFBQyxjQUFELEVBQVMsZ0JBQVQsRUFBUCxDQWJXOzs7OzhCQWdCRyxNQUFLO0FBQ2IsVUFBTyxTQUFQLEdBQWlCLElBQWpCLENBRGE7QUFFYixVQUFPLE9BQU8scUJBQVAsR0FBK0IsS0FBL0IsQ0FGTTs7OztRQWpCQSIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuL1wiXG5cbmxldCB0ZXN0ZXI9bnVsbFxubGV0IERFRkFVTFRfU1RZTEU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4O3doaXRlLXNwYWNlOiBwcmU7XCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0bWxXb3JkV3JhcHBlciBleHRlbmRzIFdvcmRXcmFwcGVye1xuXHRsaW5lSGVpZ2h0KCl7XG5cdFx0aWYoIXRlc3Rlcil7XG5cdFx0XHR0ZXN0ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3Rlcilcblx0XHR9XG5cdFx0XG5cdFx0dmFyIHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKVxuXHRcdHRlc3Rlci5zdHlsZT1wLnN0eWxlPWAke0RFRkFVTFRfU1RZTEV9O2ZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLnNpemV9cHhgXG5cdFx0cC5pbm5lckhUTUw9YDxzcGFuIHN0eWxlPVwiJHtERUZBVUxUX1NUWUxFfVwiPsOEPC9zcGFuPmdgXG5cdFx0bGV0IGhlaWdodD1wLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuXHRcdGxldCBkZXNjZW50PWhlaWdodC1wLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHApXG5cdFx0cmV0dXJuIHtoZWlnaHQsIGRlc2NlbnR9XG5cdH1cblxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xuICAgICAgICB0ZXN0ZXIuaW5uZXJIVE1MPXdvcmRcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgIH1cbn1cbiJdfQ==