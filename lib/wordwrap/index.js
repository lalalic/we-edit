"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import wordwrap from "wordwrap"

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text, style) {
        _classCallCheck(this, WordWrapper);

        this.text = text;
        this.style = style;

        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: "_createTester",
        value: function _createTester() {}
    }, {
        key: "_textMetrics",
        value: function _textMetrics(word, style) {}
    }, {
        key: "next",
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (!this.constructor.tester) this.constructor.tester = this._createTester();

            if (this.composed == this.text.length) return null;

            var tester = this.constructor.tester;
            var startAt = Date.now();

            var text = null,
                info = null;

            var _textMetrics2 = this._textMetrics(text = this.text.substr(this.composed));

            var width = _textMetrics2.width;
            var height = _textMetrics2.height;

            if (width <= maxWidth) {
                info = { width: width, height: height, end: this.composed += text.length, children: text };
            } else {
                while (width > maxWidth && text.length) {
                    var _textMetrics3 = this._textMetrics(text = text.slice(0, -1));

                    width = _textMetrics3.width;
                    height = _textMetrics3.height;
                }

                if (text.length) {
                    info = { width: maxWidth, height: height, end: this.composed += text.length, children: text };
                } else {
                    //@TODO: the space is too small, give a placeholder
                    info = { width: maxWidth, height: height, end: this.composed += text.length, children: text };
                }
            }

            console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
            return info;
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLG9CQUFrQixDQUFsQjs7SUFFaUI7QUFHakIsYUFIaUIsV0FHakIsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLEVBQXdCOzhCQUhQLGFBR087O0FBQ3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FEb0I7QUFFcEIsYUFBSyxLQUFMLEdBQVcsS0FBWCxDQUZvQjs7QUFJcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQUpvQjtLQUF4Qjs7aUJBSGlCOzt3Q0FVRjs7O3FDQUlGLE1BQU0sT0FBTTs7O21DQUlIO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxDQUFDLEtBQUssV0FBTCxDQUFpQixNQUFqQixFQUNBLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUF3QixLQUFLLGFBQUwsRUFBeEIsQ0FESjs7QUFHQSxnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsZ0JBQUksU0FBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FQTztBQVFsQixnQkFBSSxVQUFRLEtBQUssR0FBTCxFQUFSLENBUmM7O0FBVWxCLGdCQUFJLE9BQUssSUFBTDtnQkFBVSxPQUFLLElBQUwsQ0FWSTs7Z0NBV0MsS0FBSyxZQUFMLENBQWtCLE9BQUssS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdEIsRUFYbkI7O2dCQVdiLDRCQVhhO2dCQVdQLDhCQVhPOztBQVlsQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBSyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBcEQsQ0FEZTthQUFuQixNQUVLO0FBQ0QsdUJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTDt3Q0FDSCxLQUFLLFlBQUwsQ0FBa0IsT0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQWxCOztBQUFqQztBQUFPO2lCQURiOztBQUdBLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ1gsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURDO2lCQUZMO2FBTko7O0FBYUEsb0JBQVEsSUFBUixpQ0FBMEMscUJBQW9CLEtBQUssR0FBTCxLQUFXLE9BQVgsQ0FBOUQsRUF6QmtCO0FBMEJsQixtQkFBTyxJQUFQLENBMUJrQjs7OztXQWxCTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHdvcmR3cmFwIGZyb20gXCJ3b3Jkd3JhcFwiXG5cbnZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xuICAgIHN0YXRpYyB0ZXN0ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG4gICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgIHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblxuICAgIF9jcmVhdGVUZXN0ZXIoKXtcblxuICAgIH1cblxuICAgIF90ZXh0TWV0cmljcyh3b3JkLCBzdHlsZSl7XG5cbiAgICB9XG5cbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xuICAgICAgICBpZighdGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXIpXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnRlc3Rlcj10aGlzLl9jcmVhdGVUZXN0ZXIoKVxuXG4gICAgICAgIGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgIGxldCB0ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXJcbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLl90ZXh0TWV0cmljcyh0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCkpXG4gICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XG4gICAgICAgICAgICBpbmZvPXt3aWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAoe3dpZHRoLCBoZWlnaHR9PXRoaXMuX3RleHRNZXRyaWNzKHRleHQ9dGV4dC5zbGljZSgwLC0xKSkpXG5cbiAgICAgICAgICAgIGlmKHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKGB0ZXh0IGNvbXBvc2VyIHRvdGFsIHRpbWU6ICR7X3RleHRDb21wb3NlclRpbWUrPShEYXRlLm5vdygpLXN0YXJ0QXQpfWApXG4gICAgICAgIHJldHVybiBpbmZvXG4gICAgfVxufVxuIl19