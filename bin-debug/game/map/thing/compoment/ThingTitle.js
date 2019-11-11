var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 名称容器
*/
var ThingTitle = (function (_super) {
    __extends(ThingTitle, _super);
    function ThingTitle() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.nameBG = new egret.Bitmap();
        _this.nameBG.scale9Grid = new egret.Rectangle(11, 10, 8, 1);
        _this.nameBG.height = 25;
        _this.nameBG.y = 6;
        _this.addChild(_this.nameBG);
        _this.txtName = App.DisplayUtils.newTextField('', 0, 0, ColorUtil.TITLE_NORMAL, 'center', 14);
        _this.txtName.y = 11;
        _this.addChild(_this.txtName);
        _this.familyName = App.DisplayUtils.newTextField('', 0, 0, ColorUtil.C_GREEN, 'center', 14);
        _this.familyName.y = 35;
        _this.addChild(_this.familyName);
        return _this;
    }
    ThingTitle.prototype.setNameColor = function (color) {
        this.txtName.textColor = color;
    };
    ThingTitle.prototype.setName = function (str) {
        this.nameBG.texture = RES.getRes("zjm_json.zjm_name_bg_png");
        this.txtName.text = str;
        this.initLayout();
    };
    ThingTitle.prototype.setBadge = function (lvl) {
        if (lvl <= 0) {
            if (this.badge)
                this.badge.source = null;
            return;
        }
        if (!this.badge) {
            this.badge = new eui.Image();
            this.badge.height = 22;
            this.badge.width = 40;
            this.badge.y = 7;
            this.addChild(this.badge);
        }
        lvl = Math.floor(lvl / 10);
        this.badge.source = RES_DIR_BADGE + "t" + lvl + ".png";
        if (this.badge)
            this.badge.x = -Math.floor(this.nameBG.width / 2) - 42;
    };
    ThingTitle.prototype.initLayout = function () {
        this.nameBG.width = this.txtName.width + 14;
        this.txtName.anchorOffsetX = Math.floor(this.txtName.width / 2);
        this.familyName.anchorOffsetX = Math.floor(this.familyName.width / 2);
        this.nameBG.anchorOffsetX = Math.floor(this.nameBG.width / 2);
        if (this.badge)
            this.badge.x = -Math.floor(this.nameBG.width / 2) - 42;
    };
    ThingTitle.prototype.setFamilyName = function (fname) {
        this.familyName.text = fname;
        this.initLayout();
    };
    /**回收时执行的重置数值方法*/
    ThingTitle.prototype.reset = function () {
    };
    return ThingTitle;
}(egret.DisplayObjectContainer));
__reflect(ThingTitle.prototype, "ThingTitle");
//# sourceMappingURL=ThingTitle.js.map