/**
 * create by junwei on 06/26/2019
 * 技能窗口
 */
class SkillWin extends BaseEuiWindow {
    public constructor() {
        super();
        this.skinName = "SkillWinSkin";
    }

    public itemList: eui.List;

    protected initUI(): void {
        super.init();
        
    }

    public open(param: ViewProp): void {
        this.itemList.itemRenderer = SkillItem;
        let conf = GameConfig.skill;
        let skillArr: any[] = [];
        for (let i in conf) {
            let item = {
                id: conf[i].id,
                sId1: conf[i].skilleff1,
                sId2: conf[i].skilleff2,
                name: conf[i].name,
                desc:conf[i].desc
            }
            skillArr.push(item);
        }
        this.setListData(this.itemList, skillArr);
    }


}