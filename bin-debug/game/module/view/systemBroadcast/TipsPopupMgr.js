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
/**
 * create by junwei on 06/21/2019
 * 弹出提示
 */
var TipsPopupMgr = (function (_super) {
    __extends(TipsPopupMgr, _super);
    function TipsPopupMgr() {
        var _this = _super.call(this) || this;
        _this.isDelay = false;
        _this.tipsShowList = [];
        _this.msgList = [];
        return _this;
    }
    TipsPopupMgr.prototype.pushStr = function (str) {
        this.msgList.push(str);
        //this.doTips(str);
        if (!this.isDelay) {
            this.isDelay = true;
            App.TimerManager.addDelay(100, 1, 1, this.doTips, this);
        }
    };
    TipsPopupMgr.prototype.doTips = function () {
        for (var i_1 = 0; i_1 < this.tipsShowList.length; i_1++) {
            var tar = this.tipsShowList[i_1];
            App.DisplayUtils.removeFromParent(tar);
            egret.Tween.removeTweens(tar);
            tar.alpha = 1;
            ObjectPool.push(tar);
        }
        this.tipsShowList.length = 0;
        this.isDelay = false;
        var i = 0;
        var a = this.msgList.length;
        if (a > 6) {
            i = a - 6;
        }
        for (; i < a; i++) {
            var str = this.msgList[i];
            var item = ObjectPool.get(CenterTipsItem);
            item.text = str;
            item.x = (App.StageUtils.getWidth()) >> 1;
            item.y = (App.StageUtils.getHeight() >> 1) - 100;
            item.time = App.TimerManager.getSyncTime() + 2000;
            LayerManager.UI_Message.addChild(item);
            this.tipsShowList.push(item);
            if (this.tipsShowList.length == 1)
                App.TimerManager.add(50, this.checkClear, this);
        }
        this.resetPosition();
        this.msgList.length = 0;
    };
    TipsPopupMgr.prototype.resetPosition = function () {
        var my = App.StageUtils.getHeight() >> 1;
        var len = this.tipsShowList.length;
        var top = my - (len < 10 ? 10 : len) * 28;
        var item;
        for (var i = 0; i < len; i++) {
            item = this.tipsShowList[i];
            egret.Tween.removeTweens(item);
            egret.Tween.get(item).to({ y: top + i * 28 }, 800);
        }
    };
    TipsPopupMgr.prototype.checkClear = function () {
        if (!this.tipsShowList.length) {
            App.TimerManager.remove(this.checkClear, this);
            return;
        }
        var time = App.TimerManager.getSyncTime();
        for (var i = 0; i < this.tipsShowList.length; i++) {
            var tar = this.tipsShowList[i];
            if (tar.time <= time) {
                if (tar.alpha > 0) {
                    tar.alpha = tar.alpha - 0.1;
                }
                else {
                    App.DisplayUtils.removeFromParent(tar);
                    egret.Tween.removeTweens(tar);
                    tar.alpha = 1;
                    this.tipsShowList.splice(i, 1);
                    i--;
                    ObjectPool.push(tar);
                }
            }
        }
    };
    return TipsPopupMgr;
}(egret.HashObject));
__reflect(TipsPopupMgr.prototype, "TipsPopupMgr");
//# sourceMappingURL=TipsPopupMgr.js.map