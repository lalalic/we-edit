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
		    parentStyle = void 0;
		var type = wordModel.type;
		if (type.substr(0, 6) == 'style.') {
			type = type.split(".").pop();
			var id = wordModel.id;
			var basedOn = (wordModel.getParentStyle() || {}).id;
			var isDefault = wordModel.isDefault();
			parentStyle = id ? doc.cloneStyle(basedOn) : {};
			metadata = { type: type, id: id, basedOn: basedOn, isDefault: isDefault };
		} else if (wordModel.getStyleId) {
			var _basedOn = wordModel.getStyleId();
			parentStyle = doc.cloneStyle(_basedOn);
			metadata = { type: type, basedOn: _basedOn };
		} else {
			metadata = { type: type };
			parentStyle = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0MsaUJBQVksU0FBWixFQUF1QixHQUF2QixFQUEyQjs7O0FBQzFCLE1BQUksV0FBUyxJQUFUO01BQWUsb0JBQW5CLENBRDBCO0FBRTFCLE1BQUksT0FBSyxVQUFVLElBQVYsQ0FGaUI7QUFHMUIsTUFBRyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxLQUFrQixRQUFsQixFQUEyQjtBQUM3QixVQUFLLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBTCxDQUQ2QjtBQUU3QixPQUFJLEtBQUcsVUFBVSxFQUFWLENBRnNCO0FBRzdCLE9BQUksVUFBUSxDQUFDLFVBQVUsY0FBVixNQUE0QixFQUE1QixDQUFELENBQWlDLEVBQWpDLENBSGlCO0FBSTdCLE9BQUksWUFBVSxVQUFVLFNBQVYsRUFBVixDQUp5QjtBQUs3QixpQkFBWSxLQUFLLElBQUksVUFBSixDQUFlLE9BQWYsQ0FBTCxHQUErQixFQUEvQixDQUxpQjtBQU03QixjQUFTLEVBQUMsVUFBRCxFQUFNLE1BQU4sRUFBUyxnQkFBVCxFQUFrQixvQkFBbEIsRUFBVCxDQU42QjtHQUE5QixNQU9NLElBQUcsVUFBVSxVQUFWLEVBQXFCO0FBQzdCLE9BQUksV0FBUSxVQUFVLFVBQVYsRUFBUixDQUR5QjtBQUU3QixpQkFBWSxJQUFJLFVBQUosQ0FBZSxRQUFmLENBQVosQ0FGNkI7QUFHN0IsY0FBUyxFQUFDLFVBQUQsRUFBTSxpQkFBTixFQUFULENBSDZCO0dBQXhCLE1BSUQ7QUFDSixjQUFTLEVBQUMsVUFBRCxFQUFULENBREk7QUFFSixpQkFBWSxFQUFaLENBRkk7R0FKQzs7QUFTTixjQUFZLFFBQVosR0FBcUIsUUFBckIsQ0FuQjBCO0FBb0IxQixPQUFLLEtBQUwsR0FBVyxXQUFYLENBcEIwQjtFQUEzQjs7Ozt3QkF1Qk0sT0FBTSxNQUFLLFVBQVM7QUFDekIsT0FBRyxDQUFDLElBQUQsRUFDRixPQUREO0FBRUEsT0FBSSxjQUFZLEtBQUssS0FBTCxDQUhTO0FBSXpCLE9BQUcsUUFBSCxFQUFZO0FBQ1gsa0JBQVksS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFaLENBRFc7QUFFWCxRQUFHLENBQUMsV0FBRCxFQUFhO0FBQ2YsVUFBSyxLQUFMLENBQVcsUUFBWCxJQUFxQixjQUFZLEVBQVosQ0FETjtLQUFoQjtJQUZEO0FBTUEsZUFBWSxJQUFaLElBQWtCLEtBQWxCLENBVnlCIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0bGV0IG1ldGFkYXRhPW51bGwsIHBhcmVudFN0eWxlXHJcblx0XHRsZXQgdHlwZT13b3JkTW9kZWwudHlwZVxyXG5cdFx0aWYodHlwZS5zdWJzdHIoMCw2KT09J3N0eWxlLicpe1xyXG5cdFx0XHR0eXBlPXR5cGUuc3BsaXQoXCIuXCIpLnBvcCgpXHJcblx0XHRcdGxldCBpZD13b3JkTW9kZWwuaWRcclxuXHRcdFx0bGV0IGJhc2VkT249KHdvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpfHx7fSkuaWRcclxuXHRcdFx0bGV0IGlzRGVmYXVsdD13b3JkTW9kZWwuaXNEZWZhdWx0KClcclxuXHRcdFx0cGFyZW50U3R5bGU9aWQgPyBkb2MuY2xvbmVTdHlsZShiYXNlZE9uKSA6IHt9XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlLGlkLGJhc2VkT24sIGlzRGVmYXVsdH1cclxuXHRcdH1lbHNlIGlmKHdvcmRNb2RlbC5nZXRTdHlsZUlkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249d29yZE1vZGVsLmdldFN0eWxlSWQoKVxyXG5cdFx0XHRwYXJlbnRTdHlsZT1kb2MuY2xvbmVTdHlsZShiYXNlZE9uKVxyXG5cdFx0XHRtZXRhZGF0YT17dHlwZSxiYXNlZE9ufVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlfVxyXG5cdFx0XHRwYXJlbnRTdHlsZT17fVxyXG5cdFx0fVxyXG5cclxuXHRcdHBhcmVudFN0eWxlLm1ldGFkYXRhPW1ldGFkYXRhXHJcblx0XHR0aGlzLnN0eWxlPXBhcmVudFN0eWxlXHJcblx0fVxyXG5cclxuXHR2aXNpdCh2YWx1ZSxuYW1lLGNhdGVnb3J5KXtcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRcdGxldCBjYXRlZ29yaXplZD10aGlzLnN0eWxlXHJcblx0XHRpZihjYXRlZ29yeSl7XHJcblx0XHRcdGNhdGVnb3JpemVkPXRoaXMuc3R5bGVbY2F0ZWdvcnldXHJcblx0XHRcdGlmKCFjYXRlZ29yaXplZCl7XHJcblx0XHRcdFx0dGhpcy5zdHlsZVtjYXRlZ29yeV09Y2F0ZWdvcml6ZWQ9e31cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0ZWdvcml6ZWRbbmFtZV09dmFsdWVcclxuXHR9XHJcbn1cclxuIl19