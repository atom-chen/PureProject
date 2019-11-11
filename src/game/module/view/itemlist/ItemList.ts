/**
 * create by junwei on 06/25/2019
 * 物品列表
 */

class ItemList extends BaseClass {
    public constructor() {
        super();
    }

    public iG: eui.Group;

    public itemArr: ItemBase[] = [];

    public setData(obj: any[] = [], group: eui.Group): void {
        if (obj.length == 0) return;
        let count = 0;
        let i = 0;
        let len = obj.length;
        for (; i < len; i++) {
            let item: ItemBase;
            let award = obj[i];
            if (award["job"] && award["job"] != GameCache.hero.mainPro.job) {
                continue;
            }
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            } else {
                item = ObjectPool.get(ItemBase);
                this.itemArr.push(item);
                item && group.addChild(item);
            }
            item.skinName = "ItembaseSkin";
            item.data = obj[i];
            count++;
        }
        //多余条目回收
        let mark = count;
        while (count < this.itemArr.length) {
            this.itemArr[count].reSet();
            App.DisplayUtils.removeFromParent(this.itemArr[count]);
            ObjectPool.push(this.itemArr[count]);
            count++;
        }
        if (mark < this.itemArr.length) this.itemArr = this.itemArr.slice(0, mark);
    }


    public dispose(): void {
        if (this.itemArr) {
            for (let i of this.itemArr) {
                i.reSet();
                ObjectPool.push(i);
                App.DisplayUtils.removeFromParent(i);
            }
        }
        this.itemArr = [];
    }
}