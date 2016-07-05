"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(wordModel, doc) {
		_classCallCheck(this, _class);

		var metadata = null,
		    basedOn = void 0,
		    parentStyle = void 0;
		if (typeof wordModel != 'string') {
			var type = wordModel.type.split(".").pop();
			var id = wordModel.id;
			basedOn = (wordModel.getParentStyle() || {}).id;
			var isDefault = wordModel.isDefault();
			parentStyle = id ? doc.cloneStyle(basedOn) : {};
			metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
		} else {
			basedOn = wordModel;
			parentStyle = doc.cloneStyle(basedOn);
			metadata = { basedOn: basedOn };
		}

		parentStyle.metadata = metadata;
		this.style = parentStyle;
	}

	_createClass(_class, [{
		key: "visit",
		value: function visit(value, name, category) {
			if (!name) return;
			var categorized = this.style;
			if (category) {
				categorized = this.style[category];
				if (!categorized) {
					this.style[category] = categorized = {};
				}
			}
			categorized[name] = value;
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0MsaUJBQVksU0FBWixFQUF1QixHQUF2QixFQUEyQjs7O0FBQzFCLE1BQUksV0FBUyxJQUFUO01BQWMsZ0JBQWxCO01BQTJCLG9CQUEzQixDQUQwQjtBQUUxQixNQUFHLE9BQU8sU0FBUCxJQUFtQixRQUFuQixFQUE0QjtBQUM5QixPQUFJLE9BQUssVUFBVSxJQUFWLENBQWUsS0FBZixDQUFxQixHQUFyQixFQUEwQixHQUExQixFQUFMLENBRDBCO0FBRTlCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FGdUI7QUFHOUIsYUFBUSxDQUFDLFVBQVUsY0FBVixNQUE0QixFQUE1QixDQUFELENBQWlDLEVBQWpDLENBSHNCO0FBSTlCLE9BQUksWUFBVSxVQUFVLFNBQVYsRUFBVixDQUowQjtBQUs5QixpQkFBWSxLQUFLLElBQUksVUFBSixDQUFlLE9BQWYsQ0FBTCxHQUErQixFQUEvQixDQUxrQjtBQU05QixjQUFTLEVBQUMsVUFBRCxFQUFNLE1BQU4sRUFBUyxnQkFBVCxFQUFrQixvQkFBbEIsRUFBVCxDQU44QjtHQUEvQixNQU9LO0FBQ0osYUFBUSxTQUFSLENBREk7QUFFSixpQkFBWSxJQUFJLFVBQUosQ0FBZSxPQUFmLENBQVosQ0FGSTtBQUdKLGNBQVMsRUFBQyxnQkFBRCxFQUFULENBSEk7R0FQTDs7QUFhQSxjQUFZLFFBQVosR0FBcUIsUUFBckIsQ0FmMEI7QUFnQjFCLE9BQUssS0FBTCxHQUFXLFdBQVgsQ0FoQjBCO0VBQTNCOzs7O3dCQW1CTSxPQUFNLE1BQUssVUFBUztBQUN6QixPQUFHLENBQUMsSUFBRCxFQUNGLE9BREQ7QUFFQSxPQUFJLGNBQVksS0FBSyxLQUFMLENBSFM7QUFJekIsT0FBRyxRQUFILEVBQVk7QUFDWCxrQkFBWSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVosQ0FEVztBQUVYLFFBQUcsQ0FBQyxXQUFELEVBQWE7QUFDZixVQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXFCLGNBQVksRUFBWixDQUROO0tBQWhCO0lBRkQ7QUFNQSxlQUFZLElBQVosSUFBa0IsS0FBbEIsQ0FWeUIiLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuXHRjb25zdHJ1Y3Rvcih3b3JkTW9kZWwsIGRvYyl7XHJcblx0XHRsZXQgbWV0YWRhdGE9bnVsbCxiYXNlZE9uLCBwYXJlbnRTdHlsZVxyXG5cdFx0aWYodHlwZW9mKHdvcmRNb2RlbCkhPSdzdHJpbmcnKXtcclxuXHRcdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGUuc3BsaXQoXCIuXCIpLnBvcCgpXHJcblx0XHRcdGxldCBpZD13b3JkTW9kZWwuaWRcclxuXHRcdFx0YmFzZWRPbj0od29yZE1vZGVsLmdldFBhcmVudFN0eWxlKCl8fHt9KS5pZFxyXG5cdFx0XHRsZXQgaXNEZWZhdWx0PXdvcmRNb2RlbC5pc0RlZmF1bHQoKVxyXG5cdFx0XHRwYXJlbnRTdHlsZT1pZCA/IGRvYy5jbG9uZVN0eWxlKGJhc2VkT24pIDoge31cclxuXHRcdFx0bWV0YWRhdGE9e3R5cGUsaWQsYmFzZWRPbiwgaXNEZWZhdWx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGJhc2VkT249d29yZE1vZGVsXHJcblx0XHRcdHBhcmVudFN0eWxlPWRvYy5jbG9uZVN0eWxlKGJhc2VkT24pXHJcblx0XHRcdG1ldGFkYXRhPXtiYXNlZE9ufVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwYXJlbnRTdHlsZS5tZXRhZGF0YT1tZXRhZGF0YVxyXG5cdFx0dGhpcy5zdHlsZT1wYXJlbnRTdHlsZVxyXG5cdH1cclxuXHRcclxuXHR2aXNpdCh2YWx1ZSxuYW1lLGNhdGVnb3J5KXtcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRyZXR1cm4gXHJcblx0XHRsZXQgY2F0ZWdvcml6ZWQ9dGhpcy5zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD10aGlzLnN0eWxlW2NhdGVnb3J5XVxyXG5cdFx0XHRpZighY2F0ZWdvcml6ZWQpe1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVbY2F0ZWdvcnldPWNhdGVnb3JpemVkPXt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGVnb3JpemVkW25hbWVdPXZhbHVlXHJcblx0fVxyXG59XHJcbiJdfQ==