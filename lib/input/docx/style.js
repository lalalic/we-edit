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
		    parentStyle = void 0;
		var type = wordModel.type;
		if (type.substr(0, 6) == 'style.') {
			type = type.split(".").pop();
			var id = wordModel.id;
			var basedOn = (wordModel.getParentStyle() || {}).id;
			var isDefault = wordModel.isDefault();
			switch (type) {
				case 'document':
					parentStyle = {};
					break;
				case 'table':
					var target = wordModel.getTarget();
					if (target != 'table') {
						parentStyle = doc.contentProps.documentStyles[id];
						basedOn = parentStyle.metadata.basedOn;
						if (basedOn) {
							var basedOnTableStyle = doc.cloneStyle(basedOn);
							if (basedOnTableStyle[target]) parentStyle[target] = basedOnTableStyle[target];else parentStyle[target] = {};
						} else {
							parentStyle[target] = {};
						}
						this.target = target;
						this.style = parentStyle;
						return;
					} else {}
				default:
					parentStyle = basedOn ? doc.cloneStyle(basedOn) : doc.cloneDocumentDefaultStyle();
			}

			metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
		} else if (wordModel.getStyleId) {
			var _basedOn = wordModel.getStyleId();
			parentStyle = _basedOn ? doc.cloneStyle(_basedOn) : doc.cloneDefaultStyle(type);
			metadata = { type: type, basedOn: _basedOn };
		} else {
			metadata = { type: type };
			parentStyle = {};
		}

		parentStyle.metadata = metadata;
		this.style = parentStyle;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCOzs7QUFDMUIsTUFBSSxXQUFTLElBQVQ7TUFBZSxvQkFBbkIsQ0FEMEI7QUFFMUIsTUFBSSxPQUFLLFVBQVUsSUFBVixDQUZpQjtBQUcxQixNQUFHLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLFFBQWxCLEVBQTJCO0FBQzdCLFVBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFMLENBRDZCO0FBRTdCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FGc0I7QUFHN0IsT0FBSSxVQUFRLENBQUMsVUFBVSxjQUFWLE1BQTRCLEVBQTVCLENBQUQsQ0FBaUMsRUFBakMsQ0FIaUI7QUFJN0IsT0FBSSxZQUFVLFVBQVUsU0FBVixFQUFWLENBSnlCO0FBSzdCLFdBQU8sSUFBUDtBQUNBLFNBQUssVUFBTDtBQUNDLG1CQUFZLEVBQVosQ0FERDtBQUVBLFdBRkE7QUFEQSxTQUlLLE9BQUw7QUFDQyxTQUFJLFNBQU8sVUFBVSxTQUFWLEVBQVAsQ0FETDtBQUVDLFNBQUcsVUFBUSxPQUFSLEVBQWdCO0FBQ2xCLG9CQUFZLElBQUksWUFBSixDQUFpQixjQUFqQixDQUFnQyxFQUFoQyxDQUFaLENBRGtCO0FBRWxCLGdCQUFRLFlBQVksUUFBWixDQUFxQixPQUFyQixDQUZVO0FBR2xCLFVBQUcsT0FBSCxFQUFXO0FBQ1YsV0FBSSxvQkFBa0IsSUFBSSxVQUFKLENBQWUsT0FBZixDQUFsQixDQURNO0FBRVYsV0FBRyxrQkFBa0IsTUFBbEIsQ0FBSCxFQUNDLFlBQVksTUFBWixJQUFvQixrQkFBa0IsTUFBbEIsQ0FBcEIsQ0FERCxLQUdDLFlBQVksTUFBWixJQUFvQixFQUFwQixDQUhEO09BRkQsTUFNSztBQUNKLG1CQUFZLE1BQVosSUFBb0IsRUFBcEIsQ0FESTtPQU5MO0FBU0EsV0FBSyxNQUFMLEdBQVksTUFBWixDQVprQjtBQWFsQixXQUFLLEtBQUwsR0FBVyxXQUFYLENBYmtCO0FBY2xCLGFBZGtCO01BQW5CLE1BZUssRUFmTDtBQU5EO0FBeUJDLG1CQUFZLFVBQVUsSUFBSSxVQUFKLENBQWUsT0FBZixDQUFWLEdBQW9DLElBQUkseUJBQUosRUFBcEMsQ0FEYjtBQXhCQSxJQUw2Qjs7QUFpQzdCLGNBQVMsRUFBQyxVQUFELEVBQU0sTUFBTixFQUFTLGdCQUFULEVBQWtCLG9CQUFsQixFQUFULENBakM2QjtHQUE5QixNQWtDTSxJQUFHLFVBQVUsVUFBVixFQUFxQjtBQUM3QixPQUFJLFdBQVEsVUFBVSxVQUFWLEVBQVIsQ0FEeUI7QUFFN0IsaUJBQVksV0FBVSxJQUFJLFVBQUosQ0FBZSxRQUFmLENBQVYsR0FBb0MsSUFBSSxpQkFBSixDQUFzQixJQUF0QixDQUFwQyxDQUZpQjtBQUc3QixjQUFTLEVBQUMsVUFBRCxFQUFNLGlCQUFOLEVBQVQsQ0FINkI7R0FBeEIsTUFJRDtBQUNKLGNBQVMsRUFBQyxVQUFELEVBQVQsQ0FESTtBQUVKLGlCQUFZLEVBQVosQ0FGSTtHQUpDOztBQVNOLGNBQVksUUFBWixHQUFxQixRQUFyQixDQTlDMEI7QUErQzFCLE9BQUssS0FBTCxHQUFXLFdBQVgsQ0EvQzBCO0VBQTNCOzs7O3dCQWtETSxPQUFNLE1BQUssVUFBUztBQUN6QixPQUFHLENBQUMsSUFBRCxFQUNGLE9BREQ7QUFFQSxPQUFJLFFBQU0sS0FBSyxNQUFMLEdBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLENBQXpCLEdBQXVDLEtBQUssS0FBTCxDQUh4QjtBQUl6QixPQUFJLGNBQVksS0FBWixDQUpxQjtBQUt6QixPQUFHLFFBQUgsRUFBWTtBQUNYLGtCQUFZLE1BQU0sUUFBTixDQUFaLENBRFc7QUFFWCxRQUFHLENBQUMsV0FBRCxFQUFhO0FBQ2YsV0FBTSxRQUFOLElBQWdCLGNBQVksRUFBWixDQUREO0tBQWhCO0lBRkQ7QUFNQSxPQUFJLFdBQVMsWUFBWSxJQUFaLENBQVQsQ0FYcUI7O0FBYXpCLGtCQUFjLDBEQUFkO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsU0FBRyxRQUFPLHFEQUFQLElBQWUsUUFBZixFQUF3QjtBQUMxQixrQkFBWSxJQUFaLElBQWtCLE9BQU8sTUFBUCxDQUFjLEtBQWQsRUFBb0IsUUFBcEIsQ0FBbEIsQ0FEMEI7TUFBM0IsTUFFSztBQUNKLGNBQVEsSUFBUixDQUFhLHdCQUFiLEVBREk7TUFGTDtBQUtELFdBTkE7QUFEQTtBQVNDLGlCQUFZLElBQVosSUFBa0IsS0FBbEIsQ0FERDs7QUFSQSxJQWJ5QiIsImZpbGUiOiJzdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG5cdGNvbnN0cnVjdG9yKHdvcmRNb2RlbCwgZG9jKXtcclxuXHRcdGxldCBtZXRhZGF0YT1udWxsLCBwYXJlbnRTdHlsZVxyXG5cdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGVcclxuXHRcdGlmKHR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0dHlwZT10eXBlLnNwbGl0KFwiLlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgaWQ9d29yZE1vZGVsLmlkXHJcblx0XHRcdGxldCBiYXNlZE9uPSh3b3JkTW9kZWwuZ2V0UGFyZW50U3R5bGUoKXx8e30pLmlkXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9d29yZE1vZGVsLmlzRGVmYXVsdCgpXHJcblx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0Y2FzZSAnZG9jdW1lbnQnOlxyXG5cdFx0XHRcdHBhcmVudFN0eWxlPXt9XHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ3RhYmxlJzpcclxuXHRcdFx0XHRsZXQgdGFyZ2V0PXdvcmRNb2RlbC5nZXRUYXJnZXQoKVxyXG5cdFx0XHRcdGlmKHRhcmdldCE9J3RhYmxlJyl7XHJcblx0XHRcdFx0XHRwYXJlbnRTdHlsZT1kb2MuY29udGVudFByb3BzLmRvY3VtZW50U3R5bGVzW2lkXVxyXG5cdFx0XHRcdFx0YmFzZWRPbj1wYXJlbnRTdHlsZS5tZXRhZGF0YS5iYXNlZE9uXHJcblx0XHRcdFx0XHRpZihiYXNlZE9uKXtcclxuXHRcdFx0XHRcdFx0bGV0IGJhc2VkT25UYWJsZVN0eWxlPWRvYy5jbG9uZVN0eWxlKGJhc2VkT24pXHJcblx0XHRcdFx0XHRcdGlmKGJhc2VkT25UYWJsZVN0eWxlW3RhcmdldF0pXHJcblx0XHRcdFx0XHRcdFx0cGFyZW50U3R5bGVbdGFyZ2V0XT1iYXNlZE9uVGFibGVTdHlsZVt0YXJnZXRdXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRTdHlsZVt0YXJnZXRdPXt9XHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cGFyZW50U3R5bGVbdGFyZ2V0XT17fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy50YXJnZXQ9dGFyZ2V0XHJcblx0XHRcdFx0XHR0aGlzLnN0eWxlPXBhcmVudFN0eWxlXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHBhcmVudFN0eWxlPWJhc2VkT24gPyBkb2MuY2xvbmVTdHlsZShiYXNlZE9uKSA6IGRvYy5jbG9uZURvY3VtZW50RGVmYXVsdFN0eWxlKClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bWV0YWRhdGE9e3R5cGUsaWQsYmFzZWRPbiwgaXNEZWZhdWx0fVxyXG5cdFx0fWVsc2UgaWYod29yZE1vZGVsLmdldFN0eWxlSWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj13b3JkTW9kZWwuZ2V0U3R5bGVJZCgpXHJcblx0XHRcdHBhcmVudFN0eWxlPWJhc2VkT24gPyBkb2MuY2xvbmVTdHlsZShiYXNlZE9uKSA6IGRvYy5jbG9uZURlZmF1bHRTdHlsZSh0eXBlKVxyXG5cdFx0XHRtZXRhZGF0YT17dHlwZSxiYXNlZE9ufVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlfVxyXG5cdFx0XHRwYXJlbnRTdHlsZT17fVxyXG5cdFx0fVxyXG5cclxuXHRcdHBhcmVudFN0eWxlLm1ldGFkYXRhPW1ldGFkYXRhXHJcblx0XHR0aGlzLnN0eWxlPXBhcmVudFN0eWxlXHJcblx0fVxyXG5cclxuXHR2aXNpdCh2YWx1ZSxuYW1lLGNhdGVnb3J5KXtcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdGxldCBzdHlsZT10aGlzLnRhcmdldCA/IHRoaXMuc3R5bGVbdGhpcy50YXJnZXRdIDp0aGlzLnN0eWxlXHJcblx0XHRsZXQgY2F0ZWdvcml6ZWQ9c3R5bGVcclxuXHRcdGlmKGNhdGVnb3J5KXtcclxuXHRcdFx0Y2F0ZWdvcml6ZWQ9c3R5bGVbY2F0ZWdvcnldXHJcblx0XHRcdGlmKCFjYXRlZ29yaXplZCl7XHJcblx0XHRcdFx0c3R5bGVbY2F0ZWdvcnldPWNhdGVnb3JpemVkPXt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBvbGRWYWx1ZT1jYXRlZ29yaXplZFtuYW1lXVxyXG5cclxuXHRcdHN3aXRjaCh0eXBlb2Yob2xkVmFsdWUpKXtcclxuXHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdGlmKHR5cGVvZih2YWx1ZSk9PSdvYmplY3QnKXtcclxuXHRcdFx0XHRjYXRlZ29yaXplZFtuYW1lXT1PYmplY3QuYXNzaWduKHZhbHVlLG9sZFZhbHVlKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJ5b3UnZCBiZXR0ZXIgY2hlY2sgaXQuXCIpXHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRjYXRlZ29yaXplZFtuYW1lXT12YWx1ZVxyXG5cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19