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
 * @Description: 复活提示
 * @Author: xiejunwei
 * @Date: 2019-08-01 10:31:38
 * @LastEditTime: 2019-10-14 19:57:00
 */
var ReviveTips = (function (_super) {
    __extends(ReviveTips, _super);
    function ReviveTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.time = 0;
        _this.skinName = "ReviveTipsSkin";
        return _this;
    }
    ReviveTips.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setWinTitle("revive");
    };
    ReviveTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.btn_0, this.reviveFunc);
        this.addTouchEvent(this.btn_1, this.closeView);
        var reviveData = GameCache.revive.reveiveList;
        this.lbNextTime.text = "";
        if (reviveData) {
            for (var i = 0; i < 3; i++) {
                var source = null;
                if (reviveData[i]) {
                    var job = reviveData[i].job;
                    source = "public_json.public_icon_role_" + job + "_png";
                }
                this["imgRole" + i].source = source;
                this["imgRoleBg" + i].visible = source == null ? false : true;
            }
        }
        if (reviveData.length) {
            this.lbValue.text = GlobalVar.Recount * reviveData.length + "";
        }
        if (param && param.exData1) {
            App.TimerManager.add(1000, this.upTime, this);
        }
        this.time = GameCache.revive.leftTime;
        /**退出场景时关闭界面 */
        this.message(MsgConst.ENTER_SCENE, this.closeView);
    };
    ReviveTips.prototype.upTime = function () {
        var strTime = "";
        var leftTime = GlobalFun.getDiffMiniDateTime(this.time) / 1000;
        if (leftTime > 0) {
            strTime = App.DateUtils.getFormatBySecond(leftTime, DateUtils.TIME_FORMAT_10);
            strTime = StringUtils.substitute(Language.lang.lcn13, strTime);
        }
        else {
            this.closeView();
        }
        this.lbNextTime.text = strTime;
    };
    ReviveTips.prototype.reviveFunc = function () {
        var have = GameCache.hero.mainPro.pro(PropId.AP_YUANBAO);
        if (have < GlobalVar.Recount) {
            //预留跳转充值
            GlobalFun.SysMsg("钻石不足");
            return;
        }
        else {
            Proxy.script.sendRevive(1);
        }
        this.closeView();
    };
    /**显示界面红点 */
    ReviveTips.prototype.showViewRed = function (bShow) {
    };
    ReviveTips.red = function () {
        return GameCache.bag.itemCount(3278) > 1;
    };
    /**需要刷新是红点消息列表 */
    ReviveTips.changeMsg = function () {
        return [MsgConst.BAG_ITEM_NUM + 3278];
    };
    return ReviveTips;
}(BaseEuiWindow));
__reflect(ReviveTips.prototype, "ReviveTips");
//# sourceMappingURL=ReviveTips.js.map