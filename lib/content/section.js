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

var Section = function (_Any) {
  _inherits(Section, _Any);

  function Section() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Section);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Section)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
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

      var composed = this.composed;

      if (composed.length == 0) return this.setState({ time: new Date() });

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
          _this2.children.splice(index);

          currentColumn.children.splice(found);
          _this2.setState({ time: new Date() });
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
            { height: y, width: width, _id: _this3._id },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7cU1BSXBCLFFBQU07OztlQUpjOzs7Ozs7OytCQVNOLEdBQUU7d0JBQzBCLEtBQUssS0FBTCxDQUE1QixLQURFO1VBQ0ksMEJBREo7VUFDVSw0QkFEVjtVQUNpQjs7O0FBRGpCLGFBSUY7QUFDSCxXQUFFLE1BQUY7QUFDQSxXQUFFLE1BQUY7QUFDQSxlQUFPLFFBQU0sSUFBRSxNQUFGO0FBQ2IsZ0JBQU8sU0FBTyxJQUFFLE1BQUY7QUFDZCxrQkFBUyxFQUFUO09BTEosQ0FKUzs7Ozs7Ozs7OzZCQWdCSixHQUFFO3lCQUM0QixLQUFLLEtBQUwsQ0FBNUIsS0FEQTtVQUNNLDJCQUROO1VBQ1ksNkJBRFo7VUFDbUIsNkJBRG5COztBQUVQLGFBQU87QUFDSCxvQkFERztBQUVILHNCQUZHO0FBR0gsc0JBSEc7QUFJSCxpQkFBUSxDQUFDLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFELENBQVI7QUFDQSxnQkFBTyxJQUFQO0FBQ0EsZ0JBQU8sSUFBUDtPQU5KLENBRk87Ozs7eUNBWW9CO1VBQVosaUVBQVMsa0JBQUc7NEJBQ3dCLFNBQTVDLE1BRG9CO1VBQ2QsK0NBQWEsb0JBREM7NkJBQ3dCLFNBQXZCLE9BREQ7VUFDUSxnREFBYSxxQkFEckI7VUFFcEIsV0FBVSxLQUFWLFNBRm9COztBQUdqQyxVQUFHLFNBQVMsTUFBVCxJQUFpQixDQUFqQixFQUFtQjtBQUNyQixpQkFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFEcUI7T0FBdEI7QUFHTSxVQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FOdUI7eUJBT2IsWUFQYTtVQU90QiwrQkFQc0I7O0FBUTNCLFVBQUksZ0JBQWMsUUFBUSxRQUFRLE1BQVIs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O0FBeEJzQjs7OzZCQTRCWCxPQUFNOzs7QUFDWCxxQ0E1SWEsaURBNElLLE1BQWxCLEVBQXlCOztjQUN2QjtjQUNBLFNBQVEsT0FBSyxPQUFMLENBQVI7Y0FDTSxRQUFRLE9BQUssS0FBTCxDQUFkLEtBQU07OztBQUVKLGNBQUksSUFBRSxDQUFGO0FBQ0osY0FBSSxRQUFNLFNBQVMsR0FBVCxDQUFhLFVBQUMsSUFBRCxFQUFNLENBQU4sRUFBVTtnQkFDeEIsUUFBYyxLQUFkLE1BRHdCO2dCQUNsQixTQUFRLEtBQVIsT0FEa0I7O0FBRTdCLGdCQUFJLFVBQVM7O2dCQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFiLENBQUQsR0FBcUIsQ0FBckIsRUFBd0IsR0FBRyxLQUFHLE9BQU8sT0FBUCxFQUFnQixLQUFLLENBQUwsRUFBeEQ7Y0FBZ0UsOENBQVUsSUFBVixDQUFoRTthQUFULENBRnlCO0FBRzdCLGlCQUFHLE1BQUgsQ0FINkI7QUFJN0IsbUJBQU8sT0FBUCxDQUo2QjtXQUFWLENBQW5COztBQU9iLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DOztjQUFPLFFBQVEsQ0FBUixFQUFXLE9BQU8sS0FBUCxFQUFjLEtBQUssT0FBSyxHQUFMLEVBQXJDO1lBQWdELEtBQWhEO1dBQW5DOztBQUVBO2VBQU87V0FBUDtZQWY4Qjs7O09BQXpCOztBQWtCTixhQUFPLEtBQVAsQ0FuQmlCOzs7O1NBM0lFOzs7UUFDVixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQzlCLFVBQVEsaUJBQVUsTUFBVjtDQURRLEVBRWpCLGNBQUksWUFBSjtBQUhjLFFBaUtiLGVBQWE7QUFDbkIsUUFBTTtBQUNMLFdBQU8sR0FBUDtBQUNBLFlBQVEsR0FBUjtBQUNBLFlBQVEsRUFBUjtHQUhEOztrQkFsS21CIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2UvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG5cdHN0YXRlPXt9XG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgLy9AVE9ETzpcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDptYXJnaW4sXG4gICAgICAgICAgICB5Om1hcmdpbixcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aC0yKm1hcmdpbixcbiAgICAgICAgICAgIGhlaWdodDpoZWlnaHQtMiptYXJnaW4sXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApe1xuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG5cdFx0fVxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgYXZvaWRJbmZpbml0ZUxvb3ArK1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblx0XG5cdF9yZW1vdmVBbGxGcm9tKGxpbmUpe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MClcblx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHt0aW1lOm5ldyBEYXRlKCl9KVxuXHRcdFxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdGxldCBmb3VuZD0tMVxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcblx0XHRcdHJldHVybiBncm91cC5wcm9wcy5jaGlsZHJlbi5wcm9wcy5faWQ9PWxpbmUuX2lkXG5cdFx0fSkpKXtcblx0XHRcdGNvbHVtbnMucG9wKClcblx0XHRcdGlmKGNvbHVtbnMubGVuZ3RoKXtcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcblx0XHRcdFx0aWYoY29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdFx0XHRjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRcdFx0XHQoe2NvbHVtbnN9PWN1cnJlbnRQYWdlKVxuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGlmKGZvdW5kIT0tMSl7XG5cdFx0XHRsZXQgaW5kZXg9Y3VycmVudENvbHVtbi5jaGlsZHJlbltmb3VuZF0ucHJvcHMuaW5kZXhcblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRpZihpPmluZGV4KXtcblx0XHRcdFx0XHRhLl9yZW1vdmVBbGxGcm9tKClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4KVxuXHRcdFx0XG5cdFx0XHRjdXJyZW50Q29sdW1uLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3RpbWU6IG5ldyBEYXRlKCl9KVxuXHRcdH1lbHNle1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdH1cblx0fVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcblxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMucGFnZS5jb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG5cblx0XHRjaGlsZHJlbi5wdXNoKDxHcm91cCB5PXtoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSBoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9IGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH0+e2xpbmV9PC9Hcm91cD4pXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuICAgIGZpbmlzaGVkKGNoaWxkKXtcbiAgICAgICAgaWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdFx0Y29uc3Qge2NhbnZhc309dGhpcy5jb250ZXh0XG5cdFx0XHRjb25zdCB7cGFnZTp7d2lkdGh9fT10aGlzLnByb3BzXG5cbiAgICAgICAgICAgIGxldCB5PTBcbiAgICAgICAgICAgIGxldCBwYWdlcz1jb21wb3NlZC5tYXAoKHBhZ2UsaSk9PntcbiAgICAgICAgICAgICAgICBsZXQge3dpZHRoLGhlaWdodH09cGFnZVxuICAgICAgICAgICAgICAgIGxldCBuZXdQYWdlPSg8R3JvdXAgeD17KGNhbnZhcy53aWR0aC13aWR0aCkvMn0geT17eSs9Y2FudmFzLnBhZ2VHYXB9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcbiAgICAgICAgICAgICAgICB5Kz1oZWlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UGFnZVxuICAgICAgICAgICAgfSlcblxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCg8R3JvdXAgaGVpZ2h0PXt5fSB3aWR0aD17d2lkdGh9IF9pZD17dGhpcy5faWR9PntwYWdlc308L0dyb3VwPilcblxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2VcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0cGFnZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwLFxuXHRcdFx0bWFyZ2luOiAyMFxuXHRcdH1cblx0fVxufVxuIl19