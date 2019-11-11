/*
 * @Description: 宝石背包
 * @Author: xiejunwei
 * @Date: 2019-09-11 14:42:21
 */
class JewelBag extends BaseSpriteView {

    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "JewelBagSkin";
    }

    public itemList: eui.List;
    public iG: eui.Group;
    public i2: eui.Image;
    public i3: eui.Image;
    public i4: eui.Image;
    public i5: eui.Image;
    public cost: ItemExpend;
    public cg: eui.Group;
    public check_2: eui.CheckBox;
    public check_3: eui.CheckBox;
    public check_4: eui.CheckBox;
    public check_5: eui.CheckBox;
    public btn_0: eui.Button;


    public init(): void {
        super.init();
        this.itemList.itemRenderer = JewelBagItem;
    }

    public open(param: ViewProp): void {
        super.open();
        this.message(MsgConst.JEWEL_BAG, this.initBagList);

        this.addTouchEvent(this.iG, this.onGroupTouche);
        this.addTouchEvent(this.cg, this.checkBoxFunc);
        this.addTouchEvent(this.btn_0, this.btnFunc);
        this.addTouchEvent(this.itemList, this.stuffPrint);

        this.cost.label = Language.lang.jewel_1;

        this.initBagList();
    }

    public close(param: ViewProp): void {
        super.close();
        this.setListData(this.itemList, []);
        this.check_2.selected = this.check_3.selected = this.check_4.selected = this.check_5.selected = false;
    }

    private initBagList(): void {
        let bag = GameCache.jewel.jewelBag;
        let itemObj = {};
        let itemArr = [];
        for (let type in bag) {
            for (let color in bag[type]) {
                if (!itemObj[color]) itemObj[color] = [];
                itemObj[color] = itemObj[color].concat(bag[type][color]);
            }
        }
        for (let i in itemObj) {
            itemArr = itemArr.concat(itemObj[i]);
        }
        for (let i = 0; i < itemArr.length; i++) {
            itemArr[i] = {
                id: itemArr[i],
            }
        }
        itemArr = itemArr.reverse();
        this.setListData(this.itemList, itemArr);
        this.cost.visible = false;
    }

    private onGroupTouche(e: egret.TouchEvent): void {
        let tar = e.target.name;
        (this[`check_${tar}`] as eui.CheckBox).selected = !(this[`check_${tar}`] as eui.CheckBox).selected;
        this.checkBoxFunc(parseInt(tar));
    }

    private checkBoxFunc(e): void {
        let seleColor;
        if (typeof (e) == "number") {
            seleColor = e;
        } else if (e instanceof egret.TouchEvent) {
            seleColor = parseInt(e.target.name);
        }
        let source = (this.itemList.dataProvider as eui.ArrayCollection).source;
        for (let i = 0; i < source.length; i++) {
            let item = (this.itemList.getElementAt(i) as JewelBagItem) || (this.itemList.getVirtualElementAt(i) as JewelBagItem);
            let color = item._itemData.showQuality;
            if (color != seleColor) continue;
            source[i]["checkSele"] = (this[`check_${seleColor}`] as eui.CheckBox).selected;
        }
        (this.itemList.dataProvider as eui.ArrayCollection).replaceAll(source);
        // for (let i = 0; i < this.itemList.numElements; i++) {
        //     let item = (this.itemList.getElementAt(i) as JewelBagItem) || (this.itemList.getVirtualElementAt(i) as JewelBagItem);
        //     let color = item._itemData.showQuality;
        //     if (color != seleColor) continue;
        //     item.checkBox.selected = (this[`check_${seleColor}`] as eui.CheckBox).selected;
        // }
        this.stuffPrint();
    }

    private btnFunc(): void {
        let arr = [];
        for (let i = 0; i < this.itemList.numElements; i++) {
            let item = (this.itemList.getElementAt(i) as JewelBagItem) || (this.itemList.getVirtualElementAt(i) as JewelBagItem);
            if (item.checkBox.selected) {
                arr.push(item._itemData.id);
            }
        }
        Proxy.jewel.sendDecomposition(arr);
    }

    private stuffPrint(): void {
        let stuff;
        for (let i = 0; i < this.itemList.numElements; i++) {
            let item = (this.itemList.getElementAt(i) as JewelBagItem) || (this.itemList.getVirtualElementAt(i) as JewelBagItem);
            if (item.checkBox.selected) {
                let gem = GameConfig.jewel[item._itemData.id];
                if (!stuff) {
                    stuff = [gem.resolve[0].id, gem.resolve[0].count];
                } else {
                    stuff[1] += gem.resolve[0].count;
                }
            }
        }
        if (stuff) {
            this.cost.visible = true;
            this.cost.setData(stuff[0], stuff[1]);
        } else {
            this.cost.visible = false
        }
    }

}