/**
 * create by junwei on 07/17/2019
 * 使用条件模块
 */
class DetailPart extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "DetailPartSkin";
    }

    public detailG: eui.Group;
    public dLab: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.length) return
        this.initData();
    }

    public dispose(): void {
        this.dLab.text = "";
        super.dispose();
    }

    private initData(): void {
        let data = this.data;
        this.dLab.text = "";
        let str = "";
        for (let i = 0; i < data.length; i++) {
            let condi = data[i];
            let detailLabel: eui.Label = ObjectPool.get(eui.Label);
            detailLabel.size = 18;
            if (condi.cond == StdItemCondition.ucJob) {
                str += StringUtils.substitute(Language.lang.mainJob, ItemUtils.getJobString(condi.value), "c0xffffff", "c0xffffff") + "\n";
            } else if (condi.cond == StdItemCondition.ucLevel) {
                str += StringUtils.substitute(Language.lang.mainLvl, condi.value, "c0xffffff", "c0xffffff") + "\n";
            } else if (condi.cond == StdItemCondition.part) {
                str += StringUtils.substitute(Language.lang.mainPart, Language.lang.part[condi.value], "c0xffffff", "c0xffffff") + "\n";
            } else if (condi.cond == StdItemCondition.fashionPart) {
                str += StringUtils.substitute(Language.lang.mainPart, Language.lang.fashionPart[condi.value], "c0xffffff", "c0xffffff") + "\n";
            }
        }
        this.dLab.textFlow = TextFlowUtils.generateTextFlow(str);
    }

    private addEquipPart(part: number): void {
        let detailLabel: eui.Label = ObjectPool.get(eui.Label);
        detailLabel.size = 18;
    }

    /**
     * 设置道具详细信息
     * @param  {{type:number} itemDtl
     * @param  {number}} num
     */
    public setItemDetail(itemDtl: { type: number, num: number }) {
        if (!itemDtl) {
            return;
        }
        // this.detailG.removeChildren();
        // let detailLabel: eui.Label = ObjectPool.get(eui.Label);
        // detailLabel.size = 18;
        let str = this.dLab.text;
        str = StringUtils.substitute(Language.lang.itemType, "c0xffffff", "c0xffffff") + "\n";
        // detailLabel.textFlow = TextFlowUtils.generateTextFlow(str);
        // this.detailG.addChild(detailLabel);

        // let detailLabel2: eui.Label = ObjectPool.get(eui.Label);
        // detailLabel2.size = 18;
        str += StringUtils.substitute(Language.lang.itemNum, itemDtl.num, "c0xffffff", "c0xffffff");
        // detailLabel2.textFlow = TextFlowUtils.generateTextFlow(str);
        // this.detailG.addChild(detailLabel2);
        this.dLab.textFlow = TextFlowUtils.generateTextFlow(str);
    }

}