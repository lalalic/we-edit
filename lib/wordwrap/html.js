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
			p.innerHTML = "A";
			var height = p.getBoundingClientRect().height;
			document.body.removeChild(p);
			return height;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBTyxJQUFQO0FBQ0osSUFBSSxnQkFBYyw4RUFBZDs7SUFDaUI7Ozs7Ozs7Ozs7OytCQUNSO0FBQ1gsT0FBRyxDQUFDLE1BQUQsRUFBUTtBQUNWLGFBQU8sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVAsQ0FEVTtBQUVWLGFBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFGVTtJQUFYOztBQUtBLE9BQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQU5PO0FBT1gsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQVBXO0FBUVgsVUFBTyxLQUFQLEdBQWEsRUFBRSxLQUFGLEdBQVcsa0NBQTZCLEtBQUssVUFBTCxtQkFBNkIsS0FBSyxJQUFMLE9BQXJFLENBUkY7QUFTWCxLQUFFLFNBQUYsR0FBWSxHQUFaLENBVFc7QUFVWCxPQUFJLFNBQU8sRUFBRSxxQkFBRixHQUEwQixNQUExQixDQVZBO0FBV1gsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQVhXO0FBWVgsVUFBTyxNQUFQLENBWlc7Ozs7OEJBZUcsTUFBSztBQUNiLFVBQU8sU0FBUCxHQUFpQixJQUFqQixDQURhO0FBRWIsVUFBTyxPQUFPLHFCQUFQLEdBQStCLEtBQS9CLENBRk07Ozs7UUFoQkEiLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9cIlxuXG5sZXQgdGVzdGVyPW51bGxcbmxldCBERUZBVUxUX1NUWUxFPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweDt3aGl0ZS1zcGFjZTogcHJlO1wiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcblx0bGluZUhlaWdodCgpe1xuXHRcdGlmKCF0ZXN0ZXIpe1xuXHRcdFx0dGVzdGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXG5cdFx0fVxuXHRcdFxuXHRcdHZhciBwPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocClcblx0XHR0ZXN0ZXIuc3R5bGU9cC5zdHlsZT1gJHtERUZBVUxUX1NUWUxFfTtmb250LWZhbWlseToke3RoaXMuZm9udEZhbWlseX07Zm9udC1zaXplOiR7dGhpcy5zaXplfXB4YFxuXHRcdHAuaW5uZXJIVE1MPVwiQVwiXG5cdFx0bGV0IGhlaWdodD1wLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocClcblx0XHRyZXR1cm4gaGVpZ2h0XG5cdH1cblxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xuICAgICAgICB0ZXN0ZXIuaW5uZXJIVE1MPXdvcmRcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgIH1cbn1cbiJdfQ==