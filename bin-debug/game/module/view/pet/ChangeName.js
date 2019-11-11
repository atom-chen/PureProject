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
 * @Description: 更改名字
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:37:54
 * @LastEditTime: 2019-08-02 11:02:37
 */
var ChangeName = (function (_super) {
    __extends(ChangeName, _super);
    function ChangeName() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChangeNameSkin";
        return _this;
    }
    ChangeName.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ChangeName.prototype.setData = function (data) {
        if (data && data.name) {
            this.lbNe.text = data.name;
            this.num.value = 1;
        }
    };
    return ChangeName;
}(BaseCustComponent));
__reflect(ChangeName.prototype, "ChangeName");
//# sourceMappingURL=ChangeName.js.map