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

var _any = require("../any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Super = _any2.default;
/**
 *
 *
 *  conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 */

var Table = function (_Super) {
	(0, _inherits3.default)(Table, _Super);

	function Table() {
		(0, _classCallCheck3.default)(this, Table);
		return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
	}

	(0, _createClass3.default)(Table, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"table",
				null,
				_react2.default.createElement(
					"tbody",
					null,
					this.getContent()
				)
			);
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace(required) {
			var availableSpace = this.context.parent.nextAvailableSpace(required);
			return { width: this.props.width, height: availableSpace.height };
		}
		/*
  	appendComposed(colGroups){
  		if(this.computed.composed.length==0)
  			this.computed.composed.push([])
  		const currentRow=this.computed.composed[this.computed.composed.length-1]
  		currentCell.push(line)
  
  		const {width, tblGrid:cols}=this.props
  		let height=0, self=this
  
  		let x=0, rowNo=this.computed.children.length-1
  		let groupsWithXY=colGroups.map((linesWithStyle,colNo)=>{
  			let {border, margin, spacing, background}=linesWithStyle.style
  			let y=0
  			let grouped=linesWithStyle.map(line=>{
  					let a=<Group y={y}>{line}</Group>
  					y+=line.props.height
  					return a
  				})
  			y+=(spacing*.5
  				+border.top.sz
  				+margin.top
  				+margin.bottom
  				+border.bottom.sz
  				+spacing*.5)
  			let cell=(
  				<Cell height={y} x={x} width={cols[colNo]} background={background}>
  					<Spacing x={spacing/2} y={spacing/2}>
  						<Border border={border} spacing={spacing}>
  							<Margin x={margin.left} y={margin.top}>
  								{grouped}
  							</Margin>
  						</Border>
  					</Spacing>
  				</Cell>
  			);
  			x+=cols[colNo]
  			height=Math.max(height,y)
  			return cell
  		})
  
  		this.context.parent.appendComposed(this.createComposed2Parent({width,height,children:groupsWithXY}))
  	}
  */

	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			var rows = this.computed.children;
			var parent = this.context.parent;

			var y = 0,
			    width = 0;

			var positionedRows = rows.reduce(function (state, row, i) {
				var height = state.space.height;

				var lines = state.lines;
				var composedLine = row.createComposed2Parent(state);
				lines.push(composedLine);
				return state;
			}, { space: parent.nextAvailableSpace(), lines: [], row: 0, cell: 0 }).lines.map(function (lineRow, i) {
				var _lineRow$props = lineRow.props,
				    height = _lineRow$props.height,
				    rowWidth = _lineRow$props.width;

				var positionedLineRow = _react2.default.createElement(
					_group2.default,
					{ y: y, key: i },
					lineRow
				);
				y += height;
				width = Math.max(width, rowWidth);
				return positionedLineRow;
			});

			var table = _react2.default.createElement(
				_group2.default,
				{ height: y, width: width },
				positionedRows
			);

			parent.appendComposed(table);

			(0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(Row, props);
		}
	}, {
		key: "getHeaderRowCount",
		value: function getHeaderRowCount() {
			var _ref = (this.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {},
			    firstRow = _ref.firstRow;

			if (firstRow !== "1") return 0;

			return _react2.default.Children.toArray(this.props.children).filter(function (a) {
				var style = a.props.directStyle;
				if (style && style.tblHeader) return true;
				return false;
			}).length;
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;

			var _ref2 = (self.props.directStyle || self.defaultStyle).get('tblPr.tblLook') || {},
			    firstRow = _ref2.firstRow,
			    lastRow = _ref2.lastRow,
			    noHBand = _ref2.noHBand;

			return (0, _assign2.default)((0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), "getChildContext", this).call(this), {
				tableStyle: this.props.directStyle || this.defaultStyle,
				isFirstRow: function isFirstRow() {
					return firstRow == "1" && this.isFirstRowAbsolute();
				},
				isFirstRowAbsolute: function isFirstRowAbsolute() {
					return self.computed.children.length == 0;
				},
				isLastRow: function isLastRow() {
					return lastRow == "1" && this.isLastRowAbsolute();
				},
				isLastRowAbsolute: function isLastRowAbsolute() {
					return self.computed.children.length == self.getContentCount() - 1;
				},
				isBand1Horz: function isBand1Horz() {
					return noHBand == "0" && !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length - self.getHeaderRowCount()) % 2 == 1;
				},
				isBand2Horz: function isBand2Horz() {
					return noHBand == "0" && !this.isFirstRow() && !this.isLastRow() && (self.computed.children.length - self.getHeaderRowCount()) % 2 == 0;
				}
			});
		}
	}]);
	return Table;
}(Super);

Table.displayName = "table";
Table.childContextTypes = (0, _assign2.default)({
	tableStyle: _react.PropTypes.object,
	isFirstRow: _react.PropTypes.func,
	isLastRow: _react.PropTypes.func,
	isFirstRowAbsolute: _react.PropTypes.func,
	isLastRowAbsolute: _react.PropTypes.func,
	isBand1Horz: _react.PropTypes.func,
	isBand2Horz: _react.PropTypes.func
}, Super.childContextTypes);
exports.default = Table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN1cGVyIiwiVGFibGUiLCJnZXRDb250ZW50IiwicmVxdWlyZWQiLCJhdmFpbGFibGVTcGFjZSIsImNvbnRleHQiLCJwYXJlbnQiLCJuZXh0QXZhaWxhYmxlU3BhY2UiLCJ3aWR0aCIsInByb3BzIiwiaGVpZ2h0Iiwicm93cyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJ5IiwicG9zaXRpb25lZFJvd3MiLCJyZWR1Y2UiLCJzdGF0ZSIsInJvdyIsImkiLCJzcGFjZSIsImxpbmVzIiwiY29tcG9zZWRMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwicHVzaCIsImNlbGwiLCJtYXAiLCJsaW5lUm93Iiwicm93V2lkdGgiLCJwb3NpdGlvbmVkTGluZVJvdyIsIk1hdGgiLCJtYXgiLCJ0YWJsZSIsImFwcGVuZENvbXBvc2VkIiwiZGlyZWN0U3R5bGUiLCJzZWxmIiwiZGVmYXVsdFN0eWxlIiwiZ2V0IiwiZmlyc3RSb3ciLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJmaWx0ZXIiLCJzdHlsZSIsImEiLCJ0YmxIZWFkZXIiLCJsZW5ndGgiLCJsYXN0Um93Iiwibm9IQmFuZCIsInRhYmxlU3R5bGUiLCJpc0ZpcnN0Um93IiwiaXNGaXJzdFJvd0Fic29sdXRlIiwiaXNMYXN0Um93IiwiaXNMYXN0Um93QWJzb2x1dGUiLCJnZXRDb250ZW50Q291bnQiLCJpc0JhbmQxSG9yeiIsImdldEhlYWRlclJvd0NvdW50IiwiaXNCYW5kMkhvcnoiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEscUJBQU47QUFDQTs7Ozs7O0lBS3FCQyxLOzs7Ozs7Ozs7OzJCQUVaO0FBQ1AsVUFBTztBQUFBO0FBQUE7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QUE0RCxDQUE3SDtBQUNBO0FBdkIyQyxJQUF0QyxDQUFQO0FBeUJBOzs7RUE1SWlDdkQsSzs7QUFBZEMsSyxDQUNid0QsVyxHQUFZLE87QUFEQ3hELEssQ0FzR2J5RCxpQixHQUFrQixzQkFBYztBQUN0Q1YsYUFBWSxpQkFBVVcsTUFEZ0I7QUFFdENWLGFBQVksaUJBQVVXLElBRmdCO0FBR3RDVCxZQUFXLGlCQUFVUyxJQUhpQjtBQUl0Q1YscUJBQW9CLGlCQUFVVSxJQUpRO0FBS3RDUixvQkFBbUIsaUJBQVVRLElBTFM7QUFNdENOLGNBQWEsaUJBQVVNLElBTmU7QUFPdENKLGNBQWEsaUJBQVVJO0FBUGUsQ0FBZCxFQVF0QjVELE1BQU0wRCxpQkFSZ0IsQztrQkF0R0x6RCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi8uLi9jb21wb3NlZC9ncm91cFwiXG5cbmNvbnN0IFN1cGVyPUFueVxuLyoqXG4gKlxuICpcbiAqICBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdXBlcntcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwidGFibGVcIlxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gPHRhYmxlPjx0Ym9keT57dGhpcy5nZXRDb250ZW50KCl9PC90Ym9keT48L3RhYmxlPlxuXHR9XG5cdG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZCl7XG5cdFx0bGV0IGF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdHJldHVybiB7d2lkdGg6IHRoaXMucHJvcHMud2lkdGgsIGhlaWdodDogYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuXHR9XG4vKlxuXHRhcHBlbmRDb21wb3NlZChjb2xHcm91cHMpe1xuXHRcdGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKFtdKVxuXHRcdGNvbnN0IGN1cnJlbnRSb3c9dGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGN1cnJlbnRDZWxsLnB1c2gobGluZSlcblxuXHRcdGNvbnN0IHt3aWR0aCwgdGJsR3JpZDpjb2xzfT10aGlzLnByb3BzXG5cdFx0bGV0IGhlaWdodD0wLCBzZWxmPXRoaXNcblxuXHRcdGxldCB4PTAsIHJvd05vPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLTFcblx0XHRsZXQgZ3JvdXBzV2l0aFhZPWNvbEdyb3Vwcy5tYXAoKGxpbmVzV2l0aFN0eWxlLGNvbE5vKT0+e1xuXHRcdFx0bGV0IHtib3JkZXIsIG1hcmdpbiwgc3BhY2luZywgYmFja2dyb3VuZH09bGluZXNXaXRoU3R5bGUuc3R5bGVcblx0XHRcdGxldCB5PTBcblx0XHRcdGxldCBncm91cGVkPWxpbmVzV2l0aFN0eWxlLm1hcChsaW5lPT57XG5cdFx0XHRcdFx0bGV0IGE9PEdyb3VwIHk9e3l9PntsaW5lfTwvR3JvdXA+XG5cdFx0XHRcdFx0eSs9bGluZS5wcm9wcy5oZWlnaHRcblx0XHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0XHR9KVxuXHRcdFx0eSs9KHNwYWNpbmcqLjVcblx0XHRcdFx0K2JvcmRlci50b3Auc3pcblx0XHRcdFx0K21hcmdpbi50b3Bcblx0XHRcdFx0K21hcmdpbi5ib3R0b21cblx0XHRcdFx0K2JvcmRlci5ib3R0b20uc3pcblx0XHRcdFx0K3NwYWNpbmcqLjUpXG5cdFx0XHRsZXQgY2VsbD0oXG5cdFx0XHRcdDxDZWxsIGhlaWdodD17eX0geD17eH0gd2lkdGg9e2NvbHNbY29sTm9dfSBiYWNrZ3JvdW5kPXtiYWNrZ3JvdW5kfT5cblx0XHRcdFx0XHQ8U3BhY2luZyB4PXtzcGFjaW5nLzJ9IHk9e3NwYWNpbmcvMn0+XG5cdFx0XHRcdFx0XHQ8Qm9yZGVyIGJvcmRlcj17Ym9yZGVyfSBzcGFjaW5nPXtzcGFjaW5nfT5cblx0XHRcdFx0XHRcdFx0PE1hcmdpbiB4PXttYXJnaW4ubGVmdH0geT17bWFyZ2luLnRvcH0+XG5cdFx0XHRcdFx0XHRcdFx0e2dyb3VwZWR9XG5cdFx0XHRcdFx0XHRcdDwvTWFyZ2luPlxuXHRcdFx0XHRcdFx0PC9Cb3JkZXI+XG5cdFx0XHRcdFx0PC9TcGFjaW5nPlxuXHRcdFx0XHQ8L0NlbGw+XG5cdFx0XHQpO1xuXHRcdFx0eCs9Y29sc1tjb2xOb11cblx0XHRcdGhlaWdodD1NYXRoLm1heChoZWlnaHQseSlcblx0XHRcdHJldHVybiBjZWxsXG5cdFx0fSlcblxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe3dpZHRoLGhlaWdodCxjaGlsZHJlbjpncm91cHNXaXRoWFl9KSlcblx0fVxuKi9cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW46cm93c309dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdGxldCB5PTAsIHdpZHRoPTBcblxuXHRcdGxldCBwb3NpdGlvbmVkUm93cz1yb3dzLnJlZHVjZSgoc3RhdGUscm93LCBpKT0+e1xuXHRcdFx0bGV0IHtoZWlnaHR9PXN0YXRlLnNwYWNlXG5cdFx0XHRjb25zdCBsaW5lcz1zdGF0ZS5saW5lc1xuXHRcdFx0bGV0IGNvbXBvc2VkTGluZT1yb3cuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHN0YXRlKVxuXHRcdFx0bGluZXMucHVzaChjb21wb3NlZExpbmUpXG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LHtzcGFjZTpwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCksbGluZXM6W10scm93OjAsIGNlbGw6MH0pXG5cdFx0XHQubGluZXMubWFwKChsaW5lUm93LGkpPT57XG5cdFx0XHRcdGNvbnN0IHtoZWlnaHQsd2lkdGg6cm93V2lkdGh9PWxpbmVSb3cucHJvcHNcblx0XHRcdFx0bGV0IHBvc2l0aW9uZWRMaW5lUm93PSg8R3JvdXAgeT17eX0ga2V5PXtpfT57bGluZVJvd308L0dyb3VwPilcblx0XHRcdFx0eSs9aGVpZ2h0XG5cdFx0XHRcdHdpZHRoPU1hdGgubWF4KHdpZHRoLHJvd1dpZHRoKVxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25lZExpbmVSb3dcblx0XHRcdH0pXG5cblx0XHRsZXQgdGFibGU9KFxuXHRcdFx0PEdyb3VwIGhlaWdodD17eX0gd2lkdGg9e3dpZHRofT5cblx0XHRcdFx0e3Bvc2l0aW9uZWRSb3dzfVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cblx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGFibGUpXG5cblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPFJvdyB7Li4ucHJvcHN9Lz5cblx0fVxuXG5cdGdldEhlYWRlclJvd0NvdW50KCl7XG5cdFx0Y29uc3Qge2ZpcnN0Um93fT0odGhpcy5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdGlmKGZpcnN0Um93IT09XCIxXCIpXG5cdFx0XHRyZXR1cm4gMFxuXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKGE9Pntcblx0XHRcdGxldCBzdHlsZT1hLnByb3BzLmRpcmVjdFN0eWxlXG5cdFx0XHRpZihzdHlsZSAmJiBzdHlsZS50YmxIZWFkZXIpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9KS5sZW5ndGhcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3dBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuY1xuXHR9LCBTdXBlci5jaGlsZENvbnRleHRUeXBlcylcblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRsZXQgc2VsZj10aGlzXG5cdFx0Y29uc3Qge2ZpcnN0Um93LCBsYXN0Um93LCBub0hCYW5kfT0oc2VsZi5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGV8fHRoaXMuZGVmYXVsdFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gZmlyc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc0ZpcnN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGxhc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKVxuXHRcdFx0fSxcblxuXHRcdFx0aXNMYXN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcblx0XHRcdH0sXG5cblx0XHRcdGlzQmFuZDFIb3J6KCl7XG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MVxuXHRcdFx0fSxcblxuXHRcdFx0aXNCYW5kMkhvcnooKXtcblx0XHRcdFx0cmV0dXJuIG5vSEJhbmQ9PVwiMFwiJiYgIXRoaXMuaXNGaXJzdFJvdygpICYmICF0aGlzLmlzTGFzdFJvdygpICYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlclJvd0NvdW50KCkpJTI9PTBcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=