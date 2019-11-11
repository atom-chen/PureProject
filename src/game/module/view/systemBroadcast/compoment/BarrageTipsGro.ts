/**
 * create by junwei on 06/21/2019
 * 跑马灯条目
 */
class BarrageTipsGro extends eui.Component {
    private content: eui.Label;

    public constructor() {
        super();
        this.skinName = "BarrageTipsSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        //this.content.touchEnabled = true;
        //this.content.addEventListener(egret.TextEvent.LINK, this.onLink, this);
    }

    public set text(value: string) {
        this.content.textFlow = TextFlowUtils.generateTextFlow(value);
    }

    public set textColor(value: number) {
        this.content.textColor = value;
    }

    public dispose(): void {
        this.content.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    }

    private onLink(e: egret.TextEvent): void {
        //超文本链接
        TextFlowUtils.hrefType(e.text);
    }
}