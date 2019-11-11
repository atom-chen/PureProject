/*
 * @Description: 翅膀技能条目
 * @Author: xiejunwei
 * @Date: 2019-08-19 19:09:26
 * @LastEditTime: 2019-10-30 14:13:24
 */
class WingSkillItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public skillIcon: eui.Image;
    public condi: eui.Label;

    private skillId: number;
    private _zdl: number = 0;
    private lvl: number = 0;

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

    public initData(conf, lvl): void {
        this.skillIcon.source = "wing_json.wing_skill_" + conf.img + "_png";
        this.lvl = lvl;
        this.skillId = conf.id;
        let open = lvl >= conf.id;
        this.condi.text = open ? conf.name : StringUtils.substitute(Language.lang.openTxt, conf.id);
        if (!open && !this.filters) {
            this.filters = FilterUtils.DefaultGrayFilters;
        }
        if (open) {
            this.filters = null;
            this._zdl = ItemUtils.getZdlByProp(conf.att);
        }
    }

    public get zdl() {
        return this._zdl;
    }

    private openTips(): void {
        let view = new ViewProp();
        view.exData1 = this.skillId;
        view.exData2 = this.lvl;
        App.ViewManager.open(ViewConst.WINGSKILL, view);
    }
}
