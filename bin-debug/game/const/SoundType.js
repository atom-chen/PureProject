var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundType = (function () {
    function SoundType() {
    }
    /**创角*/
    SoundType.CREATEROLE = "create_role";
    /**点击按钮*/
    SoundType.BUTTONCLICK = "button_click";
    /**强化音效 */
    SoundType.STRENGTH = "ui_equipStrengthen";
    return SoundType;
}());
__reflect(SoundType.prototype, "SoundType");
//# sourceMappingURL=SoundType.js.map