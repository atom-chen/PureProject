var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * create by junwei on 06/21/2019
 * 跑马灯
 */
var BarrageTips = (function () {
    function BarrageTips() {
        this.gap = 60; //每条信息之间的间隔
        this.w = 580;
        this.msgList = [];
        this.groPool = [];
        this.playingGro = [];
        this.groBg = new eui.Image();
        this.groBg.touchEnabled = false;
        this.groBg.source = RES_DIR_IMAGES + "groBg.png";
        //this.groBg.width = App.StageUtils.getWidth();
        this.w = App.StageUtils.getWidth();
    }
    BarrageTips.prototype.createGroBg = function (state, txt, color) {
        if (color === void 0) { color = 0xFFDE01; }
        var gro = this.groPool.shift();
        if (gro == null) {
            gro = new BarrageTipsGro();
            gro.touchEnabled = gro.touchChildren = false;
            gro.y = 295;
        }
        gro.currentState = state;
        gro.text = txt;
        gro.textColor = color;
        gro.name = "0"; //用来标志滚动状态
        return gro;
    };
    BarrageTips.prototype.push = function (msg, playNow) {
        if (playNow) {
            this.msgList.unshift(msg);
            this.stopAll();
            this.playNext();
            return;
        }
        this.msgList.push(msg);
        this.playNext();
    };
    BarrageTips.prototype.stopAll = function () {
        for (var _i = 0, _a = this.playingGro; _i < _a.length; _i++) {
            var gro = _a[_i];
            App.DisplayUtils.removeFromParent(gro);
            this.groPool.push(gro);
            egret.Tween.removeTweens(gro);
        }
        this.playingGro = [];
        this.stopPlay();
    };
    BarrageTips.prototype.startPlay = function () {
        if (this.playing) {
            return;
        }
        this.playing = true;
        this.showBg();
    };
    BarrageTips.prototype.stopPlay = function () {
        if (!this.playing) {
            return;
        }
        this.playing = false;
        this.hideBg();
    };
    BarrageTips.prototype.complete1 = function (gro) {
        gro.name = "1";
        this.playNext();
    };
    BarrageTips.prototype.complete2 = function (gro) {
        var i = this.playingGro.indexOf(gro);
        if (i >= 0) {
            this.playingGro.splice(i, 1);
        }
        App.DisplayUtils.removeFromParent(gro);
        this.groPool.push(gro);
        if (this.playingGro.length <= 0) {
            this.stopPlay();
        }
    };
    BarrageTips.prototype.playNext = function () {
        if (!this.getCanPlayNow()) {
            return;
        }
        var txt = this.msgList.shift();
        if (!txt) {
            return;
        }
        var state, text, color;
        if (txt.indexOf("$$") != -1) {
            var a = txt.split("$$");
            if (a[0] == "99") {
                return;
            }
            else {
                state = a[0];
                text = a[1];
            }
        }
        else {
            state = "0";
            text = txt;
            color = 0xE6DAAC;
        }
        this.w = App.StageUtils.getWidth();
        this.startPlay();
        var gro = this.createGroBg(state, text, color);
        gro.x = App.stage.stageWidth;
        this.playingGro.push(gro);
        LayerManager.UI_Message.addChild(gro);
        var tx = this.w - gro.width - this.gap;
        var t1 = (gro.x - tx) * 9;
        var t2 = (this.w - this.gap) * 9;
        egret.Tween.get(gro).to({ x: tx }, t1).call(this.complete1, this, [gro]).
            to({ x: -gro.width }, t2).call(this.complete2, this, [gro]);
    };
    BarrageTips.prototype.getCanPlayNow = function () {
        var i = 0;
        var a = this.playingGro.length;
        if (a == 0) {
            return true;
        }
        var gro = this.playingGro[a - 1];
        return gro.name == "1";
    };
    BarrageTips.prototype.showBg = function () {
        var bg = this.groBg;
        //bg.horizontalCenter = 0;
        bg.height = 36;
        bg.width = App.stage.stageWidth;
        bg.y = 295 - 8;
        LayerManager.UI_Message.addChild(bg);
        egret.Tween.removeTweens(bg);
        bg.alpha = 0;
        egret.Tween.get(bg).to({ alpha: 1 }, 500);
    };
    BarrageTips.prototype.hideBg = function () {
        var bg = this.groBg;
        if (!bg.parent) {
            return;
        }
        egret.Tween.removeTweens(bg);
        egret.Tween.get(bg).to({ alpha: 0 }, 500).call(App.DisplayUtils.removeFromParent, null, [bg]);
    };
    return BarrageTips;
}());
__reflect(BarrageTips.prototype, "BarrageTips");
//# sourceMappingURL=BarrageTips.js.map