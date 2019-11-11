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
 * @Description: 经验副本BUFF道具条目
 * @Author: xiejunwei
 * @Date: 2019-09-02 18:02:59
 * @LastEditTime: 2019-09-02 18:03:51
 */
var CopyExpBuffItem = (function (_super) {
    __extends(CopyExpBuffItem, _super);
    function CopyExpBuffItem() {
        return _super.call(this) || this;
    }
    CopyExpBuffItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CopyExpBuffItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    CopyExpBuffItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return CopyExpBuffItem;
}(BaseCustComponent));
__reflect(CopyExpBuffItem.prototype, "CopyExpBuffItem");
//# sourceMappingURL=CopyExpBuffItem.js.map