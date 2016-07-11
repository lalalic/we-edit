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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozs7OytCQU1OLEdBQUU7bUJBQzZFLEtBQUssS0FBTCxDQUQ3RTsrQkFDUixLQURRO1VBQ0YsMEJBREU7VUFDSyw0QkFETDtpQ0FDZSxPQURmO1VBQ3VCLHdCQUR2QjtVQUM0Qiw4QkFENUI7VUFDb0MsMEJBRHBDO1VBQzBDLDRCQUQxQzsrQkFDa0QsS0FEbEQ7d0NBQ3dELElBRHhEO1VBQ3dELHNDQUFJLG9CQUQ1RDtVQUMrRCwwQkFEL0Q7VUFDc0Usd0JBRHRFOztBQUVmLFVBQUksT0FBSztBQUNSLFdBQUUsQ0FBRjtBQUNBLGdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxrQkFBUyxFQUFUO09BSE4sQ0FGVztBQU9mLFVBQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLFVBQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxhQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxhQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7T0FBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsYUFBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7aUJBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtTQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLGFBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtPQUFSLE1BR0Q7QUFDSixZQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixHQUEvQixDQURUO0FBRUosYUFBSyxDQUFMLEdBQU8sS0FBRyxXQUFT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QUFVLE1BQVY7QUFDUCxTQUFLLGlCQUFVLE1BQVY7QUFDTCxZQUFRLGlCQUFVLE1BQVY7O0FBRVIsWUFBUSxpQkFBVSxNQUFWO0FBQ1IsWUFBUSxpQkFBVSxNQUFWOztBQUVSLFlBQVEsaUJBQVUsTUFBVjtHQVRELENBQVI7QUFXQSxRQUFNLGlCQUFVLE1BQVY7O2tCQTlJYSIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcblx0XHRjb25zdCB7c2l6ZTp7d2lkdGgsIGhlaWdodH0sICBtYXJnaW46e3RvcCwgYm90dG9tLCBsZWZ0LCByaWdodH0sIGNvbHM6e251bT0xLCBzcGFjZSwgZGF0YX19PXRoaXMucHJvcHNcblx0XHRsZXQgaW5mbz17XG5cdFx0XHR5OjAsXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuXHRcdH1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxuXG5cdFx0aWYobnVtPT0xKXtcblx0XHRcdGluZm8ud2lkdGg9YXZhaWxhYmxlV2lkdGhcblx0XHRcdGluZm8ueD0wXG5cdFx0fWVsc2UgaWYoZGF0YSl7XG5cdFx0XHRpbmZvLng9ZGF0YS5yZWR1Y2UoKHAsIGEsIGopPT4oajxpID8gcCthLndpZHRoK2Euc3BhY2UgOiBwKSwwKVxuXHRcdFx0aW5mby53aWR0aD1kYXRhW2ldLndpZHRoXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgY29sV2lkdGg9KGF2YWlsYWJsZVdpZHRoLShudW0tMSkqc3BhY2UpL251bVxuXHRcdFx0aW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxuXHRcdFx0aW5mby53aWR0aD1jb2xXaWR0aFxuXHRcdH1cblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtzaXplLCAgbWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcblxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKGN1cnJlbnRQYWdlKVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG4gICAgICAgIC8vZG9uJ3QgY2hlY2ssIGFuZCBkb2N1bWVudCB3aWxsIGNoZWNrIGFnYWluc3QgbGFzdCBwYWdlXG4gICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jb21wb3NlZFt0aGlzLmNvbXBvc2VkLmxlbmd0aC0xXSlcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2l6ZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwLFxuXHRcdFx0bWFyZ2luOiAyMFxuXHRcdH0sXG5cdFx0bWFyZ2luOntcblx0XHRcdGxlZnQ6MjAsXG5cdFx0XHRyaWdodDoyMCxcblx0XHRcdHRvcDoyMCxcblx0XHRcdGJvdHRvbToyMCxcblxuXHRcdFx0aGVhZGVyOjEwLFxuXHRcdFx0Zm9vdGVyOjEwLFxuXG5cdFx0XHRndXR0ZXI6MFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHNpemU6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KSxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0cmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHR0b3A6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGhlYWRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGZvb3RlcjogUHJvcFR5cGVzLm51bWJlcixcblxuXHRcdFx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdH0pLFxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuIl19