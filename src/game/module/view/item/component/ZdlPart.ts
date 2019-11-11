/**
 * create by junwei on 07/03/2019
 * 战斗力模块
 */
class ZdlPart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "ZdlPartSkin";
    }

    public zdl: NumberMC;
    // public title: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.zdl.type = "itemtips_json.itemtips_";
        this.zdl.gap = 16;
        this.zdl.alignV = "mid";
        // this.title.text = Language.lang.zdltitle;
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data["length"])
            this.setData();
    }

    public dispose(): void {
        super.dispose();
    }

    private setData(): void {
        let value = ItemUtils.getZdlByProp(this.data) + "";
        // let str = value.split("").reverse().join("");
        // let nValue = "";
        // for (let i = 0; i < str.length; i++) {
        //     nValue += str[i];
        //     if ((i + 1) % 3 == 0 && (i + 1) != str.length) {
        //         nValue += "d"
        //     }
        // }
        // nValue = nValue.split("").reverse().join("");
        this.zdl.value = value;
    }

}