/*
 * @Description: 日常任务页签
 * @Author: liangzhaowei
 * @Date: 2019-08-01 19:32:56
 * @LastEditTime: 2019-10-25 14:01:11
 */
class DailyTaskPannel extends CommunalPagePannel {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "DailyTaskPannelSkin";

    }

    public progressBar: eui.ProgressBar;
    public hudNum: NumberMC;
    public list: eui.List;
    public imgStrea0: eui.Button;
    public imgStrea1: eui.Button;
    public imgStrea2: eui.Button;
    public imgStrea3: eui.Button;

    public actNum0: eui.Label;
    public actNum1: eui.Label;
    public actNum2: eui.Label;
    public actNum3: eui.Label;

    public listStrea: number[] = [0, 0, 0, 0];
    public actNum: number = 0;//当前活跃度
    public allActNum: number = 0;//总活跃度

    public init(): void {
        this.list.itemRenderer = DailyTaskItem;
        this.hudNum.gap = 14;

        for (let i = 0; i < 4; i++) {
            (this["actNum" + i] as eui.Label).text = GameConfig.DailyReward[i + 1].value + "";
        }
        this.hudNum.alignH = "center";
    }
    /**界面整个界面的红点 */
    static red() {
        if (!GameCache.daily) {
            return false;
        }
        return GameCache.daily.getDailyTaskRed() || GameCache.daily.getDailyStreaRed();
    }


    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [MsgConst.DAILY,MsgConst.PROPERTY + PropId.AP_ACTIVITY_AWARD_FLAG];
    }

    public open(param: ViewProp = null) {
        this.message(MsgConst.DAILY, this.upCn)
        this.addTouchEvent(this.imgStrea0, this.onClick)
        this.addTouchEvent(this.imgStrea1, this.onClick)
        this.addTouchEvent(this.imgStrea2, this.onClick)
        this.addTouchEvent(this.imgStrea3, this.onClick)
        this.message(MsgConst.PROPERTY + PropId.AP_ACTIVITY_AWARD_FLAG, this.upCn);
        this.upCn();
        this.allActNum = GameCache.daily.getAllActNum()
        this.progressBar.maximum = this.allActNum;
    }

    public upCn() {
        let arr = [];
        for (let index in GameConfig.daily) {
            let cfg = CommonUtils.copyDataHandler(GameConfig.daily[index]);
            let state = GameCache.daily.dailyListData[cfg.id] ? GameCache.daily.dailyListData[cfg.id].state : 0;
            if (state == 2) {
                cfg.sortof = cfg.id;
            }
            else if (state == 1) {
                cfg.sortof = 10000 + cfg.id;
            }
            else if (state == 3) {
                cfg.sortof = 20000 + cfg.id;
            }
            else if (state == 0) {
                cfg.sortof = 30000 + cfg.id;
            }
            else {
                cfg.sortof = 40000 + cfg.id;
            }
            arr.push(cfg);
        }

        arr.sort(this.sort);
        this.setListData(this.list, arr);
        this.actNum = GameCache.daily.getActNum();
        this.hudNum.value = this.actNum;
        this.progressBar.value = this.actNum;
        this.listStrea = GameCache.daily.getStreaList();
        this.refreshGetTrea();
    }

    public sort(a, b) {
        return a.sortof - b.sortof;
    }

    public refreshGetTrea() {
        let treaStList = this.listStrea;
        for (let index in treaStList) {
            let st = treaStList[index];
            (this[`imgGot${index}`] as eui.Image).visible = st === 2;
            this["imgStrea" + index].icon = "daily_json.daily_tr_" + index + st + "_png";
        }
    }

    public onClick(e: egret.TouchEvent) {
        let getIndex = -1;
        let tIndex = 1;
        switch (e.currentTarget) {
            case this.imgStrea0:
                getIndex = this.listStrea[0] == 1 ? 0 : -1;
                tIndex = 1;
                break;
            case this.imgStrea1:
                getIndex = this.listStrea[1] == 1 ? 1 : -1;
                tIndex = 2
                break;
            case this.imgStrea2:
                getIndex = this.listStrea[2] == 1 ? 2 : -1;
                tIndex = 3
                break;
            case this.imgStrea3:
                getIndex = this.listStrea[3] == 1 ? 3 : -1;
                tIndex = 4
                break;
            default:
                break;
        }
        if (getIndex >= 0) {
            Proxy.daily.getActRw(getIndex);
        }
        else {
            if (this.listStrea[tIndex - 1] == 0) {
                let data = new ViewProp();
                data.exData1 = tIndex;
                App.ViewManager.open(ViewConst.DAILYSHOWTIP, data)
            }
        }

    }


}
