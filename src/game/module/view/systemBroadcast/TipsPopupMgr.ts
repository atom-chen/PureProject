/**
 * create by junwei on 06/21/2019
 * 弹出提示
 */
class TipsPopupMgr extends egret.HashObject {
    public tipsShowList: any[];
    private msgList: string[];
    private isDelay: boolean = false;

    public constructor() {
        super();
        this.tipsShowList = [];
        this.msgList = [];
    }

    public pushStr(str: string) {
        this.msgList.push(str);
        //this.doTips(str);
        if (!this.isDelay) {
            this.isDelay = true;
            App.TimerManager.addDelay(100, 1, 1, this.doTips, this);
        }
    }

    private doTips(): void {
        for (let i: number = 0; i < this.tipsShowList.length; i++) {
            let tar: CenterTipsItem = this.tipsShowList[i];
            App.DisplayUtils.removeFromParent(tar);
            egret.Tween.removeTweens(tar);
            tar.alpha = 1;
            ObjectPool.push(tar);
        }
        this.tipsShowList.length = 0;

        this.isDelay = false;
        let i: number = 0;
        let a: number = this.msgList.length;
        if (a > 6) {
            i = a - 6;
        }
        for (; i < a; i++) {
            let str = this.msgList[i];
            let item: CenterTipsItem = ObjectPool.get(CenterTipsItem);
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

    }

    private resetPosition(): void {
        let my: number = App.StageUtils.getHeight() >> 1;
        let len: number = this.tipsShowList.length;
        let top: number = my - (len < 10 ? 10 : len) * 28;
        let item: CenterTipsItem;
        for (let i: number = 0; i < len; i++) {
            item = this.tipsShowList[i];
            egret.Tween.removeTweens(item);
            egret.Tween.get(item).to({ y: top + i * 28 }, 800);
        }
    }

    private checkClear(): void {
        if (!this.tipsShowList.length) {
            App.TimerManager.remove(this.checkClear, this);
            return;
        }
        let time: number = App.TimerManager.getSyncTime();
        for (let i: number = 0; i < this.tipsShowList.length; i++) {
            let tar: CenterTipsItem = this.tipsShowList[i];
            if (tar.time <= time) {
                if (tar.alpha > 0) {
                    tar.alpha = tar.alpha - 0.1;
                } else {
                    App.DisplayUtils.removeFromParent(tar);
                    egret.Tween.removeTweens(tar);
                    tar.alpha = 1;
                    this.tipsShowList.splice(i, 1);
                    i--;
                    ObjectPool.push(tar);
                }
            }
        }
    }
}