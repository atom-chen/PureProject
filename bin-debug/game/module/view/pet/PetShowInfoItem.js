/*
 * @Description: 宠物展示item
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:30:22
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
var PetShowInfoItem = (function (_super) {
    __extends(PetShowInfoItem, _super);
    function PetShowInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PetShowInfoItemSkin";
        return _this;
    }
    PetShowInfoItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this, this.onClick);
    };
    PetShowInfoItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data.id) {
            return;
        }
        this.imgBg.source = "pet_json.pet_icon_bg" + this.data.petType + "_png";
        var data = this.data;
        this.lbNe.text = data.name;
        if (GameConfig.pet[0] && GameConfig.pet[0].typeToStar) {
            var star = GameConfig.pet[0].typeToStar[data.petType - 1];
            if (star) {
                this.lbstar.text = "X" + star;
            }
        }
        this.imgLock.visible = GameCache.pet.petArray[data.id] ? false : true;
        if (GameCache.pet.petArray[data.id]) {
            this.icon.source = RES_DIR_PET + this.data.icon + ".png";
        }
        else {
            this.icon.source = RES_DIR_PET + this.data.icon + "_ud.png";
        }
    };
    PetShowInfoItem.prototype.onClick = function () {
        App.ViewManager.close(ViewConst.PETSHOWALL);
        var data = new ViewProp();
        data.exData1 = this.data;
        App.ViewManager.open(ViewConst.PETSIGLEINFOVIEW, data);
    };
    return PetShowInfoItem;
}(BaseCustComponent));
__reflect(PetShowInfoItem.prototype, "PetShowInfoItem");
//# sourceMappingURL=PetShowInfoItem.js.map