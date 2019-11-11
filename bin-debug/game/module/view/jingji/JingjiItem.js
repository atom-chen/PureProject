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
 * @Description: 竞技列表条目
 * @Author: xiejunwei
 * @Date: 2019-09-03 21:06:20
 * @LastEditTime: 2019-10-26 15:20:30
 */
var JingjiItem = (function (_super) {
    __extends(JingjiItem, _super);
    function JingjiItem() {
        return _super.call(this) || this;
    }
    JingjiItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.zdl.gap = 16;
    };
    JingjiItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.icon)
            return;
        this.initData();
    };
    JingjiItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    JingjiItem.prototype.initData = function () {
        var data = this.data;
        var conf = GameConfig.jingji[this.itemIndex];
        conf = conf ? conf : GameConfig.jingji["1"];
        this.item_0.data = conf.awardshow[0];
        this.item_1.data = conf.awardshow[1];
        this.item_2.data = conf.awardshow[2];
        this.zdl.value = data.power;
        this.icon.source = GlobalFun.getRoleIcon(data.icon); //RES_DIR_ROLE_ICON + "role_" + data.icon + ".png";
        this.mName.text = data.roleName + "";
        this.mLvl.text = data.lvl + "";
    };
    JingjiItem.prototype.enterFunc = function () {
        var count = GameCache.jingji.jingjiData.remain;
        if (count) {
            Proxy.other.sendChallenge(this.itemIndex);
            GameCache.jingji.targetIdx = this.itemIndex;
            App.ViewManager.close(ViewConst.JINGJI);
        }
        else {
            GlobalFun.SysMsg(Language.lang.jingji_t5);
        }
    };
    return JingjiItem;
}(BaseCustComponent));
__reflect(JingjiItem.prototype, "JingjiItem");
//# sourceMappingURL=JingjiItem.js.map