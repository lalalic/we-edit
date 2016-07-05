"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../../content");

var _content2 = _interopRequireDefault(_content);

var _ = require(".");

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	function Model(wordModel, doc) {
		_classCallCheck(this, Model);

		this.wordModel = wordModel;
		this.type = this.asContentType(wordModel);
		this.contentProps = {};
		this.children = [];
		this.doc = doc;
	}

	/**
  * extract information from wordModel
  */


	_createClass(Model, [{
		key: "visit",
		value: function visit() {
			if (this.wordModel.getDirectStyle) {
				var style = this.wordModel.getDirectStyle();
				if (style) {
					var visitor = new _style2.default(this.wordModel, this.doc);
					style.parse([visitor]);
					this.contentProps.contentStyle = visitor.style;
				} else {
					this.contentProps.contentStyle = this.doc.getDefaultStyle(this.wordModel.type);
				}
			}
		}
	}, {
		key: "asContentType",
		value: function asContentType(wordModel) {
			var type = wordModel.type;
			if (type) return type.charAt(0).toUpperCase() + type.substr(1);else return "*";
		}
	}, {
		key: "appendChild",
		value: function appendChild(wordModel, doc) {
			var type = this.asContentType(wordModel);
			if (_content2.default[type]) {
				var ModelType = _.Models[type];
				var appended = ModelType ? new ModelType(wordModel, doc) : new Model(wordModel, doc);
				this.children.push(appended);
				return appended;
			} else return this;
		}

		/**
   * you'd better NOT extract info from wordModel
   * Maybe error since parse context is released
   */

	}, {
		key: "createReactElement",
		value: function createReactElement(namespace) {
			return _react2.default.createElement(namespace[this.type], this.contentProps, this.children.map(function (a) {
				return a.createReactElement(namespace);
			}));
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCO3dCQURQLE9BQ087O0FBQzFCLE9BQUssU0FBTCxHQUFlLFNBQWYsQ0FEMEI7QUFFMUIsT0FBSyxJQUFMLEdBQVUsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQVYsQ0FGMEI7QUFHMUIsT0FBSyxZQUFMLEdBQWtCLEVBQWxCLENBSDBCO0FBSTFCLE9BQUssUUFBTCxHQUFjLEVBQWQsQ0FKMEI7QUFLMUIsT0FBSyxHQUFMLEdBQVMsR0FBVCxDQUwwQjtFQUEzQjs7Ozs7OztjQURvQjs7MEJBWWI7QUFDTixPQUFHLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBOEI7QUFDaEMsUUFBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUQ0QjtBQUVoQyxRQUFHLEtBQUgsRUFBUztBQUNSLFNBQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBREk7QUFFUixXQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQUZRO0FBR1IsVUFBSyxZQUFMLENBQWtCLFlBQWxCLEdBQStCLFFBQVEsS0FBUixDQUh2QjtLQUFULE1BSUs7QUFDSixVQUFLLFlBQUwsQ0FBa0IsWUFBbEIsR0FBK0IsS0FBSyxHQUFMLENBQVMsZUFBVCxDQUF5QixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXhELENBREk7S0FKTDtJQUZEOzs7O2dDQVlhLFdBQVU7QUFDdkIsT0FBSSxPQUFLLFVBQVUsSUFBVixDQURjO0FBRXZCLE9BQUcsSUFBSCxFQUNDLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLFdBQWYsS0FBNkIsS0FBSyxNQUFMLENBQVksQ0FBWixDQUE3QixDQURSLEtBR0MsT0FBTyxHQUFQLENBSEQ7Ozs7OEJBTVcsV0FBVSxLQUFJO0FBQ3pCLE9BQUksT0FBSyxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBTCxDQURxQjtBQUV6QixPQUFHLGtCQUFRLElBQVIsQ0FBSCxFQUFpQjtBQUNoQixRQUFJLFlBQVUsU0FBTyxJQUFQLENBQVYsQ0FEWTtBQUVoQixRQUFJLFdBQVMsWUFBWSxJQUFJLFNBQUosQ0FBYyxTQUFkLEVBQXdCLEdBQXhCLENBQVosR0FBMkMsSUFBSSxLQUFKLENBQVUsU0FBVixFQUFxQixHQUFyQixDQUEzQyxDQUZHO0FBR2hCLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFIZ0I7QUFJaEIsV0FBTyxRQUFQLENBSmdCO0lBQWpCLE1BTUMsT0FBTyxJQUFQLENBTkQ7Ozs7Ozs7Ozs7cUNBYWtCLFdBQVU7QUFDNUIsVUFBTyxnQkFBTSxhQUFOLENBQ04sVUFBVSxLQUFLLElBQUwsQ0FESixFQUVOLEtBQUssWUFBTCxFQUNBLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7V0FBRyxFQUFFLGtCQUFGLENBQXFCLFNBQXJCO0lBQUgsQ0FIWixDQUFQLENBRDRCOzs7O1FBaERUIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQ29udGVudCBmcm9tIFwiLi4vLi4vY29udGVudFwiXHJcbmltcG9ydCB7TW9kZWxzfSBmcm9tIFwiLlwiXHJcbmltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcih3b3JkTW9kZWwsIGRvYyl7XHJcblx0XHR0aGlzLndvcmRNb2RlbD13b3JkTW9kZWxcclxuXHRcdHRoaXMudHlwZT10aGlzLmFzQ29udGVudFR5cGUod29yZE1vZGVsKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHM9e31cclxuXHRcdHRoaXMuY2hpbGRyZW49W11cclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZXh0cmFjdCBpbmZvcm1hdGlvbiBmcm9tIHdvcmRNb2RlbFxyXG5cdCAqL1xyXG5cdHZpc2l0KCl7XHJcblx0XHRpZih0aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSl7XHJcblx0XHRcdGxldCBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXHJcblx0XHRcdGlmKHN0eWxlKXtcclxuXHRcdFx0XHRsZXQgdmlzaXRvcj1uZXcgU3R5bGUodGhpcy53b3JkTW9kZWwsIHRoaXMuZG9jKVxyXG5cdFx0XHRcdHN0eWxlLnBhcnNlKFt2aXNpdG9yXSlcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9dmlzaXRvci5zdHlsZVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9dGhpcy5kb2MuZ2V0RGVmYXVsdFN0eWxlKHRoaXMud29yZE1vZGVsLnR5cGUpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzQ29udGVudFR5cGUod29yZE1vZGVsKXtcclxuXHRcdGxldCB0eXBlPXdvcmRNb2RlbC50eXBlXHJcblx0XHRpZih0eXBlKVxyXG5cdFx0XHRyZXR1cm4gdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gXCIqXCJcclxuXHR9XHJcblxyXG5cdGFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2Mpe1xyXG5cdFx0bGV0IHR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdGlmKENvbnRlbnRbdHlwZV0pe1xyXG5cdFx0XHRsZXQgTW9kZWxUeXBlPU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRsZXQgYXBwZW5kZWQ9TW9kZWxUeXBlID8gbmV3IE1vZGVsVHlwZSh3b3JkTW9kZWwsZG9jKSA6IG5ldyBNb2RlbCh3b3JkTW9kZWwsIGRvYylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogeW91J2QgYmV0dGVyIE5PVCBleHRyYWN0IGluZm8gZnJvbSB3b3JkTW9kZWxcclxuXHQgKiBNYXliZSBlcnJvciBzaW5jZSBwYXJzZSBjb250ZXh0IGlzIHJlbGVhc2VkXHJcblx0ICovXHJcblx0Y3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSl7XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0bmFtZXNwYWNlW3RoaXMudHlwZV0sXHJcblx0XHRcdHRoaXMuY29udGVudFByb3BzLFxyXG5cdFx0XHR0aGlzLmNoaWxkcmVuLm1hcChhPT5hLmNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2UpKSlcclxuXHR9XHJcbn1cclxuIl19