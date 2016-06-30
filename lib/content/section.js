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

var _page = require("../composed/page");

var _page2 = _interopRequireDefault(_page);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Any) {
  _inherits(Section, _Any);

  function Section() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Section);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Section)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "section", _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Section, [{
    key: "_newColumn",


    /**
     * i: column no
     */
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

      if (composed.length == 0) {
        composed.push(this._newPage());
      }
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
    key: "_reComposeFrom",
    value: function _reComposeFrom(content) {
      var _this2 = this;

      var composed = this.composed;
      var targetId = content._id;

      var currentPage = composed[composed.length - 1];
      var _currentPage2 = currentPage;
      var columns = _currentPage2.columns;

      var currentColumn = columns[columns.length - 1];
      var found = -1;
      while (-1 == (found = currentColumn.children.findIndex(function (group) {
        //group/Line
        return group.props.children.props._id == targetId;
      }))) {
        columns.pop();
        if (columns.length) {
          currentColumn = columns[columns.length - 1];
          found = -1;
        } else {
          composed.pop();
          if (composed.length) {
            currentPage = composed[composed.length - 1];
            var _currentPage3 = currentPage;
            columns = _currentPage3.columns;

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
          currentColumn.children.splice(found);

          var removed = _this2.children.splice(index);

          var composedTime = new Date().toString();
          removed.forEach(function (a, i) {
            a._reComposeFrom();
            /**
             *  do re-compose job
             */
            a.setState({ composedTime: composedTime });
          });
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
    key: "onAllChildrenComposed",
    value: function onAllChildrenComposed() {
      var composed = this.composed;
      var canvas = this.context.canvas;
      var width = this.props.page.width;


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

      this.context.parent.appendComposed(_react2.default.createElement(
        _group2.default,
        { height: y, width: width, _id: this._id },
        pages
      ));

      _get(Object.getPrototypeOf(Section.prototype), "onAllChildrenComposed", this).call(this);
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
Section.propTypes = {
  page: _react.PropTypes.shape({
    width: _react.PropTypes.number.isRequired,
    height: _react.PropTypes.number.isRequired,
    margin: _react.PropTypes.number.isRequired
  })
};
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3FNQUlqQixjQUFZOzs7ZUFKSzs7Ozs7OzsrQkFTTixHQUFFO3dCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtVQUNJLDBCQURKO1VBQ1UsNEJBRFY7VUFDaUI7OztBQURqQixhQUlGO0FBQ0gsV0FBRSxNQUFGO0FBQ0EsV0FBRSxNQUFGO0FBQ0EsZUFBTyxRQUFNLElBQUUsTUFBRjtBQUNiLGdCQUFPLFNBQU8sSUFBRSxNQUFGO0FBQ2Qsa0JBQVMsRUFBVDtPQUxKLENBSlM7Ozs7Ozs7Ozs2QkFnQkosR0FBRTt5QkFDNEIsS0FBSyxLQUFMLENBQTVCLEtBREE7VUFDTSwyQkFETjtVQUNZLDZCQURaO1VBQ21CLDZCQURuQjs7QUFFUCxhQUFPO0FBQ0gsb0JBREc7QUFFSCxzQkFGRztBQUdILHNCQUhHO0FBSUgsaUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FBQ0EsZ0JBQU8sSUFBUDtBQUNBLGdCQUFPLElBQVA7T0FOSixDQUZPOzs7O3lDQVlvQjtVQUFaLGlFQUFTLGtCQUFHOzRCQUN3QixTQUE1QyxNQURvQjtVQUNkLCtDQUFhLG9CQURDOzZCQUN3QixTQUF2QixPQUREO1VBQ1EsZ0RBQWEscUJBRHJCO1VBRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHakMsVUFBRyxTQUFTLE1BQVQsSUFBaUIsQ0FBakIsRUFBbUI7QUFDckIsaUJBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRHFCO09BQXRCO0FBR00sVUFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBTnVCO3lCQU9iLFlBUGE7VUFPdEIsK0JBUHNCOztBQVEzQixVQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdB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b25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2VkL3BhZ2VcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSwgQW55LmNvbnRleHRUeXBlcylcbiAgICBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIC8vQFRPRE86XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6bWFyZ2luLFxuICAgICAgICAgICAgeTptYXJnaW4sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgtMiptYXJnaW4sXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LTIqbWFyZ2luLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoY29tcG9zZWQubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cblx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtfaWQ6IHRhcmdldElkfT1jb250ZW50XG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0bGV0IGZvdW5kPS0xXG5cdFx0d2hpbGUoLTE9PShmb3VuZD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+ey8vZ3JvdXAvTGluZVxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLl9pZD09dGFyZ2V0SWRcblx0XHR9KSkpe1xuXHRcdFx0Y29sdW1ucy5wb3AoKVxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xuXHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wb3NlZC5wb3AoKVxuXHRcdFx0XHRpZihjb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXTtcblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKTtcblx0XHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV07XG5cdFx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihmb3VuZCE9LTEpe1xuXHRcdFx0Y29uc3QgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcblx0XHRcdGN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uc3BsaWNlKGZvdW5kKVxuXG5cdFx0XHRjb25zdCByZW1vdmVkPXRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxuXG5cdFx0XHRjb25zdCBjb21wb3NlZFRpbWU9bmV3IERhdGUoKS50b1N0cmluZygpXG5cdFx0XHRyZW1vdmVkLmZvckVhY2goKGEsaSk9Pntcblx0XHRcdFx0YS5fcmVDb21wb3NlRnJvbSgpXG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiAgZG8gcmUtY29tcG9zZSBqb2Jcblx0XHRcdFx0ICovXG5cdFx0XHRcdGEuc2V0U3RhdGUoe2NvbXBvc2VkVGltZX0pXG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdH1cblx0fVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcblxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMucGFnZS5jb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG5cblx0XHRjaGlsZHJlbi5wdXNoKDxHcm91cCB5PXtoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSBoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9IGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH0+e2xpbmV9PC9Hcm91cD4pXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtjYW52YXN9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtwYWdlOnt3aWR0aH19PXRoaXMucHJvcHNcblxuXHRcdGxldCB5PTBcblx0XHRsZXQgcGFnZXM9Y29tcG9zZWQubWFwKChwYWdlLGkpPT57XG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09cGFnZVxuXHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXdpZHRoKS8yfSB5PXt5Kz1jYW52YXMucGFnZUdhcH0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0eSs9aGVpZ2h0XG5cdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdH0pXG5cblx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxHcm91cCBoZWlnaHQ9e3l9IHdpZHRoPXt3aWR0aH0gX2lkPXt0aGlzLl9pZH0+e3BhZ2VzfTwvR3JvdXA+KVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0cGFnZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwLFxuXHRcdFx0bWFyZ2luOiAyMFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHBhZ2U6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0XHRtYXJnaW46IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuXHRcdH0pXG5cdH1cbn1cbiJdfQ==