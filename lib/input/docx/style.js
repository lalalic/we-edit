'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
			parentStyle = id ? doc.cloneStyle(basedOn) : {};
			metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
		} else if (type == 'section') {
			metadata = { type: type };
			parentStyle = {};
		} else if (type == 'image') {
			metadata = { type: type };
			parentStyle = {};
		} else {
			var _basedOn = wordModel.getStyleId();
			parentStyle = doc.cloneStyle(_basedOn);
			metadata = { type: type, basedOn: _basedOn };
		}

		parentStyle.metadata = metadata;
		this.style = parentStyle;
	}

	_createClass(_class, [{
		key: 'visit',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0MsaUJBQVksU0FBWixFQUF1QixHQUF2QixFQUEyQjs7O0FBQzFCLE1BQUksV0FBUyxJQUFUO01BQWUsb0JBQW5CLENBRDBCO0FBRTFCLE1BQUksT0FBSyxVQUFVLElBQVYsQ0FGaUI7QUFHMUIsTUFBRyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxLQUFrQixRQUFsQixFQUEyQjtBQUM3QixVQUFLLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBTCxDQUQ2QjtBQUU3QixPQUFJLEtBQUcsVUFBVSxFQUFWLENBRnNCO0FBRzdCLE9BQUksVUFBUSxDQUFDLFVBQVUsY0FBVixNQUE0QixFQUE1QixDQUFELENBQWlDLEVBQWpDLENBSGlCO0FBSTdCLE9BQUksWUFBVSxVQUFVLFNBQVYsRUFBVixDQUp5QjtBQUs3QixpQkFBWSxLQUFLLElBQUksVUFBSixDQUFlLE9BQWYsQ0FBTCxHQUErQixFQUEvQixDQUxpQjtBQU03QixjQUFTLEVBQUMsVUFBRCxFQUFNLE1BQU4sRUFBUyxnQkFBVCxFQUFrQixvQkFBbEIsRUFBVCxDQU42QjtHQUE5QixNQU9NLElBQUcsUUFBTSxTQUFOLEVBQWdCO0FBQ3hCLGNBQVMsRUFBQyxVQUFELEVBQVQsQ0FEd0I7QUFFeEIsaUJBQVksRUFBWixDQUZ3QjtHQUFuQixNQUdBLElBQUcsUUFBTSxPQUFOLEVBQWM7QUFDdEIsY0FBUyxFQUFDLFVBQUQsRUFBVCxDQURzQjtBQUV0QixpQkFBWSxFQUFaLENBRnNCO0dBQWpCLE1BR0Q7QUFDSixPQUFJLFdBQVEsVUFBVSxVQUFWLEVBQVIsQ0FEQTtBQUVKLGlCQUFZLElBQUksVUFBSixDQUFlLFFBQWYsQ0FBWixDQUZJO0FBR0osY0FBUyxFQUFDLFVBQUQsRUFBTSxpQkFBTixFQUFULENBSEk7R0FIQzs7QUFTTixjQUFZLFFBQVosR0FBcUIsUUFBckIsQ0F0QjBCO0FBdUIxQixPQUFLLEtBQUwsR0FBVyxXQUFYLENBdkIwQjtFQUEzQjs7Ozt3QkEwQk0sT0FBTSxNQUFLLFVBQVM7QUFDekIsT0FBRyxDQUFDLElBQUQsRUFDRixPQUREO0FBRUEsT0FBSSxjQUFZLEtBQUssS0FBTCxDQUhTO0FBSXpCLE9BQUcsUUFBSCxFQUFZO0FBQ1gsa0JBQVksS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFaLENBRFc7QUFFWCxRQUFHLENBQUMsV0FBRCxFQUFhO0FBQ2YsVUFBSyxLQUFMLENBQVcsUUFBWCxJQUFxQixjQUFZLEVBQVosQ0FETjtLQUFoQjtJQUZEO0FBTUEsZUFBWSxJQUFaLElBQWtCLEtBQWxCLENBVnlCIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0bGV0IG1ldGFkYXRhPW51bGwsIHBhcmVudFN0eWxlXHJcblx0XHRsZXQgdHlwZT13b3JkTW9kZWwudHlwZVxyXG5cdFx0aWYodHlwZS5zdWJzdHIoMCw2KT09J3N0eWxlLicpe1xyXG5cdFx0XHR0eXBlPXR5cGUuc3BsaXQoXCIuXCIpLnBvcCgpXHJcblx0XHRcdGxldCBpZD13b3JkTW9kZWwuaWRcclxuXHRcdFx0bGV0IGJhc2VkT249KHdvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpfHx7fSkuaWRcclxuXHRcdFx0bGV0IGlzRGVmYXVsdD13b3JkTW9kZWwuaXNEZWZhdWx0KClcclxuXHRcdFx0cGFyZW50U3R5bGU9aWQgPyBkb2MuY2xvbmVTdHlsZShiYXNlZE9uKSA6IHt9XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlLGlkLGJhc2VkT24sIGlzRGVmYXVsdH1cclxuXHRcdH1lbHNlIGlmKHR5cGU9PSdzZWN0aW9uJyl7XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlfVxyXG5cdFx0XHRwYXJlbnRTdHlsZT17fVxyXG5cdFx0fWVsc2UgaWYodHlwZT09J2ltYWdlJyl7XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlfVxyXG5cdFx0XHRwYXJlbnRTdHlsZT17fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCBiYXNlZE9uPXdvcmRNb2RlbC5nZXRTdHlsZUlkKClcclxuXHRcdFx0cGFyZW50U3R5bGU9ZG9jLmNsb25lU3R5bGUoYmFzZWRPbilcclxuXHRcdFx0bWV0YWRhdGE9e3R5cGUsYmFzZWRPbn1cclxuXHRcdH1cclxuXHJcblx0XHRwYXJlbnRTdHlsZS5tZXRhZGF0YT1tZXRhZGF0YVxyXG5cdFx0dGhpcy5zdHlsZT1wYXJlbnRTdHlsZVxyXG5cdH1cclxuXHJcblx0dmlzaXQodmFsdWUsbmFtZSxjYXRlZ29yeSl7XHJcblx0XHRpZighbmFtZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgY2F0ZWdvcml6ZWQ9dGhpcy5zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD10aGlzLnN0eWxlW2NhdGVnb3J5XVxyXG5cdFx0XHRpZighY2F0ZWdvcml6ZWQpe1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVbY2F0ZWdvcnldPWNhdGVnb3JpemVkPXt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGVnb3JpemVkW25hbWVdPXZhbHVlXHJcblx0fVxyXG59XHJcbiJdfQ==