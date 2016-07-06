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
			if (!type) return '*';

			type = type.charAt(0).toUpperCase() + type.substr(1);
			switch (type) {
				case 'Heading':
					return 'Paragraph';
				default:
					return type;
			}
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
	}, {
		key: "toTag",
		value: function toTag() {
			return "<" + this.type + ">" + this.children.map(function (a) {
				return a.toTag();
			}).join("") + "</" + this.type + ">";
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCO3dCQURQLE9BQ087O0FBQzFCLE9BQUssU0FBTCxHQUFlLFNBQWYsQ0FEMEI7QUFFMUIsT0FBSyxJQUFMLEdBQVUsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQVYsQ0FGMEI7QUFHMUIsT0FBSyxZQUFMLEdBQWtCLEVBQWxCLENBSDBCO0FBSTFCLE9BQUssUUFBTCxHQUFjLEVBQWQsQ0FKMEI7QUFLMUIsT0FBSyxHQUFMLEdBQVMsR0FBVCxDQUwwQjtFQUEzQjs7Ozs7OztjQURvQjs7MEJBWWI7QUFDTixPQUFHLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBOEI7QUFDaEMsUUFBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUQ0QjtBQUVoQyxRQUFHLEtBQUgsRUFBUztBQUNSLFNBQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBREk7QUFFUixXQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQUZRO0FBR1IsVUFBSyxZQUFMLENBQWtCLFlBQWxCLEdBQStCLFFBQVEsS0FBUixDQUh2QjtLQUFULE1BSUs7QUFDSixVQUFLLFlBQUwsQ0FBa0IsWUFBbEIsR0FBK0IsS0FBSyxHQUFMLENBQVMsZUFBVCxDQUF5QixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXhELENBREk7S0FKTDtJQUZEOzs7O2dDQVlhLFdBQVU7QUFDdkIsT0FBSSxPQUFLLFVBQVUsSUFBVixDQURjO0FBRXZCLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FBTyxHQUFQLENBREQ7O0FBR0EsVUFBSyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixLQUE2QixLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQTdCLENBTGtCO0FBTXZCLFdBQU8sSUFBUDtBQUNBLFNBQUssU0FBTDtBQUNDLFlBQU8sV0FBUCxDQUREO0FBREE7QUFJQyxZQUFPLElBQVAsQ0FERDtBQUhBLElBTnVCOzs7OzhCQWNaLFdBQVUsS0FBSTtBQUN6QixPQUFJLE9BQUssS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQUwsQ0FEcUI7QUFFekIsT0FBRyxrQkFBUSxJQUFSLENBQUgsRUFBaUI7QUFDaEIsUUFBSSxZQUFVLFNBQU8sSUFBUCxDQUFWLENBRFk7QUFFaEIsUUFBSSxXQUFTLFlBQVksSUFBSSxTQUFKLENBQWMsU0FBZCxFQUF3QixHQUF4QixDQUFaLEdBQTJDLElBQUksS0FBSixDQUFVLFNBQVYsRUFBcUIsR0FBckIsQ0FBM0MsQ0FGRztBQUdoQixTQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFFBQW5CLEVBSGdCO0FBSWhCLFdBQU8sUUFBUCxDQUpnQjtJQUFqQixNQU1DLE9BQU8sSUFBUCxDQU5EOzs7Ozs7Ozs7O3FDQWFrQixXQUFVO0FBQzVCLFVBQU8sZ0JBQU0sYUFBTixDQUNOLFVBQVUsS0FBSyxJQUFMLENBREosRUFFTixLQUFLLFlBQUwsRUFDQSxLQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCO1dBQUcsRUFBRSxrQkFBRixDQUFxQixTQUFyQjtJQUFILENBSFosQ0FBUCxDQUQ0Qjs7OzswQkFPdEI7QUFDTixnQkFBVyxLQUFLLElBQUwsU0FBYSxLQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCO1dBQUcsRUFBRSxLQUFGO0lBQUgsQ0FBbEIsQ0FBZ0MsSUFBaEMsQ0FBcUMsRUFBckMsV0FBNkMsS0FBSyxJQUFMLE1BQXJFLENBRE07Ozs7UUE3RGEiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBDb250ZW50IGZyb20gXCIuLi8uLi9jb250ZW50XCJcclxuaW1wb3J0IHtNb2RlbHN9IGZyb20gXCIuXCJcclxuaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVse1xyXG5cdGNvbnN0cnVjdG9yKHdvcmRNb2RlbCwgZG9jKXtcclxuXHRcdHRoaXMud29yZE1vZGVsPXdvcmRNb2RlbFxyXG5cdFx0dGhpcy50eXBlPXRoaXMuYXNDb250ZW50VHlwZSh3b3JkTW9kZWwpXHJcblx0XHR0aGlzLmNvbnRlbnRQcm9wcz17fVxyXG5cdFx0dGhpcy5jaGlsZHJlbj1bXVxyXG5cdFx0dGhpcy5kb2M9ZG9jXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBleHRyYWN0IGluZm9ybWF0aW9uIGZyb20gd29yZE1vZGVsXHJcblx0ICovXHJcblx0dmlzaXQoKXtcclxuXHRcdGlmKHRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKXtcclxuXHRcdFx0bGV0IHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcclxuXHRcdFx0aWYoc3R5bGUpe1xyXG5cdFx0XHRcdGxldCB2aXNpdG9yPW5ldyBTdHlsZSh0aGlzLndvcmRNb2RlbCwgdGhpcy5kb2MpXHJcblx0XHRcdFx0c3R5bGUucGFyc2UoW3Zpc2l0b3JdKVxyXG5cdFx0XHRcdHRoaXMuY29udGVudFByb3BzLmNvbnRlbnRTdHlsZT12aXNpdG9yLnN0eWxlXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHRoaXMuY29udGVudFByb3BzLmNvbnRlbnRTdHlsZT10aGlzLmRvYy5nZXREZWZhdWx0U3R5bGUodGhpcy53b3JkTW9kZWwudHlwZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNDb250ZW50VHlwZSh3b3JkTW9kZWwpe1xyXG5cdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGVcclxuXHRcdGlmKCF0eXBlKVxyXG5cdFx0XHRyZXR1cm4gJyonXHJcblx0XHRcclxuXHRcdHR5cGU9dHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnSGVhZGluZyc6XHJcblx0XHRcdHJldHVybiAnUGFyYWdyYXBoJ1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHR5cGVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2Mpe1xyXG5cdFx0bGV0IHR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdGlmKENvbnRlbnRbdHlwZV0pe1xyXG5cdFx0XHRsZXQgTW9kZWxUeXBlPU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRsZXQgYXBwZW5kZWQ9TW9kZWxUeXBlID8gbmV3IE1vZGVsVHlwZSh3b3JkTW9kZWwsZG9jKSA6IG5ldyBNb2RlbCh3b3JkTW9kZWwsIGRvYylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogeW91J2QgYmV0dGVyIE5PVCBleHRyYWN0IGluZm8gZnJvbSB3b3JkTW9kZWxcclxuXHQgKiBNYXliZSBlcnJvciBzaW5jZSBwYXJzZSBjb250ZXh0IGlzIHJlbGVhc2VkXHJcblx0ICovXHJcblx0Y3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSl7XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0bmFtZXNwYWNlW3RoaXMudHlwZV0sXHJcblx0XHRcdHRoaXMuY29udGVudFByb3BzLFxyXG5cdFx0XHR0aGlzLmNoaWxkcmVuLm1hcChhPT5hLmNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2UpKSlcclxuXHR9XHJcblx0XHJcblx0dG9UYWcoKXtcclxuXHRcdHJldHVybiBgPCR7dGhpcy50eXBlfT4ke3RoaXMuY2hpbGRyZW4ubWFwKGE9PmEudG9UYWcoKSkuam9pbihcIlwiKX08LyR7dGhpcy50eXBlfT5gXHJcblx0fVxyXG59XHJcbiJdfQ==