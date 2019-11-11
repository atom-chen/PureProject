/*
 * @Description: 副本爬塔页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-26 13:54:50
 */
class CopyTowerPannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "CopyTowerPannelSkin"
    }

    public lbNe0: eui.Label;
    public lbNe1: eui.Label;
    public lbNe2: eui.Label;
    public lbLv0: eui.Label;
    public lbLv1: eui.Label;
    public lbLv2: eui.Label;
    public list: eui.List;
    public btnRw: eui.Button;
    public btnLuck: eui.Button;
    public lbAcross: eui.Label;
    public rw: ItemBase;
    public lbRwNe: eui.Label;
    public lbLuckAcc: eui.Label;
    public lb1: eui.Label;
    public lb2: eui.Label;
    public lb3: eui.Label;
    public lb0: eui.Label;
    public btnClg: eui.Button;
    public btnRank: eui.Image;

    /**当前层级 */
    public nTower = 1;
    public stdMiwu: StdMiwutower

    /**界面整个界面的红点 */
    static red() {
        if (!GameCache.copytower.copyTowerData) {
            return false;
        }
        return GameCache.copytower.bGetDailyRw() || GameCache.copytower.copyTowerData.luckLeftTime > 0;
    }


    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.CPOY_TOWER];
    }

    /**界面内循环刷新红点函数 */
    public refreshRed() {
        super.refreshRed();

        if (!GameCache.copytower.copyTowerData) {
            return;
        }
        App.ViewManager.showRedPoint(this.btnRw, GameCache.copytower.bGetDailyRw());
        App.ViewManager.showRedPoint(this.btnLuck, GameCache.copytower.copyTowerData.luckLeftTime > 0);
    }

    public init(): void {
        this.list.itemRenderer = ItemBase;
    }

    public open(param: ViewProp = null) {
        this.addTouchEvent(this.btnRw, this.onClick);
        this.addTouchEvent(this.btnLuck, this.onClick);
        this.addTouchEvent(this.btnClg, this.onClick);
        this.addTouchEvent(this.btnRank, this.onClick);
        this.message(MsgConst.CPOY_TOWER, this.upCn);
        this.message(MsgConst.CPOY_TOWER_RANK, this.upRank);
        Proxy.copytower.getRank(3);
        this.upCn();
    }

    /**更新内容 */
    public upCn() {
        this.nTower = GameCache.copytower.copyTowerData ? GameCache.copytower.copyTowerData.layer + 1 : 1;
        this.stdMiwu = GameConfig.miwuTower[this.nTower];
        if (this.stdMiwu) {
            this.setListData(this.list, this.stdMiwu.awardshow)

            /**层级显示 */
            for (let i = 0; i < 4; i++) {
                let str = "";
                let showTower = this.nTower - 2 + i;
                if (showTower > 0) {
                    str = StringUtils.substitute(Language.lang.lcn3, showTower);
                }
                this["lb" + i].text = str;
            }
        }
        if (this.stdMiwu.specialShow && this.stdMiwu.specialShow[0]) {
            let rwData = this.stdMiwu.specialShow[0];
            this.rw.data = rwData;
            this.lbRwNe.text = GameConfig.item[rwData.id] ? GameConfig.item[rwData.id].name : "";
        }

    }

    /**更新排行榜数据 */
    public upRank() {
        let rankList = GameCache.copytower.rankList;
        for (let index in rankList) {
            let rankData = rankList[index];
            if (this["lbNe" + index]) {
                this["lbNe" + index].text = rankData.name;
                this["lbLv" + index].text = StringUtils.substitute(Language.lang.lcn5, rankData.layer);
            }
        }
    }

    public onClick(e: egret.TouchEvent) {

        switch (e.currentTarget) {
            case this.btnRw:
                let data = new ViewProp();
                data.exData1 = this.stdMiwu;
                App.ViewManager.open(ViewConst.COPYTOWERRW, data)
                break;
            case this.btnLuck:
                let getTime = GameCache.copytower.copyTowerData ? GameCache.copytower.copyTowerData.luckHaveTime : 1;//当前抽取奖励次数
                if (getTime < 1) {
                    getTime = 1;
                }
                let getIndex = Math.ceil(getTime / 10) * 10;
                let config = GameConfig.miwuTowerJackpot[getIndex];
                if (config && config.jackpot) {
                    let data1 = new ViewProp();
                    data1.exData1 = config.jackpot;
                    App.ViewManager.open(ViewConst.LUCKYDAIL, data1);
                }
                break;
            case this.btnClg:
                Proxy.copytower.gotoCopy();
                App.ViewManager.close(ViewConst.COPY);
                break;
            case this.btnRank:
                Proxy.copytower.getRank(30);
                App.ViewManager.open(ViewConst.RANKMODELWINA);
                break;
            default:
                break;
        }


    }



}
