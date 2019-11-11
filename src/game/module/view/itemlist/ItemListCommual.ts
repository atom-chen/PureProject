/*
 * @Description: 通用类型list
 * @Author: xiejunwei
 * @Date: 2019-10-28 11:34:22
 */

class ItemListCommual extends BaseClass {
    public constructor() {
        super();
    }

    public itemArr: any[] = [];

    public setData(arr: any[] = [], group: eui.Group, itemReneder, itemSkin?): void {
        if (!arr.length) return;
        let count = 0;
        let i = 0;
        let len = arr.length;
        for (; i < len; i++) {
            let item;
            let data = arr[i];
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            } else {
                item = ObjectPool.get(itemReneder);
                this.itemArr.push(item);
                item && group.addChild(item);
            }
            itemSkin && (item.skinName = itemSkin);
            item.data = data;
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
                ObjectPool.push(i);
                App.DisplayUtils.removeFromParent(i);
            }
        }
        this.itemArr = [];
    }
}