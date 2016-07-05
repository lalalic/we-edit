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
	function Model(wordModel, parent) {
		_classCallCheck(this, Model);

		this.wordModel = wordModel;
		this.type = this.asContentType(wordModel);
		this.contentProps = {};
		this.children = [];
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
					var visitor = new _style2.default();
					style.parse([visitor]);
					this.contentProps.contentStyle = visitor.style;
					visitor.style.metadata = { basedOn: this.wordModel.getStyleId() };
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
			return _react2.default.createElement(namespace[this.type], this.contentProps, this.children.map(function (a) {
				return a.createReactElement(namespace);
			}));
		}
	}]);

	return Model;
}();

exports.default = Model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLEVBQThCO3dCQURWLE9BQ1U7O0FBQzdCLE9BQUssU0FBTCxHQUFlLFNBQWYsQ0FENkI7QUFFN0IsT0FBSyxJQUFMLEdBQVUsS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQVYsQ0FGNkI7QUFHN0IsT0FBSyxZQUFMLEdBQWtCLEVBQWxCLENBSDZCO0FBSTdCLE9BQUssUUFBTCxHQUFjLEVBQWQsQ0FKNkI7RUFBOUI7Ozs7Ozs7Y0FEb0I7OzBCQVdiO0FBQ04sT0FBRyxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQThCO0FBQ2hDLFFBQUksUUFBTSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQU4sQ0FENEI7QUFFaEMsUUFBRyxLQUFILEVBQVM7QUFDUixTQUFJLFVBQVEscUJBQVIsQ0FESTtBQUVSLFdBQU0sS0FBTixDQUFZLENBQUMsT0FBRCxDQUFaLEVBRlE7QUFHUixVQUFLLFlBQUwsQ0FBa0IsWUFBbEIsR0FBK0IsUUFBUSxLQUFSLENBSHZCO0FBSVIsYUFBUSxLQUFSLENBQWMsUUFBZCxHQUF1QixFQUFDLFNBQVEsS0FBSyxTQUFMLENBQWUsVUFBZixFQUFSLEVBQXhCLENBSlE7S0FBVDtJQUZEOzs7O2dDQVdhLFdBQVU7QUFDdkIsT0FBSSxPQUFLLFVBQVUsSUFBVixDQURjO0FBRXZCLE9BQUcsSUFBSCxFQUNDLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLFdBQWYsS0FBNkIsS0FBSyxNQUFMLENBQVksQ0FBWixDQUE3QixDQURSLEtBR0MsT0FBTyxHQUFQLENBSEQ7Ozs7OEJBTVcsV0FBVTtBQUNyQixPQUFJLE9BQUssS0FBSyxhQUFMLENBQW1CLFNBQW5CLENBQUwsQ0FEaUI7QUFFckIsT0FBRyxrQkFBUSxJQUFSLENBQUgsRUFBaUI7QUFDaEIsUUFBSSxZQUFVLFNBQU8sSUFBUCxDQUFWLENBRFk7QUFFaEIsUUFBSSxXQUFTLFlBQVksSUFBSSxTQUFKLENBQWMsU0FBZCxFQUF3QixJQUF4QixDQUFaLEdBQTRDLElBQUksS0FBSixDQUFVLFNBQVYsRUFBcUIsSUFBckIsQ0FBNUMsQ0FGRztBQUdoQixTQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFFBQW5CLEVBSGdCO0FBSWhCLFdBQU8sUUFBUCxDQUpnQjtJQUFqQixNQU1DLE9BQU8sSUFBUCxDQU5EOzs7Ozs7Ozs7O3FDQWFrQixXQUFVO0FBQzVCLFVBQU8sZ0JBQU0sYUFBTixDQUNOLFVBQVUsS0FBSyxJQUFMLENBREosRUFFTixLQUFLLFlBQUwsRUFDQSxLQUFLLFFBQUwsQ0FBYyxHQUFkLENBQWtCO1dBQUcsRUFBRSxrQkFBRixDQUFxQixTQUFyQjtJQUFILENBSFosQ0FBUCxDQUQ0Qjs7OztRQTlDVCIsImZpbGUiOiJhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IENvbnRlbnQgZnJvbSBcIi4uLy4uL2NvbnRlbnRcIlxyXG5pbXBvcnQge01vZGVsc30gZnJvbSBcIi5cIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWx7XHJcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBwYXJlbnQpe1xyXG5cdFx0dGhpcy53b3JkTW9kZWw9d29yZE1vZGVsXHJcblx0XHR0aGlzLnR5cGU9dGhpcy5hc0NvbnRlbnRUeXBlKHdvcmRNb2RlbClcclxuXHRcdHRoaXMuY29udGVudFByb3BzPXt9XHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBleHRyYWN0IGluZm9ybWF0aW9uIGZyb20gd29yZE1vZGVsXHJcblx0ICovXHJcblx0dmlzaXQoKXtcclxuXHRcdGlmKHRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKXtcclxuXHRcdFx0bGV0IHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcclxuXHRcdFx0aWYoc3R5bGUpe1xyXG5cdFx0XHRcdGxldCB2aXNpdG9yPW5ldyBTdHlsZSgpXHJcblx0XHRcdFx0c3R5bGUucGFyc2UoW3Zpc2l0b3JdKVxyXG5cdFx0XHRcdHRoaXMuY29udGVudFByb3BzLmNvbnRlbnRTdHlsZT12aXNpdG9yLnN0eWxlXHJcblx0XHRcdFx0dmlzaXRvci5zdHlsZS5tZXRhZGF0YT17YmFzZWRPbjp0aGlzLndvcmRNb2RlbC5nZXRTdHlsZUlkKCl9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzQ29udGVudFR5cGUod29yZE1vZGVsKXtcclxuXHRcdGxldCB0eXBlPXdvcmRNb2RlbC50eXBlXHJcblx0XHRpZih0eXBlKVxyXG5cdFx0XHRyZXR1cm4gdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0eXBlLnN1YnN0cigxKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gXCIqXCJcclxuXHR9XHJcblxyXG5cdGFwcGVuZENoaWxkKHdvcmRNb2RlbCl7XHJcblx0XHRsZXQgdHlwZT10aGlzLmFzQ29udGVudFR5cGUod29yZE1vZGVsKVxyXG5cdFx0aWYoQ29udGVudFt0eXBlXSl7XHJcblx0XHRcdGxldCBNb2RlbFR5cGU9TW9kZWxzW3R5cGVdXHJcblx0XHRcdGxldCBhcHBlbmRlZD1Nb2RlbFR5cGUgPyBuZXcgTW9kZWxUeXBlKHdvcmRNb2RlbCx0aGlzKSA6IG5ldyBNb2RlbCh3b3JkTW9kZWwsIHRoaXMpXHJcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChhcHBlbmRlZClcclxuXHRcdFx0cmV0dXJuIGFwcGVuZGVkXHJcblx0XHR9IGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXNcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHlvdSdkIGJldHRlciBOT1QgZXh0cmFjdCBpbmZvIGZyb20gd29yZE1vZGVsXHJcblx0ICogTWF5YmUgZXJyb3Igc2luY2UgcGFyc2UgY29udGV4dCBpcyByZWxlYXNlZFxyXG5cdCAqL1xyXG5cdGNyZWF0ZVJlYWN0RWxlbWVudChuYW1lc3BhY2Upe1xyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdG5hbWVzcGFjZVt0aGlzLnR5cGVdLFxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcyxcclxuXHRcdFx0dGhpcy5jaGlsZHJlbi5tYXAoYT0+YS5jcmVhdGVSZWFjdEVsZW1lbnQobmFtZXNwYWNlKSkpXHJcblx0fVxyXG59XHJcbiJdfQ==