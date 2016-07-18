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
			p.style.vertialAlign = "baseline";
			p.innerHTML = "<span style=\"" + DEFAULT_STYLE + "\">Ä</span><div style=\"display: inline-block; width: 1px; height: 0px;\"></div>";

			var _p$getBoundingClientR = p.getBoundingClientRect();

			var height = _p$getBoundingClientR.height;
			var top = _p$getBoundingClientR.top;

			var _p$querySelector$getB = p.querySelector('div').getBoundingClientRect();

			var baseline = _p$querySelector$getB.top;

			document.body.removeChild(p);
			return { height: height, descent: height - (baseline - top) };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBTyxJQUFQO0FBQ0osSUFBSSxnQkFBYyw4RUFBZDs7SUFDaUI7Ozs7Ozs7Ozs7OytCQUNSO0FBQ1gsT0FBRyxDQUFDLE1BQUQsRUFBUTtBQUNWLGFBQU8sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVAsQ0FEVTtBQUVWLGFBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFGVTtJQUFYOztBQUtBLE9BQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQU5PO0FBT1gsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQVBXO0FBUVgsVUFBTyxLQUFQLEdBQWEsRUFBRSxLQUFGLEdBQVcsa0NBQTZCLEtBQUssVUFBTCxtQkFBNkIsS0FBSyxJQUFMLE9BQXJFLENBUkY7QUFTWCxLQUFFLEtBQUYsQ0FBUSxZQUFSLEdBQXFCLFVBQXJCLENBVFc7QUFVWCxLQUFFLFNBQUYsc0JBQTRCLGtHQUE1QixDQVZXOzsrQkFXTyxFQUFFLHFCQUFGLEdBWFA7O09BV04sc0NBWE07T0FXRSxnQ0FYRjs7K0JBWVEsRUFBRSxhQUFGLENBQWdCLEtBQWhCLEVBQXVCLHFCQUF2QixHQVpSOztPQVlGLGlDQUFKLElBWk07O0FBYVgsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQWJXO0FBY1gsVUFBTyxFQUFDLGNBQUQsRUFBUyxTQUFTLFVBQVEsV0FBUyxHQUFULENBQVIsRUFBekIsQ0FkVzs7Ozs4QkFpQkcsTUFBSztBQUNiLFVBQU8sU0FBUCxHQUFpQixJQUFqQixDQURhO0FBRWIsVUFBTyxPQUFPLHFCQUFQLEdBQStCLEtBQS9CLENBRk07Ozs7UUFsQkEiLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9cIlxuXG5sZXQgdGVzdGVyPW51bGxcbmxldCBERUZBVUxUX1NUWUxFPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweDt3aGl0ZS1zcGFjZTogcHJlO1wiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcblx0bGluZUhlaWdodCgpe1xuXHRcdGlmKCF0ZXN0ZXIpe1xuXHRcdFx0dGVzdGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXG5cdFx0fVxuXG5cdFx0dmFyIHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKVxuXHRcdHRlc3Rlci5zdHlsZT1wLnN0eWxlPWAke0RFRkFVTFRfU1RZTEV9O2ZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLnNpemV9cHhgXG5cdFx0cC5zdHlsZS52ZXJ0aWFsQWxpZ249XCJiYXNlbGluZVwiXG5cdFx0cC5pbm5lckhUTUw9YDxzcGFuIHN0eWxlPVwiJHtERUZBVUxUX1NUWUxFfVwiPsOEPC9zcGFuPjxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxcHg7IGhlaWdodDogMHB4O1wiPjwvZGl2PmBcblx0XHRsZXQge2hlaWdodCwgdG9wfT1wLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0bGV0IHt0b3A6YmFzZWxpbmV9PXAucXVlcnlTZWxlY3RvcignZGl2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHApXG5cdFx0cmV0dXJuIHtoZWlnaHQsIGRlc2NlbnQ6IGhlaWdodC0oYmFzZWxpbmUtdG9wKX1cblx0fVxuXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XG4gICAgICAgIHRlc3Rlci5pbm5lckhUTUw9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgfVxufVxuIl19