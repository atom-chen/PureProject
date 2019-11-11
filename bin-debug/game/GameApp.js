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
 * @Description: GameApp
 * @Author: guolinsen
 * @Date: 2019-07-19 11:27:08
 * @LastEditTime: 2019-10-26 10:55:16
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        var _this = _super.call(this) || this;
        _this.resOk = false;
        _this.configOk = false;
        return _this;
    }
    GameApp.prototype.start = function () {
        if (!this.configOk) {
            this.loadConfig();
        }
        else if (!this.resOk) {
            this.loadRes();
        }
    };
    GameApp.prototype.loadConfig = function () {
        LocationProperty.setLoadProgress(20, "(加载游戏配置)");
        var groupName = "config";
        ResourceUtils.ins().loadGroup(groupName, this.readConfig, null, this);
    };
    GameApp.prototype.readConfig = function () {
        var _this = this;
        ConfigCache.read(RES.getRes("config_data"));
        RES.destroyRes("config_data");
        var list = ConfigCache.getFileList();
        App.TimerManager.addFrame(1, function () {
            var t = egret.getTimer();
            var iv = 0;
            while (iv < 32) {
                var f = list.shift();
                if (f) {
                    ConfigCache.parseFile(f);
                }
                else {
                    break;
                }
                iv = egret.getTimer() - t;
            }
            if (list.length == 0) {
                App.TimerManager.removeAll(_this);
                _this.configOk = true;
                console.log("配置解析完毕");
                _this.loadServer();
            }
        }, this);
        this.loadRes();
    };
    GameApp.prototype.loadRes = function () {
        var groupName = "all";
        ResourceUtils.ins().loadGroup(groupName, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    };
    /**
     * 资源组加载完成
     */
    GameApp.prototype.onResourceLoadComplete = function () {
        this.resOk = true;
        this.loadServer();
    };
    GameApp.prototype.loadServer = function () {
        if (this.resOk && this.configOk) {
            LocationProperty.setLoadProgress(90, "(登录游戏)");
            ModuleManager.init();
            GameCache.map.readXML(RES.getRes("map_data"));
            RES.destroyRes("map_data");
            ServerMgr.loadingDispose();
            App.Socket.login(LocationProperty.user, "e10adc3949ba59abbe56e057f20f883e", LocationProperty.srvid, LocationProperty.serverIP, LocationProperty.serverPort);
        }
        console.log("服务器IP：" + LocationProperty.serverIP + "用户名" + LocationProperty.user);
    };
    /**
     * 资源组加载进度
     */
    GameApp.prototype.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        LocationProperty.setLoadProgress(25 + (itemsLoaded / itemsTotal * 60), "(加载必要资源)");
    };
    return GameApp;
}(egret.HashObject));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map