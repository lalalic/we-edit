"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require("./");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tester = null;
var DEFAULT_STYLE = "margin:0;padding:0;border:0;position:absolute;left:-1000px;white-space: pre;";

var HtmlWordWrapper = function (_WordWrapper) {
	(0, _inherits3.default)(HtmlWordWrapper, _WordWrapper);

	function HtmlWordWrapper() {
		(0, _classCallCheck3.default)(this, HtmlWordWrapper);
		return (0, _possibleConstructorReturn3.default)(this, (HtmlWordWrapper.__proto__ || (0, _getPrototypeOf2.default)(HtmlWordWrapper)).apply(this, arguments));
	}

	(0, _createClass3.default)(HtmlWordWrapper, [{
		key: "lineHeight",
		value: function lineHeight() {
			if (!tester) {
				tester = document.createElement('span');
				document.body.appendChild(tester);
			}

			var p = document.createElement('p');
			document.body.appendChild(p);
			tester.style = p.style = DEFAULT_STYLE + ";font-family:" + this.fontFamily + ";font-size:" + this.size + "pt";
			p.style.vertialAlign = "baseline";
			p.innerHTML = "<span style=\"" + DEFAULT_STYLE + "\">\xC4</span><div style=\"display: inline-block; width: 1px; height: 0px;\"></div>";

			var _p$getBoundingClientR = p.getBoundingClientRect(),
			    height = _p$getBoundingClientR.height,
			    top = _p$getBoundingClientR.top;

			var _p$querySelector$getB = p.querySelector('div').getBoundingClientRect(),
			    baseline = _p$querySelector$getB.top;

			document.body.removeChild(p);
			var descent = height - (baseline - top);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbInRlc3RlciIsIkRFRkFVTFRfU1RZTEUiLCJIdG1sV29yZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwIiwic3R5bGUiLCJmb250RmFtaWx5Iiwic2l6ZSIsInZlcnRpYWxBbGlnbiIsImlubmVySFRNTCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsInRvcCIsInF1ZXJ5U2VsZWN0b3IiLCJiYXNlbGluZSIsInJlbW92ZUNoaWxkIiwiZGVzY2VudCIsIndvcmQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsU0FBTyxJQUFYO0FBQ0EsSUFBSUMsZ0JBQWMsOEVBQWxCOztJQUNxQkMsZTs7Ozs7Ozs7OzsrQkFDUjtBQUNYLE9BQUcsQ0FBQ0YsTUFBSixFQUFXO0FBQ1ZBLGFBQU9HLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUDtBQUNBRCxhQUFTRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJOLE1BQTFCO0FBQ0E7O0FBRUQsT0FBSU8sSUFBRUosU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFOO0FBQ0FELFlBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkMsQ0FBMUI7QUFDQVAsVUFBT1EsS0FBUCxHQUFhRCxFQUFFQyxLQUFGLEdBQVdQLGFBQVgscUJBQXdDLEtBQUtRLFVBQTdDLG1CQUFxRSxLQUFLQyxJQUExRSxPQUFiO0FBQ0FILEtBQUVDLEtBQUYsQ0FBUUcsWUFBUixHQUFxQixVQUFyQjtBQUNBSixLQUFFSyxTQUFGLHNCQUE0QlgsYUFBNUI7O0FBVlcsK0JBV09NLEVBQUVNLHFCQUFGLEVBWFA7QUFBQSxPQVdOQyxNQVhNLHlCQVdOQSxNQVhNO0FBQUEsT0FXRUMsR0FYRix5QkFXRUEsR0FYRjs7QUFBQSwrQkFZUVIsRUFBRVMsYUFBRixDQUFnQixLQUFoQixFQUF1QkgscUJBQXZCLEVBWlI7QUFBQSxPQVlGSSxRQVpFLHlCQVlORixHQVpNOztBQWFYWixZQUFTRSxJQUFULENBQWNhLFdBQWQsQ0FBMEJYLENBQTFCO0FBQ0EsT0FBSVksVUFBUUwsVUFBUUcsV0FBU0YsR0FBakIsQ0FBWjtBQUNBLFVBQU8sRUFBQ0QsY0FBRCxFQUFTSyxTQUFTTCxVQUFRRyxXQUFTRixHQUFqQixDQUFsQixFQUFQO0FBQ0E7Ozs4QkFFY0ssSSxFQUFLO0FBQ2JwQixVQUFPWSxTQUFQLEdBQWlCUSxJQUFqQjtBQUNBLFVBQU9wQixPQUFPYSxxQkFBUCxHQUErQlEsS0FBdEM7QUFDSDs7Ozs7a0JBdEJnQm5CLGUiLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9cIlxuXG5sZXQgdGVzdGVyPW51bGxcbmxldCBERUZBVUxUX1NUWUxFPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweDt3aGl0ZS1zcGFjZTogcHJlO1wiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdG1sV29yZFdyYXBwZXIgZXh0ZW5kcyBXb3JkV3JhcHBlcntcblx0bGluZUhlaWdodCgpe1xuXHRcdGlmKCF0ZXN0ZXIpe1xuXHRcdFx0dGVzdGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXG5cdFx0fVxuXG5cdFx0dmFyIHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKVxuXHRcdHRlc3Rlci5zdHlsZT1wLnN0eWxlPWAke0RFRkFVTFRfU1RZTEV9O2ZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLnNpemV9cHRgXG5cdFx0cC5zdHlsZS52ZXJ0aWFsQWxpZ249XCJiYXNlbGluZVwiXG5cdFx0cC5pbm5lckhUTUw9YDxzcGFuIHN0eWxlPVwiJHtERUZBVUxUX1NUWUxFfVwiPsOEPC9zcGFuPjxkaXYgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAxcHg7IGhlaWdodDogMHB4O1wiPjwvZGl2PmBcblx0XHRsZXQge2hlaWdodCwgdG9wfT1wLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0bGV0IHt0b3A6YmFzZWxpbmV9PXAucXVlcnlTZWxlY3RvcignZGl2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHApXG5cdFx0bGV0IGRlc2NlbnQ9aGVpZ2h0LShiYXNlbGluZS10b3ApXG5cdFx0cmV0dXJuIHtoZWlnaHQsIGRlc2NlbnQ6IGhlaWdodC0oYmFzZWxpbmUtdG9wKX1cblx0fVxuXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XG4gICAgICAgIHRlc3Rlci5pbm5lckhUTUw9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgfVxufVxuIl19