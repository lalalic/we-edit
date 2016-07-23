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
			if (wordModel.id) this.contentProps.documentStyles[wordModel.id] = styleVisitor.style;else this.contentProps.directStyle = styleVisitor.style;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssWUFBTCxDQUFrQixjQUFsQixHQUFpQyxJQUFJLE1BQUosRUFBakMsQ0FGWTs7RUFBYjs7OzsyQkFLUyxXQUFVO0FBQ2xCLE9BQUksZUFBYSxvQkFBVSxTQUFWLEVBQXFCLElBQXJCLENBQWIsQ0FEYztBQUVsQixPQUFHLFVBQVUsRUFBVixFQUNGLEtBQUssWUFBTCxDQUFrQixjQUFsQixDQUFpQyxVQUFVLEVBQVYsQ0FBakMsR0FBK0MsYUFBYSxLQUFiLENBRGhELEtBR0MsS0FBSyxZQUFMLENBQWtCLFdBQWxCLEdBQThCLGFBQWEsS0FBYixDQUgvQjs7QUFLQSxVQUFPLFlBQVAsQ0FQa0I7Ozs7Z0NBVU47OztBQUNaLFVBQU8sOEJBQUssWUFBTCxDQUFrQixjQUFsQixFQUFpQyxXQUFqQyw4QkFBZ0QsU0FBaEQsQ0FBUCxDQURZOzs7O3dDQUlTLE1BQUs7QUFDMUIsVUFBTyxLQUFLLFlBQUwsQ0FBa0IsY0FBbEIsQ0FBaUMsVUFBakMsQ0FBNEMsSUFBNUMsRUFBa0QsUUFBbEQsQ0FBMkQsRUFBM0QsQ0FEbUI7Ozs7Ozs7OztJQUt0Qjs7Ozs7Ozs2QkFDTSxNQUFLO0FBQ2YsT0FBSSxTQUFPLElBQVAsQ0FEVztBQUVmLE9BQUksS0FBRyxPQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLElBQXBCLENBQXlCLGFBQUc7QUFDbEMsUUFBSSxPQUFLLE9BQU8sQ0FBUCxFQUFVLFFBQVYsQ0FEeUI7QUFFbEMsUUFBRyxDQUFDLElBQUQsRUFDRixPQUFPLEtBQVAsQ0FERCxLQUdDLE9BQU8sS0FBSyxJQUFMLElBQVcsSUFBWCxJQUFtQixLQUFLLFNBQUwsQ0FIM0I7SUFGK0IsQ0FBNUIsQ0FGVztBQVNmLFVBQU8s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TixDQUREO0lBRkQ7O0FBTUEsVUFBTyxLQUFQLENBYmlCOzs7O3dCQWlCWixZQUFXO0FBQ2hCLE9BQUksY0FBSixDQURnQjtBQUVoQixPQUFHLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFILEVBQ0Msb0NBckJHLHFEQXFCbUIsVUFBdEIsQ0FERCxLQUdDLFFBQU0sS0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBTixDQUhEOztBQUtBLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUksVUFBUSxLQUFLLFVBQUwsRUFBUixDQURlO0FBRW5CLFFBQUcsV0FBVyxRQUFRLEtBQVIsRUFDYixRQUFNLFFBQVEsS0FBUixnQkFBaUIsU0FBakIsQ0FBTixDQUREO0lBRkQ7O0FBTUEsVUFBTyxLQUFQLENBYmdCOzs7O1FBbEJaO0VBQXFCOztJQW1DckI7Ozs7Ozs7Ozs7RUFBMEI7O0lBSTFCOzs7Ozs7Ozs7O0VBQXlCOztJQUd6Qjs7Ozs7Ozs7OztFQUFzQjs7SUFJdEI7Ozs7Ozs7Ozs7O3VCQUNBLE9BQU07QUFDVixPQUFHLE1BQU0sUUFBTixDQUFlLFVBQWYsQ0FBSCxFQUNDLG1DQUhHLG1EQUdrQixVQUFyQixDQUREOzs7OzBCQUlPLE9BQU07QUFDYixPQUFHLE1BQU0sUUFBTixDQUFlLFNBQWYsQ0FBSCxFQUNDLG1DQVJHLHNEQVFxQixVQUF4QixDQUREOzs7O1FBUEk7RUFBcUI7O0lBWXJCOzs7Ozs7Ozs7O0VBQTBCOztJQUkxQjs7Ozs7Ozs7OztFQUF5Qjs7SUFHekI7Ozs7Ozs7Ozs7RUFBdUI7O0lBSXZCOzs7Ozs7Ozs7O0VBQXdCOztJQUl4Qjs7Ozs7Ozs7OztFQUF3Qjs7SUFJeEI7Ozs7Ozs7Ozs7RUFBdUI7O0lBSXZCOzs7Ozs7Ozs7O0VBQXdCOztJQUl4Qjs7Ozs7Ozs7OztFQUF3QiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbCBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29udGVudFByb3BzLmRvY3VtZW50U3R5bGVzPW5ldyBTdHlsZXMoKVxyXG5cdH1cclxuXHJcblx0YWRkU3R5bGUod29yZE1vZGVsKXtcclxuXHRcdGxldCBzdHlsZVZpc2l0b3I9bmV3IFN0eWxlKHdvcmRNb2RlbCwgdGhpcylcclxuXHRcdGlmKHdvcmRNb2RlbC5pZClcclxuXHRcdFx0dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXNbd29yZE1vZGVsLmlkXT1zdHlsZVZpc2l0b3Iuc3R5bGVcclxuXHRcdGVsc2VcclxuXHRcdFx0dGhpcy5jb250ZW50UHJvcHMuZGlyZWN0U3R5bGU9c3R5bGVWaXNpdG9yLnN0eWxlXHJcblxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHJcblx0Y3JlYXRlU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5jcmVhdGVTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRnZXRUeXBlRGVmYXVsdFN0eWxlSWQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXMuZ2V0RGVmYXVsdCh0eXBlKS5tZXRhZGF0YS5pZFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgU3R5bGVze1xyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRsZXQgc3R5bGVzPXRoaXNcclxuXHRcdGxldCBpZD1PYmplY3Qua2V5cyhzdHlsZXMpLmZpbmQoYT0+e1xyXG5cdFx0XHRsZXQgbWV0YT1zdHlsZXNbYV0ubWV0YWRhdGFcclxuXHRcdFx0aWYoIW1ldGEpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbWV0YS50eXBlPT10eXBlICYmIG1ldGEuaXNEZWZhdWx0XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN0eWxlc1tpZF1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVN0eWxlKHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAndGFibGUnOlxyXG5cdFx0Y2FzZSAnc3R5bGUudGFibGUnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFRhYmxlU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdzZUNlbGwnOmNhc2UgJ3N3Q2VsbCc6IGNhc2UgJ25lQ2VsbCc6IGNhc2UgJ253Q2VsbCc6XHJcblx0XHRcdHJldHVybiBuZXcgQ2VsbFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnZmlyc3RSb3cnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IEZpcnN0Um93U3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdsYXN0Um93JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBMYXN0Um93U3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdmaXJzdENvbCc6XHJcblx0XHRcdHJldHVybiBuZXcgRmlyc3RDb2xTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ2xhc3RDb2wnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IExhc3RDb2xTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ2JhbmQySG9yeic6XHJcblx0XHRcdHJldHVybiBuZXcgQmFuZDJIU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdiYW5kMUhvcnonOlxyXG5cdFx0XHRyZXR1cm4gbmV3IEJhbmQxSFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnQmFuZDJWZXJ0JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBCYW5kMlZTdHlsZUluZm8odGhpcylcclxuXHRcdGNhc2UgJ0JhbmQxVmVydCc6XHJcblx0XHRcdHJldHVybiBuZXcgQmFuZDFWU3R5bGVJbmZvKHRoaXMpXHJcblx0XHRjYXNlICdyb3cnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFJvd1N0eWxlSW5mbyh0aGlzKVxyXG5cdFx0Y2FzZSAnY2VsbCc6XHJcblx0XHRcdHJldHVybiBuZXcgQ2VsbFN0eWxlSW5mbyh0aGlzKVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZUluZm8odGhpcylcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFN0eWxlSW5mb3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMpe1xyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCl7XHJcblx0XHRsZXQgdmFsdWU9cGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChwLGtleSk9PnAgPyBwW2tleV0gOiBwLHRoaXMpXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHR2YWx1ZT10aGlzLmdldEZyb21CYXNlZE9uKC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0Z2V0QmFzZWRPbigpe1xyXG5cdFx0Y29uc3Qge2Jhc2VkT259PXRoaXMubWV0YWRhdGF8fHt9XHJcblx0XHRpZihiYXNlZE9uKXtcclxuXHRcdFx0c3dpdGNoKHR5cGVvZihiYXNlZE9uKSl7XHJcblx0XHRcdGNhc2UgJ3N0cmluZyc6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzW2Jhc2VkT25dXHJcblx0XHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdFx0cmV0dXJuIGJhc2VkT25cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RnJvbUJhc2VkT24ocGF0aCl7XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcbn1cclxuLyoqXHJcbiAqIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxyXG4gKiBUaGUgY29uZGl0aW9uYWwgZm9ybWF0cyBhcmUgYXBwbGllZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxyXG5cdD5XaG9sZSB0YWJsZS90YWJsZVxyXG5cdD5CYW5kZWQgY29sdW1ucy9iYW5kMVZlcnQgLCBldmVuIGNvbHVtbiBiYW5kaW5nL2JhbmQyVmVydFxyXG5cdD5CYW5kZWQgcm93cy9iYW5kMUhvcnogLCBldmVuIHJvdyBiYW5kaW5nL2JhbmQySG9yelxyXG5cdD5GaXJzdCByb3cvZmlyc3RSb3cgLCBsYXN0IHJvdy9sYXN0Um93XHJcblx0PkZpcnN0IGNvbHVtbi9maXJzdENvbCwgbGFzdCBjb2x1bW4vbGFzdENvbFxyXG5cdD5Ub3AgbGVmdC9ud0NlbGwsIHRvcCByaWdodC9uZUNlbGwsIGJvdHRvbSBsZWZ0L3N3Q2VsbCwgYm90dG9tIHJpZ2h0L3NlQ2VsbFxyXG4gKi9cclxubGV0IFBSSU9SSVpFRD0nc2VDZWxsLHN3Q2VsbCxuZUNlbGwsbndDZWxsLGxhc3RDb2wsZmlyc3RDb2wsbGFzdFJvdyxmaXJzdFJvdyxiYW5kMkhvcnosYmFuZDFIb3J6LGJhbmQyVmVydCxiYW5kMVZlcnQnLnNwbGl0KCcsJylcclxuXHJcblxyXG5jbGFzcyBTdHlsZVdpdGhUYWJsZUJvcmRlckluZm8gZXh0ZW5kcyBTdHlsZUluZm97XHJcblx0Z2V0Qm9yZGVyKGNvbmRpdGlvbnMpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmlnaHQ6dGhpcy5fcmlnaHQoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRsZWZ0OiB0aGlzLl9sZWZ0KC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0dG9wOiB0aGlzLl90b3AoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRib3R0b206IHRoaXMuX2JvdHRvbSguLi5hcmd1bWVudHMpfHx7c3o6MH1cclxuXHRcdH1cclxuXHR9XHJcblx0X2dldChwYXRoKXtcclxuXHRcdHJldHVybiBwYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+cCA/IHBba2V5XSA6IHAsdGhpcylcclxuXHR9XHJcblxyXG5cdF8xYm9yZGVyKHR5cGUpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMuX2dldCh0eXBlKVxyXG5cdFx0aWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHZhbHVlLnZhbD09J25pbCcpXHJcblx0XHRcdFx0cmV0dXJuIHtzejowfVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2PXRoaXMuXzFib3JkZXIoJ2JvcmRlci5yaWdodCcpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHY9dGhpcy5fMWJvcmRlcignYm9yZGVyLmxlZnQnKVxyXG5cdFx0aWYodiE9dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gdlxyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0X3RvcCgpe1xyXG5cdFx0bGV0IHY9dGhpcy5fMWJvcmRlcignYm9yZGVyLnRvcCcpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl90b3ApXHJcblx0XHRcdHJldHVybiBiYXNlZE9uLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbSgpe1xyXG5cdFx0bGV0IHY9dGhpcy5fMWJvcmRlcignYm9yZGVyLmJvdHRvbScpXHJcblx0XHRpZih2IT11bmRlZmluZWQpXHJcblx0XHRcdHJldHVybiB2XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9ib3R0b20pXHJcblx0XHRcdHJldHVybiBiYXNlZE9uLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVGFibGVTdHlsZUluZm8gZXh0ZW5kcyBTdHlsZVdpdGhUYWJsZUJvcmRlckluZm97XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuY29uZGl0aW9ucz17fVxyXG5cdH1cclxuXHRnZXQocGF0aCwgY29uZGl0aW9ucz1bXSl7XHJcblx0XHRsZXQgY29uZGl0aW9uU3R5bGVzPXRoaXMuY29uZGl0aW9uc1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZGl0aW9uKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRpZihjb25kaXRpb25TdHlsZXMpe1xyXG5cdFx0XHRcdGxldCBjb25kaXRpb25TdHlsZT1jb25kaXRpb25TdHlsZXNbY29uZGl0aW9uXVxyXG5cdFx0XHRcdGlmKGNvbmRpdGlvblN0eWxlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGNvbmRpdGlvblN0eWxlLmdldChwYXRoKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0cmV0dXJuIHN1cGVyLmdldCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0cHJpb3JpemUoY29uZGl0aW9ucyl7XHJcblx0XHRjb25kaXRpb25zLnNvcnQoKGEsYik9PlBSSU9SSVpFRC5pbmRleE9mKGEpLVBSSU9SSVpFRC5pbmRleE9mKGIpKVxyXG5cdFx0cmV0dXJuIGNvbmRpdGlvbnNcclxuXHR9XHJcblxyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX3JpZ2h0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVWJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfbGVmdChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX2xlZnQpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT1zdXBlci5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF90b3AoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXMuY29uZGl0aW9uc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl90b3ApXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXN1cGVyLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX3RvcClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbShjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX2JvdHRvbSlcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9c3VwZXIuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fYm90dG9tKVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgUm93U3R5bGVJbmZvIGV4dGVuZHMgU3R5bGVXaXRoVGFibGVCb3JkZXJJbmZve1xyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdENvbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlVicpXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fcmlnaHQpXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cclxuXHR9XHJcblxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlVicpXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZpcnN0Um93U3R5bGVJbmZvIGV4dGVuZHMgUm93U3R5bGVJbmZve1xyXG5cclxufVxyXG5cclxuY2xhc3MgTGFzdFJvd1N0eWxlSW5mbyBleHRlbmRzIFJvd1N0eWxlSW5mb3tcclxuXHJcbn1cclxuY2xhc3MgQ2VsbFN0eWxlSW5mbyBleHRlbmRzIFN0eWxlV2l0aFRhYmxlQm9yZGVySW5mb3tcclxuXHJcbn1cclxuXHJcbmNsYXNzIENvbFN0eWxlSW5mbyBleHRlbmRzIFN0eWxlV2l0aFRhYmxlQm9yZGVySW5mb3tcclxuXHRfdG9wKGNvbmRzKXtcclxuXHRcdGlmKGNvbmRzLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX3RvcCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRfYm90dG9tKGNvbmRzKXtcclxuXHRcdGlmKGNvbmRzLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdHJldHVybiBzdXBlci5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZpcnN0Q29sU3R5bGVJbmZvIGV4dGVuZHMgQ29sU3R5bGVJbmZve1xyXG5cclxufVxyXG5cclxuY2xhc3MgTGFzdENvbFN0eWxlSW5mbyBleHRlbmRzIENvbFN0eWxlSW5mb3tcclxuXHJcbn1cclxuY2xhc3MgQmFuZEhTdHlsZUluZm8gZXh0ZW5kcyBSb3dTdHlsZUluZm97XHJcblxyXG59XHJcblxyXG5jbGFzcyBCYW5kMUhTdHlsZUluZm8gZXh0ZW5kcyBCYW5kSFN0eWxlSW5mb3tcclxuXHJcbn1cclxuXHJcbmNsYXNzIEJhbmQySFN0eWxlSW5mbyBleHRlbmRzIEJhbmRIU3R5bGVJbmZve1xyXG5cclxufVxyXG5cclxuY2xhc3MgQmFuZFZTdHlsZUluZm8gZXh0ZW5kcyBDb2xTdHlsZUluZm97XHJcblxyXG59XHJcblxyXG5jbGFzcyBCYW5kMVZTdHlsZUluZm8gZXh0ZW5kcyBCYW5kVlN0eWxlSW5mb3tcclxuXHJcbn1cclxuXHJcbmNsYXNzIEJhbmQyVlN0eWxlSW5mbyBleHRlbmRzIEJhbmRWU3R5bGVJbmZve1xyXG5cclxufVxyXG4iXX0=