/**
 * 独白气泡
 */
class ThingBubbles extends egret.DisplayObjectContainer {
    private bg: egret.Bitmap;
    private decsTxt: egret.TextField;

    public constructor() {
        super();

        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("zjm_json.zjm_dhk_png");
        this.bg.scale9Grid = new egret.Rectangle(48, 7, 50, 30);
        this.addChild(this.bg);

        this.decsTxt = App.DisplayUtils.newTextField("", 10, 10, 0xe04902, "left", 16);
        // this.decsTxt.width = 200;
        this.decsTxt.lineSpacing = 5;
        this.addChild(this.decsTxt);

        //父类调成不可点击
        this.touchEnabled = this.touchChildren = false;
    }

    public setData(content: string, time: number = 10000): void {
        this.reset();
        this.decsTxt.textFlow = TextFlowUtils.generateTextFlow(content);
        this.decsTxt.width = 128;
        this.bg.width = this.decsTxt.width + 20;
        this.bg.height = this.decsTxt.height + 30;
        this.width = this.bg.width;
        this.height = this.bg.height;
        this.bg.y = - this.bg.height - 6;
        this.decsTxt.y = this.bg.y + 7;
        this.bg.x = -60;
        this.decsTxt.x = -50
        if (time) {
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 200).wait(time).to({ alpha: 0 }, 200).call(this.dispose, this);
        } else {
            this.alpha = 1;
        }
    }

    private reset(): void {
        this.bg.y = 0;
        this.bg.x = 0;
        this.decsTxt.y = 0;
        this.decsTxt.width = 128;
        egret.Tween.removeTweens(this);
    }

    private hasShow(): boolean {
        return this.parent ? true : false;
    }

    public dispose() {
        this.x = 0;
        this.y = 0;
        egret.Tween.removeTweens(this);
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    }
}