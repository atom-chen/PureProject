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
 * create by junwei on 07/05/2019
 */
var BackPackLockVO = (function (_super) {
    __extends(BackPackLockVO, _super);
    function BackPackLockVO() {
        return _super.call(this) || this;
    }
    return BackPackLockVO;
}(BaseClass));
__reflect(BackPackLockVO.prototype, "BackPackLockVO");
//# sourceMappingURL=Vo_BackPackLock.js.map