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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLEdBQXZCLEVBQTJCO3dCQURQLE9BQ087O0FBQzFCLE9BQUssU0FBTCxHQUFlLFNBQWYsQ0FEMEI7QUFFMUIsT0FBSyxJQUFMLEdBQVUsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQVYsQ0FGMEI7QUFHMUIsT0FBSyxZQUFMLEdBQWtCLEVBQWxCLENBSDBCO0FBSTFCLE9BQUssUUFBTCxHQUFjLEVBQWQsQ0FKMEI7QUFLMUIsT0FBSyxHQUFMLEdBQVMsR0FBVCxDQUwwQjtFQUEzQjs7Ozs7OztjQURvQjs7MEJBWWI7QUFDTixPQUFHLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBOEI7QUFDaEMsUUFBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUQ0QjtBQUVoQyxRQUFHLEtBQUgsRUFBUztBQUNSLFNBQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBREk7QUFFUixXQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQUZRO0FBR1IsVUFBSyxZQUFMLENBQWtCLFdBQWxCLEdBQThCLFFBQVEsS0FBUixDQUh0QjtLQUFULE1BSUs7QUFDSixVQUFLLFlBQUwsQ0FBa0IsV0FBbEIsR0FBOEIsb0JBQVUsS0FBSyxTQUFMLEVBQWdCLEtBQUssR0FBTCxDQUExQixDQUFvQyxLQUFwQyxDQUQxQjtLQUpMO0lBRkQ7Ozs7Z0NBWWEsV0FBVTtBQUN2QixPQUFJLE9BQUssVUFBVSxJQUFWLENBRGM7QUFFdkIsT0FBRyxDQUFDLElBQUQsRUFDRixPQUFPLEdBQVAsQ0FERDs7QUFHQSxVQUFLLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxXQUFmLEtBQTZCLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBN0IsQ0FMa0I7QUFNdkIsV0FBTyxJQUFQO0FBQ0EsU0FBSyxTQUFMO0FBQ0MsWUFBTyxXQUFQLENBREQ7QUFEQTtBQUlDLFlBQU8sSUFBUCxDQUREO0FBSEEsSUFOdUI7Ozs7OEJBY1osV0FBVSxLQUFJO0FBQ3pCLE9BQUksT0FBSyxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsQ0FBTCxDQURxQjtBQUV6QixPQUFHLGtCQUFRLElBQVIsQ0FBSCxFQUFpQjtBQUNoQixRQUFJLFlBQVUsU0FBTyxJQUFQLENBQVYsQ0FEWTtBQUVoQixRQUFJLFdBQVMsWUFBWSxJQUFJLFNBQUosQ0FBYyxTQUFkLEVBQXdCLEdBQXhCLENBQVosR0FBMkMsSUFBSSxLQUFKLENBQVUsU0FBVixFQUFxQixHQUFyQixDQUEzQyxDQUZHO0FBR2hCLFNBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsRUFIZ0I7QUFJaEIsV0FBTyxRQUFQLENBSmdCO0lBQWpCLE1BTUMsT0FBTyxJQUFQLENBTkQ7Ozs7Ozs7Ozs7cUNBYWtCLFdBQVU7QUFDNUIsVUFBTyxnQkFBTSxhQUFOLENBQ04sVUFBVSxLQUFLLElBQUwsQ0FESixFQUVOLEtBQUssWUFBTCxFQUNBLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7V0FBRyxFQUFFLGtCQUFGLENBQXFCLFNBQXJCO0lBQUgsQ0FIWixDQUFQLENBRDRCOzs7OzBCQU90QjtBQUNOLGdCQUFXLEtBQUssSUFBTCxTQUFhLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0I7V0FBRyxFQUFFLEtBQUY7SUFBSCxDQUFsQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxXQUE2QyxLQUFLLElBQUwsTUFBckUsQ0FETTs7OztRQTdEYSIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IENvbnRlbnQgZnJvbSBcIi4uLy4uL2NvbnRlbnRcIlxyXG5pbXBvcnQge01vZGVsc30gZnJvbSBcIi5cIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWx7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBkb2Mpe1xyXG5cdFx0dGhpcy53b3JkTW9kZWw9d29yZE1vZGVsXHJcblx0XHR0aGlzLnR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdHRoaXMuY29udGVudFByb3BzPXt9XHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0XHR0aGlzLmRvYz1kb2NcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGV4dHJhY3QgaW5mb3JtYXRpb24gZnJvbSB3b3JkTW9kZWxcclxuXHQgKi9cclxuXHR2aXNpdCgpe1xyXG5cdFx0aWYodGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUpe1xyXG5cdFx0XHRsZXQgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxyXG5cdFx0XHRpZihzdHlsZSl7XHJcblx0XHRcdFx0bGV0IHZpc2l0b3I9bmV3IFN0eWxlKHRoaXMud29yZE1vZGVsLCB0aGlzLmRvYylcclxuXHRcdFx0XHRzdHlsZS5wYXJzZShbdmlzaXRvcl0pXHJcblx0XHRcdFx0dGhpcy5jb250ZW50UHJvcHMuZGlyZWN0U3R5bGU9dmlzaXRvci5zdHlsZVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kaXJlY3RTdHlsZT1uZXcgU3R5bGUodGhpcy53b3JkTW9kZWwsIHRoaXMuZG9jKS5zdHlsZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc0NvbnRlbnRUeXBlKHdvcmRNb2RlbCl7XHJcblx0XHRsZXQgdHlwZT13b3JkTW9kZWwudHlwZVxyXG5cdFx0aWYoIXR5cGUpXHJcblx0XHRcdHJldHVybiAnKidcclxuXHJcblx0XHR0eXBlPXR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrdHlwZS5zdWJzdHIoMSlcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgJ0hlYWRpbmcnOlxyXG5cdFx0XHRyZXR1cm4gJ1BhcmFncmFwaCdcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiB0eXBlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhcHBlbmRDaGlsZCh3b3JkTW9kZWwsZG9jKXtcclxuXHRcdGxldCB0eXBlPXRoaXMuYXNDb250ZW50VHlwZSh3b3JkTW9kZWwpXHJcblx0XHRpZihDb250ZW50W3R5cGVdKXtcclxuXHRcdFx0bGV0IE1vZGVsVHlwZT1Nb2RlbHNbdHlwZV1cclxuXHRcdFx0bGV0IGFwcGVuZGVkPU1vZGVsVHlwZSA/IG5ldyBNb2RlbFR5cGUod29yZE1vZGVsLGRvYykgOiBuZXcgTW9kZWwod29yZE1vZGVsLCBkb2MpXHJcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChhcHBlbmRlZClcclxuXHRcdFx0cmV0dXJuIGFwcGVuZGVkXHJcblx0XHR9IGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXNcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHlvdSdkIGJldHRlciBOT1QgZXh0cmFjdCBpbmZvIGZyb20gd29yZE1vZGVsXHJcblx0ICogTWF5YmUgZXJyb3Igc2luY2UgcGFyc2UgY29udGV4dCBpcyByZWxlYXNlZFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2Upe1xyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdG5hbWVzcGFjZVt0aGlzLnR5cGVdLFxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcyxcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5tYXAoYT0+YS5jcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKSkpXHJcblx0fVxyXG5cclxuXHR0b1RhZygpe1xyXG5cdFx0cmV0dXJuIGA8JHt0aGlzLnR5cGV9PiR7dGhpcy5jaGlsZHJlbi5tYXAoYT0+YS50b1RhZygpKS5qb2luKFwiXCIpfTwvJHt0aGlzLnR5cGV9PmBcclxuXHR9XHJcbn1cclxuIl19