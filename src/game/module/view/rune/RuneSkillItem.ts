/*
 * @Description: 符碑技能条目
 * @Author: xiejunwei
 * @Date: 2019-09-16 18:59:06
 */
class RuneSkillItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public sIcon: eui.Image;
    public sName: eui.Image;
    public condi: eui.Label;

    private _zdl: number = 0;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.sIcon, this.openTips);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.skillId) return;
        this.judgeState();
    }

    public dispose(): void {
        super.dispose();
    }

    public judgeState(): void {
        let conf: StdRuneskill = GameConfig.runeSkill[this.data.roleIdx + 1][this.data.skillId];
        if (!conf) return;
        this.sIcon.source = "rune_json.rune_skill_ico_" + this.data.job + "_" + conf.img + "_png";
        if (conf.conds > this.data.jLvl) {
            this.sIcon.filters = FilterUtils.DefaultGrayFilters;
            this.sName.filters = FilterUtils.DefaultGrayFilters;
            this.condi.text = StringUtils.substitute(Language.lang.openTxt, conf.conds);
        } else {
            this.sIcon.filters = null;
            this.sName.filters = null;
            this._zdl = ItemUtils.getZdlByProp(conf.attrs);
            this.condi.text = "";
        }
    }

    private openTips(): void {
        let view = new ViewProp();
        view.exData1 = [this.data.skillId, this.data.roleIdx];
        view.exData2 = this.data.jLvl;
        view.firData = this.data.job;
        App.ViewManager.open(ViewConst.RUNESKILL, view);
    }

    public get zdl() {
        return this._zdl;
    }
}