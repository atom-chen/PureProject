/*
 * @Description: 
 * @Author: xiejunwei
 * @Date: 2019-09-27 19:33:32
 */
/**
 * Debug窗口
 */

class DeBugWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Message);
        this.skinName = "DebugWinSkin";
        this.left = 0;
        this.top = 0;
    }

    public inText: eui.TextInput;
    public sBtn: eui.Button;
    public closeBtn: eui.Image;
    public itemList: eui.List;
    public gridXY: eui.Label;
    public pixXY: eui.Label;
    public lText: eui.Label;
    public g: eui.Group;

    private cmArr: string[][] = [
        ["@AddItem ", "加道具"],
        ["@openWin ", "打开窗口"],
        ["@SkillEdit", "打开技能特效调试"],
        ["@debugDragon", "龙骨测试"],
        ["@guide 1", "引导"],
        ["@usSkill 2", "强制使用技能"],
        ["@setCellXY", "设置人物格子坐标"],
        ["@AddEqSet", "勇士装备全家桶"],
        ["@AddAESet", "冒险者全家桶"],
        ["@AddMoney ", "添加金钱"],
        ["@Level ", "升级"],
        ["@AddHero ", "添加副角色"],
        ["@setSysTime ", "设置服务器时间"],
        ["@textFlow", "富文本格式测试"],
        ["@emojiSize ", "表情大小"],
        ["@winCon", "功能开启限制"]
    ]

    protected initUI(): void {

    }

    public open(param: ViewProp = null): void {
        super.open();
        if (param && param.exData1) {
            this.inText.text = param.exData1;
        }
        this.addEvent(egret.TouchEvent.TOUCH_TAP, this.sBtn, this.sendFunc);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.listTouche);
        this.addEvent(egret.TextEvent.LINK, this.lText, this.onLink);
        this.addTouchEvent(this.closeBtn, this.closeView);
        this.initList();
        // GameCache.hero.focusPlayer.cellXY
        this.pixXY.text = "像素坐标：X" + GameCache.hero.focusPlayer.x + ",Y" + GameCache.hero.focusPlayer.y;
        this.gridXY.text = "格子坐标：X" + GameCache.hero.focusPlayer.cellXY.x + ",Y" + GameCache.hero.focusPlayer.cellXY.y;
        // this.message(egret.Event.ENTER_FRAME, this.printXY);

    }

    private printXY(): void {

    }

    public close(param: ViewProp = null): void {
        super.close();
        // this.removeAllEvent();
    }


    private listTouche(e: eui.ItemTapEvent): void {
        if (e.item.text == "@setSysTime ") {
            let time = GameCache.server.serverTime / 1000;
            let str = App.DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_15);
            str = str.replace(" ", "-");
            this.inText.text = e.item.text + str;
            return;
        }
        if (e.item.text == "@textFlow") {
            this.currentState = "note";
        }
        if (e.item.text) {
            this.inText.text = e.item.text;
        }
    }

    private sendFunc(): void {
        if (!ChatMgr.chechIsGMMsg(this.inText.text)) {
            if (this.inText.text == "reset") {
                this.currentState = "nor";
            }
            if (this.currentState == "note") {
                this.labelTextFlow();
                return;
            }
            console.log("非GM命令");
        } else {
            console.log("done");
        }
    }

    private initList(): void {
        let dataArr = [];
        for (let i of this.cmArr) {
            let obj = {};
            obj["text"] = i[0];
            obj["des"] = i[1];
            dataArr.push(obj);
        }
        this.setListData(this.itemList, dataArr);
    }

    private addXYonMainUI(): void {

    }

    private labelTextFlow(): void {
        this.lText.textFlow = TextFlowUtils.generateTextFlow(this.inText.text);
        // console.log(this.lText["linesArr"]);
        // egret.callLater(, this);
        // App.TimerManager.addFrame(1,()=>{TextFlowUtils.generateEmoji(this.lText, this.g,true)},this,1);
        TextFlowUtils.generateEmoji(this.lText, this.g, true)
    }

    private onLink(e: egret.TextEvent): void {
        let text = e.text;
        TextFlowUtils.hrefType(text);
    }
}