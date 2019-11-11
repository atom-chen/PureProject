/*
 * @Description: 图腾页面
 * @Author: xiejunwei
 * @Date: 2019-08-26 16:52:03
 * @LastEditTime: 2019-11-01 14:49:10
 */
class TotemsPage extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "TotemsPageSkin";
    }

    public item: ItemBase;
    public slider: SlidePart;
    public cost: ItemExpend;
    public iG: eui.Group;
    public lvlMax: eui.Image;
    public btn_0: eui.Button;
    public btn_1: eui.Button;
    public propList: PropPart;
    public pBtn: eui.Button;
    public zdl: ZdlPrint;
    public img_0: eui.Image;

    private arrayType = [];

    protected init(): void {
        super.init();
        this.arrayType = [1, Object.keys(GameConfig.totems).length];
    }

    static red() {
        if (GameCache.totems.checkGrade()) return true;
        if (GameCache.totems.checkReonance()) return true;
        return false;
    }

    static changeMsg() {
        return [MsgConst.TOTEMS_INFO];
    }

    public refreshRed() {
        this.redShow();
    }

    public open(param: ViewProp): void {
        this.addTouchEvent(this.btn_1, this.openPropTips);
        this.addTouchEvent(this.btn_0, this.openResonance);
        this.addTouchEvent(this.pBtn, this.upGradeFunc);

        this.message(MsgConst.TOTEMS_INFO, this.initData);
        this.message(MsgConst.TOTEMS_INFO, this.upGradeChange);

        let arr = [];
        for (let i in GameConfig.totems) {
            let id = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            arr.push([i, id]);
        }
        this.slider.initData(TotemsImgItem, arr, this.onCall, this);
        this.initData();
    }

    public onCall(): void {
        this.initData();
    }

    private initData(): void {
        let idx = this.slider.currentIndex + 1;
        let tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        let conf = GameConfig.totems[idx][tLvl];
        let nextConf = GameConfig.totems[idx][tLvl + 1] ? GameConfig.totems[idx][tLvl + 1] : null;
        if (tLvl == 1) {
            this.img_0.source = "totems_json.totems_active_txt_png";
            this.pBtn.icon = RES_DIR_BTN + "activate_3.png";
        } else {
            this.img_0.source = "totems_json.totems_upGrade_txt_png";
            this.pBtn.icon = RES_DIR_BTN + "promote_1.png";
        }
        if (!conf) return;
        let nextprop = [];
        if (nextConf) {
            this.lvlMax.visible = false;
            this.pBtn.visible = true;
            this.cost.visible = true;
            this.item.visible = true;
            this.item.data = conf.consume[0];
            this.cost.setData(conf.consume[0].id, conf.consume[0].count);
            nextprop = nextConf.levelAtt.concat();
        } else {
            this.lvlMax.visible = true;
            this.pBtn.visible = false;
            this.cost.visible = false;
            this.item.visible = false;
        }
        this.propList.setData(conf.levelAtt, nextprop, 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
        let star = conf.starlevel;
        for (let i = 0; i < 6; i++) {
            (this[`item_${i}`] as eui.Image).source = (i + 1) <= star ? "totems_json.totems_item_sele_png" : "totems_json.totems_item_u_sele_png";
        }
        let value = 0;
        for (let i in GameConfig.totems) {
            let lvl = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            let item = GameConfig.totems[i][lvl];
            value += ItemUtils.getZdlByProp(item.levelAtt);
        }
        this.zdl.value = value;
    }

    private upGradeChange(): void {
        let idx = this.slider.currentIndex + 1;
        let tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        this.slider.replaceItemData(this.slider.currentIndex, [idx, tLvl]);
        this.showEff();
    }

    private openPropTips(): void {
        let prop = [];
        for (let i in GameConfig.totems) {
            let lvl = GameCache.totems.totemsData[i] ? GameCache.totems.totemsData[i].id : 1;
            let item = GameConfig.totems[i][lvl];
            prop = GlobalFun.ObjPlusOrMinus(prop, item.levelAtt);
        }
        let view = new ViewProp();
        view.firData = {};
        view.firData["src"] = "totems_json.totems_texture_0_png";
        view.firData["prop"] = prop;
        App.ViewManager.open(ViewConst.TOTALPROP, view);
    }

    private openResonance(): void {
        App.ViewManager.open(ViewConst.RESONANCE);
    }

    private upGradeFunc(): void {
        if (this.cost.checkEnough()) {
            let idx = this.slider.currentIndex + 1;
            Proxy.totems.sendUpGrade(idx);
        }
    }

    private redShow(): void {
        App.ViewManager.showRedPoint(this.pBtn, GameCache.totems.checkGrade(this.slider.currentIndex + 1));
        App.ViewManager.showRedPoint(this.slider.lBtn, GameCache.totems.checkGrade([this.arrayType[0], this.slider.currentIndex]));
        App.ViewManager.showRedPoint(this.slider.rBtn, GameCache.totems.checkGrade([this.slider.currentIndex + 2, this.arrayType[1]]));
        App.ViewManager.showRedPoint(this.btn_0, GameCache.totems.checkReonance());
    }

    private showEff() {
        let idx = this.slider.currentIndex + 1;
        let tLvl = GameCache.totems.totemsData[idx] ? GameCache.totems.totemsData[idx].id : 1;
        let conf = GameConfig.totems[idx][tLvl];
        let star = conf.starlevel;
        if (!conf) return;
        let tar = star - 1;
        if (tar < 0) return;
        let item = (this[`item_${tar}`] as eui.Image);
        let mc = App.DisplayUtils.addEffectToObj(this.iG, "point2_0_1", 1, item.x + 22, item.y + 22);
    }
}