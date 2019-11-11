/*
 * @Description: 选服界面
 * @Author: xiejunwei
 * @Date: 2019-10-10 11:34:49
 */
class ServerWin extends BaseEuiWindow {

    // static get ins(): ServerWin {
    //     if (!ServerWin[`$instance`]) ServerWin[`$instance`] = new ServerWin();
    //     return ServerWin[`$instance`];
    // }

    public constructor() {
        super();
        this.skinName = "ServerWinSkin";

        this.top = 0;
        this.bottom = 0;
        this.horizontalCenter = 1;
        this.focusToStage();
        this.scaleX = this.scaleY = 1;
    }

    public enterBtn: eui.Button;
    public curStatus: eui.Image;
    public t0: eui.Label;
    public sName: eui.Label;
    public marsk: eui.Rect;
    public serverGroup: eui.Group;
    public itemList: eui.List;
    public tabBtn: eui.TabBar;
    public cBtn: eui.Image;

    private serverData;
    private handler: Handler;

    private sendData = {};

    private serverlist = [{ "server_id": "1", "name": "外网", "server_status": "2", "server_ip": "152.136.19.57", "server_port": "13001", "hosts": "http://res.lysj.vspk.com/h5_vt/" }];

    private lastServer = [{ "server_id": "1", "name": "外网", "server_status": "2", "server_ip": "152.136.19.57", "server_port": "13001", "hosts": "http://res.lysj.vspk.com/h5_vt/" }];


    public open(...param): void {
        this.itemList.itemRenderer = ServerItem;
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onListTouche);
        this.addTouchEvent(this.sName, this.changeState);
        this.addTouchEvent(this.cBtn, this.changeState);
        this.addTouchEvent(this.tabBtn, this.onTabTouche);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.serverData = param[0];
        if (this.handler) this.handler.dispose();
        if (param[1]) {
            this.handler = Handler.create(param[2], param[1], [param[3]], false);
        }
        // this.onTabTouche();

        this.t0.text = Language.lang.server_2;

        for (let i in this.serverlist[0]) {
            this.sendData[i] = this.serverlist[0][i];
        }
    }

    private initTab(): void {
        if (this.serverData) {

        }
    }

    private onTabTouche(): void {
        let tar = this.tabBtn.selectedIndex;
        this.initList(tar);
    }

    private initList(tar = 0): void {
        if (tar == 0) {
            this.setListData(this.itemList, this.serverlist);
        } else {
            this.setListData(this.itemList, this.lastServer);
        }
    }

    private onListTouche(e: eui.ItemTapEvent): void {
        for (let i in e.item) {
            this.sendData[i] = e.item[i];
        }
        this.currentState = "nor";
        this.sName.text = e.item.name;
    }

    private changeState(e: egret.TouchEvent): void {
        let tar = e.target.name;
        this.currentState = tar;
        if (tar == "sele") {
            this.onTabTouche();
        }
    }

    private enterFunc(): void {
        if (this.handler) {
            this.handler.args.push(this.sendData);
            this.handler.run();
        }
    }

    public dispose(): void {
        super.dispose();
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    }
}