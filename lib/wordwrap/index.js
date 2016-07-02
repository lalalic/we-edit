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
                debugger;
                text = text.substr(0, Math.floor(text.length * maxWidth / width));
                var _textMetrics3 = this._textMetrics(text);

                width = _textMetrics3.width;
                height = _textMetrics3.height;


                if (width == maxWidth) {
                    info = { width: width, height: height, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width > maxWidth && index < len) {
                        var _textMetrics4 = this._textMetrics(text += this.text.charAt(index++));

                        width = _textMetrics4.width;
                        height = _textMetrics4.height;
                    }
                } else {
                    while (width > maxWidth && text.length) {
                        var _textMetrics5 = this._textMetrics(text = text.slice(0, -1));

                        width = _textMetrics5.width;
                        height = _textMetrics5.height;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLG9CQUFrQixDQUFsQjs7SUFFaUI7QUFHakIsYUFIaUIsV0FHakIsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLEVBQXdCOzhCQUhQLGFBR087O0FBQ3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FEb0I7QUFFcEIsYUFBSyxLQUFMLEdBQVcsS0FBWCxDQUZvQjs7QUFJcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQUpvQjtLQUF4Qjs7aUJBSGlCOzt3Q0FVRjs7O3FDQUlGLE1BQU0sT0FBTTs7O21DQUlIO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxDQUFDLEtBQUssV0FBTCxDQUFpQixNQUFqQixFQUNBLEtBQUssV0FBTCxDQUFpQixNQUFqQixHQUF3QixLQUFLLGFBQUwsRUFBeEIsQ0FESjs7QUFHQSxnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ2QsT0FBTyxJQUFQLENBREo7O0FBR0EsZ0JBQUksU0FBTyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FQTztBQVFsQixnQkFBSSxVQUFRLEtBQUssR0FBTCxFQUFSLENBUmM7O0FBVWxCLGdCQUFJLE9BQUssSUFBTDtnQkFBVSxPQUFLLElBQUwsQ0FWSTs7Z0NBV0MsS0FBSyxZQUFMLENBQWtCLE9BQUssS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdEIsRUFYbkI7O2dCQVdiLDRCQVhhO2dCQVdQLDhCQVhPOztBQVlsQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBSyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBcEQsQ0FEZTthQUFuQixNQUVLO0FBQ0QseUJBREM7QUFFRCx1QkFBSyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEdBQVksUUFBWixHQUFxQixLQUFyQixDQUF6QixDQUFMLENBRkM7b0NBR2dCLEtBQUssWUFBTCxDQUFrQixJQUFsQixFQUhoQjs7QUFHRSw0Q0FIRjtBQUdRLDhDQUhSOzs7QUFLRCxvQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZiwyQkFBSyxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBcEQsQ0FEZTtpQkFBbkIsTUFFTSxJQUFHLFFBQU0sUUFBTixFQUFlO0FBQ3BCLHdCQUFJLFFBQU0sS0FBSyxRQUFMLEdBQWMsS0FBSyxNQUFMO3dCQUFhLE1BQUksS0FBSyxJQUFMLENBQVUsTUFBVixDQURyQjtBQUVwQiwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsUUFBTSxHQUFOOzRDQUNILEtBQUssWUFBTCxDQUFrQixRQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsT0FBakIsQ0FBTjs7QUFBakM7QUFBTztxQkFEYjtpQkFGRSxNQUlDO0FBQ0gsMkJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTDs0Q0FDSCxLQUFLLFlBQUwsQ0FBa0IsT0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQWxCOztBQUFqQztBQUFPO3FCQURiO2lCQUxFOztBQVNOLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ1gsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZSxjQUFoQixFQUF3QixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3RCxDQURDO2lCQUZMO2FBbEJKOztBQXlCQSxvQkFBUSxJQUFSLGlDQUEwQyxxQkFBb0IsS0FBSyxHQUFMLEtBQVcsT0FBWCxDQUE5RCxFQXJDa0I7QUFzQ2xCLG1CQUFPLElBQVAsQ0F0Q2tCOzs7O1dBbEJMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQgd29yZHdyYXAgZnJvbSBcIndvcmR3cmFwXCJcblxudmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgc3RhdGljIHRlc3RlcjtcblxuICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5zdHlsZT1zdHlsZVxuXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblxuICAgIF9jcmVhdGVUZXN0ZXIoKXtcblxuICAgIH1cblxuICAgIF90ZXh0TWV0cmljcyh3b3JkLCBzdHlsZSl7XG5cbiAgICB9XG5cbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xuICAgICAgICBpZighdGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXIpXG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnRlc3Rlcj10aGlzLl9jcmVhdGVUZXN0ZXIoKVxuXG4gICAgICAgIGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgIGxldCB0ZXN0ZXI9dGhpcy5jb25zdHJ1Y3Rvci50ZXN0ZXJcbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLl90ZXh0TWV0cmljcyh0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCkpXG4gICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XG4gICAgICAgICAgICBpbmZvPXt3aWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBkZWJ1Z2dlclxuICAgICAgICAgICAgdGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuICAgICAgICAgICAgOyh7d2lkdGgsaGVpZ2h0fT10aGlzLl90ZXh0TWV0cmljcyh0ZXh0KSk7XG5cbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg+bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICAoe3dpZHRoLCBoZWlnaHR9PXRoaXMuX3RleHRNZXRyaWNzKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgKHt3aWR0aCwgaGVpZ2h0fT10aGlzLl90ZXh0TWV0cmljcyh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUuaW5mbyhgdGV4dCBjb21wb3NlciB0b3RhbCB0aW1lOiAke190ZXh0Q29tcG9zZXJUaW1lKz0oRGF0ZS5ub3coKS1zdGFydEF0KX1gKVxuICAgICAgICByZXR1cm4gaW5mb1xuICAgIH1cbn1cbiJdfQ==