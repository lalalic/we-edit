'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
	function Style(styles) {
		_classCallCheck(this, Style);

		this.styles = styles;
	}

	_createClass(Style, [{
		key: 'get',
		value: function get(path) {
			var value = path.split(".").reduce(function (p, key) {
				return p ? p[key] : p;
			}, this);
			if (value == undefined) value = this.getFromBasedOn.apply(this, arguments);
			return value;
		}
	}, {
		key: 'getBasedOn',
		value: function getBasedOn() {
			var _ref = this.metadata || {};

			var basedOn = _ref.basedOn;

			if (basedOn) {
				switch (typeof basedOn === 'undefined' ? 'undefined' : _typeof(basedOn)) {
					case 'string':
						return this.styles[basedOn];
					case 'object':
						return basedOn;
				}
			}
		}
	}, {
		key: 'getFromBasedOn',
		value: function getFromBasedOn(path) {
			var basedOn = this.getBasedOn();
			if (basedOn) return basedOn.get.apply(basedOn, arguments);
			return undefined;
		}
	}]);

	return Style;
}();

exports.default = Style;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFxQjtBQUNqQixVQURpQixLQUNqQixDQUFZLE1BQVosRUFBbUI7d0JBREYsT0FDRTs7QUFDZixPQUFLLE1BQUwsR0FBWSxNQUFaLENBRGU7RUFBbkI7O2NBRGlCOztzQkFLYixNQUFLO0FBQ1gsT0FBSSxRQUFNLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxDQUFELEVBQUcsR0FBSDtXQUFTLElBQUksRUFBRSxHQUFGLENBQUosR0FBYSxDQUFiO0lBQVQsRUFBd0IsSUFBL0MsQ0FBTixDQURPO0FBRVgsT0FBRyxTQUFPLFNBQVAsRUFDRixRQUFNLEtBQUssY0FBTCxhQUF1QixTQUF2QixDQUFOLENBREQ7QUFFQSxVQUFPLEtBQVAsQ0FKVzs7OzsrQkFPQTtjQUNLLEtBQUssUUFBTCxJQUFlLEVBQWYsQ0FETDs7T0FDSix1QkFESTs7QUFFWCxPQUFHLE9BQUgsRUFBVztBQUNWLG1CQUFjLHdEQUFkO0FBQ0EsVUFBSyxRQUFMO0FBQ0MsYUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQVAsQ0FERDtBQURBLFVBR0ssUUFBTDtBQUNDLGFBQU8sT0FBUCxDQUREO0FBSEEsS0FEVTtJQUFYOzs7O2lDQVVjLE1BQUs7QUFDbkIsT0FBSSxVQUFRLEtBQUssVUFBTCxFQUFSLENBRGU7QUFFbkIsT0FBRyxPQUFILEVBQ0MsT0FBTyxRQUFRLEdBQVIsZ0JBQWUsU0FBZixDQUFQLENBREQ7QUFFQSxVQUFPLFNBQVAsQ0FKbUI7Ozs7UUF4QkEiLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZSB7XG4gICAgY29uc3RydWN0b3Ioc3R5bGVzKXtcbiAgICAgICAgdGhpcy5zdHlsZXM9c3R5bGVzXG4gICAgfVxuXG4gICAgZ2V0KHBhdGgpe1xuXHRcdGxldCB2YWx1ZT1wYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+cCA/IHBba2V5XSA6IHAsdGhpcylcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxuXHRcdFx0dmFsdWU9dGhpcy5nZXRGcm9tQmFzZWRPbiguLi5hcmd1bWVudHMpXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblxuXHRnZXRCYXNlZE9uKCl7XG5cdFx0Y29uc3Qge2Jhc2VkT259PXRoaXMubWV0YWRhdGF8fHt9XG5cdFx0aWYoYmFzZWRPbil7XG5cdFx0XHRzd2l0Y2godHlwZW9mKGJhc2VkT24pKXtcblx0XHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc1tiYXNlZE9uXVxuXHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0cmV0dXJuIGJhc2VkT25cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRGcm9tQmFzZWRPbihwYXRoKXtcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxuXHRcdGlmKGJhc2VkT24pXG5cdFx0XHRyZXR1cm4gYmFzZWRPbi5nZXQoLi4uYXJndW1lbnRzKVxuXHRcdHJldHVybiB1bmRlZmluZWRcblx0fVxufVxuIl19