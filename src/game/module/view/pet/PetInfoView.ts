/*
 * @Description: 宠物信息内容
 * @Author: liangzhaowei
 * @Date: 2019-08-01 17:26:08
 * @LastEditTime: 2019-11-01 16:35:07
 */
class PetInfoView extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "PetInfoViewSkin";
    }

    public mModel: UIAvatar;
    public list: eui.List;
    public progressBar: eui.ProgressBar;
    public lbGrowth: eui.Label;
    public lbPower: eui.Label;
    public btn: eui.Image;
    public imgJb: eui.Image;
    public imgWjh: eui.Image;

    public zdl: ZdlPrint;
    public btnAll: eui.Button;
    public btnAttr: eui.Button;
    public gStar: eui.Group;
    public lbStar: eui.Label;
    public lbName: eui.Label;
    public btnState: eui.Button;
    public tabBtn: eui.TabBar;
    public propList: PropPart;
    public expend: ItemExpend;




    public cfg;//配表
    public nSelect = 0;//当前选择下标
    public selectData: StdPet;//当前选择宠物数据
    public nSelectId = 0;/**当前所选宠物id 避免排序混乱选中*/
    public nShowExp = -1;//经验显示值
    public oldPetLv = 0;//宠物等级记录



    //初始化
    public init() {
        this.list.itemRenderer = PetInfoItem;
        this.cfg = GameConfig.pet;
        this.currentState = "act";

        this.expend.lab.textColor = 0x3e1700;
    }

    public open(param: ViewProp = null) {
        this.nShowExp = -1;
        this.oldPetLv = 0;
        this.progressBar.slideDuration = 0;
        this.addTouchEvent(this.btn, this.onClick);
        this.addTouchEvent(this.btnAll, this.onClick);
        this.addTouchEvent(this.btnAttr, this.onClick);
        this.addTouchEvent(this.btnState, this.onClick);
        this.addItemClick(this.list, this.itemClick)
        this.message(MsgConst.PET_INFO, this.upList)
        this.message(MsgConst.BAG_ITEM_NUM, this.upList)
        this.message(MsgConst.PET_INFO, this.upCn)
        this.message(MsgConst.PET_ACTIVATE, this.petActivate)
        this.upList();
        this.upCn();
    }

    /**进度条缓动相关 */
    private realvalue = 0;
    private lastTime: number = 0;
    private cacheGroup = [];
    private jugeTimeSpace(val): void {
        let delta = egret.getTimer() - this.lastTime;
        this.lastTime = egret.getTimer();

        if (delta < 100) {
            this.cacheGroup.push(val);
            if (!App.TimerManager.isExists(this.delayFunc, this)) {
                App.TimerManager.addDelay(200, 100, 0, this.delayFunc, this);
            }
        } else {
            this.progressBar.value = val;
        }
    }

    private delayFunc(): void {
        if (this.cacheGroup.length) {
            this.progressBar.value = this.cacheGroup.shift();
        } else {
            App.TimerManager.remove(this.delayFunc, this);
            this.progressBar.value = this.realvalue;
        }
    }


    /**更新列表内容 */
    public upList(bUp = false) {
        let list = [];
        for (let index in this.cfg) {
            if (this.cfg[index].id) {
                // this.cfg[index].select = this.nSelect;
                this.cfg[index].sort = GameCache.pet.judeSort(this.cfg[index]);
                list.push(this.cfg[index]);
            }
        }
        list.sort(this.sortPet)



        /**找出下标 */
        for (let index in list) {
            let petCfg: StdPet = list[index];
            if (petCfg.id == this.nSelectId) {
                this.nSelect = parseInt(index);
            }
        }

        /**记录下标 */
        for (let index in list) {
            list[index].select = this.nSelect;
        }


        this.selectData = list[this.nSelect];
        this.setListData(this.list, list);

        if (this.selectData) {
            let petServer: PetItem = GameCache.pet.petArray[this.selectData.id]
            if (petServer) {
                this.currentState = "up";
            }
            else {
                this.currentState = "act";
            }
        }
    }

    public petActivate() {
        this.nSelect = 0;
        this.upList();
        this.upCn();
    }



    /**宠物排序 */
    public sortPet(a, b) {
        return a.sort - b.sort;
    }

    /**更新内容 */
    public upCn() {
        if (!this.selectData) {
            return;
        }

        let wStep = 0;

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
            let petServer: PetItem = GameCache.pet.petArray[this.selectData.id]
            if (petServer) {
                this.lbName.text = StringUtils.substitute(Language.lang.wbName, petServer.wLevel, this.selectData.name);

                /**属性内容 */
                let digital = this.selectData.advancedFactor[petServer.wStep] / 10000
                let baseAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digital);
                let curProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, petServer.wLevel * digital);
                let nextProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, (petServer.wLevel + 1) * digital);

                this.propList.setData(curProp, nextProp, 0, 0xffc600, 0xffffff, 0xffffff, [], "PropItem2Skin");

                /**战斗力 */
                this.zdl.value = ItemUtils.getZdlByProp(curProp);
                /**消耗显示 */
                if (GameConfig.pet[0]) {
                    let needId = GameConfig.pet[0].levelupItem;
                    let count = this.upNextItem(petServer);
                    this.expend.setData(needId, count);
                }
                wStep = petServer.wStep;
            }

            /**宠物状态按钮 */
            this.btnState.icon = petServer.state == 1 ? "pet_json.pet_btn_xx_png" : "pet_json.pet_btn_cz_png"

            let maxPro = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 100;



            let bUpLv = this.oldPetLv != petServer.wLevel ? true : false
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
                this.lbStar.text = petServer.wStep + ""
            }

        }


        /**模型 */
        let modelId = GameCache.pet.getModelId(wStep, this.selectData.id)
        if (modelId) {
            this.mModel.showMonster(modelId);
        }


        this.gStar.visible = wStep > 0 ? true : false;

    }

    public showPar(bDelay = false) {
        /**经验 */
        let petServer: PetItem = GameCache.pet.petArray[this.selectData.id]
        let maxPro = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 100;
        if (!bDelay) {
            let max = petServer.nExp == 0 ? maxPro : petServer.nExp;
            if (this.progressBar.value < max) {
                this.progressBar.value = this.progressBar.value + 1;
                egret.Tween.get(this.progressBar).wait(100/max).call(this.showPar, this);
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
    }


    /**升下一集需要多少物品 */
    public upNextItem(petServer: PetItem) {
        let needNum = 1;
        let needId = GameConfig.pet[0].levelupItem;
        let totalExp = GameConfig.petconfig[petServer.wLevel] ? GameConfig.petconfig[petServer.wLevel].exp : 0;
        let needExp = totalExp - petServer.nExp;
        let giveExp = GameConfig.pet[0].giveExp || 1;
        let needCount = Math.ceil(needExp / giveExp)
        if (needCount < GameCache.bag.itemCount(needId)) {
            needNum = needCount
        }
        else {
            needNum = GameCache.bag.itemCount(needId) || 1
        }
        return needNum;
    }




    public itemClick(e: eui.ItemTapEvent) {
        if (e.itemIndex != this.nSelect) {
            this.nSelectId = e.item.id;
            this.nSelect = e.itemIndex;
            this.nShowExp = -1;
            this.oldPetLv = 0;
            this.upList();
            this.upCn();

        }
    }


    public onClick(e: egret.TouchEvent) {
        let petServer: PetItem = GameCache.pet.petArray[this.selectData.id];
        switch (e.currentTarget) {
            case this.btn:
                if (petServer) {
                    let needId = GameConfig.pet[0].levelupItem;
                    let needCount = this.upNextItem(petServer);
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
    }



}