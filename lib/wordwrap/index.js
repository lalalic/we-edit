"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBRWlCO0FBR2pCLGFBSGlCLFdBR2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFIUCxhQUdPOztBQUNwQixhQUFLLElBQUwsR0FBVSxJQUFWLENBRG9CO0FBRXBCLGFBQUssS0FBTCxHQUFXLEtBQVgsQ0FGb0I7QUFHcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQUhvQjtLQUF4Qjs7aUJBSGlCOzt3Q0FTRjs7O3FDQUlGLE1BQU0sT0FBTTs7O21DQUlIO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxDQUFDLEtBQUssV0FBTCxDQUFpQixNQUFqQixFQUNBLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUF3QixLQUFLLGFBQUwsRUFBeEIsQ0FESjs7QUFHQSxnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsZ0JBQUksU0FBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FQTztBQVFsQixnQkFBSSxVQUFRLEtBQUssR0FBTCxFQUFSLENBUmM7O0FBVWxCLGdCQUFJLE9BQUssSUFBTDtnQkFBVSxPQUFLLElBQUwsQ0FWSTs7Z0NBV0MsS0FBSyxZQUFMLENBQWtCLE9BQUssS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdEIsRUFYbkI7O2dCQVdiLDRCQVhhO2dCQVdQLDhCQVhPOztBQVlsQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBSyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBcEQsQ0FEZTthQUFuQixNQUVLO0FBQ0QsdUJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTDt3Q0FDSCxLQUFLLFlBQUwsQ0FBa0IsT0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQWxCOztBQUFqQztBQUFPO2lCQURiOztBQUdBLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ1gsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURDO2lCQUZMO2FBTko7O0FBYUEsb0JBQVEsSUFBUixpQ0FBMEMscUJBQW9CLEtBQUssR0FBTCxLQUFXLE9BQVgsQ0FBOUQsRUF6QmtCO0FBMEJsQixtQkFBTyxJQUFQLENBMUJrQjs7OztXQWpCTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xuICAgIHN0YXRpYyB0ZXN0ZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG4gICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgIHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXG4gICAgfVxuXG4gICAgX2NyZWF0ZVRlc3Rlcigpe1xuXG4gICAgfVxuXG4gICAgX3RleHRNZXRyaWNzKHdvcmQsIHN0eWxlKXtcblxuICAgIH1cblxuICAgIG5leHQoe3dpZHRoOm1heFdpZHRofSl7XG4gICAgICAgIGlmKCF0aGlzLmNvbnN0cnVjdG9yLnRlc3RlcilcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IudGVzdGVyPXRoaXMuX2NyZWF0ZVRlc3RlcigpXG5cbiAgICAgICAgaWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHRlc3Rlcj10aGlzLmNvbnN0cnVjdG9yLnRlc3RlclxuICAgICAgICBsZXQgc3RhcnRBdD1EYXRlLm5vdygpXG5cbiAgICAgICAgbGV0IHRleHQ9bnVsbCxpbmZvPW51bGxcbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuX3RleHRNZXRyaWNzKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICh7d2lkdGgsIGhlaWdodH09dGhpcy5fdGV4dE1ldHJpY3ModGV4dD10ZXh0LnNsaWNlKDAsLTEpKSlcblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7Ly9AVE9ETzogdGhlIHNwYWNlIGlzIHRvbyBzbWFsbCwgZ2l2ZSBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmluZm8oYHRleHQgY29tcG9zZXIgdG90YWwgdGltZTogJHtfdGV4dENvbXBvc2VyVGltZSs9KERhdGUubm93KCktc3RhcnRBdCl9YClcbiAgICAgICAgcmV0dXJuIGluZm9cbiAgICB9XG59XG4iXX0=