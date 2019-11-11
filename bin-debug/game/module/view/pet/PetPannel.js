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
 * @Description: 宠物页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-18 14:00:13
 */
var PetPannel = (function (_super) {
    __extends(PetPannel, _super);
    function PetPannel($parent) {
        if ($parent === void 0) { $parent = null; }
        return _super.call(this, $parent) || this;
    }
    PetPannel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PetPannel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.open.call(this, param);
    };
    PetPannel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    /**用于阻止点击事件 */
    PetPannel.prototype.onTabEvent = function (e) {
        var tab = e.target;
        var bDefault = false;
        if (tab.selectedIndex == 1) {
            if (Object.keys(GameCache.pet.petArray).length == 0) {
                e.preventDefault();
                GlobalFun.SysMsg(Language.lang.lcn15);
                bDefault = true;
            }
        }
        if (!bDefault) {
            _super.prototype.onTabEvent.call(this, e);
        }
    };
    return PetPannel;
}(CommunalPagePannel));
__reflect(PetPannel.prototype, "PetPannel");
//# sourceMappingURL=PetPannel.js.map