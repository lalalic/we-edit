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
            return "" + rFonts[a];
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
                    info = { width: width, end: this.composed += text.length, children: text };
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
            console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
            return Object.assign(info, { fontFamily: this.fontFamily });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7d0JBQU0sT0FBTyxDQUFQO1NBQU4sQ0FBeEIsQ0FBMkMsTUFBM0MsQ0FBa0Q7bUJBQUc7U0FBSCxDQUFsRCxDQUF3RCxJQUF4RCxDQUE2RCxHQUE3RCxDQUFoQixDQUpvQjtBQUsxQixhQUFLLElBQUwsR0FBVSxRQUFWLENBTDBCO0FBTXBCLGFBQUssTUFBTCxHQUFZLEtBQUssSUFBTCxDQUFVLEtBQUssVUFBTCxFQUFWLENBQVosQ0FOb0I7QUFPcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQVBvQjtLQUF4Qjs7aUJBRGlCOztxQ0FXUjtBQUNYLG1CQUFPLEVBQVAsQ0FEVzs7OztvQ0FJQSxRQUFPO0FBQ2xCLG1CQUFPLEdBQVAsQ0FEa0I7Ozs7bUNBSU07Z0JBQVYsZ0JBQU4sTUFBZ0I7O0FBQ2xCLGdCQUFHLFlBQVUsU0FBVixFQUNSLE1BQU0sSUFBSSxLQUFKLENBQVUsNENBQVYsQ0FBTixDQURLOztBQUdOLGdCQUFHLEtBQUssUUFBTCxJQUFlLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFDUixPQUFPLElBQVAsQ0FEVjs7QUFHTSxnQkFBSSxVQUFRLEtBQUssR0FBTCxFQUFSLENBUGM7O0FBU2xCLGdCQUFJLE9BQUssSUFBTDtnQkFBVSxPQUFLLElBQUwsQ0FUSTtBQVVsQixnQkFBSSxRQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxRQUFMLENBQXRCLENBQXZCLENBVmM7QUFXbEIsZ0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsdUJBQUssRUFBQyxZQUFELEVBQVEsY0FBYSxLQUFiLEVBQW9CLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQWpFLENBRGU7YUFBbkIsTUFFSztBQUNELG9CQUFJLGdCQUFjLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsR0FBWSxRQUFaLEdBQXFCLEtBQXJCLENBQXpCLENBQWQsQ0FESDtBQUVWLG9CQUFHLGNBQWMsTUFBZCxHQUFxQixDQUFyQixFQUF1QjtBQUN6Qiw0QkFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxhQUFMLENBQXZCLENBRHlCO2lCQUExQjs7QUFJUyxvQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZiwyQkFBSyxFQUFDLFlBQUQsRUFBUSxLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3QyxDQURlO2lCQUFuQixNQUVNLElBQUcsUUFBTSxRQUFOLEVBQWU7QUFDcEIsd0JBQUksUUFBTSxLQUFLLFFBQUwsR0FBYyxLQUFLLE1BQUw7d0JBQWEsTUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBRHJCO0FBRXBCLDJCQUFNLFFBQU0sUUFBTixJQUFrQixRQUFNLEdBQU47QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLFFBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixPQUFqQixDQUFOLENBQXZCO3FCQURKO2lCQUZFLE1BSUM7QUFDSCwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMO0FBQ3BCLGdDQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbEIsQ0FBdkI7cUJBREo7aUJBTEU7O0FBU04sb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDWCwyQkFBSyxFQUFDLE9BQU0sUUFBTixFQUFnQixjQUFjLEtBQWQsRUFBcUIsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBM0UsQ0FEVztpQkFBZixNQUVLOztBQUNELDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWEsQ0FBYixFQUFnQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RSxDQURDO2lCQUZMO2FBbkJKOztBQTBCTixpQkFBSyxLQUFMLEdBQVcsS0FBSyxJQUFMLENBQVUsS0FBSyxLQUFMLENBQXJCLENBckN3QjtBQXNDbEIsb0JBQVEsSUFBUixpQ0FBMEMscUJBQW9CLEtBQUssR0FBTCxLQUFXLE9BQVgsQ0FBOUQsRUF0Q2tCO0FBdUNsQixtQkFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CLEVBQUMsWUFBVyxLQUFLLFVBQUwsRUFBL0IsQ0FBUCxDQXZDa0I7Ozs7V0FuQkwiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAke3JGb250c1thXX1gKS5maWx0ZXIoYT0+YSkuam9pbihcIiBcIilcblx0XHR0aGlzLnNpemU9Zm9udFNpemVcbiAgICAgICAgdGhpcy5oZWlnaHQ9TWF0aC5jZWlsKHRoaXMubGluZUhlaWdodCgpKVxuICAgICAgICB0aGlzLmNvbXBvc2VkPTBcbiAgICB9XG5cblx0bGluZUhlaWdodCgpe1xuXHRcdHJldHVybiAyNVxuXHR9XG5cblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcblx0XHRyZXR1cm4gMjAwXG5cdH1cblxuICAgIG5leHQoe3dpZHRoOm1heFdpZHRofSl7XG4gICAgICAgIGlmKG1heFdpZHRoPT11bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJubyBtYXggd2lkdGggc3BlY2lmaWVkIHdoZW4gY29tcG9zaW5nIHRleHRcIilcblxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgIGxldCBzdGFydEF0PURhdGUubm93KClcblxuICAgICAgICBsZXQgdGV4dD1udWxsLGluZm89bnVsbFxuICAgICAgICBsZXQgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRoaXMudGV4dC5zdWJzdHIodGhpcy5jb21wb3NlZCkpXG4gICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XG4gICAgICAgICAgICBpbmZvPXt3aWR0aCwgY29udGVudFdpZHRoOndpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IHNtYXJ0VHlwZVRleHQ9dGV4dC5zdWJzdHIoMCxNYXRoLmZsb29yKHRleHQubGVuZ3RoKm1heFdpZHRoL3dpZHRoKSlcblx0XHRcdGlmKHNtYXJ0VHlwZVRleHQubGVuZ3RoPjApe1xuXHRcdFx0XHR3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9c21hcnRUeXBlVGV4dClcblx0XHRcdH1cblxuICAgICAgICAgICAgaWYod2lkdGg9PW1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2UgaWYod2lkdGg8bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGxldCBpbmRleD10aGlzLmNvbXBvc2VkK3RleHQubGVuZ3RoLCBsZW49dGhpcy50ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPG1heFdpZHRoICYmIGluZGV4PGxlbilcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0Kz10aGlzLnRleHQuY2hhckF0KGluZGV4KyspKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiB0ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9dGhpcy5zdHJpbmdXaWR0aCh0ZXh0PXRleHQuc2xpY2UoMCwtMSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOiB3aWR0aCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfWVsc2V7Ly9AVE9ETzogdGhlIHNwYWNlIGlzIHRvbyBzbWFsbCwgZ2l2ZSBhIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDowLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXG4gICAgICAgIGNvbnNvbGUuaW5mbyhgdGV4dCBjb21wb3NlciB0b3RhbCB0aW1lOiAke190ZXh0Q29tcG9zZXJUaW1lKz0oRGF0ZS5ub3coKS1zdGFydEF0KX1gKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLHtmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseX0pXG4gICAgfVxufVxuIl19