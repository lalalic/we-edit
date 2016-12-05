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

		/*
  	nextAvailableSpace(required){
  		let availableSpace=this.context.parent.nextAvailableSpace(required)
  		return {width: this.props.width, height: availableSpace.height}
  	}
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

			var headers = this.getHeaderRowCount();
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

			var _rows$0$computed$chil = rows[0].computed.children[0].getStyle(),
			    x = _rows$0$computed$chil.margin.left,
			    sz = _rows$0$computed$chil.border.top.sz;

			var table = _react2.default.createElement(
				_group2.default,
				{ height: y, width: width, x: -x, y: sz / 2 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250ZW50L3RhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN1cGVyIiwiVGFibGUiLCJnZXRDb250ZW50Iiwicm93cyIsImNvbXB1dGVkIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJjb250ZXh0IiwiaGVhZGVycyIsImdldEhlYWRlclJvd0NvdW50IiwieSIsIndpZHRoIiwicG9zaXRpb25lZFJvd3MiLCJyZWR1Y2UiLCJzdGF0ZSIsInJvdyIsImkiLCJoZWlnaHQiLCJzcGFjZSIsImxpbmVzIiwiY29tcG9zZWRMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwicHVzaCIsIm5leHRBdmFpbGFibGVTcGFjZSIsImNlbGwiLCJtYXAiLCJsaW5lUm93IiwicHJvcHMiLCJyb3dXaWR0aCIsInBvc2l0aW9uZWRMaW5lUm93IiwiTWF0aCIsIm1heCIsImdldFN0eWxlIiwieCIsIm1hcmdpbiIsImxlZnQiLCJzeiIsImJvcmRlciIsInRvcCIsInRhYmxlIiwiYXBwZW5kQ29tcG9zZWQiLCJkaXJlY3RTdHlsZSIsInNlbGYiLCJkZWZhdWx0U3R5bGUiLCJnZXQiLCJmaXJzdFJvdyIsIkNoaWxkcmVuIiwidG9BcnJheSIsImZpbHRlciIsInN0eWxlIiwiYSIsInRibEhlYWRlciIsImxlbmd0aCIsImxhc3RSb3ciLCJub0hCYW5kIiwidGFibGVTdHlsZSIsImlzRmlyc3RSb3ciLCJpc0ZpcnN0Um93QWJzb2x1dGUiLCJpc0xhc3RSb3ciLCJpc0xhc3RSb3dBYnNvbHV0ZSIsImdldENvbnRlbnRDb3VudCIsImlzQmFuZDFIb3J6IiwiaXNCYW5kMkhvcnoiLCJkaXNwbGF5TmFtZSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEscUJBQU47QUFDQTs7Ozs7O0lBS3FCQyxLOzs7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QUFDLEtBQUtFLFVBQUwsRUFBaEIsSUFBcUMsQ0FBQyxLQUFLRSxTQUFMLEVBQXRDLElBQTBELENBQUNoQixLQUFLdEMsUUFBTCxDQUFjQyxRQUFkLENBQXVCK0MsTUFBdkIsR0FBOEJWLEtBQUtqQyxpQkFBTCxFQUEvQixJQUF5RCxDQUF6RCxJQUE0RCxDQUE3SDtBQUNBO0FBdkIyQyxJQUF0QyxDQUFQO0FBeUJBOzs7RUEvSWlDVCxLOztBQUFkQyxLLENBQ2I4RCxXLEdBQVksTztBQURDOUQsSyxDQXlHYitELGlCLEdBQWtCLHNCQUFjO0FBQ3RDVCxhQUFZLGlCQUFVVSxNQURnQjtBQUV0Q1QsYUFBWSxpQkFBVVUsSUFGZ0I7QUFHdENSLFlBQVcsaUJBQVVRLElBSGlCO0FBSXRDVCxxQkFBb0IsaUJBQVVTLElBSlE7QUFLdENQLG9CQUFtQixpQkFBVU8sSUFMUztBQU10Q0wsY0FBYSxpQkFBVUssSUFOZTtBQU90Q0osY0FBYSxpQkFBVUk7QUFQZSxDQUFkLEVBUXRCbEUsTUFBTWdFLGlCQVJnQixDO2tCQXpHTC9ELEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4uL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uLy4uL2NvbXBvc2VkL2dyb3VwXCJcblxuY29uc3QgU3VwZXI9QW55XG4vKipcbiAqXG4gKlxuICogIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN1cGVye1xuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJ0YWJsZVwiXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiA8dGFibGU+PHRib2R5Pnt0aGlzLmdldENvbnRlbnQoKX08L3Rib2R5PjwvdGFibGU+XG5cdH1cblxuLypcblx0bmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKXtcblx0XHRsZXQgYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0cmV0dXJuIHt3aWR0aDogdGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OiBhdmFpbGFibGVTcGFjZS5oZWlnaHR9XG5cdH1cblx0YXBwZW5kQ29tcG9zZWQoY29sR3JvdXBzKXtcblx0XHRpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChbXSlcblx0XHRjb25zdCBjdXJyZW50Um93PXRoaXMuY29tcHV0ZWQuY29tcG9zZWRbdGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgtMV1cblx0XHRjdXJyZW50Q2VsbC5wdXNoKGxpbmUpXG5cblx0XHRjb25zdCB7d2lkdGgsIHRibEdyaWQ6Y29sc309dGhpcy5wcm9wc1xuXHRcdGxldCBoZWlnaHQ9MCwgc2VsZj10aGlzXG5cblx0XHRsZXQgeD0wLCByb3dObz10aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC0xXG5cdFx0bGV0IGdyb3Vwc1dpdGhYWT1jb2xHcm91cHMubWFwKChsaW5lc1dpdGhTdHlsZSxjb2xObyk9Pntcblx0XHRcdGxldCB7Ym9yZGVyLCBtYXJnaW4sIHNwYWNpbmcsIGJhY2tncm91bmR9PWxpbmVzV2l0aFN0eWxlLnN0eWxlXG5cdFx0XHRsZXQgeT0wXG5cdFx0XHRsZXQgZ3JvdXBlZD1saW5lc1dpdGhTdHlsZS5tYXAobGluZT0+e1xuXHRcdFx0XHRcdGxldCBhPTxHcm91cCB5PXt5fT57bGluZX08L0dyb3VwPlxuXHRcdFx0XHRcdHkrPWxpbmUucHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdFx0fSlcblx0XHRcdHkrPShzcGFjaW5nKi41XG5cdFx0XHRcdCtib3JkZXIudG9wLnN6XG5cdFx0XHRcdCttYXJnaW4udG9wXG5cdFx0XHRcdCttYXJnaW4uYm90dG9tXG5cdFx0XHRcdCtib3JkZXIuYm90dG9tLnN6XG5cdFx0XHRcdCtzcGFjaW5nKi41KVxuXHRcdFx0bGV0IGNlbGw9KFxuXHRcdFx0XHQ8Q2VsbCBoZWlnaHQ9e3l9IHg9e3h9IHdpZHRoPXtjb2xzW2NvbE5vXX0gYmFja2dyb3VuZD17YmFja2dyb3VuZH0+XG5cdFx0XHRcdFx0PFNwYWNpbmcgeD17c3BhY2luZy8yfSB5PXtzcGFjaW5nLzJ9PlxuXHRcdFx0XHRcdFx0PEJvcmRlciBib3JkZXI9e2JvcmRlcn0gc3BhY2luZz17c3BhY2luZ30+XG5cdFx0XHRcdFx0XHRcdDxNYXJnaW4geD17bWFyZ2luLmxlZnR9IHk9e21hcmdpbi50b3B9PlxuXHRcdFx0XHRcdFx0XHRcdHtncm91cGVkfVxuXHRcdFx0XHRcdFx0XHQ8L01hcmdpbj5cblx0XHRcdFx0XHRcdDwvQm9yZGVyPlxuXHRcdFx0XHRcdDwvU3BhY2luZz5cblx0XHRcdFx0PC9DZWxsPlxuXHRcdFx0KTtcblx0XHRcdHgrPWNvbHNbY29sTm9dXG5cdFx0XHRoZWlnaHQ9TWF0aC5tYXgoaGVpZ2h0LHkpXG5cdFx0XHRyZXR1cm4gY2VsbFxuXHRcdH0pXG5cblx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHt3aWR0aCxoZWlnaHQsY2hpbGRyZW46Z3JvdXBzV2l0aFhZfSkpXG5cdH1cbiovXG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuOnJvd3N9PXRoaXMuY29tcHV0ZWRcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRjb25zdCBoZWFkZXJzPXRoaXMuZ2V0SGVhZGVyUm93Q291bnQoKVxuXHRcdGxldCB5PTAsIHdpZHRoPTBcblxuXHRcdGxldCBwb3NpdGlvbmVkUm93cz1yb3dzLnJlZHVjZSgoc3RhdGUscm93LCBpKT0+e1xuXHRcdFx0bGV0IHtoZWlnaHR9PXN0YXRlLnNwYWNlXG5cdFx0XHRjb25zdCBsaW5lcz1zdGF0ZS5saW5lc1xuXHRcdFx0bGV0IGNvbXBvc2VkTGluZT1yb3cuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHN0YXRlKVxuXHRcdFx0bGluZXMucHVzaChjb21wb3NlZExpbmUpXG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LHtzcGFjZTpwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCksbGluZXM6W10scm93OjAsIGNlbGw6MH0pXG5cdFx0XHQubGluZXMubWFwKChsaW5lUm93LGkpPT57XG5cdFx0XHRcdGNvbnN0IHtoZWlnaHQsd2lkdGg6cm93V2lkdGh9PWxpbmVSb3cucHJvcHNcblx0XHRcdFx0bGV0IHBvc2l0aW9uZWRMaW5lUm93PSg8R3JvdXAgeT17eX0ga2V5PXtpfT57bGluZVJvd308L0dyb3VwPilcblx0XHRcdFx0eSs9aGVpZ2h0XG5cdFx0XHRcdHdpZHRoPU1hdGgubWF4KHdpZHRoLHJvd1dpZHRoKVxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25lZExpbmVSb3dcblx0XHRcdH0pXG5cdFx0bGV0IHttYXJnaW46e2xlZnQ6eH0sIGJvcmRlcjp7dG9wOntzen19fT1yb3dzWzBdLmNvbXB1dGVkLmNoaWxkcmVuWzBdLmdldFN0eWxlKClcblxuXHRcdGxldCB0YWJsZT0oXG5cdFx0XHQ8R3JvdXAgaGVpZ2h0PXt5fSB3aWR0aD17d2lkdGh9IHg9ey14fSB5PXtzei8yfT5cblx0XHRcdFx0e3Bvc2l0aW9uZWRSb3dzfVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cblx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGFibGUpXG5cblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG5cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPFJvdyB7Li4ucHJvcHN9Lz5cblx0fVxuXG5cdGdldEhlYWRlclJvd0NvdW50KCl7XG5cdFx0Y29uc3Qge2ZpcnN0Um93fT0odGhpcy5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdGlmKGZpcnN0Um93IT09XCIxXCIpXG5cdFx0XHRyZXR1cm4gMFxuXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbikuZmlsdGVyKGE9Pntcblx0XHRcdGxldCBzdHlsZT1hLnByb3BzLmRpcmVjdFN0eWxlXG5cdFx0XHRpZihzdHlsZSAmJiBzdHlsZS50YmxIZWFkZXIpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9KS5sZW5ndGhcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHR0YWJsZVN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGlzRmlyc3RSb3c6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzTGFzdFJvdzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNGaXJzdFJvd0Fic29sdXRlOiBQcm9wVHlwZXMuZnVuYyxcblx0XHRpc0xhc3RSb3dBYnNvbHV0ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0aXNCYW5kMUhvcno6IFByb3BUeXBlcy5mdW5jLFxuXHRcdGlzQmFuZDJIb3J6OiBQcm9wVHlwZXMuZnVuY1xuXHR9LCBTdXBlci5jaGlsZENvbnRleHRUeXBlcylcblxuXHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRsZXQgc2VsZj10aGlzXG5cdFx0Y29uc3Qge2ZpcnN0Um93LCBsYXN0Um93LCBub0hCYW5kfT0oc2VsZi5wcm9wcy5kaXJlY3RTdHlsZXx8c2VsZi5kZWZhdWx0U3R5bGUpLmdldCgndGJsUHIudGJsTG9vaycpfHx7fVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdHRhYmxlU3R5bGU6IHRoaXMucHJvcHMuZGlyZWN0U3R5bGV8fHRoaXMuZGVmYXVsdFN0eWxlLFxuXHRcdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0XHRyZXR1cm4gZmlyc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNGaXJzdFJvd0Fic29sdXRlKClcblx0XHRcdH0sXG5cdFx0XHRpc0ZpcnN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT0wXG5cdFx0XHR9LFxuXG5cdFx0XHRpc0xhc3RSb3coKXtcblx0XHRcdFx0cmV0dXJuIGxhc3RSb3c9PVwiMVwiICYmIHRoaXMuaXNMYXN0Um93QWJzb2x1dGUoKVxuXHRcdFx0fSxcblxuXHRcdFx0aXNMYXN0Um93QWJzb2x1dGUoKXtcblx0XHRcdFx0cmV0dXJuIHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoPT1zZWxmLmdldENvbnRlbnRDb3VudCgpLTFcblx0XHRcdH0sXG5cblx0XHRcdGlzQmFuZDFIb3J6KCl7XG5cdFx0XHRcdHJldHVybiBub0hCYW5kPT1cIjBcIiAmJiAhdGhpcy5pc0ZpcnN0Um93KCkgJiYgIXRoaXMuaXNMYXN0Um93KCkgJiYgKHNlbGYuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoLXNlbGYuZ2V0SGVhZGVyUm93Q291bnQoKSklMj09MVxuXHRcdFx0fSxcblxuXHRcdFx0aXNCYW5kMkhvcnooKXtcblx0XHRcdFx0cmV0dXJuIG5vSEJhbmQ9PVwiMFwiJiYgIXRoaXMuaXNGaXJzdFJvdygpICYmICF0aGlzLmlzTGFzdFJvdygpICYmIChzZWxmLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aC1zZWxmLmdldEhlYWRlclJvd0NvdW50KCkpJTI9PTBcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=