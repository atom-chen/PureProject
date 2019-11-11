/*
 * @Description: 宠物全部属性
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:43:56
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
var PetTips = (function (_super) {
    __extends(PetTips, _super);
    function PetTips() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "PetTipsSkin";
        return _this;
    }
    PetTips.prototype.init = function () {
    };
    PetTips.prototype.open = function (param) {
        _super.prototype.open.call(this);
        /**所有宠物属性 */
        var allProp = [];
        for (var index in GameCache.pet.petArray) {
            var petServer = GameCache.pet.petArray[index];
            var petCfg = GameConfig.pet[petServer.wid];
            var digital = petCfg.advancedFactor[petServer.wStep] / 10000;
            if (petCfg) {
                var baseAttr = GlobalFun.ObjPlusRide(petCfg.basicatt, digital);
                var curProp = GlobalFun.ObjPlusOrMinus(baseAttr, petCfg.gradeatt, petServer.wLevel * digital);
                allProp = GlobalFun.ObjPlusOrMinus(curProp, allProp);
            }
        }
        this.zdl.value = ItemUtils.getZdlByProp(allProp);
        this.propList.setData(allProp, [], 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem4Skin");
    };
    PetTips.prototype.close = function (param) {
    };
    return PetTips;
}(BaseEuiWindow));
__reflect(PetTips.prototype, "PetTips");
//# sourceMappingURL=PetTips.js.map