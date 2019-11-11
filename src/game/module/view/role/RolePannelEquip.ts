/*
    author:lzw
    date:2019/6/24 14:10
    explain:角色pannel内容
*/
class RolePannelEquip extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "RolePannelEquipSkin";
    }

    public lbRoleName: eui.Label;
    public gPart: eui.Group;
    public roleSelect: RoleSelect;
    public role: UIAvatar;
    public gNe: eui.Group;
    public title: ThingTitle;
    public i2: eui.Button;
    public oneBtn: eui.Button;
    public imgTransfer: eui.Image;
    public zdl: ZdlPrint;



    /**界面整个界面的红点 */
    static red() {
        return false;
    }

    /** roleId 为角色id*/
    public roleRed(roleId) {
        return GameCache.equip.roleRed[roleId] ? GameCache.equip.roleRed[roleId] : false;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        return [];
    }

    //初始化
    public init() {
        /**初始化部位 */
        for (let index in this.gPart.$children) {
            let item: ItemBase = this.gPart.$children[index] as ItemBase;
            item.setColorImg();
            item.setIconImg("role_json.role_part_" + item.name + "_png");
            item.setHandler(this, (thisObj: EquipItem) => {
                if (thisObj.itemData) {
                    let plusData = [];
                    if (thisObj.strenghLvl > 0) {
                        let plusProp = GameCache.strength.getStrengthProp(thisObj.strenghLvl, thisObj.itemData.part);
                        plusData.push(plusProp);
                    }
                    if (thisObj.refineLvl > 0) {
                        let plusProp2 = GameCache.strength.getRefineProp(thisObj.refineLvl, thisObj.itemData.part);
                        plusData.push(plusProp2);
                    }
                    GlobalFun.itemTips(thisObj.userItem || thisObj.itemData, plusData);
                }
            }, [item]);
        }


        this.roleSelect.setHandler(this, this.roleClick)

        this.title = new ThingTitle();
        this.title.scaleX = 1.2
        this.title.scaleY = 1.2
        this.gNe.addChild(this.title)


    }



    /**角色选择回调 */
    public roleClick(param) {

        this.upRolePart();
    }

    public open(param: ViewProp = null) {

        /**设置角色选择下标 */
        if (param && param.exData1) {
            this.roleSelect.setRoleIndex(param.exData1);
        }

        this.role.setData(GameCache.hero.list[this.roleSelect.nSlRole].pro);
        /**更新装备内容 */
        this.message(MsgConst.EQUIP_INFO, this.upRolePart);
        this.message(MsgConst.EQUIP_ATTR_CHANGE, this.updateModelEquip);
        this.message(MsgConst.BAG_ITEM_NUM, this.quickWearBtn);
        this.message(MsgConst.PROPERTY + PropId.AP_BATTLE_POWER, this.updatePower)
        this.addTouchEvent(this.i2, this.onOpenPro);
        this.addTouchEvent(this.imgTransfer, this.onTransfer);
        this.addTouchEvent(this.oneBtn, this.quickWear);
        /**显示名称 */
        let pro = GameCache.hero.mainPro;
        if (pro) {
            this.title.setName(pro.charName);
            this.title.setBadge(pro.pro(PropId.AP_BADGE_LVL));
        }

        this.upRolePart();

    }

    private updatePower() {
        this.zdl.value = this.roleSelect.selectPro.pro(PropId.AP_BATTLE_POWER);
    }

    /**更新角色部位 */
    public upRolePart() {
        this.quickWearBtn();
        //战力显示
        this.updatePower();

        let eqList = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleEquipList);
        let eqLvl = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleStrengthList);
        let rfLvl = GameCache.hero.getDataByIndex(this.roleSelect.nSlRole, GameCache.equip.roleRefineList);
        for (let index in this.gPart.$children) {
            let item: EquipItem = this.gPart.$children[index] as EquipItem;
            let eq: UserItem = eqList ? eqList[item.name] : null;
            if (eq) {
                if (eqLvl && eqLvl[eq.stdItem.part]) {
                    eq.btStrong = eqLvl[eq.stdItem.part];
                    eq.btRefine = rfLvl[eq.stdItem.part];
                    item.strengthLvl = [eqLvl[eq.stdItem.part]];
                    item.refineLvl = rfLvl[eq.stdItem.part];
                }
                item.data = eq;
            } else {
                item.strengthLvl = [0];
                item.refineLvl = 0;
                if (item.data) {
                    item.reSet();
                    item.setColorImg();
                    item.setIconImg("role_json.role_part_" + item.name + "_png")
                }
            }
        }

        let heroList = GameCache.hero.list;
        if (heroList[this.roleSelect.nSlRole] && heroList[this.roleSelect.nSlRole].pro) {
            this.role.setData(heroList[this.roleSelect.nSlRole].pro);
        }
    }

    private onOpenPro() {
        let param = new ViewProp();
        param.exData1 = this.roleSelect.selectPro;
        App.ViewManager.open(ViewConst.ROLEPROTIPS, param);
    }




    /**更新模型装备 */
    public updateModelEquip() {
        this.role.refresh();
    }


    private quickWear(): void {
        GameCache.equip.quickWear(this.roleSelect.job);
    }

    /**转生跳转 */
    public onTransfer() {
        App.ViewManager.open(ViewConst.TRANSFER);
    }

    private quickWearBtn(): void {
        //检查是否有推荐装备
        let len = GameCache.bag.roleSuggestBag[this.roleSelect.job] ? Object.keys(GameCache.bag.roleSuggestBag[this.roleSelect.job]).length : 0;
        this.oneBtn.visible = len > 0;
    }



}



