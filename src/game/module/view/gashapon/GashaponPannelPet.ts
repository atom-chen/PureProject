/*
 * @Description: 扭蛋宠物叶签
 * @Author: liangzhaowei
 * @Date: 2019-10-08 11:32:31
 */


class GashaponPannelPet extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "GashaponPannelPetSkin"
    }

    public viewContent: eui.Group;
    public imgType0: eui.Image;
    public imgBag0: eui.Image;
    public btn0: eui.Button;
    public btn1: eui.Button;
    public price0: DoubbleItemExpend;
    public price1: DoubbleItemExpend;
    public item: eui.Image;
    public itemNum: eui.Label;
    public gShow: eui.Group;
    public gRw: eui.Group;
    public gArrow: eui.Group;
    public gItem: eui.Group;
    public imgItem: eui.Image;
    public imgBall: eui.Image;
    public imgCard0: eui.Image;
    public imgCard1: eui.Image;
    public imgCard2: eui.Image;


    private mc: MovieClip;

    public cfg: StdGashapondisplay;/** 配表数据*/
    public type = GashaponType.Pet;
    /**抽奖id */
    public getId = 1;
    /**累计时间 */
    public addTime = 0;
    /**抽奖限位 */
    public onPress = true;
    private tw = [];

    /**展示物品最大距离 */
    public showItemMax = [];

    /**展示物品数组 */
    public showItemList = [];


    /**显示额外奖励列表 */
    public exRewardList = [];

    /**获得物品id */
    public getItemId = 0;


    public init(): void {
        this.cfg = GameConfig.gashaponDisplay[this.type];
        /**抽奖展示界面表面 */
        this.imgType0.source = "gashapon_json.gashapon_img4_png";

        let originX = [30, 100, 400];
        let originY = [0, 96, 193];
        /**仓库物品 */
        for (let i = 0; i < 3; i++) {
            let list = [];
            /**创建 */
            for (let index in this.cfg.item[i]) {
                let item: ItemBase = ObjectPool.get(ItemBase);
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
            let length = 0;
            this.cfg.item[i] && (length = this.cfg.item[i].length);
            if (i == 0) {
                length = -100 + length * 130;
            } else if (i == 2) {
                length = 500 - length * 130;
            }
            this.showItemMax.push(length);
            this.showItemList.push(list);
        }

        if (this.cfg && this.cfg.single) {
            this.getId = this.cfg.single[1] ? this.cfg.single[1].id : 1
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
    }

    public open(param: ViewProp = null) {


        this.addTouchEvent(this.imgBag0, this.onClick);
        this.addTouchEvent(this.btn0, this.onClick);
        this.addTouchEvent(this.btn1, this.onClick);
        this.addTouchEvent(this.imgItem, this.onClick)
        this.onPress = true;
        this.exRewardList = [];

        let listAlpha = [1, 0, 0]
        for (let i = 0; i < 3; i++) {
            this["imgCard" + i].alpha = listAlpha[i];
        }

        App.TimerManager.addFrame(2, this.time, this, 0);

        this.onArrow();

        this.message(MsgConst.BAG_ITEM_NUM + this.getId, this.upCn)
        this.message(MsgConst.GASHAPON_ONE_GET, this.getOne)
        this.message(MsgConst.GASHAPON_TEN_GET, this.getTen)

        this.upCn();
    }

    public time() {
        for (let index in this.showItemList) {
            let itemList = this.showItemList[index];
            for (let i in itemList) {
                let addX = 1;
                let itemBase: ItemBase = itemList[i];
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
    }

    public onArrow() {
        this.gArrow.visible = true;
        this.tw = [];
        let actionList = [];
        for (let i = 0; i < 3; i++) {
            let card = this["imgCard" + i];
            actionList.push(egret.Tween.get(card, { loop: true }))
            card && this.tw.push(card);
        }

        let temeIx = 300;
        actionList[0] && actionList[0].to({ alpha: 0 }, temeIx).wait(temeIx).to({ alpha: 0 }, temeIx);
        actionList[1] && actionList[1].to({ alpha: 1 }, temeIx).to({ alpha: 0 }, temeIx).wait(temeIx);
        actionList[2] && actionList[2].wait(temeIx).to({ alpha: 1 }, temeIx).to({ alpha: 0 }, temeIx);

    }



    public close(param: ViewProp = null) {
        for (let index in this.tw) {
            egret.Tween.removeTweens(this.tw[index]);
        }
        super.close();
    }




    /**更新内容 */
    public upCn() {
        this.itemNum.text = GameCache.bag.itemCount(this.getId) + "";
    }

    /**单次抽奖 */
    public getOne(data: UseCondition, bShowEx = true) {
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
    }

    /**多次次抽奖 */
    public getTen(data: UseCondition[]) {
        if (data && data[0]) {
            this.getOne(data[0], false)
        }
    }

    private showEff() {
        let hand = Handler.create(this, this.comple, [], false);
        App.DisplayUtils.addEffectToObj(this.gShow, "Singlepumping_0_1", 1, 122, -180, hand);
    }
    public comple() {
        this.onPress = true;
        this.gRw.visible = true;
        if (this.exRewardList.length) {
            let viewData = new ViewProp();
            viewData.exData1 = this.exRewardList;
            App.ViewManager.open(ViewConst.REWARDEX, viewData);
            this.exRewardList = [];
        }
    }


    public onClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.imgBag0:
                let viewData = new ViewProp();
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

    }


    public ballTween() {
        let tw = egret.Tween.get(this.imgBall);
        tw.to({ y: 90 }, 300).wait(250).to({ y: 0 }, 150).wait(250);
    }




}
