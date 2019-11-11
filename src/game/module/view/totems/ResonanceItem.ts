/*
 * @Description: 共鸣条目
 * @Author: xiejunwei
 * @Date: 2019-08-27 14:33:30
 * @LastEditTime: 2019-10-24 13:58:26
 */
class ResonanceItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public upBtn: eui.Button;
    public skillName: eui.Label;
    public desc: eui.Label;
    public unacti: eui.Image;


    protected childrenCreated(): void {
        super.childrenCreated();
        this.addTouchEvent(this.upBtn, this.upGradeFunc);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data) return;
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let id = this.data;
        let tlvl = GameCache.totems.resonanceData[id] ? GameCache.totems.resonanceData[id] : 0;
        let conf = GameConfig.resonance[id][tlvl];
        this.skillName.text = StringUtils.substitute(Language.lang.resonanSkillName,conf.skillName,tlvl);
        this.desc.textFlow = TextFlowUtils.generateTextFlow(conf.desc);
        let totemsData = GameCache.totems.totemsData[conf.number[0]];
        let minLvl = totemsData ? totemsData.jie : 0;
        let acti: boolean = true;
        for (let i = 0; i < conf.number.length; i++) {
            let type = conf.number[i];
            (this[`item_${i}`] as TotemsItem).data = type;
            let td = GameCache.totems.totemsData[type];
            let lvl = td ? td.jie : 0;
            if (!td || td.id == 1) acti = false; // 存在图腾未激活
            minLvl = minLvl > lvl ? lvl : minLvl;
        }
        this.upBtn.icon = tlvl > 0 ? "res/btn/promote_2.png" : "res/btn/activate_1.png";
        this.upBtn.visible = acti && (minLvl >= conf.classLvl || conf.classLvl == 0);
        this.unacti.visible = !acti;
    }

    private upGradeFunc(): void {
        let id = this.data;
        if (typeof (id) == "string") id = parseInt(id);
        Proxy.totems.sendResonanceUpGrade(id);
    }

}