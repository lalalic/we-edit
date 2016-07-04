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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	function Model(wordModel, parent) {
		_classCallCheck(this, Model);

		this.wordModel = wordModel;
		this.type = this.asContentType(wordModel);
		this.props = {};
		this.children = [];
	}

	/**
  * extract information from wordModel
  */


	_createClass(Model, [{
		key: "visit",
		value: function visit() {
			this.visitStyle();
		}
	}, {
		key: "visitStyle",
		value: function visitStyle() {
			var directStyle = this.wordModel.getDirectStyle(),
			    namedStyleId = this.wordModel.getStyleId();

			var style = this.doc.createStyle(el || this.content, namedStyleId);

			if (directStyle) directStyle.parse([new this.constructor.StyleProperties(style, this)]);

			return style;
		}
	}, {
		key: "asContentType",
		value: function asContentType(wordModel) {
			var type = wordModel.type;
			if (type) return type.charAt(0).toUpperCase() + type.substr(1);else return "*";
		}
	}, {
		key: "appendChild",
		value: function appendChild(wordModel) {
			var type = this.asContentType(wordModel);
			if (_content2.default[type]) {
				var ModelType = _.Models[type];
				var appended = ModelType ? new ModelType(wordModel, this) : new Model(wordModel, this);
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
			return _react2.default.createElement(namespace[this.type], this.props, this.children.map(function (a) {
				return a.createReactElement(namespace);
			}));
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCO0FBQ3BCLFVBRG9CLEtBQ3BCLENBQVksU0FBWixFQUF1QixNQUF2QixFQUE4Qjt3QkFEVixPQUNVOztBQUM3QixPQUFLLFNBQUwsR0FBZSxTQUFmLENBRDZCO0FBRTdCLE9BQUssSUFBTCxHQUFVLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUFWLENBRjZCO0FBRzdCLE9BQUssS0FBTCxHQUFXLEVBQVgsQ0FINkI7QUFJN0IsT0FBSyxRQUFMLEdBQWMsRUFBZCxDQUo2QjtFQUE5Qjs7Ozs7OztjQURvQjs7MEJBV2I7QUFDTixRQUFLLFVBQUwsR0FETTs7OzsrQkFJSztBQUNYLE9BQUksY0FBWSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQVo7T0FDRixlQUFhLEtBQUssU0FBTCxDQUFlLFVBQWYsRUFBYixDQUZTOztBQUlYLE9BQUksUUFBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLE1BQUksS0FBSyxPQUFMLEVBQWEsWUFBdEMsQ0FBTixDQUpPOztBQU1YLE9BQUcsV0FBSCxFQUNDLFlBQVksS0FBWixDQUFrQixDQUFDLElBQUksS0FBSyxXQUFMLENBQWlCLGVBQWpCLENBQWlDLEtBQXJDLEVBQTRDLElBQTVDLENBQUQsQ0FBbEIsRUFERDs7QUFHQSxVQUFPLEtBQVAsQ0FUVzs7OztnQ0FZRSxXQUFVO0FBQ3ZCLE9BQUksT0FBSyxVQUFVLElBQVYsQ0FEYztBQUV2QixPQUFHLElBQUgsRUFDQyxPQUFPLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxXQUFmLEtBQTZCLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBN0IsQ0FEUixLQUdDLE9BQU8sR0FBUCxDQUhEOzs7OzhCQU1XLFdBQVU7QUFDckIsT0FBSSxPQUFLLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUFMLENBRGlCO0FBRXJCLE9BQUcsa0JBQVEsSUFBUixDQUFILEVBQWlCO0FBQ2hCLFFBQUksWUFBVSxTQUFPLElBQVAsQ0FBVixDQURZO0FBRWhCLFFBQUksV0FBUyxZQUFZLElBQUksU0FBSixDQUFjLFNBQWQsRUFBd0IsSUFBeEIsQ0FBWixHQUE0QyxJQUFJLEtBQUosQ0FBVSxTQUFWLEVBQXFCLElBQXJCLENBQTVDLENBRkc7QUFHaEIsU0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixRQUFuQixFQUhnQjtBQUloQixXQUFPLFFBQVAsQ0FKZ0I7SUFBakIsTUFNQyxPQUFPLElBQVAsQ0FORDs7Ozs7Ozs7OztxQ0Fha0IsV0FBVTtBQUM1QixVQUFPLGdCQUFNLGFBQU4sQ0FDTixVQUFVLEtBQUssSUFBTCxDQURKLEVBRU4sS0FBSyxLQUFMLEVBQ0EsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtXQUFHLEVBQUUsa0JBQUYsQ0FBcUIsU0FBckI7SUFBSCxDQUhaLENBQVAsQ0FENEI7Ozs7UUFsRFQiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBDb250ZW50IGZyb20gXCIuLi8uLi9jb250ZW50XCJcclxuaW1wb3J0IHtNb2RlbHN9IGZyb20gXCIuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVse1xyXG5cdGNvbnN0cnVjdG9yKHdvcmRNb2RlbCwgcGFyZW50KXtcclxuXHRcdHRoaXMud29yZE1vZGVsPXdvcmRNb2RlbFxyXG5cdFx0dGhpcy50eXBlPXRoaXMuYXNDb250ZW50VHlwZSh3b3JkTW9kZWwpXHJcblx0XHR0aGlzLnByb3BzPXt9XHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBleHRyYWN0IGluZm9ybWF0aW9uIGZyb20gd29yZE1vZGVsXHJcblx0ICovXHJcblx0dmlzaXQoKXtcclxuXHRcdHRoaXMudmlzaXRTdHlsZSgpXHJcblx0fVxyXG5cclxuXHR2aXNpdFN0eWxlKCl7XHJcblx0XHRsZXQgZGlyZWN0U3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxyXG5cdFx0XHQsbmFtZWRTdHlsZUlkPXRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQoKVxyXG5cclxuXHRcdGxldCBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZShlbHx8dGhpcy5jb250ZW50LG5hbWVkU3R5bGVJZClcclxuXHJcblx0XHRpZihkaXJlY3RTdHlsZSlcclxuXHRcdFx0ZGlyZWN0U3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlN0eWxlUHJvcGVydGllcyhzdHlsZSwgdGhpcyldKVxyXG5cclxuXHRcdHJldHVybiBzdHlsZVxyXG5cdH1cclxuXHJcblx0YXNDb250ZW50VHlwZSh3b3JkTW9kZWwpe1xyXG5cdFx0bGV0IHR5cGU9d29yZE1vZGVsLnR5cGVcclxuXHRcdGlmKHR5cGUpXHJcblx0XHRcdHJldHVybiB0eXBlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3R5cGUuc3Vic3RyKDEpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBcIipcIlxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ2hpbGQod29yZE1vZGVsKXtcclxuXHRcdGxldCB0eXBlPXRoaXMuYXNDb250ZW50VHlwZSh3b3JkTW9kZWwpXHJcblx0XHRpZihDb250ZW50W3R5cGVdKXtcclxuXHRcdFx0bGV0IE1vZGVsVHlwZT1Nb2RlbHNbdHlwZV1cclxuXHRcdFx0bGV0IGFwcGVuZGVkPU1vZGVsVHlwZSA/IG5ldyBNb2RlbFR5cGUod29yZE1vZGVsLHRoaXMpIDogbmV3IE1vZGVsKHdvcmRNb2RlbCwgdGhpcylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogeW91J2QgYmV0dGVyIE5PVCBleHRyYWN0IGluZm8gZnJvbSB3b3JkTW9kZWxcclxuXHQgKiBNYXliZSBlcnJvciBzaW5jZSBwYXJzZSBjb250ZXh0IGlzIHJlbGVhc2VkXHJcblx0ICovXHJcblx0Y3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSl7XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0bmFtZXNwYWNlW3RoaXMudHlwZV0sXHJcblx0XHRcdHRoaXMucHJvcHMsXHJcblx0XHRcdHRoaXMuY2hpbGRyZW4ubWFwKGE9PmEuY3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSkpKVxyXG5cdH1cclxufVxyXG4iXX0=