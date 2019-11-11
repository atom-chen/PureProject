/*
 * @Description: 炼狱共鸣属性
 * @Author: moyusheng
 * @Date: 2019-10-16 13:45:02
 */
class PurgatoryResonateProp extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "PurgatoryResonatePropSkin";
    }

    public title: eui.Image;
    public pG: eui.Group;

    protected init(): void {

    }

    public open(param: ViewProp): void {
        super.open();
        this.pG.removeChildren();
        if (param) {
            this.title.source = param.winTitle;
            if (param.firData instanceof Array) {
                for (let item of param.firData) {
                    this.pG.addChild(item);
                }
            }
        }
    }

    public dispose(): void {
        super.dispose();
        for (let item of this.pG.$children) {
            App.DisplayUtils.removeFromParent(item);
            (item as BaseCustComponent).dispose();
            ObjectPool.push(item);
        }
    }

    public close(): void {
        super.close();
        this.dispose();
    }
}