var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Language = (function () {
    function Language() {
    }
    Object.defineProperty(Language, "lang", {
        get: function () {
            return Language_cn;
        },
        enumerable: true,
        configurable: true
    });
    return Language;
}());
__reflect(Language.prototype, "Language");
//# sourceMappingURL=Language.js.map