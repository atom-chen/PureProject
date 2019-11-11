/*
 * @Description: vip滑动item
 * @Author: liangzhaowei
 * @Date: 2019-08-27 16:21:52
 * @LastEditTime: 2019-09-05 18:03:21
 */
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
var VipWelfareSlideItem = (function (_super) {
    __extends(VipWelfareSlideItem, _super);
    function VipWelfareSlideItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipWelfareSlideItemSkin";
        return _this;
    }
    VipWelfareSlideItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listDes.itemRenderer = VipWelfareItem;
    };
    VipWelfareSlideItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.setListData(this.listDes, this.getDesList(this.data));
    };
    /**vip内容 */
    VipWelfareSlideItem.prototype.getDesList = function (vipcfig) {
        var list = [];
        if (!vipcfig.sort) {
            /**根据排序字段显示列表 */
            for (var index in vipcfig.des) {
                var obj = { bNew: false, dec: "" };
                obj.dec = vipcfig.des[index];
                obj.bNew = parseInt(index) < vipcfig.number;
                list.push(obj);
            }
        }
        else {
            for (var index in vipcfig.sort) {
                var cdenx = vipcfig.sort[index];
                var obj = { bNew: false, dec: "" };
                var des = vipcfig.des[cdenx];
                if (des) {
                    obj.dec = des;
                    obj.bNew = parseInt(index) < vipcfig.number;
                    list.push(obj);
                }
            }
        }
        return list;
    };
    return VipWelfareSlideItem;
}(BaseCustComponent));
__reflect(VipWelfareSlideItem.prototype, "VipWelfareSlideItem");
//# sourceMappingURL=VipWelfareSlideItem.js.map