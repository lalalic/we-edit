"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Any) {
  _inherits(Section, _Any);

  function Section() {
    _classCallCheck(this, Section);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
  }

  _createClass(Section, [{
    key: "_newColumn",


    /**
     * i: column no
     */
    value: function _newColumn(i) {
      var _props = this.props;
      var _props$pgSz = _props.pgSz;
      var width = _props$pgSz.width;
      var height = _props$pgSz.height;
      var _props$pgMar = _props.pgMar;
      var top = _props$pgMar.top;
      var bottom = _props$pgMar.bottom;
      var left = _props$pgMar.left;
      var right = _props$pgMar.right;
      var _props$cols = _props.cols;
      var _props$cols$num = _props$cols.num;
      var num = _props$cols$num === undefined ? 1 : _props$cols$num;
      var space = _props$cols.space;
      var data = _props$cols.data;

      var info = {
        y: 0,
        height: height - bottom - top,
        children: []
      };
      var availableWidth = width - left - right;

      if (num == 1) {
        info.width = availableWidth;
        info.x = 0;
      } else if (data) {
        info.x = data.reduce(function (p, a, j) {
          return j < i ? p + a.width + a.space : p;
        }, 0);
        info.width = data[i].width;
      } else {
        var colWidth = (availableWidth - (num - 1) * space) / num;
        info.x = i * (colWidth + space);
        info.width = colWidth;
      }
      return info;
    }

    /**
     * i : page No, for first, even, odd page
     */

  }, {
    key: "_newPage",
    value: function _newPage(i) {
      var _props2 = this.props;
      var size = _props2.pgSz;
      var margin = _props2.pgMar;

      var info = {
        size: size,
        margin: margin,
        columns: [this._newColumn(0)],
        header: null,
        footer: null
      };
      return info;
    }
  }, {
    key: "nextAvailableSpace",
    value: function nextAvailableSpace() {
      var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var _required$width = required.width;
      var minRequiredW = _required$width === undefined ? 0 : _required$width;
      var _required$height = required.height;
      var minRequiredH = _required$height === undefined ? 0 : _required$height;
      var composed = this.computed.composed;

      if (composed.length == 0) this.computed.composed.push(this._newPage());
      var _props$cols$num2 = this.props.cols.num;
      var allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

      var currentPage = composed[composed.length - 1];
      var _currentPage = currentPage;
      var columns = _currentPage.columns;

      var currentColumn = columns[columns.length - 1];
      var _currentColumn = currentColumn;
      var width = _currentColumn.width;
      var height = _currentColumn.height;
      var children = _currentColumn.children;

      var availableHeight = children.reduce(function (prev, a) {
        return prev - a.props.height;
      }, height);

      //@TODO: what if never can find min area
      while (availableHeight <= minRequiredH || width < minRequiredW) {
        if (allowedColumns > columns.length) {
          // new column
          columns.push(currentColumn = this._newColumn(columns.length));
        } else {
          //new page
          composed.push(currentPage = this._newPage(composed.length));
          currentColumn = currentPage.columns[0];
        }
        width = currentColumn.width;
        height = currentColumn.height;
        availableHeight = currentColumn.height;
      }
      return { width: width, height: availableHeight };
    }
  }, {
    key: "appendComposed",
    value: function appendComposed(line) {
      var composed = this.computed.composed;
      var _props$cols$num3 = this.props.cols.num;
      var allowedColumns = _props$cols$num3 === undefined ? 1 : _props$cols$num3;

      var currentPage = composed[composed.length - 1];
      var _currentPage2 = currentPage;
      var columns = _currentPage2.columns;

      var currentColumn = columns[columns.length - 1];
      var _currentColumn2 = currentColumn;
      var width = _currentColumn2.width;
      var height = _currentColumn2.height;
      var children = _currentColumn2.children;

      var availableHeight = children.reduce(function (prev, a) {
        return prev - a.props.height;
      }, height);

      var contentHeight = line.props.height;


      if (contentHeight > availableHeight) {
        if (allowedColumns > columns.length) {
          // new column
          columns.push(currentColumn = this._newColumn(columns.length));
        } else {
          //new page
          this.context.parent.appendComposed(currentPage);
          composed.push(currentPage = this._newPage(composed.length));
          currentColumn = currentPage.columns[0];
        }
        availableHeight = currentColumn.height;

        //@TODO: what if currentColumn.width!=line.width

        children = currentColumn.children;
      }

      children.push(this.createComposed2Parent({ children: line, height: contentHeight, y: height - availableHeight }));
      //@TODO: what if contentHeight still > availableHeight
    }

    /**
     *  section needn't append to document, but give chance for extension
     */

  }, {
    key: "createComposed2Parent",
    value: function createComposed2Parent(props) {
      return _react2.default.createElement(_group2.default, props);
    }
  }, {
    key: "onAllChildrenComposed",
    value: function onAllChildrenComposed() {
      //don't check, and document will check against last page
      this.context.parent.appendComposed(this.computed.composed[this.computed.composed.length - 1]);
      _get(Object.getPrototypeOf(Section.prototype), "onAllChildrenComposed", this).call(this);
    }
  }]);

  return Section;
}(_any2.default);

Section.displayName = "section";
Section.defaultProps = {
  pgSz: {
    width: 300,
    height: 400
  },
  pgMar: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20,

    header: 10,
    footer: 10,

    gutter: 0
  }
};
Section.propTypes = {
  pgSz: _react.PropTypes.shape({
    width: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired
  }),
  pgMar: _react.PropTypes.shape({
    left: _react.PropTypes.number,
    right: _react.PropTypes.number,
    top: _react.PropTypes.number,
    bottom: _react.PropTypes.number,

    header: _react.PropTypes.number,
    footer: _react.PropTypes.number,

    gutter: _react.PropTypes.number
  }),
  cols: _react.PropTypes.object
};
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozs7OytCQU1OLEdBQUU7bUJBQzRFLEtBQUssS0FBTCxDQUQ1RTsrQkFDUixLQURRO1VBQ0YsMEJBREU7VUFDSyw0QkFETDtnQ0FDZSxNQURmO1VBQ3NCLHVCQUR0QjtVQUMyQiw2QkFEM0I7VUFDbUMseUJBRG5DO1VBQ3lDLDJCQUR6QzsrQkFDaUQsS0FEakQ7d0NBQ3VELElBRHZEO1VBQ3VELHNDQUFJLG9CQUQzRDtVQUM4RCwwQkFEOUQ7VUFDcUUsd0JBRHJFOztBQUVmLFVBQUksT0FBSztBQUNSLFdBQUUsQ0FBRjtBQUNBLGdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxrQkFBUyxFQUFUO09BSE4sQ0FGVztBQU9mLFVBQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLFVBQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxhQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxhQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7T0FBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsYUFBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7aUJBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtTQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLGFBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtPQUFSLE1BR0Q7QUFDSixZQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixHQUEvQixDQURUO0FBRUosYUFBSyxDQUFMLEdBQU8sS0FBRyxXQUFT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QUFVLE1BQVYsQ0FBaUIsVUFBakI7R0FGSCxDQUFOO0FBSUEsU0FBTyxpQkFBVSxLQUFWLENBQWdCO0FBQ3RCLFVBQU0saUJBQVUsTUFBVjtBQUNOLFdBQU8saUJBQVUsTUFBVjtBQUNQLFNBQUssaUJBQVUsTUFBVjtBQUNMLFlBQVEsaUJBQVUsTUFBVjs7QUFFUixZQUFRLGlCQUFVLE1BQVY7QUFDUixZQUFRLGlCQUFVLE1BQVY7O0FBRVIsWUFBUSxpQkFBVSxNQUFWO0dBVEYsQ0FBUDtBQVdBLFFBQU0saUJBQVUsTUFBVjs7a0JBcEphIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwic2VjdGlvblwiXG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuXHRcdGNvbnN0IHtwZ1N6Ont3aWR0aCwgaGVpZ2h0fSwgIHBnTWFyOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluZm89e1xuXHRcdFx0eTowLFxuXHRcdFx0aGVpZ2h0OmhlaWdodC1ib3R0b20tdG9wLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cblx0XHR9XG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPXdpZHRoLWxlZnQtcmlnaHRcblxuXHRcdGlmKG51bT09MSl7XG5cdFx0XHRpbmZvLndpZHRoPWF2YWlsYWJsZVdpZHRoXG5cdFx0XHRpbmZvLng9MFxuXHRcdH1lbHNlIGlmKGRhdGEpe1xuXHRcdFx0aW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcblx0XHRcdGluZm8ud2lkdGg9ZGF0YVtpXS53aWR0aFxuXHRcdH1lbHNle1xuXHRcdFx0bGV0IGNvbFdpZHRoPShhdmFpbGFibGVXaWR0aC0obnVtLTEpKnNwYWNlKS9udW1cblx0XHRcdGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcblx0XHRcdGluZm8ud2lkdGg9Y29sV2lkdGhcblx0XHR9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7cGdTejpzaXplLCAgcGdNYXI6bWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcblxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKGN1cnJlbnRQYWdlKVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2godGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe2NoaWxkcmVuOmxpbmUsIGhlaWdodDpjb250ZW50SGVpZ2h0LCB5OiBoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSkpXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuXHQvKipcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXG5cdCAqL1xuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XG5cdH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICAvL2Rvbid0IGNoZWNrLCBhbmQgZG9jdW1lbnQgd2lsbCBjaGVjayBhZ2FpbnN0IGxhc3QgcGFnZVxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY29tcHV0ZWQuY29tcG9zZWRbdGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgtMV0pXG4gICAgICAgIHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBnU3o6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMFxuXHRcdH0sXG5cdFx0cGdNYXI6e1xuXHRcdFx0bGVmdDoyMCxcblx0XHRcdHJpZ2h0OjIwLFxuXHRcdFx0dG9wOjIwLFxuXHRcdFx0Ym90dG9tOjIwLFxuXG5cdFx0XHRoZWFkZXI6MTAsXG5cdFx0XHRmb290ZXI6MTAsXG5cblx0XHRcdGd1dHRlcjowXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0cGdTejogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0XHRoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuXHRcdH0pLFxuXHRcdHBnTWFyOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRmb290ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHR9KSxcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cbiJdfQ==