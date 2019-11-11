/**
 * create by junwei on 07/03/2019
 * 属性模块
 */

class PropPartResonate extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PropPartResonateSkin";
    }

    public title: eui.Label;
    public imgTag: eui.Image;
    public pG: eui.Group;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
        for (let item of this.pG.$children) {
            App.DisplayUtils.removeFromParent(item);
            ObjectPool.push(item);
        }
    }

    /**
     * @param propList 属性 color1为属性文字颜色 color2 满足条件颜色 color3 不满足颜色 , str为长度2的字符串数组，用作分割符
     */
    public setData(title: string, propList: string[]): void {
        this.pG.removeChildren();
        this.title.textFlow = TextFlowUtils.generateTextFlow(title);
        for (let prop of propList) {
            let lab: eui.Label = ObjectPool.get(eui.Label);
            lab.maxWidth = 318;
            lab.size = 16;
            lab.textFlow = TextFlowUtils.generateTextFlow(prop);
            this.pG.addChild(lab);
        }
    }

}