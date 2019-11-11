/**
 * create by junwei on 06/21/2019
 * 跑马灯
 */
class BarrageTips {
    private msgList: string[];
    private playing: boolean;
    private groBg: eui.Image;
    private groPool: BarrageTipsGro[];
    private playingGro: BarrageTipsGro[];

    private gap: number = 60;         //每条信息之间的间隔
    private w: number = 580;

    public constructor() {
        this.msgList = [];
        this.groPool = [];
        this.playingGro = [];
        this.groBg = new eui.Image();
        this.groBg.touchEnabled = false;
        this.groBg.source = RES_DIR_IMAGES + "groBg.png";
        //this.groBg.width = App.StageUtils.getWidth();
        this.w = App.StageUtils.getWidth();
    }

    private createGroBg(state, txt, color = 0xFFDE01): BarrageTipsGro {
        let gro: BarrageTipsGro = this.groPool.shift();
        if (gro == null) {
            gro = new BarrageTipsGro();
            gro.touchEnabled = gro.touchChildren = false;
            gro.y = 295;
        }
        gro.currentState = state;
        gro.text = txt;
        gro.textColor = color;
        gro.name = "0";//用来标志滚动状态
        return gro;
    }

    public push(msg, playNow?: boolean): void {
        if (playNow) {
            this.msgList.unshift(msg);
            this.stopAll();
            this.playNext();
            return;
        }
        this.msgList.push(msg);
        this.playNext();
    }

    private stopAll(): void {
        for (let gro of this.playingGro) {
            App.DisplayUtils.removeFromParent(gro);
            this.groPool.push(gro);
            egret.Tween.removeTweens(gro);
        }
        this.playingGro = [];
        this.stopPlay();
    }

    private startPlay(): void {
        if (this.playing) {
            return;
        }
        this.playing = true;
        this.showBg();
    }

    private stopPlay(): void {
        if (!this.playing) {
            return;
        }
        this.playing = false;
        this.hideBg();
    }

    private complete1(gro: BarrageTipsGro): void {
        gro.name = "1";
        this.playNext();
    }

    private complete2(gro: BarrageTipsGro): void {
        let i: number = this.playingGro.indexOf(gro);
        if (i >= 0) {
            this.playingGro.splice(i, 1);
        }
        App.DisplayUtils.removeFromParent(gro);
        this.groPool.push(gro);
        if (this.playingGro.length <= 0) {
            this.stopPlay();
        }
    }

    private playNext(): void {
        if (!this.getCanPlayNow()) {
            return;
        }
        let txt = this.msgList.shift();
        if (!txt) {
            return;
        }
        let state, text, color;
        if (txt.indexOf("$$") != -1) {
            let a = txt.split("$$");
            if (a[0] == "99") {
                return;
            } else {
                state = a[0];
                text = a[1];
            }
        } else {
            state = "0";
            text = txt;
            color = 0xE6DAAC;
        }
        this.w = App.StageUtils.getWidth();
        this.startPlay();
        let gro = this.createGroBg(state, text, color);
        gro.x = App.stage.stageWidth;
        this.playingGro.push(gro);
        LayerManager.UI_Message.addChild(gro);

        let tx = this.w - gro.width - this.gap;
        let t1 = (gro.x - tx) * 9;
        let t2 = (this.w - this.gap) * 9;
        egret.Tween.get(gro).to({ x: tx }, t1).call(this.complete1, this, [gro]).
            to({ x: -gro.width }, t2).call(this.complete2, this, [gro]);
    }

    private getCanPlayNow(): boolean {
        let i: number = 0;
        let a: number = this.playingGro.length;
        if (a == 0) {
            return true;
        }
        let gro: BarrageTipsGro = this.playingGro[a - 1];
        return gro.name == "1";
    }

    private showBg(): void {
        let bg = this.groBg;
        //bg.horizontalCenter = 0;
        bg.height = 36;
        bg.width = App.stage.stageWidth;
        bg.y = 295 - 8;
        LayerManager.UI_Message.addChild(bg);
        egret.Tween.removeTweens(bg);
        bg.alpha = 0;
        egret.Tween.get(bg).to({ alpha: 1 }, 500);
    }
    private hideBg(): void {
        let bg = this.groBg;
        if (!bg.parent) {
            return;
        }
        egret.Tween.removeTweens(bg);
        egret.Tween.get(bg).to({ alpha: 0 }, 500).call(App.DisplayUtils.removeFromParent, null, [bg]);
    }
}