"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		_this.contentProps.documentStyles = new Styles();
		return _this;
	}

	_createClass(_class, [{
		key: "addStyle",
		value: function addStyle(wordModel) {
			var styleVisitor = new _style2.default(wordModel, this);
			if (wordModel.id) this.contentProps.documentStyles[wordModel.id] = styleVisitor.style;else this.contentProps.contentStyle = styleVisitor.style;

			return styleVisitor;
		}
	}, {
		key: "createStyle",
		value: function createStyle() {
			var _contentProps$documen;

			return (_contentProps$documen = this.contentProps.documentStyles).createStyle.apply(_contentProps$documen, arguments);
		}
	}, {
		key: "getTypeDefaultStyleId",
		value: function getTypeDefaultStyleId(type) {
			return this.contentProps.documentStyles.getDefault(type).metadata.id;
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;

var Styles = function () {
	function Styles() {
		_classCallCheck(this, Styles);
	}

	_createClass(Styles, [{
		key: "getDefault",
		value: function getDefault(type) {
			var styles = this;
			var id = Object.keys(styles).find(function (a) {
				var meta = styles[a].metadata;
				if (!meta) return false;else return meta.type == type && meta.isDefault;
			});
			return styles[id];
		}
	}, {
		key: "createStyle",
		value: function createStyle(type) {
			switch (type) {
				case 'style.table':
				case 'table':
					return new TableStyleInfo(this);
					break;
				default:
					return new StyleInfo(this);
			}
		}
	}]);

	return Styles;
}();

var StyleInfo = function () {
	function StyleInfo(styles) {
		_classCallCheck(this, StyleInfo);

		this.styles = styles;
	}

	_createClass(StyleInfo, [{
		key: "get",
		value: function get(path) {
			var _styles$basedOn;

			var value = path.split(".").reduce(function (p, key) {
				return p ? p[key] : p;
			}, this);
			if (value == undefined) {
				var _ref = this.metadata || {};

				var basedOn = _ref.basedOn;

				if (basedOn) {
					switch (typeof basedOn === "undefined" ? "undefined" : _typeof(basedOn)) {
						case 'string':
							return (_styles$basedOn = this.styles[basedOn]).get.apply(_styles$basedOn, arguments);
						case 'object':
							return basedOn.get.apply(basedOn, arguments);
					}
				}
			}
			return value;
		}
	}]);

	return StyleInfo;
}();
/**
 * conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 * The conditional formats are applied in the following order:
	>Whole table/table
	>Banded columns/band1Vert , even column banding/band2Vert 
	>Banded rows/band1Horz , even row banding/band2Horz
	>First row/firstRow , last row/lastRow
	>First column/firstCol, last column/lastCol
	>Top left/nwCell, top right/neCell, bottom left/swCell, bottom right/seCell
 */


var TableStyleInfo = function (_StyleInfo) {
	_inherits(TableStyleInfo, _StyleInfo);

	function TableStyleInfo() {
		_classCallCheck(this, TableStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(TableStyleInfo).apply(this, arguments));
	}

	_createClass(TableStyleInfo, [{
		key: "get",
		value: function get(path) {
			var conditions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			var conditionStyles = this.conditions;
			var value = conditions.reduce(function (found, condition) {
				if (found != undefined) return found;
				if (conditionStyles) {
					var conditionStyle = conditionStyles[condition];
					if (conditionStyle) return conditionStyle.get(path);
				}
				return found;
			}, undefined);

			if (value == undefined) return _get(Object.getPrototypeOf(TableStyleInfo.prototype), "get", this).apply(this, arguments);
		}
	}]);

	return TableStyleInfo;
}(StyleInfo);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFHQyxtQkFBYTs7O3lGQUNILFlBREc7O0FBRVosUUFBSyxZQUFMLENBQWtCLGNBQWxCLEdBQWlDLElBQUksTUFBSixFQUFqQyxDQUZZOztFQUFiOzs7OzJCQUtTLFdBQVU7QUFDbEIsT0FBSSxlQUFhLG9CQUFVLFNBQVYsRUFBcUIsSUFBckIsQ0FBYixDQURjO0FBRWxCLE9BQUcsVUFBVSxFQUFWLEVBQ0YsS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQVUsRUFBVixDQUFqQyxHQUErQyxhQUFhLEtBQWIsQ0FEaEQsS0FHQyxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsR0FBK0IsYUFBYSxLQUFiLENBSGhDOztBQUtBLFVBQU8sWUFBUCxDQVBrQjs7OztnQ0FVTjs7O0FBQ1osVUFBTyw4QkFBSyxZQUFMLENBQWtCLGNBQWxCLEVBQWlDLFdBQWpDLDhCQUFnRCxTQUFoRCxDQUFQLENBRFk7Ozs7d0NBSVMsTUFBSztBQUMxQixVQUFPLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxVQUFqQyxDQUE0QyxJQUE1QyxFQUFrRCxRQUFsRCxDQUEyRCxFQUEzRCxDQURtQjs7Ozs7Ozs7O0lBS3RCOzs7Ozs7OzZCQUNNLE1BQUs7QUFDZixPQUFJLFNBQU8sSUFBUCxDQURXO0FBRWYsT0FBSSxLQUFHLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBeUIsYUFBRztBQUNsQyxRQUFJLE9BQUssT0FBTyxDQUFQLEVBQVUsUUFBVixDQUR5QjtBQUVsQyxRQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sS0FBUCxDQURELEtBR0MsT0FBTyxLQUFLLElBQUwsSUFBVyxJQUFYLElBQW1CLEtBQUssU0FBTCxDQUgzQjtJQUYrQixDQUE1QixDQUZXO0FBU2YsVUFBTyxPQUFPLEVBQVAsQ0FBUCxDQVRlOzs7OzhCQVlKLE1BQUs7QUFDaEIsV0FBTyxJQUFQO0FBQ0EsU0FBSyxhQUFMLENBREE7QUFFQSxTQUFLLE9BQUw7QUFDQyxZQUFPLElBQUksY0FBSixDQUFtQixJQUFuQixDQUFQLENBREQ7QUFFQSxXQUZBO0FBRkE7QUFNQyxZQUFPLElBQUksU0FBSixDQUFjLElBQWQsQ0FBUCxDQUREO0FBTEEsSUFEZ0I7Ozs7UUFiWjs7O0lBeUJBO0FBQ0wsVUFESyxTQUNMLENBQVksTUFBWixFQUFtQjt3QkFEZCxXQUNjOztBQUNsQixPQUFLLE1BQUwsR0FBWSxNQUFaLENBRGtCO0VBQW5COztjQURLOztzQkFLRCxNQUFLOzs7QUFDUixPQUFJLFFBQU0sS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixNQUFoQixDQUF1QixVQUFDLENBQUQsRUFBRyxHQUFIO1dBQVMsSUFBSSxFQUFFLEdBQUYsQ0FBSixHQUFhLENBQWI7SUFBVCxFQUF3QixJQUEvQyxDQUFOLENBREk7QUFFUixPQUFHLFNBQU8sU0FBUCxFQUFpQjtlQUNILEtBQUssUUFBTCxJQUFlLEVBQWYsQ0FERzs7UUFDWix1QkFEWTs7QUFFbkIsUUFBRyxPQUFILEVBQVc7QUFDVixvQkFBYyx3REFBZDtBQUNBLFdBQUssUUFBTDtBQUNDLGNBQU8sd0JBQUssTUFBTCxDQUFZLE9BQVosR0FBcUIsR0FBckIsd0JBQTRCLFNBQTVCLENBQVAsQ0FERDtBQURBLFdBR0ssUUFBTDtBQUNDLGNBQU8sUUFBUSxHQUFSLGdCQUFlLFNBQWYsQ0FBUCxDQUREO0FBSEEsTUFEVTtLQUFYO0lBRkQ7QUFXQSxVQUFPLEtBQVAsQ0FiUTs7OztRQUxKOzs7Ozs7Ozs7Ozs7OztJQStCQTs7Ozs7Ozs7Ozs7c0JBQ0QsTUFBb0I7T0FBZCxtRUFBVyxrQkFBRzs7QUFDdkIsT0FBSSxrQkFBZ0IsS0FBSyxVQUFMLENBREc7QUFFdkIsT0FBSSxRQUFNLFdBQVcsTUFBWCxDQUFrQixVQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW9CO0FBQy9DLFFBQUcsU0FBTyxTQUFQLEVBQ0YsT0FBTyxLQUFQLENBREQ7QUFFQSxRQUFHLGVBQUgsRUFBbUI7QUFDbEIsU0FBSSxpQkFBZSxnQkFBZ0IsU0FBaEIsQ0FBZixDQURjO0FBRWxCLFNBQUcsY0FBSCxFQUNDLE9BQU8sZUFBZSxHQUFmLENBQW1CLElBQW5CLENBQVAsQ0FERDtLQUZEO0FBS0EsV0FBTyxLQUFQLENBUitDO0lBQXBCLEVBUzFCLFNBVFEsQ0FBTixDQUZtQjs7QUFhdkIsT0FBRyxTQUFPLFNBQVAsRUFDRixrQ0FmRyxvREFlaUIsVUFBcEIsQ0FERDs7OztRQWRJO0VBQXVCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXM9bmV3IFN0eWxlcygpXHJcblx0fVxyXG5cclxuXHRhZGRTdHlsZSh3b3JkTW9kZWwpe1xyXG5cdFx0bGV0IHN0eWxlVmlzaXRvcj1uZXcgU3R5bGUod29yZE1vZGVsLCB0aGlzKVxyXG5cdFx0aWYod29yZE1vZGVsLmlkKVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1t3b3JkTW9kZWwuaWRdPXN0eWxlVmlzaXRvci5zdHlsZVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9c3R5bGVWaXNpdG9yLnN0eWxlXHJcblxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5jcmVhdGVTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRnZXRUeXBlRGVmYXVsdFN0eWxlSWQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKS5tZXRhZGF0YS5pZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3R5bGVze1xyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRsZXQgc3R5bGVzPXRoaXNcclxuXHRcdGxldCBpZD1PYmplY3Qua2V5cyhzdHlsZXMpLmZpbmQoYT0+e1xyXG5cdFx0XHRsZXQgbWV0YT1zdHlsZXNbYV0ubWV0YWRhdGFcclxuXHRcdFx0aWYoIW1ldGEpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbWV0YS50eXBlPT10eXBlICYmIG1ldGEuaXNEZWZhdWx0XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN0eWxlc1tpZF1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVN0eWxlKHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnc3R5bGUudGFibGUnOlxyXG5cdFx0Y2FzZSAndGFibGUnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFRhYmxlU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZUluZm8odGhpcylcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFN0eWxlSW5mb3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMpe1xyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCl7XHJcblx0XHRsZXQgdmFsdWU9cGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChwLGtleSk9PnAgPyBwW2tleV0gOiBwLHRoaXMpXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0Y29uc3Qge2Jhc2VkT259PXRoaXMubWV0YWRhdGF8fHt9XHJcblx0XHRcdGlmKGJhc2VkT24pe1xyXG5cdFx0XHRcdHN3aXRjaCh0eXBlb2YoYmFzZWRPbikpe1xyXG5cdFx0XHRcdGNhc2UgJ3N0cmluZyc6XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNbYmFzZWRPbl0uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxufVxyXG4vKipcclxuICogY29uZGl0aW9uYWwgZm9ybWF0dGluZzogaHR0cDovL29mZmljZW9wZW54bWwuY29tL1dQc3R5bGVUYWJsZVN0eWxlc0NvbmQucGhwXHJcbiAqIFRoZSBjb25kaXRpb25hbCBmb3JtYXRzIGFyZSBhcHBsaWVkIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6XHJcblx0Pldob2xlIHRhYmxlL3RhYmxlXHJcblx0PkJhbmRlZCBjb2x1bW5zL2JhbmQxVmVydCAsIGV2ZW4gY29sdW1uIGJhbmRpbmcvYmFuZDJWZXJ0IFxyXG5cdD5CYW5kZWQgcm93cy9iYW5kMUhvcnogLCBldmVuIHJvdyBiYW5kaW5nL2JhbmQySG9yelxyXG5cdD5GaXJzdCByb3cvZmlyc3RSb3cgLCBsYXN0IHJvdy9sYXN0Um93XHJcblx0PkZpcnN0IGNvbHVtbi9maXJzdENvbCwgbGFzdCBjb2x1bW4vbGFzdENvbFxyXG5cdD5Ub3AgbGVmdC9ud0NlbGwsIHRvcCByaWdodC9uZUNlbGwsIGJvdHRvbSBsZWZ0L3N3Q2VsbCwgYm90dG9tIHJpZ2h0L3NlQ2VsbFxyXG4gKi9cclxuY2xhc3MgVGFibGVTdHlsZUluZm8gZXh0ZW5kcyBTdHlsZUluZm97XHJcblx0Z2V0KHBhdGgsIGNvbmRpdGlvbnM9W10pe1xyXG5cdFx0bGV0IGNvbmRpdGlvblN0eWxlcz10aGlzLmNvbmRpdGlvbnNcclxuXHRcdGxldCB2YWx1ZT1jb25kaXRpb25zLnJlZHVjZSgoZm91bmQsIGNvbmRpdGlvbik9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0aWYoY29uZGl0aW9uU3R5bGVzKXtcclxuXHRcdFx0XHRsZXQgY29uZGl0aW9uU3R5bGU9Y29uZGl0aW9uU3R5bGVzW2NvbmRpdGlvbl1cclxuXHRcdFx0XHRpZihjb25kaXRpb25TdHlsZSlcclxuXHRcdFx0XHRcdHJldHVybiBjb25kaXRpb25TdHlsZS5nZXQocGF0aClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn0iXX0=