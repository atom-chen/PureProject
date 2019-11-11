var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/*
 * @Description: 选服界面
 * @Author: xiejunwei
 * @Date: 2019-10-10 11:34:49
 */
var ServerWin = (function (_super) {
    __extends(ServerWin, _super);
    // static get ins(): ServerWin {
    //     if (!ServerWin[`$instance`]) ServerWin[`$instance`] = new ServerWin();
    //     return ServerWin[`$instance`];
    // }
    function ServerWin() {
        var _this = _super.call(this) || this;
        _this.sendData = {};
        _this.serverlist = [{ "server_id": "1", "name": "外网", "server_status": "2", "server_ip": "152.136.19.57", "server_port": "13001", "hosts": "http://res.lysj.vspk.com/h5_vt/" }];
        _this.lastServer = [{ "server_id": "1", "name": "外网", "server_status": "2", "server_ip": "152.136.19.57", "server_port": "13001", "hosts": "http://res.lysj.vspk.com/h5_vt/" }];
        _this.skinName = "ServerWinSkin";
        _this.top = 0;
        _this.bottom = 0;
        _this.horizontalCenter = 1;
        _this.focusToStage();
        _this.scaleX = _this.scaleY = 1;
        return _this;
    }
    ServerWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemList.itemRenderer = ServerItem;
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onListTouche);
        this.addTouchEvent(this.sName, this.changeState);
        this.addTouchEvent(this.cBtn, this.changeState);
        this.addTouchEvent(this.tabBtn, this.onTabTouche);
        this.addTouchEvent(this.enterBtn, this.enterFunc);
        this.serverData = param[0];
        if (this.handler)
            this.handler.dispose();
        if (param[1]) {
            this.handler = Handler.create(param[2], param[1], [param[3]], false);
        }
        // this.onTabTouche();
        this.t0.text = Language.lang.server_2;
        for (var i in this.serverlist[0]) {
            this.sendData[i] = this.serverlist[0][i];
        }
    };
    ServerWin.prototype.initTab = function () {
        if (this.serverData) {
        }
    };
    ServerWin.prototype.onTabTouche = function () {
        var tar = this.tabBtn.selectedIndex;
        this.initList(tar);
    };
    ServerWin.prototype.initList = function (tar) {
        if (tar === void 0) { tar = 0; }
        if (tar == 0) {
            this.setListData(this.itemList, this.serverlist);
        }
        else {
            this.setListData(this.itemList, this.lastServer);
        }
    };
    ServerWin.prototype.onListTouche = function (e) {
        for (var i in e.item) {
            this.sendData[i] = e.item[i];
        }
        this.currentState = "nor";
        this.sName.text = e.item.name;
    };
    ServerWin.prototype.changeState = function (e) {
        var tar = e.target.name;
        this.currentState = tar;
        if (tar == "sele") {
            this.onTabTouche();
        }
    };
    ServerWin.prototype.enterFunc = function () {
        if (this.handler) {
            this.handler.args.push(this.sendData);
            this.handler.run();
        }
    };
    ServerWin.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    return ServerWin;
}(BaseEuiWindow));
__reflect(ServerWin.prototype, "ServerWin");
//# sourceMappingURL=ServerWin.js.map