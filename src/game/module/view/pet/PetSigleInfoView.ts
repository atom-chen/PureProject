/*
 * @Description: 单个宠物展示内容
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:41:28
 */


class PetSigleInfoView extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "PetSigleInfoViewSkin";
    }

    public mModel: UIAvatar;
    public lbName: eui.Label;
    public propList: PropPart;
    public skill0: eui.Image;
    public skill1: eui.Image;
    public skill2: eui.Image;
    public skill3: eui.Image;
    public gAct: eui.Group;
    public icon: ItemBase;
    public lbNe: eui.Label;
    public lbGo: eui.Label;
    public lbHave: eui.Label;
    public listStar: eui.List;

    public selectData: StdPet;/**当前宠物数据 */

    protected init(): void {
        super.init();
    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.lbGo, this.onclick)

        this.selectData = param.exData1;
        this.upCn();
    }

    /**更新内容 */
    public upCn() {
        if (!this.selectData) {
            return;
        }


        let petServer: PetItem = GameCache.pet.petArray[this.selectData.id]
        if (petServer) {
            this.currentState = "have"
        }
        else {
            this.currentState = "act"

            /**icon */
            if (this.selectData.activationNeed && this.selectData.activationNeed[0]) {
                this.icon.data = this.selectData.activationNeed[0];
                this.icon.initData();
                let id = this.selectData.activationNeed[0].id
                let count = this.selectData.activationNeed[0].count
                /**名字 */
                if (this.lbNe) {
                    this.lbNe.textFlow = TextFlowUtils.generateTextFlow(
                        ItemUtils.getItemNamewithColor(GameConfig.item[id]));
                }
                /**个数 */
                this.lbHave.text = GameCache.bag.itemCount(id) + "/" + count;
                this.lbHave.textColor = GameCache.bag.itemCount(id) >= count ? ColorUtil.C_GREEN : ColorUtil.C_RED;
            }
        }

        /**名称 */
        this.lbName.text = this.selectData.name;

        /**属性 */
        let maxLv = GameConfig.pet[0].maxlevel || 1
        let star = GameConfig.pet[0].typeToStar[this.selectData.petType - 1];
        let digital = this.selectData.advancedFactor[star - 1] / 10000
        if (digital) {
            /**属性内容 */
            let baseAttr = GlobalFun.ObjPlusRide(this.selectData.basicatt, digital);
            let curProp = GlobalFun.ObjPlusOrMinus(baseAttr, this.selectData.gradeatt, maxLv * digital);
            this.propList.setData(curProp, [], 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem4Skin");
        }

        /**星星 */
        let listStar = []
        for (let i = 0; i < star; i++) {
            let obj = { icon: "" }
            obj.icon = "public_json.public_star_on_png"
            listStar.push(obj);
        }
        this.setListData(this.listStar, listStar);


        /**技能列表 */
        for (let i = 0; i < 4; i++) {
            if (this.selectData.skillnum[i]) {
                let skillId = this.selectData.skillnum[i].skill;
                if (skillId) {
                    let icon = GameConfig.petskill[skillId].icon;
                    if (icon) {
                        this["skill" + i].source = RES_DIR_PET_SKILL + icon + ".png";
                    }
                }
                else {
                    this["skill" + i].source = null;
                }
            }
            else {
                this["skill" + i].source = null;
            }
        }



        /**模型 */
        let modelId = GameCache.pet.getModelId(star, this.selectData.id)
        if (modelId) {
            this.mModel.showMonster(modelId);
        }
    }


    /**点击前往 */
    public onclick() {
        /**icon */
        if (this.selectData.activationNeed && this.selectData.activationNeed[0]) {
            let id = this.selectData.activationNeed[0].id;
            if (id) {
                let jump = GameConfig.item[id] ? GameConfig.item[id].jump : null;
                if (jump) {
                    TextFlowUtils.hrefType(jump);
                }
                else {
                    GlobalFun.SysMsg("请在物品表配置物品的跳转内容");
                }
            }
        }
    }

}