"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
				case 'table':
				case 'style.table':
					return new TableStyleInfo(this);
				case 'seCell':case 'swCell':case 'neCell':case 'nwCell':
					return new CellStyleInfo(this);
				case 'firstRow':
					return new FirstRowStyleInfo(this);
				case 'lastRow':
					return new LastRowStyleInfo(this);
				case 'firstCol':
					return new FirstColStyleInfo(this);
				case 'lastCol':
					return new LastColStyleInfo(this);
				case 'band2Horz':
					return new Band2HStyleInfo(this);
				case 'band1Horz':
					return new Band1HStyleInfo(this);
				case 'Band2Vert':
					return new Band2VStyleInfo(this);
				case 'Band1Vert':
					return new Band1VStyleInfo(this);
				case 'row':
					return new RowStyleInfo(this);
				case 'cell':
					return new CellStyleInfo(this);
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
			var value = path.split(".").reduce(function (p, key) {
				return p ? p[key] : p;
			}, this);
			if (value == undefined) value = this.getFromBasedOn.apply(this, arguments);
			return value;
		}
	}, {
		key: "getBasedOn",
		value: function getBasedOn() {
			var _ref = this.metadata || {};

			var basedOn = _ref.basedOn;

			if (basedOn) {
				switch (typeof basedOn === "undefined" ? "undefined" : _typeof(basedOn)) {
					case 'string':
						return this.styles[basedOn];
					case 'object':
						return basedOn;
				}
			}
		}
	}, {
		key: "getFromBasedOn",
		value: function getFromBasedOn(path) {
			var basedOn = this.getBasedOn();
			if (basedOn) return basedOn.get.apply(basedOn, arguments);
			return undefined;
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


var PRIORIZED = 'seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',');

var StyleWithTableBorderInfo = function (_StyleInfo) {
	_inherits(StyleWithTableBorderInfo, _StyleInfo);

	function StyleWithTableBorderInfo() {
		_classCallCheck(this, StyleWithTableBorderInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(StyleWithTableBorderInfo).apply(this, arguments));
	}

	_createClass(StyleWithTableBorderInfo, [{
		key: "getBorder",
		value: function getBorder(conditions) {
			return {
				right: this._right.apply(this, arguments) || { sz: 0 },
				left: this._left.apply(this, arguments) || { sz: 0 },
				top: this._top.apply(this, arguments) || { sz: 0 },
				bottom: this._bottom.apply(this, arguments) || { sz: 0 }
			};
		}
	}, {
		key: "_get",
		value: function _get(path) {
			return path.split(".").reduce(function (p, key) {
				return p ? p[key] : p;
			}, this);
		}
	}, {
		key: "_1border",
		value: function _1border(type) {
			var value = this._get(type);
			if (value != undefined) {
				if (value.val == 'nil') return { sz: 0 };
				return value;
			}
		}
	}, {
		key: "_right",
		value: function _right(conditions) {
			var v = this._1border('border.right');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._right) return basedOn._right.apply(basedOn, arguments);
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var v = this._1border('border.left');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._left) return basedOn._left.apply(basedOn, arguments);
		}
	}, {
		key: "_top",
		value: function _top() {
			var v = this._1border('border.top');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._top) return basedOn._top.apply(basedOn, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom() {
			var v = this._1border('border.bottom');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._bottom) return basedOn._bottom.apply(basedOn, arguments);
		}
	}]);

	return StyleWithTableBorderInfo;
}(StyleInfo);

var TableStyleInfo = function (_StyleWithTableBorder) {
	_inherits(TableStyleInfo, _StyleWithTableBorder);

	function TableStyleInfo() {
		_classCallCheck(this, TableStyleInfo);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TableStyleInfo).apply(this, arguments));

		_this3.conditions = {};
		return _this3;
	}

	_createClass(TableStyleInfo, [{
		key: "get",
		value: function get(path) {
			var conditions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			var conditionStyles = this.conditions;
			var value = this.priorize(conditions).reduce(function (found, condition) {
				if (found != undefined) return found;
				if (conditionStyles) {
					var conditionStyle = conditionStyles[condition];
					if (conditionStyle) return conditionStyle.get(path);
				}
				return found;
			}, undefined);

			if (value == undefined) return _get2(Object.getPrototypeOf(TableStyleInfo.prototype), "get", this).apply(this, arguments);else return value;
		}
	}, {
		key: "priorize",
		value: function priorize(conditions) {
			conditions.sort(function (a, b) {
				return PRIORIZED.indexOf(a) - PRIORIZED.indexOf(b);
			});
			return conditions;
		}
	}, {
		key: "_right",
		value: function _right(conditions) {
			var _this4 = this,
			    _arguments = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this4.conditions[cond];
				if (condStyle && condStyle._right) return condStyle._right.apply(condStyle, _arguments);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('lastCol')) value = _get2(Object.getPrototypeOf(TableStyleInfo.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._right) value = basedOn._right.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var _this5 = this,
			    _arguments2 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this5.conditions[cond];
				if (condStyle && condStyle._left) return condStyle._left.apply(condStyle, _arguments2);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('firstCol')) value = _get2(Object.getPrototypeOf(TableStyleInfo.prototype), "_left", this).apply(this, arguments);else value = this._1border('border.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._left) value = basedOn._left.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_top",
		value: function _top(conditions) {
			var _this6 = this,
			    _arguments3 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this6.conditions[cond];
				if (condStyle && condStyle._top) return condStyle._top.apply(condStyle, _arguments3);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('firstRow')) value = _get2(Object.getPrototypeOf(TableStyleInfo.prototype), "_top", this).apply(this, arguments);else value = this._1border('border.insideH');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._top) value = basedOn._top.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_bottom",
		value: function _bottom(conditions) {
			var _this7 = this,
			    _arguments4 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this7.conditions[cond];
				if (condStyle && condStyle._bottom) return condStyle._bottom.apply(condStyle, _arguments4);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('lastRow')) value = _get2(Object.getPrototypeOf(TableStyleInfo.prototype), "_bottom", this).apply(this, arguments);else value = this._1border('border.insideH');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._bottom) value = basedOn._bottom.apply(basedOn, arguments);
			}

			return value;
		}
	}]);

	return TableStyleInfo;
}(StyleWithTableBorderInfo);

var RowStyleInfo = function (_StyleWithTableBorder2) {
	_inherits(RowStyleInfo, _StyleWithTableBorder2);

	function RowStyleInfo() {
		_classCallCheck(this, RowStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RowStyleInfo).apply(this, arguments));
	}

	_createClass(RowStyleInfo, [{
		key: "_right",
		value: function _right(conditions) {
			var value = void 0;
			if (conditions.includes('lastCol')) value = _get2(Object.getPrototypeOf(RowStyleInfo.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._right) value = basedOn._right.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var value = void 0;
			if (conditions.includes('firstCol')) value = _get2(Object.getPrototypeOf(RowStyleInfo.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._left) value = basedOn._left.apply(basedOn, arguments);
			}

			return value;
		}
	}]);

	return RowStyleInfo;
}(StyleWithTableBorderInfo);

var FirstRowStyleInfo = function (_RowStyleInfo) {
	_inherits(FirstRowStyleInfo, _RowStyleInfo);

	function FirstRowStyleInfo() {
		_classCallCheck(this, FirstRowStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FirstRowStyleInfo).apply(this, arguments));
	}

	return FirstRowStyleInfo;
}(RowStyleInfo);

var LastRowStyleInfo = function (_RowStyleInfo2) {
	_inherits(LastRowStyleInfo, _RowStyleInfo2);

	function LastRowStyleInfo() {
		_classCallCheck(this, LastRowStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(LastRowStyleInfo).apply(this, arguments));
	}

	return LastRowStyleInfo;
}(RowStyleInfo);

var CellStyleInfo = function (_StyleWithTableBorder3) {
	_inherits(CellStyleInfo, _StyleWithTableBorder3);

	function CellStyleInfo() {
		_classCallCheck(this, CellStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CellStyleInfo).apply(this, arguments));
	}

	return CellStyleInfo;
}(StyleWithTableBorderInfo);

var ColStyleInfo = function (_StyleWithTableBorder4) {
	_inherits(ColStyleInfo, _StyleWithTableBorder4);

	function ColStyleInfo() {
		_classCallCheck(this, ColStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ColStyleInfo).apply(this, arguments));
	}

	_createClass(ColStyleInfo, [{
		key: "_top",
		value: function _top(conds) {
			if (conds.includes('firstRow')) return _get2(Object.getPrototypeOf(ColStyleInfo.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conds) {
			if (conds.includes('lastRow')) return _get2(Object.getPrototypeOf(ColStyleInfo.prototype), "_bottom", this).apply(this, arguments);
		}
	}]);

	return ColStyleInfo;
}(StyleWithTableBorderInfo);

var FirstColStyleInfo = function (_ColStyleInfo) {
	_inherits(FirstColStyleInfo, _ColStyleInfo);

	function FirstColStyleInfo() {
		_classCallCheck(this, FirstColStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FirstColStyleInfo).apply(this, arguments));
	}

	return FirstColStyleInfo;
}(ColStyleInfo);

var LastColStyleInfo = function (_ColStyleInfo2) {
	_inherits(LastColStyleInfo, _ColStyleInfo2);

	function LastColStyleInfo() {
		_classCallCheck(this, LastColStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(LastColStyleInfo).apply(this, arguments));
	}

	return LastColStyleInfo;
}(ColStyleInfo);

var BandHStyleInfo = function (_RowStyleInfo3) {
	_inherits(BandHStyleInfo, _RowStyleInfo3);

	function BandHStyleInfo() {
		_classCallCheck(this, BandHStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BandHStyleInfo).apply(this, arguments));
	}

	return BandHStyleInfo;
}(RowStyleInfo);

var Band1HStyleInfo = function (_BandHStyleInfo) {
	_inherits(Band1HStyleInfo, _BandHStyleInfo);

	function Band1HStyleInfo() {
		_classCallCheck(this, Band1HStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Band1HStyleInfo).apply(this, arguments));
	}

	return Band1HStyleInfo;
}(BandHStyleInfo);

var Band2HStyleInfo = function (_BandHStyleInfo2) {
	_inherits(Band2HStyleInfo, _BandHStyleInfo2);

	function Band2HStyleInfo() {
		_classCallCheck(this, Band2HStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Band2HStyleInfo).apply(this, arguments));
	}

	return Band2HStyleInfo;
}(BandHStyleInfo);

var BandVStyleInfo = function (_ColStyleInfo3) {
	_inherits(BandVStyleInfo, _ColStyleInfo3);

	function BandVStyleInfo() {
		_classCallCheck(this, BandVStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BandVStyleInfo).apply(this, arguments));
	}

	return BandVStyleInfo;
}(ColStyleInfo);

var Band1VStyleInfo = function (_BandVStyleInfo) {
	_inherits(Band1VStyleInfo, _BandVStyleInfo);

	function Band1VStyleInfo() {
		_classCallCheck(this, Band1VStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Band1VStyleInfo).apply(this, arguments));
	}

	return Band1VStyleInfo;
}(BandVStyleInfo);

var Band2VStyleInfo = function (_BandVStyleInfo2) {
	_inherits(Band2VStyleInfo, _BandVStyleInfo2);

	function Band2VStyleInfo() {
		_classCallCheck(this, Band2VStyleInfo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Band2VStyleInfo).apply(this, arguments));
	}

	return Band2VStyleInfo;
}(BandVStyleInfo);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFHQyxtQkFBYTs7O3lGQUNILFlBREc7O0FBRVosUUFBSyxZQUFMLENBQWtCLGNBQWxCLEdBQWlDLElBQUksTUFBSixFQUFqQyxDQUZZOztFQUFiOzs7OzJCQUtTLFdBQVU7QUFDbEIsT0FBSSxlQUFhLG9CQUFVLFNBQVYsRUFBcUIsSUFBckIsQ0FBYixDQURjO0FBRWxCLE9BQUcsVUFBVSxFQUFWLEVBQ0YsS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQVUsRUFBVixDQUFqQyxHQUErQyxhQUFhLEtBQWIsQ0FEaEQsS0FHQyxLQUFLLFlBQUwsQ0FBa0IsWUFBbEIsR0FBK0IsYUFBYSxLQUFiLENBSGhDOztBQUtBLFVBQU8sWUFBUCxDQVBrQjs7OztnQ0FVTjs7O0FBQ1osVUFBTyw4QkFBSyxZQUFMLENBQWtCLGNBQWxCLEVBQWlDLFdBQWpDLDhCQUFnRCxTQUFoRCxDQUFQLENBRFk7Ozs7d0NBSVMsTUFBSztBQUMxQixVQUFPLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxVQUFqQyxDQUE0QyxJQUE1QyxFQUFrRCxRQUFsRCxDQUEyRCxFQUEzRCxDQURtQjs7Ozs7Ozs7O0lBS3RCOzs7Ozs7OzZCQUNNLE1BQUs7QUFDZixPQUFJLFNBQU8sSUFBUCxDQURXO0FBRWYsT0FBSSxLQUFHLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsSUFBcEIsQ0FBeUIsYUFBRztBQUNsQyxRQUFJLE9BQUssT0FBTyxDQUFQLEVBQVUsUUFBVixDQUR5QjtBQUVsQyxRQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sS0FBUCxDQURELEtBR0MsT0FBTyxLQUFLLElBQUwsSUFBVyxJQUFYLElBQW1CLEtBQUssU0FBTCxDQUgzQjtJQUYrQixDQUE1QixDQUZXO0FB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QUFsQixDQUFOLENBREQ7SUFGRDs7QUFNQSxVQUFPLEtBQVAsQ0FiaUI7Ozs7d0JBaUJaLFlBQVc7QUFDaEIsT0FBSSxjQUFKLENBRGdCO0FBRWhCLE9BQUcsV0FBVyxRQUFYLENBQW9CLFVBQXBCLENBQUgsRUFDQyxvQ0FyQkcscURBcUJtQixVQUF0QixDQURELEtBR0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUFOLENBSEQ7O0FBS0EsT0FBRyxTQUFPLFNBQVAsRUFBaUI7QUFDbkIsUUFBSSxVQUFRLEtBQUssVUFBTCxFQUFSLENBRGU7QUFFbkIsUUFBRyxXQUFXLFFBQVEsS0FBUixFQUNiLFFBQU0sUUFBUSxLQUFSLGdCQUFpQixTQUFqQixDQUFOLENBREQ7SUFGRDs7QUFNQSxVQUFPLEtBQVAsQ0FiZ0I7Ozs7UUFsQlo7RUFBcUI7O0lBbUNyQjs7Ozs7Ozs7OztFQUEwQjs7SUFJMUI7Ozs7Ozs7Ozs7RUFBeUI7O0lBR3pCOzs7Ozs7Ozs7O0VBQXNCOztJQUl0Qjs7Ozs7Ozs7Ozs7dUJBQ0EsT0FBTTtBQUNWLE9BQUcsTUFBTSxRQUFOLENBQWUsVUFBZixDQUFILEVBQ0MsbUNBSEcsbURBR2tCLFVBQXJCLENBREQ7Ozs7MEJBSU8sT0FBTTtBQUNiLE9BQUcsTUFBTSxRQUFOLENBQWUsU0FBZixDQUFILEVBQ0MsbUNBUkcsc0RBUXFCLFVBQXhCLENBREQ7Ozs7UUFQSTtFQUFxQjs7SUFZckI7Ozs7Ozs7Ozs7RUFBMEI7O0lBSTFCOzs7Ozs7Ozs7O0VBQXlCOztJQUd6Qjs7Ozs7Ozs7OztFQUF1Qjs7SUFJdkI7Ozs7Ozs7Ozs7RUFBd0I7O0lBSXhCOzs7Ozs7Ozs7O0VBQXdCOztJQUl4Qjs7Ozs7Ozs7OztFQUF1Qjs7SUFJdkI7Ozs7Ozs7Ozs7RUFBd0I7O0lBSXhCOzs7Ozs7Ozs7O0VBQXdCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXM9bmV3IFN0eWxlcygpXHJcblx0fVxyXG5cclxuXHRhZGRTdHlsZSh3b3JkTW9kZWwpe1xyXG5cdFx0bGV0IHN0eWxlVmlzaXRvcj1uZXcgU3R5bGUod29yZE1vZGVsLCB0aGlzKVxyXG5cdFx0aWYod29yZE1vZGVsLmlkKVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1t3b3JkTW9kZWwuaWRdPXN0eWxlVmlzaXRvci5zdHlsZVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0aGlzLmNvbnRlbnRQcm9wcy5jb250ZW50U3R5bGU9c3R5bGVWaXNpdG9yLnN0eWxlXHJcblxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5jcmVhdGVTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRnZXRUeXBlRGVmYXVsdFN0eWxlSWQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKS5tZXRhZGF0YS5pZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3R5bGVze1xyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRsZXQgc3R5bGVzPXRoaXNcclxuXHRcdGxldCBpZD1PYmplY3Qua2V5cyhzdHlsZXMpLmZpbmQoYT0+e1xyXG5cdFx0XHRsZXQgbWV0YT1zdHlsZXNbYV0ubWV0YWRhdGFcclxuXHRcdFx0aWYoIW1ldGEpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbWV0YS50eXBlPT10eXBlICYmIG1ldGEuaXNEZWZhdWx0XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN0eWxlc1tpZF1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVN0eWxlKHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAndGFibGUnOlxyXG5cdFx0Y2FzZSAnc3R5bGUudGFibGUnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFRhYmxlU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdzZUNlbGwnOmNhc2UgJ3N3Q2VsbCc6IGNhc2UgJ25lQ2VsbCc6IGNhc2UgJ253Q2VsbCc6XHJcblx0XHRcdHJldHVybiBuZXcgQ2VsbFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnZmlyc3RSb3cnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IEZpcnN0Um93U3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdsYXN0Um93JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBMYXN0Um93U3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdmaXJzdENvbCc6XHJcblx0XHRcdHJldHVybiBuZXcgRmlyc3RDb2xTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ2xhc3RDb2wnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IExhc3RDb2xTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ2JhbmQySG9yeic6XHJcblx0XHRcdHJldHVybiBuZXcgQmFuZDJIU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdiYW5kMUhvcnonOlxyXG5cdFx0XHRyZXR1cm4gbmV3IEJhbmQxSFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnQmFuZDJWZXJ0JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBCYW5kMlZTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ0JhbmQxVmVydCc6XHJcblx0XHRcdHJldHVybiBuZXcgQmFuZDFWU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdyb3cnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFJvd1N0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnY2VsbCc6XHJcblx0XHRcdHJldHVybiBuZXcgQ2VsbFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZUluZm8odGhpcylcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFN0eWxlSW5mb3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMpe1xyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCl7XHJcblx0XHRsZXQgdmFsdWU9cGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChwLGtleSk9PnAgPyBwW2tleV0gOiBwLHRoaXMpXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHR2YWx1ZT10aGlzLmdldEZyb21CYXNlZE9uKC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHRcclxuXHRnZXRCYXNlZE9uKCl7XHJcblx0XHRjb25zdCB7YmFzZWRPbn09dGhpcy5tZXRhZGF0YXx8e31cclxuXHRcdGlmKGJhc2VkT24pe1xyXG5cdFx0XHRzd2l0Y2godHlwZW9mKGJhc2VkT24pKXtcclxuXHRcdFx0Y2FzZSAnc3RyaW5nJzpcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNbYmFzZWRPbl1cclxuXHRcdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0XHRyZXR1cm4gYmFzZWRPblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGdldEZyb21CYXNlZE9uKHBhdGgpe1xyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24pXHJcblx0XHRcdHJldHVybiBiYXNlZE9uLmdldCguLi5hcmd1bWVudHMpXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG59XHJcbi8qKlxyXG4gKiBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcclxuICogVGhlIGNvbmRpdGlvbmFsIGZvcm1hdHMgYXJlIGFwcGxpZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcclxuXHQ+V2hvbGUgdGFibGUvdGFibGVcclxuXHQ+QmFuZGVkIGNvbHVtbnMvYmFuZDFWZXJ0ICwgZXZlbiBjb2x1bW4gYmFuZGluZy9iYW5kMlZlcnQgXHJcblx0PkJhbmRlZCByb3dzL2JhbmQxSG9yeiAsIGV2ZW4gcm93IGJhbmRpbmcvYmFuZDJIb3J6XHJcblx0PkZpcnN0IHJvdy9maXJzdFJvdyAsIGxhc3Qgcm93L2xhc3RSb3dcclxuXHQ+Rmlyc3QgY29sdW1uL2ZpcnN0Q29sLCBsYXN0IGNvbHVtbi9sYXN0Q29sXHJcblx0PlRvcCBsZWZ0L253Q2VsbCwgdG9wIHJpZ2h0L25lQ2VsbCwgYm90dG9tIGxlZnQvc3dDZWxsLCBib3R0b20gcmlnaHQvc2VDZWxsXHJcbiAqL1xyXG5sZXQgUFJJT1JJWkVEPSdzZUNlbGwsc3dDZWxsLG5lQ2VsbCxud0NlbGwsbGFzdENvbCxmaXJzdENvbCxsYXN0Um93LGZpcnN0Um93LGJhbmQySG9yeixiYW5kMUhvcnosYmFuZDJWZXJ0LGJhbmQxVmVydCcuc3BsaXQoJywnKVxyXG5cclxuXHJcbmNsYXNzIFN0eWxlV2l0aFRhYmxlQm9yZGVySW5mbyBleHRlbmRzIFN0eWxlSW5mb3tcclxuXHRnZXRCb3JkZXIoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyaWdodDp0aGlzLl9yaWdodCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdGxlZnQ6IHRoaXMuX2xlZnQoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHR0b3A6IHRoaXMuX3RvcCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdGJvdHRvbTogdGhpcy5fYm90dG9tKC4uLmFyZ3VtZW50cyl8fHtzejowfVxyXG5cdFx0fVxyXG5cdH1cclxuXHRfZ2V0KHBhdGgpe1xyXG5cdFx0cmV0dXJuIHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgocCxrZXkpPT5wID8gcFtrZXldIDogcCx0aGlzKVxyXG5cdH1cclxuXHRcclxuXHRfMWJvcmRlcih0eXBlKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLl9nZXQodHlwZSlcclxuXHRcdGlmKHZhbHVlIT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZih2YWx1ZS52YWw9PSduaWwnKVxyXG5cdFx0XHRcdHJldHVybiB7c3o6MH1cclxuXHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2PXRoaXMuXzFib3JkZXIoJ2JvcmRlci5yaWdodCcpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdj10aGlzLl8xYm9yZGVyKCdib3JkZXIubGVmdCcpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9sZWZ0KVxyXG5cdFx0XHRyZXR1cm4gYmFzZWRPbi5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdF90b3AoKXtcclxuXHRcdGxldCB2PXRoaXMuXzFib3JkZXIoJ2JvcmRlci50b3AnKVxyXG5cdFx0aWYodiE9dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gdlxyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fdG9wKVxyXG5cdFx0XHRyZXR1cm4gYmFzZWRPbi5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0X2JvdHRvbSgpe1xyXG5cdFx0bGV0IHY9dGhpcy5fMWJvcmRlcignYm9yZGVyLmJvdHRvbScpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9ib3R0b20pXHJcblx0XHRcdHJldHVybiBiYXNlZE9uLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVGFibGVTdHlsZUluZm8gZXh0ZW5kcyBTdHlsZVdpdGhUYWJsZUJvcmRlckluZm97XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29uZGl0aW9ucz17fVxyXG5cdH1cclxuXHRnZXQocGF0aCwgY29uZGl0aW9ucz1bXSl7XHJcblx0XHRsZXQgY29uZGl0aW9uU3R5bGVzPXRoaXMuY29uZGl0aW9uc1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZGl0aW9uKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRpZihjb25kaXRpb25TdHlsZXMpe1xyXG5cdFx0XHRcdGxldCBjb25kaXRpb25TdHlsZT1jb25kaXRpb25TdHlsZXNbY29uZGl0aW9uXVxyXG5cdFx0XHRcdGlmKGNvbmRpdGlvblN0eWxlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGNvbmRpdGlvblN0eWxlLmdldChwYXRoKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiBzdXBlci5nZXQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblx0XHJcblx0cHJpb3JpemUoY29uZGl0aW9ucyl7XHJcblx0XHRjb25kaXRpb25zLnNvcnQoKGEsYik9PlBSSU9SSVpFRC5pbmRleE9mKGEpLVBSSU9SSVpFRC5pbmRleE9mKGIpKVxyXG5cdFx0cmV0dXJuIGNvbmRpdGlvbnNcclxuXHR9XHJcblx0XHJcblx0X3JpZ2h0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzLmNvbmRpdGlvbnNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fcmlnaHQpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVWJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fcmlnaHQpXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblx0XHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXMuY29uZGl0aW9uc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9sZWZ0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXN1cGVyLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVWJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cdFxyXG5cdF90b3AoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXMuY29uZGl0aW9uc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl90b3ApXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RSb3cnKSlcclxuXHRcdFx0XHR2YWx1ZT1zdXBlci5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVIJylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fdG9wKVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX3RvcCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHRcclxuXHRfYm90dG9tKGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzLmNvbmRpdGlvbnNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fYm90dG9tKVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHRcdFxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXN1cGVyLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9ib3R0b20pXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5jbGFzcyBSb3dTdHlsZUluZm8gZXh0ZW5kcyBTdHlsZVdpdGhUYWJsZUJvcmRlckluZm97XHJcblx0X3JpZ2h0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVWJylcclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fcmlnaHQpXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdFx0XHJcblx0fVxyXG5cdFxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlVicpXHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX2xlZnQpXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRmlyc3RSb3dTdHlsZUluZm8gZXh0ZW5kcyBSb3dTdHlsZUluZm97XHJcblx0XHJcbn1cclxuXHJcbmNsYXNzIExhc3RSb3dTdHlsZUluZm8gZXh0ZW5kcyBSb3dTdHlsZUluZm97XHJcblx0XHJcbn1cclxuY2xhc3MgQ2VsbFN0eWxlSW5mbyBleHRlbmRzIFN0eWxlV2l0aFRhYmxlQm9yZGVySW5mb3tcclxuXHJcbn1cclxuXHJcbmNsYXNzIENvbFN0eWxlSW5mbyBleHRlbmRzIFN0eWxlV2l0aFRhYmxlQm9yZGVySW5mb3tcclxuXHRfdG9wKGNvbmRzKXtcclxuXHRcdGlmKGNvbmRzLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX3RvcCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdF9ib3R0b20oY29uZHMpe1xyXG5cdFx0aWYoY29uZHMuaW5jbHVkZXMoJ2xhc3RSb3cnKSlcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRmlyc3RDb2xTdHlsZUluZm8gZXh0ZW5kcyBDb2xTdHlsZUluZm97XHJcblx0XHJcbn1cclxuXHJcbmNsYXNzIExhc3RDb2xTdHlsZUluZm8gZXh0ZW5kcyBDb2xTdHlsZUluZm97XHJcblx0XHJcbn1cclxuY2xhc3MgQmFuZEhTdHlsZUluZm8gZXh0ZW5kcyBSb3dTdHlsZUluZm97XHJcblx0XHJcbn1cclxuXHJcbmNsYXNzIEJhbmQxSFN0eWxlSW5mbyBleHRlbmRzIEJhbmRIU3R5bGVJbmZve1xyXG5cdFxyXG59XHJcblxyXG5jbGFzcyBCYW5kMkhTdHlsZUluZm8gZXh0ZW5kcyBCYW5kSFN0eWxlSW5mb3tcclxuXHRcclxufVxyXG5cclxuY2xhc3MgQmFuZFZTdHlsZUluZm8gZXh0ZW5kcyBDb2xTdHlsZUluZm97XHJcblx0XHJcbn1cclxuXHJcbmNsYXNzIEJhbmQxVlN0eWxlSW5mbyBleHRlbmRzIEJhbmRWU3R5bGVJbmZve1xyXG5cdFxyXG59XHJcblxyXG5jbGFzcyBCYW5kMlZTdHlsZUluZm8gZXh0ZW5kcyBCYW5kVlN0eWxlSW5mb3tcclxuXHRcclxufSJdfQ==