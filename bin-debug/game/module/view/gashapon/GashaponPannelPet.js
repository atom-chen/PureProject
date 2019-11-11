/*
 * @Description: 扭蛋宠物叶签
 * @Author: liangzhaowei
 * @Date: 2019-10-08 11:32:31
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
var GashaponPannelPet = (function (_super) {
    __extends(GashaponPannelPet, _super);
    function GashaponPannelPet($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.type = GashaponType.Pet;
        /**抽奖id */
        _this.getId = 1;
        /**累计时间 */
        _this.addTime = 0;
        /**抽奖限位 */
        _this.onPress = true;
        _this.tw = [];
        /**展示物品最大距离 */
        _this.showItemMax = [];
        /**展示物品数组 */
        _this.showItemList = [];
        /**显示额外奖励列表 */
        _this.exRewardList = [];
        /**获得物品id */
        _this.getItemId = 0;
        _this.skinName = "GashaponPannelPetSkin";
        return _this;
    }
    GashaponPannelPet.prototype.init = function () {
        this.cfg = GameConfig.gashaponDisplay[this.type];
        /**抽奖展示界面表面 */
        this.imgType0.source = "gashapon_json.gashapon_img4_png";
        var originX = [30, 100, 400];
        var originY = [0, 96, 193];
        /**仓库物品 */
        for (var i = 0; i < 3; i++) {
            var list = [];
            /**创建 */
            for (var index in this.cfg.item[i]) {
                var item = ObjectPool.get(ItemBase);
                item.skinName = "ItembaseSkin";
                if (i == 0) {
                    item.x = originX[i] + parseInt(index) * 130;
                }
                else if (i == 1) {
                    item.x = originX[i] + parseInt(index) * 200;
                }
                else if (i == 2) {
                    item.x = originX[i] - parseInt(index) * 130;
                }
                item.y = originY[i];
                item.data = this.cfg.item[i][index];
                item.initData();
                this.gItem.addChild(item);
                list.push(item);
            }
            var length_1 = 0;
            this.cfg.item[i] && (length_1 = this.cfg.item[i].length);
            if (i == 0) {
                length_1 = -100 + length_1 * 130;
            }
            else if (i == 2) {
                length_1 = 500 - length_1 * 130;
            }
            this.showItemMax.push(length_1);
            this.showItemList.push(list);
        }
        if (this.cfg && this.cfg.single) {
            this.getId = this.cfg.single[1] ? this.cfg.single[1].id : 1;
        }
        /**抽奖图标 */
        this.item.source = GlobalFun.getItemSourceById(this.getId);
        /**价格*/
        this.price0.setData(this.cfg.single);
        this.price1.setData(this.cfg.ten);
        /**第一次打开需要请求仓库数据 */
        if (!GameCache.gashapon.bOpenList[this.type]) {
            GameCache.gashapon.bOpenList[this.type] = 1;
            Proxy.gashapon.getBag(this.type);
        }
        this.gRw.visible = true;
    };
    GashaponPannelPet.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.addTouchEvent(this.imgBag0, this.onClick);
        this.addTouchEvent(this.btn0, this.onClick);
        this.addTouchEvent(this.btn1, this.onClick);
        this.addTouchEvent(this.imgItem, this.onClick);
        this.onPress = true;
        this.exRewardList = [];
        var listAlpha = [1, 0, 0];
        for (var i = 0; i < 3; i++) {
            this["imgCard" + i].alpha = listAlpha[i];
        }
        App.TimerManager.addFrame(2, this.time, this, 0);
        this.onArrow();
        this.message(MsgConst.BAG_ITEM_NUM + this.getId, this.upCn);
        this.message(MsgConst.GASHAPON_ONE_GET, this.getOne);
        this.message(MsgConst.GASHAPON_TEN_GET, this.getTen);
        this.upCn();
    };
    GashaponPannelPet.prototype.time = function () {
        for (var index in this.showItemList) {
            var itemList = this.showItemList[index];
            for (var i in itemList) {
                var addX = 1;
                var itemBase = itemList[i];
                if (index == "2") {
                    itemBase.x = itemBase.x + addX;
                    if (itemBase.x > 500) {
                        itemBase.x = this.showItemMax[index];
                    }
                }
                else if (index == "0") {
                    itemBase.x = itemBase.x - addX;
                    if (itemBase.x < -100) {
                        itemBase.x = this.showItemMax[index];
                    }
                }
            }
        }
    };
    GashaponPannelPet.prototype.onArrow = function () {
        this.gArrow.visible = true;
        this.tw = [];
        var actionList = [];
        for (var i = 0; i < 3; i++) {
            var card = this["imgCard" + i];
            actionList.push(egret.Tween.get(card, { loop: true }));
            card && this.tw.push(card);
        }
        var temeIx = 300;
        actionList[0] && actionList[0].to({ alpha: 0 }, temeIx).wait(temeIx).to({ alpha: 0 }, temeIx);
        actionList[1] && actionList[1].to({ alpha: 1 }, temeIx).to({ alpha: 0 }, temeIx).wait(temeIx);
        actionList[2] && actionList[2].wait(temeIx).to({ alpha: 1 }, temeIx).to({ alpha: 0 }, temeIx);
    };
    GashaponPannelPet.prototype.close = function (param) {
        if (param === void 0) { param = null; }
        for (var index in this.tw) {
            egret.Tween.removeTweens(this.tw[index]);
        }
        _super.prototype.close.call(this);
    };
    /**更新内容 */
    GashaponPannelPet.prototype.upCn = function () {
        this.itemNum.text = GameCache.bag.itemCount(this.getId) + "";
    };
    /**单次抽奖 */
    GashaponPannelPet.prototype.getOne = function (data, bShowEx) {
        if (bShowEx === void 0) { bShowEx = true; }
        if (data) {
            this.showEff();
            this.imgItem.source = GlobalFun.getItemSourceById(data.id);
            this.getItemId = data.id;
            this.gRw.visible = false;
            if (bShowEx) {
                this.exRewardList = [];
                this.exRewardList.push(data);
            }
        }
    };
    /**多次次抽奖 */
    GashaponPannelPet.prototype.getTen = function (data) {
        if (data && data[0]) {
            this.getOne(data[0], false);
        }
    };
    GashaponPannelPet.prototype.showEff = function () {
        var hand = Handler.create(this, this.comple, [], false);
        App.DisplayUtils.addEffectToObj(this.gShow, "Singlepumping_0_1", 1, 122, -180, hand);
    };
    GashaponPannelPet.prototype.comple = function () {
        this.onPress = true;
        this.gRw.visible = true;
        if (this.exRewardList.length) {
            var viewData = new ViewProp();
            viewData.exData1 = this.exRewardList;
            App.ViewManager.open(ViewConst.REWARDEX, viewData);
            this.exRewardList = [];
        }
    };
    GashaponPannelPet.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.imgBag0:
                var viewData = new ViewProp();
                viewData.exData1 = this.type;
                App.ViewManager.open(ViewConst.GASHAPONBAG);
                break;
            case this.btn0:
                if (!GlobalFun.getBagEnounghUseCondition(this.cfg.single)) {
                    GlobalFun.gotoCharge();
                    return;
                }
                if (this.onPress) {
                    Proxy.gashapon.askGashapon(1, this.type);
                    this.onPress = false;
                    this.ballTween();
                }
                break;
            case this.btn1:
                if (!GlobalFun.getBagEnounghUseCondition(this.cfg.ten)) {
                    GlobalFun.gotoCharge();
                    return;
                }
                if (this.onPress) {
                    Proxy.gashapon.askGashapon(10, this.type);
                    this.onPress = false;
                    this.ballTween();
                }
                break;
            case this.imgItem:
                if (this.getItemId) {
                    GlobalFun.itemTips(GameConfig.item[this.getItemId]);
                }
                break;
            default:
                break;
        }
    };
    GashaponPannelPet.prototype.ballTween = function () {
        var tw = egret.Tween.get(this.imgBall);
        tw.to({ y: 90 }, 300).wait(250).to({ y: 0 }, 150).wait(250);
    };
    return GashaponPannelPet;
}(CommunalPagePannel));
__reflect(GashaponPannelPet.prototype, "GashaponPannelPet");
//# sourceMappingURL=GashaponPannelPet.js.map