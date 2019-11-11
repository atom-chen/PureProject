/*
 * @Description: 登录选服页面管理
 * @Author: xiejunwei
 * @Date: 2019-10-22 10:48:56
 */
class ServerMgr {

    private static tempServerWin;

    static insertLoading(thisc): void {
        if (this.IsHtml5) {
            // window['showVersion'] = LoadingPage.ins.showVersion;
            // thisc.addChild(LoadingPage.ins);
        } else if (this.IsNative) {
            // if()
            window['showVersion'] = LoadingPage.ins.showVersion;
            window['showLoadProgress'] = LoadingPage.ins.showProgress;
            thisc.addChild(LoadingPage.ins);
        }

    }

    static insertServerSele(thisc): void {
        if (this.IsHtml5) {
            thisc.gameApp.start();
            // let win = new ServerWin();
            // thisc['serverWin'] = win;
            // this.tempServerWin = win;
            // thisc.addChild(win);
            // win.open([], this.onServerSele, this, thisc);
        } else {
            let win = new ServerWin();
            thisc['serverWin'] = win;
            this.tempServerWin = win;
            thisc.addChild(win);
            win.open([], this.onServerSele, this, thisc);
        }

    }

    static onServerSele(thisc, server): void {
        this.closeServerWin();
        window['showVersion'](GlobalVar.version);
        LocationProperty.srvid = server.server_id;
        LocationProperty.serverIP = server.server_ip;
        LocationProperty.serverPort = server.server_port;
        thisc.gameApp.start();
    }

    static loadingDispose(): void {
        if (this.IsNative) {
            LoadingPage.ins.dispose();
        }
    }

    static closeServerWin(): void {
        if (this.IsNative) {
            if (this.tempServerWin) {
                this.tempServerWin.dispose();
                this.tempServerWin = null;
            }
        } else if (this.IsHtml5) {
            // if (this.tempServerWin) {
            //     this.tempServerWin.dispose();
            //     this.tempServerWin = null;
            // }
        }
    }

    static get IsHtml5(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    }

    static get IsNative(): boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE
            || egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2;
    }
}