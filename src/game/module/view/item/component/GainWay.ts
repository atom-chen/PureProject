/**
 * create by junwei on 07/02/2019
 * 物品获取途径模块
 */
class GainWay extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "GainWaySkin";
    }

    public wG: eui.Group;
    public wTxt: eui.Label;
    public title: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addEvent(egret.TextEvent.LINK, this.wTxt, this.onLink);
        this.title.text = Language.lang.getway;
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data || !this.data["length"]) {
            this.wTxt.text = "";
        } else {
            this.setData();
        }
    }

    public dispose(): void {
        this.wTxt.text = "";
        super.dispose();
    }

    private setData(): void {
        let data = this.data;
        let str = "";
        let count = 1;
        for (let i of data) {
            if (count % 3 == 0) {
                str += i.value + "\n";
            } else {
                str += i.value + "      ";
            }
            count++;
        }
        this.wTxt.textFlow = TextFlowUtils.generateTextFlow(str);
    }

    private onLink(e: egret.TextEvent): void {
        let arr = e.text.split("_");
        let text = arr[0] + ":" + arr[1];
        TextFlowUtils.hrefType(text);
        App.ViewManager.close(ViewConst.ITEMTIPS);
    }

}