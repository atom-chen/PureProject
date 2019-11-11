var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 登录选服页面管理
 * @Author: xiejunwei
 * @Date: 2019-10-22 10:48:56
 */
var ServerMgr = (function () {
    function ServerMgr() {
    }
    ServerMgr.insertLoading = function (thisc) {
        if (this.IsHtml5) {
            // window['showVersion'] = LoadingPage.ins.showVersion;
            // thisc.addChild(LoadingPage.ins);
        }
        else if (this.IsNative) {
            // if()
            window['showVersion'] = LoadingPage.ins.showVersion;
            window['showLoadProgress'] = LoadingPage.ins.showProgress;
            thisc.addChild(LoadingPage.ins);
        }
    };
    ServerMgr.insertServerSele = function (thisc) {
        if (this.IsHtml5) {
            thisc.gameApp.start();
            // let win = new ServerWin();
            // thisc['serverWin'] = win;
            // this.tempServerWin = win;
            // thisc.addChild(win);
            // win.open([], this.onServerSele, this, thisc);
        }
        else {
            var win = new ServerWin();
            thisc['serverWin'] = win;
            this.tempServerWin = win;
            thisc.addChild(win);
            win.open([], this.onServerSele, this, thisc);
        }
    };
    ServerMgr.onServerSele = function (thisc, server) {
        this.closeServerWin();
        window['showVersion'](GlobalVar.version);
        LocationProperty.srvid = server.server_id;
        LocationProperty.serverIP = server.server_ip;
        LocationProperty.serverPort = server.server_port;
        thisc.gameApp.start();
    };
    ServerMgr.loadingDispose = function () {
        if (this.IsNative) {
            LoadingPage.ins.dispose();
        }
    };
    ServerMgr.closeServerWin = function () {
        if (this.IsNative) {
            if (this.tempServerWin) {
                this.tempServerWin.dispose();
                this.tempServerWin = null;
            }
        }
        else if (this.IsHtml5) {
            // if (this.tempServerWin) {
            //     this.tempServerWin.dispose();
            //     this.tempServerWin = null;
            // }
        }
    };
    Object.defineProperty(ServerMgr, "IsHtml5", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerMgr, "IsNative", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
                || egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
        },
        enumerable: true,
        configurable: true
    });
    return ServerMgr;
}());
__reflect(ServerMgr.prototype, "ServerMgr");
//# sourceMappingURL=ServerMgr.js.map