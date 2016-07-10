"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
			return this.contentProps.documentStyles.createStyle();
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
		value: function createStyle() {
			return new StyleInfo(this);
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
			var value = path.split(".").reduce(function (p, key) {
				return p ? p[key] : p;
			}, this);
			if (value == undefined) {
				var basedOn = this.metadata.basedOn;

				if (basedOn) {
					switch (typeof basedOn === "undefined" ? "undefined" : _typeof(basedOn)) {
						case 'string':
							return this.styles[basedOn].get(path);
						case 'object':
							return basedOn.get(path);
					}
				}
			}
			return value;
		}
	}]);

	return StyleInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssWUFBTCxDQUFrQixjQUFsQixHQUFpQyxJQUFJLE1BQUosRUFBakMsQ0FGWTs7RUFBYjs7OzsyQkFLUyxXQUFVO0FBQ2xCLE9BQUksZUFBYSxvQkFBVSxTQUFWLEVBQXFCLElBQXJCLENBQWIsQ0FEYztBQUVsQixPQUFHLFVBQVUsRUFBVixFQUNGLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxVQUFVLEVBQVYsQ0FBakMsR0FBK0MsYUFBYSxLQUFiLENBRGhELEtBR0MsS0FBSyxZQUFMLENBQWtCLFlBQWxCLEdBQStCLGFBQWEsS0FBYixDQUhoQzs7QUFLQSxVQUFPLFlBQVAsQ0FQa0I7Ozs7Z0NBVU47QUFDWixVQUFPLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxXQUFqQyxFQUFQLENBRFk7Ozs7d0NBSVMsTUFBSztBQUMxQixVQUFPLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxVQUFqQyxDQUE0QyxJQUE1QyxFQUFrRCxRQUFsRCxDQUEyRCxFQUEzRCxDQURtQjs7Ozs7Ozs7O0lBS3RCOzs7Ozs7OzZCQUNNLE1BQUs7QUFDZixPQUFJLFNBQU8sSUFBUCxDQURXO0FBRWYsT0FBSSxLQUFHLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBeUIsYUFBRztBQUNsQyxRQUFJLE9BQUssT0FBTyxDQUFQLEVBQVUsUUFBVixDQUR5QjtBQUVsQyxRQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sS0FBUCxDQURELEtBR0MsT0FBTyxLQUFLLElBQUwsSUFBVyxJQUFYLElBQW1CLEtBQUssU0FBTCxDQUgzQjtJQUYrQixDQUE1QixDQUZXO0FBU2YsVUFBTyxPQUFPLEVBQVAsQ0FBUCxDQVRlOzs7O2dDQVlIO0FBQ1osVUFBTyxJQUFJLFNBQUosQ0FBYyxJQUFkLENBQVAsQ0FEWTs7OztRQWJSOzs7SUFrQkE7QUFDTCxVQURLLFNBQ0wsQ0FBWSxNQUFaLEVBQW1CO3dCQURkLFdBQ2M7O0FBQ2xCLE9BQUssTUFBTCxHQUFZLE1BQVosQ0FEa0I7RUFBbkI7O2NBREs7O3NCQUtELE1BQUs7QUFDUixPQUFJLFFBQU0sS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixNQUFoQixDQUF1QixVQUFDLENBQUQsRUFBRyxHQUFIO1dBQVMsSUFBSSxFQUFFLEdBQUYsQ0FBSixHQUFhLENBQWI7SUFBVCxFQUF3QixJQUEvQyxDQUFOLENBREk7QUFFUixPQUFHLFNBQU8sU0FBUCxFQUFpQjtRQUNaLFVBQVMsS0FBSyxRQUFMLENBQVQsUUFEWTs7QUFFbkIsUUFBRyxPQUFILEVBQVc7QUFDVixvQkFBYyx3REFBZDtBQUNBLFdBQUssUUFBTDtBQUNDLGNBQU8sS0FBSyxNQUFMLENBQVksT0FBWixFQUFxQixHQUFyQixDQUF5QixJQUF6QixDQUFQLENBREQ7QUFEQSxXQUdLLFFBQUw7QUFDQyxjQUFPLFFBQVEsR0FBUixDQUFZLElBQVosQ0FBUCxDQUREO0FBSEEsTUFEVTtLQUFYO0lBRkQ7QUFXQSxVQUFPLEtBQVAsQ0FiUTs7OztRQUxKIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXM9bmV3IFN0eWxlcygpXHJcblx0fVxyXG5cclxuXHRhZGRTdHlsZSh3b3JkTW9kZWwpe1xyXG5cdFx0bGV0IHN0eWxlVmlzaXRvcj1uZXcgU3R5bGUod29yZE1vZGVsLCB0aGlzKVxyXG5cdFx0aWYod29yZE1vZGVsLmlkKVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1t3b3JkTW9kZWwuaWRdPXN0eWxlVmlzaXRvci5zdHlsZVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9c3R5bGVWaXNpdG9yLnN0eWxlXHJcblxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5jcmVhdGVTdHlsZSgpXHJcblx0fVxyXG5cclxuXHRnZXRUeXBlRGVmYXVsdFN0eWxlSWQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKS5tZXRhZGF0YS5pZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3R5bGVze1xyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRsZXQgc3R5bGVzPXRoaXNcclxuXHRcdGxldCBpZD1PYmplY3Qua2V5cyhzdHlsZXMpLmZpbmQoYT0+e1xyXG5cdFx0XHRsZXQgbWV0YT1zdHlsZXNbYV0ubWV0YWRhdGFcclxuXHRcdFx0aWYoIW1ldGEpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbWV0YS50eXBlPT10eXBlICYmIG1ldGEuaXNEZWZhdWx0XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN0eWxlc1tpZF1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVN0eWxlKCl7XHJcblx0XHRyZXR1cm4gbmV3IFN0eWxlSW5mbyh0aGlzKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3R5bGVJbmZve1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlcyl7XHJcblx0XHR0aGlzLnN0eWxlcz1zdHlsZXNcclxuXHR9XHJcblxyXG5cdGdldChwYXRoKXtcclxuXHRcdGxldCB2YWx1ZT1wYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+cCA/IHBba2V5XSA6IHAsdGhpcylcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRjb25zdCB7YmFzZWRPbn09dGhpcy5tZXRhZGF0YVxyXG5cdFx0XHRpZihiYXNlZE9uKXtcclxuXHRcdFx0XHRzd2l0Y2godHlwZW9mKGJhc2VkT24pKXtcclxuXHRcdFx0XHRjYXNlICdzdHJpbmcnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzW2Jhc2VkT25dLmdldChwYXRoKVxyXG5cdFx0XHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gYmFzZWRPbi5nZXQocGF0aClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxufVxyXG4iXX0=