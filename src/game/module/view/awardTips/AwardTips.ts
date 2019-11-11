/**
 * create by junwei on 07/16/2019
 * 奖励提示窗
 */
class AwardTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "AwardTipsSkin";
        this.closeDispose = false;
    }

    public gsImg: eui.Image;
    public itemList: eui.List;
    public recvBtn: eui.Button;
    public itemList_1: eui.List;
    public countDown: eui.Label;
    public eva: eui.Image;
    public actiBtn: eui.Button;


    public hander: Handler;

    private firstData: any;
    private outSt = 0;

    protected init(): void {
        super.init();
        this.itemList.itemRenderer = AwardItem;
        this.itemList_1.itemRenderer = AwardItem;
    }

    public open(param: ViewProp): void {
        if (!param || param == null) return;

        this.outSt = 0;
        this.firstData = param.firData;
        if (param.firData["state"]) {
            this.currentState = param.firData["state"];
        } else {
            this.currentState = "pass";
        }
        if (param.firData["func"]) {
            this.hander = Handler.create(param.firData["funcObj"], param.firData["func"], null, false);
        }

        if (param.firData["out"]) {
            this.outSt = 1;
        }
        this.countDown.text = StringUtils.substitute(Language.lang.autoTime, 7);
        App.DisplayUtils.buttonDownTime(this.recvBtn, 7, [this.countDown, Language.lang.autoTime]);
        this.addTouchEvent(this.recvBtn, this.closeView);
        this.addTouchEvent(this.actiBtn, this.out);
        this.initList(param.firData["itemArr"]);
        this.initState(param.firData);
    }


    public close(param: ViewProp): void {
        super.close();
        if (this.outSt != 2) {
            this.recvFunc();
        }
        if (this.hander) {
            this.hander.dispose();
            this.hander = null;
        }
    }

    private initList(itemArr): void {
        this.setListData(this.itemList, itemArr);
    }

    /**直接退出 */
    public out() {

        if (this.currentState == "copyTower") {
            if (this.outSt == 1) {
                this.outSt = 2;
            }
            Proxy.copy.sendQuit(GameCache.map.fbId);
            this.closeView();
            App.ViewManager.openTab(ViewConst.COPY, 1, 0);
        }
    }

    private initState(firData): void {
        if (this.currentState == "boss") {
            this.gsImg.visible = true;
            if (firData["itemArr1"]) {
                this.itemList_1.visible = true;
                this.setListData(this.itemList_1, firData["itemArr1"]);
                // this.gsImg.visible = false;
            } else {
                this.itemList_1.visible = false;
                // this.gsImg.visible = true;
            }
        } else if (this.currentState == "copy") {
            //材料副本评分
            let eva = GameCache.copy.copyEvaData[this.firstData["fbid"]];
            (this["eva"] as eui.Image).source = "awardTips_json.awardTips_l_" + eva + "_png";
        }
    }

    public setList(type, arr): void {
        this.gsImg.visible = false;
        if (type == 1) {
            this.setListData(this.itemList_1, arr);
        } else {
            this.setListData(this.itemList, arr);
        }
    }

    private recvFunc(): void {
        if (this.hander) {
            this.hander.args = [this.firstData["fbid"], 0];
            this.hander.run();
        }
    }

    public resetHandler(thisc, func): void {
        if (this.hander) {
            // this.hander.args = [this.firstData["fbid"], 0];
            // this.hander.run();
            this.hander.dispose();
        }
        this.hander = Handler.create(thisc, func);
    }

    public setCopyId(id): void {
        this.firstData["fbid"] = id;
    }
}