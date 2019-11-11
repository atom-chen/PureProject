/**
 * create by junwei on 07/25/2019
 * 玩法说明
 */
class InstructionPart extends BaseCustComponent {
    public constructor() {
        super();
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this, this.openTips);
    }

    protected dataChanged(): void {
        super.dataChanged();
    }

    public dispose(): void {
        super.dispose();
    }

    private openTips(): void {
        let conf = GameConfig.instruction[this.name];
        if (!conf) {
            GlobalFun.SysMsg("玩法配置ID" + this.name + "错误");
            return;
        }
        let viewprop = new ViewProp();
        viewprop.exData1 = RES_DIR_INSTRUCTION_TITTLE + (conf.icon || 1) + ".png";
        viewprop.exData2 = conf.dec;
        App.ViewManager.open(ViewConst.INSTRUCTION, viewprop);
    }

}