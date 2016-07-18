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

        var _lineHeight = this.lineHeight();

        var height = _lineHeight.height;
        var descent = _lineHeight.descent;

        this.height = Math.ceil(height);
        this.descent = Math.ceil(descent);
        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: "lineHeight",
        value: function lineHeight() {
            return { height: 25, descent: 2 };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU0sT0FBTyxDQUFQLEtBQVcsRUFBWDtTQUFOLENBQXhCLENBQStDLE1BQS9DLENBQXNEO21CQUFHO1NBQUgsQ0FBdEQsQ0FBNEQsSUFBNUQsQ0FBaUUsR0FBakUsQ0FBaEIsQ0FKb0I7QUFLMUIsYUFBSyxJQUFMLEdBQVUsUUFBVixDQUwwQjs7MEJBTUYsS0FBSyxVQUFMLEdBTkU7O1lBTW5CLDRCQU5tQjtZQU1YLDhCQU5XOztBQU9wQixhQUFLLE1BQUwsR0FBWSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQVosQ0FQb0I7QUFRMUIsYUFBSyxPQUFMLEdBQWEsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFiLENBUjBCO0FBU3BCLGFBQUssUUFBTCxHQUFjLENBQWQsQ0FUb0I7S0FBeEI7O2lCQURpQjs7cUNBYVI7QUFDWCxtQkFBTyxFQUFDLFFBQU8sRUFBUCxFQUFVLFNBQVEsQ0FBUixFQUFsQixDQURXOzs7O29DQUlBLFFBQU87QUFDbEIsbUJBQU8sR0FBUCxDQURrQjs7OzttQ0FJTTtnQkFBVixnQkFBTixNQUFnQjs7QUFDbEIsZ0JBQUcsWUFBVSxTQUFWLEVBQ1IsTUFBTSxJQUFJLEtBQUosQ0FBVSw0Q0FBVixDQUFOLENBREs7O0FBR04sZ0JBQUcsS0FBSyxRQUFMLElBQWUsS0FBSyxJQUFMLENBQVUsTUFBVixFQUNSLE9BQU8sSUFBUCxDQURWOztBQUdNLGdCQUFJLFVBQVEsS0FBSyxHQUFMLEVBQVIsQ0FQYzs7QUFTbEIsZ0JBQUksT0FBSyxJQUFMO2dCQUFVLE9BQUssSUFBTCxDQVRJO0FBVWxCLGdCQUFJLFFBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdEIsQ0FBdkIsQ0FWYztBQVdsQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBSyxFQUFDLFlBQUQsRUFBUSxjQUFhLEtBQWIsRUFBb0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBakUsQ0FEZTthQUFuQixNQUVLO0FBQ0Qsb0JBQUksZ0JBQWMsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxHQUFZLFFBQVosR0FBcUIsS0FBckIsQ0FBekIsQ0FBZCxDQURIO0FBRVYsb0JBQUcsY0FBYyxNQUFkLEdBQXFCLENBQXJCLEVBQXVCO0FBQ3pCLDRCQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLGFBQUwsQ0FBdkIsQ0FEeUI7aUJBQTFCOztBQUlTLG9CQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLDJCQUFLLEVBQUMsWUFBRCxFQUFRLGNBQWMsS0FBZCxFQUFxQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUFsRSxDQURlO2lCQUFuQixNQUVNLElBQUcsUUFBTSxRQUFOLEVBQWU7QUFDcEIsd0JBQUksUUFBTSxLQUFLLFFBQUwsR0FBYyxLQUFLLE1BQUw7d0JBQWEsTUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBRHJCO0FBRXBCLDJCQUFNLFFBQU0sUUFBTixJQUFrQixRQUFNLEdBQU47QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLFFBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixPQUFqQixDQUFOLENBQXZCO3FCQURKO2lCQUZFLE1BSUM7QUFDSCwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMO0FBQ3BCLGdDQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbEIsQ0FBdkI7cUJBREo7aUJBTEU7O0FBU04sb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDWCwyQkFBSyxFQUFDLE9BQU0sUUFBTixFQUFnQixjQUFjLEtBQWQsRUFBcUIsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBM0UsQ0FEVztpQkFBZixNQUVLOztBQUNELDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWEsQ0FBYixFQUFnQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RSxDQURDO2lCQUZMO2FBbkJKOztBQTBCTixpQkFBSyxLQUFMLEdBQVcsS0FBSyxJQUFMLENBQVUsS0FBSyxLQUFMLENBQXJCLENBckN3QjtBQXNDbEIsbUJBQU8sT0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixFQUFDLFlBQVcsS0FBSyxVQUFMLEVBQS9CLENBQVAsQ0F0Q2tCOzs7O1dBckJMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xuICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcblx0XHRjb25zdCB7ckZvbnRzLCBzejpmb250U2l6ZX09c3R5bGVcblx0XHR0aGlzLnN0eWxlPXN0eWxlXG4gICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgIHRoaXMuZm9udEZhbWlseT1PYmplY3Qua2V5cyhyRm9udHMpLm1hcChhPT5gJHtyRm9udHNbYV18fCcnfWApLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxuXHRcdGNvbnN0IHtoZWlnaHQsIGRlc2NlbnR9PXRoaXMubGluZUhlaWdodCgpXG4gICAgICAgIHRoaXMuaGVpZ2h0PU1hdGguY2VpbChoZWlnaHQpXG5cdFx0dGhpcy5kZXNjZW50PU1hdGguY2VpbChkZXNjZW50KVxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcbiAgICB9XG5cblx0bGluZUhlaWdodCgpe1xuXHRcdHJldHVybiB7aGVpZ2h0OjI1LGRlc2NlbnQ6Mn1cblx0fVxuXG5cdHN0cmluZ1dpZHRoKHN0cmluZyl7XG5cdFx0cmV0dXJuIDIwMFxuXHR9XG5cbiAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xuICAgICAgICBpZihtYXhXaWR0aD09dW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwibm8gbWF4IHdpZHRoIHNwZWNpZmllZCB3aGVuIGNvbXBvc2luZyB0ZXh0XCIpXG5cblx0XHRpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBsZXQgc3RhcnRBdD1EYXRlLm5vdygpXG5cbiAgICAgICAgbGV0IHRleHQ9bnVsbCxpbmZvPW51bGxcbiAgICAgICAgbGV0IHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpKVxuICAgICAgICBpZih3aWR0aDw9bWF4V2lkdGgpe1xuICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDp3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBzbWFydFR5cGVUZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXG5cdFx0XHRpZihzbWFydFR5cGVUZXh0Lmxlbmd0aD4wKXtcblx0XHRcdFx0d2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXNtYXJ0VHlwZVRleHQpXG5cdFx0XHR9XG5cbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHdpZHRoPG1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aDxtYXhXaWR0aCAmJiBpbmRleDxsZW4pXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblx0XHRpbmZvLndpZHRoPU1hdGguY2VpbChpbmZvLndpZHRoKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLHtmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseX0pXG4gICAgfVxufVxuIl19