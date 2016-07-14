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

        var rFonts = style.rFonts;
        var fontSize = style.sz;

        this.style = style;
        this.text = text;
        this.fontFamily = Object.keys(rFonts).map(function (a) {
            return "" + (rFonts[a] || '');
        }).filter(function (a) {
            return a;
        }).join(" ");
        this.size = fontSize;
        this.height = Math.ceil(this.lineHeight());
        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: "lineHeight",
        value: function lineHeight() {
            return 25;
        }
    }, {
        key: "stringWidth",
        value: function stringWidth(string) {
            return 200;
        }
    }, {
        key: "next",
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (maxWidth == undefined) throw new Error("no max width specified when composing text");

            if (this.composed == this.text.length) return null;

            var startAt = Date.now();

            var text = null,
                info = null;
            var width = this.stringWidth(text = this.text.substr(this.composed));
            if (width <= maxWidth) {
                info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
            } else {
                var smartTypeText = text.substr(0, Math.floor(text.length * maxWidth / width));
                if (smartTypeText.length > 0) {
                    width = this.stringWidth(text = smartTypeText);
                }

                if (width == maxWidth) {
                    info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width < maxWidth && index < len) {
                        width = this.stringWidth(text += this.text.charAt(index++));
                    }
                } else {
                    while (width > maxWidth && text.length) {
                        width = this.stringWidth(text = text.slice(0, -1));
                    }
                }

                if (text.length) {
                    info = { width: maxWidth, contentWidth: width, end: this.composed += text.length, children: text };
                } else {
                    //@TODO: the space is too small, give a placeholder
                    info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
                }
            }

            info.width = Math.ceil(info.width);
            return Object.assign(info, { fontFamily: this.fontFamily });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU0sT0FBTyxDQUFQLEtBQVcsRUFBWDtTQUFOLENBQXhCLENBQStDLE1BQS9DLENBQXNEO21CQUFHO1NBQUgsQ0FBdEQsQ0FBNEQsSUFBNUQsQ0FBaUUsR0FBakUsQ0FBaEIsQ0FKb0I7QUFLMUIsYUFBSyxJQUFMLEdBQVUsUUFBVixDQUwwQjtBQU1wQixhQUFLLE1BQUwsR0FBWSxLQUFLLElBQUwsQ0FBVSxLQUFLLFVBQUwsRUFBVixDQUFaLENBTm9CO0FBT3BCLGFBQUssUUFBTCxHQUFjLENBQWQsQ0FQb0I7S0FBeEI7O2lCQURpQjs7cUNBV1I7QUFDWCxtQkFBTyxFQUFQLENBRFc7Ozs7b0NBSUEsUUFBTztBQUNsQixtQkFBTyxHQUFQLENBRGtCOzs7O21DQUlNO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxZQUFVLFNBQVYsRUFDUixNQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU4sQ0FESzs7QUFHTixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ1IsT0FBTyxJQUFQLENBRFY7O0FBR00sZ0JBQUksVUFBUSxLQUFLLEdBQUwsRUFBUixDQVBjOztBQVNsQixnQkFBSSxPQUFLLElBQUw7Z0JBQVUsT0FBSyxJQUFMLENBVEk7QUFVbEIsZ0JBQUksUUFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssUUFBTCxDQUF0QixDQUF2QixDQVZjO0FBV2xCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFLLEVBQUMsWUFBRCxFQUFRLGNBQWEsS0FBYixFQUFvQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUFqRSxDQURlO2FBQW5CLE1BRUs7QUFDRCxvQkFBSSxnQkFBYyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEdBQVksUUFBWixHQUFxQixLQUFyQixDQUF6QixDQUFkLENBREg7QUFFVixvQkFBRyxjQUFjLE1BQWQsR0FBcUIsQ0FBckIsRUFBdUI7QUFDekIsNEJBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssYUFBTCxDQUF2QixDQUR5QjtpQkFBMUI7O0FBSVMsb0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsMkJBQUssRUFBQyxZQUFELEVBQVEsY0FBYyxLQUFkLEVBQXFCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQWxFLENBRGU7aUJBQW5CLE1BRU0sSUFBRyxRQUFNLFFBQU4sRUFBZTtBQUNwQix3QkFBSSxRQUFNLEtBQUssUUFBTCxHQUFjLEtBQUssTUFBTDt3QkFBYSxNQUFJLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FEckI7QUFFcEIsMkJBQU0sUUFBTSxRQUFOLElBQWtCLFFBQU0sR0FBTjtBQUNwQixnQ0FBTSxLQUFLLFdBQUwsQ0FBaUIsUUFBTSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLE9BQWpCLENBQU4sQ0FBdkI7cUJBREo7aUJBRkUsTUFJQztBQUNILDJCQUFNLFFBQU0sUUFBTixJQUFrQixLQUFLLE1BQUw7QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQUMsQ0FBRCxDQUFsQixDQUF2QjtxQkFESjtpQkFMRTs7QUFTTixvQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNYLDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWMsS0FBZCxFQUFxQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUEzRSxDQURXO2lCQUFmLE1BRUs7O0FBQ0QsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZ0IsY0FBYSxDQUFiLEVBQWdCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXRFLENBREM7aUJBRkw7YUFuQko7O0FBMEJOLGlCQUFLLEtBQUwsR0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFLLEtBQUwsQ0FBckIsQ0FyQ3dCO0FBc0NsQixtQkFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLEVBQUMsWUFBVyxLQUFLLFVBQUwsRUFBL0IsQ0FBUCxDQXRDa0I7Ozs7V0FuQkwiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3JGb250c1thXXx8Jyd9YCkuZmlsdGVyKGE9PmEpLmpvaW4oXCIgXCIpXG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbCh0aGlzLmxpbmVIZWlnaHQoKSlcbiAgICAgICAgdGhpcy5jb21wb3NlZD0wXG4gICAgfVxuXG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4gMjVcblx0fVxuXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XG5cdFx0cmV0dXJuIDIwMFxuXHR9XG5cbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xuICAgICAgICBpZihtYXhXaWR0aD09dW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gbWF4IHdpZHRoIHNwZWNpZmllZCB3aGVuIGNvbXBvc2luZyB0ZXh0XCIpXG5cblx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBsZXQgc3RhcnRBdD1EYXRlLm5vdygpXG5cbiAgICAgICAgbGV0IHRleHQ9bnVsbCxpbmZvPW51bGxcbiAgICAgICAgbGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxuICAgICAgICBpZih3aWR0aDw9bWF4V2lkdGgpe1xuICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXG5cdFx0XHRpZihzbWFydFR5cGVUZXh0Lmxlbmd0aD4wKXtcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXG5cdFx0XHR9XG5cbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHdpZHRoPG1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aDxtYXhXaWR0aCAmJiBpbmRleDxsZW4pXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblx0XHRpbmZvLndpZHRoPU1hdGguY2VpbChpbmZvLndpZHRoKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLHtmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseX0pXG4gICAgfVxufVxuIl19