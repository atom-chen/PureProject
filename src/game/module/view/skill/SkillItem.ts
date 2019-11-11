/**
 * create by junwei on 06/25/2019
 * 技能条目
 */
class SkillItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sName: eui.Label;
    public des: eui.Label;
    public eBtn: eui.Button;

    private sId1: number;
    private sId2: number;

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.addTouchEvent(this.eBtn, this.editFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (this.data.id) {
            this.sName.text = this.data.name;
            this.des.textFlow = TextFlowUtils.generateTextFlow(this.data.desc);
        }
    }

    public dispose(): void {
        super.dispose();
    }

    private editFunc(): void {
        // DeBugMgr.skillEffEdit(this.data.id,this.data.sId1,this.data.sId2);
    }

}