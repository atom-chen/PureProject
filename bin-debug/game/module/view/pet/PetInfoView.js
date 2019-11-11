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
 * @Description: 宠物信息内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:26:08
 * @LastEditTime: 2019-11-01 16:35:07
 */
var PetInfoView = (function (_super) {
    __extends(PetInfoView, _super);
    function PetInfoView($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.nSelect = 0; //当前选择下标
        _this.nSelectId = 0; /**当前所选宠物id 避免排序混乱选中*/
        _this.nShowExp = -1; //经验显示值
        _this.oldPetLv = 0; //宠物等级记录
        /**进度条缓动相关 */
        _this.realvalue = 0;
        _this.lastTime = 0;
        _this.cacheGroup = [];
        _this.skinName = "PetInfoViewSkin";
        return _this;
    }
    //初始化
    PetInfoView.prototype.init = function () {
        this.list.itemRenderer = PetInfoItem;
        this.cfg = GameConfig.pet;
        this.currentState = "act";
        this.expend.lab.textColor = 0x3e1700;
    };
    PetInfoView.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.nShowExp = -1;
        this.oldPetLv = 0;
        this.progressBar.slideDuration = 0;
        this.addTouchEvent(this.btn, this.onClick);
        this.addTouchEvent(this.btnAll, this.onClick);
        this.addTouchEvent(this.btnAttr, this.onClick);
        this.addTouchEvent(this.btnState, this.onClick);
        this.addItemClick(this.list, this.itemClick);
        this.message(MsgConst.PET_INFO, this.upList);
        this.message(MsgConst.BAG_ITEM_NUM, this.upList);
        this.message(MsgConst.PET_INFO, this.upCn);
        this.message(MsgConst.PET_ACTIVATE, this.petActivate);
        this.upList();
        this.upCn();
    };
    PetInfoView.prototype.jugeTimeSpace = function (val) {
        var delta = egret.getTimer() - this.lastTime;
        this.lastTime = egret.getTimer();
        if (delta < 100) {
            this.cacheGroup.push(val);
            if (!App.TimerManager.isExists(this.delayFunc, this)) {
                App.TimerManager.addDelay(200, 100, 0, this.delayFunc, this);
            }
        }
        else {
            this.progressBar.value = val;
        }
    };
    PetInfoView.prototype.delayFunc = function () {
        if (this.cacheGroup.length) {
            this.progressBar.value = this.cacheGroup.shift();
        }
        else {
            App.TimerManager.remove(this.delayFunc, this);
            this.progressBar.value = this.realvalue;
        }
    };
    /**更新列表内容 */
    PetInfoView.prototype.upList = function (bUp) {
        if (bUp === void 0) { bUp = false; }
        var list = [];
        for (var index in this.cfg) {
            if (this.cfg[index].id) {
                // this.cfg[index].select = this.nSelect;
                this.cfg[index].sort = GameCache.pet.judeSort(this.cfg[index]);
                list.push(this.cfg[index]);
            }
        }
        list.sort(this.sortPet);
        /**找出下标 */
        for (var index in list) {
            var petCfg = list[index];
            if (petCfg.id == this.nSelectId) {
                this.nSelect = parseInt(index);
            }
        }
        /**记录下标 */
        for (var index in list) {
            list[index].select = this.nSelect;
        }
        this.selectData = list[this.nSelect];
        this.setListData(this.list, list);
        if (this.selectData) {
            var petServer = GameCache.pet.petArray[this.selectData.id];
            if (petServer) {
                this.currentState = "up";
            }
            else {
                this.currentState = "act";
            }
        }
    };
    PetInfoView.prototype.petActivate = function () {
        this.nSelect = 0;
        this.upList();
        this.upCn();
    };
    /**宠物排序 */
    PetInfoView.prototype.sortPet = function (a, b) {
        return a.sort - b.sort;
    };
    /**更新内容 */
    PetInfoView.prototype.upCn = function () {
        if (!this.selectData) {
            return;
        }
        var wStep = 0;
        /**激活状态 */
        if (this.currentState == "act") {
            this.lbName.text = this.selectData.name;
            this.propList.setData(this.selectData.basicatt, [], 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");
            /**消耗显示 */
            if (this.selectData.activationNeed && this.selectData.activationNeed[0]) {
                this.expend.setData(this.selectData.activationNeed[0].id, this.selectData.activationNeed[0].count);
            }
        }
        else {
            var petServer = GameCache.pet.petArray[this.selectData.id];
            if (petServer) {
                this.lbName.text = StringUtils.substitute(Language.lang.wbName, petServer.wLevel, this.selectData.name);
                /**属性内容 */
                var digital = this.selectData.advancedFactor[petServer.wStep] / 10000;
                var baseAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digital);
                var curProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, petServer.wLevel * digital);
                var nextProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, (petServer.wLevel + 1) * digital);
                this.propList.setData(curProp, nextProp, 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");
                /**战斗力 */
                this.zdl.value = ItemUtils.getZdlByProp(curProp);
                /**消耗显示 */
                if (GameConfig.pet[0]) {
                    var needId = GameConfig.pet[0].levelupItem;
                    var count = this.upNextItem(petServer);
                    this.expend.setData(needId, count);
                }
                wStep = petServer.wStep;
            }
            /**宠物状态按钮 */
            this.btnState.icon = petServer.state == 1 ? "pet_json.pet_btn_xx_png" : "pet_json.pet_btn_cz_png";
            var maxPro = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 100;
            var bUpLv = this.oldPetLv != petServer.wLevel ? true : false;
            if ((this.nShowExp != -1) && ((this.nShowExp != petServer.nExp) || bUpLv)) {
                egret.Tween.removeTweens(this.progressBar);
                this.showPar(false);
            }
            else {
                this.showPar(true);
            }
            this.progressBar.maximum = maxPro;
            this.oldPetLv = petServer.wLevel;
            this.nShowExp = petServer.nExp;
            /**星星 */
            if (petServer.wStep) {
                this.lbStar.text = petServer.wStep + "";
            }
        }
        /**模型 */
        var modelId = GameCache.pet.getModelId(wStep, this.selectData.id);
        if (modelId) {
            this.mModel.showMonster(modelId);
        }
        this.gStar.visible = wStep > 0 ? true : false;
    };
    PetInfoView.prototype.showPar = function (bDelay) {
        if (bDelay === void 0) { bDelay = false; }
        /**经验 */
        var petServer = GameCache.pet.petArray[this.selectData.id];
        var maxPro = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 100;
        if (!bDelay) {
            var max = petServer.nExp == 0 ? maxPro : petServer.nExp;
            if (this.progressBar.value < max) {
                this.progressBar.value = this.progressBar.value + 1;
                egret.Tween.get(this.progressBar).wait(100 / max).call(this.showPar, this);
            }
            else {
                egret.Tween.removeTweens(this.progressBar);
                this.progressBar.value = petServer.nExp;
            }
        }
        else {
            egret.Tween.removeTweens(this.progressBar);
            this.progressBar.value = petServer.nExp;
        }
    };
    /**升下一集需要多少物品 */
    PetInfoView.prototype.upNextItem = function (petServer) {
        var needNum = 1;
        var needId = GameConfig.pet[0].levelupItem;
        var totalExp = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 0;
        var needExp = totalExp - petServer.nExp;
        var giveExp = GameConfig.pet[0].giveExp || 1;
        var needCount = Math.ceil(needExp / giveExp);
        if (needCount < GameCache.bag.itemCount(needId)) {
            needNum = needCount;
        }
        else {
            needNum = GameCache.bag.itemCount(needId) || 1;
        }
        return needNum;
    };
    PetInfoView.prototype.itemClick = function (e) {
        if (e.itemIndex != this.nSelect) {
            this.nSelectId = e.item.id;
            this.nSelect = e.itemIndex;
            this.nShowExp = -1;
            this.oldPetLv = 0;
            this.upList();
            this.upCn();
        }
    };
    PetInfoView.prototype.onClick = function (e) {
        var petServer = GameCache.pet.petArray[this.selectData.id];
        switch (e.currentTarget) {
            case this.btn:
                if (petServer) {
                    var needId = GameConfig.pet[0].levelupItem;
                    var needCount = this.upNextItem(petServer);
                    if (this.expend.checkEnough()) {
                        Proxy.pet.upLevel(this.selectData.id, needCount, needId);
                    }
                }
                else {
                    if (this.expend.checkEnough()) {
                        Proxy.pet.actPet(this.selectData.id);
                    }
                }
                break;
            case this.btnAll:
                App.ViewManager.open(ViewConst.PETSHOWALL);
                break;
            case this.btnAttr:
                if (Object.keys(GameCache.pet.petArray).length == 0) {
                    GlobalFun.SysMsg(Language.lang.lcn15);
                }
                else {
                    App.ViewManager.open(ViewConst.PETTIPS);
                }
                break;
            case this.btnState:
                if (petServer) {
                    Proxy.pet.changeState(this.selectData.id, petServer.state == 0 ? 1 : 0);
                }
                break;
            default:
                break;
        }
    };
    return PetInfoView;
}(BaseSpriteView));
__reflect(PetInfoView.prototype, "PetInfoView");
//# sourceMappingURL=PetInfoView.js.map