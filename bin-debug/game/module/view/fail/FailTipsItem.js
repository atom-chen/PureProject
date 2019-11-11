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
 * @Description: 失败跳转条目
 * @Author: xiejunwei
 * @Date: 2019-09-25 13:52:44
 */
var FailTipsItem = (function (_super) {
    __extends(FailTipsItem, _super);
    function FailTipsItem() {
        return _super.call(this) || this;
    }
    FailTipsItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btn, this.linkFunc);
    };
    FailTipsItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id)
            return;
        this.desc.text = this.data.dec;
        this.icon.source = RES_DIR_SYSOPEN_ICON + this.data.icon;
        this.iName.source = RES_DIR_SYSOPEN_NAME + this.data.icon_name;
    };
    FailTipsItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    FailTipsItem.prototype.linkFunc = function () {
        TextFlowUtils.hrefType(this.data.jump);
        App.ViewManager.close(ViewConst.FAIL);
    };
    return FailTipsItem;
}(BaseCustComponent));
__reflect(FailTipsItem.prototype, "FailTipsItem");
//# sourceMappingURL=FailTipsItem.js.map