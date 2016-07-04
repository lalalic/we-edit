"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * why it's slower than html
 */
var tester = null;

var SVGWordWrapper = function (_WordWrapper) {
	_inherits(SVGWordWrapper, _WordWrapper);

	function SVGWordWrapper() {
		_classCallCheck(this, SVGWordWrapper);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SVGWordWrapper).apply(this, arguments));
	}

	_createClass(SVGWordWrapper, [{
		key: "lineHeight",
		value: function lineHeight() {
			if (!tester) {
				var container = document.createElement("div");
				container.style = "position:absolute;top:-1000";
				document.body.appendChild(container);
				var _window = window;
				var screenX = _window.screenX;
				var screenY = _window.screenY;

				container.innerHTML = "\n\t\t\t<svg width=\"" + screenX + "\" height=\"" + screenY + "\" viewBox=\"0 0 " + screenX + " " + screenY + "\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t<text>*</text>\n\t\t\t</svg>\n\t\t\t";
				tester = container.querySelector('text');
			}
			tester.style = "font-family:" + this.fontFamily + ";font-size:" + this.fontSize + "px";
			tester.firstChild.data = "A";
			return tester.getBBox().height;
		}
	}, {
		key: "stringWidth",
		value: function stringWidth(word) {
			tester.firstChild.data = word;
			return tester.getBBox().width;
		}
	}]);

	return SVGWordWrapper;
}(_2.default);

exports.default = SVGWordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9zdmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLElBQUksU0FBTyxJQUFQOztJQUNpQjs7Ozs7Ozs7Ozs7K0JBQ0w7QUFDZCxPQUFHLENBQUMsTUFBRCxFQUFRO0FBQ1YsUUFBSSxZQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWLENBRE07QUFFVixjQUFVLEtBQVYsR0FBZ0IsNkJBQWhCLENBRlU7QUFHVixhQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLFNBQTFCLEVBSFU7a0JBSWUsT0FKZjtRQUlILDBCQUpHO1FBSU0sMEJBSk47O0FBS1YsY0FBVSxTQUFWLDZCQUVjLDJCQUFvQixnQ0FBeUIsZ0JBQVcsa0dBRnRFLENBTFU7QUFXVixhQUFPLFVBQVUsYUFBVixDQUF3QixNQUF4QixDQUFQLENBWFU7SUFBWDtBQWFBLFVBQU8sS0FBUCxvQkFBNEIsS0FBSyxVQUFMLG1CQUE2QixLQUFLLFFBQUwsT0FBekQsQ0FkYztBQWVkLFVBQU8sVUFBUCxDQUFrQixJQUFsQixHQUF1QixHQUF2QixDQWZjO0FBZ0JSLFVBQU8sT0FBTyxPQUFQLEdBQWlCLE1BQWpCLENBaEJDOzs7OzhCQW1CQSxNQUFLO0FBQ2IsVUFBTyxVQUFQLENBQWtCLElBQWxCLEdBQXVCLElBQXZCLENBRGE7QUFFYixVQUFPLE9BQU8sT0FBUCxHQUFpQixLQUFqQixDQUZNOzs7O1FBcEJBIiwiZmlsZSI6InN2Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLlwiXG5cbi8qKlxuICpcbiAqIHdoeSBpdCdzIHNsb3dlciB0aGFuIGh0bWxcbiAqL1xubGV0IHRlc3Rlcj1udWxsXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVkdXb3JkV3JhcHBlciBleHRlbmRzIFdvcmRXcmFwcGVye1xuICAgIGxpbmVIZWlnaHQoKXtcblx0XHRpZighdGVzdGVyKXtcblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdFx0Y29udGFpbmVyLnN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMDAwXCJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXHRcdFx0Y29uc3Qge3NjcmVlblgsIHNjcmVlbll9PXdpbmRvd1xuXHRcdFx0Y29udGFpbmVyLmlubmVySFRNTD1cblx0XHRcdGBcblx0XHRcdDxzdmcgd2lkdGg9XCIke3NjcmVlblh9XCIgaGVpZ2h0PVwiJHtzY3JlZW5ZfVwiIHZpZXdCb3g9XCIwIDAgJHtzY3JlZW5YfSAke3NjcmVlbll9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuXHRcdFx0XHQ8dGV4dD4qPC90ZXh0PlxuXHRcdFx0PC9zdmc+XG5cdFx0XHRgXG5cdFx0XHR0ZXN0ZXI9Y29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3RleHQnKVxuXHRcdH1cblx0XHR0ZXN0ZXIuc3R5bGU9YGZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLmZvbnRTaXplfXB4YFxuXHRcdHRlc3Rlci5maXJzdENoaWxkLmRhdGE9XCJBXCJcbiAgICAgICAgcmV0dXJuIHRlc3Rlci5nZXRCQm94KCkuaGVpZ2h0XG4gICAgfVxuXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XG4gICAgICAgIHRlc3Rlci5maXJzdENoaWxkLmRhdGE9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJCb3goKS53aWR0aFxuICAgIH1cbn1cbiJdfQ==