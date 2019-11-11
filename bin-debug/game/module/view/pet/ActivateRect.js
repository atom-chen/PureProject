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
 * @Description: 激活方式
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:37:47
 * @LastEditTime: 2019-08-07 10:59:44
 */
var ActivateRect = (function (_super) {
    __extends(ActivateRect, _super);
    function ActivateRect() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActivateRectSkin";
        return _this;
    }
    ActivateRect.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.btn, this.onClick);
    };
    ActivateRect.prototype.onClick = function () {
        if (this.petData) {
            Proxy.pet.actPet(this.petData.id);
        }
    };
    ActivateRect.prototype.setData = function (data) {
        if (data && data.name) {
            if (data.activationNeed && data.activationNeed[0]) {
                this.icon.data = data.activationNeed[0].id;
                this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColorById(data.activationNeed[0].id));
                this.lbHave.text = data.activationNeed[0].count + "/" + GameCache.bag.itemCount(data.activationNeed[0].id);
                this.petData = data;
            }
        }
    };
    return ActivateRect;
}(BaseCustComponent));
__reflect(ActivateRect.prototype, "ActivateRect");
//# sourceMappingURL=ActivateRect.js.map