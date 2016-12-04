"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = _any2.default;

var Row = function (_Super) {
	(0, _inherits3.default)(Row, _Super);

	function Row() {
		(0, _classCallCheck3.default)(this, Row);
		return (0, _possibleConstructorReturn3.default)(this, (Row.__proto__ || (0, _getPrototypeOf2.default)(Row)).apply(this, arguments));
	}

	(0, _createClass3.default)(Row, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"tr",
				null,
				this.getContent()
			);
		}
	}, {
		key: "appendComposed",
		value: function appendComposed() {}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed() {
			this.computed.composed.push([]);
			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "on1ChildComposed", this).apply(this, arguments);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var w = 0,
			    h = 0;
			var positionedCells = this.computed.children.map(function (cell, i) {
				var composedCell = cell.createComposed2Parent();
				var _composedCell$props = composedCell.props,
				    width = _composedCell$props.width,
				    height = _composedCell$props.height;

				h = Math.max(h, height);
				var positionedCell = _react2.default.createElement(
					_group2.default,
					{ x: w, key: i },
					composedCell
				);

				w += width;
				return positionedCell;
			});

			return _react2.default.createElement(
				ComposedRow,
				{ width: w, height: h },
				positionedCells
			);
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			this.computed.composed.splice(this.computed.children.length); //on1ChildComposed will always add 1
			/*
   		const {parent}=this.context
   		let indexes=new Array(this.computed.composed.length)
   		indexes.fill(0)
   
   		let isAllSent2Table=a=>indexes.reduce((prev,index, i)=>this.computed.composed[i].length==index && prev, true)
   
   		let counter=0
   		let minSpace={}
   		do{
   			let availableSpace=parent.nextAvailableSpace(minSpace)
   			let currentGroupedLines=new Array(this.computed.composed.length)
   			this.computed.composed.forEach((lines,i)=>{
   				let style=this.computed.children[i].getStyle()
   				let {border, margin,spacing}=style
   
   				let height=availableSpace.height
   					-border.top.sz
   					-border.bottom.sz
   					-margin.top
   					-margin.bottom
   					-spacing
   
   				let index=indexes[i]
   				let start=index
   				for(let len=lines.length; index<len && height>0; index++){
   					let line=lines[index]
   					height-=line.props.height
   					if(height<0){
   						break
   					}else{
   
   					}
   				}
   				indexes[i]=index
   
   				currentGroupedLines[i]=lines.slice(start,index)
   				currentGroupedLines[i].style=style
   			})
   
   			if(!currentGroupedLines.find(a=>a.length>0)){
   				//availableSpace is too small, need find a min available space
   				let minHeight=indexes.reduce((p,index,i)=>{
   					let {border, margin, spacing}=this.computed.children[i].getStyle()
   					let line=this.computed.composed[i][index]
   					if(line){
   						return Math.max(p, line.props.height
   							+border.top.sz
   							+border.bottom.sz
   							+margin.top
   							+margin.bottom
   							+spacing)
   					}else
   						return p
   				},0)
   				minSpace.height=minHeight
   			}else
   				parent.appendComposed(currentGroupedLines)
   			//if(counter++>100)
   				//throw new Error("there should be a infinite loop during row split, please check")
   
   
   		}while(!isAllSent2Table());
   */
			(0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "getHeaderColCount",
		value: function getHeaderColCount() {
			var _ref = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref.firstColumn;

			if (firstColumn == "0") return 0;
			return 1;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = this.context.tableStyle.get('tblPr.tblLook') || {},
			    firstColumn = _ref2.firstColumn,
			    lastColumn = _ref2.lastColumn,
			    noVBand = _ref2.noVBand;

			var children = this.computed.children;
			return (0, _assign2.default)((0, _get3.default)(Row.prototype.__proto__ || (0, _getPrototypeOf2.default)(Row.prototype), "getChildContext", this).call(this), {
				rowStyle: this.props.directStyle,
				isFirstCol: function isFirstCol() {
					return firstColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isFirstColAbsolute();
				},
				isFirstColAbsolute: function isFirstColAbsolute() {
					return self.computed.children.length == 0;
				},
				isLastCol: function isLastCol() {
					return lastColumn == "1" && !this.isFirstRow() && !this.isLastRow() && this.isLastColAbsolute();
				},
				isLastColAbsolute: function isLastColAbsolute() {
					return self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Vert: function isBand1Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 1;
				},
				isBand2Vert: function isBand2Vert() {
					return noVBand == "0" && !this.isFirstCol() && !this.isLastCol() && (self.computed.children.length - self.getHeaderColCount()) % 2 == 0;
				},
				isSeCell: function isSeCell() {
					return this.isLastRowAbsolute() && this.isLastColAbsolute();
				},
				isSwCell: function isSwCell() {
					return this.isLastRowAbsolute() && this.isFirstColAbsolute();
				},
				isNeCell: function isNeCell() {
					return this.isFirstRowAbsolute() && this.isLastColAbsolute();
				},
				isNwCell: function isNwCell() {
					return this.isFirstRowAbsolute() && this.isFirstColAbsolute();
				}
			});
		}
	}]);
	return Row;
}(Super);

Row.displayName = "row";
Row.contextTypes = (0, _assign2.default)({
	tableStyle: _react.PropTypes.object
}, Super.contextTypes);
Row.childContextTypes = (0, _assign2.default)({
	rowStyle: _react.PropTypes.object,
	isFirstCol: _react.PropTypes.func,
	isLastCol: _react.PropTypes.func,
	isFirstColAbsolute: _react.PropTypes.func,
	isLastColAbsolute: _react.PropTypes.func,
	isBand1Vert: _react.PropTypes.func,
	isBand2Vert: _react.PropTypes.func,
	isSeCell: _react.PropTypes.func,
	isSwCell: _react.PropTypes.func,
	isNeCell: _react.PropTypes.func,
	isNwCell: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = Row;

var ComposedRow = function (_Group) {
	(0, _inherits3.default)(ComposedRow, _Group);

	function ComposedRow() {
		(0, _classCallCheck3.default)(this, ComposedRow);
		return (0, _possibleConstructorReturn3.default)(this, (ComposedRow.__proto__ || (0, _getPrototypeOf2.default)(ComposedRow)).apply(this, arguments));
	}

	(0, _createClass3.default)(ComposedRow, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				rowSize: {
					width: this.props.width,
					height: this.props.height
				}
			};
		}
	}]);
	return ComposedRow;
}(_group2.default);

ComposedRow.childContextTypes = {
	rowSize: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3Jvdy5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlJvdyIsImdldENvbnRlbnQiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwicHVzaCIsImFyZ3VtZW50cyIsInciLCJoIiwicG9zaXRpb25lZENlbGxzIiwiY2hpbGRyZW4iLCJtYXAiLCJjZWxsIiwiaSIsImNvbXBvc2VkQ2VsbCIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJNYXRoIiwibWF4IiwicG9zaXRpb25lZENlbGwiLCJzcGxpY2UiLCJsZW5ndGgiLCJjb250ZXh0IiwidGFibGVTdHlsZSIsImdldCIsImZpcnN0Q29sdW1uIiwic2VsZiIsImxhc3RDb2x1bW4iLCJub1ZCYW5kIiwicm93U3R5bGUiLCJkaXJlY3RTdHlsZSIsImlzRmlyc3RDb2wiLCJpc0ZpcnN0Um93IiwiaXNMYXN0Um93IiwiaXNGaXJzdENvbEFic29sdXRlIiwiaXNMYXN0Q29sIiwiaXNMYXN0Q29sQWJzb2x1dGUiLCJnZXRDb250ZW50Q291bnQiLCJpc0JhbmQxVmVydCIsImdldEhlYWRlckNvbENvdW50IiwiaXNCYW5kMlZlcnQiLCJpc1NlQ2VsbCIsImlzTGFzdFJvd0Fic29sdXRlIiwiaXNTd0NlbGwiLCJpc05lQ2VsbCIsImlzRmlyc3RSb3dBYnNvbHV0ZSIsImlzTndDZWxsIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJjaGlsZENvbnRleHRUeXBlcyIsImZ1bmMiLCJDb21wb3NlZFJvdyIsInJvd1NpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHFCQUFOOztJQUNxQkMsRzs7Ozs7Ozs7OzsyQkFFWjtBQUNQLFVBQU87QUFBQTtBQUFBO0FBQUssU0FBS0MsVUFBTDtBQUFMLElBQVA7QUFDQTs7O21DQUVlLENB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QkFBb0IsaUJBQVVpQixJQUpRO0FBS3RDZixvQkFBbUIsaUJBQVVlLElBTFM7QUFNdENiLGNBQWEsaUJBQVVhLElBTmU7QUFPdENYLGNBQWEsaUJBQVVXLElBUGU7QUFRdENWLFdBQVUsaUJBQVVVLElBUmtCO0FBU3RDUixXQUFVLGlCQUFVUSxJQVRrQjtBQVV0Q1AsV0FBVSxpQkFBVU8sSUFWa0I7QUFXdENMLFdBQVUsaUJBQVVLO0FBWGtCLENBQWQsRUFZdEJyRCxNQUFNb0QsaUJBWmdCLEM7a0JBakhMbkQsRzs7SUE0TGZxRCxXOzs7Ozs7Ozs7O29DQUtZO0FBQ2hCLFVBQU87QUFDTkMsYUFBUztBQUNSdEMsWUFBTyxLQUFLRCxLQUFMLENBQVdDLEtBRFY7QUFFUkMsYUFBUSxLQUFLRixLQUFMLENBQVdFO0FBRlg7QUFESCxJQUFQO0FBTUE7Ozs7O0FBWklvQyxXLENBQ0VGLGlCLEdBQWtCO0FBQ3hCRyxVQUFRLGlCQUFVSjtBQURNLEMiLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5cclxuY29uc3QgU3VwZXI9QW55XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdyBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInJvd1wiXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHRyPnt0aGlzLmdldENvbnRlbnQoKX08L3RyPlxyXG5cdH1cclxuXHJcblx0YXBwZW5kQ29tcG9zZWQoKXtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0b24xQ2hpbGRDb21wb3NlZCgpe1xyXG5cdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQoKXtcclxuXHRcdGxldCB3PTAsaD0wXHJcblx0XHRsZXQgcG9zaXRpb25lZENlbGxzPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubWFwKChjZWxsLGkpPT57XHJcblx0XHRcdGxldCBjb21wb3NlZENlbGw9Y2VsbC5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKVxyXG5cdFx0XHRjb25zdCB7d2lkdGgsaGVpZ2h0fT1jb21wb3NlZENlbGwucHJvcHNcclxuXHRcdFx0aD1NYXRoLm1heChoLGhlaWdodClcclxuXHRcdFx0bGV0IHBvc2l0aW9uZWRDZWxsPShcclxuXHRcdFx0XHQ8R3JvdXAgeD17d30ga2V5PXtpfT5cclxuXHRcdFx0XHRcdHtjb21wb3NlZENlbGx9XHJcblx0XHRcdFx0PC9Hcm91cD5cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0dys9d2lkdGhcclxuXHRcdFx0cmV0dXJuIHBvc2l0aW9uZWRDZWxsXHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxDb21wb3NlZFJvdyB3aWR0aD17d30gaGVpZ2h0PXtofT5cclxuXHRcdFx0XHR7cG9zaXRpb25lZENlbGxzfVxyXG5cdFx0XHQ8L0NvbXBvc2VkUm93PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcblx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnNwbGljZSh0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aCkvL29uMUNoaWxkQ29tcG9zZWQgd2lsbCBhbHdheXMgYWRkIDFcclxuLypcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGluZGV4ZXM9bmV3IEFycmF5KHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKVxyXG5cdFx0aW5kZXhlcy5maWxsKDApXHJcblxyXG5cdFx0bGV0IGlzQWxsU2VudDJUYWJsZT1hPT5pbmRleGVzLnJlZHVjZSgocHJldixpbmRleCwgaSk9PnRoaXMuY29tcHV0ZWQuY29tcG9zZWRbaV0ubGVuZ3RoPT1pbmRleCAmJiBwcmV2LCB0cnVlKVxyXG5cclxuXHRcdGxldCBjb3VudGVyPTBcclxuXHRcdGxldCBtaW5TcGFjZT17fVxyXG5cdFx0ZG97XHJcblx0XHRcdGxldCBhdmFpbGFibGVTcGFjZT1wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKG1pblNwYWNlKVxyXG5cdFx0XHRsZXQgY3VycmVudEdyb3VwZWRMaW5lcz1uZXcgQXJyYXkodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgpXHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQuZm9yRWFjaCgobGluZXMsaSk9PntcclxuXHRcdFx0XHRsZXQgc3R5bGU9dGhpcy5jb21wdXRlZC5jaGlsZHJlbltpXS5nZXRTdHlsZSgpXHJcblx0XHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbixzcGFjaW5nfT1zdHlsZVxyXG5cclxuXHRcdFx0XHRsZXQgaGVpZ2h0PWF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG5cdFx0XHRcdFx0LWJvcmRlci50b3Auc3pcclxuXHRcdFx0XHRcdC1ib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHQtbWFyZ2luLnRvcFxyXG5cdFx0XHRcdFx0LW1hcmdpbi5ib3R0b21cclxuXHRcdFx0XHRcdC1zcGFjaW5nXHJcblxyXG5cdFx0XHRcdGxldCBpbmRleD1pbmRleGVzW2ldXHJcblx0XHRcdFx0bGV0IHN0YXJ0PWluZGV4XHJcblx0XHRcdFx0Zm9yKGxldCBsZW49bGluZXMubGVuZ3RoOyBpbmRleDxsZW4gJiYgaGVpZ2h0PjA7IGluZGV4Kyspe1xyXG5cdFx0XHRcdFx0bGV0IGxpbmU9bGluZXNbaW5kZXhdXHJcblx0XHRcdFx0XHRoZWlnaHQtPWxpbmUucHJvcHMuaGVpZ2h0XHJcblx0XHRcdFx0XHRpZihoZWlnaHQ8MCl7XHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGluZGV4ZXNbaV09aW5kZXhcclxuXHJcblx0XHRcdFx0Y3VycmVudEdyb3VwZWRMaW5lc1tpXT1saW5lcy5zbGljZShzdGFydCxpbmRleClcclxuXHRcdFx0XHRjdXJyZW50R3JvdXBlZExpbmVzW2ldLnN0eWxlPXN0eWxlXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZighY3VycmVudEdyb3VwZWRMaW5lcy5maW5kKGE9PmEubGVuZ3RoPjApKXtcclxuXHRcdFx0XHQvL2F2YWlsYWJsZVNwYWNlIGlzIHRvbyBzbWFsbCwgbmVlZCBmaW5kIGEgbWluIGF2YWlsYWJsZSBzcGFjZVxyXG5cdFx0XHRcdGxldCBtaW5IZWlnaHQ9aW5kZXhlcy5yZWR1Y2UoKHAsaW5kZXgsaSk9PntcclxuXHRcdFx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmd9PXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5baV0uZ2V0U3R5bGUoKVxyXG5cdFx0XHRcdFx0bGV0IGxpbmU9dGhpcy5jb21wdXRlZC5jb21wb3NlZFtpXVtpbmRleF1cclxuXHRcdFx0XHRcdGlmKGxpbmUpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgocCwgbGluZS5wcm9wcy5oZWlnaHRcclxuXHRcdFx0XHRcdFx0XHQrYm9yZGVyLnRvcC5zelxyXG5cdFx0XHRcdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XHJcblx0XHRcdFx0XHRcdFx0K21hcmdpbi50b3BcclxuXHRcdFx0XHRcdFx0XHQrbWFyZ2luLmJvdHRvbVxyXG5cdFx0XHRcdFx0XHRcdCtzcGFjaW5nKVxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHR9LDApXHJcblx0XHRcdFx0bWluU3BhY2UuaGVpZ2h0PW1pbkhlaWdodFxyXG5cdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50R3JvdXBlZExpbmVzKVxyXG5cdFx0XHQvL2lmKGNvdW50ZXIrKz4xMDApXHJcblx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ0aGVyZSBzaG91bGQgYmUgYSBpbmZpbml0ZSBsb29wIGR1cmluZyByb3cgc3BsaXQsIHBsZWFzZSBjaGVja1wiKVxyXG5cclxuXHJcblx0XHR9d2hpbGUoIWlzQWxsU2VudDJUYWJsZSgpKTtcclxuKi9cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHRhYmxlU3R5bGU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9LCBTdXBlci5jb250ZXh0VHlwZXMpXHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcclxuXHRcdHJvd1N0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0aXNGaXJzdENvbDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRpc0xhc3RDb2w6IFByb3BUeXBlcy5mdW5jLFxyXG5cdFx0aXNGaXJzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTGFzdENvbEFic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDFWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzQmFuZDJWZXJ0OiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU2VDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzU3dDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTmVDZWxsOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGlzTndDZWxsOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sIFN1cGVyLmNoaWxkQ29udGV4dFR5cGVzKVxyXG5cclxuXHRnZXRIZWFkZXJDb2xDb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZpcnN0Q29sdW1ufT10aGlzLmNvbnRleHQudGFibGVTdHlsZS5nZXQoJ3RibFByLnRibExvb2snKSB8fHt9XHJcblx0XHRpZihmaXJzdENvbHVtbj09XCIwXCIpXHJcblx0XHRcdHJldHVybiAwXHJcblx0XHRyZXR1cm4gMVxyXG5cdH1cclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRsZXQgc2VsZj10aGlzXHJcblx0XHRjb25zdCB7Zmlyc3RDb2x1bW4sIGxhc3RDb2x1bW4sIG5vVkJhbmR9PXRoaXMuY29udGV4dC50YWJsZVN0eWxlLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5cclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0cm93U3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGUsXHJcblx0XHRcdGlzRmlyc3RDb2woKXtcclxuXHRcdFx0XHRyZXR1cm4gZmlyc3RDb2x1bW49PVwiMVwiXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Um93KClcclxuXHRcdFx0XHRcdCYmICF0aGlzLmlzTGFzdFJvdygpXHJcblx0XHRcdFx0XHQmJiB0aGlzLmlzRmlyc3RDb2xBYnNvbHV0ZSgpXHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0ZpcnN0Q29sQWJzb2x1dGUoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PTBcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMYXN0Q29sKCl7XHJcblx0XHRcdFx0cmV0dXJuIGxhc3RDb2x1bW49PVwiMVwiXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0ZpcnN0Um93KClcclxuXHRcdFx0XHRcdCYmICF0aGlzLmlzTGFzdFJvdygpXHJcblx0XHRcdFx0XHQmJiB0aGlzLmlzTGFzdENvbEFic29sdXRlKClcclxuXHRcdFx0fSxcclxuXHRcdFx0aXNMYXN0Q29sQWJzb2x1dGUoKXtcclxuXHRcdFx0XHRyZXR1cm4gc2VsZi5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGg9PXNlbGYuZ2V0Q29udGVudENvdW50KCktMVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0JhbmQxVmVydCgpe1xyXG5cdFx0XHRcdHJldHVybiBub1ZCYW5kPT1cIjBcIlxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdENvbCgpXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RDb2woKVxyXG5cdFx0XHRcdFx0JiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyQ29sQ291bnQoKSklMj09MVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0JhbmQyVmVydCgpe1xyXG5cdFx0XHRcdHJldHVybiBub1ZCYW5kPT1cIjBcIlxyXG5cdFx0XHRcdFx0JiYgIXRoaXMuaXNGaXJzdENvbCgpXHJcblx0XHRcdFx0XHQmJiAhdGhpcy5pc0xhc3RDb2woKVxyXG5cdFx0XHRcdFx0JiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyQ29sQ291bnQoKSklMj09MFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc1NlQ2VsbCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzTGFzdFJvd0Fic29sdXRlKCkgJiYgdGhpcy5pc0xhc3RDb2xBYnNvbHV0ZSgpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzU3dDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKSAmJiB0aGlzLmlzRmlyc3RDb2xBYnNvbHV0ZSgpXHJcblx0XHRcdH0sXHJcblx0XHRcdGlzTmVDZWxsKCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKCkgICYmIHRoaXMuaXNMYXN0Q29sQWJzb2x1dGUoKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc053Q2VsbCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzRmlyc3RSb3dBYnNvbHV0ZSgpICYmIHRoaXMuaXNGaXJzdENvbEFic29sdXRlKClcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBDb21wb3NlZFJvdyBleHRlbmRzIEdyb3Vwe1xyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHRyb3dTaXplOlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cm93U2l6ZToge1xyXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG5cdFx0XHRcdGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=