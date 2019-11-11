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
 * @Description: 时装副本条目
 * @Author: xiejunwei
 * @Date: 2019-10-26 16:00:06
 */
var FashionCopyItem = (function (_super) {
    __extends(FashionCopyItem, _super);
    function FashionCopyItem() {
        var _this = _super.call(this) || this;
        _this.acti = false;
        return _this;
    }
    FashionCopyItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FashionCopyItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data == null) {
            this.sG.visible = false;
            return;
        }
        else {
            this.sG.visible = true;
            this.initData();
        }
    };
    FashionCopyItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    FashionCopyItem.prototype.initData = function () {
        this.img.source = this.data.copyType == 1 ? RES_DIR_FASHIONCOPY + ("fashionCopy_nor_" + this.data.backpic + ".png") : RES_DIR_FASHIONCOPY + ("fashion_treasure_" + this.data.backpic + ".png");
        this.shapeMask.source = this.data.copyType == 1 ? "fashionCopy_json.fashionCopy_shapeMask_0_png" : "fashionCopy_json.fashionCopy_shapeMask_1_png";
        var roleLvl = GameCache.hero.mainPro.pro(PropId.AP_LEVEL);
        if (this.data.vipLimit) {
            this.vip.visible = true;
            this.img_0.visible = true;
            this.vip.value = this.data.vipLimit;
        }
        else {
            this.vip.visible = false;
            this.img_0.visible = false;
        }
        if (!this.data.copyLevel) {
            this.desc.visible = false;
            this.openImg.visible = true;
            this.lock.visible = false;
            this.acti = roleLvl >= this.data.level;
        }
        else {
            var data = GameCache.copy.fashionCopyData[this.data.copyLevel];
            var acti = data ? data.acti : false;
            acti = acti && roleLvl >= this.data.level;
            this.acti = acti;
            this.desc.visible = !acti;
            this.openImg.visible = acti;
            this.lock.visible = !acti;
            !acti && (this.desc.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.fashioncopy_2, this.data.level)));
        }
    };
    return FashionCopyItem;
}(BaseCustComponent));
__reflect(FashionCopyItem.prototype, "FashionCopyItem");
//# sourceMappingURL=FashionCopyItem.js.map