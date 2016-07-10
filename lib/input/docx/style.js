'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(wordModel, doc) {
		_classCallCheck(this, _class);

		var metadata = null,
		    basedOn = null;
		var type = wordModel.type;
		this.style = doc.createStyle();
		if (type.substr(0, 6) == 'style.') {
			type = type.split(".").pop();
			basedOn = (wordModel.getParentStyle() || {}).id;
			var id = wordModel.id;
			var isDefault = wordModel.isDefault();
			switch (type) {
				case 'table':
					var target = wordModel.getTarget();
					if (target != 'table') {
						this.style = doc.contentProps.documentStyles[id];
						this.style[target] = doc.createStyle();
						this.target = target;
						break;
					}
				default:
					this.style.metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
			}
		} else if (wordModel.getStyleId) {
			basedOn = wordModel.getStyleId();
			if (!basedOn) basedOn = doc.getTypeDefaultStyleId(type);
			this.style.metadata = { basedOn: basedOn };
		} else {
			this.style.metadata = {};
		}
	}

	_createClass(_class, [{
		key: 'visit',
		value: function visit(value, name, category) {
			if (!name) return;
			var style = this.target ? this.style[this.target] : this.style;
			var categorized = style;
			if (category) {
				categorized = style[category];
				if (!categorized) {
					style[category] = categorized = {};
				}
			}
			var oldValue = categorized[name];

			switch (typeof oldValue === 'undefined' ? 'undefined' : _typeof(oldValue)) {
				case 'object':
					if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
						categorized[name] = Object.assign(value, oldValue);
					} else {
						console.warn("you'd better check it.");
					}
					break;
				default:
					categorized[name] = value;
			}
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCOzs7QUFDMUIsTUFBSSxXQUFTLElBQVQ7TUFBZSxVQUFRLElBQVIsQ0FETztBQUUxQixNQUFJLE9BQUssVUFBVSxJQUFWLENBRmlCO0FBRzFCLE9BQUssS0FBTCxHQUFXLElBQUksV0FBSixFQUFYLENBSDBCO0FBSTFCLE1BQUcsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLENBQWQsS0FBa0IsUUFBbEIsRUFBMkI7QUFDN0IsVUFBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FENkI7QUFFN0IsYUFBUSxDQUFDLFVBQVUsY0FBVixNQUE0QixFQUE1QixDQUFELENBQWlDLEVBQWpDLENBRnFCO0FBRzdCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FIc0I7QUFJN0IsT0FBSSxZQUFVLFVBQVUsU0FBVixFQUFWLENBSnlCO0FBSzdCLFdBQU8sSUFBUDtBQUNBLFNBQUssT0FBTDtBQUNDLFNBQUksU0FBTyxVQUFVLFNBQVYsRUFBUCxDQURMO0FBRUMsU0FBRyxVQUFRLE9BQVIsRUFBZ0I7QUFDbEIsV0FBSyxLQUFMLEdBQVcsSUFBSSxZQUFKLENBQWlCLGNBQWpCLENBQWdDLEVBQWhDLENBQVgsQ0FEa0I7QUFFbEIsV0FBSyxLQUFMLENBQVcsTUFBWCxJQUFtQixJQUFJLFdBQUosRUFBbkIsQ0FGa0I7QUFHbEIsV0FBSyxNQUFMLEdBQVksTUFBWixDQUhrQjtBQUlsQixZQUprQjtNQUFuQjtBQUhEO0FBVUMsVUFBSyxLQUFMLENBQVcsUUFBWCxHQUFvQixFQUFDLFVBQUQsRUFBTSxNQUFOLEVBQVMsZ0JBQVQsRUFBa0Isb0JBQWxCLEVBQXBCLENBREQ7QUFUQSxJQUw2QjtHQUE5QixNQWlCTSxJQUFHLFVBQVUsVUFBVixFQUFxQjtBQUM3QixhQUFRLFVBQVUsVUFBVixFQUFSLENBRDZCO0FBRTdCLE9BQUcsQ0FBQyxPQUFELEVBQ0YsVUFBUSxJQUFJLHFCQUFKLENBQTBCLElBQTFCLENBQVIsQ0FERDtBQUVBLFFBQUssS0FBTCxDQUFXLFFBQVgsR0FBb0IsRUFBQyxnQkFBRCxFQUFwQixDQUo2QjtHQUF4QixNQUtEO0FBQ0osUUFBSyxLQUFMLENBQVcsUUFBWCxHQUFvQixFQUFwQixDQURJO0dBTEM7RUFyQlA7Ozs7d0JBK0JNLE9BQU0sTUFBSyxVQUFTO0FBQ3pCLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FERDtBQUVBLE9BQUksUUFBTSxLQUFLLE1BQUwsR0FBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsQ0FBekIsR0FBdUMsS0FBSyxLQUFMLENBSHhCO0FBSXpCLE9BQUksY0FBWSxLQUFaLENBSnFCO0FBS3pCLE9BQUcsUUFBSCxFQUFZO0FBQ1gsa0JBQVksTUFBTSxRQUFOLENBQVosQ0FEVztBQUVYLFFBQUcsQ0FBQyxXQUFELEVBQWE7QUFDZixXQUFNLFFBQU4sSUFBZ0IsY0FBWSxFQUFaLENBREQ7S0FBaEI7SUFGRDtBQU1BLE9BQUksV0FBUyxZQUFZLElBQVosQ0FBVCxDQVhxQjs7QUFhekIsa0JBQWMsMERBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFHLFFBQU8scURBQVAsSUFBZSxRQUFmLEVBQXdCO0FBQzFCLGtCQUFZLElBQVosSUFBa0IsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixDQUFsQixDQUQwQjtNQUEzQixNQUVLO0FBQ0osY0FBUSxJQUFSLENBQWEsd0JBQWIsRUFESTtNQUZMO0FBS0QsV0FOQTtBQURBO0FBU0MsaUJBQVksSUFBWixJQUFrQixLQUFsQixDQUREO0FBUkEsSUFieUIiLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuXHRjb25zdHJ1Y3Rvcih3b3JkTW9kZWwsIGRvYyl7XHJcblx0XHRsZXQgbWV0YWRhdGE9bnVsbCwgYmFzZWRPbj1udWxsXHJcblx0XHRsZXQgdHlwZT13b3JkTW9kZWwudHlwZVxyXG5cdFx0dGhpcy5zdHlsZT1kb2MuY3JlYXRlU3R5bGUoKVxyXG5cdFx0aWYodHlwZS5zdWJzdHIoMCw2KT09J3N0eWxlLicpe1xyXG5cdFx0XHR0eXBlPXR5cGUuc3BsaXQoXCIuXCIpLnBvcCgpXHJcblx0XHRcdGJhc2VkT249KHdvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpfHx7fSkuaWRcclxuXHRcdFx0bGV0IGlkPXdvcmRNb2RlbC5pZFxyXG5cdFx0XHRsZXQgaXNEZWZhdWx0PXdvcmRNb2RlbC5pc0RlZmF1bHQoKVxyXG5cdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdGNhc2UgJ3RhYmxlJzpcclxuXHRcdFx0XHRsZXQgdGFyZ2V0PXdvcmRNb2RlbC5nZXRUYXJnZXQoKVxyXG5cdFx0XHRcdGlmKHRhcmdldCE9J3RhYmxlJyl7XHJcblx0XHRcdFx0XHR0aGlzLnN0eWxlPWRvYy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXNbaWRdXHJcblx0XHRcdFx0XHR0aGlzLnN0eWxlW3RhcmdldF09ZG9jLmNyZWF0ZVN0eWxlKClcclxuXHRcdFx0XHRcdHRoaXMudGFyZ2V0PXRhcmdldFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5zdHlsZS5tZXRhZGF0YT17dHlwZSxpZCxiYXNlZE9uLCBpc0RlZmF1bHR9XHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKHdvcmRNb2RlbC5nZXRTdHlsZUlkKXtcclxuXHRcdFx0YmFzZWRPbj13b3JkTW9kZWwuZ2V0U3R5bGVJZCgpXHJcblx0XHRcdGlmKCFiYXNlZE9uKVxyXG5cdFx0XHRcdGJhc2VkT249ZG9jLmdldFR5cGVEZWZhdWx0U3R5bGVJZCh0eXBlKVxyXG5cdFx0XHR0aGlzLnN0eWxlLm1ldGFkYXRhPXtiYXNlZE9ufVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuc3R5bGUubWV0YWRhdGE9e31cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZpc2l0KHZhbHVlLG5hbWUsY2F0ZWdvcnkpe1xyXG5cdFx0aWYoIW5hbWUpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0bGV0IHN0eWxlPXRoaXMudGFyZ2V0ID8gdGhpcy5zdHlsZVt0aGlzLnRhcmdldF0gOnRoaXMuc3R5bGVcclxuXHRcdGxldCBjYXRlZ29yaXplZD1zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD1zdHlsZVtjYXRlZ29yeV1cclxuXHRcdFx0aWYoIWNhdGVnb3JpemVkKXtcclxuXHRcdFx0XHRzdHlsZVtjYXRlZ29yeV09Y2F0ZWdvcml6ZWQ9e31cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IG9sZFZhbHVlPWNhdGVnb3JpemVkW25hbWVdXHJcblxyXG5cdFx0c3dpdGNoKHR5cGVvZihvbGRWYWx1ZSkpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0aWYodHlwZW9mKHZhbHVlKT09J29iamVjdCcpe1xyXG5cdFx0XHRcdGNhdGVnb3JpemVkW25hbWVdPU9iamVjdC5hc3NpZ24odmFsdWUsb2xkVmFsdWUpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcInlvdSdkIGJldHRlciBjaGVjayBpdC5cIilcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNhdGVnb3JpemVkW25hbWVdPXZhbHVlXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==