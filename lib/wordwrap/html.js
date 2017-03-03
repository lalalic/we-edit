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

		return _possibleConstructorReturn(this, (HtmlWordWrapper.__proto__ || Object.getPrototypeOf(HtmlWordWrapper)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbInRlc3RlciIsIkRFRkFVTFRfU1RZTEUiLCJIdG1sV29yZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwIiwic3R5bGUiLCJmb250RmFtaWx5Iiwic2l6ZSIsInZlcnRpYWxBbGlnbiIsImlubmVySFRNTCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsInRvcCIsInF1ZXJ5U2VsZWN0b3IiLCJiYXNlbGluZSIsInJlbW92ZUNoaWxkIiwiZGVzY2VudCIsIndvcmQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBTyxJQUFYO0FBQ0EsSUFBSUMsZ0JBQWMsOEVBQWxCOztJQUNxQkMsZTs7Ozs7Ozs7Ozs7K0JBQ1I7QUFDWCxPQUFHLENBQUNGLE1BQUosRUFBVztBQUNWQSxhQUFPRyxTQUFTQyxhQUFULENBQXVCLE1BQXZCLENBQVA7QUFDQUQsYUFBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCTixNQUExQjtBQUNBOztBQUVELE9BQUlPLElBQUVKLFNBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRCxZQUFTRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJDLENBQTFCO0FBQ0FQLFVBQU9RLEtBQVAsR0FBYUQsRUFBRUMsS0FBRixHQUFXUCxhQUFYLHFCQUF3QyxLQUFLUSxVQUE3QyxtQkFBcUUsS0FBS0MsSUFBMUUsT0FBYjtBQUNBSCxLQUFFQyxLQUFGLENBQVFHLFlBQVIsR0FBcUIsVUFBckI7QUFDQUosS0FBRUssU0FBRixzQkFBNEJYLGFBQTVCOztBQVZXLCtCQVdPTSxFQUFFTSxxQkFBRixFQVhQO0FBQUEsT0FXTkMsTUFYTSx5QkFXTkEsTUFYTTtBQUFBLE9BV0VDLEdBWEYseUJBV0VBLEdBWEY7O0FBQUEsK0JBWVFSLEVBQUVTLGFBQUYsQ0FBZ0IsS0FBaEIsRUFBdUJILHFCQUF2QixFQVpSO0FBQUEsT0FZRkksUUFaRSx5QkFZTkYsR0FaTTs7QUFhWFosWUFBU0UsSUFBVCxDQUFjYSxXQUFkLENBQTBCWCxDQUExQjtBQUNBLE9BQUlZLFVBQVFMLFVBQVFHLFdBQVNGLEdBQWpCLENBQVo7QUFDQSxVQUFPLEVBQUNELGNBQUQsRUFBU0ssU0FBU0wsVUFBUUcsV0FBU0YsR0FBakIsQ0FBbEIsRUFBUDtBQUNBOzs7OEJBRWNLLEksRUFBSztBQUNicEIsVUFBT1ksU0FBUCxHQUFpQlEsSUFBakI7QUFDQSxVQUFPcEIsT0FBT2EscUJBQVAsR0FBK0JRLEtBQXRDO0FBQ0g7Ozs7OztrQkF0QmdCbkIsZSIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuL1wiXHJcblxyXG5sZXQgdGVzdGVyPW51bGxcclxubGV0IERFRkFVTFRfU1RZTEU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4O3doaXRlLXNwYWNlOiBwcmU7XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHRtbFdvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcblx0bGluZUhlaWdodCgpe1xyXG5cdFx0aWYoIXRlc3Rlcil7XHJcblx0XHRcdHRlc3Rlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApXHJcblx0XHR0ZXN0ZXIuc3R5bGU9cC5zdHlsZT1gJHtERUZBVUxUX1NUWUxFfTtmb250LWZhbWlseToke3RoaXMuZm9udEZhbWlseX07Zm9udC1zaXplOiR7dGhpcy5zaXplfXB0YFxyXG5cdFx0cC5zdHlsZS52ZXJ0aWFsQWxpZ249XCJiYXNlbGluZVwiXHJcblx0XHRwLmlubmVySFRNTD1gPHNwYW4gc3R5bGU9XCIke0RFRkFVTFRfU1RZTEV9XCI+w4Q8L3NwYW4+PGRpdiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDFweDsgaGVpZ2h0OiAwcHg7XCI+PC9kaXY+YFxyXG5cdFx0bGV0IHtoZWlnaHQsIHRvcH09cC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0bGV0IHt0b3A6YmFzZWxpbmV9PXAucXVlcnlTZWxlY3RvcignZGl2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocClcclxuXHRcdGxldCBkZXNjZW50PWhlaWdodC0oYmFzZWxpbmUtdG9wKVxyXG5cdFx0cmV0dXJuIHtoZWlnaHQsIGRlc2NlbnQ6IGhlaWdodC0oYmFzZWxpbmUtdG9wKX1cclxuXHR9XHJcblxyXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XHJcbiAgICAgICAgdGVzdGVyLmlubmVySFRNTD13b3JkXHJcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgfVxyXG59XHJcbiJdfQ==