/*
 * @Description: 奥义技能面板
 * @Author: liangzhaowei
 * @Date: 2019-08-21 19:44:11
 * @LastEditTime: 2019-11-04 20:17:55
 */
class SkillExView extends BaseSpriteView {
    public constructor($parent: egret.DisplayObjectContainer = null) {
        super($parent);
        this.skinName = "SkillExViewSkin";
    }


    // public roleSelect: RoleSelect;

    // public list: eui.List;
    // public imgNum: NumberMC;
    // public skillName: eui.Label;
    // public skillDsc: eui.Label;
    // public expend: ItemExpend;
    // public btn: eui.Button;
    // public btnR: eui.Button;
    // public imgInfo: eui.Image;


    public roleSelect: RoleSelect;
    public list: eui.List;
    public skillName: eui.Label;
    public skillDsc: eui.Label;
    public expend: ItemExpend;
    public btn: eui.Button;
    public zdl: ZdlPrint;

    public slSkill: UserSkill//当前所选技能
    public nSlRole = 0;//当前选择角色
    public nSlSkill = 0;//当前选择技能

    /**模块红点函数 不需要计算的写在前面 */
    static red() {
        if (!GameCache.skill) {
            return false;
        }


        // for (let index in GameCache.hero.list) {
        //     let roleData: HeroThing = GameCache.hero.list[index];
        //     if (GameCache.skill.skillUpRed(roleData.id)) {
        //         return true;
        //     }

        // }

        return false;
    }

    /** roleId 为角色id*/
    public roleRed(roleId) {
        // if (GameCache.skill.skillUpRed(roleId)) {
        //     return true
        // }

        return false;
    }

    /**需要刷新是红点消息列表 */
    static changeMsg() {
        // return [MsgConst.SKILL_INFO, MsgConst.PROPERTY + PropId.AP_COIN, MsgConst.PROPERTY + PropId.AP_LEVEL];
    }


    /**界面内循环刷新红点函数 */
    public refreshRed() {
        super.refreshRed();

        if (!GameCache.skill) {
            return;
        }

        // App.ViewManager.showRedPoint(this.btn, GameCache.skill.skillUpRed(this.roleSelect.roleId));
    }

    //初始化
    public init() {
        this.list.itemRenderer = SkillExItem;
        this.roleSelect.setHandler(this, this.roleClick)
    }




    public open(param: ViewProp = null) {
        /**更新装备内容 */
        this.message(MsgConst.SKILL_INFO, this.upRoleSkill);
        // this.message(MsgConst.EQUIP_ATTR_CHANGE, this.updateModelEquip);
        this.addTouchEvent(this.btn, this.onClick)
        this.upRoleSkill();
        this.addItemClick(this.list, this.itemClick)


    }

    public itemClick(e: eui.ItemTapEvent) {
        if (e.itemIndex != this.nSlSkill) {
            this.nSlSkill = e.itemIndex;
            this.upRoleSkill();

        }
    }


    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.btn:
                Proxy.skill.setSkillAllUp(this.roleSelect.serverId);
                break;
        }
    }

    /**角色选择回调 */
    public roleClick(param) {
        this.nSlRole = param;
        this.upRoleSkill();
    }



    /**更新角色技能 */
    public upRoleSkill() {

        let listSkill = GameCache.skill.getSkillByActorId(GameCache.hero.transIdFromeServer(this.nSlRole));
        let tList = [];
        let allSkill = GameCache.skill.roleSkilList[this.roleSelect.job];
        for (let i in allSkill) {
            let std: StdSkill = allSkill[i];
            if (std && (std.skillsort != 3)) {
                continue;
            }
            let obj = { sl: 1, skill: null, cfg: null, st: 0 }
            obj.sl = this.nSlSkill;
            obj.skill = listSkill[std.id];
            obj.cfg = std;
            //记录当前所选技能
            if (parseInt(i) == (this.nSlSkill) && obj.skill) {
                this.slSkill = obj.skill
                let skillCfg: StdSkill = std;
                if (skillCfg) {
                    this.skillName.text = skillCfg.name + "Lv" + this.slSkill.nLevel;
                    let valueList = []
                    for (let index in std.valuedec) {
                        valueList.push(std.valuedec[index] * this.slSkill.nLevel);
                    }
                    this.skillDsc.text = StringUtils.substitute(std.desc, valueList);

                    /**转生内容 */
                    let transferCfg: StdTransfer = GameConfig.transfer[std.transferlevel];
                    // if (skillCfg.need && skillCfg.need[0]) {
                    //     this.expend.setData(skillCfg.need[0].id, (this.slSkill.nLevel + 1) * skillCfg.need[0].count);
                    // }
                    if (!transferCfg) {
                        return;
                    }
                    this.zdl.value = ItemUtils.getZdlByProp(transferCfg.attrs);
                }
            }
            tList.push(obj);
        }

        tList.sort(this.sort);
        this.setListData(this.list, tList);

    }

    public sort(a, b) {
        return a.cfg.id - b.cfg.id
    }

}




