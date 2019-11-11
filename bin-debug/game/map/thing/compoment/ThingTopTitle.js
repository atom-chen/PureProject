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
/*
 * @Description: 头上血条显示
 * @Author: guolinsen
 * @Date: 2019-09-02 14:55:01
 * @LastEditTime: 2019-09-12 14:27:14
 */
var ThingTopTitle = (function (_super) {
    __extends(ThingTopTitle, _super);
    function ThingTopTitle() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = _this.touchChildren = false;
        _this.hpProBg = new egret.Bitmap();
        _this.hpProBg.texture = RES.getRes("zjm_json.zjm_progressbg_png");
        _this.addChild(_this.hpProBg);
        _this.hpPro = new egret.Bitmap();
        _this.hpPro.x = 1;
        _this.hpPro.y = 1;
        _this.hpPro.texture = RES.getRes("zjm_json.zjm_redprogress_png");
        _this.addChild(_this.hpPro);
        _this.hpPro.scale9Grid = new egret.Rectangle(3, 1, 72, 8);
        _this.anchorOffsetX = 39;
        return _this;
    }
    ThingTopTitle.prototype.setHpType = function (type) {
        if (type === void 0) { type = 0; }
        this.hpPro.texture = RES.getRes((!type) ? "zjm_json.zjm_redprogress_png" : "zjm_json.zjm_greenprogress_png");
    };
    ThingTopTitle.prototype.setHp = function (cur, max, showNum) {
        if (showNum === void 0) { showNum = false; }
        if (showNum) {
            if (!this.hpTx) {
                this.hpTx = new NumberMC();
                this.hpTx.type = "zjm_json.zjm_red_";
                this.hpTx.y = -18;
                this.addChild(this.hpTx);
            }
            this.hpTx.value = cur;
            this.hpTx.x = (this.width - this.hpTx.width) >> 1;
        }
        else {
            if (this.hpTx) {
                this.hpTx.dispose();
                App.DisplayUtils.removeFromParent(this.hpTx);
                this.hpTx = null;
            }
        }
        var rate = cur / max;
        rate > 1 && (rate = 1);
        this.hpPro.width = rate * 78;
    };
    ThingTopTitle.prototype.dispose = function () {
        ObjectPool.push(this);
    };
    return ThingTopTitle;
}(egret.DisplayObjectContainer));
__reflect(ThingTopTitle.prototype, "ThingTopTitle");
//# sourceMappingURL=ThingTopTitle.js.map