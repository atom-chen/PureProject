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
 * @Description: buff窗口
 * @Author: guolinsen
 * @Date: 2019-09-03 10:56:47
 * @LastEditTime: 2019-09-03 11:46:50
 */
var BuffWin = (function (_super) {
    __extends(BuffWin, _super);
    function BuffWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "BuffViewSkin";
        return _this;
    }
    BuffWin.prototype.init = function () {
        this.list.itemRenderer = BuffItem;
        this.roleSelect.setHandler(this, this.roleClick);
        this.setWinTitle("buff");
    };
    BuffWin.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
        this.message(MsgConst.BUFF_UPDATE, this.onUpdate);
        this.onUpdate();
    };
    BuffWin.prototype.roleClick = function () {
        this.onUpdate();
    };
    BuffWin.prototype.onUpdate = function (recog) {
        var role = this.roleSelect.selectPro;
        if (recog) {
            if (role.recog != recog)
                return;
        }
        this.setListData(this.list, GameCache.buff.getBuffList(role.recog));
    };
    return BuffWin;
}(BaseEuiWindow));
__reflect(BuffWin.prototype, "BuffWin");
//# sourceMappingURL=BuffWin.js.map