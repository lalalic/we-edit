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
        var colWidth = (availableWidth - (num - 1) * space) / 2;
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
          this.context.parent.appendComposed(currentPage);
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
          this.context.parent.appendChild(currentPage);
          composed.push(currentPage = this._newPage(composed.length));
          currentColumn = currentPage.columns[0];
        }
        availableHeight = currentColumn.height;

        //@TODO: what if currentColumn.width!=line.width

        children = currentColumn.children;
      }

      children.push(_react2.default.createElement(
        _group2.default,
        { y: height - availableHeight, height: contentHeight, index: this.children.length },
        line
      ));
      //@TODO: what if contentHeight still > availableHeight
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
Section.contextTypes = Object.assign({
  canvas: _react.PropTypes.object,
  y: _react.PropTypes.number
}, _any2.default.contextTypes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozs7OytCQVdOLEdBQUU7bUJBQzZFLEtBQUssS0FBTCxDQUQ3RTsrQkFDUixLQURRO1VBQ0YsMEJBREU7VUFDSyw0QkFETDtpQ0FDZSxPQURmO1VBQ3VCLHdCQUR2QjtVQUM0Qiw4QkFENUI7VUFDb0MsMEJBRHBDO1VBQzBDLDRCQUQxQzsrQkFDa0QsS0FEbEQ7d0NBQ3dELElBRHhEO1VBQ3dELHNDQUFJLG9CQUQ1RDtVQUMrRCwwQkFEL0Q7VUFDc0Usd0JBRHRFOztBQUVmLFVBQUksT0FBSztBQUNSLFdBQUUsQ0FBRjtBQUNBLGdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxrQkFBUyxFQUFUO09BSE4sQ0FGVztBQU9mLFVBQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLFVBQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxhQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxhQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7T0FBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsYUFBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7aUJBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtTQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLGFBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtPQUFSLE1BR0Q7QUFDSixZQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixDQUEvQixDQURUO0FBRUosYUFBSyxDQUFMLEdBQU8sS0FBRyxXQUFT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QUFWLENBQWdCO0FBQ3JCLFdBQU8saUJBQVUsTUFBVixDQUFpQixVQUFqQjtBQUNQLFlBQVEsaUJBQVUsTUFBVixDQUFpQixVQUFqQjtHQUZILENBQU47QUFJQSxVQUFRLGlCQUFVLEtBQVYsQ0FBZ0I7QUFDdkIsVUFBTSxpQkFBVSxNQUFWO0FBQ04sV0FBTyxpQkFBVSxNQUFWO0FBQ1AsU0FBSyxpQkFBVSxNQUFWO0FBQ0wsWUFBUSxpQkFBVSxNQUFWOztBQUVSLFlBQVEsaUJBQVUsTUFBVjtBQUNSLFlBQVEsaUJBQVUsTUFBVjs7QUFFUixZQUFRLGlCQUFVLE1BQVY7R0FURCxDQUFSO0FBV0EsUUFBTSxpQkFBVSxNQUFWOztrQkFwSmEiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0eTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuXHRcdGNvbnN0IHtzaXplOnt3aWR0aCwgaGVpZ2h0fSwgIG1hcmdpbjp7dG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0fSwgY29sczp7bnVtPTEsIHNwYWNlLCBkYXRhfX09dGhpcy5wcm9wc1xuXHRcdGxldCBpbmZvPXtcblx0XHRcdHk6MCxcblx0XHRcdGhlaWdodDpoZWlnaHQtYm90dG9tLXRvcCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG5cdFx0fVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD13aWR0aC1sZWZ0LXJpZ2h0XG5cblx0XHRpZihudW09PTEpe1xuXHRcdFx0aW5mby53aWR0aD1hdmFpbGFibGVXaWR0aFxuXHRcdFx0aW5mby54PTBcblx0XHR9ZWxzZSBpZihkYXRhKXtcblx0XHRcdGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvMlxuXHRcdFx0aW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxuXHRcdFx0aW5mby53aWR0aD1jb2xXaWR0aFxuXHRcdH1cblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtzaXplLCAgbWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudFBhZ2UpXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ2hpbGQoY3VycmVudFBhZ2UpXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXG5cdFx0Y2hpbGRyZW4ucHVzaCg8R3JvdXAgeT17aGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0gaGVpZ2h0PXtjb250ZW50SGVpZ2h0fSBpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9PntsaW5lfTwvR3JvdXA+KVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgLy9kb24ndCBjaGVjaywgYW5kIGRvY3VtZW50IHdpbGwgY2hlY2sgYWdhaW5zdCBsYXN0IHBhZ2VcbiAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNvbXBvc2VkW3RoaXMuY29tcG9zZWQubGVuZ3RoLTFdKVxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRzaXplOiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDAsXG5cdFx0XHRtYXJnaW46IDIwXG5cdFx0fSxcblx0XHRtYXJnaW46e1xuXHRcdFx0bGVmdDoyMCxcblx0XHRcdHJpZ2h0OjIwLFxuXHRcdFx0dG9wOjIwLFxuXHRcdFx0Ym90dG9tOjIwLFxuXG5cdFx0XHRoZWFkZXI6MTAsXG5cdFx0XHRmb290ZXI6MTAsXG5cblx0XHRcdGd1dHRlcjowXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0c2l6ZTogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0XHRoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuXHRcdH0pLFxuXHRcdG1hcmdpbjogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRcdGxlZnQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRyaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHRvcDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGJvdHRvbTogUHJvcFR5cGVzLm51bWJlcixcblxuXHRcdFx0aGVhZGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Zm9vdGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0fSksXG5cdFx0Y29sczogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG4iXX0=