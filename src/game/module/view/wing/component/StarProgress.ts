/*
 * @Description: 星型进度条
 * @Author: xiejunwei
 * @Date: 2019-08-15 16:20:53
 * @LastEditTime: 2019-08-15 19:12:03
 */
class StarProgress extends BaseCustComponent {
    public constructor() {
        super();
    }

    public itemList: eui.List;
    public _maximum = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.itemList.itemRenderer = StarItem;
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    private datatGroup: eui.ArrayCollection;
    public setData(val, val2) {
        let arr = [];
        arr.length = val;
        this._maximum = val;
        if (!this.datatGroup) {
            this.datatGroup = new eui.ArrayCollection(arr);
            this.itemList.dataProvider = this.datatGroup;
        } else {
            if (val != this._maximum) {
                this.datatGroup.source = arr;
                this.itemList.dataProviderRefreshed();
            }
        }
        App.TimerManager.addDelay(50, 50, 1, this.value, this, null, null, val2);
    }

    public value(val) {
        for (let i = 0; i < this.itemList.numChildren; i++) {
            let item = this.itemList.getChildAt(i);
            item["currentState"] = i <= (val - 1) ? "on" : "off";
        }
    }

}