/*
 * @Description: 宠物item内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:38:18
 * @LastEditTime: 2019-10-23 19:26:30
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
var PetInfoItem = (function (_super) {
    __extends(PetInfoItem, _super);
    function PetInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PetInfoItemSkin";
        return _this;
    }
    PetInfoItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PetInfoItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data.id) {
            var cfData = this.data;
            var iconStr = RES_DIR_PET + this.data.icon + ".png";
            this.imgBg.source = "pet_json.pet_icon_bg" + this.data.petType + "_png";
            var haveState = false;
            var petDate = GameCache.pet.petArray[this.data.id];
            if (this.itemIndex == this.data.select) {
                if (!this.mc) {
                    this.mc = App.DisplayUtils.addEffectToObj(this, "petselect_0_1", -1, 40, 40);
                }
                else {
                    this.mc.play(-1);
                    this.mc.visible = true;
                }
            }
            else {
                if (this.mc) {
                    this.mc.visible = false;
                    this.mc.stop();
                }
            }
            var imgHaveSource = null;
            if (petDate) {
                if (petDate.state == 1) {
                    imgHaveSource = "pet_json.pet_img_xiedai_png";
                }
            }
            else {
                if (GameCache.bag.getBagEnoughByCondtion(cfData.activationNeed)) {
                    imgHaveSource = "pet_json.pet_img_kejihuo_png";
                }
                iconStr = RES_DIR_PET + this.data.icon + "_ud.png";
            }
            this.have.source = imgHaveSource;
            this.icon.source = iconStr;
        }
    };
    return PetInfoItem;
}(BaseCustComponent));
__reflect(PetInfoItem.prototype, "PetInfoItem");
//# sourceMappingURL=PetInfoItem.js.map