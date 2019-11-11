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
 * @Description: 宠物
 * @Author: guolinsen
 * @Date: 2019-07-29 14:01:07
 * @LastEditTime: 2019-07-29 17:17:40
 */
var PetWin = (function (_super) {
    __extends(PetWin, _super);
    function PetWin() {
        return _super.call(this) || this;
    }
    PetWin.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    return PetWin;
}(CommunalPageWin));
__reflect(PetWin.prototype, "PetWin");
//# sourceMappingURL=PetWin.js.map