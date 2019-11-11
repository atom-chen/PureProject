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
 * @Description: 签到面板
 * @Author: guolinsen
 * @Date: 2019-09-10 14:12:10
 * @LastEditTime: 2019-09-11 11:56:33
 */
var SignWin = (function (_super) {
    __extends(SignWin, _super);
    function SignWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SignWinSkin";
        return _this;
    }
    //用于子类继承
    SignWin.prototype.init = function () {
        for (var j = 0; j < 4; j++) {
            this["item" + j].setBgImg(null);
            this["item" + j].showArrow = false;
            this["item" + j].showColor = false;
            this["item" + j].setHandler(this, this.onItemTouch, [this["item" + j]]);
        }
        this.dailyList.itemRenderer = SignDailyItem;
    };
    SignWin.prototype.open = function () {
        _super.prototype.open.call(this);
        this.message(MsgConst.PROPERTY + PropId.AP_SIGNIN, this.doUpdate);
        this.message(MsgConst.PROPERTY + PropId.AP_CHECKINS, this.doUpdate);
        this.update();
    };
    SignWin.prototype.onItemTouch = function (item) {
        var index = parseInt(item.name);
        if (index >= 0) {
            var con = GameCache.sign.totalAwardList[index];
            if (con) {
                var flag = GameCache.sign.getAwardState(index);
                if (!flag && GameCache.sign.signCounts >= con.need) {
                    Proxy.sign.sendPrize(con.id);
                }
                else {
                    GlobalFun.itemTips(con.reward[0].id);
                }
            }
        }
    };
    SignWin.prototype.doUpdate = function () {
        this.flushFun(this.update, true);
    };
    SignWin.prototype.update = function () {
        this.setListData(this.dailyList, GameCache.sign.dailyAwardList);
        this.updateTotal();
    };
    SignWin.prototype.updateTotal = function () {
        this.totalDay.text = GameCache.sign.signCounts + "";
        var list = GameCache.sign.totalAwardList;
        var i = 0;
        var a = list.length;
        for (; i < a; i++) {
            var flag = GameCache.sign.getAwardState(i);
            if (!flag) {
                break;
            }
        }
        if (i + 4 >= a) {
            i = a - 4;
        }
        for (var j = 0; j < 4; j++) {
            var index = j + i;
            this["item" + j].name = index;
            this["item" + j].data = list[index].reward[0];
            this["day" + j].text = StringUtils.substitute(Language.lang.signDay, list[index].need);
            var flag = GameCache.sign.getAwardState(index);
            if (flag) {
                this["finish" + j].visible = true;
            }
            else {
                this["finish" + j].visible = false;
                this["flag" + j].visible = GameCache.sign.signCounts >= list[index].need;
            }
        }
    };
    return SignWin;
}(BaseEuiWindow));
__reflect(SignWin.prototype, "SignWin");
//# sourceMappingURL=SignWin.js.map