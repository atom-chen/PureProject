/*
 * @Description: 宠物进化内容
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:26:04
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
var PetEvoView = (function (_super) {
    __extends(PetEvoView, _super);
    function PetEvoView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.nSelect = 0; //当前选择下标
        _this.initPetId = 0;
        _this.petStar = -1; //宠物星数
        _this.skinName = "PetInfoViewSkin";
        return _this;
    }
    //初始化
    PetEvoView.prototype.init = function () {
        this.list.itemRenderer = PetInfoItem;
        this.cfg = GameConfig.pet;
        this.currentState = "evo";
        this.expend.lab.textColor = 0x3e1700;
        // this.expend.numColor_0 = 0x0cff00;
        this.gStar.visible = false;
    };
    PetEvoView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.btn, this.onClick);
        this.addItemClick(this.list, this.itemClick);
        this.message(MsgConst.PET_INFO, this.upCn);
        this.message(MsgConst.PET_INFO, this.upList);
        this.message(MsgConst.BAG_ITEM_NUM, this.upList);
        this.upList();
        this.upCn();
    };
    /**更新列表内容 */
    PetEvoView.prototype.upList = function () {
        var list = [];
        for (var index in this.cfg) {
            if (this.cfg[index].id) {
                this.cfg[index].select = this.nSelect;
                this.cfg[index].sort = GameCache.pet.judeSort(this.cfg[index]);
                list.push(this.cfg[index]);
            }
        }
        list.sort(this.sortPet);
        this.selectData = list[this.nSelect];
        this.setListData(this.list, list);
    };
    /**宠物排序 */
    PetEvoView.prototype.sortPet = function (a, b) {
        return a.sort - b.sort;
    };
    /**更新内容 */
    PetEvoView.prototype.upCn = function () {
        if (!this.selectData) {
            return;
        }
        var petServer = GameCache.pet.petArray[this.selectData.id];
        if (petServer) {
            this.lbName.text = StringUtils.substitute(Language.lang.wbName, petServer.wLevel, this.selectData.name);
            var digital = this.selectData.advancedFactor[petServer.wStep] / 10000;
            var digitalNext = this.selectData.advancedFactor[petServer.wStep + 1] / 10000;
            var baseAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digital);
            var nextAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digitalNext);
            if (digital) {
                /**属性内容 */
                var curProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, petServer.wLevel * digital);
                this.zdl.value = ItemUtils.getZdlByProp(curProp);
                if (digitalNext) {
                    var nextProp = GlobalFun.ObjPlusOrMinus(nextAttr, this.selectData.gradeatt, (petServer.wLevel) * digitalNext);
                    this.propList.setData(curProp, nextProp, 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");
                }
                else {
                    this.propList.setData(curProp, [], 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");
                }
                /**战斗力 */
            }
            /**技能列表 */
            for (var i = 0; i < 4; i++) {
                this["skill" + i].visible = this.selectData.skillnum[i];
                this["skill" + i].setData(this.selectData.skillnum[i], petServer.wStep);
            }
            /**消耗显示 */
            this.expend.setData(this.selectData.advanceditem, this.selectData.advancedcount[petServer.wStep]);
            /**星数 */
            var maxStar = 0;
            if (GameConfig.pet[0] && GameConfig.pet[0].typeToStar) {
                maxStar = GameConfig.pet[0].typeToStar[this.selectData.petType - 1] ? GameConfig.pet[0].typeToStar[this.selectData.petType - 1] : 0;
            }
            var listStar = [];
            for (var i = 0; i < maxStar; i++) {
                var obj = { icon: "" };
                if (petServer.wStep > i) {
                    obj.icon = "public_json.public_star_on_png";
                }
                else {
                    obj.icon = "public_json.public_star_off_png";
                }
                listStar.push(obj);
            }
            this.setListData(this.listStar, listStar);
            /**模型 */
            var modelId = GameCache.pet.getModelId(petServer.wStep, this.selectData.id);
            if ((this.petStar != -1) && (this.petStar != petServer.wStep)) {
                App.DisplayUtils.addEffectToObj(this, "petjinhua_0_1", 1, 255, 260);
            }
            this.petStar = petServer.wStep;
            if (petServer && modelId) {
                this.mModel.showMonster(modelId);
            }
        }
    };
    PetEvoView.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSelect) {
            if (GameCache.pet.petArray[e.item.id]) {
                this.nSelect = e.itemIndex;
                this.petStar = -1;
                this.upList();
                this.upCn();
            }
            else {
                GlobalFun.SysMsg(Language.lang.lcn15);
            }
        }
    };
    PetEvoView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.btn:
                if (this.expend.checkEnough()) {
                    Proxy.pet.upStar(this.selectData.id);
                }
                break;
            default:
                break;
        }
    };
    return PetEvoView;
}(BaseSpriteView));
__reflect(PetEvoView.prototype, "PetEvoView");
//# sourceMappingURL=PetEvoView.js.map