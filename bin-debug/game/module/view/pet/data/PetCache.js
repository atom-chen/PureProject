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
 * @Description: 宠物数据
 * @Author: guolinsen
 * @Date: 2019-07-31 16:01:47
 * @LastEditTime: 2019-09-23 19:10:36
 */
var PetCache = (function (_super) {
    __extends(PetCache, _super);
    function PetCache() {
        var _this = _super.call(this) || this;
        _this.petArray = {}; /**宠物数据列表 */
        return _this;
    }
    PetCache.prototype.clear = function () {
        this.petArray = {};
    };
    /**初始化数据 */
    PetCache.prototype.initData = function (objList) {
        this.petArray = objList;
        this.updatePet();
    };
    /**更新数据 */
    PetCache.prototype.upData = function (pBytes) {
        var wid = pBytes.readUnsignedShort();
        if (wid && this.petArray[wid]) {
            this.petArray[wid].update(pBytes);
        }
        else {
            var pet = new PetItem();
            pet.wid = wid;
            pet.update(pBytes);
            this.petArray[wid] = pet;
        }
        this.updatePet();
    };
    /**更新人物宠物消息 */
    PetCache.prototype.updatePet = function () {
        var hero = GameCache.hero.mainPlayer;
        if (hero && hero.pro) {
            hero.pro.petId = [];
            hero.pro.petName = [];
            /**必须先移除宠物 */
            hero.removePet();
            for (var index in this.petArray) {
                var petData = this.petArray[index];
                if (petData.state) {
                    hero.pro.petId.push(petData.wid);
                    hero.pro.petName.push(petData.name);
                    hero.updatePet(petData.wid, petData.name, petData.wStep);
                }
            }
        }
    };
    /**计算排序 */
    PetCache.prototype.judeSort = function (pet) {
        var sort = 0;
        var petDate = GameCache.pet.petArray[pet.id];
        var imgHaveSource = null;
        if (petDate) {
            /**已激活 */
            sort = pet.id + pet.petType * 1000;
        }
        else {
            /**可激活 */
            if (GameCache.bag.getBagEnoughByCondtion(pet.activationNeed)) {
                sort = pet.id + pet.petType * 1000 + 10000;
            }
            else {
                /**不可激活 */
                sort = pet.id + pet.petType * 1000 + 100000;
            }
        }
        return sort;
    };
    /**获取模型id */
    PetCache.prototype.getModelId = function (star, petId) {
        var petData = GameConfig.pet[petId];
        if (petData) {
            var a = petData.advancedMod.length;
            var i = a - 1;
            for (; i >= 0; i--) {
                if (star >= petData.advancedMod[i].star) {
                    return petData.advancedMod[i].mod;
                }
            }
        }
        return 0;
    };
    return PetCache;
}(BaseCache));
__reflect(PetCache.prototype, "PetCache");
//# sourceMappingURL=PetCache.js.map