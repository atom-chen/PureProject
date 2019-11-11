/**
 * create by junwei on 07/25/2019
 * 玩法说明TIPS
 */
class InstructionTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "InstructionTipsSkin";
    }

    public title: eui.Image;
    public desc: eui.Label;

    protected init(): void {

    }

    public open(param: ViewProp): void {
        this.title.source = param.exData1;
        this.desc.textFlow = TextFlowUtils.generateTextFlow(param.exData2);
    }


}