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
        this._finished = 0;
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
        this._finished = currentColumn.children[found].props.index;
        this.children.forEach(function (a, i) {
          if (i > _this2._finished) {
            a._removeAllFrom();
          }
        });
        this.children.splice(this._finished);

        currentColumn.children.splice(found);
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
        { y: height - availableHeight, height: contentHeight, index: this._finished },
        line
      ));
      //@TODO: what if contentHeight still > availableHeight
    }
  }, {
    key: "finished",
    value: function finished(child) {
      var _this3 = this;

      if (_get(Object.getPrototypeOf(Section.prototype), "finished", this).call(this, child)) {
        var _ret2 = function () {
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

        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxDQUFOOztJQUNpQjs7Ozs7Ozs7Ozs7Ozs7cU1BS3BCLFlBQVU7OztlQUxVOzs4QkFPUjtBQUNMLGlDQVJhLCtDQVFiLENBREs7VUFFRSxXQUFVLEtBQVYsU0FGRjs7QUFHTCxVQUFHLFNBQVMsTUFBVCxJQUFpQixDQUFqQixFQUNSLFNBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBREs7Ozs7Ozs7OzsrQkFPTyxHQUFFO3dCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtVQUNJLDBCQURKO1VBQ1UsNEJBRFY7VUFDaUI7OztBQURqQixhQUlGO0FBQ0gsV0FBRSxNQUFGO0FBQ0EsV0FBRSxNQUFGO0FBQ0EsZUFBTyxRQUFNLElBQUUsTUFBRjtBQUNiLGdCQUFPLFNBQU8sSUFBRSxNQUFGO0FBQ2Qsa0JBQVMsRUFBVDtPQUxKLENBSlM7Ozs7Ozs7Ozs2QkFnQkosR0FBRTt5QkFDNEIsS0FBSyxLQUFMLENBQTVCLEtBREE7VUFDTSwyQkFETjtVQUNZLDZCQURaO1VBQ21CLDZCQURuQjs7QUFFUCxhQUFPO0FBQ0gsb0JBREc7QUFFSCxzQkFGRztBQUdILHNCQUhHO0FBSUgsaUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FBQ0EsZ0JBQU8sSUFBUDtBQUNBLGdCQUFPLElBQVA7T0FOSixDQUZPOzs7O3lDQVlvQjtVQUFaLGlFQUFTLGtCQUFHOzRCQUN3QixTQUE1QyxNQURvQjtVQUNkLCtDQUFhLG9CQURDOzZCQUN3QixTQUF2QixPQUREO1VBQ1EsZ0RBQWEscUJBRHJCO1VBRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHM0IsVUFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSHVC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dXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZS9wYWdlXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5cbmxldCBzdXVpZD0wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG5cdFxuXHRzZWN0aW9uSWQ9c3V1aWQrK1xuXHRcbiAgICBjb21wb3NlKCl7XG4gICAgICAgIHN1cGVyLmNvbXBvc2UoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgaWYoY29tcG9zZWQubGVuZ3RoPT0wKVxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIC8vQFRPRE86XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6bWFyZ2luLFxuICAgICAgICAgICAgeTptYXJnaW4sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgtMiptYXJnaW4sXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LTIqbWFyZ2luLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMucGFnZS5jb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICBhdm9pZEluZmluaXRlTG9vcCsrXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXHRcblx0X3JlbW92ZUFsbEZyb20obGluZSl7XG5cdFx0aWYoIWxpbmUpe1xuXHRcdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdHRoaXMuX2ZpbmlzaGVkPTBcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0bGV0IGZvdW5kPS0xXG5cdFx0d2hpbGUoLTE9PShmb3VuZD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuLmZpbmRJbmRleChncm91cD0+ey8vZ3JvdXAvTGluZVxuXHRcdFx0cmV0dXJuIGdyb3VwLnByb3BzLmNoaWxkcmVuLnByb3BzLl9pZD09bGluZS5faWRcblx0XHR9KSkpe1xuXHRcdFx0Y29sdW1ucy5wb3AoKVxuXHRcdFx0aWYoY29sdW1ucy5sZW5ndGgpe1xuXHRcdFx0XHRjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRjb21wb3NlZC5wb3AoKVxuXHRcdFx0XHRpZihjb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpXG5cdFx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0XHRcdFx0Zm91bmQ9LTFcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0Ly90aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0aWYoZm91bmQhPS0xKXtcblx0XHRcdHRoaXMuX2ZpbmlzaGVkPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5bZm91bmRdLnByb3BzLmluZGV4XG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKGEsaSk9Pntcblx0XHRcdFx0aWYoaT50aGlzLl9maW5pc2hlZCl7XG5cdFx0XHRcdFx0YS5fcmVtb3ZlQWxsRnJvbSgpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLl9maW5pc2hlZClcblx0XHRcdFxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0fVxuXHR9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuX2ZpbmlzaGVkfT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG4gICAgZmluaXNoZWQoY2hpbGQpe1xuICAgICAgICBpZihzdXBlci5maW5pc2hlZChjaGlsZCkpe1xuXHRcdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRcdGNvbnN0IHtwYWdlOnt3aWR0aH19PXRoaXMucHJvcHNcblxuICAgICAgICAgICAgbGV0IHk9MFxuICAgICAgICAgICAgbGV0IHBhZ2VzPWNvbXBvc2VkLm1hcCgocGFnZSxpKT0+e1xuICAgICAgICAgICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT1wYWdlXG4gICAgICAgICAgICAgICAgbGV0IG5ld1BhZ2U9KDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXdpZHRoKS8yfSB5PXt5Kz1jYW52YXMucGFnZUdhcH0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuICAgICAgICAgICAgICAgIHkrPWhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdQYWdlXG4gICAgICAgICAgICB9KVxuXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKDxHcm91cCBoZWlnaHQ9e3l9IHdpZHRoPXt3aWR0aH0gX2lkPXt0aGlzLnNlY3Rpb25JZH0+e3BhZ2VzfTwvR3JvdXA+KVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRwYWdlOiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDAsXG5cdFx0XHRtYXJnaW46IDIwXG5cdFx0fVxuXHR9XG59XG4iXX0=