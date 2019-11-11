/*
 * @Description: 竞技面板
 * @Author: xiejunwei
 * @Date: 2019-09-03 19:06:41
 * @LastEditTime: 2019-10-26 15:54:06
 */
class JingjiPannel extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "JingJiPannelSkin";
    }

    public itemList: eui.List;
    public zdl: eui.Label;
    public roleName: eui.Label;
    public point: eui.Label;
    public win: eui.Label;
    public rankBtn: eui.Button;
    public time: eui.Label;
    public count: eui.Label;
    public reBtn: eui.Button;
    public icon: eui.Image;
    public mLvl: eui.Label;
    public bBtn: eui.Button;



    protected init(): void {
        super.init();
        this.itemList.itemRenderer = JingjiItem;
    }

    static red() {
        return GameCache.jingji.checkEnter();
    }

    static changeMsg() {
        return [MsgConst.JINGJI_PERSONAL_DATA];
    }

    public open(param: ViewProp): void {
        this.message(MsgConst.JINGJI_LIST, this.initList);
        this.message(MsgConst.JINGJI_PERSONAL_DATA, this.initData);

        this.addTouchEvent(this.reBtn, this.reFreshFunc);
        this.addTouchEvent(this.bBtn, this.openBuyTips);
        this.addTouchEvent(this.rankBtn, () => {
            App.ViewManager.open(ViewConst.JINGJIRANK);
        })

        Proxy.other.sendListRefresh(0);
        this.initRoleData();
        this.initData();
    }



    private initRoleData(): void {
        this.roleName.text = GameCache.hero.mainPro.charName;
        this.mLvl.text = GameCache.hero.mainPro.pro(PropId.AP_LEVEL) + "";
        let zdl = 0;
        this.icon.source = GlobalFun.getRoleIcon(GameCache.hero.mainPro.pro(PropId.AP_JOB));//RES_DIR_ROLE_ICON + "role_" + GameCache.hero.mainPro.pro(PropId.AP_JOB) + ".png";
        for (let i of GameCache.hero.list) {
            zdl += i.pro.pro(PropId.AP_BATTLE_POWER);
        }
        this.zdl.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.jingji_t1, zdl));

    }

    private initData(): void {
        let data: { winNum, winPoint, remain, bought, recoverTime, refreshTime, pointRank } = GameCache.jingji.jingjiData;
        this.point.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.jingji_t2, data.winPoint));

        this.win.text = data.pointRank ? StringUtils.substitute(Language.lang.jingji_t3, data.pointRank) : Language.lang.jingji_t4;
        let countStr = StringUtils.substitute(Language.lang.remain, data.remain + "/10");
        this.count.textFlow = TextFlowUtils.generateTextFlow(countStr);
        this.time.text = "";
        if (data.recoverTime) {
            let time = (data.recoverTime - GameCache.server.serverTime) / 1000;
            if (time > 0) {
                let str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
                this.time.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.resetTime, str));
                if (!App.TimerManager.isExists(this.timeCount, this))
                    App.TimerManager.addDelay(0, 1000, 0, this.timeCount, this);
            }
        }
    }

    private timeCount(): void {
        let time = (GameCache.jingji.jingjiData.recoverTime - GameCache.server.serverTime) / 1000;
        if (time >= 0) {
            let str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_1);
            this.time.textFlow = TextFlowUtils.generateTextFlow(StringUtils.substitute(Language.lang.resetTime, str));
        } else {
            this.time.text = "";
            App.TimerManager.remove(this.timeCount, this);
        }
    }

    private initList(): void {
        let arr = GameCache.jingji.jingjiList;
        this.setListData(this.itemList, arr);
    }

    private reFreshFunc(): void {
        Proxy.other.sendListRefresh(1);
    }

    private openBuyTips(): void {
        GlobalFun.openEnterBuy("jingji");
    }
}