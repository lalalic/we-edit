"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Selector = function () {
	function Selector(docx) {
		_classCallCheck(this, Selector);

		this.docx = docx;
		this.props = new Props(docx);
		this.$ = this.docx.officeDocument.content.bind(this);
	}

	_createClass(Selector, [{
		key: "document",
		value: function document(_ref) {
			var node = _ref.node;

			return Object.assign(this.props.select(node.children.filter(function (a) {
				return a.name != "w:body";
			})), { docx: this.docx });
		}
	}, {
		key: "section",
		value: function section(_ref2) {
			var node = _ref2.node;

			return this.props.select(node.children);
		}
	}, {
		key: "table",
		value: function table(_ref3) {
			var node = _ref3.node;

			return this.props.select(this.$(node).find(">w\\:tblPr>*, >w\\:tblGrid").toArray());
		}
	}, {
		key: "paragraph",
		value: function paragraph(_ref4) {
			var node = _ref4.node;

			return this.props.select(this.$(node).find(">w\\:pPr>*").toArray());
		}
	}, {
		key: "inline",
		value: function inline(_ref5) {
			var node = _ref5.node;

			return this.props.select(this.$(node).find(">w\\:rPr>*").toArray());
		}
	}]);

	return Selector;
}();

exports.default = Selector;

var Props = function () {
	function Props(docx) {
		_classCallCheck(this, Props);

		this.docx = docx;
	}

	_createClass(Props, [{
		key: "select",
		value: function select(nodes) {
			var _this = this;

			return nodes.reduce(function (props, x) {
				var name = x.name.split(":").pop();
				if (_this[name]) props[name] = _this[name](x);
				return props;
			}, {});
		}
	}, {
		key: "pgSz",
		value: function pgSz(x) {
			return {
				width: this.docx.dxa2Px(x.attribs['w:w']),
				height: this.docx.dxa2Px(x.attribs['w:h'])
			};
		}
	}, {
		key: "pgMar",
		value: function pgMar(x) {
			var _this2 = this;

			return Object.keys(x.attribs).reduce(function (value, a) {
				value[a.split(':').pop()] = _this2.docx.dxa2Px(x.attribs[a]);
				return value;
			}, {});
		}
	}, {
		key: "cols",
		value: function cols(x) {
			var _this3 = this;

			var cols = {};
			x.attribs['w:num'] && (cols.num = parseInt(x.attribs['w:num']));
			x.attribs['w:space'] && (cols.space = this.docx.dxa2Px(x.attribs['w:space']));

			cols.data = this.docx.officeDocument.content(x).find("w\\:col").toArray().map(function (col) {
				return {
					width: _this3.docx.dxa2Px(col.attribs['w:w']),
					space: _this3.docx.dxa2Px(col.attribs['w:space'])
				};
			});
			return cols;
		}
	}, {
		key: "_val",
		value: function _val(x) {
			return x.attribs["w:val"];
		}
	}, {
		key: "jc",
		value: function jc(x) {
			return this._val(x);
		}
	}, {
		key: "ind",
		value: function ind(x) {
			var _this4 = this;

			return Object.keys(x.attribs).reduce(function (props, a) {
				props[a.split(":").pop()] = _this4.docx.dxa2Px(x.attribs[a]);
				return props;
			}, {});
		}
	}, {
		key: "spacing",
		value: function spacing(x) {
			return this.toSpacing(x);
		}
	}, {
		key: "pBdr",
		value: function pBdr(x) {
			var _this5 = this;

			return Object.keys(x.attribs).reduce(function (props, a) {
				props[a.split(":").pop()] = _this5.toBorder(x[a][0]);
				return props;
			}, {});
		}
	}, {
		key: "rFonts",
		value: function rFonts(x) {
			var ascii = x['ascii'] || this.officeDocument.fontTheme.get(x['asciiTheme']);
			var asia = x['eastAsia'] || this.officeDocument.fontTheme.get(x['eastAsiaTheme']);

			if (ascii || asia) return { ascii: ascii, asia: asia };
		}
	}, {
		key: "lang",
		value: function lang(x) {
			return this._val(x);
		}
	}, {
		key: "vertAlign",
		value: function vertAlign(x) {
			return this._val(x);
		}
	}, {
		key: "sz",
		value: function sz(x) {
			return this._val(x) / 2;
		}
	}, {
		key: "kern",
		value: function kern(x) {
			return this._val(x) / 2;
		}
	}, {
		key: "w",
		value: function w(x) {
			return this._val(x) / 100.0;
		}
	}, {
		key: "position",
		value: function position(x) {
			return this.dxa2Px(this._val(x));
		}
	}, {
		key: "i",
		value: function i(x) {
			return this.asToggle(x);
		}
	}, {
		key: "u",
		value: function u(x) {
			return this.asToggle(x);
		}
	}, {
		key: "vanish",
		value: function vanish(x) {
			return this.asToggle(x);
		}
	}, {
		key: "smallCaps",
		value: function smallCaps(x) {
			return this.asToggle(x);
		}
	}, {
		key: "b",
		value: function b(x) {
			return this.asToggle(x);
		}
	}, {
		key: "background",
		value: function background(x) {
			return this.toColor(x, 'w:color');
		}
	}, {
		key: "hightlight",
		value: function hightlight(x) {
			return this.toColor(x);
		}
	}, {
		key: "color",
		value: function color(x) {
			return this.toColor(x);
		}
	}, {
		key: "bdx",
		value: function bdx(x) {
			return this.toBorder(x);
		}
	}, {
		key: "tblLook",
		value: function tblLook(x) {
			return this._val(x);
		}
	}, {
		key: "tblGrid",
		value: function tblGrid(x) {
			var _this6 = this;

			return x.children.map(function (a) {
				return _this6.docx.dxa2Px(a.attribs["w:w"]);
			});
		}
	}, {
		key: "tcBorders",
		value: function tcBorders(x) {
			var _this7 = this;

			return x.children.reduce(function (p, a) {
				p[a.name.split(":").pop()] = _this7.toBorder(a);
			}, {});
		}
	}, {
		key: "tblBorders",
		value: function tblBorders(x) {
			return this.tcBorders(x);
		}
	}, {
		key: "tblCellMar",
		value: function tblCellMar(x) {
			var _this8 = this;

			return x.children.reduce(function (p, a) {
				p[a.name.split(":").pop()] = _this8.dxa2Px(a.attribs["w:w"]);
			}, {});
		}
	}, {
		key: "tcW",
		value: function tcW(x) {
			return this.dxa2Px(x.attribs['w:w']);
		}
	}, {
		key: "shd",
		value: function shd(x) {
			return this.asColor(x.attribs["w:fill"]);
		}
	}, {
		key: "extent",
		value: function extent(x) {
			return { width: this.cm2Px(x.attribs.cx), height: this.cm2Px(x.attribs.cy) };
		}
	}, {
		key: "asToggle",
		value: function asToggle(x) {
			if (x == undefined || x.val == undefined) {
				return -1;
			} else {
				return parseInt(this._val(x));
			}
		}
	}, {
		key: "toSpacing",
		value: function toSpacing(x) {
			var r = x,
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.dxa2Px(r.beforeLines);else if (r.before) o.top = this.dxa2Px(r.before);

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.dxa2Px(r.afterLines);else if (r.after) o.bottom = this.dxa2Px(r.after);

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.dxa2Px(x.line);
					break;
				case 'auto':
				default:
					o.lineHeight = parseInt(r.line) * 100 / 240 + '%';
			}
			o.lineRule = x.lineRule;
			return o;
		}
	}, {
		key: "toBorder",
		value: function toBorder(x) {
			var border = x;
			border.sz && (border.sz = this.pt2Px(border.sz / 8));
			border.color && (border.color = this.asColor(border.color));
			return border;
		}
	}, {
		key: "toColor",
		value: function toColor(x) {
			return this.docx.asColor(x.attribs['w:color'] || this.docx.officeDocument.themeColor(x.attribs['w:themeColor']));
		}
	}]);

	return Props;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3NlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIlNlbGVjdG9yIiwiZG9jeCIsInByb3BzIiwiUHJvcHMiLCIkIiwib2ZmaWNlRG9jdW1lbnQiLCJjb250ZW50IiwiYmluZCIsIm5vZGUiLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxlY3QiLCJjaGlsZHJlbiIsImZpbHRlciIsImEiLCJuYW1lIiwiZmluZCIsInRvQXJyYXkiLCJub2RlcyIsInJlZHVjZSIsIngiLCJzcGxpdCIsInBvcCIsIndpZHRoIiwiZHhhMlB4IiwiYXR0cmlicyIsImhlaWdodCIsImtleXMiLCJ2YWx1ZSIsImNvbHMiLCJudW0iLCJwYXJzZUludCIsInNwYWNlIiwiZGF0YSIsIm1hcCIsImNvbCIsIl92YWwiLCJ0b1NwYWNpbmciLCJ0b0JvcmRlciIsImFzY2lpIiwiZm9udFRoZW1lIiwiZ2V0IiwiYXNpYSIsImFzVG9nZ2xlIiwidG9Db2xvciIsInAiLCJ0Y0JvcmRlcnMiLCJhc0NvbG9yIiwiY20yUHgiLCJjeCIsImN5IiwidW5kZWZpbmVkIiwidmFsIiwiciIsIm8iLCJiZWZvcmVBdXRvc3BhY2luZyIsImJlZm9yZUxpbmVzIiwidG9wIiwiYmVmb3JlIiwiYWZ0ZXJBdXRvc3BhY2luZyIsImFmdGVyTGluZXMiLCJib3R0b20iLCJhZnRlciIsImxpbmUiLCJsaW5lUnVsZSIsImxpbmVIZWlnaHQiLCJib3JkZXIiLCJzeiIsInB0MlB4IiwiY29sb3IiLCJ0aGVtZUNvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ3FCQSxRO0FBQ3BCLG1CQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQ2hCLE9BQUtBLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLEtBQUwsR0FBVyxJQUFJQyxLQUFKLENBQVVGLElBQVYsQ0FBWDtBQUNBLE9BQUtHLENBQUwsR0FBTyxLQUFLSCxJQUFMLENBQVVJLGNBQVYsQ0FBeUJDLE9BQXpCLENBQWlDQyxJQUFqQyxDQUFz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S0FBcEIsQ0FBOUI7QUFDQSxVQUFPSCxNQUFQO0FBQ0E7OzswQkFFTzlDLEMsRUFBRTtBQUNULFVBQU8sS0FBS25CLElBQUwsQ0FBVThDLE9BQVYsQ0FBa0IzQixFQUFFSyxPQUFGLENBQVUsU0FBVixLQUF3QixLQUFLeEIsSUFBTCxDQUFVSSxjQUFWLENBQXlCaUUsVUFBekIsQ0FBb0NsRCxFQUFFSyxPQUFGLENBQVUsY0FBVixDQUFwQyxDQUExQyxDQUFQO0FBQ0EiLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0b3J7XHJcblx0Y29uc3RydWN0b3IoZG9jeCl7XHJcblx0XHR0aGlzLmRvY3g9ZG9jeFxyXG5cdFx0dGhpcy5wcm9wcz1uZXcgUHJvcHMoZG9jeClcclxuXHRcdHRoaXMuJD10aGlzLmRvY3gub2ZmaWNlRG9jdW1lbnQuY29udGVudC5iaW5kKHRoaXMpXHJcblx0fVxyXG5cdFxyXG5cdGRvY3VtZW50KHtub2RlfSl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLnByb3BzLnNlbGVjdChub2RlLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUhPVwidzpib2R5XCIpKSx7ZG9jeDp0aGlzLmRvY3h9KVxyXG5cdH1cclxuXHRcclxuXHRzZWN0aW9uKHtub2RlfSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3Qobm9kZS5jaGlsZHJlbilcclxuXHR9XHJcblx0XHJcblx0dGFibGUoe25vZGV9KXtcclxuXHRcdHJldHVybiB0aGlzLnByb3BzLnNlbGVjdCh0aGlzLiQobm9kZSkuZmluZChcIj53XFxcXDp0YmxQcj4qLCA+d1xcXFw6dGJsR3JpZFwiKS50b0FycmF5KCkpXHJcblx0fVxyXG5cdFxyXG5cdHBhcmFncmFwaCh7bm9kZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0KHRoaXMuJChub2RlKS5maW5kKFwiPndcXFxcOnBQcj4qXCIpLnRvQXJyYXkoKSlcclxuXHR9XHJcblx0XHJcblx0aW5saW5lKHtub2RlfSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3QodGhpcy4kKG5vZGUpLmZpbmQoXCI+d1xcXFw6clByPipcIikudG9BcnJheSgpKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUHJvcHN7XHJcblx0Y29uc3RydWN0b3IoZG9jeCl7XHJcblx0XHR0aGlzLmRvY3g9ZG9jeFxyXG5cdH1cclxuXHRcclxuXHRzZWxlY3Qobm9kZXMpe1xyXG5cdFx0cmV0dXJuIG5vZGVzLnJlZHVjZSgocHJvcHMseCk9PntcclxuXHRcdFx0bGV0IG5hbWU9eC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRpZih0aGlzW25hbWVdKVxyXG5cdFx0XHRcdHByb3BzW25hbWVdPXRoaXNbbmFtZV0oeClcclxuXHRcdFx0cmV0dXJuIHByb3BzXHJcblx0XHR9LHt9KVxyXG5cdH1cclxuXHRcclxuXHRwZ1N6KHgpe1xyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHR3aWR0aDp0aGlzLmRvY3guZHhhMlB4KHguYXR0cmlic1sndzp3J10pLCBcclxuXHRcdFx0aGVpZ2h0OnRoaXMuZG9jeC5keGEyUHgoeC5hdHRyaWJzWyd3OmgnXSlcclxuXHRcdH1cclxuXHR9XHJcblx0cGdNYXIoeCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeC5hdHRyaWJzKS5yZWR1Y2UoKHZhbHVlLGEpPT57XHJcblx0XHRcdHZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5kb2N4LmR4YTJQeCh4LmF0dHJpYnNbYV0pXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fSx7fSlcclxuXHR9XHJcblx0XHJcblx0Y29scyh4KXtcclxuXHRcdGxldCBjb2xzPXt9XHJcblx0XHR4LmF0dHJpYnNbJ3c6bnVtJ10gJiYgKGNvbHMubnVtPXBhcnNlSW50KHguYXR0cmlic1sndzpudW0nXSkpO1xyXG5cdFx0eC5hdHRyaWJzWyd3OnNwYWNlJ10gJiYgKGNvbHMuc3BhY2U9dGhpcy5kb2N4LmR4YTJQeCh4LmF0dHJpYnNbJ3c6c3BhY2UnXSkpO1xyXG5cdFx0XHJcblx0XHRjb2xzLmRhdGE9dGhpcy5kb2N4Lm9mZmljZURvY3VtZW50LmNvbnRlbnQoeCkuZmluZChcIndcXFxcOmNvbFwiKS50b0FycmF5KClcclxuXHRcdFx0Lm1hcChjb2w9Pih7XHJcblx0XHRcdFx0d2lkdGg6dGhpcy5kb2N4LmR4YTJQeChjb2wuYXR0cmlic1sndzp3J10pLFxyXG5cdFx0XHRcdHNwYWNlOnRoaXMuZG9jeC5keGEyUHgoY29sLmF0dHJpYnNbJ3c6c3BhY2UnXSlcclxuXHRcdFx0fSkpXHJcblx0XHRyZXR1cm4gY29sc1xyXG5cdH1cclxuXHRcclxuXHRfdmFsKHgpe1xyXG5cdFx0cmV0dXJuIHguYXR0cmlic1tcInc6dmFsXCJdXHJcblx0fVxyXG5cdFxyXG5cdGpjKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCh4KVxyXG5cdH1cclxuXHRcclxuXHRpbmQoeCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoeC5hdHRyaWJzKVxyXG5cdFx0LnJlZHVjZSgocHJvcHMsYSk9PntcclxuXHRcdFx0cHJvcHNbYS5zcGxpdChcIjpcIikucG9wKCldPXRoaXMuZG9jeC5keGEyUHgoeC5hdHRyaWJzW2FdKVxyXG5cdFx0XHRyZXR1cm4gcHJvcHNcclxuXHRcdH0se30pXHJcblx0fVxyXG5cdHNwYWNpbmcoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy50b1NwYWNpbmcoeClcclxuXHR9XHJcblx0cEJkcih4KXtcclxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh4LmF0dHJpYnMpLnJlZHVjZSgocHJvcHMsYSk9PntcclxuXHRcdFx0cHJvcHNbYS5zcGxpdChcIjpcIikucG9wKCldPXRoaXMudG9Cb3JkZXIoeFthXVswXSlcclxuXHRcdFx0cmV0dXJuIHByb3BzXHJcblx0XHR9LHt9KVxyXG5cdH1cclxuXHRcclxuXHRyRm9udHMoeCl7XHJcblx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcclxuXHRcdGxldCBhc2lhPXhbJ2Vhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4WydlYXN0QXNpYVRoZW1lJ10pXHJcblxyXG5cdFx0aWYoYXNjaWkgfHwgYXNpYSlcclxuXHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cclxuXHR9XHJcblx0XHJcblx0bGFuZyh4KXtcclxuXHRcdHJldHVybiB0aGlzLl92YWwoeClcclxuXHR9XHJcblx0XHJcblx0dmVydEFsaWduKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCh4KVxyXG5cdH1cclxuXHRcclxuXHRzeih4KXtcclxuXHRcdHJldHVybiB0aGlzLl92YWwoeCkvMlx0XHJcblx0fVxyXG5cdFxyXG5cdGtlcm4oeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmFsKHgpLzJcclxuXHR9XHJcblx0XHJcblx0dyh4KXtcclxuXHRcdHJldHVybiB0aGlzLl92YWwoeCkvMTAwLjBcclxuXHR9XHJcblx0XHJcblx0cG9zaXRpb24oeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5keGEyUHgodGhpcy5fdmFsKHgpKVxyXG5cdH1cclxuXHRcclxuXHRpKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYXNUb2dnbGUoeClcclxuXHR9XHJcblx0XHJcblx0dSh4KXtcclxuXHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXHJcblx0fVxyXG5cdFxyXG5cdHZhbmlzaCh4KXtcclxuXHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXHJcblx0fVxyXG5cdFxyXG5cdHNtYWxsQ2Fwcyh4KXtcclxuXHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXHJcblx0fVxyXG5cdFxyXG5cdGIoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxyXG5cdH1cclxuXHRcclxuXHRiYWNrZ3JvdW5kKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMudG9Db2xvcih4LCd3OmNvbG9yJylcclxuXHR9XHJcblx0XHJcblx0aGlnaHRsaWdodCh4KXtcclxuXHRcdHJldHVybiB0aGlzLnRvQ29sb3IoeClcclxuXHR9XHJcblx0XHJcblx0Y29sb3IoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy50b0NvbG9yKHgpXHJcblx0fVxyXG5cdFxyXG5cdGJkeCh4KXtcclxuXHRcdHJldHVybiB0aGlzLnRvQm9yZGVyKHgpXHJcblx0fVxyXG5cdFxyXG5cdHRibExvb2soeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmFsKHgpXHJcblx0fVxyXG5cdFxyXG5cdHRibEdyaWQoeCl7XHJcblx0XHRyZXR1cm4geC5jaGlsZHJlbi5tYXAoYT0+dGhpcy5kb2N4LmR4YTJQeChhLmF0dHJpYnNbXCJ3OndcIl0pKVxyXG5cdH1cclxuXHRcclxuXHR0Y0JvcmRlcnMoeCl7XHJcblx0XHRyZXR1cm4geC5jaGlsZHJlbi5yZWR1Y2UoKHAsYSk9PntcclxuXHRcdFx0cFthLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXT10aGlzLnRvQm9yZGVyKGEpXHJcblx0XHR9LHt9KVxyXG5cdH1cclxuXHRcclxuXHR0YmxCb3JkZXJzKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMudGNCb3JkZXJzKHgpXHJcblx0fVxyXG5cdFxyXG5cdHRibENlbGxNYXIoeCl7XHJcblx0XHRyZXR1cm4geC5jaGlsZHJlbi5yZWR1Y2UoKHAsYSk9PntcclxuXHRcdFx0cFthLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXT10aGlzLmR4YTJQeChhLmF0dHJpYnNbXCJ3OndcIl0pXHJcblx0XHR9LHt9KVxyXG5cdH1cclxuXHRcclxuXHR0Y1coeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC5hdHRyaWJzWyd3OncnXSlcclxuXHR9XHJcblx0XHJcblx0c2hkKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmF0dHJpYnNbXCJ3OmZpbGxcIl0pXHJcblx0fVxyXG5cdFxyXG5cdGV4dGVudCh4KXtcclxuXHRcdHJldHVybiB7d2lkdGg6dGhpcy5jbTJQeCh4LmF0dHJpYnMuY3gpLGhlaWdodDp0aGlzLmNtMlB4KHguYXR0cmlicy5jeSl9XHJcblx0fVxyXG5cdFxyXG5cclxuXHRhc1RvZ2dsZSh4KXtcclxuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIC0xXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHRoaXMuX3ZhbCh4KSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRvU3BhY2luZyh4KXtcclxuXHRcdHZhciByPXgsIG89e31cclxuXHJcblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxyXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmVMaW5lcykpXHJcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxyXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxyXG5cclxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxyXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcclxuXHRcdGVsc2UgaWYoci5hZnRlcilcclxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxyXG5cclxuXHRcdGlmKCFyLmxpbmUpXHJcblx0XHRcdHJldHVybiBvXHJcblxyXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xyXG5cdFx0Y2FzZSAnYXRMZWFzdCc6XHJcblx0XHRjYXNlICdleGFjdCc6XHJcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLmR4YTJQeCgoeC5saW5lKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2F1dG8nOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xyXG5cdFx0fVxyXG5cdFx0by5saW5lUnVsZT14LmxpbmVSdWxlXHJcblx0XHRyZXR1cm4gb1xyXG5cdH1cclxuXHJcblx0dG9Cb3JkZXIoeCl7XHJcblx0XHR2YXIgYm9yZGVyPXhcclxuXHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PXRoaXMucHQyUHgoYm9yZGVyLnN6LzgpKTtcclxuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxyXG5cdFx0cmV0dXJuIGJvcmRlclxyXG5cdH1cclxuXHRcclxuXHR0b0NvbG9yKHgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jeC5hc0NvbG9yKHguYXR0cmlic1sndzpjb2xvciddIHx8IHRoaXMuZG9jeC5vZmZpY2VEb2N1bWVudC50aGVtZUNvbG9yKHguYXR0cmlic1sndzp0aGVtZUNvbG9yJ10pKVxyXG5cdH1cclxufSJdfQ==