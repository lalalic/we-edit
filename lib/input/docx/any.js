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
					var type = this.wordModel.type;
					switch (type) {
						case 'paragraph':
						case 'inline':
						case 'table':
						case 'numbering':
							this.contentProps.contentStyle = this.doc.cloneDefaultStyle(this.wordModel.type);
							break;
					}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCO3dCQURQLE9BQ087O0FBQzFCLE9BQUssU0FBTCxHQUFlLFNBQWYsQ0FEMEI7QUFFMUIsT0FBSyxJQUFMLEdBQVUsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQVYsQ0FGMEI7QUFHMUIsT0FBSyxZQUFMLEdBQWtCLEVBQWxCLENBSDBCO0FBSTFCLE9BQUssUUFBTCxHQUFjLEVBQWQsQ0FKMEI7QUFLMUIsT0FBSyxHQUFMLEdBQVMsR0FBVCxDQUwwQjtFQUEzQjs7Ozs7OztjQURvQjs7MEJBWWI7QUFDTixPQUFHLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBOEI7QUFDaEMsUUFBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUQ0QjtBQUVoQyxRQUFHLEtBQUgsRUFBUztBQUNSLFNBQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBREk7QUFFUixXQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQUZRO0FBR1IsVUFBSyxZQUFMLENBQWtCLFlBQWxCLEdBQStCLFFBQVEsS0FBUixDQUh2QjtLQUFULE1BSUs7QUFDSixTQUFJLE9BQUssS0FBSyxTQUFMLENBQWUsSUFBZixDQURMO0FBRUosYUFBTyxJQUFQO0FBQ0EsV0FBSyxXQUFMLENBREE7QUFFQSxXQUFLLFFBQUwsQ0FGQTtBQUdBLFdBQUssT0FBTCxDQUhBO0FBSUEsV0FBSyxXQUFMO0FBQ0MsWUFBSyxZQUFMLENBQWtCLFlBQWxCLEdBQStCLEtBQUssR0FBTCxDQUFTLGlCQUFULENBQTJCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBMUQsQ0FERDtBQUVBLGFBRkE7QUFKQSxNQUZJO0tBSkw7SUFGRDs7OztnQ0FxQmEsV0FBVTtBQUN2QixPQUFJLE9BQUssVUFBVSxJQUFWLENBRGM7QUFFdkIsT0FBRyxDQUFDLElBQUQsRUFDRixPQUFPLEdBQVAsQ0FERDs7QUFHQSxVQUFLLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxXQUFmLEtBQTZCLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBN0IsQ0FMa0I7QUFNdkIsV0FBTyxJQUFQO0FBQ0EsU0FBSyxTQUFMO0FBQ0MsWUFBTyxXQUFQLENBREQ7QUFEQTtBQUlDLFlBQU8sSUFBUCxDQUREO0FBSEEsSUFOdUI7Ozs7OEJBY1osV0FBVSxLQUFJO0FBQ3pCLE9BQUksT0FBSyxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBTCxDQURxQjtBQUV6QixPQUFHLGtCQUFRLElBQVIsQ0FBSCxFQUFpQjtBQUNoQixRQUFJLFlBQVUsU0FBTyxJQUFQLENBQVYsQ0FEWTtBQUVoQixRQUFJLFdBQVMsWUFBWSxJQUFJLFNBQUosQ0FBYyxTQUFkLEVBQXdCLEdBQXhCLENBQVosR0FBMkMsSUFBSSxLQUFKLENBQVUsU0FBVixFQUFxQixHQUFyQixDQUEzQyxDQUZHO0FBR2hCLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFIZ0I7QUFJaEIsV0FBTyxRQUFQLENBSmdCO0lBQWpCLE1BTUMsT0FBTyxJQUFQLENBTkQ7Ozs7Ozs7Ozs7cUNBYWtCLFdBQVU7QUFDNUIsVUFBTyxnQkFBTSxhQUFOLENBQ04sVUFBVSxLQUFLLElBQUwsQ0FESixFQUVOLEtBQUssWUFBTCxFQUNBLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7V0FBRyxFQUFFLGtCQUFGLENBQXFCLFNBQXJCO0lBQUgsQ0FIWixDQUFQLENBRDRCOzs7OzBCQU90QjtBQUNOLGdCQUFXLEtBQUssSUFBTCxTQUFhLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7V0FBRyxFQUFFLEtBQUY7SUFBSCxDQUFsQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxXQUE2QyxLQUFLLElBQUwsTUFBckUsQ0FETTs7OztRQXRFYSIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IENvbnRlbnQgZnJvbSBcIi4uLy4uL2NvbnRlbnRcIlxyXG5pbXBvcnQge01vZGVsc30gZnJvbSBcIi5cIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWx7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0dGhpcy53b3JkTW9kZWw9d29yZE1vZGVsXHJcblx0XHR0aGlzLnR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdHRoaXMuY29udGVudFByb3BzPXt9XHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0XHR0aGlzLmRvYz1kb2NcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGV4dHJhY3QgaW5mb3JtYXRpb24gZnJvbSB3b3JkTW9kZWxcclxuXHQgKi9cclxuXHR2aXNpdCgpe1xyXG5cdFx0aWYodGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUpe1xyXG5cdFx0XHRsZXQgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxyXG5cdFx0XHRpZihzdHlsZSl7XHJcblx0XHRcdFx0bGV0IHZpc2l0b3I9bmV3IFN0eWxlKHRoaXMud29yZE1vZGVsLCB0aGlzLmRvYylcclxuXHRcdFx0XHRzdHlsZS5wYXJzZShbdmlzaXRvcl0pXHJcblx0XHRcdFx0dGhpcy5jb250ZW50UHJvcHMuY29udGVudFN0eWxlPXZpc2l0b3Iuc3R5bGVcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IHR5cGU9dGhpcy53b3JkTW9kZWwudHlwZVxyXG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRjYXNlICdwYXJhZ3JhcGgnOlxyXG5cdFx0XHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdFx0Y2FzZSAndGFibGUnOlxyXG5cdFx0XHRcdGNhc2UgJ251bWJlcmluZyc6XHJcblx0XHRcdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9dGhpcy5kb2MuY2xvbmVEZWZhdWx0U3R5bGUodGhpcy53b3JkTW9kZWwudHlwZSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzQ29udGVudFR5cGUod29yZE1vZGVsKXtcclxuXHRcdGxldCB0eXBlPXdvcmRNb2RlbC50eXBlXHJcblx0XHRpZighdHlwZSlcclxuXHRcdFx0cmV0dXJuICcqJ1xyXG5cclxuXHRcdHR5cGU9dHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnSGVhZGluZyc6XHJcblx0XHRcdHJldHVybiAnUGFyYWdyYXBoJ1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHR5cGVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFwcGVuZENoaWxkKHdvcmRNb2RlbCxkb2Mpe1xyXG5cdFx0bGV0IHR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdGlmKENvbnRlbnRbdHlwZV0pe1xyXG5cdFx0XHRsZXQgTW9kZWxUeXBlPU1vZGVsc1t0eXBlXVxyXG5cdFx0XHRsZXQgYXBwZW5kZWQ9TW9kZWxUeXBlID8gbmV3IE1vZGVsVHlwZSh3b3JkTW9kZWwsZG9jKSA6IG5ldyBNb2RlbCh3b3JkTW9kZWwsIGRvYylcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGFwcGVuZGVkKVxyXG5cdFx0XHRyZXR1cm4gYXBwZW5kZWRcclxuXHRcdH0gZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogeW91J2QgYmV0dGVyIE5PVCBleHRyYWN0IGluZm8gZnJvbSB3b3JkTW9kZWxcclxuXHQgKiBNYXliZSBlcnJvciBzaW5jZSBwYXJzZSBjb250ZXh0IGlzIHJlbGVhc2VkXHJcblx0ICovXHJcblx0Y3JlYXRlUmVhY3RFbGVtZW50KG5hbWVzcGFjZSl7XHJcblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcclxuXHRcdFx0bmFtZXNwYWNlW3RoaXMudHlwZV0sXHJcblx0XHRcdHRoaXMuY29udGVudFByb3BzLFxyXG5cdFx0XHR0aGlzLmNoaWxkcmVuLm1hcChhPT5hLmNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2UpKSlcclxuXHR9XHJcblxyXG5cdHRvVGFnKCl7XHJcblx0XHRyZXR1cm4gYDwke3RoaXMudHlwZX0+JHt0aGlzLmNoaWxkcmVuLm1hcChhPT5hLnRvVGFnKCkpLmpvaW4oXCJcIil9PC8ke3RoaXMudHlwZX0+YFxyXG5cdH1cclxufVxyXG4iXX0=