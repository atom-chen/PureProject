var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SysUtils = (function () {
    function SysUtils() {
    }
    /**
     * 拷贝到系统黏贴板
     *
     */
    SysUtils.copyToPasteBoard = function (str) {
        var input = document.createElement("input");
        input.value = str;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
    };
    return SysUtils;
}());
__reflect(SysUtils.prototype, "SysUtils");
//# sourceMappingURL=SysUtils.js.map