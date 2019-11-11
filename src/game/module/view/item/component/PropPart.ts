/**
 * create by junwei on 07/03/2019
 * 属性模块
 */

class PropPart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "PropPartSkin";
    }

    public pG: eui.Group;

    private _zdl: number = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data == null) {
            //清空数据
            // this.clean();
            this.recycle();
        } else {
            //插入数据
            // this.setData();
        }
    }

    public dispose(): void {
        this.recycle();
        super.dispose();
    }

    private itemArr: PropItem[] = [];
    /**
     * @param oldValue 旧属性 newValue 新属性 job职业过滤 color1为属性文字颜色 color2旧值颜色 color3新值颜色 , str为长度2的字符串数组，用作分割符
     */
    public setData(oldValue, newValue, job = 0, color1 = 0xffd369, color2 = 0xffffff, color3 = 0x019601, str: string[] = ["", "+"], skinName = "PropItemSkin"): void {
        let data = oldValue;
        let plus = newValue;
        let count = 0;
        let totalData = this.comparerProp(data, plus, color1, color2, color3, str);
        //let len = Object.keys(totalData).length;
        for (let i in totalData) {
            let item: PropItem;
            //if (this.jobFilter(job, totalData[i].type)) continue;
            if (this.itemArr[count]) {
                item = this.itemArr[count];
            } else {
                item = ObjectPool.get(PropItem);
                this.itemArr.push(item);
                this.pG.addChild(item);
            }
            item.skinName = skinName;
            item.data = totalData[i];
            count++;
        }
        //多余条目回收
        let mark = count;
        while (count < this.itemArr.length) {
            App.DisplayUtils.removeFromParent(this.itemArr[count]);
            ObjectPool.push(this.itemArr[count]);
            count++;
        }
        if (mark < this.itemArr.length) this.itemArr = this.itemArr.slice(0, mark);
        this._zdl = ItemUtils.getZdlByProp(oldValue);
    }

    //属性对比，并且合成
    private comparerProp(oData, nData, color1 = 0xffffff, color2 = 0xffffff, color3 = 0x019601, str) {
        let obj = {};
        for (let i in oData) {
            let item = {};
            let type = oData[i].type + "";
            item["type"] = oData[i].type;
            item["oldValue"] = oData[i].value;
            item["color"] = [color1, color2, color3];
            item["str"] = str;
            obj[type] = item;
        }
        for (let i in nData) {
            let type = nData[i].type + "";
            if (!obj[type]) {
                let item = {};
                item["type"] = nData[i].type;
                item["oldValue"] = 0;
                item["color"] = [color1, color2, color3];
                item["str"] = str;
                obj[type] = item;
            }
            obj[type]["newValue"] = nData[i].value;
        }
        return obj;
    }

    //过滤非该职业显示
    // private jobFilter(job, type): boolean {
    //     if (job == JobType.zhanshi || job == JobType.gongshou) {
    //         if (type == AttrBufId.MagicAttackMaxAdd) {
    //             return true;
    //         }
    //     } else if (job == JobType.fashi) {
    //         if (type == AttrBufId.PhysicalAttackMaxAdd) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // private clean(): void {
    //     if (this.itemArr) {
    //         for (let i of this.itemArr) {
    //             App.DisplayUtils.removeFromParent(i);
    //             ObjectPool.push(i);
    //             i = null;
    //         }
    //     }
    //     this.itemArr = [];
    // }

    private recycle(): void {
        if (this.itemArr) {
            for (let i of this.itemArr) {
                App.DisplayUtils.removeFromParent(i);
                ObjectPool.push(i);
                i = null;
            }
        }
        this.itemArr = [];
        this._zdl = 0;
    }

    /**设置属性排列方式
     * @param type:排列类型,hor为水平排列，ver为垂直排列;gap:为间隔;
     */
    public setSortType(type: string, gap?: number, tile?: any[]) {
        let layout;
        if (type == "ver") {
            layout = new eui.VerticalLayout();
            if (gap) layout.gap = gap;
        } else if (type == "hor") {
            layout = new eui.HorizontalLayout();
            if (gap) layout.gap = gap;
        }
        this.pG.layout = layout;
    }

    /**
     * 设置间隔
     */
    public setGap(val): void {
        if (this.pG.layout) {
            this.pG.layout['gap'] = val;
        }
    }

    /**获取中属性战力值 */
    public get zdl(): number {
        return this._zdl;
    }
}