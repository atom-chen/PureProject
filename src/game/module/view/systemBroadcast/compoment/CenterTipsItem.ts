/**
 * create by junwei on 04/21/2019
 * 中央提示条目
 */
class CenterTipsItem extends egret.DisplayObjectContainer {
    // private bg: egret.Bitmap;
    private decsTxt: egret.TextField;

    public time: number;

    public constructor() {
        super();

        // this.bg = new egret.Bitmap();
        // this.bg.texture = RES.getRes("zjm_json.zjm_name_bg_png");
        // this.bg.scale9Grid = new egret.Rectangle(46, 11, 30, 2);

        this.decsTxt = App.DisplayUtils.newTextField("", 84, 4, 0xF9D72A, "left", 18);
        this.decsTxt.stroke = 1;
        this.decsTxt.strokeColor = 0x000000;
        this.decsTxt.lineSpacing = 5;

        // this.addChild(this.bg);
        this.addChild(this.decsTxt);

        this.touchEnabled = this.touchChildren = false;
    }

    public set text(str: string) {
        this.decsTxt.textFlow = TextFlowUtils.generateTextFlow(str);
        let w: number = this.decsTxt.width;
        if (w < 126) {
            w = 126;
        }
        this.decsTxt.x = (- this.decsTxt.width) >> 1;
        // this.width = this.bg.width;
        this.width = this.decsTxt.textWidth;
    }
}