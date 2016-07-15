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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozs7OytCQU1OLEdBQUU7bUJBQzZFLEtBQUssS0FBTCxDQUQ3RTsrQkFDUixLQURRO1VBQ0YsMEJBREU7VUFDSyw0QkFETDtpQ0FDZSxPQURmO1VBQ3VCLHdCQUR2QjtVQUM0Qiw4QkFENUI7VUFDb0MsMEJBRHBDO1VBQzBDLDRCQUQxQzsrQkFDa0QsS0FEbEQ7d0NBQ3dELElBRHhEO1VBQ3dELHNDQUFJLG9CQUQ1RDtVQUMrRCwwQkFEL0Q7VUFDc0Usd0JBRHRFOztBQUVmLFVBQUksT0FBSztBQUNSLFdBQUUsQ0FBRjtBQUNBLGdCQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxrQkFBUyxFQUFUO09BSE4sQ0FGVztBQU9mLFVBQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLFVBQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxhQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxhQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7T0FBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsYUFBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7aUJBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtTQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLGFBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtPQUFSLE1BR0Q7QUFDSixZQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixHQUEvQixDQURUO0FBRUosYUFBSyxDQUFMLEdBQU8sS0FBRyxXQUFT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LGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7R0FGSCxDQUFOO0FBSUEsVUFBUSxpQkFBVSxLQUFWLENBQWdCO0FBQ3ZCLFVBQU0saUJBQVUsTUFBVjtBQUNOLFdBQU8saUJBQVUsTUFBVjtBQUNQLFNBQUssaUJBQVUsTUFBVjtBQUNMLFlBQVEsaUJBQVUsTUFBVjs7QUFFUixZQUFRLGlCQUFVLE1BQVY7QUFDUixZQUFRLGlCQUFVLE1BQVY7O0FBRVIsWUFBUSxpQkFBVSxNQUFWO0dBVEQsQ0FBUjtBQVdBLFFBQU0saUJBQVUsTUFBVjs7a0JBckphIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwic2VjdGlvblwiXG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuXHRcdGNvbnN0IHtzaXplOnt3aWR0aCwgaGVpZ2h0fSwgIG1hcmdpbjp7dG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0fSwgY29sczp7bnVtPTEsIHNwYWNlLCBkYXRhfX09dGhpcy5wcm9wc1xuXHRcdGxldCBpbmZvPXtcblx0XHRcdHk6MCxcblx0XHRcdGhlaWdodDpoZWlnaHQtYm90dG9tLXRvcCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG5cdFx0fVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD13aWR0aC1sZWZ0LXJpZ2h0XG5cblx0XHRpZihudW09PTEpe1xuXHRcdFx0aW5mby53aWR0aD1hdmFpbGFibGVXaWR0aFxuXHRcdFx0aW5mby54PTBcblx0XHR9ZWxzZSBpZihkYXRhKXtcblx0XHRcdGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvbnVtXG5cdFx0XHRpbmZvLng9aSooY29sV2lkdGgrc3BhY2UpXG5cdFx0XHRpbmZvLndpZHRoPWNvbFdpZHRoXG5cdFx0fVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3NpemUsICBtYXJnaW59PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGluZm89e1xuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudFBhZ2UpXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXG5cdFx0Y2hpbGRyZW4ucHVzaCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Y2hpbGRyZW46bGluZSwgaGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHk6IGhlaWdodC1hdmFpbGFibGVIZWlnaHR9KSlcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgc2VjdGlvbiBuZWVkbid0IGFwcGVuZCB0byBkb2N1bWVudCwgYnV0IGdpdmUgY2hhbmNlIGZvciBleHRlbnNpb25cblx0ICovXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHJvcHN9Lz5cblx0fVxuXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG4gICAgICAgIC8vZG9uJ3QgY2hlY2ssIGFuZCBkb2N1bWVudCB3aWxsIGNoZWNrIGFnYWluc3QgbGFzdCBwYWdlXG4gICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXSlcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2l6ZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwLFxuXHRcdFx0bWFyZ2luOiAyMFxuXHRcdH0sXG5cdFx0bWFyZ2luOntcblx0XHRcdGxlZnQ6MjAsXG5cdFx0XHRyaWdodDoyMCxcblx0XHRcdHRvcDoyMCxcblx0XHRcdGJvdHRvbToyMCxcblxuXHRcdFx0aGVhZGVyOjEwLFxuXHRcdFx0Zm9vdGVyOjEwLFxuXG5cdFx0XHRndXR0ZXI6MFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHNpemU6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KSxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0cmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHR0b3A6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGhlYWRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGZvb3RlcjogUHJvcFR5cGVzLm51bWJlcixcblxuXHRcdFx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdH0pLFxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuIl19