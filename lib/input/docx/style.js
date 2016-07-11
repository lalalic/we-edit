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
		this.style = doc.createStyle(type);
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
						this.style.conditions[target] = doc.createStyle();
						this.target = target;
						break;
					} else {
						this.style.conditions = {};
					}
				default:
					this.style.metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
			}
		} else if (wordModel.getStyleId) {
			basedOn = wordModel.getStyleId();
			if (!basedOn) basedOn = doc.getTypeDefaultStyleId(type);

			this.style.metadata = { type: type, basedOn: basedOn };
		} else {
			this.style.metadata = {};
		}
	}

	_createClass(_class, [{
		key: 'visit',
		value: function visit(value, name, category) {
			if (!name) return;
			if (name == 'tblBorders' || name == 'tcBorders') {
				name = "border";
			}

			if (category == 'table') category = null;

			var style = this.target ? this.style.conditions[this.target] : this.style;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCOzs7QUFDMUIsTUFBSSxXQUFTLElBQVQ7TUFBZSxVQUFRLElBQVIsQ0FETztBQUUxQixNQUFJLE9BQUssVUFBVSxJQUFWLENBRmlCO0FBRzFCLE9BQUssS0FBTCxHQUFXLElBQUksV0FBSixDQUFnQixJQUFoQixDQUFYLENBSDBCO0FBSTFCLE1BQUcsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLENBQWQsS0FBa0IsUUFBbEIsRUFBMkI7QUFDN0IsVUFBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FENkI7QUFFN0IsYUFBUSxDQUFDLFVBQVUsY0FBVixNQUE0QixFQUE1QixDQUFELENBQWlDLEVBQWpDLENBRnFCO0FBRzdCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FIc0I7QUFJN0IsT0FBSSxZQUFVLFVBQVUsU0FBVixFQUFWLENBSnlCO0FBSzdCLFdBQU8sSUFBUDtBQUNBLFNBQUssT0FBTDtBQUNDLFNBQUksU0FBTyxVQUFVLFNBQVYsRUFBUCxDQURMO0FBRUMsU0FBRyxVQUFRLE9BQVIsRUFBZ0I7QUFDbEIsV0FBSyxLQUFMLEdBQVcsSUFBSSxZQUFKLENBQWlCLGNBQWpCLENBQWdDLEVBQWhDLENBQVgsQ0FEa0I7QUFFbEIsV0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixNQUF0QixJQUE4QixJQUFJLFdBQUosRUFBOUIsQ0FGa0I7QUFHbEIsV0FBSyxNQUFMLEdBQVksTUFBWixDQUhrQjtBQUlsQixZQUprQjtNQUFuQixNQUtLO0FBQ0osV0FBSyxLQUFMLENBQVcsVUFBWCxHQUFzQixFQUF0QixDQURJO01BTEw7QUFIRDtBQVlDLFVBQUssS0FBTCxDQUFXLFFBQVgsR0FBb0IsRUFBQyxVQUFELEVBQU0sTUFBTixFQUFTLGdCQUFULEVBQWtCLG9CQUFsQixFQUFwQixDQUREO0FBWEEsSUFMNkI7R0FBOUIsTUFtQk0sSUFBRyxVQUFVLFVBQVYsRUFBcUI7QUFDN0IsYUFBUSxVQUFVLFVBQVYsRUFBUixDQUQ2QjtBQUU3QixPQUFHLENBQUMsT0FBRCxFQUNGLFVBQVEsSUFBSSxxQkFBSixDQUEwQixJQUExQixDQUFSLENBREQ7O0FBR0EsUUFBSyxLQUFMLENBQVcsUUFBWCxHQUFvQixFQUFDLFVBQUQsRUFBTyxnQkFBUCxFQUFwQixDQUw2QjtHQUF4QixNQU1EO0FBQ0osUUFBSyxLQUFMLENBQVcsUUFBWCxHQUFvQixFQUFwQixDQURJO0dBTkM7RUF2QlA7Ozs7d0JBa0NNLE9BQU0sTUFBSyxVQUFTO0FBQ3pCLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FERDtBQUVBLE9BQUcsUUFBTSxZQUFOLElBQXNCLFFBQU0sV0FBTixFQUFrQjtBQUMxQyxXQUFLLFFBQUwsQ0FEMEM7SUFBM0M7O0FBSUEsT0FBRyxZQUFVLE9BQVYsRUFDRixXQUFTLElBQVQsQ0FERDs7QUFHQSxPQUFJLFFBQU0sS0FBSyxNQUFMLEdBQWMsS0FBSyxLQUFMLENBQVcsVUFBWCxDQUFzQixLQUFLLE1BQUwsQ0FBcEMsR0FBa0QsS0FBSyxLQUFMLENBVm5DOztBQVl6QixPQUFJLGNBQVksS0FBWixDQVpxQjtBQWF6QixPQUFHLFFBQUgsRUFBWTtBQUNYLGtCQUFZLE1BQU0sUUFBTixDQUFaLENBRFc7QUFFWCxRQUFHLENBQUMsV0FBRCxFQUFhO0FBQ2YsV0FBTSxRQUFOLElBQWdCLGNBQVksRUFBWixDQUREO0tBQWhCO0lBRkQ7QUFNQSxPQUFJLFdBQVMsWUFBWSxJQUFaLENBQVQsQ0FuQnFCOztBQXFCekIsa0JBQWMsMERBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFHLFFBQU8scURBQVAsSUFBZSxRQUFmLEVBQXdCO0FBQzFCLGtCQUFZLElBQVosSUFBa0IsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixDQUFsQixDQUQwQjtNQUEzQixNQUVLO0FBQ0osY0FBUSxJQUFSLENBQWEsd0JBQWIsRUFESTtNQUZMO0FBS0QsV0FOQTtBQURBO0FBU0MsaUJBQVksSUFBWixJQUFrQixLQUFsQixDQUREO0FBUkEsSUFyQnlCIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0bGV0IG1ldGFkYXRhPW51bGwsIGJhc2VkT249bnVsbFxyXG5cdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGVcclxuXHRcdHRoaXMuc3R5bGU9ZG9jLmNyZWF0ZVN0eWxlKHR5cGUpXHJcblx0XHRpZih0eXBlLnN1YnN0cigwLDYpPT0nc3R5bGUuJyl7XHJcblx0XHRcdHR5cGU9dHlwZS5zcGxpdChcIi5cIikucG9wKClcclxuXHRcdFx0YmFzZWRPbj0od29yZE1vZGVsLmdldFBhcmVudFN0eWxlKCl8fHt9KS5pZFxyXG5cdFx0XHRsZXQgaWQ9d29yZE1vZGVsLmlkXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9d29yZE1vZGVsLmlzRGVmYXVsdCgpXHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSAndGFibGUnOlxyXG5cdFx0XHRcdGxldCB0YXJnZXQ9d29yZE1vZGVsLmdldFRhcmdldCgpXHJcblx0XHRcdFx0aWYodGFyZ2V0IT0ndGFibGUnKXtcclxuXHRcdFx0XHRcdHRoaXMuc3R5bGU9ZG9jLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1tpZF1cclxuXHRcdFx0XHRcdHRoaXMuc3R5bGUuY29uZGl0aW9uc1t0YXJnZXRdPWRvYy5jcmVhdGVTdHlsZSgpXHJcblx0XHRcdFx0XHR0aGlzLnRhcmdldD10YXJnZXRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHR0aGlzLnN0eWxlLmNvbmRpdGlvbnM9e31cclxuXHRcdFx0XHR9XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5zdHlsZS5tZXRhZGF0YT17dHlwZSxpZCxiYXNlZE9uLCBpc0RlZmF1bHR9XHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKHdvcmRNb2RlbC5nZXRTdHlsZUlkKXtcclxuXHRcdFx0YmFzZWRPbj13b3JkTW9kZWwuZ2V0U3R5bGVJZCgpXHJcblx0XHRcdGlmKCFiYXNlZE9uKVxyXG5cdFx0XHRcdGJhc2VkT249ZG9jLmdldFR5cGVEZWZhdWx0U3R5bGVJZCh0eXBlKVxyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5zdHlsZS5tZXRhZGF0YT17dHlwZSwgYmFzZWRPbn1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnN0eWxlLm1ldGFkYXRhPXt9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2aXNpdCh2YWx1ZSxuYW1lLGNhdGVnb3J5KXtcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdGlmKG5hbWU9PSd0YmxCb3JkZXJzJyB8fCBuYW1lPT0ndGNCb3JkZXJzJyl7XHJcblx0XHRcdG5hbWU9XCJib3JkZXJcIlxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihjYXRlZ29yeT09J3RhYmxlJylcclxuXHRcdFx0Y2F0ZWdvcnk9bnVsbFxyXG5cdFx0XHJcblx0XHRsZXQgc3R5bGU9dGhpcy50YXJnZXQgPyB0aGlzLnN0eWxlLmNvbmRpdGlvbnNbdGhpcy50YXJnZXRdIDp0aGlzLnN0eWxlXHJcblx0XHRcclxuXHRcdGxldCBjYXRlZ29yaXplZD1zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD1zdHlsZVtjYXRlZ29yeV1cclxuXHRcdFx0aWYoIWNhdGVnb3JpemVkKXtcclxuXHRcdFx0XHRzdHlsZVtjYXRlZ29yeV09Y2F0ZWdvcml6ZWQ9e31cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IG9sZFZhbHVlPWNhdGVnb3JpemVkW25hbWVdXHJcblxyXG5cdFx0c3dpdGNoKHR5cGVvZihvbGRWYWx1ZSkpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0aWYodHlwZW9mKHZhbHVlKT09J29iamVjdCcpe1xyXG5cdFx0XHRcdGNhdGVnb3JpemVkW25hbWVdPU9iamVjdC5hc3NpZ24odmFsdWUsb2xkVmFsdWUpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybihcInlvdSdkIGJldHRlciBjaGVjayBpdC5cIilcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNhdGVnb3JpemVkW25hbWVdPXZhbHVlXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==