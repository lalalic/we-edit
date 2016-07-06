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
				tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";
			}

			var p = document.createElement('p');
			document.body.appendChild(p);
			p.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";
			tester.style = p.style = "font-family:" + this.fontFamily + ";font-size:" + this.size + "pt";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9odG1sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBTyxJQUFQOztJQUVpQjs7Ozs7Ozs7Ozs7K0JBQ1I7QUFDWCxPQUFHLENBQUMsTUFBRCxFQUFRO0FBQ1YsYUFBTyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUCxDQURVO0FBRVYsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQUZVO0FBR1YsV0FBTyxLQUFQLEdBQWEsNERBQWIsQ0FIVTtJQUFYOztBQU1BLE9BQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQVBPO0FBUVgsWUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQVJXO0FBU1gsS0FBRSxLQUFGLEdBQVEsNERBQVIsQ0FUVztBQVVYLFVBQU8sS0FBUCxHQUFhLEVBQUUsS0FBRixvQkFBdUIsS0FBSyxVQUFMLG1CQUE2QixLQUFLLElBQUwsT0FBcEQsQ0FWRjtBQVdYLEtBQUUsU0FBRixHQUFZLEdBQVosQ0FYVztBQVlYLE9BQUksU0FBTyxFQUFFLHFCQUFGLEdBQTBCLE1BQTFCLENBWkE7QUFhWCxZQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCLEVBYlc7QUFjWCxVQUFPLE1BQVAsQ0FkVzs7Ozs4QkFpQkcsTUFBSztBQUNiLFVBQU8sU0FBUCxHQUFpQixJQUFqQixDQURhO0FBRWIsVUFBTyxPQUFPLHFCQUFQLEdBQStCLEtBQS9CLENBRk07Ozs7UUFsQkEiLCJmaWxlIjoiaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXb3JkV3JhcHBlciBmcm9tIFwiLi9cIlxuXG5sZXQgdGVzdGVyPW51bGxcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHRtbFdvcmRXcmFwcGVyIGV4dGVuZHMgV29yZFdyYXBwZXJ7XG5cdGxpbmVIZWlnaHQoKXtcblx0XHRpZighdGVzdGVyKXtcblx0XHRcdHRlc3Rlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdGVyKVxuXHRcdFx0dGVzdGVyLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG5cdFx0fVxuXHRcdFxuXHRcdHZhciBwPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocClcblx0XHRwLnN0eWxlPVwibWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6LTEwMDBweFwiXG5cdFx0dGVzdGVyLnN0eWxlPXAuc3R5bGU9YGZvbnQtZmFtaWx5OiR7dGhpcy5mb250RmFtaWx5fTtmb250LXNpemU6JHt0aGlzLnNpemV9cHRgXG5cdFx0cC5pbm5lckhUTUw9XCJBXCJcblx0XHRsZXQgaGVpZ2h0PXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwKVxuXHRcdHJldHVybiBoZWlnaHRcblx0fVxuXG4gICAgc3RyaW5nV2lkdGgod29yZCl7XG4gICAgICAgIHRlc3Rlci5pbm5lckhUTUw9d29yZFxuICAgICAgICByZXR1cm4gdGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgfVxufVxuIl19