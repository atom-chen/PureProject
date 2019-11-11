/*
 * @Description: 单个宠物展示内容
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:41:28
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
var PetSigleInfoView = (function (_super) {
    __extends(PetSigleInfoView, _super);
    function PetSigleInfoView() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "PetSigleInfoViewSkin";
        return _this;
    }
    PetSigleInfoView.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    PetSigleInfoView.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addTouchEvent(this.lbGo, this.onclick);
        this.selectData = param.exData1;
        this.upCn();
    };
    /**更新内容 */
    PetSigleInfoView.prototype.upCn = function () {
        if (!this.selectData) {
            return;
        }
        var petServer = GameCache.pet.petArray[this.selectData.id];
        if (petServer) {
            this.currentState = "have";
        }
        else {
            this.currentState = "act";
            /**icon */
            if (this.selectData.activationNeed && this.selectData.activationNeed[0]) {
                this.icon.data = this.selectData.activationNeed[0];
                this.icon.initData();
                var id = this.selectData.activationNeed[0].id;
                var count = this.selectData.activationNeed[0].count;
                /**名字 */
                if (this.lbNe) {
                    this.lbNe.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(GameConfig.item[id]));
                }
                /**个数 */
                this.lbHave.text = GameCache.bag.itemCount(id) + "/" + count;
                this.lbHave.textColor = GameCache.bag.itemCount(id) >= count ? ColorUtil.C_GREEN : ColorUtil.C_RED;
            }
        }
        /**名称 */
        this.lbName.text = this.selectData.name;
        /**属性 */
        var maxLv = GameConfig.pet[0].maxlevel || 1;
        var star = GameConfig.pet[0].typeToStar[this.selectData.petType - 1];
        var digital = this.selectData.advancedFactor[star - 1] / 10000;
        if (digital) {
            /**属性内容 */
            var baseAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digital);
            var curProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, maxLv * digital);
            this.propList.setData(curProp, [], 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem4Skin");
        }
        /**星星 */
        var listStar = [];
        for (var i = 0; i < star; i++) {
            var obj = { icon: "" };
            obj.icon = "public_json.public_star_on_png";
            listStar.push(obj);
        }
        this.setListData(this.listStar, listStar);
        /**技能列表 */
        for (var i = 0; i < 4; i++) {
            if (this.selectData.skillnum[i]) {
                var skillId = this.selectData.skillnum[i].skill;
                if (skillId) {
                    var icon = GameConfig.petskill[skillId].icon;
                    if (icon) {
                        this["skill" + i].source = RES_DIR_PET_SKILL + icon + ".png";
                    }
                }
                else {
                    this["skill" + i].source = null;
                }
            }
            else {
                this["skill" + i].source = null;
            }
        }
        /**模型 */
        var modelId = GameCache.pet.getModelId(star, this.selectData.id);
        if (modelId) {
            this.mModel.showMonster(modelId);
        }
    };
    /**点击前往 */
    PetSigleInfoView.prototype.onclick = function () {
        /**icon */
        if (this.selectData.activationNeed && this.selectData.activationNeed[0]) {
            var id = this.selectData.activationNeed[0].id;
            if (id) {
                var jump = GameConfig.item[id] ? GameConfig.item[id].jump : null;
                if (jump) {
                    TextFlowUtils.hrefType(jump);
                }
                else {
                    GlobalFun.SysMsg("请在物品表配置物品的跳转内容");
                }
            }
        }
    };
    return PetSigleInfoView;
}(BaseEuiWindow));
__reflect(PetSigleInfoView.prototype, "PetSigleInfoView");
//# sourceMappingURL=PetSigleInfoView.js.map