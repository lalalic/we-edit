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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3FNQUlqQixjQUFZOzs7ZUFKSzs7Ozs7OzsrQkFTTixHQUFFO3dCQUMwQixLQUFLLEtBQUwsQ0FBNUIsS0FERTtVQUNJLDBCQURKO1VBQ1UsNEJBRFY7VUFDaUI7OztBQURqQixhQUlGO0FBQ0gsV0FBRSxNQUFGO0FBQ0EsV0FBRSxNQUFGO0FBQ0EsZUFBTyxRQUFNLElBQUUsTUFBRjtBQUNiLGdCQUFPLFNBQU8sSUFBRSxNQUFGO0FBQ2Qsa0JBQVMsRUFBVDtPQUxKLENBSlM7Ozs7Ozs7Ozs2QkFnQkosR0FBRTt5QkFDNEIsS0FBSyxLQUFMLENBQTVCLEtBREE7VUFDTSwyQkFETjtVQUNZLDZCQURaO1VBQ21CLDZCQURuQjs7QUFFUCxhQUFPO0FBQ0gsb0JBREc7QUFFSCxzQkFGRztBQUdILHNCQUhHO0FBSUgsaUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FBQ0EsZ0JBQU8sSUFBUDtBQUNBLGdCQUFPLElBQVA7T0FOSixDQUZPOzs7O3lDQVlvQjtVQUFaLGlFQUFTLGtCQUFHOzRCQUN3QixTQUE1QyxNQURvQjtVQUNkLCtDQUFhLG9CQURDOzZCQUN3QixTQUF2QixPQUREO1VBQ1EsZ0RBQWEscUJBRHJCO1VBRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHakMsVUFBRyxTQUFTLE1BQVQsSUFBaUIsQ0FBakIsRUFBbUI7QUFDckIsaUJBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBRHFCO09BQXRCO0FBR00sVUFBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBTnVCO3lCQU9iLFlBUGE7VUFPdEIsK0JBUHNCOztBQVEzQixVQUFJLGdCQUFjLFFBQVEsUUFBUSxNQUFSLEdB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b25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IFBhZ2UgZnJvbSBcIi4uL2NvbXBvc2UvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG4gICAgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICAvL0BUT0RPOlxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4Om1hcmdpbixcbiAgICAgICAgICAgIHk6bWFyZ2luLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLTIqbWFyZ2luLFxuICAgICAgICAgICAgaGVpZ2h0OmhlaWdodC0yKm1hcmdpbixcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgbWFyZ2luLFxuICAgICAgICAgICAgY29sdW1uczpbdGhpcy5fbmV3Q29sdW1uKDApXSxcbiAgICAgICAgICAgIGhlYWRlcjpudWxsLFxuICAgICAgICAgICAgZm9vdGVyOm51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMucGFnZS5jb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2Vcblx0XHRcdFx0Y29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7X2lkOiB0YXJnZXRJZH09Y29udGVudFxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdGxldCBmb3VuZD0tMVxuXHRcdHdoaWxlKC0xPT0oZm91bmQ9Y3VycmVudENvbHVtbi5jaGlsZHJlbi5maW5kSW5kZXgoZ3JvdXA9PnsvL2dyb3VwL0xpbmVcblx0XHRcdHJldHVybiBncm91cC5wcm9wcy5jaGlsZHJlbi5wcm9wcy5faWQ9PXRhcmdldElkXG5cdFx0fSkpKXtcblx0XHRcdGNvbHVtbnMucG9wKClcblx0XHRcdGlmKGNvbHVtbnMubGVuZ3RoKXtcblx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG5cdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Y29tcG9zZWQucG9wKClcblx0XHRcdFx0aWYoY29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdFx0XHRjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV07XG5cdFx0XHRcdFx0KHtjb2x1bW5zfT1jdXJyZW50UGFnZSk7XG5cdFx0XHRcdFx0Y3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdGZvdW5kPS0xXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdC8vdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBmaW5kIHRoZSBsaW5lIGZyb20gc2VjdGlvbiwgYnV0IG5vdFwiKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoZm91bmQhPS0xKXtcblx0XHRcdGNvbnN0IGluZGV4PWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5bZm91bmRdLnByb3BzLmluZGV4XG5cdFx0XHRjdXJyZW50Q29sdW1uLmNoaWxkcmVuLnNwbGljZShmb3VuZClcblx0XHRcdFxuXHRcdFx0Y29uc3QgcmVtb3ZlZD10aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleClcblx0XHRcdFxuXHRcdFx0Y29uc3QgY29tcG9zZWRUaW1lPW5ldyBEYXRlKCkudG9TdHJpbmcoKVxuXHRcdFx0cmVtb3ZlZC5mb3JFYWNoKChhLGkpPT57XG5cdFx0XHRcdGEuX3JlQ29tcG9zZUZyb20oKVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogIGRvIHJlLWNvbXBvc2Ugam9iXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRhLnNldFN0YXRlKHtjb21wb3NlZFRpbWV9KVxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHR9XG5cdH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXG5cdFx0Y2hpbGRyZW4ucHVzaCg8R3JvdXAgeT17aGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0gaGVpZ2h0PXtjb250ZW50SGVpZ2h0fSBpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9PntsaW5lfTwvR3JvdXA+KVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRjb25zdCB7cGFnZTp7d2lkdGh9fT10aGlzLnByb3BzXG5cblx0XHRsZXQgeT0wXG5cdFx0bGV0IHBhZ2VzPWNvbXBvc2VkLm1hcCgocGFnZSxpKT0+e1xuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXBhZ2Vcblx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeD17KGNhbnZhcy53aWR0aC13aWR0aCkvMn0geT17eSs9Y2FudmFzLnBhZ2VHYXB9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdHkrPWhlaWdodFxuXHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHR9KVxuXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCg8R3JvdXAgaGVpZ2h0PXt5fSB3aWR0aD17d2lkdGh9IF9pZD17dGhpcy5faWR9PntwYWdlc308L0dyb3VwPilcblx0XHRcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRwYWdlOiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDAsXG5cdFx0XHRtYXJnaW46IDIwXG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRwYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0bWFyZ2luOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KVxuXHR9XG59XG4iXX0=