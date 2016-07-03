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
    key: "render",
    value: function render() {
      var content = this.state.content;
      var canvas = this.context.canvas;
      var _props$page = this.props.page;
      var height = _props$page.height;
      var width = _props$page.width;

      return _react2.default.createElement(
        _group2.default,
        { x: (canvas.width - width) / 2, y: this.context.parent.getCurrentY() },
        _get(Object.getPrototypeOf(Section.prototype), "render", this).call(this),
        _react2.default.createElement(Composed, { ref: "composed", pages: this.composed,
          gap: canvas.pageGap, pageHeight: height })
      );
    }

    /**
     * i: column no
     */

  }, {
    key: "_newColumn",
    value: function _newColumn(i) {
      var _props$page2 = this.props.page;
      var width = _props$page2.width;
      var height = _props$page2.height;
      var margin = _props$page2.margin;
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
      var _props$page3 = this.props.page;
      var width = _props$page3.width;
      var height = _props$page3.height;
      var margin = _props$page3.margin;

      var info = {
        width: width,
        height: height,
        margin: margin,
        columns: [this._newColumn(0)],
        header: null,
        footer: null
      };
      if (this.composed.length) this.context.parent.appendComposed(this);
      this.context.parent.appendComposed(this, info);
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
    key: "appendComposed",
    value: function appendComposed(line) {
      var composed = this.composed;

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
  }]);

  return Section;
}(_any2.default);

Section.contextTypes = Object.assign({
  canvas: _react.PropTypes.object,
  y: _react.PropTypes.number
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

var Composed = function (_Group) {
  _inherits(Composed, _Group);

  function Composed() {
    _classCallCheck(this, Composed);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
  }

  _createClass(Composed, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var pages = _props.pages;
      var gap = _props.gap;
      var pageHeight = _props.pageHeight;

      var y = 0;
      return _react2.default.createElement(
        _group2.default,
        null,
        pages.map(function (page, i) {
          var newPage = _react2.default.createElement(
            _group2.default,
            { y: y, key: i },
            _react2.default.createElement(_page2.default, page)
          );
          y += pageHeight + gap;
          return newPage;
        })
      );
    }
  }]);

  return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3FNQUtqQixjQUFZOzs7ZUFMSzs7NkJBT1o7VUFDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7VUFFQSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkE7d0JBR3NCLEtBQUssS0FBTCxDQUF0QixLQUhBO1VBR00sNEJBSE47VUFHYywwQkFIZDs7QUFJUCxhQUNDOztVQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFiLENBQUQsR0FBcUIsQ0FBckIsRUFBd0IsR0FBRyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLEVBQUgsRUFBbEM7bUNBWmtCLDhDQVlsQjtRQUdDLDhCQUFDLFFBQUQsSUFBVSxLQUFJLFVBQUosRUFBZSxPQUFPLEtBQUssUUFBTDtBQUMvQixlQUFLLE9BQU8sT0FBUCxFQUFnQixZQUFZLE1BQVosRUFEdEIsQ0FIRDtPQURELENBSk87Ozs7Ozs7OzsrQkFpQk0sR0FBRTt5QkFDMEIsS0FBSyxLQUFMLENBQTVCLEtBREU7VUFDSSwyQkFESjtVQUNVLDZCQURWO1VBQ2lCOzs7QUFEakIsYUFJRjtBQUNILFdBQUUsTUFBRjtBQUNBLFdBQUUsTUFBRjtBQUNBLGVBQU8sUUFBTSxJQUFFLE1BQUY7QUFDYixnQkFBTyxTQUFPLElBQUUsTUFBRjtBQUNkLGtCQUFTLEVBQVQ7T0FMSixDQUpTOzs7Ozs7Ozs7NkJBZ0JKLEdBQUU7eUJBQzRCLEtBQUssS0FBTCxDQUE1QixLQURBO1VBQ00sMkJBRE47VUFDWSw2QkFEWjtVQUNtQiw2QkFEbkI7O0FBRVAsVUFBSSxPQUFLO0FBQ0wsb0JBREs7QUFFTCxzQkFGSztBQUdMLHNCQUhLO0FBSUwsaUJBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFS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IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0eTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG4gICAgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtjYW52YXN9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtwYWdlOntoZWlnaHQsIHdpZHRofX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgeD17KGNhbnZhcy53aWR0aC13aWR0aCkvMn0geT17dGhpcy5jb250ZXh0LnBhcmVudC5nZXRDdXJyZW50WSgpfT5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIHBhZ2VzPXt0aGlzLmNvbXBvc2VkfVxuXHRcdFx0XHRcdGdhcD17Y2FudmFzLnBhZ2VHYXB9IHBhZ2VIZWlnaHQ9e2hlaWdodH0vPlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICAvL0BUT0RPOlxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4Om1hcmdpbixcbiAgICAgICAgICAgIHk6bWFyZ2luLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLTIqbWFyZ2luLFxuICAgICAgICAgICAgaGVpZ2h0OmhlaWdodC0yKm1hcmdpbixcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7cGFnZTp7d2lkdGgsaGVpZ2h0LG1hcmdpbn19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGluZm89e1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0aWYodGhpcy5jb21wb3NlZC5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMpXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLCBpbmZvKVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoY29tcG9zZWQubGVuZ3RoPT0wKXtcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBhZ2U6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRwYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0bWFyZ2luOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KVxuXHR9XG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtwYWdlcywgZ2FwLCBwYWdlSGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHk9MFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXA+XG5cdFx0XHR7XG5cdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xuXHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdHkrPShwYWdlSGVpZ2h0K2dhcClcblx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cbn1cbiJdfQ==