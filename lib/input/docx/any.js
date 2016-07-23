"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../../content");

var _content2 = _interopRequireDefault(_content);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _section = require("./section");

var _section2 = _interopRequireDefault(_section);

var _image = require("./image");

var _image2 = _interopRequireDefault(_image);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

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
					this.contentProps.directStyle = visitor.style;
				} else {
					this.contentProps.directStyle = new _style2.default(this.wordModel, this.doc).style;
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
				var ModelType = Models[type];
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


var Models = {
	Document: _document2.default,
	Section: _section2.default,
	Image: _image2.default,
	Text: _text2.default,
	Table: _table2.default,
	List: _list2.default
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQXFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBeEVxQjtBQUNwQixVQURvQixLQUNwQixDQUFZLFNBQVosRUFBdUIsR0FBdkIsRUFBMkI7d0JBRFAsT0FDTzs7QUFDMUIsT0FBSyxTQUFMLEdBQWUsU0FBZixDQUQwQjtBQUUxQixPQUFLLElBQUwsR0FBVSxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBVixDQUYwQjtBQUcxQixPQUFLLFlBQUwsR0FBa0IsRUFBbEIsQ0FIMEI7QUFJMUIsT0FBSyxRQUFMLEdBQWMsRUFBZCxDQUowQjtBQUsxQixPQUFLLEdBQUwsR0FBUyxHQUFULENBTDBCO0VBQTNCOzs7Ozs7O2NBRG9COzswQkFZYjtBQUNOLE9BQUcsS0FBSyxTQUFMLENBQWUsY0FBZixFQUE4QjtBQUNoQyxRQUFJLFFBQU0sS0FBSyxTQUFMLENBQWUsY0FBZixFQUFOLENBRDRCO0FBRWhDLFFBQUcsS0FBSCxFQUFTO0FBQ1IsU0FBSSxVQUFRLG9CQUFVLEtBQUssU0FBTCxFQUFnQixLQUFLLEdBQUwsQ0FBbEMsQ0FESTtBQUVSLFdBQU0sS0FBTixDQUFZLENBQUMsT0FBRCxDQUFaLEVBRlE7QUFHUixVQUFLLFlBQUwsQ0FBa0IsV0FBbEIsR0FBOEIsUUFBUSxLQUFSLENBSHRCO0tBQVQsTUFJSztBQUNKLFVBQUssWUFBTCxDQUFrQixXQUFsQixHQUE4QixvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQTFCLENBQW9DLEtBQXBDLENBRDFCO0tBSkw7SUFGRDs7OztnQ0FZYSxXQUFVO0FBQ3ZCLE9BQUksT0FBSyxVQUFVLElBQVYsQ0FEYztBQUV2QixPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sR0FBUCxDQUREOztBQUdBLFVBQUssS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLFdBQWYsS0FBNkIsS0FBSyxNQUFMLENBQVksQ0FBWixDQUE3QixDQUxrQjtBQU12QixXQUFPLElBQVA7QUFDQSxTQUFLLFNBQUw7QUFDQyxZQUFPLFdBQVAsQ0FERDtBQURBO0FBSUMsWUFBTyxJQUFQLENBREQ7QUFIQSxJQU51Qjs7Ozs4QkFjWixXQUFVLEtBQUk7QUFDekIsT0FBSSxPQUFLLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUFMLENBRHFCO0FBRXpCLE9BQUcsa0JBQVEsSUFBUixDQUFILEVBQWlCO0FBQ2hCLFFBQUksWUFBVSxPQUFPLElBQVAsQ0FBVixDQURZO0FBRWhCLFFBQUksV0FBUyxZQUFZLElBQUksU0FBSixDQUFjLFNBQWQsRUFBd0IsR0FBeEIsQ0FBWixHQUEyQyxJQUFJLEtBQUosQ0FBVSxTQUFWLEVBQXFCLEdBQXJCLENBQTNDLENBRkc7QUFHaEIsU0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixRQUFuQixFQUhnQjtBQUloQixXQUFPLFFBQVAsQ0FKZ0I7SUFBakIsTUFNQyxPQUFPLElBQVAsQ0FORDs7Ozs7Ozs7OztxQ0Fha0IsV0FBVTtBQUM1QixVQUFPLGdCQUFNLGFBQU4sQ0FDTixVQUFVLEtBQUssSUFBTCxDQURKLEVBRU4sS0FBSyxZQUFMLEVBQ0EsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtXQUFHLEVBQUUsa0JBQUYsQ0FBcUIsU0FBckI7SUFBSCxDQUhaLENBQVAsQ0FENEI7Ozs7MEJBT3RCO0FBQ04sZ0JBQVcsS0FBSyxJQUFMLFNBQWEsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtXQUFHLEVBQUUsS0FBRjtJQUFILENBQWxCLENBQWdDLElBQWhDLENBQXFDLEVBQXJDLFdBQTZDLEtBQUssSUFBTCxNQUFyRSxDQURNOzs7O1FBN0RhOzs7Ozs7QUEwRXJCLElBQU0sU0FBTztBQUNaLDZCQURZO0FBRVgsMkJBRlc7QUFHWCx1QkFIVztBQUlYLHFCQUpXO0FBS1gsdUJBTFc7QUFNWCxxQkFOVztDQUFQIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQ29udGVudCBmcm9tIFwiLi4vLi4vY29udGVudFwiXHJcbmltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcih3b3JkTW9kZWwsIGRvYyl7XHJcblx0XHR0aGlzLndvcmRNb2RlbD13b3JkTW9kZWxcclxuXHRcdHRoaXMudHlwZT10aGlzLmFzQ29udGVudFR5cGUod29yZE1vZGVsKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHM9e31cclxuXHRcdHRoaXMuY2hpbGRyZW49W11cclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogZXh0cmFjdCBpbmZvcm1hdGlvbiBmcm9tIHdvcmRNb2RlbFxyXG5cdCAqL1xyXG5cdHZpc2l0KCl7XHJcblx0XHRpZih0aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSl7XHJcblx0XHRcdGxldCBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXHJcblx0XHRcdGlmKHN0eWxlKXtcclxuXHRcdFx0XHRsZXQgdmlzaXRvcj1uZXcgU3R5bGUodGhpcy53b3JkTW9kZWwsIHRoaXMuZG9jKVxyXG5cdFx0XHRcdHN0eWxlLnBhcnNlKFt2aXNpdG9yXSlcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kaXJlY3RTdHlsZT12aXNpdG9yLnN0eWxlXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHRoaXMuY29udGVudFByb3BzLmRpcmVjdFN0eWxlPW5ldyBTdHlsZSh0aGlzLndvcmRNb2RlbCwgdGhpcy5kb2MpLnN0eWxlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzQ29udGVudFR5cGUod29yZE1vZGVsKXtcclxuXHRcdGxldCB0eXBlPXdvcmRNb2RlbC50eXBlXHJcblx0XHRpZighdHlwZSlcclxuXHRcdFx0cmV0dXJuICcqJ1xyXG5cclxuXHRcdHR5cGU9dHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnSGVhZGluZyc6XHJcblx0XHRcdHJldHVybiAnUGFyYWdyYXBoJ1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHR5cGVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2Mpe1xyXG5cdFx0bGV0IHR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdGlmKENvbnRlbnRbdHlwZV0pe1xyXG5cdFx0XHRsZXQgTW9kZWxUeXBlPU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRsZXQgYXBwZW5kZWQ9TW9kZWxUeXBlID8gbmV3IE1vZGVsVHlwZSh3b3JkTW9kZWwsZG9jKSA6IG5ldyBNb2RlbCh3b3JkTW9kZWwsIGRvYylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogeW91J2QgYmV0dGVyIE5PVCBleHRyYWN0IGluZm8gZnJvbSB3b3JkTW9kZWxcclxuXHQgKiBNYXliZSBlcnJvciBzaW5jZSBwYXJzZSBjb250ZXh0IGlzIHJlbGVhc2VkXHJcblx0ICovXHJcblx0Y3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSl7XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0bmFtZXNwYWNlW3RoaXMudHlwZV0sXHJcblx0XHRcdHRoaXMuY29udGVudFByb3BzLFxyXG5cdFx0XHR0aGlzLmNoaWxkcmVuLm1hcChhPT5hLmNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2UpKSlcclxuXHR9XHJcblxyXG5cdHRvVGFnKCl7XHJcblx0XHRyZXR1cm4gYDwke3RoaXMudHlwZX0+JHt0aGlzLmNoaWxkcmVuLm1hcChhPT5hLnRvVGFnKCkpLmpvaW4oXCJcIil9PC8ke3RoaXMudHlwZX0+YFxyXG5cdH1cclxufVxyXG5cclxuXHJcbmltcG9ydCBEb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIlxyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vbGlzdFwiXHJcblxyXG5jb25zdCBNb2RlbHM9e1xyXG5cdERvY3VtZW50XHJcblx0LFNlY3Rpb25cclxuXHQsSW1hZ2VcclxuXHQsVGV4dFxyXG5cdCxUYWJsZVxyXG5cdCxMaXN0XHJcbn1cclxuIl19