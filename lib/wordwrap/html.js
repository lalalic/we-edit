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
			tester.style = p.style = DEFAULT_STYLE + ";font-family:" + this.fontFamily + ";font-size:" + this.size + "px";
			p.style.vertialAlign = "baseline";
			p.innerHTML = "<span style=\"" + DEFAULT_STYLE + "\">\xC4</span><div style=\"display: inline-block; width: 1px; height: 0px;\"></div>";

			var _p$getBoundingClientR = p.getBoundingClientRect(),
			    height = _p$getBoundingClientR.height,
			    top = _p$getBoundingClientR.top;

			var _p$querySelector$getB = p.querySelector('div').getBoundingClientRect(),
			    baseline = _p$querySelector$getB.top;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbInRlc3RlciIsIkRFRkFVTFRfU1RZTEUiLCJIdG1sV29yZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJwIiwic3R5bGUiLCJmb250RmFtaWx5Iiwic2l6ZSIsInZlcnRpYWxBbGlnbiIsImlubmVySFRNTCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsInRvcCIsInF1ZXJ5U2VsZWN0b3IiLCJiYXNlbGluZSIsInJlbW92ZUNoaWxkIiwiZGVzY2VudCIsIndvcmQiLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsU0FBTyxJQUFYO0FBQ0EsSUFBSUMsZ0JBQWMsOEVBQWxCOztJQUNxQkMsZTs7Ozs7Ozs7OzsrQkFDUjtBQUNYLE9BQUcsQ0FBQ0YsTUFBSixFQUFXO0FBQ1ZBLGFBQU9HLFNBQVNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUDtBQUNBRCxhQUFTRSxJQUFULENBQWNDLFdBQWQsQ0FBMEJOLE1BQTFCO0FBQ0E7O0FBRUQsT0FBSU8sSUFBRUosU0FBU0MsYUFBVCxDQUF1QixHQUF2QixDQUFOO0FBQ0FELFlBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkMsQ0FBMUI7QUFDQVAsVUFBT1EsS0FBUCxHQUFhRCxFQUFFQyxLQUFGLEdBQVdQLGFBQVgscUJBQXdDLEtBQUtRLFVBQTdDLG1CQUFxRSxLQUFLQyxJQUExRSxPQUFiO0FBQ0FILEtBQUVDLEtBQUYsQ0FBUUcsWUFBUixHQUFxQixVQUFyQjtBQUNBSixLQUFFSyxTQUFGLHNCQUE0QlgsYUFBNUI7O0FBVlcsK0JBV09NLEVBQUVNLHFCQUFGLEVBWFA7QUFBQSxPQVdOQyxNQVhNLHlCQVdOQSxNQVhNO0FBQUEsT0FXRUMsR0FYRix5QkFXRUEsR0FYRjs7QUFBQSwrQkFZUVIsRUFBRVMsYUFBRixDQUFnQixLQUFoQixFQUF1QkgscUJBQXZCLEVBWlI7QUFBQSxPQVlGSSxRQVpFLHlCQVlORixHQVpNOztBQWFYWixZQUFTRSxJQUFULENBQWNhLFdBQWQsQ0FBMEJYLENBQTFCO0FBQ0EsVUFBTyxFQUFDTyxjQUFELEVBQVNLLFNBQVNMLFVBQVFHLFdBQVNGLEdBQWpCLENBQWxCLEVBQVA7QUFDQTs7OzhCQUVjSyxJLEVBQUs7QUFDYnBCLFVBQU9ZLFNBQVAsR0FBaUJRLElBQWpCO0FBQ0EsVUFBT3BCLE9BQU9hLHFCQUFQLEdBQStCUSxLQUF0QztBQUNIOzs7OztrQkFyQmdCbkIsZSIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdvcmRXcmFwcGVyIGZyb20gXCIuL1wiXHJcblxyXG5sZXQgdGVzdGVyPW51bGxcclxubGV0IERFRkFVTFRfU1RZTEU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4O3doaXRlLXNwYWNlOiBwcmU7XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHRtbFdvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XHJcblx0bGluZUhlaWdodCgpe1xyXG5cdFx0aWYoIXRlc3Rlcil7XHJcblx0XHRcdHRlc3Rlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXN0ZXIpXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApXHJcblx0XHR0ZXN0ZXIuc3R5bGU9cC5zdHlsZT1gJHtERUZBVUxUX1NUWUxFfTtmb250LWZhbWlseToke3RoaXMuZm9udEZhbWlseX07Zm9udC1zaXplOiR7dGhpcy5zaXplfXB4YFxyXG5cdFx0cC5zdHlsZS52ZXJ0aWFsQWxpZ249XCJiYXNlbGluZVwiXHJcblx0XHRwLmlubmVySFRNTD1gPHNwYW4gc3R5bGU9XCIke0RFRkFVTFRfU1RZTEV9XCI+w4Q8L3NwYW4+PGRpdiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDFweDsgaGVpZ2h0OiAwcHg7XCI+PC9kaXY+YFxyXG5cdFx0bGV0IHtoZWlnaHQsIHRvcH09cC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cdFx0bGV0IHt0b3A6YmFzZWxpbmV9PXAucXVlcnlTZWxlY3RvcignZGl2JykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocClcclxuXHRcdHJldHVybiB7aGVpZ2h0LCBkZXNjZW50OiBoZWlnaHQtKGJhc2VsaW5lLXRvcCl9XHJcblx0fVxyXG5cclxuICAgIHN0cmluZ1dpZHRoKHdvcmQpe1xyXG4gICAgICAgIHRlc3Rlci5pbm5lckhUTUw9d29yZFxyXG4gICAgICAgIHJldHVybiB0ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgIH1cclxufVxyXG4iXX0=