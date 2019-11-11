/*
 * @Description: 宠物全部属性
 * @Author: liangzhaowei
 * @Date: 2019-09-18 10:43:56
 */

class PetTips extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Tips);
        this.skinName = "PetTipsSkin";
    }

    public zdl: ZdlPrint;
    public propList: PropPart;

    protected init(): void {

    }

    public open(param: ViewProp): void {
        super.open();

        /**所有宠物属性 */
        let allProp = [];
        for (let index in GameCache.pet.petArray) {
            let petServer: PetItem = GameCache.pet.petArray[index];
            let petCfg: StdPet = GameConfig.pet[petServer.wid];
            let digital = petCfg.advancedFactor[petServer.wStep] / 10000
            if (petCfg) {
                let baseAttr = GlobalFun.ObjPlusRide(petCfg.basicatt, digital);
                let curProp = GlobalFun.ObjPlusOrMinus(baseAttr, petCfg.gradeatt, petServer.wLevel * digital);
                allProp = GlobalFun.ObjPlusOrMinus(curProp, allProp);
            }
        }
        this.zdl.value = ItemUtils.getZdlByProp(allProp);
        this.propList.setData(allProp, [], 0, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem4Skin");

    }

    public close(param: ViewProp): void {
    }
}