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
      var _props$size = _props.size;
      var width = _props$size.width;
      var height = _props$size.height;
      var _props$margin = _props.margin;
      var top = _props$margin.top;
      var bottom = _props$margin.bottom;
      var left = _props$margin.left;
      var right = _props$margin.right;
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
      var size = _props2.size;
      var margin = _props2.margin;

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
      var composed = this.composed;

      if (composed.length == 0) this.composed.push(this._newPage());
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
      var composed = this.composed;
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
      this.context.parent.appendComposed(this.composed[this.composed.length - 1]);
      _get(Object.getPrototypeOf(Section.prototype), "onAllChildrenComposed", this).call(this);
    }
  }]);

  return Section;
}(_any2.default);

Section.displayName = "section";
Section.defaultProps = {
  size: {
    width: 300,
    height: 400,
    margin: 20
  },
  margin: {
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
  size: _react.PropTypes.shape({
    width: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired
  }),
  margin: _react.PropTypes.shape({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozs7OytCQU1OLEdBQUU7bUJBQzZFLEtBQUssS0FBTCxDQUQ3RTsrQkFDUixLQURRO1VBQ0YsMEJBREU7VUFDSyw0QkFETDtpQ0FDZSxPQURmO1VBQ3VCLHdCQUR2QjtVQUM0Qiw4QkFENUI7VUFDb0MsMEJBRHBDO1VBQzBDLDRCQUQxQzsrQkFDa0QsS0FEbEQ7d0NBQ3dELElBRHhEO1VBQ3dELHNDQUFJLG9CQUQ1RDtVQUMrRCwwQkFEL0Q7VUFDc0Usd0JBRHRFOztBQUVmLFVBQUksT0FBSztBQUNSLFdBQUUsQ0FBRjtBQUNBLGdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxrQkFBUyxFQUFUO09BSE4sQ0FGVztBQU9mLFVBQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLFVBQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxhQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxhQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7T0FBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsYUFBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7aUJBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtTQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLGFBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtPQUFSLE1BR0Q7QUFDSixZQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixHQUEvQixDQURUO0FBRUosYUFBSyxDQUFMLEdBQU8sS0FBRyxXQUFT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Q0FBZ0I7QUFDdkIsVUFBTSxpQkFBVSxNQUFWO0FBQ04sV0FBTyxpQkFBVSxNQUFWO0FBQ1AsU0FBSyxpQkFBVSxNQUFWO0FBQ0wsWUFBUSxpQkFBVSxNQUFWOztBQUVSLFlBQVEsaUJBQVUsTUFBVjtBQUNSLFlBQVEsaUJBQVUsTUFBVjs7QUFFUixZQUFRLGlCQUFVLE1BQVY7R0FURCxDQUFSO0FBV0EsUUFBTSxpQkFBVSxNQUFWOztrQkFySmEiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG5cdFx0Y29uc3Qge3NpemU6e3dpZHRoLCBoZWlnaHR9LCAgbWFyZ2luOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluZm89e1xuXHRcdFx0eTowLFxuXHRcdFx0aGVpZ2h0OmhlaWdodC1ib3R0b20tdG9wLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cblx0XHR9XG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPXdpZHRoLWxlZnQtcmlnaHRcblxuXHRcdGlmKG51bT09MSl7XG5cdFx0XHRpbmZvLndpZHRoPWF2YWlsYWJsZVdpZHRoXG5cdFx0XHRpbmZvLng9MFxuXHRcdH1lbHNlIGlmKGRhdGEpe1xuXHRcdFx0aW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcblx0XHRcdGluZm8ud2lkdGg9ZGF0YVtpXS53aWR0aFxuXHRcdH1lbHNle1xuXHRcdFx0bGV0IGNvbFdpZHRoPShhdmFpbGFibGVXaWR0aC0obnVtLTEpKnNwYWNlKS9udW1cblx0XHRcdGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcblx0XHRcdGluZm8ud2lkdGg9Y29sV2lkdGhcblx0XHR9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7c2l6ZSwgIG1hcmdpbn09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgaW5mbz17XG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgbWFyZ2luLFxuICAgICAgICAgICAgY29sdW1uczpbdGhpcy5fbmV3Q29sdW1uKDApXSxcbiAgICAgICAgICAgIGhlYWRlcjpudWxsLFxuICAgICAgICAgICAgZm9vdGVyOm51bGxcbiAgICAgICAgfVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoY29tcG9zZWQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2Vcblx0XHRcdFx0Y29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50UGFnZSlcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG5cblx0XHRjaGlsZHJlbi5wdXNoKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHtjaGlsZHJlbjpsaW5lLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgeTogaGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0pKVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cdFxuXHQvKipcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXG5cdCAqL1xuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XG5cdH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICAvL2Rvbid0IGNoZWNrLCBhbmQgZG9jdW1lbnQgd2lsbCBjaGVjayBhZ2FpbnN0IGxhc3QgcGFnZVxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY29tcG9zZWRbdGhpcy5jb21wb3NlZC5sZW5ndGgtMV0pXG4gICAgICAgIHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNpemU6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9LFxuXHRcdG1hcmdpbjp7XG5cdFx0XHRsZWZ0OjIwLFxuXHRcdFx0cmlnaHQ6MjAsXG5cdFx0XHR0b3A6MjAsXG5cdFx0XHRib3R0b206MjAsXG5cblx0XHRcdGhlYWRlcjoxMCxcblx0XHRcdGZvb3RlcjoxMCxcblxuXHRcdFx0Z3V0dGVyOjBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRzaXplOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG5cdFx0fSksXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRmb290ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHR9KSxcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cbiJdfQ==