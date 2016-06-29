"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _page = require("../compose/page");

var _page2 = _interopRequireDefault(_page);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var suuid = 0;

var Section = function (_Any) {
  _inherits(Section, _Any);

  function Section() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Section);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Section)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.sectionId = suuid++, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Section, [{
    key: "compose",
    value: function compose() {
      _get(Object.getPrototypeOf(Section.prototype), "compose", this).call(this);
      var composed = this.composed;

      if (composed.length == 0) composed.push(this._newPage());
    }

    /**
     * i: column no
     */

  }, {
    key: "_newColumn",
    value: function _newColumn(i) {
      var _props$page = this.props.page;
      var width = _props$page.width;
      var height = _props$page.height;
      var margin = _props$page.margin;
      //@TODO:

      return {
        x: margin,
        y: margin,
        width: width - 2 * margin,
        height: height - 2 * margin,
        children: []
      };
    }

    /**
     * i : page No, for first, even, odd page
     */

  }, {
    key: "_newPage",
    value: function _newPage(i) {
      var _props$page2 = this.props.page;
      var width = _props$page2.width;
      var height = _props$page2.height;
      var margin = _props$page2.margin;

      return {
        width: width,
        height: height,
        margin: margin,
        columns: [this._newColumn(0)],
        header: null,
        footer: null
      };
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
        if (this.props.page.columns > columns.length) {
          // new column
          columns.push(currentColumn = this._newColumn(columns.length));
        } else {
          //new page
          avoidInfiniteLoop++;
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
    key: "_removeAllFrom",
    value: function _removeAllFrom(line) {
      var _this2 = this;

      if (!line) {
        this.composed.splice(0);
        this.children.splice(0);
        return;
      }

      var composed = this.composed;

      var currentPage = composed[composed.length - 1];
      var _currentPage2 = currentPage;
      var columns = _currentPage2.columns;

      var currentColumn = columns[columns.length - 1];
      var found = -1;
      while (-1 == (found = currentColumn.children.findIndex(function (group) {
        //group/Line
        return group.props.children.props._id == line._id;
      }))) {
        columns.pop();
        if (columns.length) {
          currentColumn = columns[columns.length - 1];
          found = -1;
        } else {
          composed.pop();
          if (composed.length) {
            var _currentPage3;

            currentPage = composed[composed.length - 1]((_currentPage3 = currentPage, columns = _currentPage3.columns, _currentPage3));
            currentColumn = columns[columns.length - 1];
            found = -1;
          } else {
            break;
            //throw new Error("you should find the line from section, but not")
          }
        }
      }

      if (found != -1) {
        (function () {
          var index = currentColumn.children[found].props.index;
          _this2.children.forEach(function (a, i) {
            if (i > index) {
              a._removeAllFrom();
            }
          });
          _this2.children.splice(index + 1);

          currentColumn.children.splice(found);
        })();
      } else {
        throw new Error("you should find the line from section, but not");
      }
    }
  }, {
    key: "appendComposed",
    value: function appendComposed(line) {
      var composed = this.composed;

      var currentPage = composed[composed.length - 1];
      var _currentPage4 = currentPage;
      var columns = _currentPage4.columns;

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
        if (this.props.page.columns > columns.length) {
          // new column
          columns.push(currentColumn = this._newColumn(columns.length));
        } else {
          //new page
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
    key: "finished",
    value: function finished(child) {
      var _this3 = this;

      if (_get(Object.getPrototypeOf(Section.prototype), "finished", this).call(this, child)) {
        var _ret3 = function () {
          var composed = _this3.composed;
          var canvas = _this3.context.canvas;
          var width = _this3.props.page.width;


          var y = 0;
          var pages = composed.map(function (page, i) {
            var width = page.width;
            var height = page.height;

            var newPage = _react2.default.createElement(
              _group2.default,
              { x: (canvas.width - width) / 2, y: y += canvas.pageGap, key: i },
              _react2.default.createElement(_page2.default, page)
            );
            y += height;
            return newPage;
          });

          _this3.context.parent.appendComposed(_react2.default.createElement(
            _group2.default,
            { height: y, width: width, _id: _this3.sectionId },
            pages
          ));

          return {
            v: true
          };
        }();

        if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
      }

      return false;
    }
  }]);

  return Section;
}(_any2.default);

Section.contextTypes = Object.assign({
  canvas: _react.PropTypes.object
}, _any2.default.contextTypes);
Section.defaultProps = {
  page: {
    width: 300,
    height: 400,
    margin: 20
  }
};
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxDQUFOOztJQUNpQjs7Ozs7Ozs7Ozs7Ozs7cU1BS3BCLFlBQVU7OztlQUxVOzs4QkFPUjtBQUNMLGlDQVJhLCtDQVFiLENBREs7VUFFRSxXQUFVLEtBQVYsU0FGRjs7QUFHTCxVQUFHLFNBQVMsTUFBVCxJQUFpQixDQUFqQixFQUNSLFNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBREs7Ozs7Ozs7OzsrQkFPTyxHQUFFO3dCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtVQUNJLDBCQURKO1VBQ1UsNEJBRFY7VUFDaUI7OztBQURqQixhQUlGO0FBQ0gsV0FBRSxNQUFGO0FBQ0EsV0FBRSxNQUFGO0FBQ0EsZUFBTyxRQUFNLElBQUUsTUFBRjtBQUNiLGdCQUFPLFNBQU8sSUFBRSxNQUFGO0FBQ2Qsa0JBQVMsRUFBVDtPQUxKLENBSlM7Ozs7Ozs7Ozs2QkFnQkosR0FBRTt5QkFDNEIsS0FBSyxLQUFMLENBQTVCLEtBREE7VUFDTSwyQkFETjtVQUNZLDZCQURaO1VBQ21CLDZCQURuQjs7QUFFUCxhQUFPO0FBQ0gsb0JBREc7QUFFSCxzQkFGRztBQUdILHNCQUhHO0FBSUgsaUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FBQ0EsZ0JBQU8sSUFBUDtBQUNBLGdCQUFPLElBQVA7T0FOSixDQUZPOzs7O3lDQVlvQjtVQUFaLGlFQUFTLGtCQUFHOzRCQUN3QixTQUE1QyxNQURvQjtVQUNkLCtDQUFhLG9CQURDOzZCQUN3QixTQUF2QixPQUREO1VBQ1EsZ0RBQWEscUJBRHJCO1VBRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHM0IsVUFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSHVC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cm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlL3BhZ2VcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcblxubGV0IHN1dWlkPTBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSwgQW55LmNvbnRleHRUeXBlcylcblx0XG5cdHNlY3Rpb25JZD1zdXVpZCsrXG5cdFxuICAgIGNvbXBvc2UoKXtcbiAgICAgICAgc3VwZXIuY29tcG9zZSgpXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBpZihjb21wb3NlZC5sZW5ndGg9PTApXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgLy9AVE9ETzpcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDptYXJnaW4sXG4gICAgICAgICAgICB5Om1hcmdpbixcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aC0yKm1hcmdpbixcbiAgICAgICAgICAgIGhlaWdodDpoZWlnaHQtMiptYXJnaW4sXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGF2b2lkSW5maW5pdGVMb29wKytcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cdFxuXHRfcmVtb3ZlQWxsRnJvbShsaW5lKXtcblx0XHRpZighbGluZSl7XG5cdFx0XHR0aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRsZXQgZm91bmQ9LTFcblx0XHR3aGlsZSgtMT09KGZvdW5kPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uZmluZEluZGV4KGdyb3VwPT57Ly9ncm91cC9MaW5lXG5cdFx0XHRyZXR1cm4gZ3JvdXAucHJvcHMuY2hpbGRyZW4ucHJvcHMuX2lkPT1saW5lLl9pZFxuXHRcdH0pKSl7XG5cdFx0XHRjb2x1bW5zLnBvcCgpXG5cdFx0XHRpZihjb2x1bW5zLmxlbmd0aCl7XG5cdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBvc2VkLnBvcCgpXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cdFx0XHRcdFx0KHtjb2x1bW5zfT1jdXJyZW50UGFnZSlcblx0XHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRpZihmb3VuZCE9LTEpe1xuXHRcdFx0bGV0IGluZGV4PWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5bZm91bmRdLnByb3BzLmluZGV4XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGEsaSk9Pntcblx0XHRcdFx0aWYoaT5pbmRleCl7XG5cdFx0XHRcdFx0YS5fcmVtb3ZlQWxsRnJvbSgpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCsxKVxuXHRcdFx0XG5cdFx0XHRjdXJyZW50Q29sdW1uLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblx0XHR9ZWxzZXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHR9XG5cdH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXG5cdFx0Y2hpbGRyZW4ucHVzaCg8R3JvdXAgeT17aGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0gaGVpZ2h0PXtjb250ZW50SGVpZ2h0fSBpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9PntsaW5lfTwvR3JvdXA+KVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cbiAgICBmaW5pc2hlZChjaGlsZCl7XG4gICAgICAgIGlmKHN1cGVyLmZpbmlzaGVkKGNoaWxkKSl7XG5cdFx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRcdGNvbnN0IHtjYW52YXN9PXRoaXMuY29udGV4dFxuXHRcdFx0Y29uc3Qge3BhZ2U6e3dpZHRofX09dGhpcy5wcm9wc1xuXG4gICAgICAgICAgICBsZXQgeT0wXG4gICAgICAgICAgICBsZXQgcGFnZXM9Y29tcG9zZWQubWFwKChwYWdlLGkpPT57XG4gICAgICAgICAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHR9PXBhZ2VcbiAgICAgICAgICAgICAgICBsZXQgbmV3UGFnZT0oPEdyb3VwIHg9eyhjYW52YXMud2lkdGgtd2lkdGgpLzJ9IHk9e3krPWNhbnZhcy5wYWdlR2FwfSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG4gICAgICAgICAgICAgICAgeSs9aGVpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1BhZ2VcbiAgICAgICAgICAgIH0pXG5cblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoPEdyb3VwIGhlaWdodD17eX0gd2lkdGg9e3dpZHRofSBfaWQ9e3RoaXMuc2VjdGlvbklkfT57cGFnZXN9PC9Hcm91cD4pXG5cblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBhZ2U6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9XG5cdH1cbn1cbiJdfQ==