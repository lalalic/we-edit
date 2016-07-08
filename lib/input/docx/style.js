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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCOzs7QUFDMUIsTUFBSSxXQUFTLElBQVQ7TUFBZSxvQkFBbkIsQ0FEMEI7QUFFMUIsTUFBSSxPQUFLLFVBQVUsSUFBVixDQUZpQjtBQUcxQixNQUFHLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLFFBQWxCLEVBQTJCO0FBQzdCLFVBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFMLENBRDZCO0FBRTdCLE9BQUksS0FBRyxVQUFVLEVBQVYsQ0FGc0I7QUFHN0IsT0FBSSxVQUFRLENBQUMsVUFBVSxjQUFWLE1BQTRCLEVBQTVCLENBQUQsQ0FBaUMsRUFBakMsQ0FIaUI7QUFJN0IsT0FBSSxZQUFVLFVBQVUsU0FBVixFQUFWLENBSnlCO0FBSzdCLGlCQUFZLEtBQUssSUFBSSxVQUFKLENBQWUsT0FBZixDQUFMLEdBQStCLEVBQS9CLENBTGlCO0FBTTdCLGNBQVMsRUFBQyxVQUFELEVBQU0sTUFBTixFQUFTLGdCQUFULEVBQWtCLG9CQUFsQixFQUFULENBTjZCO0dBQTlCLE1BT00sSUFBRyxVQUFVLFVBQVYsRUFBcUI7QUFDN0IsT0FBSSxXQUFRLFVBQVUsVUFBVixFQUFSLENBRHlCO0FBRTdCLGlCQUFZLElBQUksVUFBSixDQUFlLFFBQWYsQ0FBWixDQUY2QjtBQUc3QixjQUFTLEVBQUMsVUFBRCxFQUFNLGlCQUFOLEVBQVQsQ0FINkI7R0FBeEIsTUFJRDtBQUNKLGNBQVMsRUFBQyxVQUFELEVBQVQsQ0FESTtBQUVKLGlCQUFZLEVBQVosQ0FGSTtHQUpDOztBQVNOLGNBQVksUUFBWixHQUFxQixRQUFyQixDQW5CMEI7QUFvQjFCLE9BQUssS0FBTCxHQUFXLFdBQVgsQ0FwQjBCO0VBQTNCOzs7O3dCQXVCTSxPQUFNLE1BQUssVUFBUztBQUN6QixPQUFHLENBQUMsSUFBRCxFQUNGLE9BREQ7QUFFQSxPQUFJLGNBQVksS0FBSyxLQUFMLENBSFM7QUFJekIsT0FBRyxRQUFILEVBQVk7QUFDWCxrQkFBWSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVosQ0FEVztBQUVYLFFBQUcsQ0FBQyxXQUFELEVBQWE7QUFDZixVQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXFCLGNBQVksRUFBWixDQUROO0tBQWhCO0lBRkQ7QUFNQSxPQUFJLFdBQVMsWUFBWSxJQUFaLENBQVQsQ0FWcUI7O0FBWXpCLGtCQUFjLDBEQUFkO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsU0FBRyxRQUFPLHFEQUFQLElBQWUsUUFBZixFQUF3QjtBQUMxQixrQkFBWSxJQUFaLElBQWtCLE9BQU8sTUFBUCxDQUFjLEtBQWQsRUFBb0IsUUFBcEIsQ0FBbEIsQ0FEMEI7TUFBM0IsTUFFSztBQUNKLGNBQVEsSUFBUixDQUFhLHdCQUFiLEVBREk7TUFGTDtBQUtELFdBTkE7QUFEQTtBQVNDLGlCQUFZLElBQVosSUFBa0IsS0FBbEIsQ0FERDs7QUFSQSxJQVp5QiIsImZpbGUiOiJzdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG5cdGNvbnN0cnVjdG9yKHdvcmRNb2RlbCwgZG9jKXtcclxuXHRcdGxldCBtZXRhZGF0YT1udWxsLCBwYXJlbnRTdHlsZVxyXG5cdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGVcclxuXHRcdGlmKHR5cGUuc3Vic3RyKDAsNik9PSdzdHlsZS4nKXtcclxuXHRcdFx0dHlwZT10eXBlLnNwbGl0KFwiLlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgaWQ9d29yZE1vZGVsLmlkXHJcblx0XHRcdGxldCBiYXNlZE9uPSh3b3JkTW9kZWwuZ2V0UGFyZW50U3R5bGUoKXx8e30pLmlkXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9d29yZE1vZGVsLmlzRGVmYXVsdCgpXHJcblx0XHRcdHBhcmVudFN0eWxlPWlkID8gZG9jLmNsb25lU3R5bGUoYmFzZWRPbikgOiB7fVxyXG5cdFx0XHRtZXRhZGF0YT17dHlwZSxpZCxiYXNlZE9uLCBpc0RlZmF1bHR9XHJcblx0XHR9ZWxzZSBpZih3b3JkTW9kZWwuZ2V0U3R5bGVJZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXdvcmRNb2RlbC5nZXRTdHlsZUlkKClcclxuXHRcdFx0cGFyZW50U3R5bGU9ZG9jLmNsb25lU3R5bGUoYmFzZWRPbilcclxuXHRcdFx0bWV0YWRhdGE9e3R5cGUsYmFzZWRPbn1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRtZXRhZGF0YT17dHlwZX1cclxuXHRcdFx0cGFyZW50U3R5bGU9e31cclxuXHRcdH1cclxuXHJcblx0XHRwYXJlbnRTdHlsZS5tZXRhZGF0YT1tZXRhZGF0YVxyXG5cdFx0dGhpcy5zdHlsZT1wYXJlbnRTdHlsZVxyXG5cdH1cclxuXHJcblx0dmlzaXQodmFsdWUsbmFtZSxjYXRlZ29yeSl7XHJcblx0XHRpZighbmFtZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRsZXQgY2F0ZWdvcml6ZWQ9dGhpcy5zdHlsZVxyXG5cdFx0aWYoY2F0ZWdvcnkpe1xyXG5cdFx0XHRjYXRlZ29yaXplZD10aGlzLnN0eWxlW2NhdGVnb3J5XVxyXG5cdFx0XHRpZighY2F0ZWdvcml6ZWQpe1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVbY2F0ZWdvcnldPWNhdGVnb3JpemVkPXt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCBvbGRWYWx1ZT1jYXRlZ29yaXplZFtuYW1lXVxyXG5cdFx0XHJcblx0XHRzd2l0Y2godHlwZW9mKG9sZFZhbHVlKSl7XHJcblx0XHRjYXNlICdvYmplY3QnOlxyXG5cdFx0XHRpZih0eXBlb2YodmFsdWUpPT0nb2JqZWN0Jyl7XHJcblx0XHRcdFx0Y2F0ZWdvcml6ZWRbbmFtZV09T2JqZWN0LmFzc2lnbih2YWx1ZSxvbGRWYWx1ZSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKFwieW91J2QgYmV0dGVyIGNoZWNrIGl0LlwiKVxyXG5cdFx0XHR9XHJcblx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0Y2F0ZWdvcml6ZWRbbmFtZV09dmFsdWVcclxuXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==