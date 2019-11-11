/*
 * @Description: 宝石面板
 * @Author: xiejunwei
 * @Date: 2019-09-09 14:33:54
 * @LastEditTime: 2019-11-01 15:41:09
 */
class JewelPage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "JewelPageSkin";
    }

    public roleSelect: RoleSelect;
    public zdl: ZdlPrint;
    public btn_0: eui.Button;
    public propList: PropPart;
    public iG: eui.Group;
    public btn_1: eui.Button;
    public btn_2: eui.Button;
    public cost: ItemExpend;
    public g2: eui.Group;
    public pBtn: eui.Button;

    private oldIndex = 0;

    protected init(): void {
        super.init();
        this.roleSelect.setHandler(this, this.onCLick);
        // let hand = Handler.create(this, this.onCLick, [], false);
        // this.roleSelect.handler = hand;
        // (this.cost["stuffName"] as eui.Label).textColor = 0x472c25;
        // this.cost.numColor_0 = 0x472c25;
    }

    static red() {
        return GameCache.jewel.checkJewelInsert() || GameCache.jewel.checkJewelUpGrade();
    }


    static changeMsg() {
        return [MsgConst.JEWEL_LIST, MsgConst.NEW_HERO];
    }
    public roleRed(roleId) {
        return GameCache.jewel.checkJewelInsert(roleId) || GameCache.jewel.checkJewelUpGrade(roleId);
    }

    public refreshRed() {
        super.refreshRed();
        this.redShow();
    }

    public open(param: ViewProp): void {

        this.message(MsgConst.JEWEL_LIST, this.initData);

        this.addTouchEvent(this.iG, this.onGroupTouche);
        this.addTouchEvent(this.btn_2, this.openReplaceTips);
        this.addTouchEvent(this.btn_0, this.openReplaceTips);
        this.addTouchEvent(this.btn_1, this.upGradeFunc);
        this.addTouchEvent(this.pBtn, this.openTotalProp);
        this.initData();
        this.onGroupTouche();
    }

    public onCLick(): void {
        this.initData();
    }

    private initData(): void {
        let jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        let towerLvl = GameCache.copytower.copyTowerLayer;
        let condi = GameConfig.jewel[0].condition;
        let first = true;
        for (let i = 0; i < 8; i++) {
            let item = (this[`jItem_${i}`] as JewelItem);
            let result = GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, i) || GameCache.jewel.checkJewelUpGrade(this.roleSelect.roleId, i);
            App.ViewManager.showRedPoint(item, result);
            item.seleted = false;
            if (condi[i] <= towerLvl) {
                item.data = jewelList[i];
            } else {
                item.stateJuge(condi[i], first);
                first = false;
            }
        }
        this.initZdl();
        this.onGroupTouche();
    }

    public onGroupTouche(e?: egret.TouchEvent): void {
        let tar = e ? parseInt(e.target.name) : this.oldIndex;
        (this[`jItem_${this.oldIndex}`] as JewelItem).seleted = false;
        (this[`jItem_${tar}`] as JewelItem).seleted = true;
        this.oldIndex = tar;
        this.initItem();
        this.redShow();
    }

    private initItem(): void {
        let jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        let data = jewelList[this.oldIndex];
        if (data) {
            let gem = GameConfig.jewel[data.id];
            let curProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, data.lvl);
            let nextProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, data.lvl + 1);

            this.propList.visible = true;
            this.btn_0.visible = false;
            this.g2.visible = true;
            let count = gem.consume[0].count * (1 + data.lvl * gem.lvlConsume);
            this.cost.setData(gem.consume[0].id, count);
            this.propList.setData(curProp, nextProp, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        } else {
            this.propList.visible = false;
            this.btn_0.visible = true;
            this.g2.visible = false;
        }
    }

    private openReplaceTips(): void {
        let condi = GameConfig.jewel[0].condition[this.oldIndex];
        let lvl = GameCache.copytower.copyTowerLayer;
        if (lvl < condi) {
            GlobalFun.SysMsg("爬塔层数不足" + condi + "层");
            return;
        }
        let view = new ViewProp();
        view.exData1 = this.oldIndex;
        view.exData2 = this.roleSelect.nSlRole;
        App.ViewManager.open(ViewConst.JEWELREPLACE, view);
    }

    private upGradeFunc(): void {
        if (this.cost.checkEnough()) {
            Proxy.jewel.sendUpGrade(this.roleSelect.nSlRole, this.oldIndex);
        }
    }

    private totalProp = [];
    private initZdl(): void {
        let jewelList = GameCache.jewel.roleJewelList[this.roleSelect.roleId]; //人物宝石类别
        jewelList = jewelList ? jewelList : {};
        let prop = [];
        for (let i in jewelList) {
            let gem = GameConfig.jewel[jewelList[i].id];
            let lvl = jewelList[i].lvl;
            let curProp = GlobalFun.ObjPlusOrMinus(gem.attr, gem.lvlAttr, lvl);
            prop = GlobalFun.ObjPlusOrMinus(prop, curProp);
        }
        this.totalProp = prop;
        this.zdl.value = ItemUtils.getZdlByProp(this.totalProp);
    }

    private openTotalProp(): void {
        let view = new ViewProp();
        view.firData = {};
        view.firData["src"] = "totems_json.totems_texture_0_png";
        view.firData["prop"] = this.totalProp;
        App.ViewManager.open(ViewConst.TOTALPROP, view);
    }

    private redShow() {
        App.ViewManager.showRedPoint(this.btn_0, GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, this.oldIndex));
        App.ViewManager.showRedPoint(this.btn_1, GameCache.jewel.checkJewelUpGrade(this.roleSelect.roleId, this.oldIndex));
        App.ViewManager.showRedPoint(this.btn_2, GameCache.jewel.checkJewelInsert(this.roleSelect.roleId, this.oldIndex));
    }
}