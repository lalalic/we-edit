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
			var categorized = this.style;
			if (category) {
				categorized = this.style[category];
				if (!categorized) {
					this.style[category] = categorized = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCOzs7QUFDMUIsTUFBSSxXQUFTLElBQVQ7TUFBZSxvQkFBbkIsQ0FEMEI7QUFFMUIsTUFBSSxPQUFLLFVBQVUsSUFBVixDQUZpQjtBQUcxQixNQUFHLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLFFBQWxCLEVBQTJCO0FBQzdCLFVBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFMLENBRDZCO0FBRTdCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FGc0I7QUFHN0IsT0FBSSxVQUFRLENBQUMsVUFBVSxjQUFWLE1BQTRCLEVBQTVCLENBQUQsQ0FBaUMsRUFBakMsQ0FIaUI7QUFJN0IsT0FBSSxZQUFVLFVBQVUsU0FBVixFQUFWLENBSnlCO0FBSzdCLFdBQU8sSUFBUDtBQUNBLFNBQUssVUFBTDtBQUNDLG1CQUFZLEVBQVosQ0FERDtBQUVBLFdBRkE7QUFEQTtBQUtDLG1CQUFZLFVBQVUsSUFBSSxVQUFKLENBQWUsT0FBZixDQUFWLEdBQW9DLElBQUkseUJBQUosRUFBcEMsQ0FEYjtBQUpBLElBTDZCOztBQWE3QixjQUFTLEVBQUMsVUFBRCxFQUFNLE1BQU4sRUFBUyxnQkFBVCxFQUFrQixvQkFBbEIsRUFBVCxDQWI2QjtHQUE5QixNQWNNLElBQUcsVUFBVSxVQUFWLEVBQXFCO0FBQzdCLE9BQUksV0FBUSxVQUFVLFVBQVYsRUFBUixDQUR5QjtBQUU3QixpQkFBWSxXQUFVLElBQUksVUFBSixDQUFlLFFBQWYsQ0FBVixHQUFvQyxJQUFJLGlCQUFKLENBQXNCLElBQXRCLENBQXBDLENBRmlCO0FBRzdCLGNBQVMsRUFBQyxVQUFELEVBQU0saUJBQU4sRUFBVCxDQUg2QjtHQUF4QixNQUlEO0FBQ0osY0FBUyxFQUFDLFVBQUQsRUFBVCxDQURJO0FBRUosaUJBQVksRUFBWixDQUZJO0dBSkM7O0FBU04sY0FBWSxRQUFaLEdBQXFCLFFBQXJCLENBMUIwQjtBQTJCMUIsT0FBSyxLQUFMLEdBQVcsV0FBWCxDQTNCMEI7RUFBM0I7Ozs7d0JBOEJNLE9BQU0sTUFBSyxVQUFTO0FBQ3pCLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FERDtBQUVBLE9BQUksY0FBWSxLQUFLLEtBQUwsQ0FIUztBQUl6QixPQUFHLFFBQUgsRUFBWTtBQUNYLGtCQUFZLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBWixDQURXO0FBRVgsUUFBRyxDQUFDLFdBQUQsRUFBYTtBQUNmLFVBQUssS0FBTCxDQUFXLFFBQVgsSUFBcUIsY0FBWSxFQUFaLENBRE47S0FBaEI7SUFGRDtBQU1BLE9BQUksV0FBUyxZQUFZLElBQVosQ0FBVCxDQVZxQjs7QUFZekIsa0JBQWMsMERBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFHLFFBQU8scURBQVAsSUFBZSxRQUFmLEVBQXdCO0FBQzFCLGtCQUFZLElBQVosSUFBa0IsT0FBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixDQUFsQixDQUQwQjtNQUEzQixNQUVLO0FBQ0osY0FBUSxJQUFSLENBQWEsd0JBQWIsRUFESTtNQUZMO0FBS0QsV0FOQTtBQURBO0FBU0MsaUJBQVksSUFBWixJQUFrQixLQUFsQixDQUREOztBQVJBLElBWnlCIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0bGV0IG1ldGFkYXRhPW51bGwsIHBhcmVudFN0eWxlXHJcblx0XHRsZXQgdHlwZT13b3JkTW9kZWwudHlwZVxyXG5cdFx0aWYodHlwZS5zdWJzdHIoMCw2KT09J3N0eWxlLicpe1xyXG5cdFx0XHR0eXBlPXR5cGUuc3BsaXQoXCIuXCIpLnBvcCgpXHJcblx0XHRcdGxldCBpZD13b3JkTW9kZWwuaWRcclxuXHRcdFx0bGV0IGJhc2VkT249KHdvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpfHx7fSkuaWRcclxuXHRcdFx0bGV0IGlzRGVmYXVsdD13b3JkTW9kZWwuaXNEZWZhdWx0KClcclxuXHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRjYXNlICdkb2N1bWVudCc6XHJcblx0XHRcdFx0cGFyZW50U3R5bGU9e31cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRwYXJlbnRTdHlsZT1iYXNlZE9uID8gZG9jLmNsb25lU3R5bGUoYmFzZWRPbikgOiBkb2MuY2xvbmVEb2N1bWVudERlZmF1bHRTdHlsZSgpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1ldGFkYXRhPXt0eXBlLGlkLGJhc2VkT24sIGlzRGVmYXVsdH1cclxuXHRcdH1lbHNlIGlmKHdvcmRNb2RlbC5nZXRTdHlsZUlkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249d29yZE1vZGVsLmdldFN0eWxlSWQoKVxyXG5cdFx0XHRwYXJlbnRTdHlsZT1iYXNlZE9uID8gZG9jLmNsb25lU3R5bGUoYmFzZWRPbikgOiBkb2MuY2xvbmVEZWZhdWx0U3R5bGUodHlwZSlcclxuXHRcdFx0bWV0YWRhdGE9e3R5cGUsYmFzZWRPbn1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRtZXRhZGF0YT17dHlwZX1cclxuXHRcdFx0cGFyZW50U3R5bGU9e31cclxuXHRcdH1cclxuXHJcblx0XHRwYXJlbnRTdHlsZS5tZXRhZGF0YT1tZXRhZGF0YVxyXG5cdFx0dGhpcy5zdHlsZT1wYXJlbnRTdHlsZVxyXG5cdH1cclxuXHJcblx0dmlzaXQodmFsdWUsbmFtZSxjYXRlZ29yeSl7XHJcblx0XHRpZighbmFtZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgY2F0ZWdvcml6ZWQ9dGhpcy5zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD10aGlzLnN0eWxlW2NhdGVnb3J5XVxyXG5cdFx0XHRpZighY2F0ZWdvcml6ZWQpe1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVbY2F0ZWdvcnldPWNhdGVnb3JpemVkPXt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBvbGRWYWx1ZT1jYXRlZ29yaXplZFtuYW1lXVxyXG5cclxuXHRcdHN3aXRjaCh0eXBlb2Yob2xkVmFsdWUpKXtcclxuXHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdGlmKHR5cGVvZih2YWx1ZSk9PSdvYmplY3QnKXtcclxuXHRcdFx0XHRjYXRlZ29yaXplZFtuYW1lXT1PYmplY3QuYXNzaWduKHZhbHVlLG9sZFZhbHVlKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oXCJ5b3UnZCBiZXR0ZXIgY2hlY2sgaXQuXCIpXHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRjYXRlZ29yaXplZFtuYW1lXT12YWx1ZVxyXG5cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19